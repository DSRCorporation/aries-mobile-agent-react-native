"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCredentialErrorsFromRegistry = useCredentialErrorsFromRegistry;
var _react = require("react");
var _registry = require("../refresh/registry");
var _metadata = require("../metadata");
var _types = require("../refresh/types");
var _credentials = require("../../../types/credentials");
var _core = require("@credo-ts/core");
// hooks/useCredentialErrorsFromRegistry.ts

/**
 * Computes the UI error list for a credential by:
 *   1) Checking the in-memory registry (live session truth)
 *   2) Falling back to persisted refresh metadata (after app restart)
 * You can merge with any existing `propErrors` provided by the caller.
 */
function useCredentialErrorsFromRegistry(credential, propErrors) {
  const id = credential === null || credential === void 0 ? void 0 : credential.id;
  const [isInvalidByRegistry, setIsInvalidByRegistry] = (0, _react.useState)(false);

  // Subscribe to registry changes and keep a boolean for this credential
  (0, _react.useEffect)(() => {
    if (!id) return;

    // Immediate read
    const s = _registry.credentialRegistry.getState();
    setIsInvalidByRegistry(s.expired.includes(id));

    // Subscribe to changes
    const unsub = _registry.credentialRegistry.subscribe(next => {
      const flagged = next.expired.includes(id);
      setIsInvalidByRegistry(flagged);
    });
    return unsub;
  }, [id]);

  // Fallback: metadata (covers case after restart when registry is empty)
  const isInvalidByMetadata = (0, _react.useMemo)(() => {
    if (!(credential instanceof _core.W3cCredentialRecord || credential instanceof _core.SdJwtVcRecord || credential instanceof _core.MdocRecord)) {
      return;
    }
    if (!credential) return false;
    const meta = (0, _metadata.getRefreshCredentialMetadata)(credential);
    return (meta === null || meta === void 0 ? void 0 : meta.lastCheckResult) === _types.RefreshStatus.Invalid;
  }, [credential]);

  // Merge: propErrors + derived “invalid” → map to existing enum (Revoked)
  const merged = (0, _react.useMemo)(() => {
    const base = Array.isArray(propErrors) ? [...propErrors] : [];
    const withoutRevoked = base.filter(e => e !== _credentials.CredentialErrors.Revoked);
    const shouldMarkInvalid = isInvalidByRegistry || isInvalidByMetadata;
    return shouldMarkInvalid ? [...withoutRevoked, _credentials.CredentialErrors.Revoked] : withoutRevoked;
  }, [propErrors, isInvalidByRegistry, isInvalidByMetadata]);
  return merged;
}
//# sourceMappingURL=useCredentialErrorsFromRegistry.js.map