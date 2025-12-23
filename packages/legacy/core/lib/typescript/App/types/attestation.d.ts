import { Agent } from '@credo-ts/core';
export declare const AttestationEventTypes: {
    readonly Started: "AttestationEvent.Started";
    readonly Completed: "AttestationEvent.Completed";
    readonly FailedHandleOffer: "AttestationEvent.FailedHandleOffer";
    readonly FailedHandleProof: "AttestationEvent.FailedHandleProof";
    readonly FailedRequestCredential: "AttestationEvent.FailedRequestCredential";
};
export interface AttestationMonitor {
    readonly attestationWorkflowInProgress: boolean;
    shouldHandleProofRequestAutomatically: boolean;
    start(agent: Agent): Promise<void>;
    stop(): void;
    requestAttestationCredential(): Promise<void>;
}
//# sourceMappingURL=attestation.d.ts.map