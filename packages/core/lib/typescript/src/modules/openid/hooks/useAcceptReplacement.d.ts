import { OpenIDCredentialRecord } from '../credentialRecord';
/**
 * A hook that provides functions to accept newly issued credentials, handling replacements if applicable.
 */
export declare function useAcceptReplacement(): {
    acceptNewCredential: (newCred: OpenIDCredentialRecord) => Promise<void>;
    acceptById: (newId: string) => Promise<void>;
};
//# sourceMappingURL=useAcceptReplacement.d.ts.map