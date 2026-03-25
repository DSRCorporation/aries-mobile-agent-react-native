// modules/openid/refresh/RefreshOrchestrator.ts
import { ClaimFormat, SdJwtVcRecord, W3cCredentialRecord } from '@credo-ts/core';
import { refreshAccessToken } from './refreshToken';
import { reissueCredentialWithAccessToken } from './reIssuance';
import { RefreshStatus } from './types';
import { credentialRegistry } from './registry';
import { verifyCredentialStatus } from './verifyCredentialStatus';
import { getRefreshCredentialMetadata, markOpenIDCredentialStatus, persistCredentialRecord, setRefreshCredentialMetadata } from '../metadata';
const defaultToLite = rec => {
  var _rec$createdAt;
  return {
    id: rec.id,
    // best-effort: SdJwt/W3C both expose claimFormat via tags in many setups.
    // Fallback to JwtVc if unknown so UI has *some* value.
    format: rec instanceof W3cCredentialRecord && ClaimFormat.JwtVc || rec instanceof SdJwtVcRecord && ClaimFormat.SdJwtW3cVc || ClaimFormat.JwtVc,
    // TODO: Won't these checks against ClaimFormat always be true?
    createdAt: (_rec$createdAt = rec.createdAt) === null || _rec$createdAt === void 0 ? void 0 : _rec$createdAt.toISOString(),
    issuer: undefined
  };
};
export class RefreshOrchestrator {
  intervalOn = false; // interval enabled?
  runningOnce = false; // a run is in progress?

