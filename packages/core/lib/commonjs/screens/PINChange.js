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
var _containerApi = require("../container-api");
var _animatedComponents = require("../contexts/animated-components");
var _theme = require("../contexts/theme");
var _screenCapture = _interopRequireDefault(require("../hooks/screen-capture"));
var _usePINValidation = require("../hooks/usePINValidation");
var _VerifyPINModal = _interopRequireDefault(require("../components/modals/VerifyPINModal"));
var _error = require("../types/error");
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
var _PINVerify = require("./PINVerify");
var _ConfirmPINModal = _interopRequireWildcard(require("../components/modals/ConfirmPINModal"));
var _agent = require("../utils/agent");
var _types = require("../modules/history/types");
var _auth = require("../contexts/auth");
var _store = require("../contexts/store");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const PINChange = ({
  navigation
}) => {
  const {
    checkWalletPIN,
    rekeyWallet
  } = (0, _auth.useAuth)();
  const {
    agent
  } = (0, _agent.useAppAgent)();
  const [PIN, setPIN] = (0, _react.useState)('');
  const [PINTwo, setPINTwo] = (0, _react.useState)('');
  const [PINOld, setPINOld] = (0, _react.useState)('');
  const [store] = (0, _store.useStore)();
  const [isLoading, setIsLoading] = (0, _react.useState)(false);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette,
    Spacing
  } = (0, _theme.useTheme)();
  const {
    ButtonLoading
  } = (0, _animatedComponents.useAnimatedComponents)();
  const createPINButtonRef = (0, _react.useRef)(null);
  const [Button, inlineMessages, logger, historyManagerCurried, historyEnabled, historyEventsLogger, {
    preventScreenCapture,
    PINScreensConfig
  }, PINHeader] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMPONENT_BUTTON, _containerApi.TOKENS.INLINE_ERRORS, _containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.FN_LOAD_HISTORY, _containerApi.TOKENS.HISTORY_ENABLED, _containerApi.TOKENS.HISTORY_EVENTS_LOGGER, _containerApi.TOKENS.CONFIG, _containerApi.TOKENS.COMPONENT_PIN_HEADER]);
  const [verifyPINModalVisible, setVerifyPINModalVisible] = (0, _react.useState)(PINScreensConfig.useNewPINDesign);
  const [confirmPINModalVisible, setPINConfirmModalVisible] = (0, _react.useState)(false);
  const {
    PINValidations,
    validatePINEntry,
    inlineMessageField1,
    inlineMessageField2,
    modalState,
    PINSecurity,
    clearModal,
    setModalState,
    comparePINEntries,
    setInlineMessageField1,
    setInlineMessageField2
  } = (0, _usePINValidation.usePINValidation)(PIN);
  (0, _screenCapture.default)(preventScreenCapture);
  const style = _reactNative.StyleSheet.create({
    screenContainer: {
      height: '100%',
      backgroundColor: ColorPalette.brand.primaryBackground,
      padding: Spacing.md,
      justifyContent: 'space-between'
    },
    // below used as helpful labels for views, no properties needed atp
    contentContainer: {},
    controlsContainer: {},
    loadingContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  const onVerifyPINModalBackPressed = (0, _react.useCallback)(() => {
    navigation.pop();
  }, [navigation]);
  const onConfirmPINModalBackPressed = (0, _react.useCallback)(() => {
    setPINConfirmModalVisible(false);
  }, [setPINConfirmModalVisible]);
  const onAuthenticationComplete = (0, _react.useCallback)(pin => {
    setPINOld(pin);
    setVerifyPINModalVisible(false);
  }, [setPINOld, setVerifyPINModalVisible]);
  const onCancelAuth = (0, _react.useCallback)(() => {
    navigation.navigate(_navigators.Screens.Settings);
  }, [navigation]);
  const checkOldPIN = (0, _react.useCallback)(async PIN => {
    const valid = await checkWalletPIN(PIN);
    if (!valid) {
      setModalState({
        visible: true,
        title: t('PINCreate.InvalidPIN'),
        message: t(`PINCreate.Message.OldPINIncorrect`),
        onModalDismiss: clearModal
      });
    }
    return valid;
  }, [checkWalletPIN, t, setModalState, clearModal]);
  const logHistoryRecord = (0, _react.useCallback)(() => {
    try {
      if (!(agent && historyEnabled)) {
        logger.trace(`[${PINChange.name}]:[logHistoryRecord] Skipping history log, either history function disabled or agent undefined`);
        return;
      }
      const historyManager = historyManagerCurried(agent);
      /** Save history record for pin edited */
      const recordData = {
        type: _types.HistoryCardType.PinChanged,
        message: _types.HistoryCardType.PinChanged,
        createdAt: new Date()
      };
      historyManager.saveHistory(recordData);
    } catch (err) {
      logger.error(`[${PINChange.name}]:[logHistoryRecord] Error saving history: ${err}`);
    }
  }, [agent, historyEnabled, logger, historyManagerCurried]);
  const handleConfirmPINModal = async userPinInput => {
    try {
      setIsLoading(true);
      const valid = validatePINEntry(userPinInput, userPinInput);
      if (valid) {
        setPINConfirmModalVisible(true);
      }
    } catch (err) {
      const error = new _error.BifoldError(t('Error.Title1049'), t('Error.Message1049'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1049);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChangePinTap = async () => {
    try {
      setIsLoading(true);
      const valid = validatePINEntry(PIN, PINTwo);
      if (valid) {
        const oldPinValid = await checkOldPIN(PINOld);
        if (oldPinValid) {
          const success = await rekeyWallet(agent, PINOld, PIN, store.preferences.useBiometry);
          if (success) {
            if (historyEventsLogger.logPinChanged) {
              logHistoryRecord();
            }
            setModalState({
              visible: true,
              title: t('PINChange.PinChangeSuccessTitle'),
              message: t('PINChange.PinChangeSuccessMessage'),
              onModalDismiss: () => {
                navigation.navigate(_navigators.Screens.Settings);
                clearModal();
              }
            });
          }
        }
      }
    } catch (err) {
      const error = new _error.BifoldError(t('Error.Title1049'), t('Error.Message1049'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1049);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleConfirmPIN = async userPinInput => {
    try {
      setIsLoading(true);
      const valid = comparePINEntries(PIN, userPinInput);
      if (valid) {
        const success = await rekeyWallet(agent, PINOld, PIN, store.preferences.useBiometry);
        if (success) {
          if (historyEventsLogger.logPinChanged) {
            logHistoryRecord();
          }
          if (PINScreensConfig.useNewPINDesign) {
            setPINConfirmModalVisible(false);
            navigation.navigate(_navigators.Screens.ChangePINSuccess);
          } else {
            navigation.navigate(_navigators.Screens.Settings);
          }
        }
      }
    } catch (err) {
      const error = new _error.BifoldError(t('Error.Title1049'), t('Error.Message1049'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1049);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    } finally {
      setIsLoading(false);
    }
  };
  const isContinueDisabled = (0, _react.useMemo)(() => {
    if (inlineMessages || isLoading) {
      return false;
    }
    return PIN === '' || PIN.length < _constants.minPINLength;
  }, [inlineMessages, isLoading, PIN]);
  return /*#__PURE__*/_react.default.createElement(_ScreenWrapper.default, {
    keyboardActive: true,
    padded: false
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.screenContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.contentContainer
  }, /*#__PURE__*/_react.default.createElement(PINHeader, {
    updatePin: true
  }), !PINScreensConfig.useNewPINDesign && /*#__PURE__*/_react.default.createElement(_PINInput.default, {
    label: t('PINChange.EnterOldPINTitle'),
    testID: (0, _testable.testIdWithKey)('EnterOldPIN'),
    accessibilityLabel: t('PINChange.EnterOldPIN'),
    onPINChanged: p => {
      setPINOld(p);
    },
    onSubmitEditing: handleChangePinTap
  }), /*#__PURE__*/_react.default.createElement(_PINInput.default, {
    label: t('PINChange.EnterPINTitle'),
    onPINChanged: async userPinInput => {
      setInlineMessageField1(undefined);
      setPIN(userPinInput);
      if (userPinInput.length === _constants.minPINLength && PINScreensConfig.useNewPINDesign) {
        await handleConfirmPINModal(userPinInput);
      }
    },
    testID: (0, _testable.testIdWithKey)('EnterPIN'),
    accessibilityLabel: t('PINCreate.EnterPIN'),
    autoFocus: false,
    inlineMessage: inlineMessageField1,
    onSubmitEditing: handleChangePinTap
  }), !PINScreensConfig.useNewPINDesign && /*#__PURE__*/_react.default.createElement(_PINInput.default, {
    label: t('PINCreateConfirm.PINInputLabel'),
    onPINChanged: async userPinInput => {
      setInlineMessageField2(undefined);
      setPINTwo(userPinInput);
    },
    testID: (0, _testable.testIdWithKey)('ConfirmPIN'),
    accessibilityLabel: t('PINCreateConfirm.PINInputLabel'),
    autoFocus: false,
    inlineMessage: inlineMessageField2,
    onSubmitEditing: handleChangePinTap
  }), PINSecurity.displayHelper && /*#__PURE__*/_react.default.createElement(_PINValidationHelper.default, {
    validations: PINValidations
  }), modalState.visible && /*#__PURE__*/_react.default.createElement(_AlertModal.default, {
    title: modalState.title,
    message: modalState.message,
    submit: modalState.onModalDismiss
  })), !PINScreensConfig.useNewPINDesign && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.controlsContainer
  }, /*#__PURE__*/_react.default.createElement(Button, {
    title: t('PINChange.ChangePIN'),
    testID: (0, _testable.testIdWithKey)('ChangePIN'),
    accessibilityLabel: t('Global.Continue'),
    buttonType: _ButtonApi.ButtonType.Primary,
    disabled: isContinueDisabled,
    onPress: handleChangePinTap,
    ref: createPINButtonRef
  }, isLoading ? /*#__PURE__*/_react.default.createElement(ButtonLoading, null) : null))), /*#__PURE__*/_react.default.createElement(_VerifyPINModal.default, {
    onAuthenticationComplete: onAuthenticationComplete,
    onBackPressed: onVerifyPINModalBackPressed,
    onCancelAuth: onCancelAuth,
    PINVerifyModalUsage: _PINVerify.PINEntryUsage.ChangePIN,
    title: t('Screens.EnterPIN'),
    visible: verifyPINModalVisible
  }), /*#__PURE__*/_react.default.createElement(_ConfirmPINModal.default, {
    errorModalState: modalState,
    isLoading: isLoading,
    modalUsage: _ConfirmPINModal.ConfirmPINModalUsage.PIN_CHANGE,
    onBackPressed: onConfirmPINModalBackPressed,
    onConfirmPIN: handleConfirmPIN,
    PINOne: PIN,
    setPINTwo: setPINTwo,
    title: t('Screens.ConfirmPIN'),
    visible: confirmPINModalVisible
  }));
};
var _default = exports.default = PINChange;
//# sourceMappingURL=PINChange.js.map