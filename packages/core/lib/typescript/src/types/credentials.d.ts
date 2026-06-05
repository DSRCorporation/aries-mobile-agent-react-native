import { MdocRecord, SdJwtVcRecord, W3cCredentialRecord, W3cV2CredentialRecord } from '@credo-ts/core';
import { DidCommCredentialExchangeRecord } from '@credo-ts/didcomm';
export declare enum CredentialErrors {
    Revoked = 0,// Credential has been revoked
    NotInWallet = 1,// Credential requested for proof does not exists in users wallet
    PredicateError = 2
}
export type GenericCredentialExchangeRecord = DidCommCredentialExchangeRecord | W3cCredentialRecord | W3cV2CredentialRecord | SdJwtVcRecord | MdocRecord;
//# sourceMappingURL=credentials.d.ts.map