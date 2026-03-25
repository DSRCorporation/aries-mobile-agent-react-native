import { InlineMessageProps } from '../components/inputs/InlineErrorText';
import { PINValidationsType } from '../utils/PINValidation';
export interface ModalState {
    visible: boolean;
    title: string;
    message: string;
    onModalDismiss?: () => void;
}
export declare const usePINValidation: (PIN: string) => {
    PINValidations: PINValidationsType[];
    validatePINEntry: (pinOne: string, pinTwo: string) => boolean;
    inlineMessageField1: InlineMessageProps | undefined;
    inlineMessageField2: InlineMessageProps | undefined;
    modalState: ModalState;
    setModalState: import("react").Dispatch<import("react").SetStateAction<ModalState>>;
    clearModal: () => void;
    PINSecurity: import("../types/security").PINSecurityParams;
    comparePINEntries: (pinOne: string, pinTwo: string) => boolean;
    setInlineMessageField1: import("react").Dispatch<import("react").SetStateAction<InlineMessageProps | undefined>>;
    setInlineMessageField2: import("react").Dispatch<import("react").SetStateAction<InlineMessageProps | undefined>>;
};
//# sourceMappingURL=usePINValidation.d.ts.map