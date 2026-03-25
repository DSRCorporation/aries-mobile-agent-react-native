import React, { PropsWithChildren } from 'react';
import { BrandingOverlay } from '@bifold/oca';
import { CredentialOverlay } from '@bifold/oca/build/legacy';
import { MdocRecord, SdJwtVcRecord, W3cCredentialRecord, W3cV2CredentialRecord } from '@credo-ts/core';
import { OpenIDCredentialType } from '../types';
type OpenIDCredentialRecord = W3cCredentialRecord | SdJwtVcRecord | MdocRecord | W3cV2CredentialRecord | undefined;
export type OpenIDCredentialContext = {
    openIdState: OpenIDCredentialRecordState;
    getW3CCredentialById: (id: string) => Promise<W3cCredentialRecord | undefined>;
    getSdJwtCredentialById: (id: string) => Promise<SdJwtVcRecord | undefined>;
    getMdocCredentialById: (id: string) => Promise<MdocRecord | undefined>;
    storeCredential: (cred: W3cCredentialRecord | SdJwtVcRecord | MdocRecord | W3cV2CredentialRecord) => Promise<void>;
    removeCredential: (cred: W3cCredentialRecord | SdJwtVcRecord | MdocRecord | W3cV2CredentialRecord, type: OpenIDCredentialType) => Promise<void>;
    resolveBundleForCredential: (credential: SdJwtVcRecord | W3cCredentialRecord | MdocRecord | W3cV2CredentialRecord) => Promise<CredentialOverlay<BrandingOverlay>>;
};
export type OpenIDCredentialRecordState = {
    openIDCredentialRecords: Array<OpenIDCredentialRecord>;
    w3cCredentialRecords: Array<W3cCredentialRecord>;
    sdJwtVcRecords: Array<SdJwtVcRecord>;
    mdocVcRecords: Array<MdocRecord>;
    isLoading: boolean;
};
interface OpenIDCredentialProviderProps {
    children: React.ReactNode;
}
export declare const OpenIDCredentialRecordProvider: React.FC<PropsWithChildren<OpenIDCredentialProviderProps>>;
export declare const useOpenIDCredentials: () => OpenIDCredentialContext;
export {};
//# sourceMappingURL=OpenIDCredentialRecordProvider.d.ts.map