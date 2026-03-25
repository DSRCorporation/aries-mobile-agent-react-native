import React from 'react';
import type { WalletCredentialCardData } from './ui-types';
type Props = {
    data: WalletCredentialCardData;
    onPress?: () => void;
    hasAltCredentials?: boolean;
    onChangeAlt?: () => void;
    elevated?: boolean;
};
declare const WalletCredentialCard: React.FC<Props>;
export default WalletCredentialCard;
//# sourceMappingURL=CardPresenter.d.ts.map