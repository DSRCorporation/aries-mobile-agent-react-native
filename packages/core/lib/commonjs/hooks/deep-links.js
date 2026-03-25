"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDeepLinks = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _activity = require("../contexts/activity");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
const useDeepLinks = () => {
  const [store, dispatch] = (0, _store2.useStore)();
  const {
    appStateStatus
  } = (0, _activity.useActivity)();
  const [stashedDeepLink, setStashedDeepLink] = (0, _react.useState)('');
  const ready = (0, _react.useMemo)(() => store.authentication.didAuthenticate && ['active', 'inactive'].includes(appStateStatus), [store.authentication.didAuthenticate, appStateStatus]);

  // deeplink cold start
  (0, _react.useEffect)(() => {
    const getUrlAsync = async () => {
      const initialUrl = await _reactNative.Linking.getInitialURL();
      if (initialUrl) {
        setStashedDeepLink(initialUrl);
      }
    };
    getUrlAsync();
  }, []);

  // deeplink while already open
  (0, _react.useEffect)(() => {
    const listener = _reactNative.Linking.addListener('url', ({
      url
    }) => {
      if (url) {
        setStashedDeepLink(url);
      }
    });
    return listener.remove;
  });

  // activate stashed deeplink when ready
  (0, _react.useEffect)(() => {
    if (stashedDeepLink && ready) {
      dispatch({
        type: _store.DispatchAction.ACTIVE_DEEP_LINK,
        payload: [stashedDeepLink]
      });
      setStashedDeepLink('');
    }
  }, [ready, stashedDeepLink, dispatch]);
};
exports.useDeepLinks = useDeepLinks;
//# sourceMappingURL=deep-links.js.map