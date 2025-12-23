import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import SettingsMenu from '../components/buttons/SettingsMenu';
import { useTheme } from '../contexts/theme';
import { Screens } from '../types/navigators';
import { useDefaultStackOptions } from './defaultStackOptions';
import { TOKENS, useServices } from '../container-api';
const CredentialStack = () => {
  const Stack = createStackNavigator();
  const theme = useTheme();
  const {
    t
  } = useTranslation();
  const defaultStackOptions = useDefaultStackOptions(theme);
  const [ListCredentials, CredentialDetails, CredentialListHeaderRight] = useServices([TOKENS.SCREEN_CREDENTIAL_LIST, TOKENS.SCREEN_CREDENTIAL_DETAILS, TOKENS.COMPONENT_CRED_LIST_HEADER_RIGHT]);
  return /*#__PURE__*/React.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.Credentials,
    component: ListCredentials,
    options: () => ({
      title: t('Screens.Credentials'),
      headerRight: () => /*#__PURE__*/React.createElement(CredentialListHeaderRight, null),
      headerLeft: () => /*#__PURE__*/React.createElement(SettingsMenu, null)
    })
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.CredentialDetails,
    component: CredentialDetails,
    options: {
      title: t('Screens.CredentialDetails')
    }
  }));
};
export default CredentialStack;
//# sourceMappingURL=CredentialStack.js.map