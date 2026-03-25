"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUpgradeExpiredCredential = void 0;
var _react = require("react");
var _native = require("@react-navigation/native");
var _reactHooks = require("@bifold/react-hooks");
var _navigators = require("../../../types/navigators");
var _refreshToken = require("../refresh/refreshToken");
var _reIssuance = require("../refresh/reIssuance");
var _OpenIDCredentialRecordProvider = require("../context/OpenIDCredentialRecordProvider");
var _registry = require("../refresh/registry");
var _containerApi = require("../../../container-api");
// modules/openid/hooks/useUpgradeExpiredCredential.ts

const useUpgradeExpiredCredential = () => {
  const navigation = (0, _native.useNavigation)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const {
    getSdJwtCredentialById
  } = (0, _OpenIDCredentialRecordProvider.useOpenIDCredentials)();
  const [logger] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER]);
  const upgrade = (0, _react.useCallback)(async oldId => {
    var _newRecord$createdAt;
    if (!agent) {
      logger === null || logger === void 0 || logger.warn('⚠️ [Upgrade] Agent not ready, cannot upgrade credential');
      return;
    }
    logger === null || logger === void 0 || logger.info(`🔁 [Upgrade] Starting upgrade flow for oldId=${oldId}`);

    // 1. Load the “old” record
    const byId = _registry.credentialRegistry.getState().byId[oldId];
    if (!byId) {
      logger === null || logger === void 0 || logger.warn(`⚠️ [Upgrade] No lite record for oldId=${oldId}`);
      return;
    }

    // We try all three repos – you can refine this using byId.format if you want
    const rec = await getSdJwtCredentialById(oldId);
    if (!rec) {
      logger === null || logger === void 0 || logger.warn(`⚠️ [Upgrade] No full record found for oldId=${oldId}`);
      return;
    }

    // 2. Use refresh token to get new access token
    const token = await (0, _refreshToken.refreshAccessToken)({
      logger,
      cred: rec,
      agentContext: agent.context
    });
    if (!token) {
      logger === null || logger === void 0 || logger.warn(`⚠️ [Upgrade] No refresh token available for oldId=${oldId}`);
      return;
    }

    // 3. Re-issue credential using access token
    const newRecord = await (0, _reIssuance.reissueCredentialWithAccessToken)({
      agent,
      logger,
      record: rec,
      tokenResponse: token
    });
    if (!newRecord) {
      logger === null || logger === void 0 || logger.warn(`⚠️ [Upgrade] Re-issue returned no record for oldId=${oldId}`);
      return;
    }
    logger === null || logger === void 0 || logger.info(`💾 [Upgrade] New credential issued ${newRecord.id} from oldId=${oldId}`);

    // 4. Update registry mapping old -> new (so offer screen can resolve)
    _registry.credentialRegistry.getState().markExpiredWithReplacement(oldId, {
      id: newRecord.id,
      format: byId.format,
      createdAt: (_newRecord$createdAt = newRecord.createdAt) === null || _newRecord$createdAt === void 0 ? void 0 : _newRecord$createdAt.toISOString(),
      issuer: byId.issuer
    });

    // 5. Navigate to the OpenID offer screen, passing the new record directly
    navigation.navigate(_navigators.Stacks.ConnectionStack, {
      screen: _navigators.Screens.OpenIDCredentialOffer,
      params: {
        credential: newRecord
      }
    });
  }, [agent, logger, navigation, getSdJwtCredentialById]);
  return {
    upgrade
  };
};
exports.useUpgradeExpiredCredential = useUpgradeExpiredCredential;
//# sourceMappingURL=useUpgradeExpiredCredential.js.map