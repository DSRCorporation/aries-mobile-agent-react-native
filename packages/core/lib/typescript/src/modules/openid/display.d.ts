import type { W3cCredentialDisplay } from './types';
import { MdocRecord, W3cCredentialRecord, W3cV2CredentialRecord } from '@credo-ts/core';
import { SdJwtVcRecord } from '@credo-ts/core';
export interface DisplayImage {
    url?: string;
    altText?: string;
}
export interface CredentialMetadata {
    type: string;
    issuer: string;
    holder?: string;
    validUntil?: string;
    validFrom?: string;
    issuedAt?: string;
}
export declare function filterAndMapSdJwtKeys(sdJwtVcPayload: Record<string, unknown>): {
    visibleProperties: {
        [k: string]: MappedAttributesReturnType;
    };
    metadata: CredentialMetadata;
    raw: {
        issuedAt: Date | undefined;
        validUntil: Date | undefined;
        validFrom: Date | undefined;
    };
};
export declare function getCredentialForDisplay(credentialRecord: W3cCredentialRecord | SdJwtVcRecord | MdocRecord | W3cV2CredentialRecord): W3cCredentialDisplay;
type MappedAttributesReturnType = string | number | boolean | {
    [key: string]: MappedAttributesReturnType;
} | null | undefined | Array<MappedAttributesReturnType>;
export declare function recursivelyMapAttribues(value: unknown): MappedAttributesReturnType;
export {};
//# sourceMappingURL=display.d.ts.map