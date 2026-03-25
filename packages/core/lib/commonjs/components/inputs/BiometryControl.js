"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativePermissions = require("react-native-permissions");
var _ToggleButton = _interopRequireDefault(require("../buttons/ToggleButton"));
var _DismissiblePopupModal = _interopRequireDefault(require("../modals/DismissiblePopupModal"));
var _ThemedText = require("../texts/ThemedText");
var _auth = require("../../contexts/auth");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
var _reactNativeKeychain = require("react-native-keychain");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const BIOMETRY_PERMISSION = _reactNativePermissions.PERMISSIONS.IOS.FACE_ID;
const BiometryControl = ({
  biometryEnabled,
  onBiometryToggle,
  children
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    isBiometricsActive
  } = (0, _auth.useAuth)();
  const [biometryAvailable, setBiometryAvailable] = (0, _react.useState)(false);
  const [settingsPopupConfig, setSettingsPopupConfig] = (0, _react.useState)(null);
  const {
    ColorPalette,
    Assets,
    Spacing
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: Spacing.md,
      backgroundColor: ColorPalette.brand.primaryBackground
    },
    image: {
      minWidth: 200,
      minHeight: 200,
      marginBottom: 66
    },
    biometryAvailableRowGap: {
      rowGap: Spacing.md
    }
  });
  (0, _react.useEffect)(() => {
    isBiometricsActive().then(result => {
      setBiometryAvailable(result);
    });
  }, [isBiometricsActive]);
  const onOpenSettingsTouched = async () => {
    await _reactNative.Linking.openSettings();
    onOpenSettingsDismissed();
  };
  const onOpenSettingsDismissed = () => {
    setSettingsPopupConfig(null);
  };
  const onRequestSystemBiometrics = (0, _react.useCallback)(async newToggleValue => {
    const permissionResult = await (0, _reactNativePermissions.request)(BIOMETRY_PERMISSION);
    switch (permissionResult) {
      case _reactNativePermissions.RESULTS.GRANTED:
      case _reactNativePermissions.RESULTS.LIMITED:
        // Granted
        onBiometryToggle(newToggleValue);
        break;
      default:
        break;
    }
  }, [onBiometryToggle]);
  const onCheckSystemBiometrics = (0, _react.useCallback)(async () => {
    if (_reactNative.Platform.OS === 'android') {
      // Android doesn't need to prompt biometric permission
      // for an app to use it.
      return biometryAvailable ? _reactNativePermissions.RESULTS.GRANTED : _reactNativePermissions.RESULTS.UNAVAILABLE;
    } else if (_reactNative.Platform.OS === 'ios') {
      return await (0, _reactNativePermissions.check)(BIOMETRY_PERMISSION);
    }
    return _reactNativePermissions.RESULTS.UNAVAILABLE;
  }, [biometryAvailable]);
  const toggleSwitch = (0, _react.useCallback)(async () => {
    const newValue = !biometryEnabled;
    if (!newValue) {
      // Turning off doesn't require OS biometrics enabled
      onBiometryToggle(newValue);
      return;
    }

    // If the user is turning it on, they need
    // to first authenticate the OS biometrics before this action is accepted
    const permissionResult = await onCheckSystemBiometrics();
    const supported_type = await (0, _reactNativeKeychain.getSupportedBiometryType)();
    switch (permissionResult) {
      case _reactNativePermissions.RESULTS.GRANTED:
      case _reactNativePermissions.RESULTS.LIMITED:
        // Already granted
        onBiometryToggle(newValue);
        break;
      case _reactNativePermissions.RESULTS.UNAVAILABLE:
        // Permission is unavailable/ not supported on this device
        if (_reactNative.Platform.OS === 'ios' && supported_type === _reactNativeKeychain.BIOMETRY_TYPE.TOUCH_ID) {
          // if available, access to touch id can be granted without a request
          onBiometryToggle(newValue);
        } else {
          // Not in iOS or no touch id available for iOS, send user to settings
          // to enable biometrics
          setSettingsPopupConfig({
            title: t('Biometry.SetupBiometricsTitle'),
            description: t('Biometry.SetupBiometricsDesc')
          });
        }
        break;
      case _reactNativePermissions.RESULTS.BLOCKED:
        // Previously denied
        setSettingsPopupConfig({
          title: t('Biometry.AllowBiometricsTitle'),
          description: t('Biometry.AllowBiometricsDesc')
        });
        break;
      case _reactNativePermissions.RESULTS.DENIED:
        // Has not been requested
        await onRequestSystemBiometrics(newValue);
        break;
      default:
        break;
    }
  }, [onRequestSystemBiometrics, onCheckSystemBiometrics, biometryEnabled, t, onBiometryToggle]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      flex: 1
    },
    edges: ['left', 'right', 'bottom']
  }, settingsPopupConfig && /*#__PURE__*/_react.default.createElement(_DismissiblePopupModal.default, {
    title: settingsPopupConfig.title,
    description: settingsPopupConfig.description,
    onCallToActionLabel: t('Biometry.OpenSettings'),
    onCallToActionPressed: onOpenSettingsTouched,
    onDismissPressed: onOpenSettingsDismissed
  }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.biometrics, {
    style: styles.image
  })), biometryAvailable ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.biometryAvailableRowGap
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('Biometry.EnabledText1')), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('Biometry.EnabledText2'), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold"
  }, " ", t('Biometry.Warning')))) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.biometryAvailableRowGap
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('Biometry.NotEnabledText1')), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('Biometry.NotEnabledText2'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold"
  }, t('Biometry.UseToUnlock'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      justifyContent: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
    testID: (0, _testable.testIdWithKey)('ToggleBiometrics'),
    isEnabled: biometryEnabled,
    isAvailable: true,
    toggleAction: toggleSwitch,
    disabled: false,
    enabledIcon: "check",
    disabledIcon: "close"
  })))), children);
};
var _default = exports.default = BiometryControl;
//# sourceMappingURL=BiometryControl.js.map