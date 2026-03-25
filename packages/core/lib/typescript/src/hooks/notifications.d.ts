import { MdocRecord, SdJwtVcRecord, W3cCredentialRecord, W3cV2CredentialRecord } from '@credo-ts/core';
import { DidCommBasicMessageRecord, DidCommCredentialExchangeRecord as CredentialRecord, DidCommProofExchangeRecord } from '@credo-ts/didcomm';
import { CustomNotification } from '../types/notification';
import { OpenId4VPRequestRecord } from '../modules/openid/types';
export type NotificationsInputProps = {
    openIDUri?: string;
    openIDPresentationUri?: string;
};
export type NotificationItemType = DidCommBasicMessageRecord | CredentialRecord | DidCommProofExchangeRecord | CustomNotification | SdJwtVcRecord | W3cCredentialRecord | W3cV2CredentialRecord | MdocRecord | OpenId4VPRequestRecord;
export type NotificationReturnType = Array<NotificationItemType>;
export declare const useNotifications: ({ openIDUri, openIDPresentationUri, }: NotificationsInputProps) => NotificationReturnType;
//# sourceMappingURL=notifications.d.ts.map