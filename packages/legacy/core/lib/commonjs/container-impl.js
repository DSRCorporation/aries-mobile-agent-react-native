"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSystem = exports.defaultConfig = exports.SystemProvider = exports.SystemContext = exports.MainContainer = void 0;
var _ariesBifoldVerifier = require("@hyperledger/aries-bifold-verifier");
var _legacy = require("@hyperledger/aries-oca/build/legacy");
var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));
var _react = require("react");
var bundle = _interopRequireWildcard(require("./assets/oca-bundles.json"));
var _Button = _interopRequireDefault(require("./components/buttons/Button"));
var _indy = _interopRequireDefault(require("./configs/ledgers/indy"));
var _constants = require("./constants");
var _containerApi = require("./container-api");
var _store = require("./contexts/reducers/store");
var _store2 = require("./contexts/store");
var _notifications = require("./hooks/notifications");
var _historyManager = _interopRequireDefault(require("./modules/history/context/historyManager"));
var _OnboardingStack = _interopRequireDefault(require("./navigators/OnboardingStack"));
var _defaultStackOptions = require("./navigators/defaultStackOptions");
var _CredentialDetails = _interopRequireDefault(require("./screens/CredentialDetails"));
var _CredentialOffer = _interopRequireDefault(require("./screens/CredentialOffer"));
var _Developer = _interopRequireDefault(require("./screens/Developer"));
var _ListCredentials = _interopRequireDefault(require("./screens/ListCredentials"));
var _Onboarding = _interopRequireDefault(require("./screens/Onboarding"));
var _Preface = _interopRequireDefault(require("./screens/Preface"));
var _ProofRequest = _interopRequireDefault(require("./screens/ProofRequest"));
var _Splash = _interopRequireDefault(require("./screens/Splash"));
var _Terms = _interopRequireWildcard(require("./screens/Terms"));
var _keychain = require("./services/keychain");
var _logger = require("./services/logger");
var _navigators = require("./types/navigators");
var _TabStack = _interopRequireDefault(require("./navigators/TabStack"));
var _HomeStack = _interopRequireDefault(require("./navigators/HomeStack"));
var _CredentialCard = _interopRequireDefault(require("./components/misc/CredentialCard"));
var _CredentialStack = _interopRequireDefault(require("./navigators/CredentialStack"));
var _OnboardingPages = _interopRequireDefault(require("./screens/OnboardingPages"));
var _UseBiometry = _interopRequireDefault(require("./screens/UseBiometry"));
var _Scan = _interopRequireDefault(require("./screens/Scan"));
var _HomeHeaderView = _interopRequireDefault(require("./components/views/HomeHeaderView"));
var _HomeFooterView = _interopRequireDefault(require("./components/views/HomeFooterView"));
var _EmptyList = _interopRequireDefault(require("./components/misc/EmptyList"));
var _Record = _interopRequireDefault(require("./components/record/Record"));
var _NotificationListItem = _interopRequireDefault(require("./components/listItems/NotificationListItem"));
var _NoNewUpdates = _interopRequireDefault(require("./components/misc/NoNewUpdates"));
var _deepLinks = require("./hooks/deep-links");
var _PINCreateHeader = _interopRequireDefault(require("./components/misc/PINCreateHeader"));
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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const defaultConfig = exports.defaultConfig = {
  PINSecurity: {
    rules: _constants.PINRules,
    displayHelper: false
  },
  settings: [],
  enableTours: false,
  supportedLanguages: ['en', 'fr', 'pt-BR'],
  showPreface: false,
  disableOnboardingSkip: false,
  whereToUseWalletUrl: 'https://example.com',
  showScanHelp: true,
  showScanButton: true,
  showDetailsInfo: true
};
class MainContainer {
  static TOKENS = _containerApi.TOKENS;
  constructor(container, log) {
    this._container = container;
    this.log = log;
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
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_ONBOARDING_PAGES, _OnboardingPages.default);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_PIN_CREATE_HEADER, _PINCreateHeader.default);
    this._container.registerInstance(_containerApi.TOKENS.SCREEN_USE_BIOMETRY, _UseBiometry.default);
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
    this._container.registerInstance(_containerApi.TOKENS.STACK_ONBOARDING, _OnboardingStack.default);
    this._container.registerInstance(_containerApi.TOKENS.STACK_TAB, _TabStack.default);
    this._container.registerInstance(_containerApi.TOKENS.STACK_HOME, _HomeStack.default);
    this._container.registerInstance(_containerApi.TOKENS.STACK_CREDENTIAL, _CredentialStack.default);
    this._container.registerInstance(_containerApi.TOKENS.COMP_CREDENTIAL_CARD, _CredentialCard.default);
    this._container.registerInstance(_containerApi.TOKENS.COMP_BUTTON, _Button.default);
    this._container.registerInstance(_containerApi.TOKENS.GROUP_BY_REFERENT, false);
    this._container.registerInstance(_containerApi.TOKENS.HISTORY_ENABLED, false);
    this._container.registerInstance(_containerApi.TOKENS.CRED_HELP_ACTION_OVERRIDES, []);
    this._container.registerInstance(_containerApi.TOKENS.OBJECT_ONBOARDING_CONFIG, _defaultStackOptions.DefaultScreenOptionsDictionary);
    this._container.registerInstance(_containerApi.TOKENS.UTIL_LOGGER, new _logger.ConsoleLogger());
    this._container.registerInstance(_containerApi.TOKENS.UTIL_OCA_RESOLVER, new _legacy.DefaultOCABundleResolver(bundle));
    this._container.registerInstance(_containerApi.TOKENS.UTIL_LEDGERS, _indy.default);
    this._container.registerInstance(_containerApi.TOKENS.UTIL_PROOF_TEMPLATE, _ariesBifoldVerifier.getProofRequestTemplates);
    this._container.registerInstance(_containerApi.TOKENS.UTIL_ATTESTATION_MONITOR, {
      useValue: undefined
    });
    this._container.registerInstance(_containerApi.TOKENS.NOTIFICATIONS, {
      useNotifications: _notifications.useNotifications
    });
    this._container.registerInstance(_containerApi.TOKENS.NOTIFICATIONS_LIST_ITEM, _NotificationListItem.default);
    this._container.registerInstance(_containerApi.TOKENS.CONFIG, defaultConfig);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_CRED_LIST_HEADER_RIGHT, () => null);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_CRED_LIST_OPTIONS, () => null);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_HOME_HEADER, _HomeHeaderView.default);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_HOME_NOTIFICATIONS_EMPTY_LIST, _NoNewUpdates.default);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_HOME_FOOTER, _HomeFooterView.default);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_CRED_EMPTY_LIST, _EmptyList.default);
    this._container.registerInstance(_containerApi.TOKENS.COMPONENT_RECORD, _Record.default);
    this._container.registerInstance(_containerApi.TOKENS.CACHE_CRED_DEFS, []);
    this._container.registerInstance(_containerApi.TOKENS.CACHE_SCHEMAS, []);
    this._container.registerInstance(_containerApi.TOKENS.FN_ONBOARDING_DONE, (dispatch, navigation) => {
      return () => {
        dispatch({
          type: _store.DispatchAction.DID_COMPLETE_TUTORIAL
        });
        navigation.navigate(_navigators.Screens.Terms);
      };
    });
    this._container.registerInstance(_containerApi.TOKENS.FN_LOAD_HISTORY, agent => {
      return new _historyManager.default(agent);
    });
    this._container.registerInstance(_containerApi.TOKENS.HOOK_USE_DEEPLINKS, _deepLinks.useDeepLinks);
    this._container.registerInstance(_containerApi.TOKENS.LOAD_STATE, async dispatch => {
      const loadState = async (key, updateVal) => {
        const data = await _asyncStorage.default.getItem(key);
        if (data) {
          const dataAsJSON = JSON.parse(data);
          updateVal(dataAsJSON);
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
        ..._store2.defaultState,
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