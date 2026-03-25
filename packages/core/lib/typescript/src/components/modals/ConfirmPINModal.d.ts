import React from 'react';
import { ModalState } from '../../hooks/usePINValidation';
interface ConfirmPINModalProps {
    errorModalState?: ModalState;
    modalUsage: ConfirmPINModalUsage;
    onBackPressed: () => void;
    onConfirmPIN: (pin: string) => void;
    PINOne?: string;
    setPINTwo?: (pin: string) => void;
    title: string;
    visible: boolean;
    isLoading: boolean;
}
export declare enum ConfirmPINModalUsage {
    PIN_CREATE = 0,
    PIN_CHANGE = 1
}
declare const ConfirmPINModal: React.FC<ConfirmPINModalProps>;
export default ConfirmPINModal;
//# sourceMappingURL=ConfirmPINModal.d.ts.map