import React from 'react';
import type { CardAttribute } from '../../wallet/ui-types';
type Props = {
    list: CardAttribute[];
    textColor: string;
    showPiiWarning: boolean;
    isNotInWallet?: boolean;
    hasAltCredentials?: boolean;
    onChangeAlt?: () => void;
    helpActionUrl?: string;
    styles: any;
};
declare const CredentialCardAttributeList: React.FC<Props>;
export default CredentialCardAttributeList;
//# sourceMappingURL=CredentialCardAttributeList.d.ts.map