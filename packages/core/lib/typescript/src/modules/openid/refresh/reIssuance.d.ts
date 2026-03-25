import { Agent, MdocRecord, SdJwtVcRecord, W3cCredentialRecord, W3cV2CredentialRecord } from '@credo-ts/core';
import { RefreshResponse } from '../types';
import { OpenId4VciResolvedCredentialOffer } from '@credo-ts/openid4vc';
import { BifoldLogger } from '../../../services/logger';
type ReissueWithAccessTokenInput = {
    agent: Agent;
    logger: BifoldLogger;
    record?: SdJwtVcRecord | W3cCredentialRecord | MdocRecord | W3cV2CredentialRecord;
    tokenResponse: RefreshResponse;
    resolvedOffer?: OpenId4VciResolvedCredentialOffer;
    clientId?: string;
    pidSchemes?: {
        sdJwtVcVcts: string[];
        msoMdocDoctypes: string[];
    };
};
export declare function reissueCredentialWithAccessToken({ agent, logger, record, tokenResponse, clientId, pidSchemes, }: ReissueWithAccessTokenInput): Promise<W3cCredentialRecord | SdJwtVcRecord | MdocRecord | W3cV2CredentialRecord | undefined>;
export {};
//# sourceMappingURL=reIssuance.d.ts.map