  recentlyIssued = new Map();
  checkStatusOnly = true;
  constructor(logger, bridge, opts) {
    this.logger = logger;
    this.opts = {
      intervalMs: 15 * 60 * 1000,
      autoStart: true,
      onError: e => this.logger.error(String(e)),
      listRecords: async () => [],
      toLite: defaultToLite,
      ...(opts ?? {})
    };
    logger.info(`🔧 [RefreshOrchestrator] initialized -> ${JSON.stringify({
      intervalMs: this.opts.intervalMs,
      autoStart: this.opts.autoStart
    })}`);
    bridge.onReady(agent => {
      this.agent = agent;
      this.logger.info('🪝 [RefreshOrchestrator] Agent ready');
      if (this.opts.autoStart && this.opts.intervalMs) this.start();
    }, true);
  }
  configure(next) {
    const prev = {
      intervalOn: this.intervalOn,
      intervalMs: this.opts.intervalMs ?? null,
      autoStart: this.opts.autoStart ?? true,
      agentReady: !!this.agent
    };

    // merge
    this.opts = {
      ...this.opts,
      ...next
    };
    this.logger.info(`🔧 [RefreshOrchestrator] configure -> ${JSON.stringify({
      intervalMs: this.opts.intervalMs,
      autoStart: this.opts.autoStart
    })}`);
    const nowIntervalMs = this.opts.intervalMs ?? null;
    const nowAutoStart = this.opts.autoStart ?? true;

    // Case A: timer is running and intervalMs changed → restart
    if (prev.intervalOn && prev.intervalMs !== nowIntervalMs) {
      this.stop();
      if (nowIntervalMs) this.start();
      return;
    }

    // Case B: timer is running but user disabled intervals
    if (prev.intervalOn && nowIntervalMs === null) {
      this.stop();
      return;
    }

    // Case C: timer is NOT running, but user enabled intervals
    // Start iff: we have a positive interval, and either autoStart is true
    // or the caller intends to enable interval operation via configure.
    if (!prev.intervalOn && nowIntervalMs && nowAutoStart) {
      // If agent isn't ready yet, defer; onReady() will auto-start.
      if (this.agent) this.start();
      // else do nothing — the constructor's bridge.onReady() will call start()
      return;
    }

    // Case D: autoStart toggled from false→true with an interval set, and timer isn't running
    if (!prev.intervalOn && !prev.autoStart && nowAutoStart && nowIntervalMs) {
      if (this.agent) this.start();
      // else defer to onReady()
      return;
    }

    // Otherwise: no timer state change needed.
  }
  isRunning() {
    return this.runningOnce;
  }
  start() {
    if (this.intervalOn || !this.opts.intervalMs) return;
    this.logger.info('⏱️ [RefreshOrchestrator] start interval');
    this.intervalOn = true;
    this.timer = setInterval(() => {
      // fire-and-forget; guard against overlap
      void this.runOnce('interval');
    }, this.opts.intervalMs);
  }
  stop() {
    if (!this.intervalOn) return;
    this.logger.info('⏹️ [RefreshOrchestrator] stop interval');
    clearInterval(this.timer);
    this.timer = undefined;
    this.intervalOn = false;
  }
  async runOnce(reason = 'manual') {
    var _this$agent;
    if (this.runningOnce) {
      this.logger.warn('⚠️ [RefreshOrchestrator] runOnce skipped: already running');
      return;
    }
    if (!this.agent || !((_this$agent = this.agent) !== null && _this$agent !== void 0 && _this$agent.isInitialized)) {
      this.logger.warn('⚠️ [RefreshOrchestrator] runOnce skipped: agent not ready');
      return;
    }
    this.runningOnce = true;
    this.logger.info(`🔁 [RefreshOrchestrator] runOnce (${reason})`);
    try {
      const records = await this.opts.listRecords();
      this.logger.info(`📦 [Refresh] found ${records.length} credential records`);
      for (const rec of records) {
        // don’t block whole batch if one fails
        try {
          await this.checkRecordStatus(rec);
          // await this.refreshRecord(rec)
        } catch (e) {
          var _this$opts$onError, _this$opts;
          this.logger.error(`💥 [Refresh] record ${rec.id} failed: ${String(e)}`);
          (_this$opts$onError = (_this$opts = this.opts).onError) === null || _this$opts$onError === void 0 || _this$opts$onError.call(_this$opts, e);
        }
      }
      this.logger.info('✅ [Refresh] run completed');
    } catch (e) {
      var _this$opts$onError2, _this$opts2;
      this.logger.error(`💥 [Refresh] global error: ${String(e)}`);
      (_this$opts$onError2 = (_this$opts2 = this.opts).onError) === null || _this$opts$onError2 === void 0 || _this$opts$onError2.call(_this$opts2, e);
    } finally {
      this.runningOnce = false;
    }
  }
  setIntervalMs(intervalMs) {
    this.configure({
      intervalMs
    });
  }
  resolveFull(id) {
    return this.recentlyIssued.get(id);
  }

