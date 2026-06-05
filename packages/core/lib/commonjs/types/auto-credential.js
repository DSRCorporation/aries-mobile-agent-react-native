"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CredentialProvisioningEventTypes = void 0;
/**
 * Event types emitted by a CredentialProvisioningMonitor during a just-in-time
 * credential acquisition workflow.  The ProofRequest screen listens for these
 * to show / hide a loading overlay while the wallet automatically fetches a
 * missing credential before letting the user approve the proof request.
 */
const CredentialProvisioningEventTypes = exports.CredentialProvisioningEventTypes = {
  Started: 'CredentialProvisioningEvent.Started',
  Completed: 'CredentialProvisioningEvent.Completed',
  FailedHandleOffer: 'CredentialProvisioningEvent.FailedHandleOffer',
  FailedHandleProof: 'CredentialProvisioningEvent.FailedHandleProof',
  FailedRequestCredential: 'CredentialProvisioningEvent.FailedRequestCredential'
};

/**
 * Minimal interface that any credential provisioning monitor must implement.
 * Register an instance at TOKENS.UTIL_CREDENTIAL_PROVISIONING_MONITOR in your
 * DI container — the ProofRequest screen will start listening for the events
 * above and surface a loading state while the workflow is in progress.
 */
//# sourceMappingURL=auto-credential.js.map