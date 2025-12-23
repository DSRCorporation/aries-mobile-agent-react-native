import { CredentialExchangeRecord } from '@credo-ts/core';
import { AnonCredsProofRequestTemplatePayloadData, CredentialSharedProofData } from '@hyperledger/aries-bifold-verifier';
import { Field } from '@hyperledger/aries-oca/build/legacy';
export declare const buildFieldsFromAnonCredsCredential: (credential: CredentialExchangeRecord) => Array<Field>;
export declare const buildFieldsFromAnonCredsProofRequestTemplate: (data: AnonCredsProofRequestTemplatePayloadData) => Array<Field>;
export declare const buildFieldsFromSharedAnonCredsProof: (data: CredentialSharedProofData) => Array<Field>;
//# sourceMappingURL=oca.d.ts.map