import React from 'react';
export declare const LoadingPlaceholderWorkflowType: {
    readonly Connection: "Connection";
    readonly ReceiveOffer: "ReceiveOffer";
    readonly ProofRequested: "ProofRequested";
};
type LoadingPlaceholderProps = {
    workflowType: (typeof LoadingPlaceholderWorkflowType)[keyof typeof LoadingPlaceholderWorkflowType];
    timeoutDurationInMs?: number;
    loadingProgressPercent?: number;
    onCancelTouched?: () => void;
    onTimeoutTriggered?: () => void;
    testID?: string;
};
declare const LoadingPlaceholder: React.FC<LoadingPlaceholderProps>;
export default LoadingPlaceholder;
//# sourceMappingURL=LoadingPlaceholder.d.ts.map