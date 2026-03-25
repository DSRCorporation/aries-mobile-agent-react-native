"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSystem = exports.defaultHistoryEventsLogger = exports.defaultConfig = exports.SystemProvider = exports.SystemContext = exports.MainContainer = void 0;
var _legacy = require("@bifold/oca/build/legacy");
var _verifier = require("@bifold/verifier");
var _react = require("react");
var bundle = _interopRequireWildcard(require("./assets/oca-bundles.json"));
var _Button = _interopRequireDefault(require("./components/buttons/Button"));
var _ContactCredentialListItem = _interopRequireDefault(require("./components/listItems/ContactCredentialListItem"));
var _ContactListItem = _interopRequireDefault(require("./components/listItems/ContactListItem"));
var _ConnectionAlert = _interopRequireDefault(require("./components/misc/ConnectionAlert"));
var _PINHeader = _interopRequireDefault(require("./components/misc/PINHeader"));
var _Banner = require("./components/views/Banner");
var _indy = _interopRequireDefault(require("./configs/ledgers/indy"));
var _constants = require("./constants");
var _containerApi = require("./container-api");
var _store = require("./contexts/reducers/store");
var _store2 = require("./contexts/store");
var _notifications = require("./hooks/notifications");
var _useBifoldAgentSetup = _interopRequireDefault(require("./hooks/useBifoldAgentSetup"));
var _localization = require("./localization");
var _historyManager = _interopRequireDefault(require("./modules/history/context/historyManager"));
var _refreshOrchestrator = require("./modules/openid/refresh/refreshOrchestrator");
var _OnboardingStack = _interopRequireDefault(require("./navigators/OnboardingStack"));
var _defaultLayoutOptions = require("./navigators/defaultLayoutOptions");
var _defaultStackOptions = require("./navigators/defaultStackOptions");
var _CredentialDetails = _interopRequireDefault(require("./screens/CredentialDetails"));
var _CredentialOffer = _interopRequireDefault(require("./screens/CredentialOffer"));
var _onboarding = require("./onboarding");
var _Biometry = _interopRequireDefault(require("./screens/Biometry"));
var _Developer = _interopRequireDefault(require("./screens/Developer"));
var _ListCredentials = _interopRequireDefault(require("./screens/ListCredentials"));
var _Onboarding = _interopRequireDefault(require("./screens/Onboarding"));
var _PINExplainer = _interopRequireDefault(require("./screens/PINExplainer"));
var _Preface = _interopRequireDefault(require("./screens/Preface"));
var _ProofRequest = _interopRequireDefault(require("./screens/ProofRequest"));
var _Splash = _interopRequireDefault(require("./screens/Splash"));
var _Terms = _interopRequireWildcard(require("./screens/Terms"));
var _ToggleBiometry = _interopRequireDefault(require("./screens/ToggleBiometry"));
var _UpdateAvailable = _interopRequireDefault(require("./screens/UpdateAvailable"));
var _AgentBridge = require("./services/AgentBridge");
var _bifoldLogger = require("./services/bifoldLogger");
var _keychain = require("./services/keychain");
var _storage = require("./services/storage");
var _error = require("./types/error");
var _crypto = require("./utils/crypto");
var _TabStack = _interopRequireDefault(require("./navigators/TabStack"));
var _HomeStack = _interopRequireDefault(require("./navigators/HomeStack"));
var _CredentialCardGen = _interopRequireDefault(require("./components/misc/CredentialCardGen"));
var _CredentialStack = _interopRequireDefault(require("./navigators/CredentialStack"));
var _OnboardingPages = _interopRequireDefault(require("./screens/OnboardingPages"));
var _Scan = _interopRequireDefault(require("./screens/Scan"));
var _HomeHeaderView = _interopRequireDefault(require("./components/views/HomeHeaderView"));
var _HomeFooterView = _interopRequireDefault(require("./components/views/HomeFooterView"));
var _EmptyList = _interopRequireDefault(require("./components/misc/EmptyList"));
var _Record = _interopRequireDefault(require("./components/record/Record"));
var _NotificationListItem = _interopRequireDefault(require("./components/listItems/NotificationListItem"));
var _NoNewUpdates = _interopRequireDefault(require("./components/misc/NoNewUpdates"));
var _deepLinks = require("./hooks/deep-links");
var _PINCreate = _interopRequireDefault(require("./screens/PINCreate"));
var _PINEnter = _interopRequireDefault(require("./screens/PINEnter"));
var _AttemptLockout = _interopRequireDefault(require("./screens/AttemptLockout"));
var _Language = _interopRequireDefault(require("./screens/Language"));
var _ProofDetails = _interopRequireDefault(require("./screens/ProofDetails"));
var _ListContacts = _interopRequireDefault(require("./screens/ListContacts"));
var _Connection = _interopRequireDefault(require("./screens/Connection"));
var _WhatAreContacts = _interopRequireDefault(require("./screens/WhatAreContacts"));
var _Chat = _interopRequireDefault(require("./screens/Chat"));
var _ContactDetails = _interopRequireDefault(require("./screens/ContactDetails"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const defaultConfig = exports.defaultConfig = {
  PINSecurity: {
    rules: _constants.PINRules,
    displayHelper: false
  },
  settings: [],
  enableChat: true,
  enableTours: false,
  preventScreenCapture: false,
  supportedLanguages: [_localization.Locales.en, _localization.Locales.fr, _localization.Locales.ptBr],
  showPreface: false,
  disableOnboardingSkip: false,
  disableContactsInSettings: false,
  internetReachabilityUrls: ['https://clients3.google.com/generate_204'],
  whereToUseWalletUrl: 'https://example.com',
  showScanHelp: true,
  showScanButton: true,
  showDetailsInfo: true,
  contactDetailsOptions: {
    showConnectedTime: true,
    enableEditContactName: true,
    enableCredentialList: false
  },
  appUpdateConfig: {
    appleAppStoreUrl: 'https://example.com',
    googlePlayStoreUrl: 'https://example.com'
  },
  PINScreensConfig: {
    useNewPINDesign: false
  },
  showGenericErrors: false,
  enableFullScreenErrorModal: false
};
const defaultHistoryEventsLogger = exports.defaultHistoryEventsLogger = {
  logAttestationAccepted: true,
  logAttestationRefused: true,
  logAttestationRemoved: true,
  logInformationSent: true,
  logInformationNotSent: true,
  logConnection: true,
  logConnectionRemoved: true,
  logAttestationRevoked: true,
  logPinChanged: true,
  logToggleBiometry: true
};
class MainContainer {
  static TOKENS = _containerApi.TOKENS;
  constructor(container, log) {
    this._container = container;
    this.log = log;
    this.storage = new _storage.PersistentStorage(log);
  }
  get container() {
    return this._container;
  }
  init() {
    var _this$log;
    (_this$log = this.log) === null || _this$log === void 0 || _this$log.info(`Initializing Bifold container`);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_PREFACE, _Preface.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_DEVELOPER, _Developer.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_TERMS, {
      screen: _Terms.default,
      version: _Terms.TermsVersion
    });
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_SPLASH, _Splash.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_UPDATE_AVAILABLE, _UpdateAvailable.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_ONBOARDING_PAGES, _OnboardingPages.default);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_PIN_HEADER, _PINHeader.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_BIOMETRY, _Biometry.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_TOGGLE_BIOMETRY, _ToggleBiometry.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_SCAN, _Scan.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_ONBOARDING_ITEM, _Onboarding.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_ONBOARDING, _Onboarding.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_CREDENTIAL_LIST, _ListCredentials.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_CREDENTIAL_DETAILS, _CredentialDetails.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_CREDENTIAL_OFFER, _CredentialOffer.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_PROOF_REQUEST, _ProofRequest.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_PIN_CREATE, _PINCreate.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_PIN_ENTER, _PINEnter.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_ATTEMPT_LOCKOUT, _AttemptLockout.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_LANGUAGE, _Language.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_PROOF_DETAILS, _ProofDetails.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_CONNECTION, _Connection.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_CONNECTION_LIST, _ListContacts.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_CONNECTION_DETAILS, _ContactDetails.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_WHAT_ARE_CONTACTS, _WhatAreContacts.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_CHAT, _Chat.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_PIN_EXPLAINER, _PINExplainer.default);
    this._container.registerInstance(_containerApi.TOKENS.HOOK_USE_AGENT_SETUP, _useBifoldAgentSetup.default);
    this._container.registerInstance(_containerApi.TOKENS.STACK_ONBOARDING, _OnboardingStack.default);
    this._container.registerInstance(_containerApi.TOKENS.STACK_TAB, _TabStack.default);
    this._container.registerInstance(_containerApi.TOKENS.STACK_HOME, _HomeStack.default);
    this._container.registerInstance(_containerApi.TOKENS.STACK_CREDENTIAL, _CredentialStack.default);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_CREDENTIAL_CARD, _CredentialCardGen.default);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_BUTTON, _Button.default);
    this._container.registerInstance(_containerApi.TOKENS.GROUP_BY_REFERENT, false);
    this._container.registerInstance(_containerApi.TOKENS.HISTORY_ENABLED, false);
    this._container.registerInstance(_containerApi.TOKENS.HISTORY_EVENTS_LOGGER, defaultHistoryEventsLogger);
    this._container.registerInstance(_containerApi.TOKENS.CRED_HELP_ACTION_OVERRIDES, []);
    this._container.registerInstance(_containerApi.TOKENS.OBJECT_SCREEN_CONFIG, _defaultStackOptions.DefaultScreenOptionsDictionary);
    this._container.registerInstance(_containerApi.TOKENS.OBJECT_LAYOUT_CONFIG, _defaultLayoutOptions.DefaultScreenLayoutOptions);
    this._container.registerInstance(_containerApi.TOKENS.UTIL_LOGGER, _bifoldLogger.bifoldLoggerInstance);
    this._container.registerInstance(_containerApi.TOKENS.UTIL_OCA_RESOLVER, new _legacy.DefaultOCABundleResolver(bundle));
    this._container.registerInstance(_containerApi.TOKENS.UTIL_LEDGERS, _indy.default);
    this._container.registerInstance(_containerApi.TOKENS.UTIL_PROOF_TEMPLATE, _verifier.getProofRequestTemplates);
    this._container.registerInstance(_containerApi.TOKENS.UTIL_ATTESTATION_MONITOR, {
      useValue: undefined
    });
    this._container.registerInstance(_containerApi.TOKENS.UTIL_APP_VERSION_MONITOR, {
      useValue: undefined
    });
    this._container.registerInstance(_containerApi.TOKENS.NOTIFICATIONS, {
      useNotifications: _notifications.useNotifications
    });
    this._container.registerInstance(_containerApi.TOKENS.NOTIFICATIONS_LIST_ITEM, _NotificationListItem.default);
    this._container.registerInstance(_containerApi.TOKENS.CONFIG, defaultConfig);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_CRED_LIST_HEADER_RIGHT, () => null);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_CRED_LIST_OPTIONS, () => null);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_CRED_LIST_FOOTER, () => null);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_HOME_HEADER, _HomeHeaderView.default);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_NOTIFICATION_BANNER, _Banner.Banner);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_HOME_NOTIFICATIONS_EMPTY_LIST, _NoNewUpdates.default);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_HOME_FOOTER, _HomeFooterView.default);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_CRED_EMPTY_LIST, _EmptyList.default);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_RECORD, _Record.default);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_CONTACT_LIST_ITEM, _ContactListItem.default);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_CONTACT_DETAILS_CRED_LIST_ITEM, _ContactCredentialListItem.default);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_CONNECTION_ALERT, _ConnectionAlert.default);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_PIN_HEADER, _PINHeader.default);
    this._container.registerInstance(_containerApi.TOKENS.CACHE_CRED_DEFS, []);
    this._container.registerInstance(_containerApi.TOKENS.CACHE_SCHEMAS, []);
    this._container.registerInstance(_containerApi.TOKENS.INLINE_ERRORS, {
      enabled: true,
      hasErrorIcon: true,
      position: _error.InlineErrorPosition.Above
    });
    this._container.registerInstance(_containerApi.TOKENS.FN_ONBOARDING_DONE, dispatch => {
      return () => {
        dispatch({
          type: _store.DispatchAction.DID_COMPLETE_TUTORIAL
        });
      };
    });
    this._container.registerInstance(_containerApi.TOKENS.FN_LOAD_HISTORY, agent => {
      return new _historyManager.default(agent);
    });
    this._container.registerInstance(_containerApi.TOKENS.CUSTOM_NAV_STACK_1, false);
    this._container.registerInstance(_containerApi.TOKENS.HOOK_USE_DEEPLINKS, _deepLinks.useDeepLinks);
    this._container.registerInstance(_containerApi.TOKENS.LOAD_STATE, async dispatch => {
      const loadState = async (key, updateVal) => {
        const data = await this.storage.getValueForKey(key);
        if (data) {
          updateVal(data);
        }
      };
      let loginAttempt = _store2.defaultState.loginAttempt;
      let preferences = _store2.defaultState.preferences;
      let migration = _store2.defaultState.migration;
      let tours = _store2.defaultState.tours;
      let onboarding = _store2.defaultState.onboarding;
      await Promise.all([(0, _keychain.loadLoginAttempt)().then(data => {
        if (data) {
          loginAttempt = data;
        }
      }), loadState(_constants.LocalStorageKeys.Preferences, val => preferences = val), loadState(_constants.LocalStorageKeys.Migration, val => migration = val), loadState(_constants.LocalStorageKeys.Tours, val => tours = val), loadState(_constants.LocalStorageKeys.Onboarding, val => onboarding = val)]);
      const state = {
        loginAttempt: {
          ..._store2.defaultState.loginAttempt,
          ...loginAttempt
        },
        preferences: {
          ..._store2.defaultState.preferences,
          ...preferences
        },
        migration: {
          ..._store2.defaultState.migration,
          ...migration
        },
        tours: {
          ..._store2.defaultState.tours,
          ...tours
        },
        onboarding: {
          ..._store2.defaultState.onboarding,
          ...onboarding
        }
      };
      dispatch({
        type: _store.DispatchAction.STATE_DISPATCH,
        payload: [state]
      });
    });
    this._container.registerInstance(_containerApi.TOKENS.ONBOARDING, _onboarding.generateOnboardingWorkflowSteps);
    this._container.registerInstance(_containerApi.TOKENS.UTIL_AGENT_BRIDGE, new _AgentBridge.AgentBridge());

    // Register OpenID Credentials Refresh Orchestrator
    const orchestrator = new _refreshOrchestrator.RefreshOrchestrator(this._container.resolve(_containerApi.TOKENS.UTIL_LOGGER), this._container.resolve(_containerApi.TOKENS.UTIL_AGENT_BRIDGE), {
      autoStart: false,
      intervalMs: undefined,
      listRecords: async () => {
        const agent = this._container.resolve(_containerApi.TOKENS.UTIL_AGENT_BRIDGE).current;
        if (!agent) return [];
        const [w3c, sdjwt] = await Promise.all([agent.w3cCredentials.getAll(), agent.sdJwtVc.getAll()]);
        return [...w3c, ...sdjwt];
      }
    });
    this._container.registerInstance(_containerApi.TOKENS.UTIL_REFRESH_ORCHESTRATOR, orchestrator);
    this._container.registerInstance(_containerApi.TOKENS.FN_PIN_HASH_ALGORITHM, (PIN, salt) => {
      return (0, _crypto.hashPIN)(PIN, salt);
    });
    return this;
  }
  resolve(token) {
    return this._container.resolve(token);
  }
  resolveAll(tokens) {
    return tokens.map(key => this.resolve(key));
  }
}
exports.MainContainer = MainContainer;
const SystemContext = exports.SystemContext = /*#__PURE__*/(0, _react.createContext)(undefined);
const SystemProvider = exports.SystemProvider = SystemContext.Provider;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const useSystem = () => (0, _react.useContext)(SystemContext);
exports.useSystem = useSystem;
//# sourceMappingURL=container-impl.js.map