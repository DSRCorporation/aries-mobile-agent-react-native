import React from 'react';
import { GenericFn } from '../../types/fn';
import { ModalUsage } from '../../types/remove';
interface CommonRemoveModalProps {
    usage: ModalUsage;
    onSubmit?: GenericFn;
    onCancel?: GenericFn;
    visible?: boolean;
    extraDetails?: string;
}
declare const CommonRemoveModal: React.FC<CommonRemoveModalProps>;
export default CommonRemoveModal;
//# sourceMappingURL=CommonRemoveModal.d.ts.map