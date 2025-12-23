"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@credo-ts/react-hooks");
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _pushNotifications = _interopRequireDefault(require("../assets/img/push-notifications.svg"));
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
var _containerApi = require("../container-api");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import { setup } from '../utils/PushNotificationsHelper'

const PushNotification = ({
  route
}) => {
  var _route$params;
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [store, dispatch] = (0, _store2.useStore)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const {
    TextTheme,
    ColorPallet
  } = (0, _theme.useTheme)();
  const [{
    enablePushNotifications
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  const [notificationState, setNotificationState] = (0, _react.useState)(store.preferences.usePushNotifications);
  const [notificationStatus, setNotificationStatus] = (0, _react.useState)('unknown');
  const navigation = (0, _native.useNavigation)();
  if (!enablePushNotifications) {
    throw new Error('Push notification configuration not found');
  }
  const isMenu = (_route$params = route.params) === null || _route$params === void 0 ? void 0 : _route$params.isMenu;
  const updateNotificationState = async () => {
    const status = await enablePushNotifications.status();
    setNotificationStatus(status);
  };
  (0, _react.useMemo)(() => {
    updateNotificationState();
    _reactNative.AppState.addEventListener('change', updateNotificationState);
  }, []);
  const style = _reactNative.StyleSheet.create({
    screenContainer: {
      flex: 1,
      padding: 30
    },
    image: {
      height: 200,
      marginBottom: 20
    },
    heading: {
      marginBottom: 20
    },
    listItem: {
      ...TextTheme.normal,
      flex: 1,
      paddingLeft: 5
    }
  });
  const list = [t('PushNotifications.BulletOne'), t('PushNotifications.BulletTwo'), t('PushNotifications.BulletThree'), t('PushNotifications.BulletFour')];
  const settingsInstructions = [t('PushNotifications.InstructionsOne'), t('PushNotifications.InstructionsTwo'), t('PushNotifications.InstructionsThree')];
  const hasNotificationsDisabled = notificationStatus === 'denied' && store.onboarding.didConsiderPushNotifications;
  const activatePushNotifications = async () => {
    const state = await enablePushNotifications.setup();
    dispatch({
      type: _store.DispatchAction.USE_PUSH_NOTIFICATIONS,
      payload: [state === 'granted']
    });
    if (store.onboarding.postAuthScreens.length) {
      const screens = store.onboarding.postAuthScreens;
      screens.shift();
      dispatch({
        type: _store.DispatchAction.SET_POST_AUTH_SCREENS,
        payload: [screens]
      });
      if (screens.length) {
        navigation.navigate(screens[0]);
      } else {
        navigation.navigate(_navigators.Screens.Splash);
      }
    } else if (store.preferences.enableWalletNaming) {
      navigation.dispatch(_native.CommonActions.reset({
        index: 0,
        routes: [{
          name: _navigators.Screens.NameWallet
        }]
      }));
    } else {
      dispatch({
        type: _store.DispatchAction.DID_COMPLETE_ONBOARDING,
        payload: [true]
      });
    }
  };
  const toggleSwitch = async () => {
    if (agent) {
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
    }
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      flex: 1
    },
    edges: ['left', 'right', 'bottom']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    contentContainerStyle: {
      flexGrow: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.screenContainer
  }, !hasNotificationsDisabled && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.image
  }, /*#__PURE__*/_react.default.createElement(_pushNotifications.default, null)), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [TextTheme.headingThree, style.heading]
  }, t('PushNotifications.EnableNotifiactions')), hasNotificationsDisabled ? /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.normal
  }, t('PushNotifications.NotificationsOffMessage'))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.normal
  }, t('PushNotifications.BeNotified')), list.map((item, index) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      marginTop: 20
    },
    key: index
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.normal
  }, '\u2022'), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: style.listItem
  }, item)))), isMenu ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginTop: 25
    }
  }, hasNotificationsDisabled ? /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.bold
  }, t('PushNotifications.NotificationsOffTitle')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.normal
  }, t('PushNotifications.NotificationsInstructionTitle')), settingsInstructions.map((item, index) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      marginTop: 20
    },
    key: index
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.normal
  }, `${index + 1}. `), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: style.listItem
  }, item)))) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.normal
  }, t('PushNotifications.ReceiveNotifications')), /*#__PURE__*/_react.default.createElement(_reactNative.Switch, {
    trackColor: {
      false: ColorPallet.grayscale.lightGrey,
      true: ColorPallet.brand.primaryDisabled
    },
    thumbColor: notificationState ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey,
    ios_backgroundColor: ColorPallet.grayscale.lightGrey,
    onValueChange: toggleSwitch,
    accessibilityLabel: t('PushNotifications.ReceiveNotifications'),
    accessibilityRole: "switch",
    testID: (0, _testable.testIdWithKey)('PushNotificationSwitch'),
    value: notificationState
  }))), hasNotificationsDisabled && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginTop: 'auto'
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    buttonType: _Button.ButtonType.Primary,
    title: t('PushNotifications.OpenSettings'),
    accessibilityLabel: t('PushNotifications.OpenSettings'),
    testID: (0, _testable.testIdWithKey)('PushNotificationSettings'),
    onPress: () => _reactNative.Linking.openSettings()
  }))) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginTop: 'auto'
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    buttonType: _Button.ButtonType.Primary,
    title: t('Global.Continue'),
    accessibilityLabel: t('Global.Continue'),
    testID: (0, _testable.testIdWithKey)('PushNotificationContinue'),
    onPress: activatePushNotifications
  })))));
};
var _default = exports.default = PushNotification;
//# sourceMappingURL=PushNotification.js.map