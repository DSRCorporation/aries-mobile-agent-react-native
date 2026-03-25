"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNativeDeviceInfo = require("react-native-device-info");
var _reactNative = require("react-native");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _InlineErrorText = require("../components/inputs/InlineErrorText");
var _PINInput = _interopRequireDefault(require("../components/inputs/PINInput"));
var _InfoBox = require("../components/misc/InfoBox");
var _DeveloperModal = _interopRequireDefault(require("../components/modals/DeveloperModal"));
var _PopupModal = _interopRequireDefault(require("../components/modals/PopupModal"));
var _ThemedText = require("../components/texts/ThemedText");
var _ScreenWrapper = _interopRequireDefault(require("../components/views/ScreenWrapper"));
var _constants = require("../constants");
var _containerApi = require("../container-api");
var _animatedComponents = require("../contexts/animated-components");
var _auth = require("../contexts/auth");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _developerMode = require("../hooks/developer-mode");
var _lockout = require("../hooks/lockout");
var _screenCapture = _interopRequireDefault(require("../hooks/screen-capture"));
var _error = require("../types/error");
var _testable = require("../utils/testable");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const PINEnter = ({
  setAuthenticated
}) => {
  var _customAutoLockTimes$;
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    checkWalletPIN,
    getWalletSecret,
    isBiometricsActive,
    disableBiometrics
  } = (0, _auth.useAuth)();
  const [store, dispatch] = (0, _store2.useStore)();
  const [PIN, setPIN] = (0, _react.useState)('');
  const [continueEnabled, setContinueEnabled] = (0, _react.useState)(true);
  const [displayLockoutWarning, setDisplayLockoutWarning] = (0, _react.useState)(false);
  const [biometricsErr, setBiometricsErr] = (0, _react.useState)(false);
  const [alertModalVisible, setAlertModalVisible] = (0, _react.useState)(false);
  const [forgotPINModalVisible, setForgotPINModalVisible] = (0, _react.useState)(false);
  const [devModalVisible, setDevModalVisible] = (0, _react.useState)(false);
  const [showForgotPINMessage, setShowForgotPINMessage] = (0, _react.useState)(false);
  const [biometricsEnrollmentChange, setBiometricsEnrollmentChange] = (0, _react.useState)(false);
  const {
    ColorPalette,
    TextTheme,
    Spacing
  } = (0, _theme.useTheme)();
  const {
    ButtonLoading,
    LoadingSpinner
  } = (0, _animatedComponents.useAnimatedComponents)();
  const [logger, {
    preventScreenCapture,
    enableHiddenDevModeTrigger,
    attemptLockoutConfig: {
      thresholdRules
    } = _constants.attemptLockoutConfig,
    PINScreensConfig,
    customAutoLockTimes
  }, inlineMessages] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.CONFIG, _containerApi.TOKENS.INLINE_ERRORS]);
  const [inlineMessageField, setInlineMessageField] = (0, _react.useState)();
  const [alertModalMessage, setAlertModalMessage] = (0, _react.useState)('');
  const appState = (0, _react.useRef)(_reactNative.AppState.currentState);
  const {
    getLockoutPenalty,
    attemptLockout,
    unMarkServedPenalty
  } = (0, _lockout.useLockout)();
  const onBackPressed = () => setDevModalVisible(false);
  const onDevModeTriggered = () => {
    _reactNative.Vibration.vibrate();
    setDevModalVisible(true);
  };
  const {
    incrementDeveloperMenuCounter
  } = (0, _developerMode.useDeveloperMode)(onDevModeTriggered);
  const isContinueDisabled = inlineMessages.enabled ? !continueEnabled : !continueEnabled || PIN.length < _constants.minPINLength;
  const defaultAutoLockoutTime = (customAutoLockTimes === null || customAutoLockTimes === void 0 || (_customAutoLockTimes$ = customAutoLockTimes.default) === null || _customAutoLockTimes$ === void 0 ? void 0 : _customAutoLockTimes$.time) ?? _constants.defaultAutoLockTime;
  (0, _screenCapture.default)(preventScreenCapture);

  // listen for biometrics error event
  (0, _react.useEffect)(() => {
    const handle = _reactNative.DeviceEventEmitter.addListener(_constants.EventTypes.BIOMETRY_ERROR, value => {
      setBiometricsErr(prev => value ?? !prev);
    });
    return () => {
      handle.remove();
    };
  }, []);
  const loadWalletCredentials = (0, _react.useCallback)(async () => {
    const walletSecret = await getWalletSecret();
    if (walletSecret) {
      // remove lockout notification
      dispatch({
        type: _store.DispatchAction.LOCKOUT_UPDATED,
        payload: [{
          displayNotification: false
        }]
      });
      // reset login attempts if login is successful
      dispatch({
        type: _store.DispatchAction.ATTEMPT_UPDATED,
        payload: [{
          loginAttempts: 0
        }]
      });
      setAuthenticated(true);
    }
  }, [getWalletSecret, dispatch, setAuthenticated]);
  (0, _react.useEffect)(() => {
    // Only check biometrics if user has it enabled
    if (!store.preferences.useBiometry) {
      return;
    }
    const checkBiometrics = async () => {
      try {
        const active = await isBiometricsActive();
        if (!active) {
          // biometry state has changed, display message and disable biometry
          setBiometricsEnrollmentChange(true);
          await disableBiometrics();
          dispatch({
            type: _store.DispatchAction.USE_BIOMETRY,
            payload: [false]
          });
        }
        await loadWalletCredentials();
      } catch (error) {
        logger.error('error checking biometrics / loading credentials', error);
      }
    };

    // On mount, check biometrics after interactions complete
    let afterInteractionsBiometricsHandler = _reactNative.InteractionManager.runAfterInteractions(checkBiometrics);

    // Re-check biometrics when app transitions from background (inactive) to foreground (active)
    const appStateListener = _reactNative.AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active' && appState.current.match(/background/)) {
        // Cancel any existing interaction handler before scheduling a new one
        afterInteractionsBiometricsHandler.cancel();
        afterInteractionsBiometricsHandler = _reactNative.InteractionManager.runAfterInteractions(checkBiometrics);
      }
    });
    return () => {
      // Cleanup listeners and handlers on unmount
      afterInteractionsBiometricsHandler.cancel();
      appStateListener.remove();
    };
  }, [store.preferences.useBiometry, isBiometricsActive, disableBiometrics, dispatch, loadWalletCredentials, logger]);
  (0, _react.useEffect)(() => {
    // check number of login attempts and determine if app should apply lockout
    const attempts = store.loginAttempt.loginAttempts;
    // display warning if we are one away from a lockout
    const displayWarning = !!getLockoutPenalty(attempts + 1);
    setDisplayLockoutWarning(displayWarning);
  }, [store.loginAttempt.loginAttempts, getLockoutPenalty]);
  (0, _react.useEffect)(() => {
    setInlineMessageField(undefined);
  }, [PIN]);
  const unlockWalletWithPIN = (0, _react.useCallback)(async PIN => {
    try {
      setContinueEnabled(false);
      const result = await checkWalletPIN(PIN);
      if (store.loginAttempt.servedPenalty) {
        // once the user starts entering their PIN, unMark them as having served their
        // lockout penalty
        unMarkServedPenalty();
      }
      if (!result) {
        const newAttempt = store.loginAttempt.loginAttempts + 1;
        let message = '';
        const attemptsLeft = (thresholdRules.increment - newAttempt % thresholdRules.increment) % thresholdRules.increment;
        if (!inlineMessages.enabled && !getLockoutPenalty(newAttempt)) {
          // skip displaying modals if we are going to lockout
          setAlertModalVisible(true);
        }
        if (attemptsLeft > 1) {
          message = t('PINEnter.IncorrectPINTries', {
            tries: attemptsLeft
          });
        } else if (attemptsLeft === 1) {
          message = t('PINEnter.LastTryBeforeTimeout');
        } else {
          const penalty = getLockoutPenalty(newAttempt);
          if (penalty !== undefined) {
            attemptLockout(penalty); // Only call attemptLockout if penalty is defined
          }
          setContinueEnabled(true);
          return;
        }
        if (inlineMessages.enabled) {
          setShowForgotPINMessage(true);
          setInlineMessageField({
            message,
            inlineType: _InlineErrorText.InlineErrorType.error,
            config: inlineMessages
          });
        } else {
          setShowForgotPINMessage(true);
          setAlertModalMessage(message);
        }
        setContinueEnabled(true);
        // log incorrect login attempts
        dispatch({
          type: _store.DispatchAction.ATTEMPT_UPDATED,
          payload: [{
            loginAttempts: newAttempt
          }]
        });
        return;
      }
      // reset login attempts if login is successful
      dispatch({
        type: _store.DispatchAction.ATTEMPT_UPDATED,
        payload: [{
          loginAttempts: 0
        }]
      });
      // remove lockout notification if login is successful
      dispatch({
        type: _store.DispatchAction.LOCKOUT_UPDATED,
        payload: [{
          displayNotification: false
        }]
      });
      setAuthenticated(true);
    } catch (err) {
      const error = new _error.BifoldError(t('Error.Title1041'), t('Error.Message1041'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1041);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
  }, [checkWalletPIN, store.loginAttempt, unMarkServedPenalty, getLockoutPenalty, dispatch, setAuthenticated, t, attemptLockout, inlineMessages, thresholdRules.increment]);
  const clearAlertModal = (0, _react.useCallback)(() => {
    setAlertModalVisible(false);
  }, [setAlertModalVisible]);

  // both of the async functions called in this function are completely wrapped in try catch
  const onPINInputCompleted = (0, _react.useCallback)(async PIN => {
    if (inlineMessages.enabled && PIN.length < _constants.minPINLength) {
      setInlineMessageField({
        message: t('PINCreate.PINTooShort'),
        inlineType: _InlineErrorText.InlineErrorType.error,
        config: inlineMessages
      });
      return;
    }
    setContinueEnabled(false);
    await unlockWalletWithPIN(PIN);
  }, [unlockWalletWithPIN, t, inlineMessages]);
  const style = _reactNative.StyleSheet.create({
    biometricsText: {
      alignSelf: 'center',
      marginTop: Spacing.sm
    },
    helpText: {
      alignSelf: 'auto',
      textAlign: 'left',
      marginBottom: PINScreensConfig.useNewPINDesign ? 24 : 16
    },
    helpTextSubtitle: {
      alignSelf: 'auto',
      textAlign: 'left',
      marginBottom: Spacing.md
    },
    inputLabel: {
      marginBottom: Spacing.md
    },
    modalText: {
      marginVertical: Spacing.xs
    },
    subTitle: {
      marginBottom: Spacing.md
    },
    forgotPINText: {
      fontSize: PINScreensConfig.useNewPINDesign ? 16 : 20,
      textAlign: PINScreensConfig.useNewPINDesign ? 'center' : 'left',
      color: PINScreensConfig.useNewPINDesign ? '' : ColorPalette.brand.link
    },
    buildNumberText: {
      fontSize: 14,
      color: TextTheme.labelSubtitle.color,
      textAlign: 'center',
      marginTop: Spacing.sm
    },
    appTitle: {
      marginTop: Spacing.md,
      marginBottom: Spacing.lg
    },
    loadingContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  const HelpText = (0, _react.useMemo)(() => {
    const showHelpText = store.lockout.displayNotification || biometricsEnrollmentChange || biometricsErr;
    let header = t('PINEnter.Title');
    let subheader = t('PINEnter.SubText');
    if (store.lockout.displayNotification) {
      header = t('PINEnter.LockedOut', {
        time: String(store.preferences.autoLockTime ?? defaultAutoLockoutTime)
      });
      subheader = t('PINEnter.ReEnterPIN');
    }
    if (biometricsEnrollmentChange) {
      header = t('PINEnter.BiometricsChanged');
      subheader = t('PINEnter.BiometricsChangedEnterPIN');
    }
    if (biometricsErr) {
      header = t('PINEnter.BiometricsError');
      subheader = t('PINEnter.BiometricsErrorEnterPIN');
    }
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, PINScreensConfig.useNewPINDesign && store.lockout.displayNotification && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: 'headingTwo',
      style: style.helpText
    }, t('PINEnter.Title')), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: showHelpText ? 'normal' : 'headingThree',
      style: PINScreensConfig.useNewPINDesign ? style.helpText : style.helpTextSubtitle
    }, header), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: PINScreensConfig.useNewPINDesign ? 'normal' : 'labelSubtitle',
      style: PINScreensConfig.useNewPINDesign ? style.helpTextSubtitle : style.helpText
    }, subheader));
  }, [style.helpText, store.lockout.displayNotification, t, biometricsEnrollmentChange, biometricsErr, store.preferences.autoLockTime, style.helpTextSubtitle, PINScreensConfig.useNewPINDesign, defaultAutoLockoutTime]);
  const controls = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !PINScreensConfig.useNewPINDesign && /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('PINEnter.Unlock'),
    buttonType: _Button.ButtonType.Primary,
    testID: (0, _testable.testIdWithKey)('Enter'),
    disabled: isContinueDisabled,
    accessibilityLabel: t('PINEnter.Unlock'),
    onPress: () => {
      _reactNative.Keyboard.dismiss();
      onPINInputCompleted(PIN);
    }
  }, !continueEnabled && /*#__PURE__*/_react.default.createElement(ButtonLoading, null)), store.preferences.useBiometry && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: style.biometricsText
  }, t('PINEnter.Or')), /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('PINEnter.BiometricsUnlock'),
    buttonType: _Button.ButtonType.Secondary,
    testID: (0, _testable.testIdWithKey)('BiometricsUnlock'),
    disabled: !continueEnabled,
    accessibilityLabel: t('PINEnter.BiometricsUnlock'),
    onPress: loadWalletCredentials
  })), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    testID: (0, _testable.testIdWithKey)('Version'),
    style: style.buildNumberText
  }, `${t('Settings.Version')} ${(0, _reactNativeDeviceInfo.getVersion)()} ${t('Settings.Build')} (${(0, _reactNativeDeviceInfo.getBuildNumber)()})`));
  return /*#__PURE__*/_react.default.createElement(_ScreenWrapper.default, {
    keyboardActive: true,
    controls: controls
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, PINScreensConfig.useNewPINDesign && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold",
    style: style.appTitle
  }, t('PINEnter.AppTitle')), /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: enableHiddenDevModeTrigger ? incrementDeveloperMenuCounter : () => {},
    testID: (0, _testable.testIdWithKey)('DeveloperCounter')
  }, HelpText), !PINScreensConfig.useNewPINDesign && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold",
    style: style.inputLabel
  }, t('PINEnter.EnterPIN')), /*#__PURE__*/_react.default.createElement(_PINInput.default, {
    onPINChanged: userPinInput => {
      setPIN(userPinInput);
      if (userPinInput.length === _constants.minPINLength) {
        _reactNative.Keyboard.dismiss();
        onPINInputCompleted(userPinInput);
      }
    },
    testID: (0, _testable.testIdWithKey)('EnterPIN'),
    accessibilityLabel: t('PINEnter.EnterPIN'),
    autoFocus: true,
    inlineMessage: inlineMessageField,
    onSubmitEditing: userPinInput => {
      onPINInputCompleted(userPinInput);
    }
  }), !PINScreensConfig.useNewPINDesign && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold",
    style: style.forgotPINText,
    onPress: () => setForgotPINModalVisible(true),
    testID: (0, _testable.testIdWithKey)('ForgotPINLink'),
    accessible: true,
    accessibilityRole: "link",
    accessibilityLabel: t('PINEnter.ForgotPINLink')
  }, t('PINEnter.ForgotPINLink')), showForgotPINMessage && PINScreensConfig.useNewPINDesign && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "normal",
    style: style.forgotPINText,
    testID: (0, _testable.testIdWithKey)('ForgotPINDescription'),
    accessible: true,
    accessibilityRole: "text",
    accessibilityLabel: t('PINEnter.ForgotPINModalDescription')
  }, t('PINEnter.ForgotPINModalDescription'))), PINScreensConfig.useNewPINDesign && !continueEnabled && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.loadingContainer
  }, /*#__PURE__*/_react.default.createElement(LoadingSpinner, {
    size: 50,
    color: ColorPalette.brand.primary
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "normal"
  }, t('PINEnter.Loading'))), alertModalVisible ? /*#__PURE__*/_react.default.createElement(_PopupModal.default, {
    notificationType: _InfoBox.InfoBoxType.Info,
    title: t('PINEnter.IncorrectPIN'),
    bodyContent: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "popupModalText",
      style: style.modalText
    }, alertModalMessage), displayLockoutWarning ? /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "popupModalText",
      style: style.modalText
    }, t('PINEnter.AttemptLockoutWarning')) : null),
    onCallToActionLabel: t('Global.Okay'),
    onCallToActionPressed: clearAlertModal
  }) : null, forgotPINModalVisible ? /*#__PURE__*/_react.default.createElement(_PopupModal.default, {
    notificationType: _InfoBox.InfoBoxType.Info,
    title: t('PINEnter.ForgotPINModalTitle'),
    bodyContent: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "popupModalText",
      style: style.modalText,
      testID: (0, _testable.testIdWithKey)('ForgotPINModalDescription')
    }, t('PINEnter.ForgotPINModalDescription')),
    onCallToActionLabel: t('Global.Okay'),
    onCallToActionPressed: () => setForgotPINModalVisible(false)
  }) : null, devModalVisible ? /*#__PURE__*/_react.default.createElement(_DeveloperModal.default, {
    onBackPressed: onBackPressed
  }) : null);
};
var _default = exports.default = PINEnter;
//# sourceMappingURL=PINEnter.js.map