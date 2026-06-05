import { OpenId4VPRequestRecord } from '../types';
import { OpenIDCredentialRecord } from '../credentialRecord';
type OpenIDContextProps = {
    openIDUri?: string;
    openIDPresentationUri?: string;
};
export declare const useOpenID: ({ openIDUri, openIDPresentationUri, }: OpenIDContextProps) => OpenIDCredentialRecord | OpenId4VPRequestRecord | undefined;
export {};
//# sourceMappingURL=openid.d.ts.map