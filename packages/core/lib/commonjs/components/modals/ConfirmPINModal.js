"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ConfirmPINModalUsage = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _reactI18next = require("react-i18next");
var _FauxHeader = _interopRequireDefault(require("../../components/misc/FauxHeader"));
var _SafeAreaModal = _interopRequireDefault(require("../../components/modals/SafeAreaModal"));
var _AlertModal = _interopRequireDefault(require("../../components/modals/AlertModal"));
var _PINScreenTitleText = _interopRequireDefault(require("../../components/misc/PINScreenTitleText"));
var _PINInput = _interopRequireDefault(require("../../components/inputs/PINInput"));
var _screenCapture = _interopRequireDefault(require("../../hooks/screen-capture"));
var _animatedComponents = require("../../contexts/animated-components");
var _usePINValidation = require("../../hooks/usePINValidation");
var _InlineErrorText = require("../../components/inputs/InlineErrorText");
var _theme = require("../../contexts/theme");
var _containerApi = require("../../container-api");
var _testable = require("../../utils/testable");
var _ScreenWrapper = _interopRequireDefault(require("../views/ScreenWrapper"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
let ConfirmPINModalUsage = exports.ConfirmPINModalUsage = /*#__PURE__*/function (ConfirmPINModalUsage) {
  ConfirmPINModalUsage[ConfirmPINModalUsage["PIN_CREATE"] = 0] = "PIN_CREATE";
  ConfirmPINModalUsage[ConfirmPINModalUsage["PIN_CHANGE"] = 1] = "PIN_CHANGE";
  return ConfirmPINModalUsage;
}({});
const ConfirmPINModal = ({
  errorModalState,
  modalUsage = ConfirmPINModalUsage.PIN_CREATE,
  onBackPressed = () => {},
  onConfirmPIN = () => {},
  PINOne = '',
  setPINTwo = () => {},
  title = '',
  visible = false,
  isLoading = false
}) => {
  const {
    ColorPalette,
    NavigationTheme
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [PINHeader, {
    preventScreenCapture
  }, inlineMessages] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMPONENT_PIN_HEADER, _containerApi.TOKENS.CONFIG, _containerApi.TOKENS.INLINE_ERRORS]);
  (0, _screenCapture.default)(preventScreenCapture);
  const {
    comparePINEntries
  } = (0, _usePINValidation.usePINValidation)(PINOne);
  const customErrorMessage = {
    message: t('PINCreate.PINsDoNotMatch'),
    inlineType: _InlineErrorText.InlineErrorType.error,
    config: inlineMessages
  };
  const [errorMessage, setErrorMessage] = (0, _react.useState)(undefined);
  const {
    LoadingSpinner
  } = (0, _animatedComponents.useAnimatedComponents)();
  const style = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: ColorPalette.brand.primaryBackground
    },
    loadingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    }
  });
  return /*#__PURE__*/_react.default.createElement(_SafeAreaModal.default, {
    style: {
      backgroundColor: ColorPalette.brand.primaryBackground
    },
    visible: visible,
    transparent: false,
    animationType: 'none',
    presentationStyle: 'fullScreen',
    statusBarTranslucent: true
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    edges: ['top'],
    style: {
      backgroundColor: NavigationTheme.colors.primary
    }
  }), /*#__PURE__*/_react.default.createElement(_FauxHeader.default, {
    title: title,
    onBackPressed: onBackPressed,
    showBackButton: true
  }), /*#__PURE__*/_react.default.createElement(_ScreenWrapper.default, {
    keyboardActive: true
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container
  }, modalUsage === ConfirmPINModalUsage.PIN_CREATE && /*#__PURE__*/_react.default.createElement(_PINScreenTitleText.default, {
    header: t('PINCreate.Header'),
    subheader: t('PINCreate.Subheader')
  }), /*#__PURE__*/_react.default.createElement(PINHeader, null), /*#__PURE__*/_react.default.createElement(_PINInput.default, {
    label: t('PINCreateConfirm.PINInputLabel'),
    onPINChanged: async userPinInput => {
      setPINTwo(userPinInput);
      setErrorMessage(undefined);
      if (userPinInput.length === PINOne.length) {
        _reactNative.Keyboard.dismiss();
        if (!comparePINEntries(PINOne, userPinInput)) setErrorMessage(customErrorMessage);else await onConfirmPIN(userPinInput);
      }
    },
    testID: (0, _testable.testIdWithKey)('EnterPIN'),
    accessibilityLabel: t('PINCreate.EnterPIN'),
    autoFocus: false,
    inlineMessage: errorMessage
  }), isLoading && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.loadingContainer
  }, /*#__PURE__*/_react.default.createElement(LoadingSpinner, {
    size: 50,
    color: ColorPalette.brand.primary
  })), (errorModalState === null || errorModalState === void 0 ? void 0 : errorModalState.visible) && /*#__PURE__*/_react.default.createElement(_AlertModal.default, {
    title: errorModalState === null || errorModalState === void 0 ? void 0 : errorModalState.title,
    message: errorModalState === null || errorModalState === void 0 ? void 0 : errorModalState.message,
    submit: errorModalState === null || errorModalState === void 0 ? void 0 : errorModalState.onModalDismiss
  }))));
};
var _default = exports.default = ConfirmPINModal;
//# sourceMappingURL=ConfirmPINModal.js.map