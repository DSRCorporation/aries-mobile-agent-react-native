"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@credo-ts/core");
var _pool = require("@credo-ts/indy-vdr/build/pool");
var _reactHooks = require("@credo-ts/react-hooks");
var _reactNative = require("@credo-ts/react-native");
var _indyVdrShared = require("@hyperledger/indy-vdr-shared");
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative2 = require("react-native");
var _reactNativeConfig = require("react-native-config");
var _reactNativeFs = require("react-native-fs");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _constants = require("../constants");
var _containerApi = require("../container-api");
var _animatedComponents = require("../contexts/animated-components");
var _auth = require("../contexts/auth");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _error = require("../types/error");
var _navigators = require("../types/navigators");
var _agent = require("../utils/agent");
var _migration = require("../utils/migration");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const OnboardingVersion = 1;
const onboardingComplete = state => {
  return state.onboardingVersion !== 0 && state.didCompleteOnboarding || state.onboardingVersion === 0 && state.didConsiderBiometry;
};
const resumeOnboardingAt = (state, params) => {
  const termsVer = params.termsVersion ?? true;
  if ((state.didSeePreface || !params.showPreface) && state.didCompleteTutorial && state.didAgreeToTerms === termsVer && state.didCreatePIN && (state.didNameWallet || !params.enableWalletNaming) && !state.didConsiderBiometry) {
    return _navigators.Screens.UseBiometry;
  }
  if ((state.didSeePreface || !params.showPreface) && state.didCompleteTutorial && state.didAgreeToTerms === termsVer && state.didCreatePIN && params.enableWalletNaming && !state.didNameWallet) {
    return _navigators.Screens.NameWallet;
  }
  if ((state.didSeePreface || !params.showPreface) && state.didCompleteTutorial && state.didAgreeToTerms === termsVer && !state.didCreatePIN) {
    return _navigators.Screens.CreatePIN;
  }
  if ((state.didSeePreface || !params.showPreface) && state.didCompleteTutorial && state.didAgreeToTerms !== termsVer) {
    return _navigators.Screens.Terms;
  }
  if (state.didSeePreface || !params.showPreface) {
    return _navigators.Screens.Onboarding;
  }
  return _navigators.Screens.Preface;
};

/**
 * To customize this splash screen set the background color of the
 * iOS and Android launch screen to match the background color of
 * of this view.
 */
