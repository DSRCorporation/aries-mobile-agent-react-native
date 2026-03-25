import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EventTypes } from '../constants';
import { TOKENS, useServices } from '../container-api';
import { useAnimatedComponents } from '../contexts/animated-components';
import { useTheme } from '../contexts/theme';
import { BifoldError } from '../types/error';
import { useAuth } from '../contexts/auth';
import { useStore } from '../contexts/store';
/**
 * This Splash screen is shown in two scenarios: initial load of the app,
 * and during agent initialization after login
 */
const Splash = ({
  initializeAgent
}) => {
  const {
    walletSecret
  } = useAuth();
  const {
    t
  } = useTranslation();
  const [store] = useStore();
  const {
    ColorPalette
  } = useTheme();
  const {
    LoadingIndicator
  } = useAnimatedComponents();
  const initializing = useRef(false);
  const [logger, ocaBundleResolver] = useServices([TOKENS.UTIL_LOGGER, TOKENS.UTIL_OCA_RESOLVER]);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPalette.brand.primaryBackground
    }
  });
  useEffect(() => {
    if (initializing.current || !store.authentication.didAuthenticate) {
      return;
    }
    if (!walletSecret) {
      throw new Error('Wallet secret is missing');
    }
    initializing.current = true;
    const initAgentAsyncEffect = async () => {
      try {
        var _checkForUpdates, _ref;
        await ((_checkForUpdates = (_ref = ocaBundleResolver).checkForUpdates) === null || _checkForUpdates === void 0 ? void 0 : _checkForUpdates.call(_ref));
        await initializeAgent(walletSecret);
      } catch (err) {
        const error = new BifoldError(t('Error.Title1045'), t('Error.Message1045'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1045);
        DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
        logger.error((err === null || err === void 0 ? void 0 : err.message) ?? err);
      }
    };
    initAgentAsyncEffect();
  }, [initializeAgent, ocaBundleResolver, logger, walletSecret, t, store.authentication.didAuthenticate]);
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(LoadingIndicator, null));
};
export default Splash;
//# sourceMappingURL=Splash.js.map