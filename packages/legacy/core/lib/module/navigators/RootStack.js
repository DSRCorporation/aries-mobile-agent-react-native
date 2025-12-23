import { ProofState } from '@credo-ts/core';
import { useAgent, useProofByState } from '@credo-ts/react-hooks';
import { ProofMetadata } from '@hyperledger/aries-bifold-verifier';
import { useNavigation } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppState, DeviceEventEmitter } from 'react-native';
import HeaderButton, { ButtonLocation } from '../components/buttons/HeaderButton';
import { EventTypes, walletTimeout } from '../constants';
import { TOKENS, useServices } from '../container-api';
import { useAuth } from '../contexts/auth';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import HistoryStack from '../modules/history/navigation/HistoryStack';
import { BifoldError } from '../types/error';
import { Screens, Stacks, TabStacks } from '../types/navigators';
import { connectFromScanOrDeepLink } from '../utils/helpers';
import { testIdWithKey } from '../utils/testable';
import ConnectStack from './ConnectStack';
import ContactStack from './ContactStack';
import DeliveryStack from './DeliveryStack';
import NotificationStack from './NotificationStack';
import ProofRequestStack from './ProofRequestStack';
import SettingStack from './SettingStack';
import { useDefaultStackOptions } from './defaultStackOptions';
const RootStack = () => {
  const [state, dispatch] = useStore();
  const {
    removeSavedWalletSecret
  } = useAuth();
  const {
    agent
  } = useAgent();
  const appState = useRef(AppState.currentState);
  const [backgroundTime, setBackgroundTime] = useState(undefined);
  const [prevAppStateVisible, setPrevAppStateVisible] = useState('');
  const [appStateVisible, setAppStateVisible] = useState('');
  const [inBackground, setInBackground] = useState(false);
  const {
    t
  } = useTranslation();
  const navigation = useNavigation();
  const theme = useTheme();
  const defaultStackOptions = useDefaultStackOptions(theme);
  const [Splash, TabStack, CredentialStack, OnboardingStack, {
    enableImplicitInvitations,
    enableReuseConnections
  }, logger, loadState, useDeeplinks, Chat] = useServices([TOKENS.SCREEN_SPLASH, TOKENS.STACK_TAB, TOKENS.STACK_CREDENTIAL, TOKENS.STACK_ONBOARDING, TOKENS.CONFIG, TOKENS.UTIL_LOGGER, TOKENS.LOAD_STATE, TOKENS.HOOK_USE_DEEPLINKS, TOKENS.SCREEN_CHAT]);
  useDeeplinks();

  // remove connection on mobile verifier proofs if proof is rejected regardless of if it has been opened
  const declinedProofs = useProofByState([ProofState.Declined, ProofState.Abandoned]);
  useEffect(() => {
    declinedProofs.forEach(proof => {
      var _proof$metadata;
      const meta = proof === null || proof === void 0 || (_proof$metadata = proof.metadata) === null || _proof$metadata === void 0 ? void 0 : _proof$metadata.get(ProofMetadata.customMetadata);
      if (meta !== null && meta !== void 0 && meta.delete_conn_after_seen) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        agent === null || agent === void 0 || agent.connections.deleteById((proof === null || proof === void 0 ? void 0 : proof.connectionId) ?? '').catch(() => {});
        proof === null || proof === void 0 || proof.metadata.set(ProofMetadata.customMetadata, {
          ...meta,
          delete_conn_after_seen: false
        });
      }
    });
  }, [declinedProofs, state.preferences.useDataRetention]);
  const lockoutUser = async () => {
    if (agent && state.authentication.didAuthenticate) {
      // make sure agent is shutdown so wallet isn't still open
      removeSavedWalletSecret();
      try {
        await agent.wallet.close();
        await agent.shutdown();
        logger.info('Closed agent wallet');
      } catch (error) {
        logger.error(`Error closing agent wallet, ${error}`);
      }
      dispatch({
        type: DispatchAction.DID_AUTHENTICATE,
        payload: [{
          didAuthenticate: false
        }]
      });
      dispatch({
        type: DispatchAction.LOCKOUT_UPDATED,
        payload: [{
          displayNotification: true
        }]
      });
    }
  };
  useEffect(() => {
    loadState(dispatch).then(() => {
      dispatch({
        type: DispatchAction.STATE_LOADED
      });
    }).catch(err => {
      const error = new BifoldError(t('Error.Title1044'), t('Error.Message1044'), err.message, 1001);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    });
  }, []);

  // handle deeplink events
  useEffect(() => {
    async function handleDeepLink(deepLink) {
      logger.info(`Handling deeplink: ${deepLink}`);
      // If it's just the general link with no params, set link inactive and do nothing
      if (deepLink.search(/oob=|c_i=|d_m=|url=/) < 0) {
        dispatch({
          type: DispatchAction.ACTIVE_DEEP_LINK,
          payload: [undefined]
        });
        return;
      }
      try {
        await connectFromScanOrDeepLink(deepLink, agent, logger, navigation, true,
        // isDeepLink
        enableImplicitInvitations, enableReuseConnections);
      } catch (err) {
        const error = new BifoldError(t('Error.Title1039'), t('Error.Message1039'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1039);
        DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
      }

      // set deeplink as inactive
      dispatch({
        type: DispatchAction.ACTIVE_DEEP_LINK,
        payload: [undefined]
      });
    }
    if (inBackground) {
      return;
    }
    if (agent !== null && agent !== void 0 && agent.isInitialized && state.deepLink && state.authentication.didAuthenticate) {
      handleDeepLink(state.deepLink);
    }
  }, [dispatch, agent, logger, navigation, enableImplicitInvitations, enableReuseConnections, t, inBackground, agent === null || agent === void 0 ? void 0 : agent.isInitialized, state.deepLink, state.authentication.didAuthenticate]);
  useEffect(() => {
    if (!agent) {
      return;
    }
    if (inBackground) {
      agent.mediationRecipient.stopMessagePickup().then(() => {
        logger.info('Stopped agent message pickup');
      }).catch(err => {
        logger.error(`Error stopping agent message pickup, ${err}`);
      });
      return;
    }
    if (!inBackground) {
      agent.mediationRecipient.initiateMessagePickup().then(() => {
        logger.info('Resuming agent message pickup');
      }).catch(err => {
        logger.error(`Error resuming agent message pickup, ${err}`);
      });
      return;
    }
  }, [agent, inBackground]);
  useEffect(() => {
    AppState.addEventListener('change', nextAppState => {
      if (appState.current === 'active' && ['inactive', 'background'].includes(nextAppState)) {
        if (nextAppState === 'inactive') {
          // on iOS this happens when any OS prompt is shown. We
          // don't want to lock the user out in this case or preform
          // background tasks.
          return;
        }

        //update time that app gets put in background
        setInBackground(true);
        setBackgroundTime(Date.now());
      }
      setPrevAppStateVisible(appState.current);
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });
  }, []);
  useEffect(() => {
    const lockoutCheck = async () => {
      //lock user out after 5 minutes
      if (!state.preferences.preventAutoLock && walletTimeout && backgroundTime && Date.now() - backgroundTime > walletTimeout) {
        await lockoutUser();
        return true;
      }
      return false;
    };
    if (appStateVisible === 'active' && ['inactive', 'background'].includes(prevAppStateVisible) && backgroundTime) {
      // prevents the user from being locked out during metro reloading
      setPrevAppStateVisible(appStateVisible);
      lockoutCheck().then(lockoutInProgress => {
        if (lockoutInProgress) {
          const unsubscribe = navigation.addListener('state', () => {
            setInBackground(false);
            unsubscribe();
          });
        } else {
          setInBackground(false);
        }
      });
    }
  }, [appStateVisible, prevAppStateVisible, backgroundTime]);

  // auth stack should now be in the OnboardingStack

  const mainStack = () => {
    const Stack = createStackNavigator();

    // This function is to make the fade in behavior of both iOS and Android consistent for the settings menu
    const forFade = ({
      current
    }) => ({
      cardStyle: {
        opacity: current.progress
      }
    });
    return /*#__PURE__*/React.createElement(Stack.Navigator, {
      initialRouteName: Screens.Splash,
      screenOptions: {
        ...defaultStackOptions,
        headerShown: false
      }
    }, /*#__PURE__*/React.createElement(Stack.Screen, {
      name: Screens.Splash,
      component: Splash
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: Stacks.TabStack,
      component: TabStack
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: Screens.Chat,
      component: Chat,
      options: ({
        navigation
      }) => ({
        headerShown: true,
        title: t('Screens.CredentialOffer'),
        headerLeft: () => /*#__PURE__*/React.createElement(HeaderButton, {
          buttonLocation: ButtonLocation.Left,
          accessibilityLabel: t('Global.Back'),
          testID: testIdWithKey('BackButton'),
          onPress: () => {
            navigation.navigate(TabStacks.HomeStack, {
              screen: Screens.Home
            });
          },
          icon: "arrow-left"
        })
      })
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: Stacks.ConnectStack,
      component: ConnectStack
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: Stacks.SettingStack,
      component: SettingStack,
      options: {
        cardStyleInterpolator: forFade
      }
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: Stacks.ContactStack,
      component: ContactStack
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: Stacks.CredentialStack,
      component: CredentialStack
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: TabStacks.CredentialStack,
      component: CredentialStack
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: Stacks.NotificationStack,
      component: NotificationStack
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: Stacks.ConnectionStack,
      component: DeliveryStack,
      options: {
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        presentation: 'modal'
      }
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: Stacks.ProofRequestsStack,
      component: ProofRequestStack
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: Stacks.HistoryStack,
      component: HistoryStack,
      options: {
        cardStyleInterpolator: forFade
      }
    }));
  };
  if ((state.onboarding.onboardingVersion !== 0 && state.onboarding.didCompleteOnboarding || state.onboarding.onboardingVersion === 0 && state.onboarding.didConsiderBiometry) && state.authentication.didAuthenticate && state.onboarding.postAuthScreens.length === 0) {
    return mainStack();
  }
  return /*#__PURE__*/React.createElement(OnboardingStack, null);
};
export default RootStack;
//# sourceMappingURL=RootStack.js.map