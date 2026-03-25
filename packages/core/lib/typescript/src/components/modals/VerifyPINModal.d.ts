import React from 'react';
import { PINEntryUsage } from '../../screens/PINVerify';
interface VerifyPINModalProps {
    title: string;
    onBackPressed: () => void;
    onAuthenticationComplete: (...args: any[]) => void | boolean;
    onCancelAuth: () => void;
    PINVerifyModalUsage: PINEntryUsage;
    visible: boolean;
}
declare const VerifyPINModal: React.FC<VerifyPINModalProps>;
export default VerifyPINModal;
//# sourceMappingURL=VerifyPINModal.d.ts.map