export type ParseInvitationResult = {
    success: true;
    result: ParsedInvitation;
} | {
    success: false;
    error: string;
};
export type ParsedInvitation = {
    type: 'didcomm' | 'openid-credential-offer' | 'openid-authorization-request';
    format: 'url' | 'parsed';
    data: string | Record<string, unknown>;
};
export declare enum InvitationQrTypes {
    OPENID_INITIATE_ISSUANCE = "openid-initiate-issuance://",
    OPENID_CREDENTIAL_OFFER = "openid-credential-offer://",
    OPENID = "openid://",
    OPENID4VP = "openid4vp://",
    OPENID_VC = "openid-vc://",
    DIDCOMM = "didcomm://",
    HTTPS = "https://"
}
export declare const isOpenIdCredentialOffer: (url: string) => boolean;
export declare const isOpenIdPresentationRequest: (url: string) => boolean;
export declare const isDidCommInvitation: (url: string) => boolean;
export declare function parseInvitationUrl(invitationUrl: string): Promise<ParseInvitationResult>;
//# sourceMappingURL=parsers.d.ts.map