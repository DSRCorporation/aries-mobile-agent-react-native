import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/theme';
import NameWallet from '../screens/NameWallet';
import PasteUrl from '../screens/PasteUrl';
import ScanHelp from '../screens/ScanHelp';
import { Screens } from '../types/navigators';
import { testIdWithKey } from '../utils/testable';
import { useDefaultStackOptions } from './defaultStackOptions';
import { TOKENS, useServices } from '../container-api';
const ConnectStack = () => {
  const Stack = createStackNavigator();
  const theme = useTheme();
  const defaultStackOptions = useDefaultStackOptions(theme);
  const [scan] = useServices([TOKENS.SCREEN_SCAN]);
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.Scan,
    component: scan,
    options: {
      headerBackTestID: testIdWithKey('Back'),
      headerShown: false
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.PasteUrl,
    component: PasteUrl,
    options: () => ({
      title: t('PasteUrl.PasteUrl'),
      headerBackTestID: testIdWithKey('Back')
    })
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ScanHelp,
    component: ScanHelp
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.NameWallet,
    component: NameWallet,
    options: {
      title: t('Screens.NameWallet'),
      headerBackTestID: testIdWithKey('Back')
    }
  }));
};
export default ConnectStack;
//# sourceMappingURL=ConnectStack.js.map