import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import SettingsMenu from '../components/buttons/SettingsMenu';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import HistoryMenu from '../modules/history/ui/components/HistoryMenu';
import { Screens } from '../types/navigators';
import Home from '../screens/Home';
import { useDefaultStackOptions } from './defaultStackOptions';
const HomeStack = () => {
  const Stack = createStackNavigator();
  const theme = useTheme();
  const {
    t
  } = useTranslation();
  const [store] = useStore();
  const defaultStackOptions = useDefaultStackOptions(theme);
  return /*#__PURE__*/React.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.Home,
    component: Home,
    options: () => ({
      title: t('Screens.Home'),
      headerRight: () => store.preferences.useHistoryCapability ? /*#__PURE__*/React.createElement(HistoryMenu, null) : null,
      headerLeft: () => /*#__PURE__*/React.createElement(SettingsMenu, null)
    })
  }));
};
export default HomeStack;
//# sourceMappingURL=HomeStack.js.map