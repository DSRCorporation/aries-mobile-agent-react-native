import { Agent } from '@credo-ts/core';
import { BifoldLogger } from '../../../services/logger';
import { OpenIDCredentialRecord } from '../credentialRecord';
import { RefreshOrchestratorOpts } from './types';
type QueueReplacementOptions = {
    agent: Agent;
    logger: BifoldLogger;
    record: OpenIDCredentialRecord;
    toLite?: NonNullable<RefreshOrchestratorOpts['toLite']>;
};
export declare function refreshAndQueueReplacement({ agent, logger, record, toLite, }: QueueReplacementOptions): Promise<OpenIDCredentialRecord | undefined>;
export {};
//# sourceMappingURL=operations.d.ts.map