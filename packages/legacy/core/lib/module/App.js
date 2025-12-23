import AgentProvider from '@credo-ts/react-hooks';
import * as React from 'react';
import { useEffect, useMemo } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import { animatedComponents } from './animated-components';
import ErrorModal from './components/modals/ErrorModal';
import NetInfo from './components/network/NetInfo';
import toastConfig from './components/toast/ToastConfig';
import { credentialOfferTourSteps } from './components/tour/CredentialOfferTourSteps';
import { credentialsTourSteps } from './components/tour/CredentialsTourSteps';
import { homeTourSteps } from './components/tour/HomeTourSteps';
import { proofRequestTourSteps } from './components/tour/ProofRequestTourSteps';
import { ContainerProvider } from './container-api';
import { AnimatedComponentsProvider } from './contexts/animated-components';
import { AuthProvider } from './contexts/auth';
import { NetworkProvider } from './contexts/network';
import { StoreProvider } from './contexts/store';
import { ThemeProvider } from './contexts/theme';
import { TourProvider } from './contexts/tour/tour-provider';
import { initLanguages, initStoredLanguage, translationResources } from './localization';
import RootStack from './navigators/RootStack';
import { theme } from './theme';
const App = system => {
  initLanguages(translationResources);
  const AppComponent = () => {
    useMemo(() => {
      initStoredLanguage().then();
    }, []);
    useEffect(() => {
      // Hide the native splash / loading screen so that our
      // RN version can be displayed.
      SplashScreen.hide();
    }, []);
    return /*#__PURE__*/React.createElement(ContainerProvider, {
      value: system
    }, /*#__PURE__*/React.createElement(StoreProvider, null, /*#__PURE__*/React.createElement(AgentProvider, {
      agent: undefined
    }, /*#__PURE__*/React.createElement(ThemeProvider, {
      value: theme
    }, /*#__PURE__*/React.createElement(AnimatedComponentsProvider, {
      value: animatedComponents
    }, /*#__PURE__*/React.createElement(AuthProvider, null, /*#__PURE__*/React.createElement(NetworkProvider, null, /*#__PURE__*/React.createElement(StatusBar, {
      hidden: false,
      barStyle: "light-content",
      backgroundColor: theme.ColorPallet.brand.primary,
      translucent: false
    }), /*#__PURE__*/React.createElement(NetInfo, null), /*#__PURE__*/React.createElement(ErrorModal, null), /*#__PURE__*/React.createElement(TourProvider, {
      homeTourSteps: homeTourSteps,
      credentialsTourSteps: credentialsTourSteps,
      credentialOfferTourSteps: credentialOfferTourSteps,
      proofRequestTourSteps: proofRequestTourSteps,
      overlayColor: 'gray',
      overlayOpacity: 0.7
    }, /*#__PURE__*/React.createElement(RootStack, null)), /*#__PURE__*/React.createElement(Toast, {
      topOffset: 15,
      config: toastConfig
    }))))))));
  };
  return AppComponent;
};
export default App;
//# sourceMappingURL=App.js.map