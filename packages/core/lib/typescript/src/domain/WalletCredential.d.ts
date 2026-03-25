export type AttrFormat = 'date' | 'datetime' | 'image' | 'text';
export interface CardAttribute {
    key: string;
    label: string;
    value: string | number | null;
    format?: AttrFormat;
    isPII?: boolean;
    hasError?: boolean;
    predicate?: {
        present: boolean;
        satisfied?: boolean;
        text?: string;
    };
}
export interface BrandingBits {
    primaryBg?: string;
    secondaryBg?: string;
    logo1x1Uri?: string;
    backgroundSliceUri?: string;
    backgroundFullUri?: string;
    watermark?: string;
}
export type CardStatus = 'error' | 'warning' | undefined;
export interface WalletCredentialCardData {
    id: string;
    issuerName: string;
    credentialName: string;
    connectionLabel?: string;
    branding: BrandingBits;
    items: CardAttribute[];
    primaryAttributeKey?: string;
    secondaryAttributeKey?: string;
    proofContext?: boolean;
    revoked?: boolean;
    notInWallet?: boolean;
    allPI?: boolean;
    helpActionUrl?: string;
    preferredTextColor?: string;
    status?: CardStatus;
}
//# sourceMappingURL=WalletCredential.d.ts.map