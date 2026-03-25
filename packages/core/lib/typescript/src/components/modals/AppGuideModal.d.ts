import React from 'react';
import { GenericFn } from '../../types/fn';
interface AppGuideModalProps {
    title: string;
    description?: string;
    onCallToActionPressed?: GenericFn;
    onCallToActionLabel?: string;
    onSecondCallToActionPressed?: GenericFn;
    onSecondCallToActionLabel?: string;
    onDismissPressed: GenericFn;
}
declare const AppGuideModal: React.FC<AppGuideModalProps>;
export default AppGuideModal;
//# sourceMappingURL=AppGuideModal.d.ts.map