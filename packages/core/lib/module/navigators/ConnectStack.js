import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/theme';
import RenameWallet from '../screens/RenameWallet';
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
  const [scan, ScreenOptionsDictionary] = useServices([TOKENS.SCREEN_SCAN, TOKENS.OBJECT_SCREEN_CONFIG]);
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
      title: t('Screens.Scan'),
      headerBackTestID: testIdWithKey('Back'),
      headerShown: false,
      ...ScreenOptionsDictionary[Screens.Scan]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.PasteUrl,
    component: PasteUrl,
    options: () => ({
      title: t('PasteUrl.PasteUrl'),
      headerBackTestID: testIdWithKey('Back'),
      ...ScreenOptionsDictionary[Screens.PasteUrl]
    })
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ScanHelp,
    component: ScanHelp,
    options: {
      title: t('Screens.ScanHelp'),
      ...ScreenOptionsDictionary[Screens.ScanHelp]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.RenameWallet,
    component: RenameWallet,
    options: {
      title: t('Screens.NameWallet'),
      headerBackTestID: testIdWithKey('Back'),
      ...ScreenOptionsDictionary[Screens.RenameWallet]
    }
  }));
};
export default ConnectStack;
//# sourceMappingURL=ConnectStack.js.map