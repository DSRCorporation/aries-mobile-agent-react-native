import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import SettingsMenu from '../components/buttons/SettingsMenu';
import { useTheme } from '../contexts/theme';
import HistoryMenu from '../modules/history/ui/components/HistoryMenu';
import { Screens } from '../types/navigators';
import Home from '../screens/Home';
import { useDefaultStackOptions } from './defaultStackOptions';
import { TOKENS, useServices } from '../container-api';
const HomeStack = () => {
  const Stack = createStackNavigator();
  const theme = useTheme();
  const {
    t
  } = useTranslation();
  const defaultStackOptions = useDefaultStackOptions(theme);
  const [ScreenOptionsDictionary, historyEnabled] = useServices([TOKENS.OBJECT_SCREEN_CONFIG, TOKENS.HISTORY_ENABLED]);
  return /*#__PURE__*/React.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.Home,
    component: Home,
    options: () => ({
      title: t('Screens.Home'),
      headerRight: () => historyEnabled ? /*#__PURE__*/React.createElement(HistoryMenu, null) : null,
      headerLeft: () => /*#__PURE__*/React.createElement(SettingsMenu, null),
      ...ScreenOptionsDictionary[Screens.Home]
    })
  }));
};
export default HomeStack;
//# sourceMappingURL=HomeStack.js.map