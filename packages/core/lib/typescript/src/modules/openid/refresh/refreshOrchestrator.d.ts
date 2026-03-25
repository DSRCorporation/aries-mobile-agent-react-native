import { MdocRecord, SdJwtVcRecord, W3cCredentialRecord, W3cV2CredentialRecord } from '@credo-ts/core';
import { BifoldLogger } from '../../../services/logger';
import { IRefreshOrchestrator, RefreshOrchestratorOpts } from './types';
import { AgentBridge } from '../../../services/AgentBridge';
type AnyCred = W3cCredentialRecord | SdJwtVcRecord | MdocRecord | W3cV2CredentialRecord;
export declare class RefreshOrchestrator implements IRefreshOrchestrator {
    private readonly logger;
    private timer?;
    private intervalOn;
    private runningOnce;
    private opts;
    private agent?;
    private readonly recentlyIssued;
    private readonly checkStatusOnly;
    constructor(logger: BifoldLogger, bridge: AgentBridge, opts?: RefreshOrchestratorOpts);
    configure(next: Partial<RefreshOrchestratorOpts>): void;
    isRunning(): boolean;
    start(): void;
    stop(): void;
    runOnce(reason?: string): Promise<void>;
    setIntervalMs(intervalMs: number | null): void;
    resolveFull(id: string): AnyCred | undefined;
    private checkRecordStatus;
    private refreshRecord;
}
export {};
//# sourceMappingURL=refreshOrchestrator.d.ts.map