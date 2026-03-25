function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/theme';
import HistorySettings from '../modules/history/ui/HistorySettings';
import DataRetention from '../screens/DataRetention';
import Language from '../screens/Language';
import RenameWallet from '../screens/RenameWallet';
import Onboarding from '../screens/Onboarding';
import { createCarouselStyle } from '../screens/OnboardingPages';
import PINChange from '../screens/PINChange';
import TogglePushNotifications from '../screens/TogglePushNotifications';
import Settings from '../screens/Settings';
import Tours from '../screens/Tours';
import AutoLock from '../screens/AutoLock';
import ConfigureMediator from '../screens/ConfigureMediator';
import PINChangeSuccessScreen from '../screens/PINChangeSuccess';
import { Screens } from '../types/navigators';
import { testIdWithKey } from '../utils/testable';
import { useDefaultStackOptions } from './defaultStackOptions';
import { TOKENS, useServices } from '../container-api';
const SettingStack = () => {
  const Stack = createStackNavigator();
  const theme = useTheme();
  const {
    t
  } = useTranslation();
  const [pages, {
    screen: terms
  }, ToggleBiometry, developer, ScreenOptionsDictionary] = useServices([TOKENS.SCREEN_ONBOARDING_PAGES, TOKENS.SCREEN_TERMS, TOKENS.SCREEN_TOGGLE_BIOMETRY, TOKENS.SCREEN_DEVELOPER, TOKENS.OBJECT_SCREEN_CONFIG]);
  const defaultStackOptions = useDefaultStackOptions(theme);
  const OnboardingTheme = theme.OnboardingTheme;
  const carousel = createCarouselStyle(OnboardingTheme);
  return /*#__PURE__*/React.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.Settings,
    component: Settings,
    options: {
      title: t('Screens.Settings'),
      headerBackTestID: testIdWithKey('Back'),
      ...ScreenOptionsDictionary[Screens.Settings]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.RenameWallet,
    component: RenameWallet,
    options: {
      title: t('Screens.NameWallet'),
      headerBackTestID: testIdWithKey('Back'),
      ...ScreenOptionsDictionary[Screens.RenameWallet]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.Language,
    component: Language,
    options: {
      title: t('Screens.Language'),
      headerBackTestID: testIdWithKey('Back'),
      ...ScreenOptionsDictionary[Screens.Language]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ConfigureMediator,
    component: ConfigureMediator,
    options: {
      title: 'Configure Mediator',
      headerBackTestID: testIdWithKey('Back'),
      ...ScreenOptionsDictionary[Screens.ConfigureMediator]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.AutoLock,
    component: AutoLock,
    options: {
      title: 'Auto lock Options',
      headerBackTestID: testIdWithKey('Back'),
      ...ScreenOptionsDictionary[Screens.AutoLock]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.DataRetention,
    component: DataRetention,
    options: {
      title: t('Screens.DataRetention'),
      headerBackTestID: testIdWithKey('Back'),
      ...ScreenOptionsDictionary[Screens.DataRetention]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.Tours,
    component: Tours,
    options: {
      title: t('Screens.Tours'),
      headerBackTestID: testIdWithKey('Back'),
      ...ScreenOptionsDictionary[Screens.Tours]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ToggleBiometry,
    component: ToggleBiometry,
    options: {
      title: t('Screens.Biometry'),
      headerBackTestID: testIdWithKey('Back'),
      ...ScreenOptionsDictionary[Screens.ToggleBiometry]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ChangePIN,
    component: PINChange,
    options: {
      title: t('Screens.ChangePIN'),
      headerBackTestID: testIdWithKey('Back'),
      ...ScreenOptionsDictionary[Screens.ChangePIN]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ChangePINSuccess,
    component: PINChangeSuccessScreen,
    options: {
      title: t('Screens.ConfirmPIN'),
      headerBackTestID: testIdWithKey('Back'),
      headerLeft: () => null,
      ...ScreenOptionsDictionary[Screens.ChangePINSuccess]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.TogglePushNotifications,
    component: TogglePushNotifications,
    options: {
      title: t('Screens.PushNotifications'),
      headerBackTestID: testIdWithKey('Back'),
      ...ScreenOptionsDictionary[Screens.TogglePushNotifications]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.Terms,
    component: terms,
    options: {
      title: t('Screens.Terms'),
      headerBackTestID: testIdWithKey('Back'),
      ...ScreenOptionsDictionary[Screens.Terms]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.Developer,
    component: developer,
    options: {
      title: t('Screens.Developer'),
      headerBackTestID: testIdWithKey('Back'),
      ...ScreenOptionsDictionary[Screens.Developer]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.Onboarding,
    options: {
      title: t('Screens.Onboarding')
    }
  }, props => /*#__PURE__*/React.createElement(Onboarding, _extends({}, props, {
    nextButtonText: t('Global.Next'),
    previousButtonText: t('Global.Back'),
    pages: pages(() => null, OnboardingTheme),
    style: carousel,
    disableSkip: true
  }))), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.HistorySettings,
    component: HistorySettings,
    options: {
      title: t('Screens.HistorySettings'),
      headerBackTestID: testIdWithKey('Back'),
      ...ScreenOptionsDictionary[Screens.HistorySettings]
    }
  }));
};
export default SettingStack;
//# sourceMappingURL=SettingStack.js.map