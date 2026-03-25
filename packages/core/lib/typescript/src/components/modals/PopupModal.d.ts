import React from 'react';
import { GenericFn } from '../../types/fn';
import { InfoBoxType } from '../misc/InfoBox';
interface PopupModalProps {
    notificationType: InfoBoxType;
    title: string;
    description?: string;
    message?: string;
    bodyContent?: Element;
    onCallToActionPressed?: GenericFn;
    onCallToActionLabel: string;
}
declare const PopupModal: React.FC<PopupModalProps>;
export default PopupModal;
//# sourceMappingURL=PopupModal.d.ts.map