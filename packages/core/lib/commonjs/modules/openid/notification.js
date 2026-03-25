"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOpenId4VciNotifications = exports.NotificationEventType = void 0;
var _containerApi = require("../../container-api");
var _agent = require("../../utils/agent");
let NotificationEventType = exports.NotificationEventType = /*#__PURE__*/function (NotificationEventType) {
  NotificationEventType["CREDENTIAL_ACCEPTED"] = "credential_accepted";
  NotificationEventType["CREDENTIAL_DELETED"] = "credential_deleted";
  NotificationEventType["CREDENTIAL_FAILURE"] = "credential_failure";
  return NotificationEventType;
}({}); //TODO: ADD TYPE SAFETY
const useOpenId4VciNotifications = () => {
  const {
    agent
  } = (0, _agent.useAppAgent)();
  const [logger] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.UTIL_OCA_RESOLVER]);

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
exports.useOpenId4VciNotifications = useOpenId4VciNotifications;
//# sourceMappingURL=notification.js.map