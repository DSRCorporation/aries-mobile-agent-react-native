import { DidCommCredentialExchangeRecord } from '@credo-ts/didcomm';
import { AnonCredsProofRequestTemplatePayloadData, CredentialSharedProofData } from '@bifold/verifier';
import { Attribute, CredentialOverlay, Field, OCABundleResolverType } from '@bifold/oca/build/legacy';
import { W3cCredentialDisplay } from '../modules/openid/types';
import { BrandingOverlay } from '@bifold/oca';
export type FieldExt = {
    field: Attribute;
    attribute_name: string;
};
export declare const getAttributeField: (display: W3cCredentialDisplay, searchKey: string) => FieldExt | undefined;
export declare const buildFieldsFromW3cCredsCredential: (display: W3cCredentialDisplay, filterByAttributes?: string[]) => Array<Field>;
export declare const buildFieldsFromAnonCredsCredential: (credential: DidCommCredentialExchangeRecord) => Array<Field>;
export declare const buildFieldsFromAnonCredsProofRequestTemplate: (data: AnonCredsProofRequestTemplatePayloadData) => Array<Field>;
export declare const buildFieldsFromSharedAnonCredsProof: (data: CredentialSharedProofData) => Array<Field>;
export declare const buildOverlayFromW3cCredential: ({ credentialDisplay, language, resolver, }: {
    credentialDisplay: W3cCredentialDisplay;
    language: string;
    resolver: OCABundleResolverType;
}) => Promise<CredentialOverlay<BrandingOverlay>>;
//# sourceMappingURL=oca.d.ts.map