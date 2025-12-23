import { createContext, useContext } from 'react';
export const PROOF_TOKENS = {
  GROUP_BY_REFERENT: 'proof.groupByReferant',
  CRED_HELP_ACTION_OVERRIDES: 'proof.credHelpActionOverride'
};
export const SCREEN_TOKENS = {
  SCREEN_PREFACE: 'screen.preface',
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
  SCREEN_USE_BIOMETRY: 'screen.use-biometry',
  SCREEN_PIN_CREATE: 'screen.pin-create',
  SCREEN_PIN_ENTER: 'screen.pin-enter',
  SCREEN_ATTEMPT_LOCKOUT: 'screen.attempt-lockout',
  SCREEN_LANGUAGE: 'screen.language',
  SCREEN_PROOF_DETAILS: 'screen.proof.details',
  SCREEN_WHAT_ARE_CONTACTS: 'screen.what-are-contacts',
  SCREEN_CHAT: 'screen.chat'
};
export const COMPONENT_TOKENS = {
  COMPONENT_HOME_HEADER: 'component.home.header',
  COMPONENT_HOME_NOTIFICATIONS_EMPTY_LIST: 'component.home.notifications-empty-list',
  COMPONENT_HOME_FOOTER: 'component.home.footer',
  COMPONENT_CRED_EMPTY_LIST: 'component.cred.empty-list',
  COMPONENT_RECORD: 'component.record',
  COMPONENT_PIN_CREATE_HEADER: 'component.pin-create-header'
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
  COMPONENT_CRED_LIST_OPTIONS: 'fn.credListOptions'
};
export const HOOK_TOKENS = {
  HOOK_USE_DEEPLINKS: 'hook.useDeeplinks'
};
export const HISTORY_TOKENS = {
  FN_LOAD_HISTORY: 'fn.loadHistory',
  HISTORY_ENABLED: 'history.enabled'
};
export const COMP_TOKENS = {
  COMP_BUTTON: 'comp.button',
  COMP_CREDENTIAL_CARD: 'comp.credentialCard'
};
export const SERVICE_TOKENS = {
  SERVICE_TERMS: 'screen.terms'
};
export const LOAD_STATE_TOKENS = {
  LOAD_STATE: 'state.load'
};
export const OBJECT_TOKENS = {
  OBJECT_ONBOARDING_CONFIG: 'object.onboarding-config'
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
  UTIL_ATTESTATION_MONITOR: 'utility.attestation-monitor'
};
export const CONFIG_TOKENS = {
  CONFIG: 'config'
};
export const TOKENS = {
  ...PROOF_TOKENS,
  ...COMPONENT_TOKENS,
  ...SCREEN_TOKENS,
  ...SERVICE_TOKENS,
  ...STACK_TOKENS,
  ...NOTIFICATION_TOKENS,
  ...FN_TOKENS,
  ...HOOK_TOKENS,
  ...COMP_TOKENS,
  ...LOAD_STATE_TOKENS,
  ...OBJECT_TOKENS,
  ...CACHE_TOKENS,
  ...UTILITY_TOKENS,
  ...CONFIG_TOKENS,
  ...HISTORY_TOKENS
};
export const ContainerContext = /*#__PURE__*/createContext(undefined);
export const ContainerProvider = ContainerContext.Provider;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useContainer = () => useContext(ContainerContext);
export const useServices = tokens => {
  return useContainer().resolveAll(tokens);
};
//# sourceMappingURL=container-api.js.map