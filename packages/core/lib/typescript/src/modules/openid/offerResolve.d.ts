import { OpenId4VcCredentialHolderBinding, OpenId4VciCredentialBindingOptions, OpenId4VciDpopRequestOptions, OpenId4VciRequestTokenResponse, OpenId4VciResolvedCredentialOffer } from '@credo-ts/openid4vc';
import { Agent, Kms } from '@credo-ts/core';
import { OpenIDCredentialRecord } from './credentialRecord';
type CredentialBindingResolverOptions = Pick<OpenId4VciCredentialBindingOptions, 'credentialFormat' | 'proofTypes' | 'supportedDidMethods' | 'supportsAllDidMethods' | 'supportsJwk'> & {
    agent: Agent;
    enableHardwareBackedHolderBinding?: boolean;
    holderBindingKey?: Kms.PublicJwk;
};
/**
 * Creates a holder-binding key for OpenID4VCI proof signing.
 *
 * When hardware-backed holder binding is enabled the key is created in the secure environment.
 * Otherwise the agent's default KMS backend is used.
 */
export declare const createHolderBindingKey: ({ agent, signatureAlgorithm, enableHardwareBackedHolderBinding, }: {
    agent: Agent;
    signatureAlgorithm: Kms.KnownJwaSignatureAlgorithm;
    enableHardwareBackedHolderBinding?: boolean;
}) => Promise<Kms.PublicJwk>;
/**
 * Selects the DPoP signing algorithm advertised by the authorization server.
 *
 * A missing `dpop_signing_alg_values_supported` value means DPoP is not used. Hardware-backed
 * keys require ES256 because the secure environment backend only supports P-256 signing.
 */
export declare const getDpopSignatureAlgorithm: ({ dpopSigningAlgValuesSupported, enableHardwareBackedHolderBinding, }: {
    dpopSigningAlgValuesSupported?: string[];
    enableHardwareBackedHolderBinding?: boolean;
}) => Kms.KnownJwaSignatureAlgorithm | undefined;
/**
 * Resolves an OpenID4VCI credential offer URI into issuer metadata and offered credential
 * configurations. Parsed offer payloads are converted back into an offer URI because Credo
 * currently expects a credential offer string.
 */
export declare const resolveOpenId4VciOffer: ({ agent, data, uri, authorization, }: {
    agent: Agent;
    data?: unknown;
    uri?: string;
    fetchAuthorization?: boolean;
    authorization?: {
        clientId: string;
        redirectUri: string;
    };
}) => Promise<OpenId4VciResolvedCredentialOffer>;
/**
 * Requests an access token for a pre-authorized OpenID4VCI offer.
 *
 * If DPoP options are provided, Credo signs the token request with that key and returns the
 * DPoP nonce/key metadata in the token response.
 */
export declare function acquirePreAuthorizedAccessToken({ agent, resolvedCredentialOffer, txCode, dpop, }: {
    agent: Agent;
    resolvedCredentialOffer: OpenId4VciResolvedCredentialOffer;
    txCode?: string;
    dpop?: OpenId4VciDpopRequestOptions;
}): Promise<OpenId4VciRequestTokenResponse>;
/**
 * Resolves the holder binding used for the credential request proof of possession.
 *
 * If a holder binding key is supplied, it is reused. This lets DPoP and credential binding share
 * the same key when required by product policy. If no key is supplied, a new key is created based
 * on the issuer-supported proof algorithm and the hardware-backed holder binding setting.
 */
export declare const customCredentialBindingResolver: ({ agent, supportedDidMethods, supportsAllDidMethods, supportsJwk, credentialFormat, proofTypes, enableHardwareBackedHolderBinding, holderBindingKey, }: CredentialBindingResolverOptions) => Promise<OpenId4VcCredentialHolderBinding>;
/**
 * Requests and stores credentials from a resolved OpenID4VCI offer using an existing token response.
 *
 * The credential binding resolver can receive a pre-created holder binding key. When supplied, that
 * key is reused for the credential proof; otherwise the resolver creates the key itself.
 */
export declare const receiveCredentialFromOpenId4VciOffer: ({ agent, resolvedCredentialOffer, tokenResponse, credentialConfigurationIdsToRequest, clientId, enableHardwareBackedHolderBinding, holderBindingKey, }: {
    agent: Agent;
    resolvedCredentialOffer: OpenId4VciResolvedCredentialOffer;
    tokenResponse: OpenId4VciRequestTokenResponse;
    credentialConfigurationIdsToRequest?: string[];
    clientId?: string;
    enableHardwareBackedHolderBinding?: boolean;
    holderBindingKey?: Kms.PublicJwk;
}) => Promise<OpenIDCredentialRecord>;
export {};
//# sourceMappingURL=offerResolve.d.ts.map