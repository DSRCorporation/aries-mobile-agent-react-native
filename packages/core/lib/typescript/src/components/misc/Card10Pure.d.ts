import React from 'react';
import { WalletCredentialCardData } from '../../wallet/ui-types';
type Props = {
    data: WalletCredentialCardData;
    onPress?: () => void;
    hasAltCredentials?: boolean;
    onChangeAlt?: () => void;
    elevated?: boolean;
};
/**
 * Card10Pure: overlay-free Card 10 UI that renders from WalletCredentialCardData.
 * - Passes 'Branding10' to the style hook for layout differences.
 * - No OCA resolution or overlay usage at render time.
 */
declare const Card10Pure: React.FC<Props>;
export default Card10Pure;
//# sourceMappingURL=Card10Pure.d.ts.map