import type { W3cCredentialDisplay } from './types';
import { OpenIDCredentialRecord } from './credentialRecord';
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
export declare function getCredentialForDisplay(credentialRecord: OpenIDCredentialRecord): W3cCredentialDisplay;
type MappedAttributesReturnType = string | number | boolean | {
    [key: string]: MappedAttributesReturnType;
} | null | undefined | Array<MappedAttributesReturnType>;
export declare function recursivelyMapAttribues(value: unknown): MappedAttributesReturnType;
export {};
//# sourceMappingURL=display.d.ts.map