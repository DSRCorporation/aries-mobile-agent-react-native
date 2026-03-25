import { useServices, TOKENS } from '../../container-api';
import { useAppAgent } from '../../utils/agent';
export let NotificationEventType = /*#__PURE__*/function (NotificationEventType) {
  NotificationEventType["CREDENTIAL_ACCEPTED"] = "credential_accepted";
  NotificationEventType["CREDENTIAL_DELETED"] = "credential_deleted";
  NotificationEventType["CREDENTIAL_FAILURE"] = "credential_failure";
  return NotificationEventType;
}({});

//TODO: ADD TYPE SAFETY

export const useOpenId4VciNotifications = () => {
  const {
    agent
  } = useAppAgent();
  const [logger] = useServices([TOKENS.UTIL_LOGGER, TOKENS.UTIL_OCA_RESOLVER]);

  /**
   * Sends notification to issuer with credential status.
   * @param options
   */
  const sendOpenId4VciNotification = async options => {
    if (!agent) {
      const error = 'Agent undefined!';
      logger.error(`[OpenIDCredentialNotification] ${error}`);
      throw new Error(error);
    }
    await agent.modules.openid4vc.holder.sendNotification({
      notificationId: options.notificationId,
      metadata: options === null || options === void 0 ? void 0 : options.notificationMetadata,
      accessToken: options === null || options === void 0 ? void 0 : options.accessToken,
      notificationEvent: options === null || options === void 0 ? void 0 : options.notificationEvent
    });
  };
  return {
    sendOpenId4VciNotification
  };
};
//# sourceMappingURL=notification.js.map