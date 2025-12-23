import type { W3cCredentialRecord, SdJwtVcRecord } from '@credo-ts/core';
import type { OpenId4VciCredentialSupported, OpenId4VciIssuerMetadataDisplay } from '@credo-ts/openid4vc';
import type { EndpointMetadataResult } from '@sphereon/oid4vci-common';
export interface OpenId4VcCredentialMetadata {
    credential: {
        display?: OpenId4VciCredentialSupported['display'];
        order?: OpenId4VciCredentialSupported['order'];
    };
    issuer: {
        display?: OpenId4VciIssuerMetadataDisplay[];
        id: string;
    };
}
export declare function extractOpenId4VcCredentialMetadata(credentialMetadata: OpenId4VciCredentialSupported, serverMetadata: EndpointMetadataResult): OpenId4VcCredentialMetadata;
/**
 * Gets the OpenId4Vc credential metadata from the given W3C credential record.
 */
export declare function getOpenId4VcCredentialMetadata(credentialRecord: W3cCredentialRecord | SdJwtVcRecord): OpenId4VcCredentialMetadata | null;
/**
 * Sets the OpenId4Vc credential metadata on the given W3cCredentialRecord or SdJwtVcRecord.
 *
 * NOTE: this does not save the record.
 */
export declare function setOpenId4VcCredentialMetadata(credentialRecord: W3cCredentialRecord | SdJwtVcRecord, metadata: OpenId4VcCredentialMetadata): void;
//# sourceMappingURL=metadata.d.ts.map