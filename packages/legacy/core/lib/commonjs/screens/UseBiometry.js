"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _constants = require("../constants");
var _animatedComponents = require("../contexts/animated-components");
var _auth = require("../contexts/auth");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
var _PINEnter = require("./PINEnter");
var _containerApi = require("../container-api");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var UseBiometryUsage = /*#__PURE__*/function (UseBiometryUsage) {
  UseBiometryUsage[UseBiometryUsage["InitialSetup"] = 0] = "InitialSetup";
  UseBiometryUsage[UseBiometryUsage["ToggleOnOff"] = 1] = "ToggleOnOff";
  return UseBiometryUsage;
}(UseBiometryUsage || {});
const UseBiometry = () => {
  const [store, dispatch] = (0, _store2.useStore)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [{
    enablePushNotifications
  }, PINEnter] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG, _containerApi.TOKENS.SCREEN_PIN_ENTER]);
  const {
    isBiometricsActive,
    commitPIN,
    disableBiometrics
  } = (0, _auth.useAuth)();
  const [biometryAvailable, setBiometryAvailable] = (0, _react.useState)(false);
  const [biometryEnabled, setBiometryEnabled] = (0, _react.useState)(store.preferences.useBiometry);
  const [continueEnabled, setContinueEnabled] = (0, _react.useState)(true);
  const [canSeeCheckPIN, setCanSeeCheckPIN] = (0, _react.useState)(false);
  const {
    ColorPallet,
    TextTheme,
    Assets
  } = (0, _theme.useTheme)();
  const {
    ButtonLoading
  } = (0, _animatedComponents.useAnimatedComponents)();
  const navigation = (0, _native.useNavigation)();
  const screenUsage = store.onboarding.didCompleteOnboarding ? UseBiometryUsage.ToggleOnOff : UseBiometryUsage.InitialSetup;
  const styles = _reactNative.StyleSheet.create({
    container: {
      height: '100%',
      padding: 20,
      backgroundColor: ColorPallet.brand.primaryBackground
    },
    image: {
      minWidth: 200,
      minHeight: 200,
      marginBottom: 66
    }
  });
  (0, _react.useEffect)(() => {
    isBiometricsActive().then(result => {
      setBiometryAvailable(result);
    });
  }, []);
  (0, _react.useEffect)(() => {
    if (screenUsage === UseBiometryUsage.InitialSetup) {
      return;
    }
    if (biometryEnabled) {
      commitPIN(biometryEnabled).then(() => {
        dispatch({
          type: _store.DispatchAction.USE_BIOMETRY,
          payload: [biometryEnabled]
        });
      });
    } else {
      disableBiometrics().then(() => {
        dispatch({
          type: _store.DispatchAction.USE_BIOMETRY,
          payload: [biometryEnabled]
        });
      });
    }
  }, [biometryEnabled]);
  const continueTouched = async () => {
    setContinueEnabled(false);
    await commitPIN(biometryEnabled);
    dispatch({
      type: _store.DispatchAction.USE_BIOMETRY,
      payload: [biometryEnabled]
    });
    if (enablePushNotifications) {
      navigation.dispatch(_native.CommonActions.reset({
        index: 0,
        routes: [{
          name: _navigators.Screens.UsePushNotifications
        }]
      }));
    } else {
      dispatch({
        type: _store.DispatchAction.DID_COMPLETE_ONBOARDING,
        payload: [true]
      });
    }
  };
  const toggleSwitch = () => {
    // If the user is toggling biometrics on/off they need
    // to first authenticate before this action is accepted
    if (screenUsage === UseBiometryUsage.ToggleOnOff) {
      setCanSeeCheckPIN(true);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.BIOMETRY_UPDATE, true);
      return;
    }
    setBiometryEnabled(previousState => !previousState);
  };
  const onAuthenticationComplete = status => {
    // If successfully authenticated the toggle may proceed.
    if (status) {
      setBiometryEnabled(previousState => !previousState);
    }
    _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.BIOMETRY_UPDATE, false);
    setCanSeeCheckPIN(false);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    edges: ['left', 'right', 'bottom']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.biometrics, {
    style: styles.image
  })), biometryAvailable ? /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.normal
  }, t('Biometry.EnabledText1')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, null), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.normal
  }, t('Biometry.EnabledText2'), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.bold
  }, " ", t('Biometry.Warning')))) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.normal
  }, t('Biometry.NotEnabledText1')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, null), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.normal
  }, t('Biometry.NotEnabledText2'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      marginVertical: 20
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexShrink: 1,
      marginRight: 10,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.bold
  }, t('Biometry.UseToUnlock'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      justifyContent: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    testID: (0, _testable.testIdWithKey)('ToggleBiometrics'),
    accessible: true,
    accessibilityLabel: t('Biometry.Toggle'),
    accessibilityRole: 'switch'
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Switch, {
    trackColor: {
      false: ColorPallet.grayscale.lightGrey,
      true: ColorPallet.brand.primaryDisabled
    },
    thumbColor: biometryEnabled ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey,
    ios_backgroundColor: ColorPallet.grayscale.lightGrey,
    onValueChange: toggleSwitch,
    value: biometryEnabled,
    disabled: !biometryAvailable
  }))))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginTop: 'auto',
      margin: 20
    }
  }, store.onboarding.didCompleteOnboarding || /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: 'Continue',
    accessibilityLabel: 'Continue',
    testID: (0, _testable.testIdWithKey)('Continue'),
    onPress: continueTouched,
    buttonType: _Button.ButtonType.Primary,
    disabled: !continueEnabled
  }, !continueEnabled && /*#__PURE__*/_react.default.createElement(ButtonLoading, null))), /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    style: {
      backgroundColor: ColorPallet.brand.primaryBackground
    },
    visible: canSeeCheckPIN,
    transparent: false,
    animationType: 'slide'
  }, /*#__PURE__*/_react.default.createElement(PINEnter, {
    usage: _PINEnter.PINEntryUsage.PINCheck,
    setAuthenticated: onAuthenticationComplete
  })));
};
var _default = exports.default = UseBiometry;
//# sourceMappingURL=UseBiometry.js.map