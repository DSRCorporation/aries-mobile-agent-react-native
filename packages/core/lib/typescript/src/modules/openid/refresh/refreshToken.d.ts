import { AgentContext, MdocRecord, SdJwtVcRecord, W3cCredentialRecord, W3cV2CredentialRecord } from '@credo-ts/core';
import { BifoldLogger } from '../../../services/logger';
import { RefreshResponse } from '../types';
export declare function refreshAccessToken({ logger, cred, agentContext, }: {
    logger: BifoldLogger;
    cred: W3cCredentialRecord | SdJwtVcRecord | MdocRecord | W3cV2CredentialRecord;
    agentContext: AgentContext;
}): Promise<RefreshResponse | undefined>;
//# sourceMappingURL=refreshToken.d.ts.map