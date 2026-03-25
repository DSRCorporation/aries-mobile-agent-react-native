import React from 'react';
import { GenericFn } from '../../types/fn';
export declare enum InfoBoxType {
    Info = 0,
    Success = 1,
    Warn = 2,
    Error = 3
}
interface InfoBoxProps {
    notificationType: InfoBoxType;
    title: string;
    description?: string;
    bodyContent?: Element;
    message?: string;
    callToActionDisabled?: boolean;
    callToActionIcon?: React.ReactNode;
    secondaryCallToActionTitle?: string;
    secondaryCallToActionPressed?: GenericFn;
    secondaryCallToActionDisabled?: boolean;
    secondaryCallToActionIcon?: React.ReactNode;
    onCallToActionPressed?: GenericFn;
    onCallToActionLabel?: string;
    onClosePressed?: GenericFn;
    showVersionFooter?: boolean;
    renderShowDetails?: boolean;
}
declare const InfoBox: React.FC<InfoBoxProps>;
export default InfoBox;
//# sourceMappingURL=InfoBox.d.ts.map