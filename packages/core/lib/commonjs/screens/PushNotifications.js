"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _PushNotificationsContent = _interopRequireDefault(require("../components/views/PushNotificationsContent"));
var _containerApi = require("../container-api");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _testable = require("../utils/testable");
var _ScreenWrapper = _interopRequireDefault(require("../components/views/ScreenWrapper"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Screen to show during onboarding that prompts
// for push notification permissions
const PushNotifications = () => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [, dispatch] = (0, _store2.useStore)();
  const [{
    enablePushNotifications
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  if (!enablePushNotifications) {
    throw new Error('Push notification configuration not found');
  }
  const activatePushNotifications = async () => {
    const state = await enablePushNotifications.setup();
    dispatch({
      type: _store.DispatchAction.USE_PUSH_NOTIFICATIONS,
      payload: [state === 'granted']
    });
  };
  const controls = /*#__PURE__*/_react.default.createElement(_Button.default, {
    buttonType: _Button.ButtonType.Primary,
    title: t('Global.Continue'),
    accessibilityLabel: t('Global.Continue'),
    testID: (0, _testable.testIdWithKey)('PushNotificationContinue'),
    onPress: activatePushNotifications
  });
  return /*#__PURE__*/_react.default.createElement(_ScreenWrapper.default, {
    controls: controls
  }, /*#__PURE__*/_react.default.createElement(_PushNotificationsContent.default, null));
};
var _default = exports.default = PushNotifications;
//# sourceMappingURL=PushNotifications.js.map