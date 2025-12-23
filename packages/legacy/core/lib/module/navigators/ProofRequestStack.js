import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import HeaderButton, { ButtonLocation } from '../components/buttons/HeaderButton';
import HeaderRightHome from '../components/buttons/HeaderHome';
import { useTheme } from '../contexts/theme';
import ListProofRequests from '../screens/ListProofRequests';
import MobileVerifierLoading from '../screens/MobileVerifierLoading';
import ProofChangeCredential from '../screens/ProofChangeCredential';
import ProofRequestDetails from '../screens/ProofRequestDetails';
import ProofRequestUsageHistory from '../screens/ProofRequestUsageHistory';
import ProofRequesting from '../screens/ProofRequesting';
import { Screens } from '../types/navigators';
import { testIdWithKey } from '../utils/testable';
import { useDefaultStackOptions } from './defaultStackOptions';
import { TOKENS, useServices } from '../container-api';
const ProofRequestStack = () => {
  const Stack = createStackNavigator();
  const theme = useTheme();
  const {
    t
  } = useTranslation();
  const defaultStackOptions = useDefaultStackOptions(theme);
  const [ProofDetails] = useServices([TOKENS.SCREEN_PROOF_DETAILS]);
  return /*#__PURE__*/React.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ProofRequests,
    component: ListProofRequests,
    options: {
      title: t('Screens.ChooseProofRequest')
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ProofRequestDetails,
    component: ProofRequestDetails,
    options: () => ({
      title: ''
    })
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.MobileVerifierLoading,
    component: MobileVerifierLoading,
    options: {
      ...defaultStackOptions
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ProofChangeCredential,
    component: ProofChangeCredential,
    options: {
      title: t('Screens.ProofChangeCredential')
    }
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ProofRequesting,
    component: ProofRequesting,
    options: ({
      navigation
    }) => ({
      title: t('ProofRequest.RequestForProof'),
      headerLeft: () => /*#__PURE__*/React.createElement(HeaderButton, {
        buttonLocation: ButtonLocation.Left,
        accessibilityLabel: t('Global.Back'),
        testID: testIdWithKey('BackButton'),
        onPress: () => navigation.navigate(Screens.ProofRequests, {}),
        icon: "arrow-left"
      })
    })
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ProofDetails,
    component: ProofDetails,
    options: ({
      navigation,
      route
    }) => ({
      title: '',
      headerLeft: () => /*#__PURE__*/React.createElement(HeaderButton, {
        buttonLocation: ButtonLocation.Left,
        accessibilityLabel: t('Global.Back'),
        testID: testIdWithKey('BackButton'),
        onPress: () => {
          if (route.params.isHistory) {
            navigation.goBack();
          } else {
            navigation.navigate(Screens.ProofRequests, {});
          }
        },
        icon: "arrow-left"
      }),
      headerRight: () => /*#__PURE__*/React.createElement(HeaderRightHome, null)
    })
  }), /*#__PURE__*/React.createElement(Stack.Screen, {
    name: Screens.ProofRequestUsageHistory,
    component: ProofRequestUsageHistory,
    options: () => ({
      title: t('Screens.ProofRequestUsageHistory'),
      headerRight: () => /*#__PURE__*/React.createElement(HeaderRightHome, null)
    })
  }));
};
export default ProofRequestStack;
//# sourceMappingURL=ProofRequestStack.js.map