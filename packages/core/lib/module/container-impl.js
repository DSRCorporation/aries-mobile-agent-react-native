import { DefaultOCABundleResolver } from '@bifold/oca/build/legacy';
import { getProofRequestTemplates } from '@bifold/verifier';
import { createContext, useContext } from 'react';
import * as bundle from './assets/oca-bundles.json';
import Button from './components/buttons/Button';
import ContactCredentialListItem from './components/listItems/ContactCredentialListItem';
import ContactListItem from './components/listItems/ContactListItem';
import ConnectionAlert from './components/misc/ConnectionAlert';
import PINHeader from './components/misc/PINHeader';
import { Banner } from './components/views/Banner';
import defaultIndyLedgers from './configs/ledgers/indy';
import { LocalStorageKeys, PINRules } from './constants';
import { TOKENS } from './container-api';
import { DispatchAction } from './contexts/reducers/store';
import { defaultState } from './contexts/store';
import { useNotifications } from './hooks/notifications';
import useBifoldAgentSetup from './hooks/useBifoldAgentSetup';
import { Locales } from './localization';
import HistoryManager from './modules/history/context/historyManager';
import { RefreshOrchestrator } from './modules/openid/refresh/refreshOrchestrator';
import OnboardingStack from './navigators/OnboardingStack';
import { DefaultScreenLayoutOptions } from './navigators/defaultLayoutOptions';
import { DefaultScreenOptionsDictionary } from './navigators/defaultStackOptions';
import CredentialDetails from './screens/CredentialDetails';
import CredentialOffer from './screens/CredentialOffer';
import { generateOnboardingWorkflowSteps } from './onboarding';
import Biometry from './screens/Biometry';
import Developer from './screens/Developer';
import ListCredentials from './screens/ListCredentials';
import Onboarding from './screens/Onboarding';
import PINExplainer from './screens/PINExplainer';
import Preface from './screens/Preface';
import ProofRequest from './screens/ProofRequest';
import Splash from './screens/Splash';
import ScreenTerms, { TermsVersion } from './screens/Terms';
import ToggleBiometry from './screens/ToggleBiometry';
import UpdateAvailable from './screens/UpdateAvailable';
import { AgentBridge } from './services/AgentBridge';
import { bifoldLoggerInstance } from './services/bifoldLogger';
import { loadLoginAttempt } from './services/keychain';
import { PersistentStorage } from './services/storage';
import { InlineErrorPosition } from './types/error';
import { hashPIN } from './utils/crypto';
import TabStack from './navigators/TabStack';
import HomeStack from './navigators/HomeStack';
import CredentialCard from './components/misc/CredentialCardGen';
import CredentialStack from './navigators/CredentialStack';
import OnboardingPages from './screens/OnboardingPages';
import Scan from './screens/Scan';
import HomeHeaderView from './components/views/HomeHeaderView';
import HomeFooterView from './components/views/HomeFooterView';
import EmptyList from './components/misc/EmptyList';
import Record from './components/record/Record';
import NotificationListItem from './components/listItems/NotificationListItem';
import NoNewUpdates from './components/misc/NoNewUpdates';
import { useDeepLinks } from './hooks/deep-links';
import PINCreate from './screens/PINCreate';
import PINEnter from './screens/PINEnter';
import AttemptLockout from './screens/AttemptLockout';
import Language from './screens/Language';
import ProofDetails from './screens/ProofDetails';
import ListContacts from './screens/ListContacts';
import Connection from './screens/Connection';
import WhatAreContacts from './screens/WhatAreContacts';
import Chat from './screens/Chat';
import ContactDetails from './screens/ContactDetails';
export const defaultConfig = {
  PINSecurity: {
    rules: PINRules,
    displayHelper: false
  },
  settings: [],
  enableChat: true,
  enableTours: false,
  preventScreenCapture: false,
  supportedLanguages: [Locales.en, Locales.fr, Locales.ptBr],
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
export const defaultHistoryEventsLogger = {
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
export class MainContainer {
  static TOKENS = TOKENS;
  constructor(container, log) {
    this._container = container;
    this.log = log;
    this.storage = new PersistentStorage(log);
  }
  get container() {
    return this._container;
  }
  init() {
    var _this$log;
    (_this$log = this.log) === null || _this$log === void 0 || _this$log.info(`Initializing Bifold container`);
    this._container.registerInstance(TOKENS.SCREEN_PREFACE, Preface);
    this._container.registerInstance(TOKENS.SCREEN_DEVELOPER, Developer);
    this._container.registerInstance(TOKENS.SCREEN_TERMS, {
      screen: ScreenTerms,
      version: TermsVersion
    });
    this._container.registerInstance(TOKENS.SCREEN_SPLASH, Splash);
    this._container.registerInstance(TOKENS.SCREEN_UPDATE_AVAILABLE, UpdateAvailable);
    this._container.registerInstance(TOKENS.SCREEN_ONBOARDING_PAGES, OnboardingPages);
    this._container.registerInstance(TOKENS.COMPONENT_PIN_HEADER, PINHeader);
    this._container.registerInstance(TOKENS.SCREEN_BIOMETRY, Biometry);
    this._container.registerInstance(TOKENS.SCREEN_TOGGLE_BIOMETRY, ToggleBiometry);
    this._container.registerInstance(TOKENS.SCREEN_SCAN, Scan);
    this._container.registerInstance(TOKENS.SCREEN_ONBOARDING_ITEM, Onboarding);
    this._container.registerInstance(TOKENS.SCREEN_ONBOARDING, Onboarding);
    this._container.registerInstance(TOKENS.SCREEN_CREDENTIAL_LIST, ListCredentials);
    this._container.registerInstance(TOKENS.SCREEN_CREDENTIAL_DETAILS, CredentialDetails);
    this._container.registerInstance(TOKENS.SCREEN_CREDENTIAL_OFFER, CredentialOffer);
    this._container.registerInstance(TOKENS.SCREEN_PROOF_REQUEST, ProofRequest);
    this._container.registerInstance(TOKENS.SCREEN_PIN_CREATE, PINCreate);
    this._container.registerInstance(TOKENS.SCREEN_PIN_ENTER, PINEnter);
    this._container.registerInstance(TOKENS.SCREEN_ATTEMPT_LOCKOUT, AttemptLockout);
    this._container.registerInstance(TOKENS.SCREEN_LANGUAGE, Language);
    this._container.registerInstance(TOKENS.SCREEN_PROOF_DETAILS, ProofDetails);
    this._container.registerInstance(TOKENS.SCREEN_CONNECTION, Connection);
    this._container.registerInstance(TOKENS.SCREEN_CONNECTION_LIST, ListContacts);
    this._container.registerInstance(TOKENS.SCREEN_CONNECTION_DETAILS, ContactDetails);
    this._container.registerInstance(TOKENS.SCREEN_WHAT_ARE_CONTACTS, WhatAreContacts);
    this._container.registerInstance(TOKENS.SCREEN_CHAT, Chat);
    this._container.registerInstance(TOKENS.SCREEN_PIN_EXPLAINER, PINExplainer);
    this._container.registerInstance(TOKENS.HOOK_USE_AGENT_SETUP, useBifoldAgentSetup);
    this._container.registerInstance(TOKENS.STACK_ONBOARDING, OnboardingStack);
    this._container.registerInstance(TOKENS.STACK_TAB, TabStack);
    this._container.registerInstance(TOKENS.STACK_HOME, HomeStack);
    this._container.registerInstance(TOKENS.STACK_CREDENTIAL, CredentialStack);
    this._container.registerInstance(TOKENS.COMPONENT_CREDENTIAL_CARD, CredentialCard);
    this._container.registerInstance(TOKENS.COMPONENT_BUTTON, Button);
    this._container.registerInstance(TOKENS.GROUP_BY_REFERENT, false);
    this._container.registerInstance(TOKENS.HISTORY_ENABLED, false);
    this._container.registerInstance(TOKENS.HISTORY_EVENTS_LOGGER, defaultHistoryEventsLogger);
    this._container.registerInstance(TOKENS.CRED_HELP_ACTION_OVERRIDES, []);
    this._container.registerInstance(TOKENS.OBJECT_SCREEN_CONFIG, DefaultScreenOptionsDictionary);
    this._container.registerInstance(TOKENS.OBJECT_LAYOUT_CONFIG, DefaultScreenLayoutOptions);
    this._container.registerInstance(TOKENS.UTIL_LOGGER, bifoldLoggerInstance);
    this._container.registerInstance(TOKENS.UTIL_OCA_RESOLVER, new DefaultOCABundleResolver(bundle));
    this._container.registerInstance(TOKENS.UTIL_LEDGERS, defaultIndyLedgers);
    this._container.registerInstance(TOKENS.UTIL_PROOF_TEMPLATE, getProofRequestTemplates);
    this._container.registerInstance(TOKENS.UTIL_ATTESTATION_MONITOR, {
      useValue: undefined
    });
    this._container.registerInstance(TOKENS.UTIL_APP_VERSION_MONITOR, {
      useValue: undefined
    });
    this._container.registerInstance(TOKENS.NOTIFICATIONS, {
      useNotifications
    });
    this._container.registerInstance(TOKENS.NOTIFICATIONS_LIST_ITEM, NotificationListItem);
    this._container.registerInstance(TOKENS.CONFIG, defaultConfig);
    this._container.registerInstance(TOKENS.COMPONENT_CRED_LIST_HEADER_RIGHT, () => null);
    this._container.registerInstance(TOKENS.COMPONENT_CRED_LIST_OPTIONS, () => null);
    this._container.registerInstance(TOKENS.COMPONENT_CRED_LIST_FOOTER, () => null);
    this._container.registerInstance(TOKENS.COMPONENT_HOME_HEADER, HomeHeaderView);
    this._container.registerInstance(TOKENS.COMPONENT_NOTIFICATION_BANNER, Banner);
    this._container.registerInstance(TOKENS.COMPONENT_HOME_NOTIFICATIONS_EMPTY_LIST, NoNewUpdates);
    this._container.registerInstance(TOKENS.COMPONENT_HOME_FOOTER, HomeFooterView);
    this._container.registerInstance(TOKENS.COMPONENT_CRED_EMPTY_LIST, EmptyList);
    this._container.registerInstance(TOKENS.COMPONENT_RECORD, Record);
    this._container.registerInstance(TOKENS.COMPONENT_CONTACT_LIST_ITEM, ContactListItem);
    this._container.registerInstance(TOKENS.COMPONENT_CONTACT_DETAILS_CRED_LIST_ITEM, ContactCredentialListItem);
    this._container.registerInstance(TOKENS.COMPONENT_CONNECTION_ALERT, ConnectionAlert);
    this._container.registerInstance(TOKENS.COMPONENT_PIN_HEADER, PINHeader);
    this._container.registerInstance(TOKENS.CACHE_CRED_DEFS, []);
    this._container.registerInstance(TOKENS.CACHE_SCHEMAS, []);
    this._container.registerInstance(TOKENS.INLINE_ERRORS, {
      enabled: true,
      hasErrorIcon: true,
      position: InlineErrorPosition.Above
    });
    this._container.registerInstance(TOKENS.FN_ONBOARDING_DONE, dispatch => {
      return () => {
        dispatch({
          type: DispatchAction.DID_COMPLETE_TUTORIAL
        });
      };
    });
    this._container.registerInstance(TOKENS.FN_LOAD_HISTORY, agent => {
      return new HistoryManager(agent);
    });
    this._container.registerInstance(TOKENS.CUSTOM_NAV_STACK_1, false);
    this._container.registerInstance(TOKENS.HOOK_USE_DEEPLINKS, useDeepLinks);
    this._container.registerInstance(TOKENS.LOAD_STATE, async dispatch => {
      const loadState = async (key, updateVal) => {
        const data = await this.storage.getValueForKey(key);
        if (data) {
          updateVal(data);
        }
      };
      let loginAttempt = defaultState.loginAttempt;
      let preferences = defaultState.preferences;
      let migration = defaultState.migration;
      let tours = defaultState.tours;
      let onboarding = defaultState.onboarding;
      await Promise.all([loadLoginAttempt().then(data => {
        if (data) {
          loginAttempt = data;
        }
      }), loadState(LocalStorageKeys.Preferences, val => preferences = val), loadState(LocalStorageKeys.Migration, val => migration = val), loadState(LocalStorageKeys.Tours, val => tours = val), loadState(LocalStorageKeys.Onboarding, val => onboarding = val)]);
      const state = {
        loginAttempt: {
          ...defaultState.loginAttempt,
          ...loginAttempt
        },
        preferences: {
          ...defaultState.preferences,
          ...preferences
        },
        migration: {
          ...defaultState.migration,
          ...migration
        },
        tours: {
          ...defaultState.tours,
          ...tours
        },
        onboarding: {
          ...defaultState.onboarding,
          ...onboarding
        }
      };
      dispatch({
        type: DispatchAction.STATE_DISPATCH,
        payload: [state]
      });
    });
    this._container.registerInstance(TOKENS.ONBOARDING, generateOnboardingWorkflowSteps);
    this._container.registerInstance(TOKENS.UTIL_AGENT_BRIDGE, new AgentBridge());

    // Register OpenID Credentials Refresh Orchestrator
    const orchestrator = new RefreshOrchestrator(this._container.resolve(TOKENS.UTIL_LOGGER), this._container.resolve(TOKENS.UTIL_AGENT_BRIDGE), {
      autoStart: false,
      intervalMs: undefined,
      listRecords: async () => {
        const agent = this._container.resolve(TOKENS.UTIL_AGENT_BRIDGE).current;
        if (!agent) return [];
        const [w3c, sdjwt] = await Promise.all([agent.w3cCredentials.getAll(), agent.sdJwtVc.getAll()]);
        return [...w3c, ...sdjwt];
      }
    });
    this._container.registerInstance(TOKENS.UTIL_REFRESH_ORCHESTRATOR, orchestrator);
    this._container.registerInstance(TOKENS.FN_PIN_HASH_ALGORITHM, (PIN, salt) => {
      return hashPIN(PIN, salt);
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
export const SystemContext = /*#__PURE__*/createContext(undefined);
export const SystemProvider = SystemContext.Provider;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useSystem = () => useContext(SystemContext);
//# sourceMappingURL=container-impl.js.map