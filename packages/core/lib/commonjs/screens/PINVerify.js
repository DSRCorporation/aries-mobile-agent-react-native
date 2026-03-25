"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PINEntryUsage = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _PINInput = _interopRequireDefault(require("../components/inputs/PINInput"));
var _InfoBox = require("../components/misc/InfoBox");
var _PopupModal = _interopRequireDefault(require("../components/modals/PopupModal"));
var _ThemedText = require("../components/texts/ThemedText");
var _ScreenWrapper = _interopRequireDefault(require("../components/views/ScreenWrapper"));
var _constants = require("../constants");
var _containerApi = require("../container-api");
var _animatedComponents = require("../contexts/animated-components");
var _auth = require("../contexts/auth");
var _theme = require("../contexts/theme");
var _screenCapture = _interopRequireDefault(require("../hooks/screen-capture"));
var _testable = require("../utils/testable");
var _InlineErrorText = require("../components/inputs/InlineErrorText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
let PINEntryUsage = exports.PINEntryUsage = /*#__PURE__*/function (PINEntryUsage) {
  PINEntryUsage[PINEntryUsage["PINCheck"] = 0] = "PINCheck";
  PINEntryUsage[PINEntryUsage["ChangeBiometrics"] = 1] = "ChangeBiometrics";
  PINEntryUsage[PINEntryUsage["ChangePIN"] = 2] = "ChangePIN";
  return PINEntryUsage;
}({});
const PINVerify = ({
  setAuthenticated,
  usage = PINEntryUsage.PINCheck,
  onCancelAuth
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    verifyPIN
  } = (0, _auth.useAuth)();
  const [PIN, setPIN] = (0, _react.useState)('');
  const [continueDisabled, setContinueDisabled] = (0, _react.useState)(false);
  const [loading, setLoading] = (0, _react.useState)(false);
  const [alertModalVisible, setAlertModalVisible] = (0, _react.useState)(false);
  const {
    ColorPalette,
    Spacing
  } = (0, _theme.useTheme)();
  const {
    ButtonLoading,
    LoadingSpinner
  } = (0, _animatedComponents.useAnimatedComponents)();
  const [inlineMessageField, setInlineMessageField] = (0, _react.useState)();
  const [{
    preventScreenCapture
  }, inlineMessages] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG, _containerApi.TOKENS.INLINE_ERRORS]);
  (0, _screenCapture.default)(preventScreenCapture);
  (0, _react.useEffect)(() => {
    setInlineMessageField(undefined);
  }, [PIN]);
  const clearAlertModal = (0, _react.useCallback)(() => {
    setAlertModalVisible(false);
    usage !== PINEntryUsage.ChangePIN && setAuthenticated(false);
  }, [setAlertModalVisible, setAuthenticated, usage]);
  const onPINInputCompleted = (0, _react.useCallback)(async userPinInput => {
    setLoading(true);
    setContinueDisabled(true);
    const isPINVerified = await verifyPIN(userPinInput ? userPinInput : PIN);
    if (isPINVerified) {
      setAuthenticated(usage === PINEntryUsage.ChangePIN ? userPinInput : true);
    } else {
      if (inlineMessages.enabled) {
        setInlineMessageField({
          message: t('PINEnter.IncorrectPIN'),
          inlineType: _InlineErrorText.InlineErrorType.error,
          config: inlineMessages
        });
      } else setAlertModalVisible(true);
    }
    setLoading(false);
    setContinueDisabled(false);
  }, [verifyPIN, setLoading, setAuthenticated, setContinueDisabled, PIN, inlineMessages, t, usage]);
  const inputLabelText = {
    [PINEntryUsage.ChangeBiometrics]: t('PINEnter.ChangeBiometricsInputLabel'),
    [PINEntryUsage.PINCheck]: t('PINEnter.AppSettingChangedEnterPIN'),
    [PINEntryUsage.ChangePIN]: t('PINChange.EnterOldPIN')
  };
  const inputTestId = {
    [PINEntryUsage.ChangeBiometrics]: 'BiometricChangedEnterPIN',
    [PINEntryUsage.PINCheck]: 'AppSettingChangedEnterPIN',
    [PINEntryUsage.ChangePIN]: 'EnterOldPIN'
  };
  const primaryButtonText = {
    [PINEntryUsage.ChangeBiometrics]: t('Global.Continue'),
    [PINEntryUsage.PINCheck]: t('PINEnter.AppSettingSave'),
    [PINEntryUsage.ChangePIN]: t('Global.Continue')
  };
  const primaryButtonTestId = {
    [PINEntryUsage.ChangeBiometrics]: 'Continue',
    [PINEntryUsage.PINCheck]: 'AppSettingSave',
    [PINEntryUsage.ChangePIN]: 'Continue'
  };
  const helpText = {
    [PINEntryUsage.ChangeBiometrics]: t('PINEnter.ChangeBiometricsSubtext'),
    [PINEntryUsage.PINCheck]: t('PINEnter.AppSettingChanged'),
    [PINEntryUsage.ChangePIN]: ''
  };
  const isContinueDisabled = continueDisabled || PIN.length < _constants.minPINLength;
  const style = _reactNative.StyleSheet.create({
    screenContainer: {
      flex: 1,
      padding: Spacing.md,
      backgroundColor: ColorPalette.brand.primaryBackground,
      justifyContent: 'space-between'
    },
    buttonContainer: {
      width: '100%'
    },
    helpText: {
      alignSelf: 'auto',
      textAlign: 'left',
      marginBottom: 40
    },
    inputLabelText: {
      alignSelf: 'auto',
      textAlign: 'left',
      marginBottom: 20
    },
    modalText: {
      marginVertical: 5
    },
    changeBiometricsHeader: {
      marginTop: 0,
      marginBottom: Spacing.xl
    },
    loadingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    }
  });
  return /*#__PURE__*/_react.default.createElement(_ScreenWrapper.default, {
    padded: false,
    keyboardActive: true
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.screenContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, usage === PINEntryUsage.ChangeBiometrics && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "headingThree",
    style: style.changeBiometricsHeader
  }, t('PINEnter.ChangeBiometricsHeader')), usage !== PINEntryUsage.ChangePIN && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: style.helpText
  }, helpText[usage]), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold",
    style: style.inputLabelText
  }, inputLabelText[usage], usage === PINEntryUsage.ChangeBiometrics && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "caption"
  }, ` `, t('PINEnter.ChangeBiometricsInputLabelParenthesis'))), /*#__PURE__*/_react.default.createElement(_PINInput.default, {
    onPINChanged: async userPinInput => {
      setPIN(userPinInput);
      if (userPinInput.length === _constants.minPINLength) {
        _reactNative.Keyboard.dismiss();
        usage === PINEntryUsage.ChangePIN && (await onPINInputCompleted(userPinInput));
      }
    },
    testID: (0, _testable.testIdWithKey)(inputTestId[usage]),
    accessibilityLabel: inputLabelText[usage],
    autoFocus: true,
    inlineMessage: inlineMessageField,
    onSubmitEditing: async userPinInput => {
      await onPINInputCompleted(userPinInput);
    }
  })), usage === PINEntryUsage.ChangePIN && loading && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.loadingContainer
  }, /*#__PURE__*/_react.default.createElement(LoadingSpinner, {
    size: 50,
    color: ColorPalette.brand.primary
  })), usage !== PINEntryUsage.ChangePIN && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.buttonContainer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: primaryButtonText[usage],
    buttonType: _Button.ButtonType.Primary,
    testID: (0, _testable.testIdWithKey)(primaryButtonTestId[usage]),
    disabled: isContinueDisabled,
    accessibilityLabel: primaryButtonText[usage],
    onPress: async () => {
      await onPINInputCompleted();
    }
  }, loading && /*#__PURE__*/_react.default.createElement(ButtonLoading, null))), usage === PINEntryUsage.PINCheck && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [style.buttonContainer, {
      marginTop: 10
    }]
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('PINEnter.AppSettingCancel'),
    buttonType: _Button.ButtonType.Secondary,
    testID: (0, _testable.testIdWithKey)('AppSettingCancel'),
    accessibilityLabel: t('PINEnter.AppSettingCancel'),
    onPress: () => onCancelAuth === null || onCancelAuth === void 0 ? void 0 : onCancelAuth(false)
  }))), alertModalVisible && /*#__PURE__*/_react.default.createElement(_PopupModal.default, {
    notificationType: _InfoBox.InfoBoxType.Info,
    title: t('PINEnter.IncorrectPIN'),
    onCallToActionLabel: t('Global.Okay'),
    onCallToActionPressed: clearAlertModal
  }));
};
var _default = exports.default = PINVerify;
//# sourceMappingURL=PINVerify.js.map