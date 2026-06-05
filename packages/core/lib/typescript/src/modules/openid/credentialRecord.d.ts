import { Agent, ClaimFormat, MdocRecord, SdJwtVcRecord, W3cCredentialRecord, W3cV2CredentialRecord } from '@credo-ts/core';
import { OpenId4VPRequestRecord, OpenIDCredentialType } from './types';
export type OpenIDCredentialRecord = W3cCredentialRecord | SdJwtVcRecord | MdocRecord | W3cV2CredentialRecord;
export type OpenIDCredentialRecordType = OpenIDCredentialType | 'W3cV2CredentialRecord';
export declare const isOpenIDCredentialRecord: (value: unknown) => value is OpenIDCredentialRecord;
export declare const isOpenIdProofRequestRecord: (value: unknown) => value is OpenId4VPRequestRecord;
export declare const getOpenIDCredentialType: (record: OpenIDCredentialRecord) => OpenIDCredentialRecordType;
export declare const getOpenIDCredentialClaimFormat: (record: OpenIDCredentialRecord) => ClaimFormat;
export declare const toOpenIDCredentialLite: (record: OpenIDCredentialRecord) => {
    id: string;
    format: ClaimFormat;
    createdAt: string;
    issuer: undefined;
};
export declare function storeOpenIDCredential(agent: Agent, record: OpenIDCredentialRecord): Promise<W3cCredentialRecord | SdJwtVcRecord | MdocRecord | W3cV2CredentialRecord>;
export declare function deleteOpenIDCredential(agent: Agent, record: OpenIDCredentialRecord): Promise<void>;
export declare function getOpenIDCredentialById(agent: Agent, type: OpenIDCredentialRecordType, id: string): Promise<OpenIDCredentialRecord | undefined>;
export declare function findOpenIDCredentialById(agent: Agent, id: string): Promise<OpenIDCredentialRecord | undefined>;
//# sourceMappingURL=credentialRecord.d.ts.map