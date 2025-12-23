import { AnonCredsCredentialsForProofRequest } from '@credo-ts/anoncreds';
import { DifPexCredentialsForRequest, W3cCredentialRecord } from '@credo-ts/core';
import { DifPexAnonCredsProofRequest } from '../../../App/utils/anonCredsProofRequestMapper';
export declare const testW3cCredentialRecord: W3cCredentialRecord;
export declare const testW3cCredentialRecord2: W3cCredentialRecord;
export declare const anonCredsPresentationRequest: DifPexAnonCredsProofRequest;
export declare const anonCredsCredentialsForProofRequest: AnonCredsCredentialsForProofRequest;
export declare const difPexCredentialsForRequest: DifPexCredentialsForRequest;
export declare const difPexCredentialsForRequest2: DifPexCredentialsForRequest;
export declare const testPresentationDefinition1: {
    id: string;
    name: string;
    purpose: string;
    input_descriptors: ({
        id: string;
        schema: {
            uri: string;
        }[];
        constraints: {
            limit_disclosure: "required";
            fields: ({
                path: string[];
                predicate: "preferred";
                filter: {
                    type: string;
                    maximum: number;
                };
                const?: undefined;
            } | {
                path: string[];
                const: string;
                predicate?: undefined;
                filter?: undefined;
            })[];
        };
    } | {
        id: string;
        schema: {
            uri: string;
        }[];
        constraints: {
            limit_disclosure: "required";
            fields: ({
                path: string[];
                const?: undefined;
            } | {
                path: string[];
                const: string;
            })[];
        };
    } | {
        id: string;
        schema: {
            uri: string;
        }[];
        constraints: {
            limit_disclosure: "required";
            fields: ({
                path: string[];
                filter?: undefined;
            } | {
                path: string[];
                filter: {
                    type: string;
                    const: string;
                };
            })[];
        };
    })[];
};
//# sourceMappingURL=w3c-proof-request.d.ts.map