const Splash = () => {
  const {
    agent,
    setAgent
  } = (0, _reactHooks.useAgent)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [store, dispatch] = (0, _store2.useStore)();
  const navigation = (0, _native.useNavigation)();
  const {
    walletSecret
  } = (0, _auth.useAuth)();
  const {
    ColorPallet
  } = (0, _theme.useTheme)();
  const {
    LoadingIndicator
  } = (0, _animatedComponents.useAnimatedComponents)();
  const [mounted, setMounted] = (0, _react.useState)(false);
  const [cacheSchemas, cacheCredDefs, {
    version: TermsVersion
  }, logger, indyLedgers, {
    showPreface,
    enablePushNotifications
  }, ocaBundleResolver, historyEnabled] = (0, _containerApi.useServices)([_containerApi.TOKENS.CACHE_SCHEMAS, _containerApi.TOKENS.CACHE_CRED_DEFS, _containerApi.TOKENS.SCREEN_TERMS, _containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.UTIL_LEDGERS, _containerApi.TOKENS.CONFIG, _containerApi.TOKENS.UTIL_OCA_RESOLVER, _containerApi.TOKENS.HISTORY_ENABLED]);
  const styles = _reactNative2.StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPallet.brand.primaryBackground
    }
  });

  // navigation calls that occur before the screen is fully mounted will fail
  // this useeffect prevents that race condition
  (0, _react.useEffect)(() => {
    setMounted(true);
  }, []);
  (0, _react.useEffect)(() => {
    if (!mounted || store.authentication.didAuthenticate) {
      return;
    }
    const initOnboarding = async () => {
      try {
        // load authentication attempts from storage
        if (!store.stateLoaded) {
          return;
        }
        if (store.onboarding.onboardingVersion !== OnboardingVersion) {
          dispatch({
            type: _store.DispatchAction.ONBOARDING_VERSION,
            payload: [OnboardingVersion]
          });
        }
        if (onboardingComplete(store.onboarding)) {
          if (store.onboarding.onboardingVersion !== OnboardingVersion) {
            dispatch({
              type: _store.DispatchAction.ONBOARDING_VERSION,
              payload: [OnboardingVersion]
            });
          }
          // if they previously completed onboarding before wallet naming was enabled, mark complete
          if (!store.onboarding.didNameWallet) {
            dispatch({
              type: _store.DispatchAction.DID_NAME_WALLET,
              payload: [true]
            });
          }

          // if they previously completed onboarding before preface was enabled, mark seen
          if (!store.onboarding.didSeePreface) {
            dispatch({
              type: _store.DispatchAction.DID_SEE_PREFACE
            });
          }

          // add post authentication screens
          const postAuthScreens = [];
          if (store.onboarding.didAgreeToTerms !== TermsVersion) {
            postAuthScreens.push(_navigators.Screens.Terms);
          }
          if (!store.onboarding.didConsiderPushNotifications && enablePushNotifications) {
            postAuthScreens.push(_navigators.Screens.UsePushNotifications);
          }
          dispatch({
            type: _store.DispatchAction.SET_POST_AUTH_SCREENS,
            payload: [postAuthScreens]
          });
          if (!store.loginAttempt.lockoutDate) {
            navigation.dispatch(_native.CommonActions.reset({
              index: 0,
              routes: [{
                name: _navigators.Screens.EnterPIN
              }]
            }));
          } else {
            // return to lockout screen if lockout date is set
            navigation.dispatch(_native.CommonActions.reset({
              index: 0,
              routes: [{
                name: _navigators.Screens.AttemptLockout
              }]
            }));
          }
          return;
        } else {
          // If onboarding was interrupted we need to pickup from where we left off.
          navigation.dispatch(_native.CommonActions.reset({
            index: 0,
            routes: [{
              name: resumeOnboardingAt(store.onboarding, {
                enableWalletNaming: store.preferences.enableWalletNaming,
                showPreface,
                termsVersion: TermsVersion
              })
            }]
          }));
        }
      } catch (err) {
        const error = new _error.BifoldError(t('Error.Title1044'), t('Error.Message1044'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1044);
        _reactNative2.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
      }
    };
    initOnboarding();
  }, [mounted, store.authentication.didAuthenticate, store.stateLoaded]);
  (0, _react.useEffect)(() => {
    const initAgent = async () => {
      try {
        var _checkForUpdates, _ref;
        if (!mounted || !store.authentication.didAuthenticate || !store.onboarding.didConsiderBiometry || !(walletSecret !== null && walletSecret !== void 0 && walletSecret.id) || !walletSecret.key) {
          return;
        }
        await ((_checkForUpdates = (_ref = ocaBundleResolver).checkForUpdates) === null || _checkForUpdates === void 0 ? void 0 : _checkForUpdates.call(_ref));
        if (agent) {
          logger.info('Agent already initialized, restarting...');
          try {
            await agent.wallet.open({
              id: walletSecret.id,
              key: walletSecret.key
            });
            logger.info('Opened agent wallet');
          } catch (error) {
            logger.error('Error opening existing wallet', error);
            throw new _error.BifoldError('Wallet Service', 'There was a problem unlocking the wallet.', error.message, 1047);
          }
          await agent.mediationRecipient.initiateMessagePickup();
          navigation.dispatch(_native.CommonActions.reset({
            index: 0,
            routes: [{
              name: _navigators.Stacks.TabStack
            }]
          }));
          return;
        }
        logger.info('No agent initialized, creating a new one');
        const newAgent = new _core.Agent({
          config: {
            label: store.preferences.walletName || 'Aries Bifold',
            walletConfig: {
              id: walletSecret.id,
              key: walletSecret.key
            },
            logger,
            autoUpdateStorageOnStartup: true
          },
          dependencies: _reactNative.agentDependencies,
          modules: (0, _agent.getAgentModules)({
            indyNetworks: indyLedgers,
            mediatorInvitationUrl: _reactNativeConfig.Config.MEDIATOR_URL,
            txnCache: {
              capacity: 1000,
              expiryOffsetMs: 1000 * 60 * 60 * 24 * 7,
              path: _reactNativeFs.CachesDirectoryPath + '/txn-cache'
            }
          })
        });
        const wsTransport = new _core.WsOutboundTransport();
        const httpTransport = new _core.HttpOutboundTransport();
        newAgent.registerOutboundTransport(wsTransport);
        newAgent.registerOutboundTransport(httpTransport);

        // If we haven't migrated to Aries Askar yet, we need to do this before we initialize the agent.
        if (!(0, _migration.didMigrateToAskar)(store.migration)) {
          newAgent.config.logger.debug('Agent not updated to Aries Askar, updating...');
          await (0, _migration.migrateToAskar)(walletSecret.id, walletSecret.key, newAgent);
          newAgent.config.logger.debug('Successfully finished updating agent to Aries Askar');
          // Store that we migrated to askar.
          dispatch({
            type: _store.DispatchAction.DID_MIGRATE_TO_ASKAR
          });
        }
        await newAgent.initialize();
        await (0, _agent.createLinkSecretIfRequired)(newAgent);
        const poolService = newAgent.dependencyManager.resolve(_pool.IndyVdrPoolService);
        cacheCredDefs.forEach(async ({
          did,
          id
        }) => {
          const pool = await poolService.getPoolForDid(newAgent.context, did);
          const credDefRequest = new _indyVdrShared.GetCredentialDefinitionRequest({
            credentialDefinitionId: id
          });
          await pool.pool.submitRequest(credDefRequest);
        });
        cacheSchemas.forEach(async ({
          did,
          id
        }) => {
          const pool = await poolService.getPoolForDid(newAgent.context, did);
          const schemaRequest = new _indyVdrShared.GetSchemaRequest({
            schemaId: id
          });
          await pool.pool.submitRequest(schemaRequest);
        });
        setAgent(newAgent);
        navigation.dispatch(_native.CommonActions.reset({
          index: 0,
          routes: [{
            name: _navigators.Stacks.TabStack
          }]
        }));
      } catch (err) {
        const error = new _error.BifoldError(t('Error.Title1045'), t('Error.Message1045'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1045);
        _reactNative2.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
      }
    };
    initAgent();
  }, [mounted, store.authentication.didAuthenticate, store.onboarding.didConsiderBiometry, walletSecret]);
  (0, _react.useEffect)(() => {
    if (!mounted || !historyEnabled) {
      return;
    }
    dispatch({
      type: _store.DispatchAction.HISTORY_CAPABILITY,
      payload: [true]
    });
  }, [mounted, historyEnabled]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(LoadingIndicator, null));
};
var _default = exports.default = Splash;
//# sourceMappingURL=Splash.js.map