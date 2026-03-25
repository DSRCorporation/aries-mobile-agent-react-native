import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import HeaderRightHome from '../components/buttons/HeaderHome';
import IconButton, { ButtonLocation } from '../components/buttons/IconButton';
import { useTheme } from '../contexts/theme';
import { Screens } from '../types/navigators';
import { testIdWithKey } from '../utils/testable';
import { useDefaultStackOptions } from './defaultStackOptions';
import OpenIDProofPresentation from '../modules/openid/screens/OpenIDProofPresentation';
import { TOKENS, useServices } from '../container-api';
import OpenIDCredentialOffer from '../modules/openid/screens/OpenIDCredentialOffer';
import OpenIDProofCredentialSelect from '../modules/openid/screens/OpenIDProofChangeCredential';
import OpenIDConnection from '../modules/openid/screens/OpenIDConnection';
const DeliveryStack = () => {
  const Stack = createStackNavigator();
  const {
    t
  } = useTranslation();
  const theme = useTheme();
  const defaultStackOptions = useDefaultStackOptions(theme);
  const [ScreenOptionsDictionary, Connection] = useServices([TOKENS.OBJECT_SCREEN_CONFIG, TOKENS.SCREEN_CONNECTION]);
  return /*#__PURE__*/React.createElement(Stack.Navigator, {
    initialRouteName: Screens.Connection,
    screenOptions: {
      ...defaultStackOptions,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      headerShown: true,
      presentation: 'modal',
      headerLeft: () => null,
      headerRight: () => /*#__PURE__*/React.createElement(HeaderRightHome, null),
      ...ScreenOptionsDictionary[Screens.Connection]
    }
  }, /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.OpenIDConnection,
    component: OpenIDConnection,
    options: {
      ...defaultStackOptions
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.Connection,
    component: Connection,
    options: {
      ...defaultStackOptions
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.OpenIDCredentialOffer,
    component: OpenIDCredentialOffer,
    options: {
      title: t('Screens.CredentialOffer'),
      ...ScreenOptionsDictionary[Screens.OpenIDCredentialOffer]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.OpenIDProofPresentation,
    component: OpenIDProofPresentation,
    options: {
      title: t('Screens.ProofRequest'),
      ...ScreenOptionsDictionary[Screens.OpenIDProofPresentation]
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.OpenIDProofCredentialSelect,
    component: OpenIDProofCredentialSelect,
    options: ({
      navigation
    }) => ({
      title: t('Screens.ChangeCard'),
      headerLeft: () => /*#__PURE__*/React.createElement(IconButton, {
        buttonLocation: ButtonLocation.Left,
        accessibilityLabel: t('Global.Back'),
        testID: testIdWithKey('BackButton'),
        onPress: () => navigation.goBack(),
        icon: "arrow-left"
      }),
      ...ScreenOptionsDictionary[Screens.OpenIDProofCredentialSelect]
    })
  }));
};
export default DeliveryStack;
//# sourceMappingURL=DeliveryStack.js.map