import React from 'react';
import { useTranslation } from 'react-i18next';
import HeaderTitle from '../components/texts/HeaderTitle';
import { OnboardingTheme } from '../theme';
import { Screens } from '../types/navigators';
import { testIdWithKey } from '../utils/testable';
import { TOKENS, useServices } from '../container-api';
export const DefaultScreenOptionsDictionary = {
  [Screens.Preface]: {
    headerTintColor: OnboardingTheme.headerTintColor,
    headerLeft: () => false
  },
  [Screens.Splash]: {
    headerShown: false
  },
  [Screens.Onboarding]: {
    headerTintColor: OnboardingTheme.headerTintColor,
    gestureEnabled: false,
    headerLeft: () => false
  },
  [Screens.Terms]: {
    headerTintColor: OnboardingTheme.headerTintColor,
    headerLeft: () => false
  },
  [Screens.CreatePIN]: {
    headerLeft: () => false
  },
  [Screens.NameWallet]: {
    headerTintColor: OnboardingTheme.headerTintColor,
    headerLeft: () => false
  },
  [Screens.UseBiometry]: {
    headerTintColor: OnboardingTheme.headerTintColor,
    headerLeft: () => false
  },
  [Screens.Developer]: {
    headerTintColor: OnboardingTheme.headerTintColor,
    headerBackTestID: testIdWithKey('Back')
  },
  [Screens.UsePushNotifications]: {
    headerTintColor: OnboardingTheme.headerTintColor,
    headerLeft: () => false
  }
};
export function useDefaultStackOptions({
  ColorPallet
}) {
  const {
    t
  } = useTranslation();
  const [{
    globalScreenOptions
  }] = useServices([TOKENS.CONFIG]);
  return globalScreenOptions ?? {
    headerTintColor: ColorPallet.brand.headerIcon,
    headerShown: true,
    headerBackTitleVisible: false,
    headerTitleContainerStyle: {
      flexShrink: 1,
      maxWidth: '68%',
      width: '100%'
    },
    headerStyle: {
      elevation: 0,
      shadowOffset: {
        width: 0,
        height: 6
      },
      shadowRadius: 6,
      shadowColor: ColorPallet.grayscale.black,
      shadowOpacity: 0.15,
      borderBottomWidth: 0
    },
    headerTitleAlign: 'center',
    headerTitle: props => /*#__PURE__*/React.createElement(HeaderTitle, props),
    headerBackAccessibilityLabel: t('Global.Back')
  };
}
//# sourceMappingURL=defaultStackOptions.js.map