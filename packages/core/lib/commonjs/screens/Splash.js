"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _constants = require("../constants");
var _containerApi = require("../container-api");
var _animatedComponents = require("../contexts/animated-components");
var _theme = require("../contexts/theme");
var _error = require("../types/error");
var _auth = require("../contexts/auth");
var _store = require("../contexts/store");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * This Splash screen is shown in two scenarios: initial load of the app,
 * and during agent initialization after login
 */
const Splash = ({
  initializeAgent
}) => {
  const {
    walletSecret
  } = (0, _auth.useAuth)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [store] = (0, _store.useStore)();
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const {
    LoadingIndicator
  } = (0, _animatedComponents.useAnimatedComponents)();
  const initializing = (0, _react.useRef)(false);
  const [logger, ocaBundleResolver] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.UTIL_OCA_RESOLVER]);
  const styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPalette.brand.primaryBackground
    }
  });
  (0, _react.useEffect)(() => {
    if (initializing.current || !store.authentication.didAuthenticate) {
      return;
    }
    if (!walletSecret) {
      throw new Error('Wallet secret is missing');
    }
    initializing.current = true;
    const initAgentAsyncEffect = async () => {
      try {
        var _checkForUpdates, _ref;
        await ((_checkForUpdates = (_ref = ocaBundleResolver).checkForUpdates) === null || _checkForUpdates === void 0 ? void 0 : _checkForUpdates.call(_ref));
        await initializeAgent(walletSecret);
      } catch (err) {
        const error = new _error.BifoldError(t('Error.Title1045'), t('Error.Message1045'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1045);
        _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
        logger.error((err === null || err === void 0 ? void 0 : err.message) ?? err);
      }
    };
    initAgentAsyncEffect();
  }, [initializeAgent, ocaBundleResolver, logger, walletSecret, t, store.authentication.didAuthenticate]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(LoadingIndicator, null));
};
var _default = exports.default = Splash;
//# sourceMappingURL=Splash.js.map