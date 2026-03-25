import { CredentialErrors, GenericCredentialExchangeRecord } from '../../../types/credentials';
/**
 * Computes the UI error list for a credential by:
 *   1) Checking the in-memory registry (live session truth)
 *   2) Falling back to persisted refresh metadata (after app restart)
 * You can merge with any existing `propErrors` provided by the caller.
 */
export declare function useCredentialErrorsFromRegistry(credential: GenericCredentialExchangeRecord | undefined, propErrors?: CredentialErrors[]): CredentialErrors[];
//# sourceMappingURL=useCredentialErrorsFromRegistry.d.ts.map