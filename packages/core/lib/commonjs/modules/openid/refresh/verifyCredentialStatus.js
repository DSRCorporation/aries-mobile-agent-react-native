"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyCredentialStatus = verifyCredentialStatus;
var _jwtStatusList = require("@sd-jwt/jwt-status-list");
// modules/openid/refresh/verifyCredentialStatus.ts

/**
 * Verifies credential status for Sd-JWT credentials using status lists.
 * Non–Sd-JWT credentials (W3C jwt_vc_json without status list, or mdoc) are treated as valid here.
 * Returns true if valid; false if revoked/invalid or on error.
 */
async function verifyCredentialStatus(rec, logger) {
  try {
    // Only Sd-JWT creds have compactSdJwtVc in this codebase
    if (!('compactSdJwtVc' in rec)) return true;
    logger === null || logger === void 0 || logger.info(`[Verifier] Verifying credential status for Sd-JWT credential: ${rec.id}`);
    const ref = (0, _jwtStatusList.getStatusListFromJWT)(rec.firstCredential.compact);
    const res = await fetch(ref.uri);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const jwt = await res.text();
    const list = (0, _jwtStatusList.getListFromStatusListJWT)(jwt);
    const ok = list.getStatus(ref.idx) === 0;
    logger === null || logger === void 0 || logger.info(`${ok ? '✅' : '❌'} [Verifier] ${rec.id} → ${ok ? 'valid' : 'revoked'}`);
    return ok;
  } catch (e) {
    var _logger$error;
    logger === null || logger === void 0 || (_logger$error = logger.error) === null || _logger$error === void 0 || _logger$error.call(logger, `💥 [Verifier] ${'id' in rec ? rec.id : 'unknown'} verify failed: ${String(e)}`);
    return false;
  }
}
//# sourceMappingURL=verifyCredentialStatus.js.map