  // ---- internals ----
  async checkRecordStatus(rec) {
    const {
      shouldSkip,
      markRefreshing,
      clearRefreshing,
      upsert,
      markInvalid,
      setLastSweep
    } = credentialRegistry.getState();
    const id = rec.id;
    if (!this.agent) {
      this.logger.error(`💥 [Refresh] Agent not initialized, cannot refresh credential ${id}`);
      return;
    }

    // 0) fast exit if this cred is already handled or in-flight
    if (shouldSkip(id)) {
      this.logger.info(`⏭️ [Refresh] skip credential ${id} (blocked/expired/in-flight)`);
      return;
    }

    // 1) ensure a lite copy exists in registry (handy for UI/debug)
    upsert(this.opts.toLite(rec));

    // 2) mark in-flight
    markRefreshing(id);
    this.logger.info(`🧭 [Refresh] check credential ${id}`);
    try {
      // 3) verification
      const isValid = await verifyCredentialStatus(rec, this.logger);
      const now = Date.now();
      const meta = getRefreshCredentialMetadata(rec) ?? {};
      meta.lastCheckResult = isValid ? RefreshStatus.Valid : RefreshStatus.Invalid;
      meta.lastCheckedAt = now;
      meta.attemptCount = (meta.attemptCount ?? 0) + 1;
      setRefreshCredentialMetadata(rec, meta);
      await persistCredentialRecord(this.agent.context, rec);
      if (isValid) {
        this.logger.info(`✅ [Refresh] valid → ${id}`);
      } else {
        this.logger.info(`❌ [Refresh] invalid → ${id}`);
        markInvalid(id); // <-- key change: we only flag invalid here
      }
      setLastSweep(new Date(now).toISOString());
    } catch (error) {
      var _this$opts$onError3, _this$opts3;
      this.logger.error(`💥 [Refresh] error checking ${id}: ${String(error)}`);
      (_this$opts$onError3 = (_this$opts3 = this.opts).onError) === null || _this$opts$onError3 === void 0 || _this$opts$onError3.call(_this$opts3, error);
    } finally {
      clearRefreshing(id);
    }
  }
  async refreshRecord(rec) {
    const {
      shouldSkip,
      markRefreshing,
      clearRefreshing,
      clearExpired,
      markExpiredWithReplacement,
      blockAsFailed,
      blockAsSucceeded,
      upsert
    } = credentialRegistry.getState();
    const id = rec.id;
    if (!this.agent) {
      this.logger.error(`💥 [Refresh] Agent not initialized, cannot refresh credential ${id}`);
      return;
    }

    // 0) fast exit if this cred is already handled or in-flight
    if (shouldSkip(id)) {
      this.logger.info(`⏭️ [Refresh] skip credential ${id} (blocked/expired/in-flight)`);
      return;
    }

    // 1) ensure a lite copy exists in registry (handy for UI/debug)
    upsert(this.opts.toLite(rec));

    // 2) mark in-flight
    markRefreshing(id);
    this.logger.info(`🧭 [Refresh] check credential ${id}`);
    try {
      // 3) verification
      const isValid = await verifyCredentialStatus(rec, this.logger);
      if (isValid) {
        this.logger.info(`✅ [Refresh] valid → ${id}`);
        // If it was previously expired for any reason, clear that and block as succeeded
        clearExpired(id);
        //We can block if isValid but for now we will keep checking it again every time
        // blockAsSucceeded(id)
        return;
      }

      // Invalid case:

      await markOpenIDCredentialStatus({
        credential: rec,
        status: RefreshStatus.Invalid,
        agentContext: this.agent.context
      });

      // 4) needs refresh → get access token
      this.logger.info(`♻️ [Refresh] invalid, attempting re-issue → ${id}`);
      const token = await refreshAccessToken({
        logger: this.logger,
        cred: rec,
        agentContext: this.agent.context
      });
      if (!token) {
        const msg = `no refresh token available`;
        this.logger.warn(`⚠️ [Refresh] ${msg} for ${id}`);
        blockAsFailed(id, msg);
        return;
      }

      // 5) re-issue
      const newRecord = await reissueCredentialWithAccessToken({
        agent: this.agent,
        logger: this.logger,
        record: rec,
        tokenResponse: token
      });
      if (newRecord) {
        this.logger.info(`💾 [Refresh] new credential → ${newRecord.id}`);
        // Queue a replacement for UI/notifications and block the old one as succeeded
        markExpiredWithReplacement(id, this.opts.toLite(newRecord));
        blockAsSucceeded(id);
        this.recentlyIssued.set(newRecord.id, newRecord);
      } else {
        const msg = `re-issue returned no record`;
        this.logger.warn(`⚠️ [Refresh] ${msg} for ${id}`);
        blockAsFailed(id, msg);
        await markOpenIDCredentialStatus({
          credential: rec,
          status: RefreshStatus.Invalid,
          agentContext: this.agent.context
        });
      }
    } catch (e) {
      const err = String(e);
      this.logger.error(`💥 [Refresh] error on ${id}: ${err}`);
      blockAsFailed(id, err);
    } finally {
      // 6) clear in-flight marker
      clearRefreshing(id);
    }
  }
}
//# sourceMappingURL=refreshOrchestrator.js.map