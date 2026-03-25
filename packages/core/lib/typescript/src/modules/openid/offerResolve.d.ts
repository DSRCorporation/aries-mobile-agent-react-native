import { OpenId4VcCredentialHolderBinding, OpenId4VciCredentialBindingOptions, OpenId4VciRequestTokenResponse, OpenId4VciResolvedCredentialOffer } from '@credo-ts/openid4vc';
import { Agent } from '@credo-ts/core';
export declare const resolveOpenId4VciOffer: ({ agent, data, uri, authorization, }: {
    agent: Agent;
    data?: string;
    uri?: string;
    fetchAuthorization?: boolean;
    authorization?: {
        clientId: string;
        redirectUri: string;
    };
}) => Promise<OpenId4VciResolvedCredentialOffer>;
export declare function acquirePreAuthorizedAccessToken({ agent, resolvedCredentialOffer, txCode, }: {
    agent: Agent;
    resolvedCredentialOffer: OpenId4VciResolvedCredentialOffer;
    txCode?: string;
}): Promise<OpenId4VciRequestTokenResponse>;
export declare const customCredentialBindingResolver: ({ agent, supportedDidMethods, supportsAllDidMethods, supportsJwk, credentialFormat, proofTypes }: Partial<OpenId4VciCredentialBindingOptions> & {
    agent: Agent;
    resolvedCredentialOffer: OpenId4VciResolvedCredentialOffer;
    pidSchemes?: {
        sdJwtVcVcts: Array<string>;
        msoMdocDoctypes: Array<string>;
    };
}) => Promise<OpenId4VcCredentialHolderBinding>;
export declare const receiveCredentialFromOpenId4VciOffer: ({ agent, resolvedCredentialOffer, tokenResponse, credentialConfigurationIdsToRequest, clientId, pidSchemes, }: {
    agent: Agent;
    resolvedCredentialOffer: OpenId4VciResolvedCredentialOffer;
    tokenResponse: OpenId4VciRequestTokenResponse;
    credentialConfigurationIdsToRequest?: string[];
    clientId?: string;
    pidSchemes?: {
        sdJwtVcVcts: Array<string>;
        msoMdocDoctypes: Array<string>;
    };
}) => Promise<import("@credo-ts/core").W3cCredentialRecord | import("@credo-ts/core").SdJwtVcRecord | import("@credo-ts/core").MdocRecord | import("@credo-ts/core").W3cV2CredentialRecord>;
//# sourceMappingURL=offerResolve.d.ts.map