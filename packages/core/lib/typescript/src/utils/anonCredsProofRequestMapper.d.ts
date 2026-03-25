import { AnonCredsCredentialTags, AnonCredsCredentialsForProofRequest, AnonCredsProofRequest, AnonCredsRequestedAttribute, AnonCredsRequestedPredicate } from '@credo-ts/anoncreds';
import { DifPexCredentialsForRequest, DifPresentationExchangeDefinition, W3cCredentialRecord } from '@credo-ts/core';
import { ProofCredentialAttributes, ProofCredentialPredicates } from '../types/proof-items';
export type RecordWithMetadata = {
    record: W3cCredentialRecord;
    anonCredsTags: AnonCredsCredentialTags;
};
export type DescriptorMetadata = {
    [key: string]: RecordWithMetadata[];
};
export interface DifPexAnonCredsProofRequest extends AnonCredsProofRequest {
    requested_attributes: Record<string, AnonCredsRequestedAttribute & {
        descriptorId?: string;
    }>;
    requested_predicates: Record<string, AnonCredsRequestedPredicate & {
        descriptorId?: string;
    }>;
}
export type ProcessedAttributes = {
    [key: string]: ProofCredentialAttributes;
};
export type ProcessedPredicates = {
    [key: string]: ProofCredentialPredicates;
};
export declare const createAnonCredsProofRequest: (presentationDefinition: DifPresentationExchangeDefinition, descriptorMetadata: DescriptorMetadata) => DifPexAnonCredsProofRequest;
export declare const getDescriptorMetadata: (credentialsForRequest: DifPexCredentialsForRequest) => DescriptorMetadata;
/**
 * The matches returned by our artificial anonCredsProofRequest could contain matches,
 * which are not valid thus we need to filter them out
 */
export declare const filterInvalidProofRequestMatches: (anonCredsCredentialsForRequest: AnonCredsCredentialsForProofRequest, descriptorMetadata: DescriptorMetadata) => AnonCredsCredentialsForProofRequest;
//# sourceMappingURL=anonCredsProofRequestMapper.d.ts.map