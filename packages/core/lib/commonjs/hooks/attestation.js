"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAttestation = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _appIntegrity = require("@expo/app-integrity");
var _reactNativeUuid = _interopRequireDefault(require("react-native-uuid"));
var _storage = require("../services/storage");
var _constants = require("../constants");
var _containerApi = require("../container-api");
var _store = require("../contexts/store");
var _store2 = require("../contexts/reducers/store");
var _network = require("../utils/network");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const useAttestation = () => {
  const [getAttestationChallenge, getAttestationJWT, {
    enableAttestation
  }, logger, agentBridge] = (0, _containerApi.useServices)([_containerApi.TOKENS.FN_ATTESTATION_GET_CHALLENGE, _containerApi.TOKENS.FN_ATTESTATION_GET_JWT, _containerApi.TOKENS.CONFIG, _containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.UTIL_AGENT_BRIDGE]);
  const [, dispatch] = (0, _store.useStore)();
  const storeAttestationJWT = (0, _react.useCallback)(async (attestationJWT, keyID) => {
    try {
      agentBridge.onReady(async agent => {
        await agent.genericRecords.save({
          content: attestationJWT,
          id: 'attestationJWT'
        });
        await _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.AttestationConfigured, true);
        await _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.AttestationKey, keyID);
        dispatch({
          type: _store2.DispatchAction.SET_ATTESTATION_COMPLETED,
          payload: [true]
        });
      });
    } catch (err) {
      logger.error((err === null || err === void 0 ? void 0 : err.message) ?? 'Error initializing attestation');
      throw new Error('Error storing attestation result');
    }
  }, [agentBridge, dispatch, logger]);
  const setupAttestation = (0, _react.useCallback)(async () => {
    try {
      if (!enableAttestation) {
        dispatch({
          type: _store2.DispatchAction.SET_ATTESTATION_COMPLETED,
          payload: [true]
        });
        return;
      }
      const isAttestationConfigured = await _storage.PersistentStorage.fetchValueForKey(_constants.LocalStorageKeys.AttestationConfigured);
      if (isAttestationConfigured) {
        dispatch({
          type: _store2.DispatchAction.SET_ATTESTATION_COMPLETED,
          payload: [true]
        });
        return;
      }
      const challenge = await getAttestationChallenge();
      if (_reactNative.Platform.OS === 'ios') {
        if (!_appIntegrity.isSupported) throw new Error('iOS device not supported');
        const keyID = await (0, _appIntegrity.generateKeyAsync)();
        const attestationResult = await (0, _network.withRetry)(_appIntegrity.attestKeyAsync, [keyID, challenge]);
        const attestationJWT = await getAttestationJWT(attestationResult, challenge, keyID);
        await storeAttestationJWT(attestationJWT, keyID);
      } else if (_reactNative.Platform.OS === 'android') {
        const keyID = _reactNativeUuid.default.v4().toString();
        await (0, _appIntegrity.generateHardwareAttestedKeyAsync)(keyID, challenge);
        const attestationResult = await (0, _network.withRetry)(_appIntegrity.getAttestationCertificateChainAsync, [keyID]);
        const attestationJWT = await getAttestationJWT(attestationResult, challenge, keyID);
        await storeAttestationJWT(attestationJWT, keyID);
      } else throw new Error('Platform not supported');
    } catch (err) {
      logger.error((err === null || err === void 0 ? void 0 : err.message) ?? 'Error initializing attestation');
      throw new Error('Error initializing attestation');
    }
  }, [enableAttestation, getAttestationChallenge, getAttestationJWT, dispatch, logger, storeAttestationJWT]);
  return {
    setupAttestation
  };
};
exports.useAttestation = useAttestation;
//# sourceMappingURL=attestation.js.map