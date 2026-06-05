"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUpgradeExpiredCredential = void 0;
var _react = require("react");
var _native = require("@react-navigation/native");
var _reactHooks = require("@bifold/react-hooks");
var _navigators = require("../../../types/navigators");
var _OpenIDCredentialRecordProvider = require("../context/OpenIDCredentialRecordProvider");
var _containerApi = require("../../../container-api");
var _operations = require("../refresh/operations");
// modules/openid/hooks/useUpgradeExpiredCredential.ts

const useUpgradeExpiredCredential = () => {
  const navigation = (0, _native.useNavigation)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const {
    getCredentialById
  } = (0, _OpenIDCredentialRecordProvider.useOpenIDCredentials)();
  const [logger] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER]);
  const upgrade = (0, _react.useCallback)(async oldId => {
    if (!agent) {
      logger === null || logger === void 0 || logger.warn('⚠️ [Upgrade] Agent not ready, cannot upgrade credential');
      return;
    }
    logger === null || logger === void 0 || logger.info(`🔁 [Upgrade] Starting upgrade flow for oldId=${oldId}`);
    const rec = await getCredentialById(oldId);
    if (!rec) {
      logger === null || logger === void 0 || logger.warn(`⚠️ [Upgrade] No full record found for oldId=${oldId}`);
      return;
    }
    const newRecord = await (0, _operations.refreshAndQueueReplacement)({
      agent,
      logger,
      record: rec
    });
    if (!newRecord) {
      logger === null || logger === void 0 || logger.warn(`⚠️ [Upgrade] Could not issue replacement for oldId=${oldId}`);
      return;
    }
    logger === null || logger === void 0 || logger.info(`💾 [Upgrade] New credential issued ${newRecord.id} from oldId=${oldId}`);

    // Navigate to the OpenID offer screen, passing the new record directly
    navigation.navigate(_navigators.Stacks.ConnectionStack, {
      screen: _navigators.Screens.OpenIDCredentialOffer,
      params: {
        credential: newRecord
      }
    });
  }, [agent, logger, navigation, getCredentialById]);
  return {
    upgrade
  };
};
exports.useUpgradeExpiredCredential = useUpgradeExpiredCredential;
//# sourceMappingURL=useUpgradeExpiredCredential.js.map