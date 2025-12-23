import React from 'react';
import { GenericFn } from '../../types/fn';
export declare enum InfoBoxType {
    Info = 0,
    Success = 1,
    Warn = 2,
    Error = 3
}
interface BifoldErrorProps {
    notificationType: InfoBoxType;
    title: string;
    description?: string;
    bodyContent?: Element;
    message?: string;
    secondaryCallToActionTitle?: string;
    secondaryCallToActionPressed?: GenericFn;
    onCallToActionPressed?: GenericFn;
    onCallToActionLabel?: string;
    onClosePressed?: GenericFn;
}
declare const InfoBox: React.FC<BifoldErrorProps>;
export default InfoBox;
//# sourceMappingURL=InfoBox.d.ts.map