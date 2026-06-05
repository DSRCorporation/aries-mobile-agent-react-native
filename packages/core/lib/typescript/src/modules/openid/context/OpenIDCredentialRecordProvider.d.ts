import React, { PropsWithChildren } from 'react';
import { BrandingOverlay } from '@bifold/oca';
import { CredentialOverlay } from '@bifold/oca/build/legacy';
import { MdocRecord, SdJwtVcRecord, W3cCredentialRecord } from '@credo-ts/core';
import { OpenIDCredentialType } from '../types';
import { OpenIDCredentialRecord } from '../credentialRecord';
export type OpenIDCredentialContext = {
    openIdState: OpenIDCredentialRecordState;
    getW3CCredentialById: (id: string) => Promise<W3cCredentialRecord | undefined>;
    getSdJwtCredentialById: (id: string) => Promise<SdJwtVcRecord | undefined>;
    getMdocCredentialById: (id: string) => Promise<MdocRecord | undefined>;
    getCredentialById: (id: string, type?: OpenIDCredentialType) => Promise<OpenIDCredentialRecord | undefined>;
    storeCredential: (cred: OpenIDCredentialRecord) => Promise<void>;
    removeCredential: (cred: OpenIDCredentialRecord, type: OpenIDCredentialType) => Promise<void>;
    resolveBundleForCredential: (credential: OpenIDCredentialRecord) => Promise<CredentialOverlay<BrandingOverlay>>;
};
export type OpenIDCredentialRecordState = {
    openIDCredentialRecords: Array<OpenIDCredentialRecord | undefined>;
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