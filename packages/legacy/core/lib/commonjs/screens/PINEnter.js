"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PINEntryUsage = void 0;
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _PINInput = _interopRequireDefault(require("../components/inputs/PINInput"));
var _InfoBox = require("../components/misc/InfoBox");
var _PopupModal = _interopRequireDefault(require("../components/modals/PopupModal"));
var _KeyboardView = _interopRequireDefault(require("../components/views/KeyboardView"));
var _constants = require("../constants");
var _containerApi = require("../container-api");
var _animatedComponents = require("../contexts/animated-components");
var _auth = require("../contexts/auth");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _error = require("../types/error");
var _navigators = require("../types/navigators");
var _crypto = require("../utils/crypto");
var _testable = require("../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
let PINEntryUsage = exports.PINEntryUsage = /*#__PURE__*/function (PINEntryUsage) {
  PINEntryUsage[PINEntryUsage["PINCheck"] = 0] = "PINCheck";
  PINEntryUsage[PINEntryUsage["WalletUnlock"] = 1] = "WalletUnlock";
  return PINEntryUsage;
}({});
const PINEnter = ({
  setAuthenticated,
  usage = PINEntryUsage.WalletUnlock
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    checkPIN,
    getWalletCredentials,
    isBiometricsActive,
    disableBiometrics
  } = (0, _auth.useAuth)();
  const [store, dispatch] = (0, _store2.useStore)();
  const [PIN, setPIN] = (0, _react.useState)('');
  const [continueEnabled, setContinueEnabled] = (0, _react.useState)(true);
  const [displayLockoutWarning, setDisplayLockoutWarning] = (0, _react.useState)(false);
  const [biometricsErr, setBiometricsErr] = (0, _react.useState)(false);
  const navigation = (0, _native.useNavigation)();
  const [alertModalVisible, setAlertModalVisible] = (0, _react.useState)(false);
  const [biometricsEnrollmentChange, setBiometricsEnrollmentChange] = (0, _react.useState)(false);
  const {
    ColorPallet,
    TextTheme,
    Assets,
    PINEnterTheme
  } = (0, _theme.useTheme)();
  const {
    ButtonLoading
  } = (0, _animatedComponents.useAnimatedComponents)();
  const [logger] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER]);
  const style = _reactNative.StyleSheet.create({
    screenContainer: {
      height: '100%',
      backgroundColor: ColorPallet.brand.primaryBackground,
      padding: 20,
      justifyContent: 'space-between'
    },
    // below used as helpful labels for views, no properties needed atp
    contentContainer: {},
    controlsContainer: {},
    buttonContainer: {
      width: '100%'
    },
    notifyText: {
      ...TextTheme.normal,
      marginVertical: 5
    },
    helpText: {
      ...TextTheme.normal,
      alignSelf: 'center',
      textAlign: 'center',
      marginBottom: 16
    },
    modalText: {
      ...TextTheme.popupModalText,
      marginVertical: 5
    },
    image: {
      ...PINEnterTheme.image,
      height: Assets.img.logoSecondary.height,
      width: Assets.img.logoSecondary.width,
      resizeMode: Assets.img.logoSecondary.resizeMode
    }
  });
  const gotoPostAuthScreens = () => {
    if (store.onboarding.postAuthScreens.length) {
      const screen = store.onboarding.postAuthScreens[0];
      if (screen) {
        navigation.navigate(screen);
      }
    }
  };

  // listen for biometrics error event
  (0, _react.useEffect)(() => {
    const handle = _reactNative.DeviceEventEmitter.addListener(_constants.EventTypes.BIOMETRY_ERROR, value => {
      const newVal = value === undefined ? !biometricsErr : value;
      setBiometricsErr(newVal);
    });
    return () => {
      handle.remove();
    };
  }, []);

  // This method is used to notify the app that the user is able to receive another lockout penalty
  const unMarkServedPenalty = () => {
    dispatch({
      type: _store.DispatchAction.ATTEMPT_UPDATED,
      payload: [{
        loginAttempts: store.loginAttempt.loginAttempts,
        lockoutDate: store.loginAttempt.lockoutDate,
        servedPenalty: false
      }]
    });
  };
  const attemptLockout = async penalty => {
    // set the attempt lockout time
    dispatch({
      type: _store.DispatchAction.ATTEMPT_UPDATED,
      payload: [{
        loginAttempts: store.loginAttempt.loginAttempts,
        lockoutDate: Date.now() + penalty,
        servedPenalty: false
      }]
    });
    navigation.dispatch(_native.CommonActions.reset({
      index: 0,
      routes: [{
        name: _navigators.Screens.AttemptLockout
      }]
    }));
  };
  const getLockoutPenalty = attempts => {
    let penalty = _constants.attemptLockoutBaseRules[attempts];
    if (!penalty && attempts >= _constants.attemptLockoutThresholdRules.attemptThreshold && !(attempts % _constants.attemptLockoutThresholdRules.attemptIncrement)) {
      penalty = _constants.attemptLockoutThresholdRules.attemptPenalty;
    }
    return penalty;
  };
  const loadWalletCredentials = async () => {
    if (usage === PINEntryUsage.PINCheck) {
      return;
    }
    const creds = await getWalletCredentials();
    if (creds && creds.key) {
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
      gotoPostAuthScreens();
    }
  };
  (0, _react.useEffect)(() => {
    const handle = _reactNative.InteractionManager.runAfterInteractions(async () => {
      if (!store.preferences.useBiometry) {
        return;
      }
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
        logger.error(`error checking biometrics / loading credentials: ${JSON.stringify(error)}`);
      }
    });
    return handle.cancel;
  }, []);
  (0, _react.useEffect)(() => {
    // check number of login attempts and determine if app should apply lockout
    const attempts = store.loginAttempt.loginAttempts;
    const penalty = getLockoutPenalty(attempts);
    if (penalty && !store.loginAttempt.servedPenalty) {
      // only apply lockout if user has not served their penalty
      attemptLockout(penalty);
    }

    // display warning if we are one away from a lockout
    const displayWarning = !!getLockoutPenalty(attempts + 1);
    setDisplayLockoutWarning(displayWarning);
  }, [store.loginAttempt.loginAttempts]);
  const unlockWalletWithPIN = async PIN => {
    try {
      setContinueEnabled(false);
      const result = await checkPIN(PIN);
      if (store.loginAttempt.servedPenalty) {
        // once the user starts entering their PIN, unMark them as having served their lockout penalty
        unMarkServedPenalty();
      }
      if (!result) {
        const newAttempt = store.loginAttempt.loginAttempts + 1;
        if (!getLockoutPenalty(newAttempt)) {
          // skip displaying modals if we are going to lockout
          setAlertModalVisible(true);
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
      gotoPostAuthScreens();
    } catch (err) {
      const error = new _error.BifoldError(t('Error.Title1041'), t('Error.Message1041'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1041);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
  };
  const clearAlertModal = () => {
    switch (usage) {
      case PINEntryUsage.PINCheck:
        setAlertModalVisible(false);
        setAuthenticated(false);
        break;
      default:
        setAlertModalVisible(false);
        break;
    }
    setAlertModalVisible(false);
  };
  const verifyPIN = async PIN => {
    try {
      const credentials = await getWalletCredentials();
      if (!credentials) {
        throw new Error('Problem');
      }
      const key = await (0, _crypto.hashPIN)(PIN, credentials.salt);
      if (credentials.key !== key) {
        setAlertModalVisible(true);
        return;
      }
      setAuthenticated(true);
    } catch (err) {
      const error = new _error.BifoldError(t('Error.Title1042'), t('Error.Message1042'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1042);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
  };

  // both of the async functions called in this function are completely wrapped in trycatch
  const onPINInputCompleted = async PIN => {
    setContinueEnabled(false);
    if (usage === PINEntryUsage.PINCheck) {
      await verifyPIN(PIN);
    }
    if (usage === PINEntryUsage.WalletUnlock) {
      await unlockWalletWithPIN(PIN);
    }
  };
  const displayHelpText = () => {
    if (store.lockout.displayNotification) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: style.helpText
      }, t('PINEnter.LockedOut')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: style.helpText
      }, t('PINEnter.ReEnterPIN')));
    }
    if (biometricsEnrollmentChange) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: style.helpText
      }, t('PINEnter.BiometricsChanged')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: style.helpText
      }, t('PINEnter.BiometricsChangedEnterPIN')));
    }
    if (biometricsErr) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: style.helpText
      }, t('PINEnter.BiometricsError')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: style.helpText
      }, t('PINEnter.BiometricsErrorEnterPIN')));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.helpText
    }, t('PINEnter.EnterPIN'));
  };
  return /*#__PURE__*/_react.default.createElement(_KeyboardView.default, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.screenContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.contentContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: Assets.img.logoSecondary.src,
    style: style.image
  }), displayHelpText(), /*#__PURE__*/_react.default.createElement(_PINInput.default, {
    onPINChanged: p => {
      setPIN(p);
      if (p.length === _constants.minPINLength) {
        _reactNative.Keyboard.dismiss();
      }
    },
    testID: (0, _testable.testIdWithKey)('EnterPIN'),
    accessibilityLabel: t('PINEnter.EnterPIN'),
    autoFocus: true
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.controlsContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.buttonContainer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('PINEnter.Unlock'),
    buttonType: _Button.ButtonType.Primary,
    testID: (0, _testable.testIdWithKey)('Enter'),
    disabled: !continueEnabled || PIN.length < _constants.minPINLength,
    accessibilityLabel: t('PINEnter.Unlock'),
    onPress: () => {
      _reactNative.Keyboard.dismiss();
      onPINInputCompleted(PIN);
    }
  }, !continueEnabled && /*#__PURE__*/_react.default.createElement(ButtonLoading, null))), store.preferences.useBiometry && usage === PINEntryUsage.WalletUnlock && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [TextTheme.normal, {
      alignSelf: 'center',
      marginTop: 10
    }]
  }, t('PINEnter.Or')), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [style.buttonContainer, {
      marginTop: 10
    }]
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('PINEnter.BiometricsUnlock'),
    buttonType: _Button.ButtonType.Secondary,
    testID: (0, _testable.testIdWithKey)('Enter'),
    disabled: !continueEnabled,
    accessibilityLabel: t('PINEnter.BiometricsUnlock'),
    onPress: loadWalletCredentials
  }))))), alertModalVisible && /*#__PURE__*/_react.default.createElement(_PopupModal.default, {
    notificationType: _InfoBox.InfoBoxType.Info,
    title: t('PINEnter.IncorrectPIN'),
    bodyContent: /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.modalText
    }, t('PINEnter.RepeatPIN')), displayLockoutWarning ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.modalText
    }, t('PINEnter.AttemptLockoutWarning')) : null),
    onCallToActionLabel: t('Global.Okay'),
    onCallToActionPressed: clearAlertModal
  }));
};
var _default = exports.default = PINEnter;
//# sourceMappingURL=PINEnter.js.map