import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import HeaderRightHome from '../components/buttons/HeaderHome';
import { TOKENS, useServices } from '../container-api';
import { useTheme } from '../contexts/theme';
import { Screens } from '../types/navigators';
import { useDefaultStackOptions } from './defaultStackOptions';
const DeliveryStack = () => {
  const Stack = createStackNavigator();
  const {
    t
  } = useTranslation();
  const theme = useTheme();
  const defaultStackOptions = useDefaultStackOptions(theme);
  const [CredentialOffer, ProofRequest, Connection] = useServices([TOKENS.SCREEN_CREDENTIAL_OFFER, TOKENS.SCREEN_PROOF_REQUEST, TOKENS.SCREEN_CONNECTION]);
  return /*#__PURE__*/React.createElement(Stack.Navigator, {
    initialRouteName: Screens.Connection,
    screenOptions: {
      ...defaultStackOptions,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      headerShown: true,
      presentation: 'modal',
      headerLeft: () => null,
      headerRight: () => /*#__PURE__*/React.createElement(HeaderRightHome, null)
    }
  }, /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.Connection,
    component: Connection,
    options: {
      ...defaultStackOptions,
      headerShown: false
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ProofRequest,
    component: ProofRequest,
    options: {
      title: t('Screens.ProofRequest')
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.CredentialOffer,
    component: CredentialOffer,
    options: {
      title: t('Screens.CredentialOffer')
    }
  }));
};
export default DeliveryStack;
//# sourceMappingURL=DeliveryStack.js.map