import { useNavigation, CommonActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, StyleSheet, Text, Image, View, DeviceEventEmitter, InteractionManager } from 'react-native';
import Button, { ButtonType } from '../components/buttons/Button';
import PINInput from '../components/inputs/PINInput';
import { InfoBoxType } from '../components/misc/InfoBox';
import PopupModal from '../components/modals/PopupModal';
import KeyboardView from '../components/views/KeyboardView';
import { minPINLength, attemptLockoutBaseRules, attemptLockoutThresholdRules, EventTypes } from '../constants';
import { TOKENS, useServices } from '../container-api';
import { useAnimatedComponents } from '../contexts/animated-components';
import { useAuth } from '../contexts/auth';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { BifoldError } from '../types/error';
import { Screens } from '../types/navigators';
import { hashPIN } from '../utils/crypto';
import { testIdWithKey } from '../utils/testable';
export let PINEntryUsage = /*#__PURE__*/function (PINEntryUsage) {
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
  } = useTranslation();
  const {
    checkPIN,
    getWalletCredentials,
    isBiometricsActive,
    disableBiometrics
  } = useAuth();
  const [store, dispatch] = useStore();
  const [PIN, setPIN] = useState('');
  const [continueEnabled, setContinueEnabled] = useState(true);
  const [displayLockoutWarning, setDisplayLockoutWarning] = useState(false);
  const [biometricsErr, setBiometricsErr] = useState(false);
  const navigation = useNavigation();
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [biometricsEnrollmentChange, setBiometricsEnrollmentChange] = useState(false);
  const {
    ColorPallet,
    TextTheme,
    Assets,
    PINEnterTheme
  } = useTheme();
  const {
    ButtonLoading
  } = useAnimatedComponents();
  const [logger] = useServices([TOKENS.UTIL_LOGGER]);
  const style = StyleSheet.create({
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
  useEffect(() => {
    const handle = DeviceEventEmitter.addListener(EventTypes.BIOMETRY_ERROR, value => {
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
      type: DispatchAction.ATTEMPT_UPDATED,
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
      type: DispatchAction.ATTEMPT_UPDATED,
      payload: [{
        loginAttempts: store.loginAttempt.loginAttempts,
        lockoutDate: Date.now() + penalty,
        servedPenalty: false
      }]
    });
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [{
        name: Screens.AttemptLockout
      }]
    }));
  };
  const getLockoutPenalty = attempts => {
    let penalty = attemptLockoutBaseRules[attempts];
    if (!penalty && attempts >= attemptLockoutThresholdRules.attemptThreshold && !(attempts % attemptLockoutThresholdRules.attemptIncrement)) {
      penalty = attemptLockoutThresholdRules.attemptPenalty;
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
        type: DispatchAction.LOCKOUT_UPDATED,
        payload: [{
          displayNotification: false
        }]
      });

      // reset login attempts if login is successful
      dispatch({
        type: DispatchAction.ATTEMPT_UPDATED,
        payload: [{
          loginAttempts: 0
        }]
      });
      setAuthenticated(true);
      gotoPostAuthScreens();
    }
  };
  useEffect(() => {
    const handle = InteractionManager.runAfterInteractions(async () => {
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
            type: DispatchAction.USE_BIOMETRY,
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
  useEffect(() => {
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
          type: DispatchAction.ATTEMPT_UPDATED,
          payload: [{
            loginAttempts: newAttempt
          }]
        });
        return;
      }

      // reset login attempts if login is successful
      dispatch({
        type: DispatchAction.ATTEMPT_UPDATED,
        payload: [{
          loginAttempts: 0
        }]
      });

      // remove lockout notification if login is successful
      dispatch({
        type: DispatchAction.LOCKOUT_UPDATED,
        payload: [{
          displayNotification: false
        }]
      });
      setAuthenticated(true);
      gotoPostAuthScreens();
    } catch (err) {
      const error = new BifoldError(t('Error.Title1041'), t('Error.Message1041'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1041);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
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
      const key = await hashPIN(PIN, credentials.salt);
      if (credentials.key !== key) {
        setAlertModalVisible(true);
        return;
      }
      setAuthenticated(true);
    } catch (err) {
      const error = new BifoldError(t('Error.Title1042'), t('Error.Message1042'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1042);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
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
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
        style: style.helpText
      }, t('PINEnter.LockedOut')), /*#__PURE__*/React.createElement(Text, {
        style: style.helpText
      }, t('PINEnter.ReEnterPIN')));
    }
    if (biometricsEnrollmentChange) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
        style: style.helpText
      }, t('PINEnter.BiometricsChanged')), /*#__PURE__*/React.createElement(Text, {
        style: style.helpText
      }, t('PINEnter.BiometricsChangedEnterPIN')));
    }
    if (biometricsErr) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
        style: style.helpText
      }, t('PINEnter.BiometricsError')), /*#__PURE__*/React.createElement(Text, {
        style: style.helpText
      }, t('PINEnter.BiometricsErrorEnterPIN')));
    }
    return /*#__PURE__*/React.createElement(Text, {
      style: style.helpText
    }, t('PINEnter.EnterPIN'));
  };
  return /*#__PURE__*/React.createElement(KeyboardView, null, /*#__PURE__*/React.createElement(View, {
    style: style.screenContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: style.contentContainer
  }, /*#__PURE__*/React.createElement(Image, {
    source: Assets.img.logoSecondary.src,
    style: style.image
  }), displayHelpText(), /*#__PURE__*/React.createElement(PINInput, {
    onPINChanged: p => {
      setPIN(p);
      if (p.length === minPINLength) {
        Keyboard.dismiss();
      }
    },
    testID: testIdWithKey('EnterPIN'),
    accessibilityLabel: t('PINEnter.EnterPIN'),
    autoFocus: true
  })), /*#__PURE__*/React.createElement(View, {
    style: style.controlsContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: style.buttonContainer
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('PINEnter.Unlock'),
    buttonType: ButtonType.Primary,
    testID: testIdWithKey('Enter'),
    disabled: !continueEnabled || PIN.length < minPINLength,
    accessibilityLabel: t('PINEnter.Unlock'),
    onPress: () => {
      Keyboard.dismiss();
      onPINInputCompleted(PIN);
    }
  }, !continueEnabled && /*#__PURE__*/React.createElement(ButtonLoading, null))), store.preferences.useBiometry && usage === PINEntryUsage.WalletUnlock && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
    style: [TextTheme.normal, {
      alignSelf: 'center',
      marginTop: 10
    }]
  }, t('PINEnter.Or')), /*#__PURE__*/React.createElement(View, {
    style: [style.buttonContainer, {
      marginTop: 10
    }]
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('PINEnter.BiometricsUnlock'),
    buttonType: ButtonType.Secondary,
    testID: testIdWithKey('Enter'),
    disabled: !continueEnabled,
    accessibilityLabel: t('PINEnter.BiometricsUnlock'),
    onPress: loadWalletCredentials
  }))))), alertModalVisible && /*#__PURE__*/React.createElement(PopupModal, {
    notificationType: InfoBoxType.Info,
    title: t('PINEnter.IncorrectPIN'),
    bodyContent: /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
      style: style.modalText
    }, t('PINEnter.RepeatPIN')), displayLockoutWarning ? /*#__PURE__*/React.createElement(Text, {
      style: style.modalText
    }, t('PINEnter.AttemptLockoutWarning')) : null),
    onCallToActionLabel: t('Global.Okay'),
    onCallToActionPressed: clearAlertModal
  }));
};
export default PINEnter;
//# sourceMappingURL=PINEnter.js.map