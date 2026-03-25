import { OpenId4VciRequestTokenResponse, OpenId4VciMetadata } from '@credo-ts/openid4vc';
export declare enum NotificationEventType {
    CREDENTIAL_ACCEPTED = "credential_accepted",
    CREDENTIAL_DELETED = "credential_deleted",
    CREDENTIAL_FAILURE = "credential_failure"
}
interface sendOpenId4VciNotificationOptions {
    notificationId: string;
    notificationMetadata: OpenId4VciMetadata;
    accessToken: OpenId4VciRequestTokenResponse['accessToken'];
    notificationEvent: NotificationEventType;
}
export declare const useOpenId4VciNotifications: () => {
    sendOpenId4VciNotification: (options: sendOpenId4VciNotificationOptions) => Promise<void>;
};
export {};
//# sourceMappingURL=notification.d.ts.map