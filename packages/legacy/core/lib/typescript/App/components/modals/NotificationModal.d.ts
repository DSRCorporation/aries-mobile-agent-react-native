import React from 'react';
import { ButtonType } from '../buttons/Button';
interface NotificationModalProps extends React.PropsWithChildren {
    title: string;
    doneTitle?: string;
    doneType?: ButtonType;
    doneAccessibilityLabel?: string;
    onDone?: () => void;
    onHome?: () => void;
    doneVisible?: boolean;
    homeVisible?: boolean;
    testID?: string;
    visible?: boolean;
}
declare const NotificationModal: React.FC<NotificationModalProps>;
export default NotificationModal;
//# sourceMappingURL=NotificationModal.d.ts.map