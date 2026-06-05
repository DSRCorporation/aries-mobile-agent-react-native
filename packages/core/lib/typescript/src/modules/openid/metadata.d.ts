import { AgentContext } from '@credo-ts/core';
import type { OpenId4VciCredentialIssuerMetadataDisplay, OpenId4VciMetadata, OpenId4VciRequestTokenResponse } from '@credo-ts/openid4vc';
import { RefreshCredentialMetadata, RefreshStatus } from './refresh/types';
import { CredentialDisplay, CredentialSubjectRecord } from './types';
import { OpenIDCredentialRecord } from './credentialRecord';
export declare const openId4VcCredentialMetadataKey = "_bifold/openId4VcCredentialMetadata";
export declare const refreshCredentialMetadataKey = "_bifold/refreshCredentialMetadata";
export interface OpenId4VcCredentialMetadata {
    credential: {
        display?: CredentialDisplay[];
        order?: unknown;
        credential_subject?: CredentialSubjectRecord;
    };
    issuer: {
        display?: OpenId4VciCredentialIssuerMetadataDisplay[];
        id: string;
    };
}
type CredentialSupported = {
    display: CredentialDisplay[];
    order?: unknown;
};
export type OpenId4VcCredentialMetadataExtended = Partial<CredentialSupported & {
    credential_subject: CredentialSubjectRecord;
}>;
export type OpenIDCredentialNotificationMetadata = {
    notificationMetadata?: OpenId4VciMetadata;
    tokenResponse?: OpenId4VciRequestTokenResponse;
};
export declare function extractOpenId4VcCredentialMetadata(credentialMetadata: Partial<CredentialSupported & {
    credential_subject: CredentialSubjectRecord;
}>, serverMetadata: {
    display?: OpenId4VciCredentialIssuerMetadataDisplay[];
    id: string;
}): OpenId4VcCredentialMetadata;
/**
 * Gets the OpenId4Vc credential metadata from the given W3C credential record.
 */
export declare function getOpenId4VcCredentialMetadata(credentialRecord: OpenIDCredentialRecord): OpenId4VcCredentialMetadata | null;
/**
 * Sets the OpenId4Vc credential metadata on the given W3cCredentialRecord or SdJwtVcRecord.
 *
 * NOTE: this does not save the record.
 */
export declare function setOpenId4VcCredentialMetadata(credentialRecord: OpenIDCredentialRecord, metadata: OpenId4VcCredentialMetadata): void;
/**
 * Gets the refresh credential metadata from the given credential record.
 */
export declare function getRefreshCredentialMetadata(credentialRecord: OpenIDCredentialRecord): RefreshCredentialMetadata | null;
/**
 * Sets the refresh credential metadata on the given credential record
 *
 * NOTE: this does not save the record.
 */
export declare function setRefreshCredentialMetadata(credentialRecord: OpenIDCredentialRecord, metadata: RefreshCredentialMetadata): void;
export declare function deleteRefreshCredentialMetadata(credentialRecord: OpenIDCredentialRecord): void;
export declare function persistCredentialRecord(agentContext: AgentContext, record: OpenIDCredentialRecord): Promise<void>;
export declare function markOpenIDCredentialStatus({ credential, status, agentContext, }: {
    credential: OpenIDCredentialRecord;
    status: RefreshStatus;
    agentContext: AgentContext;
}): Promise<void>;
export declare const temporaryMetaVanillaObject: OpenIDCredentialNotificationMetadata;
export {};
//# sourceMappingURL=metadata.d.ts.map