function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { StackActions, useNavigation, useNavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter } from 'react-native';
import { EventTypes } from '../constants';
import { TOKENS, useServices } from '../container-api';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { useOnboardingState } from '../hooks/useOnboardingState';
import AttemptLockout from '../screens/AttemptLockout';
import NameWallet from '../screens/NameWallet';
import { createCarouselStyle } from '../screens/OnboardingPages';
import PINCreate from '../screens/PINCreate';
import PINEnter from '../screens/PINEnter';
import PushNotifications from '../screens/PushNotifications';
import { useDefaultStackOptions } from './defaultStackOptions';
import { getOnboardingScreens } from './OnboardingScreens';
const OnboardingStack = ({
  initializeAgent,
  agent
}) => {
  const [store, dispatch] = useStore();
  const {
    t
  } = useTranslation();
  const Stack = createStackNavigator();
  const theme = useTheme();
  const OnboardingTheme = theme.OnboardingTheme;
  const carousel = createCarouselStyle(OnboardingTheme);
  const [config, Splash, pages, Biometry, Onboarding, {
    screen: Terms,
    version: termsVersion
  }, onTutorialCompletedCurried, ScreenOptionsDictionary, Preface, UpdateAvailable, versionMonitor, generateOnboardingWorkflowSteps] = useServices([TOKENS.CONFIG, TOKENS.SCREEN_SPLASH, TOKENS.SCREEN_ONBOARDING_PAGES, TOKENS.SCREEN_BIOMETRY, TOKENS.SCREEN_ONBOARDING, TOKENS.SCREEN_TERMS, TOKENS.FN_ONBOARDING_DONE, TOKENS.OBJECT_SCREEN_CONFIG, TOKENS.SCREEN_PREFACE, TOKENS.SCREEN_UPDATE_AVAILABLE, TOKENS.UTIL_APP_VERSION_MONITOR, TOKENS.ONBOARDING]);
  const defaultStackOptions = useDefaultStackOptions(theme);
  const navigation = useNavigation();
  const onTutorialCompleted = onTutorialCompletedCurried(dispatch, navigation);
  const currentRoute = useNavigationState(state => state === null || state === void 0 ? void 0 : state.routes[state === null || state === void 0 ? void 0 : state.index]);
  const {
    disableOnboardingSkip
  } = config;
  const {
    onboardingState,
    activeScreen
  } = useOnboardingState(store, config, Number(termsVersion), agent, generateOnboardingWorkflowSteps);
  useEffect(() => {
    var _versionMonitor$check;
    versionMonitor === null || versionMonitor === void 0 || (_versionMonitor$check = versionMonitor.checkForUpdate) === null || _versionMonitor$check === void 0 || _versionMonitor$check.call(versionMonitor).then(versionInfo => {
      dispatch({
        type: DispatchAction.SET_VERSION_INFO,
        payload: [versionInfo]
      });
    });
  }, [versionMonitor, dispatch]);
  const onAuthenticated = useCallback(status => {
    if (!status) {
      return;
    }
    dispatch({
      type: DispatchAction.DID_AUTHENTICATE
    });
  }, [dispatch]);
  const SplashScreen = useCallback(() => {
    return /*#__PURE__*/React.createElement(Splash, {
      initializeAgent: initializeAgent
    });
  }, [Splash, initializeAgent]);
  const UpdateAvailableScreen = useCallback(() => {
    var _config$appUpdateConf, _config$appUpdateConf2;
    return /*#__PURE__*/React.createElement(UpdateAvailable, {
      appleAppStoreUrl: (_config$appUpdateConf = config.appUpdateConfig) === null || _config$appUpdateConf === void 0 ? void 0 : _config$appUpdateConf.appleAppStoreUrl,
      googlePlayStoreUrl: (_config$appUpdateConf2 = config.appUpdateConfig) === null || _config$appUpdateConf2 === void 0 ? void 0 : _config$appUpdateConf2.googlePlayStoreUrl
    });
  }, [UpdateAvailable, config.appUpdateConfig]);
  const OnboardingScreen = useCallback(() => {
    return /*#__PURE__*/React.createElement(Onboarding, {
      nextButtonText: t('Global.Next'),
      previousButtonText: t('Global.Back'),
      disableSkip: disableOnboardingSkip,
      pages: pages(onTutorialCompleted, OnboardingTheme),
      style: carousel
    });
  }, [Onboarding, OnboardingTheme, carousel, disableOnboardingSkip, onTutorialCompleted, pages, t]);

  // These need to be in the children of the stack screen otherwise they
  // will unmount/remount which resets the component state in memory and causes
  // issues
  const CreatePINScreen = useCallback(props => {
    return /*#__PURE__*/React.createElement(PINCreate, _extends({
      setAuthenticated: onAuthenticated
    }, props));
  }, [onAuthenticated]);
  const EnterPINScreen = useCallback(props => {
    return /*#__PURE__*/React.createElement(PINEnter, _extends({
      setAuthenticated: onAuthenticated
    }, props));
  }, [onAuthenticated]);
  useEffect(() => {
    // If the active screen is the same as the current route, then we don't
    // need to do anything.
    if (activeScreen && activeScreen === (currentRoute === null || currentRoute === void 0 ? void 0 : currentRoute.name)) {
      return;
    }

    // If the active screen is different from the current route, then we need
    // to navigate to the active screen.
    if (activeScreen) {
      navigation.dispatch(StackActions.replace(activeScreen));
      return;
    }

    // Nothing to do here, we are done with onboarding.
    DeviceEventEmitter.emit(EventTypes.DID_COMPLETE_ONBOARDING);
  }, [activeScreen, currentRoute, onboardingState, navigation]);
  const screens = useMemo(() => getOnboardingScreens(t, ScreenOptionsDictionary, {
    SplashScreen,
    Preface,
    UpdateAvailableScreen,
    Terms,
    NameWallet,
    Biometry,
    PushNotifications,
    AttemptLockout,
    OnboardingScreen,
    CreatePINScreen,
    EnterPINScreen
  }), [SplashScreen, CreatePINScreen, EnterPINScreen, OnboardingScreen, Preface, Terms, Biometry, t, ScreenOptionsDictionary, UpdateAvailableScreen]);
  return /*#__PURE__*/React.createElement(Stack.Navigator, {
    initialRouteName: activeScreen,
    screenOptions: {
      ...defaultStackOptions
    }
  }, screens.map(item => {
    return /*#__PURE__*/React.createElement(Stack.Screen, _extends({
      key: item.name
    }, item));
  }));
};
export default OnboardingStack;
//# sourceMappingURL=OnboardingStack.js.map