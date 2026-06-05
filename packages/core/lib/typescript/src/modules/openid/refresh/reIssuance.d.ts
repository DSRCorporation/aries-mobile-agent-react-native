import { Agent } from '@credo-ts/core';
import { RefreshResponse } from '../types';
import { OpenId4VciResolvedCredentialOffer } from '@credo-ts/openid4vc';
import { BifoldLogger } from '../../../services/logger';
import { OpenIDCredentialRecord } from '../credentialRecord';
type ReissueWithAccessTokenInput = {
    agent: Agent;
    logger: BifoldLogger;
    record?: OpenIDCredentialRecord;
    tokenResponse: RefreshResponse;
    resolvedOffer?: OpenId4VciResolvedCredentialOffer;
    clientId?: string;
};
export declare function reissueCredentialWithAccessToken({ agent, logger, record, tokenResponse, clientId, }: ReissueWithAccessTokenInput): Promise<OpenIDCredentialRecord | undefined>;
export {};
//# sourceMappingURL=reIssuance.d.ts.map