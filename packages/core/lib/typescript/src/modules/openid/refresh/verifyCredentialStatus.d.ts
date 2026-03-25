import type { MdocRecord, SdJwtVcRecord, W3cCredentialRecord, W3cV2CredentialRecord } from '@credo-ts/core';
import type { BifoldLogger } from '../../../services/logger';
type AnyCred = W3cCredentialRecord | SdJwtVcRecord | MdocRecord | W3cV2CredentialRecord;
/**
 * Verifies credential status for Sd-JWT credentials using status lists.
 * Non–Sd-JWT credentials (W3C jwt_vc_json without status list, or mdoc) are treated as valid here.
 * Returns true if valid; false if revoked/invalid or on error.
 */
export declare function verifyCredentialStatus(rec: AnyCred, logger?: BifoldLogger): Promise<boolean>;
export {};
//# sourceMappingURL=verifyCredentialStatus.d.ts.map