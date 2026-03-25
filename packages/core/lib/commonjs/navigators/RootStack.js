"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = _interopRequireDefault(require("@bifold/react-hooks"));
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _OpenIDCredentialRecordProvider = require("../modules/openid/context/OpenIDCredentialRecordProvider");
var _constants = require("../constants");
var _containerApi = require("../container-api");
var _activity = require("../contexts/activity");
var _store = require("../contexts/store");
var _error = require("../types/error");
var _MainStack = _interopRequireDefault(require("./MainStack"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const RootStack = () => {
  const [store, dispatch] = (0, _store.useStore)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [useAgentSetup, OnboardingStack, loadState] = (0, _containerApi.useServices)([_containerApi.TOKENS.HOOK_USE_AGENT_SETUP, _containerApi.TOKENS.STACK_ONBOARDING, _containerApi.TOKENS.LOAD_STATE]);
  const {
    agent,
    initializeAgent,
    shutdownAndClearAgentIfExists
  } = useAgentSetup();
  const [onboardingComplete, setOnboardingComplete] = (0, _react.useState)(false);
  const shouldRenderMainStack = (0, _react.useMemo)(() => onboardingComplete && store.authentication.didAuthenticate, [onboardingComplete, store.authentication.didAuthenticate]);
  (0, _react.useEffect)(() => {
    // if user gets locked out, erase agent
    if (!store.authentication.didAuthenticate) {
      shutdownAndClearAgentIfExists();
    }
  }, [store.authentication.didAuthenticate, shutdownAndClearAgentIfExists]);
  (0, _react.useEffect)(() => {
    const sub = _reactNative.DeviceEventEmitter.addListener(_constants.EventTypes.DID_COMPLETE_ONBOARDING, () => {
      setOnboardingComplete(true);
    });
    return sub.remove;
  }, []);
  (0, _react.useEffect)(() => {
    // Load state only if it hasn't been loaded yet
    if (store.stateLoaded) return;
    loadState(dispatch).catch(err => {
      const error = new _error.BifoldError(t('Error.Title1044'), t('Error.Message1044'), err.message, 1001);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    });
  }, [dispatch, loadState, t, store.stateLoaded]);
  if (shouldRenderMainStack && agent) {
    return /*#__PURE__*/_react.default.createElement(_reactHooks.default, {
      agent: agent
    }, /*#__PURE__*/_react.default.createElement(_OpenIDCredentialRecordProvider.OpenIDCredentialRecordProvider, null, /*#__PURE__*/_react.default.createElement(_activity.ActivityProvider, null, /*#__PURE__*/_react.default.createElement(_MainStack.default, null))));
  }
  return /*#__PURE__*/_react.default.createElement(OnboardingStack, {
    agent: agent,
    initializeAgent: initializeAgent
  });
};
var _default = exports.default = RootStack;
//# sourceMappingURL=RootStack.js.map