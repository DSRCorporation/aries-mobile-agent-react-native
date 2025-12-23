"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@credo-ts/core");
var _reactHooks = require("@credo-ts/react-hooks");
var _ariesBifoldVerifier = require("@hyperledger/aries-bifold-verifier");
var _native = require("@react-navigation/native");
var _stack = require("@react-navigation/stack");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _HeaderButton = _interopRequireWildcard(require("../components/buttons/HeaderButton"));
var _constants = require("../constants");
var _containerApi = require("../container-api");
var _auth = require("../contexts/auth");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _HistoryStack = _interopRequireDefault(require("../modules/history/navigation/HistoryStack"));
var _error = require("../types/error");
var _navigators = require("../types/navigators");
var _helpers = require("../utils/helpers");
var _testable = require("../utils/testable");
var _ConnectStack = _interopRequireDefault(require("./ConnectStack"));
var _ContactStack = _interopRequireDefault(require("./ContactStack"));
var _DeliveryStack = _interopRequireDefault(require("./DeliveryStack"));
var _NotificationStack = _interopRequireDefault(require("./NotificationStack"));
var _ProofRequestStack = _interopRequireDefault(require("./ProofRequestStack"));
var _SettingStack = _interopRequireDefault(require("./SettingStack"));
var _defaultStackOptions = require("./defaultStackOptions");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const RootStack = () => {
  const [state, dispatch] = (0, _store2.useStore)();
  const {
    removeSavedWalletSecret
  } = (0, _auth.useAuth)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const appState = (0, _react.useRef)(_reactNative.AppState.currentState);
  const [backgroundTime, setBackgroundTime] = (0, _react.useState)(undefined);
  const [prevAppStateVisible, setPrevAppStateVisible] = (0, _react.useState)('');
  const [appStateVisible, setAppStateVisible] = (0, _react.useState)('');
  const [inBackground, setInBackground] = (0, _react.useState)(false);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const navigation = (0, _native.useNavigation)();
  const theme = (0, _theme.useTheme)();
  const defaultStackOptions = (0, _defaultStackOptions.useDefaultStackOptions)(theme);
  const [Splash, TabStack, CredentialStack, OnboardingStack, {
    enableImplicitInvitations,
    enableReuseConnections
  }, logger, loadState, useDeeplinks, Chat] = (0, _containerApi.useServices)([_containerApi.TOKENS.SCREEN_SPLASH, _containerApi.TOKENS.STACK_TAB, _containerApi.TOKENS.STACK_CREDENTIAL, _containerApi.TOKENS.STACK_ONBOARDING, _containerApi.TOKENS.CONFIG, _containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.LOAD_STATE, _containerApi.TOKENS.HOOK_USE_DEEPLINKS, _containerApi.TOKENS.SCREEN_CHAT]);
  useDeeplinks();

  // remove connection on mobile verifier proofs if proof is rejected regardless of if it has been opened
  const declinedProofs = (0, _reactHooks.useProofByState)([_core.ProofState.Declined, _core.ProofState.Abandoned]);
  (0, _react.useEffect)(() => {
    declinedProofs.forEach(proof => {
      var _proof$metadata;
      const meta = proof === null || proof === void 0 || (_proof$metadata = proof.metadata) === null || _proof$metadata === void 0 ? void 0 : _proof$metadata.get(_ariesBifoldVerifier.ProofMetadata.customMetadata);
      if (meta !== null && meta !== void 0 && meta.delete_conn_after_seen) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        agent === null || agent === void 0 || agent.connections.deleteById((proof === null || proof === void 0 ? void 0 : proof.connectionId) ?? '').catch(() => {});
        proof === null || proof === void 0 || proof.metadata.set(_ariesBifoldVerifier.ProofMetadata.customMetadata, {
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
        type: _store.DispatchAction.DID_AUTHENTICATE,
        payload: [{
          didAuthenticate: false
        }]
      });
      dispatch({
        type: _store.DispatchAction.LOCKOUT_UPDATED,
        payload: [{
          displayNotification: true
        }]
      });
    }
  };
  (0, _react.useEffect)(() => {
    loadState(dispatch).then(() => {
      dispatch({
        type: _store.DispatchAction.STATE_LOADED
      });
    }).catch(err => {
      const error = new _error.BifoldError(t('Error.Title1044'), t('Error.Message1044'), err.message, 1001);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    });
  }, []);

  // handle deeplink events
  (0, _react.useEffect)(() => {
    async function handleDeepLink(deepLink) {
      logger.info(`Handling deeplink: ${deepLink}`);
      // If it's just the general link with no params, set link inactive and do nothing
      if (deepLink.search(/oob=|c_i=|d_m=|url=/) < 0) {
        dispatch({
          type: _store.DispatchAction.ACTIVE_DEEP_LINK,
          payload: [undefined]
        });
        return;
      }
      try {
        await (0, _helpers.connectFromScanOrDeepLink)(deepLink, agent, logger, navigation, true,
        // isDeepLink
        enableImplicitInvitations, enableReuseConnections);
      } catch (err) {
        const error = new _error.BifoldError(t('Error.Title1039'), t('Error.Message1039'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1039);
        _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
      }

      // set deeplink as inactive
      dispatch({
        type: _store.DispatchAction.ACTIVE_DEEP_LINK,
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
  (0, _react.useEffect)(() => {
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
  (0, _react.useEffect)(() => {
    _reactNative.AppState.addEventListener('change', nextAppState => {
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
  (0, _react.useEffect)(() => {
    const lockoutCheck = async () => {
      //lock user out after 5 minutes
      if (!state.preferences.preventAutoLock && _constants.walletTimeout && backgroundTime && Date.now() - backgroundTime > _constants.walletTimeout) {
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
    const Stack = (0, _stack.createStackNavigator)();

    // This function is to make the fade in behavior of both iOS and Android consistent for the settings menu
    const forFade = ({
      current
    }) => ({
      cardStyle: {
        opacity: current.progress
      }
    });
    return /*#__PURE__*/_react.default.createElement(Stack.Navigator, {
      initialRouteName: _navigators.Screens.Splash,
      screenOptions: {
        ...defaultStackOptions,
        headerShown: false
      }
    }, /*#__PURE__*/_react.default.createElement(Stack.Screen, {
      name: _navigators.Screens.Splash,
      component: Splash
    }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
      name: _navigators.Stacks.TabStack,
      component: TabStack
    }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
      name: _navigators.Screens.Chat,
      component: Chat,
      options: ({
        navigation
      }) => ({
        headerShown: true,
        title: t('Screens.CredentialOffer'),
        headerLeft: () => /*#__PURE__*/_react.default.createElement(_HeaderButton.default, {
          buttonLocation: _HeaderButton.ButtonLocation.Left,
          accessibilityLabel: t('Global.Back'),
          testID: (0, _testable.testIdWithKey)('BackButton'),
          onPress: () => {
            navigation.navigate(_navigators.TabStacks.HomeStack, {
              screen: _navigators.Screens.Home
            });
          },
          icon: "arrow-left"
        })
      })
    }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
      name: _navigators.Stacks.ConnectStack,
      component: _ConnectStack.default
    }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
      name: _navigators.Stacks.SettingStack,
      component: _SettingStack.default,
      options: {
        cardStyleInterpolator: forFade
      }
    }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
      name: _navigators.Stacks.ContactStack,
      component: _ContactStack.default
    }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
      name: _navigators.Stacks.CredentialStack,
      component: CredentialStack
    }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
      name: _navigators.TabStacks.CredentialStack,
      component: CredentialStack
    }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
      name: _navigators.Stacks.NotificationStack,
      component: _NotificationStack.default
    }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
      name: _navigators.Stacks.ConnectionStack,
      component: _DeliveryStack.default,
      options: {
        gestureEnabled: false,
        cardStyleInterpolator: _stack.CardStyleInterpolators.forVerticalIOS,
        presentation: 'modal'
      }
    }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
      name: _navigators.Stacks.ProofRequestsStack,
      component: _ProofRequestStack.default
    }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
      name: _navigators.Stacks.HistoryStack,
      component: _HistoryStack.default,
      options: {
        cardStyleInterpolator: forFade
      }
    }));
  };
  if ((state.onboarding.onboardingVersion !== 0 && state.onboarding.didCompleteOnboarding || state.onboarding.onboardingVersion === 0 && state.onboarding.didConsiderBiometry) && state.authentication.didAuthenticate && state.onboarding.postAuthScreens.length === 0) {
    return mainStack();
  }
  return /*#__PURE__*/_react.default.createElement(OnboardingStack, null);
};
var _default = exports.default = RootStack;
//# sourceMappingURL=RootStack.js.map