import { createContext, useContext } from 'react';
export const PROOF_TOKENS = {
  GROUP_BY_REFERENT: 'proof.groupByReferant',
  CRED_HELP_ACTION_OVERRIDES: 'proof.credHelpActionOverride'
};
export const SCREEN_TOKENS = {
  SCREEN_PREFACE: 'screen.preface',
  SCREEN_UPDATE_AVAILABLE: 'screen.update-available',
  SCREEN_TERMS: 'screen.terms',
  SCREEN_ONBOARDING: 'screen.onboarding',
  SCREEN_DEVELOPER: 'screen.developer',
  SCREEN_SETTINGS: 'screen.settings',
  SCREEN_CONNECTION: 'screen.connection',
  SCREEN_CONNECTION_DETAILS: 'screen.connection.details',
  SCREEN_CONNECTION_LIST: 'screen.connection.list',
  SCREEN_ONBOARDING_ITEM: 'screen.onboarding.item',
  SCREEN_CREDENTIAL_LIST: 'screen.credential.list',
  SCREEN_CREDENTIAL_DETAILS: 'screen.credential.details',
  SCREEN_CREDENTIAL_OFFER: 'screen.credential.offer',
  SCREEN_PROOF_REQUEST: 'screen.proof.request',
  SCREEN_ONBOARDING_PAGES: 'screen.onboarding.pages',
  SCREEN_SPLASH: 'screen.splash',
  SCREEN_SCAN: 'screen.scan',
  SCREEN_BIOMETRY: 'screen.biometry',
  SCREEN_TOGGLE_BIOMETRY: 'screen.toggle-biometry',
  SCREEN_PIN_EXPLAINER: 'screen.pin-explainer',
  SCREEN_PIN_CREATE: 'screen.pin-create',
  SCREEN_PIN_ENTER: 'screen.pin-enter',
  SCREEN_ATTEMPT_LOCKOUT: 'screen.attempt-lockout',
  SCREEN_LANGUAGE: 'screen.language',
  SCREEN_PROOF_DETAILS: 'screen.proof.details',
  SCREEN_WHAT_ARE_CONTACTS: 'screen.what-are-contacts',
  SCREEN_CHAT: 'screen.chat'
};
export const NAV_TOKENS = {
  CUSTOM_NAV_STACK_1: 'nav.slot1'
};
export const HOOK_TOKENS = {
  HOOK_USE_AGENT_SETUP: 'hook.useAgentSetup',
  HOOK_USE_DEEPLINKS: 'hook.useDeeplinks'
};
export const COMPONENT_TOKENS = {
  COMPONENT_HOME_HEADER: 'component.home.header',
  COMPONENT_NOTIFICATION_BANNER: 'component.notification.banner',
  COMPONENT_HOME_NOTIFICATIONS_EMPTY_LIST: 'component.home.notifications-empty-list',
  COMPONENT_HOME_FOOTER: 'component.home.footer',
  COMPONENT_CRED_EMPTY_LIST: 'component.cred.empty-list',
  COMPONENT_RECORD: 'component.record',
  COMPONENT_PIN_HEADER: 'component.pin-create-header',
  COMPONENT_CONTACT_LIST_ITEM: 'component.contact-list-item',
  COMPONENT_CONTACT_DETAILS_CRED_LIST_ITEM: 'component.contact-details-cred-list-item',
  COMPONENT_CONNECTION_ALERT: 'component.connection-alert',
  COMPONENT_BUTTON: 'component.button',
  COMPONENT_CREDENTIAL_CARD: 'component.credential-card'
};
export const NOTIFICATION_TOKENS = {
  NOTIFICATIONS: 'notification.list',
  NOTIFICATIONS_LIST_ITEM: 'notification.list-item'
};
export const STACK_TOKENS = {
  STACK_ONBOARDING: 'stack.onboarding',
  STACK_TAB: 'stack.tab',
  STACK_HOME: 'stack.home',
  STACK_CREDENTIAL: 'stack.credential'
};
export const FN_TOKENS = {
  FN_ONBOARDING_DONE: 'fn.onboardingDone',
  COMPONENT_CRED_LIST_HEADER_RIGHT: 'fn.credListHeaderRight',
  COMPONENT_CRED_LIST_OPTIONS: 'fn.credListOptions',
  COMPONENT_CRED_LIST_FOOTER: 'fn.credListFooter'
};
export const HISTORY_TOKENS = {
  FN_LOAD_HISTORY: 'fn.loadHistory',
  HISTORY_ENABLED: 'history.enabled',
  HISTORY_EVENTS_LOGGER: 'history.eventsLogger'
};
export const SERVICE_TOKENS = {
  SERVICE_TERMS: 'screen.terms'
};
export const LOAD_STATE_TOKENS = {
  LOAD_STATE: 'state.load'
};
export const OBJECT_TOKENS = {
  OBJECT_SCREEN_CONFIG: 'object.screen-config',
  OBJECT_LAYOUT_CONFIG: 'object.screenlayout-config'
};
export const CACHE_TOKENS = {
  CACHE_CRED_DEFS: 'cache.cred-defs',
  CACHE_SCHEMAS: 'cache.schemas'
};
export const UTILITY_TOKENS = {
  UTIL_LOGGER: 'utility.logger',
  UTIL_OCA_RESOLVER: 'utility.oca-resolver',
  UTIL_LEDGERS: 'utility.ledgers',
  UTIL_PROOF_TEMPLATE: 'utility.proof-template',
  UTIL_ATTESTATION_MONITOR: 'utility.attestation-monitor',
  UTIL_APP_VERSION_MONITOR: 'utility.app-version-monitor',
  UTIL_AGENT_BRIDGE: 'utility.agent-bridge',
  UTIL_REFRESH_ORCHESTRATOR: 'utility.refresh-orchestrator'
};
export const CONFIG_TOKENS = {
  CONFIG: 'config',
  INLINE_ERRORS: 'errors.inline',
  ONBOARDING: 'utility.onboarding'
};
export const CRYPTO_TOKENS = {
  FN_PIN_HASH_ALGORITHM: 'fn.crypto.pin-hash-algorithm'
};
export const TOKENS = {
  ...PROOF_TOKENS,
  ...COMPONENT_TOKENS,
  ...SCREEN_TOKENS,
  ...HOOK_TOKENS,
  ...NAV_TOKENS,
  ...SERVICE_TOKENS,
  ...STACK_TOKENS,
  ...NOTIFICATION_TOKENS,
  ...FN_TOKENS,
  ...LOAD_STATE_TOKENS,
  ...OBJECT_TOKENS,
  ...CACHE_TOKENS,
  ...UTILITY_TOKENS,
  ...CONFIG_TOKENS,
  ...HISTORY_TOKENS,
  ...CRYPTO_TOKENS
};
export const ContainerContext = /*#__PURE__*/createContext(undefined);
export const ContainerProvider = ContainerContext.Provider;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useContainer = () => useContext(ContainerContext);
export const useServices = tokens => {
  return useContainer().resolveAll(tokens);
};
//# sourceMappingURL=container-api.js.map