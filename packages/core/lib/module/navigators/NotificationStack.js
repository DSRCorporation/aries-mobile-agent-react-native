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
  const [CredentialDetails, CredentialOffer, ProofRequest, ProofDetails, {
    customNotificationConfig: customNotification
  }, ScreenOptionsDictionary] = useServices([TOKENS.SCREEN_CREDENTIAL_DETAILS, TOKENS.SCREEN_CREDENTIAL_OFFER, TOKENS.SCREEN_PROOF_REQUEST, TOKENS.SCREEN_PROOF_DETAILS, TOKENS.NOTIFICATIONS, TOKENS.OBJECT_SCREEN_CONFIG]);
  return /*#__PURE__*/React.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.CredentialDetails,
    component: CredentialDetails,
    options: {
      title: t('Screens.CredentialDetails'),
      ...ScreenOptionsDictionary[Screens.CredentialDetails]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.CredentialOffer,
    component: CredentialOffer,
    options: {
      title: t('Screens.CredentialOffer'),
      ...ScreenOptionsDictionary[Screens.CredentialOffer]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ProofRequest,
    component: ProofRequest,
    options: {
      title: t('Screens.ProofRequest'),
      ...ScreenOptionsDictionary[Screens.ProofRequest]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ProofDetails,
    component: ProofDetails,
    options: {
      title: t('Screens.ProofDetails'),
      ...ScreenOptionsDictionary[Screens.ProofDetails]
    }
  }), customNotification && /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.CustomNotification,
    component: customNotification.component,
    options: {
      title: t(customNotification.pageTitle),
      ...ScreenOptionsDictionary[Screens.CustomNotification]
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