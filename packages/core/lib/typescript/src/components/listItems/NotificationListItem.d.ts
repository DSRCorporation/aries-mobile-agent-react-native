import { DidCommBasicMessageRecord, DidCommProofExchangeRecord, DidCommCredentialExchangeRecord } from '@credo-ts/didcomm';
import React from 'react';
import { CustomNotification, CustomNotificationRecord } from '../../types/notification';
export declare enum NotificationType {
    BasicMessage = "BasicMessage",
    CredentialOffer = "Offer",
    ProofRequest = "ProofRecord",
    Revocation = "Revocation",
    Custom = "Custom",
    Proof = "Proof"
}
export interface NotificationListItemProps {
    notificationType: NotificationType;
    notification: DidCommBasicMessageRecord | DidCommCredentialExchangeRecord | DidCommProofExchangeRecord | CustomNotificationRecord;
    customNotification?: CustomNotification;
}
declare const NotificationListItem: React.FC<NotificationListItemProps>;
export default NotificationListItem;
//# sourceMappingURL=NotificationListItem.d.ts.map