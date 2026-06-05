// modules/openid/refresh/verifyCredentialStatus.ts

import { getListFromStatusListJWT, getStatusListFromJWT } from '@sd-jwt/jwt-status-list';
import { RefreshStatus } from './types';
/**
 * Verifies credential status for Sd-JWT credentials using status lists.
 * Non–Sd-JWT credentials (W3C jwt_vc_json without status list, or mdoc) are treated as valid here.
 */
export async function verifyCredentialStatus(rec, logger) {
  try {
    // Only Sd-JWT creds have compactSdJwtVc in this codebase
    if (!('compactSdJwtVc' in rec)) return RefreshStatus.Valid;
    logger === null || logger === void 0 || logger.info(`[Verifier] Verifying credential status for Sd-JWT credential: ${rec.id}`);
    const ref = getStatusListFromJWT(rec.firstCredential.compact);
    const res = await fetch(ref.uri);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const jwt = await res.text();
    const list = getListFromStatusListJWT(jwt);
    const status = list.getStatus(ref.idx) === 0 ? RefreshStatus.Valid : RefreshStatus.Invalid;
    logger === null || logger === void 0 || logger.info(`${status === RefreshStatus.Valid ? '✅' : '❌'} [Verifier] ${rec.id} → ${status}`);
    return status;
  } catch (e) {
    var _logger$error;
    logger === null || logger === void 0 || (_logger$error = logger.error) === null || _logger$error === void 0 || _logger$error.call(logger, `💥 [Verifier] ${'id' in rec ? rec.id : 'unknown'} verify failed: ${String(e)}`);
    return RefreshStatus.Error;
  }
}
//# sourceMappingURL=verifyCredentialStatus.js.map