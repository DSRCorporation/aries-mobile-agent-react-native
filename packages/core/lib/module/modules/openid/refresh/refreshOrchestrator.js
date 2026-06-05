// modules/openid/refresh/RefreshOrchestrator.ts

import { OpenIDCredentialRefreshFlowType, RefreshStatus } from './types';
import { credentialRegistry } from './registry';
import { verifyCredentialStatus } from './verifyCredentialStatus';
import { getRefreshCredentialMetadata, markOpenIDCredentialStatus, persistCredentialRecord, setRefreshCredentialMetadata } from '../metadata';
import { toOpenIDCredentialLite } from '../credentialRecord';
import { refreshAndQueueReplacement } from './operations';
export class RefreshOrchestrator {
  intervalOn = false; // interval enabled?
  runningOnce = false; // a run is in progress?
  startupRunTriggered = false;
  recentlyIssued = new Map();
  constructor(logger, bridge, opts) {
    this.logger = logger;
    this.opts = {
      intervalMs: 15 * 60 * 1000,
      autoStart: true,
      runOnStart: false,
      flowType: OpenIDCredentialRefreshFlowType.FullReplacement,
      onError: e => this.logger.error(String(e)),
      listRecords: async () => [],
      toLite: toOpenIDCredentialLite,
      ...(opts ?? {})
    };
    logger.info(`🔧 [RefreshOrchestrator] initialized -> ${JSON.stringify({
      intervalMs: this.opts.intervalMs,
      autoStart: this.opts.autoStart,
      runOnStart: this.opts.runOnStart,
      flowType: this.opts.flowType
    })}`);
    bridge.onReady(agent => {
      this.agent = agent;
      this.logger.info('🪝 [RefreshOrchestrator] Agent ready');
      if (this.opts.runOnStart && !this.startupRunTriggered) {
        this.startupRunTriggered = true;
        void this.runOnce('startup');
      }
      if (this.opts.autoStart && this.opts.intervalMs) this.start();
    }, true);
    bridge.onChange(agent => {
      if (agent) return;
      this.agent = undefined;
      this.logger.info('🪝 [RefreshOrchestrator] Agent cleared');
      this.stop();
    });
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
      autoStart: this.opts.autoStart,
      runOnStart: this.opts.runOnStart,
      flowType: this.opts.flowType
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
          if (this.opts.flowType === OpenIDCredentialRefreshFlowType.FullReplacement) {
            await this.refreshRecord(rec);
          } else {
            await this.checkRecordStatus(rec);
          }
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
      clearExpired,
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
      const status = await verifyCredentialStatus(rec, this.logger);
      const now = Date.now();
      const meta = getRefreshCredentialMetadata(rec) ?? {};
      meta.lastCheckResult = status;
      meta.lastCheckedAt = now;
      meta.attemptCount = (meta.attemptCount ?? 0) + 1;
      setRefreshCredentialMetadata(rec, meta);
      await persistCredentialRecord(this.agent.context, rec);
      if (status === RefreshStatus.Valid) {
        this.logger.info(`✅ [Refresh] valid → ${id}`);
        clearExpired(id);
      } else if (status === RefreshStatus.Invalid) {
        this.logger.info(`❌ [Refresh] invalid → ${id}`);
        markInvalid(id);
      } else {
        this.logger.warn(`⚠️ [Refresh] status check error → ${id}`);
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
      blockAsSucceeded,
      markInvalid,
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
      const status = await verifyCredentialStatus(rec, this.logger);
      if (status === RefreshStatus.Valid) {
        this.logger.info(`✅ [Refresh] valid → ${id}`);
        // If it was previously expired for any reason, clear that and block as succeeded
        clearExpired(id);
        //We can block if isValid but for now we will keep checking it again every time
        // blockAsSucceeded(id)
        return;
      }
      if (status === RefreshStatus.Error) {
        this.logger.warn(`⚠️ [Refresh] status check failed; deferring re-issue → ${id}`);
        await markOpenIDCredentialStatus({
          credential: rec,
          status: RefreshStatus.Error,
          agentContext: this.agent.context
        });
        return;
      }

      // Invalid case:

      await markOpenIDCredentialStatus({
        credential: rec,
        status: RefreshStatus.Invalid,
        agentContext: this.agent.context
      });
      this.logger.info(`♻️ [Refresh] invalid, attempting re-issue → ${id}`);
      const newRecord = await refreshAndQueueReplacement({
        agent: this.agent,
        logger: this.logger,
        record: rec,
        toLite: this.opts.toLite
      });
      if (!newRecord) {
        const msg = 'credential refresh did not yield a replacement';
        this.logger.warn(`⚠️ [Refresh] ${msg} for ${id}`);
        markInvalid(id);
        return;
      }
      this.logger.info(`💾 [Refresh] new credential → ${newRecord.id}`);
      blockAsSucceeded(id);
      this.recentlyIssued.set(newRecord.id, newRecord);
    } catch (e) {
      var _this$opts$onError4, _this$opts4;
      const err = String(e);
      this.logger.error(`💥 [Refresh] error on ${id}: ${err}`);
      (_this$opts$onError4 = (_this$opts4 = this.opts).onError) === null || _this$opts$onError4 === void 0 || _this$opts$onError4.call(_this$opts4, e);
      markInvalid(id);
    } finally {
      // 6) clear in-flight marker
      clearRefreshing(id);
    }
  }
}
//# sourceMappingURL=refreshOrchestrator.js.map