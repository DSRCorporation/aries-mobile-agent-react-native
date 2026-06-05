import { BifoldLogger } from '../../../services/logger';
import { IRefreshOrchestrator, RefreshOrchestratorOpts } from './types';
import { AgentBridge } from '../../../services/AgentBridge';
import { OpenIDCredentialRecord } from '../credentialRecord';
export declare class RefreshOrchestrator implements IRefreshOrchestrator {
    private readonly logger;
    private timer?;
    private intervalOn;
    private runningOnce;
    private startupRunTriggered;
    private opts;
    private agent?;
    private readonly recentlyIssued;
    constructor(logger: BifoldLogger, bridge: AgentBridge, opts?: RefreshOrchestratorOpts);
    configure(next: Partial<RefreshOrchestratorOpts>): void;
    isRunning(): boolean;
    start(): void;
    stop(): void;
    runOnce(reason?: string): Promise<void>;
    setIntervalMs(intervalMs: number | null): void;
    resolveFull(id: string): OpenIDCredentialRecord | undefined;
    private checkRecordStatus;
    private refreshRecord;
}
//# sourceMappingURL=refreshOrchestrator.d.ts.map