import { SdJwtVcRecord, W3cCredentialRecord, MdocRecord, W3cV2CredentialRecord } from '@credo-ts/core';
type AnyCred = W3cCredentialRecord | SdJwtVcRecord | MdocRecord | W3cV2CredentialRecord;
/**
 * A hook that provides functions to accept newly issued credentials, handling replacements if applicable.
 */
export declare function useAcceptReplacement(): {
    acceptNewCredential: (newCred: AnyCred) => Promise<void>;
    acceptById: (newId: string) => Promise<void>;
};
export {};
//# sourceMappingURL=useAcceptReplacement.d.ts.map