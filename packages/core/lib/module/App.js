import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import { useNavigationContainerRef } from '@react-navigation/native';
import { isTablet } from 'react-native-device-info';
import Orientation from 'react-native-orientation-locker';
import { animatedComponents } from './animated-components';
import ErrorModal from './components/modals/ErrorModal';
import toastConfig from './components/toast/ToastConfig';
import { tours } from './constants';
import { ContainerProvider } from './container-api';
import { AnimatedComponentsProvider } from './contexts/animated-components';
import { AuthProvider } from './contexts/auth';
import NavContainer from './contexts/navigation';
import { NetworkProvider } from './contexts/network';
import { StoreProvider } from './contexts/store';
import { ThemeProvider } from './contexts/theme';
import { TourProvider } from './contexts/tour/tour-provider';
import { initStoredLanguage } from './localization';
import RootStack from './navigators/RootStack';
import { bifoldTheme, themes } from './theme';
import ErrorBoundaryWrapper from './components/misc/ErrorBoundary';
import { bifoldLoggerInstance } from './services/bifoldLogger';
import { KeyboardProvider } from 'react-native-keyboard-controller';
const createApp = container => {
  const AppComponent = () => {
    const navigationRef = useNavigationContainerRef();
    useEffect(() => {
      initStoredLanguage().then();
    }, []);
    useEffect(() => {
      // Hide the native splash / loading screen so that our
      // RN version can be displayed.
      SplashScreen.hide();
    }, []);
    if (!isTablet()) {
      Orientation.lockToPortrait();
    }
    return /*#__PURE__*/React.createElement(ErrorBoundaryWrapper, {
      logger: bifoldLoggerInstance
    }, /*#__PURE__*/React.createElement(ContainerProvider, {
      value: container
    }, /*#__PURE__*/React.createElement(StoreProvider, null, /*#__PURE__*/React.createElement(ThemeProvider, {
      themes: themes,
      defaultThemeName: bifoldTheme.themeName
    }, /*#__PURE__*/React.createElement(NavContainer, {
      navigationRef: navigationRef
    }, /*#__PURE__*/React.createElement(AnimatedComponentsProvider, {
      value: animatedComponents
    }, /*#__PURE__*/React.createElement(AuthProvider, null, /*#__PURE__*/React.createElement(NetworkProvider, null, /*#__PURE__*/React.createElement(StatusBar, {
      hidden: false,
      barStyle: "light-content",
      backgroundColor: bifoldTheme.ColorPalette.brand.primary,
      translucent: false
    }), /*#__PURE__*/React.createElement(ErrorModal, null), /*#__PURE__*/React.createElement(TourProvider, {
      tours: tours,
      overlayColor: 'gray',
      overlayOpacity: 0.7
    }, /*#__PURE__*/React.createElement(KeyboardProvider, {
      statusBarTranslucent: true,
      navigationBarTranslucent: true
    }, /*#__PURE__*/React.createElement(RootStack, null))), /*#__PURE__*/React.createElement(Toast, {
      topOffset: 15,
      config: toastConfig
    })))))))));
  };
  return AppComponent;
};
export default createApp;
//# sourceMappingURL=App.js.map