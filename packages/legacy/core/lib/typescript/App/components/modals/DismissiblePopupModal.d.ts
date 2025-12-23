import React from 'react';
import { GenericFn } from '../../types/fn';
interface DismissiblePopupModalProps {
    title: string;
    description?: string;
    onCallToActionPressed?: GenericFn;
    onCallToActionLabel?: string;
    onDismissPressed: GenericFn;
}
declare const DismissiblePopupModal: React.FC<DismissiblePopupModalProps>;
export default DismissiblePopupModal;
//# sourceMappingURL=DismissiblePopupModal.d.ts.map