import { Agent } from '@credo-ts/core';
import { BifoldLogger } from '../../../services/logger';
import { RefreshResponse } from '../types';
import { OpenIDCredentialRecord } from '../credentialRecord';
export declare function refreshAccessToken({ logger, cred, agent, }: {
    logger: BifoldLogger;
    cred: OpenIDCredentialRecord;
    agent: Agent;
}): Promise<RefreshResponse | undefined>;
//# sourceMappingURL=refreshToken.d.ts.map