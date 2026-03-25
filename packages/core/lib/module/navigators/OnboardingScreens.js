import { TransitionPresets } from '@react-navigation/stack';
import { Screens } from '../types/navigators';
export const getOnboardingScreens = (t, ScreenOptionsDictionary, components) => [{
  name: Screens.Splash,
  component: components.SplashScreen,
  options: {
    ...TransitionPresets.ModalFadeTransition,
    title: t('Screens.Splash'),
    ...ScreenOptionsDictionary[Screens.Splash]
  }
}, {
  name: Screens.Preface,
  component: components.Preface,
  options: {
    ...TransitionPresets.SlideFromRightIOS,
    title: t('Screens.Preface'),
    ...ScreenOptionsDictionary[Screens.Preface]
  }
}, {
  name: Screens.UpdateAvailable,
  component: components.UpdateAvailableScreen,
  options: {
    ...ScreenOptionsDictionary[Screens.UpdateAvailable],
    ...TransitionPresets.SlideFromRightIOS,
    title: t('Screens.UpdateAvailable')
  }
}, {
  name: Screens.Onboarding,
  component: components.OnboardingScreen,
  options: () => ({
    ...TransitionPresets.SlideFromRightIOS,
    title: t('Screens.Onboarding'),
    headerLeft: () => false,
    ...ScreenOptionsDictionary[Screens.Onboarding]
  })
}, {
  name: Screens.Terms,
  options: () => ({
    ...TransitionPresets.SlideFromRightIOS,
    title: t('Screens.Terms'),
    headerLeft: () => false,
    ...ScreenOptionsDictionary[Screens.Terms]
  }),
  component: components.Terms
}, {
  name: Screens.CreatePIN,
  component: components.CreatePINScreen,
  initialParams: {},
  options: () => ({
    ...TransitionPresets.SlideFromRightIOS,
    title: t('Screens.CreatePIN'),
    headerLeft: () => false,
    ...ScreenOptionsDictionary[Screens.CreatePIN]
  })
}, {
  name: Screens.NameWallet,
  options: () => ({
    title: t('Screens.NameWallet'),
    headerLeft: () => false,
    ...ScreenOptionsDictionary[Screens.NameWallet]
  }),
  component: components.NameWallet
}, {
  name: Screens.Biometry,
  options: () => ({
    ...TransitionPresets.SlideFromRightIOS,
    title: t('Screens.Biometry'),
    headerLeft: () => false,
    ...ScreenOptionsDictionary[Screens.Biometry]
  }),
  component: components.Biometry
}, {
  name: Screens.PushNotifications,
  component: components.PushNotifications,
  options: () => ({
    ...TransitionPresets.SlideFromRightIOS,
    title: t('Screens.PushNotifications'),
    headerLeft: () => false,
    ...ScreenOptionsDictionary[Screens.PushNotifications]
  })
}, {
  name: Screens.EnterPIN,
  component: components.EnterPINScreen,
  options: () => ({
    title: t('Screens.EnterPIN'),
    headerShown: true,
    headerLeft: () => false,
    rightLeft: () => false,
    ...ScreenOptionsDictionary[Screens.EnterPIN]
  })
}, {
  name: Screens.AttemptLockout,
  component: components.AttemptLockout,
  options: () => ({
    headerShown: true,
    headerLeft: () => null,
    title: t('Screens.AttemptLockout'),
    ...ScreenOptionsDictionary[Screens.AttemptLockout]
  })
}];
//# sourceMappingURL=OnboardingScreens.js.map