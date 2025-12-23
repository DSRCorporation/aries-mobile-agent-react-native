import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TOKENS, useServices } from '../container-api';
import { useTheme } from '../contexts/theme';
import { Screens } from '../types/navigators';
import { useDefaultStackOptions } from './defaultStackOptions';
const NotificationStack = () => {
  var _customNotification$a;
  const Stack = createStackNavigator();
  const theme = useTheme();
  const {
    t
  } = useTranslation();
  const defaultStackOptions = useDefaultStackOptions(theme);
  const [CredentialDetails, CredentialOffer, ProofRequest, {
    customNotificationConfig: customNotification
  }] = useServices([TOKENS.SCREEN_CREDENTIAL_DETAILS, TOKENS.SCREEN_CREDENTIAL_OFFER, TOKENS.SCREEN_PROOF_REQUEST, TOKENS.NOTIFICATIONS]);
  return /*#__PURE__*/React.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.CredentialDetails,
    component: CredentialDetails,
    options: {
      title: t('Screens.CredentialDetails')
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.CredentialOffer,
    component: CredentialOffer,
    options: {
      title: t('Screens.CredentialOffer')
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ProofRequest,
    component: ProofRequest,
    options: {
      title: t('Screens.ProofRequest')
    }
  }), customNotification && /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.CustomNotification,
    component: customNotification.component,
    options: {
      title: t(customNotification.pageTitle)
    }
  }), customNotification && ((_customNotification$a = customNotification.additionalStackItems) === null || _customNotification$a === void 0 ? void 0 : _customNotification$a.length) && customNotification.additionalStackItems.map((item, i) => /*#__PURE__*/React.createElement(Stack.Screen, {
    key: i + 1,
    name: item.name,
    component: item.component,
    options: item.stackOptions
  })));
};
export default NotificationStack;
//# sourceMappingURL=NotificationStack.js.map