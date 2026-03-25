import { MdocRecord, SdJwtVcRecord, W3cCredentialRecord, W3cV2CredentialRecord } from '@credo-ts/core';
import { OpenId4VPRequestRecord } from '../types';
type OpenIDContextProps = {
    openIDUri?: string;
    openIDPresentationUri?: string;
};
export declare const useOpenID: ({ openIDUri, openIDPresentationUri, }: OpenIDContextProps) => SdJwtVcRecord | W3cCredentialRecord | MdocRecord | OpenId4VPRequestRecord | W3cV2CredentialRecord | undefined;
export {};
//# sourceMappingURL=openid.d.ts.map