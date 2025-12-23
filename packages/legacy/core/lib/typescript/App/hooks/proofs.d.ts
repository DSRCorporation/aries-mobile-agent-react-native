import { ProofExchangeRecord } from '@credo-ts/core';
export declare const useProofsByConnectionId: (connectionId: string) => ProofExchangeRecord[];
export declare const useAllCredentialsForProof: (proofId: string) => Promise<{
    groupedProof: (import("../types/proof-items").ProofCredentialAttributes & import("../types/proof-items").ProofCredentialPredicates)[];
    retrievedCredentials: import("@credo-ts/anoncreds").AnonCredsCredentialsForProofRequest;
    fullCredentials: import("@credo-ts/core").CredentialExchangeRecord[];
    descriptorMetadata: import("../utils/anonCredsProofRequestMapper").DescriptorMetadata;
} | {
    groupedProof: (import("../types/proof-items").ProofCredentialAttributes & import("../types/proof-items").ProofCredentialPredicates)[];
    retrievedCredentials: import("@credo-ts/anoncreds").AnonCredsCredentialsForProofRequest | undefined;
    fullCredentials: import("@credo-ts/core").CredentialExchangeRecord[];
    descriptorMetadata?: undefined;
} | undefined> | undefined;
//# sourceMappingURL=proofs.d.ts.map