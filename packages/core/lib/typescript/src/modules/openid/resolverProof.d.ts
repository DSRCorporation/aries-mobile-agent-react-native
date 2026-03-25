import { Agent, DifPexCredentialsForRequest } from '@credo-ts/core';
import { ParseInvitationResult } from '../../utils/parsers';
import { OpenId4VPRequestRecord } from './types';
import { OpenId4VpAuthorizationRequestPayload } from '@credo-ts/openid4vc';
import { BifoldAgent } from '../../utils/agent';
export declare function fetchInvitationDataUrl(dataUrl: string): Promise<ParseInvitationResult>;
/**
 * This is a temp method to allow for untrusted certificates to still work with the wallet.
 */
export declare const extractCertificateFromAuthorizationRequest: ({ data, uri, }: {
    data?: string;
    uri?: string;
}) => Promise<{
    data: string | null;
    certificate: string | null;
}>;
export declare function withTrustedCertificate<T>(agent: Agent, //This should maybe be AgentContext instead
certificate: string | null, method: () => Promise<T> | T): Promise<T>;
export declare const getCredentialsForProofRequest: ({ agent, data, uri, }: {
    agent: BifoldAgent;
    data?: string;
    uri?: string;
    fetchAuthorization?: boolean;
    authorization?: {
        clientId: string;
        redirectUri: string;
    };
}) => Promise<OpenId4VPRequestRecord | undefined>;
export declare const shareProof: ({ agent, authorizationRequest, credentialsForRequest, selectedCredentials, }: {
    agent: Agent;
    authorizationRequest: OpenId4VpAuthorizationRequestPayload;
    credentialsForRequest: DifPexCredentialsForRequest;
    selectedCredentials: {
        [inputDescriptorId: string]: {
            id: string;
            claimFormat: string;
        };
    };
    allowUntrustedCertificate?: boolean;
}) => Promise<any>;
//# sourceMappingURL=resolverProof.d.ts.map