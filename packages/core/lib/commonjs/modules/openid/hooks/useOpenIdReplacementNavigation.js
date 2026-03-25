"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOpenIdReplacementNavigation = useOpenIdReplacementNavigation;
var _react = require("react");
var _native = require("@react-navigation/native");
var _reactNativeToastMessage = _interopRequireDefault(require("react-native-toast-message"));
var _containerApi = require("../../../container-api");
var _navigators = require("../../../types/navigators");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// hooks/useOpenIdReplacementNavigation.ts

/**
 * A hook that returns a function to open the OpenID Credential Offer screen for a replacement credential
 */
function useOpenIdReplacementNavigation() {
  const navigation = (0, _native.useNavigation)();
  const [orchestrator] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_REFRESH_ORCHESTRATOR]);
  const openReplacementOffer = (0, _react.useCallback)(notif => {
    var _notif$metadata;
    const replacementId = notif === null || notif === void 0 || (_notif$metadata = notif.metadata) === null || _notif$metadata === void 0 ? void 0 : _notif$metadata['replacementId'];
    //   const oldId = notif?.metadata?.['oldId'] as string | undefined

    if (!replacementId) {
      _reactNativeToastMessage.default.show({
        type: 'error',
        text1: 'Missing replacement',
        text2: 'No replacementId in notification.'
      });
      return;
    }

    // Fetch the full record strictly from orchestrator’s in-memory cache
    const full = orchestrator.resolveFull(replacementId);
    if (!full) {
      // Keep it dead simple: no repo lookups here
      _reactNativeToastMessage.default.show({
        type: 'info',
        text1: 'Preparing credential',
        text2: 'Please try again in a moment.'
      });
      return;
    }
    navigation.navigate(_navigators.Stacks.ConnectionStack, {
      screen: _navigators.Screens.OpenIDCredentialOffer,
      params: {
        credential: full
      }
    });
  }, [navigation, orchestrator]);
  return openReplacementOffer;
}
//# sourceMappingURL=useOpenIdReplacementNavigation.js.map