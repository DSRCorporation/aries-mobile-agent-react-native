"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _ThemedText = require("../components/texts/ThemedText");
var _PushNotificationsContent = _interopRequireDefault(require("../components/views/PushNotificationsContent"));
var _PushNotificationsDisabledContent = _interopRequireDefault(require("../components/views/PushNotificationsDisabledContent"));
var _containerApi = require("../container-api");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _testable = require("../utils/testable");
var _ScreenWrapper = _interopRequireDefault(require("../components/views/ScreenWrapper"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// Screen accesible through settings that allows the user to
// enable or disable push notifications
const TogglePushNotifications = () => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [store, dispatch] = (0, _store2.useStore)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const {
    ColorPalette,
    Spacing
  } = (0, _theme.useTheme)();
  const [{
    enablePushNotifications
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  const [notificationState, setNotificationState] = (0, _react.useState)(store.preferences.usePushNotifications);
  const [notificationStatus, setNotificationStatus] = (0, _react.useState)('unknown');
  if (!enablePushNotifications) {
    throw new Error('Push notification configuration not found');
  }
  const styles = _reactNative.StyleSheet.create({
    toggleContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: Spacing.md,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
  (0, _react.useEffect)(() => {
    const updateNotificationState = async () => {
      const status = await enablePushNotifications.status();
      setNotificationStatus(status);
    };
    updateNotificationState();
    const subscription = _reactNative.AppState.addEventListener('change', updateNotificationState);
    return () => subscription.remove();
  }, [enablePushNotifications]);
  const hasNotificationsDisabled = notificationStatus === 'denied' && store.onboarding.didConsiderPushNotifications;
  const toggleSwitch = async () => {
    if (!notificationState) {
      const res = await enablePushNotifications.setup();
      if (res === 'denied') {
        return;
      }
    }
    dispatch({
      type: _store.DispatchAction.USE_PUSH_NOTIFICATIONS,
      payload: [!notificationState]
    });
    enablePushNotifications.toggle(!notificationState, agent);
    setNotificationState(!notificationState);
  };
  const controls = hasNotificationsDisabled ? /*#__PURE__*/_react.default.createElement(_Button.default, {
    buttonType: _Button.ButtonType.Primary,
    title: t('PushNotifications.OpenSettings'),
    accessibilityLabel: t('PushNotifications.OpenSettings'),
    testID: (0, _testable.testIdWithKey)('PushNotificationSettings'),
    onPress: () => _reactNative.Linking.openSettings()
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.toggleContainer
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('PushNotifications.ReceiveNotifications')), /*#__PURE__*/_react.default.createElement(_reactNative.Switch, {
    trackColor: {
      false: ColorPalette.grayscale.lightGrey,
      true: ColorPalette.brand.primaryDisabled
    },
    thumbColor: notificationState ? ColorPalette.brand.primary : ColorPalette.grayscale.mediumGrey,
    ios_backgroundColor: ColorPalette.grayscale.lightGrey,
    onValueChange: toggleSwitch,
    accessibilityLabel: t('PushNotifications.ReceiveNotifications'),
    accessibilityRole: "switch",
    testID: (0, _testable.testIdWithKey)('PushNotificationSwitch'),
    value: notificationState
  }));
  return /*#__PURE__*/_react.default.createElement(_ScreenWrapper.default, {
    controls: controls,
    padded: true
  }, hasNotificationsDisabled ? /*#__PURE__*/_react.default.createElement(_PushNotificationsDisabledContent.default, null) : /*#__PURE__*/_react.default.createElement(_PushNotificationsContent.default, null));
};
var _default = exports.default = TogglePushNotifications;
//# sourceMappingURL=TogglePushNotifications.js.map