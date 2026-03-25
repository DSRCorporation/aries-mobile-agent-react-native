"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOnboardingScreens = void 0;
var _stack = require("@react-navigation/stack");
var _navigators = require("../types/navigators");
const getOnboardingScreens = (t, ScreenOptionsDictionary, components) => [{
  name: _navigators.Screens.Splash,
  component: components.SplashScreen,
  options: {
    ..._stack.TransitionPresets.ModalFadeTransition,
    title: t('Screens.Splash'),
    ...ScreenOptionsDictionary[_navigators.Screens.Splash]
  }
}, {
  name: _navigators.Screens.Preface,
  component: components.Preface,
  options: {
    ..._stack.TransitionPresets.SlideFromRightIOS,
    title: t('Screens.Preface'),
    ...ScreenOptionsDictionary[_navigators.Screens.Preface]
  }
}, {
  name: _navigators.Screens.UpdateAvailable,
  component: components.UpdateAvailableScreen,
  options: {
    ...ScreenOptionsDictionary[_navigators.Screens.UpdateAvailable],
    ..._stack.TransitionPresets.SlideFromRightIOS,
    title: t('Screens.UpdateAvailable')
  }
}, {
  name: _navigators.Screens.Onboarding,
  component: components.OnboardingScreen,
  options: () => ({
    ..._stack.TransitionPresets.SlideFromRightIOS,
    title: t('Screens.Onboarding'),
    headerLeft: () => false,
    ...ScreenOptionsDictionary[_navigators.Screens.Onboarding]
  })
}, {
  name: _navigators.Screens.Terms,
  options: () => ({
    ..._stack.TransitionPresets.SlideFromRightIOS,
    title: t('Screens.Terms'),
    headerLeft: () => false,
    ...ScreenOptionsDictionary[_navigators.Screens.Terms]
  }),
  component: components.Terms
}, {
  name: _navigators.Screens.CreatePIN,
  component: components.CreatePINScreen,
  initialParams: {},
  options: () => ({
    ..._stack.TransitionPresets.SlideFromRightIOS,
    title: t('Screens.CreatePIN'),
    headerLeft: () => false,
    ...ScreenOptionsDictionary[_navigators.Screens.CreatePIN]
  })
}, {
  name: _navigators.Screens.NameWallet,
  options: () => ({
    title: t('Screens.NameWallet'),
    headerLeft: () => false,
    ...ScreenOptionsDictionary[_navigators.Screens.NameWallet]
  }),
  component: components.NameWallet
}, {
  name: _navigators.Screens.Biometry,
  options: () => ({
    ..._stack.TransitionPresets.SlideFromRightIOS,
    title: t('Screens.Biometry'),
    headerLeft: () => false,
    ...ScreenOptionsDictionary[_navigators.Screens.Biometry]
  }),
  component: components.Biometry
}, {
  name: _navigators.Screens.PushNotifications,
  component: components.PushNotifications,
  options: () => ({
    ..._stack.TransitionPresets.SlideFromRightIOS,
    title: t('Screens.PushNotifications'),
    headerLeft: () => false,
    ...ScreenOptionsDictionary[_navigators.Screens.PushNotifications]
  })
}, {
  name: _navigators.Screens.EnterPIN,
  component: components.EnterPINScreen,
  options: () => ({
    title: t('Screens.EnterPIN'),
    headerShown: true,
    headerLeft: () => false,
    rightLeft: () => false,
    ...ScreenOptionsDictionary[_navigators.Screens.EnterPIN]
  })
}, {
  name: _navigators.Screens.AttemptLockout,
  component: components.AttemptLockout,
  options: () => ({
    headerShown: true,
    headerLeft: () => null,
    title: t('Screens.AttemptLockout'),
    ...ScreenOptionsDictionary[_navigators.Screens.AttemptLockout]
  })
}];
exports.getOnboardingScreens = getOnboardingScreens;
//# sourceMappingURL=OnboardingScreens.js.map