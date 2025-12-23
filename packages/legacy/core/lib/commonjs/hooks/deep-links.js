"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDeepLinks = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _containerApi = require("../container-api");
const assertDeepLinkSupported = async deepLink => {
  try {
    const supported = await _reactNative.Linking.canOpenURL(deepLink);
    if (!supported) {
      return '';
    }
    return deepLink;
  } catch (error) {
    return '';
  }
};
const useDeepLinks = () => {
  const [, dispatch] = (0, _store2.useStore)();
  const [logger] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER]);
  (0, _react.useEffect)(() => {
    const getUrlAsync = async () => {
      const initialUrl = await _reactNative.Linking.getInitialURL();
      logger.info(`initialUrl from sleep: ${initialUrl}`);
      if (initialUrl) {
        dispatch({
          type: _store.DispatchAction.ACTIVE_DEEP_LINK,
          payload: [await assertDeepLinkSupported(initialUrl)]
        });
      }
    };
    getUrlAsync();
  }, []);
  (0, _react.useEffect)(() => {
    _reactNative.Linking.addEventListener('url', async ({
      url
    }) => {
      logger.info(`initialUrl from background: ${url}`);
      if (url) {
        dispatch({
          type: _store.DispatchAction.ACTIVE_DEEP_LINK,
          payload: [await assertDeepLinkSupported(url)]
        });
      }
    });
    return () => {
      _reactNative.Linking.removeAllListeners('url');
    };
  }, []);
};
exports.useDeepLinks = useDeepLinks;
//# sourceMappingURL=deep-links.js.map