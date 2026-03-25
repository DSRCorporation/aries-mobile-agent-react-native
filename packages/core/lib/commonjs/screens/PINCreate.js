"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _ButtonApi = require("../components/buttons/Button-api");
var _PINInput = _interopRequireDefault(require("../components/inputs/PINInput"));
var _PINValidationHelper = _interopRequireDefault(require("../components/misc/PINValidationHelper"));
var _AlertModal = _interopRequireDefault(require("../components/modals/AlertModal"));
var _ScreenWrapper = _interopRequireDefault(require("../components/views/ScreenWrapper"));
var _constants = require("../constants");
var _screenCapture = _interopRequireDefault(require("../hooks/screen-capture"));
var _usePINValidation = require("../hooks/usePINValidation");
var _auth = require("../contexts/auth");
var _containerApi = require("../container-api");
var _animatedComponents = require("../contexts/animated-components");
var _theme = require("../contexts/theme");
var _error = require("../types/error");
var _testable = require("../utils/testable");
var _PINScreenTitleText = _interopRequireDefault(require("../components/misc/PINScreenTitleText"));
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _ConfirmPINModal = _interopRequireWildcard(require("../components/modals/ConfirmPINModal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// eslint-disable-next-line import/no-named-as-default

const PINCreate = ({
  explainedStatus,
  setAuthenticated
}) => {
  const [, dispatch] = (0, _store2.useStore)();
  const {
    setPIN: setWalletPIN
  } = (0, _auth.useAuth)();
  const PINTwoInputRef = (0, _react.useRef)(null);
  const [PIN, setPIN] = (0, _react.useState)('');
  const [PINTwo, setPINTwo] = (0, _react.useState)('');
  const [isLoading, setIsLoading] = (0, _react.useState)(false);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const {
    ButtonLoading,
    LoadingSpinner
  } = (0, _animatedComponents.useAnimatedComponents)();
  const createPINButtonRef = (0, _react.useRef)(null);
  const [PINExplainer, PINHeader, {
    showPINExplainer,
    preventScreenCapture,
    PINScreensConfig
  }, Button, inlineMessages] = (0, _containerApi.useServices)([_containerApi.TOKENS.SCREEN_PIN_EXPLAINER, _containerApi.TOKENS.COMPONENT_PIN_HEADER, _containerApi.TOKENS.CONFIG, _containerApi.TOKENS.COMPONENT_BUTTON, _containerApi.TOKENS.INLINE_ERRORS]);
  const [PINConfirmModalVisible, setPINConfirmModalVisible] = (0, _react.useState)(false);
  const [explained, setExplained] = (0, _react.useState)(explainedStatus || showPINExplainer === false);
  const {
    PINValidations,
    validatePINEntry,
    inlineMessageField1,
    inlineMessageField2,
    modalState,
    PINSecurity,
    setInlineMessageField1,
    setInlineMessageField2
  } = (0, _usePINValidation.usePINValidation)(PIN);
  (0, _screenCapture.default)(preventScreenCapture);
  const handleConfirmPINFlow = (0, _react.useCallback)(async pin => {
    if (validatePINEntry(pin, pin)) {
      setPINConfirmModalVisible(true);
    }
  }, [validatePINEntry]);
  const passcodeCreate = (0, _react.useCallback)(async PIN => {
    try {
      await setWalletPIN(PIN);
      setAuthenticated(true);
      // this dispatch finishes this step of onboarding and will cause a navigation
      dispatch({
        type: _store.DispatchAction.DID_CREATE_PIN
      });
    } catch (err) {
      const error = new _error.BifoldError(t('Error.Title1040'), t('Error.Message1040'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1040);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
  }, [setWalletPIN, setAuthenticated, dispatch, t]);
  const onConfirmPIN = (0, _react.useCallback)(async pinTwo => {
    setIsLoading(true);
    if (validatePINEntry(PIN, pinTwo)) {
      await passcodeCreate(PIN);
    }
    setIsLoading(false);
  }, [passcodeCreate, validatePINEntry, PIN, setIsLoading]);
  const onCreatePIN = (0, _react.useCallback)(async () => {
    setIsLoading(true);
    if (validatePINEntry(PIN, PINTwo)) {
      await passcodeCreate(PIN);
    }
    setIsLoading(false);
  }, [passcodeCreate, validatePINEntry, PIN, PINTwo]);
  const modalBackButtonPressed = () => {
    setPINConfirmModalVisible(false);
  };
  const isContinueDisabled = (0, _react.useMemo)(() => {
    if (inlineMessages.enabled) {
      return false;
    }
    return isLoading || PIN.length < _constants.minPINLength;
  }, [isLoading, PIN, inlineMessages]);
  const continueCreatePIN = (0, _react.useCallback)(() => {
    setExplained(true);
  }, []);
  const controls = !PINScreensConfig.useNewPINDesign && /*#__PURE__*/_react.default.createElement(Button, {
    title: t('PINCreate.CreatePIN'),
    testID: (0, _testable.testIdWithKey)('CreatePIN'),
    accessibilityLabel: t('PINCreate.CreatePIN'),
    buttonType: _ButtonApi.ButtonType.Primary,
    disabled: isContinueDisabled,
    onPress: onCreatePIN,
    ref: createPINButtonRef
  }, isLoading ? /*#__PURE__*/_react.default.createElement(ButtonLoading, null) : null);
  return explained ? /*#__PURE__*/_react.default.createElement(_ScreenWrapper.default, {
    keyboardActive: true,
    controls: controls
  }, /*#__PURE__*/_react.default.createElement(_PINScreenTitleText.default, {
    header: t('PINCreate.Header'),
    subheader: t('PINCreate.Subheader')
  }), /*#__PURE__*/_react.default.createElement(PINHeader, null), /*#__PURE__*/_react.default.createElement(_PINInput.default, {
    label: t('PINCreate.EnterPINTitle'),
    onPINChanged: async userPinInput => {
      setInlineMessageField1(undefined);
      setPIN(() => userPinInput);
      if (userPinInput.length === _constants.minPINLength && PINScreensConfig.useNewPINDesign) {
        _reactNative.Keyboard.dismiss();
        await handleConfirmPINFlow(userPinInput);
      } else if (!PINScreensConfig.useNewPINDesign && userPinInput.length === _constants.minPINLength && PINTwoInputRef !== null && PINTwoInputRef !== void 0 && PINTwoInputRef.current) {
        PINTwoInputRef.current.focus();
        const reactTag = (0, _reactNative.findNodeHandle)(PINTwoInputRef.current);
        if (reactTag) {
          _reactNative.AccessibilityInfo.setAccessibilityFocus(reactTag);
        }
      }
    },
    testID: (0, _testable.testIdWithKey)('EnterPIN'),
    accessibilityLabel: t('PINCreate.EnterPIN'),
    autoFocus: false,
    inlineMessage: inlineMessageField1
  }), !PINScreensConfig.useNewPINDesign && /*#__PURE__*/_react.default.createElement(_PINInput.default, {
    label: t('PINCreate.ReenterPIN'),
    onPINChanged: userPinInput => {
      setInlineMessageField2(undefined);
      setPINTwo(userPinInput);
      if (userPinInput.length === _constants.minPINLength) {
        _reactNative.Keyboard.dismiss();
        const reactTag = (createPINButtonRef === null || createPINButtonRef === void 0 ? void 0 : createPINButtonRef.current) && (0, _reactNative.findNodeHandle)(createPINButtonRef.current);
        if (reactTag) {
          _reactNative.AccessibilityInfo.setAccessibilityFocus(reactTag);
        }
      }
    },
    testID: (0, _testable.testIdWithKey)('ReenterPIN'),
    accessibilityLabel: t('PINCreate.ReenterPIN'),
    autoFocus: false,
    ref: PINTwoInputRef,
    inlineMessage: inlineMessageField2
  }), PINSecurity.displayHelper && /*#__PURE__*/_react.default.createElement(_PINValidationHelper.default, {
    validations: PINValidations
  }), PINScreensConfig.useNewPINDesign && isLoading && /*#__PURE__*/_react.default.createElement(LoadingSpinner, {
    size: 50,
    color: ColorPalette.brand.primary
  }), modalState.visible && /*#__PURE__*/_react.default.createElement(_AlertModal.default, {
    title: modalState.title,
    message: modalState.message,
    submit: modalState.onModalDismiss
  }), /*#__PURE__*/_react.default.createElement(_ConfirmPINModal.default, {
    modalUsage: _ConfirmPINModal.ConfirmPINModalUsage.PIN_CREATE,
    onBackPressed: modalBackButtonPressed,
    onConfirmPIN: onConfirmPIN,
    PINOne: PIN,
    setPINTwo: setPINTwo,
    title: t('Screens.CreatePIN'),
    visible: PINConfirmModalVisible,
    isLoading: isLoading
  })) : /*#__PURE__*/_react.default.createElement(PINExplainer, {
    continueCreatePIN: continueCreatePIN
  });
};
var _default = exports.default = PINCreate;
//# sourceMappingURL=PINCreate.js.map