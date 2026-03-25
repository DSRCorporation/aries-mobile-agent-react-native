import { DidCommProofExchangeRecord } from '@credo-ts/didcomm';
export declare const useProofsByConnectionId: (connectionId: string) => DidCommProofExchangeRecord[];
export declare const useAllCredentialsForProof: (proofId: string) => Promise<import("../types/proof-items").CredentialDataForProof | undefined> | undefined;
//# sourceMappingURL=proofs.d.ts.map