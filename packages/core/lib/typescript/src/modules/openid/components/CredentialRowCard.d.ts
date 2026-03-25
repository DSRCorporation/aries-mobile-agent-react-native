import React from 'react';
interface CredentialRowCardProps {
    name: string;
    issuer?: string;
    onPress?(): void;
    bgColor?: string;
    bgImage?: string;
    txtColor?: string;
    hideBorder?: boolean;
    showFullText?: boolean;
}
export declare function OpenIDCredentialRowCard({ name, issuer, bgColor, bgImage, txtColor, onPress }: CredentialRowCardProps): React.JSX.Element;
export {};
//# sourceMappingURL=CredentialRowCard.d.ts.map