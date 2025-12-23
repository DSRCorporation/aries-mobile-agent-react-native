import { State } from '../../types/state';
declare enum StateDispatchAction {
    STATE_DISPATCH = "state/stateDispatch",
    STATE_LOADED = "state/stateLoaded"
}
declare enum OnboardingDispatchAction {
    ONBOARDING_UPDATED = "onboarding/onboardingStateLoaded",
    DID_SEE_PREFACE = "onboarding/didSeePreface",
    DID_COMPLETE_TUTORIAL = "onboarding/didCompleteTutorial",
    DID_AGREE_TO_TERMS = "onboarding/didAgreeToTerms",
    DID_CREATE_PIN = "onboarding/didCreatePIN",
    DID_NAME_WALLET = "onboarding/didNameWallet",
    DID_COMPLETE_ONBOARDING = "onboarding/didCompleteOnboarding",
    ONBOARDING_VERSION = "onboarding/onboardingVersion",
    SET_POST_AUTH_SCREENS = "onboarding/postAuthScreens"
}
declare enum MigrationDispatchAction {
    DID_MIGRATE_TO_ASKAR = "migration/didMigrateToAskar",
    MIGRATION_UPDATED = "migration/migrationStateLoaded"
}
declare enum LockoutDispatchAction {
    LOCKOUT_UPDATED = "lockout/lockoutUpdated"
}
declare enum LoginAttemptDispatchAction {
    ATTEMPT_UPDATED = "loginAttempt/loginAttemptUpdated"
}
declare enum PreferencesDispatchAction {
    ENABLE_DEVELOPER_MODE = "preferences/enableDeveloperMode",
    USE_BIOMETRY = "preferences/useBiometry",
    USE_PUSH_NOTIFICATIONS = "preferences/usePushNotifications",
    PREFERENCES_UPDATED = "preferences/preferencesStateLoaded",
    USE_VERIFIER_CAPABILITY = "preferences/useVerifierCapability",
    USE_CONNECTION_INVITER_CAPABILITY = "preferences/useConnectionInviterCapability",
    HISTORY_CAPABILITY = "preferences/historyCapability",
    USE_DEV_VERIFIER_TEMPLATES = "preferences/useDevVerifierTemplates",
    ENABLE_WALLET_NAMING = "preferences/enableWalletNaming",
    UPDATE_WALLET_NAME = "preferences/updateWalletName",
    ACCEPT_DEV_CREDENTIALS = "preferences/acceptDevCredentials",
    USE_DATA_RETENTION = "preferences/useDataRetention",
    PREVENT_AUTO_LOCK = "preferences/preventAutoLock",
    USE_SHAREABLE_LINK = "preferences/useShareableLink",
    UPDATE_ALTERNATE_CONTACT_NAMES = "preferences/updateAlternateContactNames"
}
declare enum ToursDispatchAction {
    TOUR_DATA_UPDATED = "tours/tourDataUpdated",
    UPDATE_SEEN_TOUR_PROMPT = "tours/seenTourPrompt",
    ENABLE_TOURS = "tours/enableTours",
    UPDATE_SEEN_HOME_TOUR = "tours/seenHomeTour",
    UPDATE_SEEN_CREDENTIALS_TOUR = "tours/seenCredentialsTour",
    UPDATE_SEEN_CREDENTIAL_OFFER_TOUR = "tours/seenCredentialOfferTour",
    UPDATE_SEEN_PROOF_REQUEST_TOUR = "tours/seenProofRequestTour"
}
declare enum AuthenticationDispatchAction {
    DID_AUTHENTICATE = "authentication/didAuthenticate"
}
declare enum DeepLinkDispatchAction {
    ACTIVE_DEEP_LINK = "deepLink/activeDeepLink"
}
export type DispatchAction = StateDispatchAction | OnboardingDispatchAction | LoginAttemptDispatchAction | LockoutDispatchAction | PreferencesDispatchAction | ToursDispatchAction | AuthenticationDispatchAction | DeepLinkDispatchAction | MigrationDispatchAction;
export declare const DispatchAction: {
    DID_MIGRATE_TO_ASKAR: MigrationDispatchAction.DID_MIGRATE_TO_ASKAR;
    MIGRATION_UPDATED: MigrationDispatchAction.MIGRATION_UPDATED;
    ACTIVE_DEEP_LINK: DeepLinkDispatchAction.ACTIVE_DEEP_LINK;
    DID_AUTHENTICATE: AuthenticationDispatchAction.DID_AUTHENTICATE;
    TOUR_DATA_UPDATED: ToursDispatchAction.TOUR_DATA_UPDATED;
    UPDATE_SEEN_TOUR_PROMPT: ToursDispatchAction.UPDATE_SEEN_TOUR_PROMPT;
    ENABLE_TOURS: ToursDispatchAction.ENABLE_TOURS;
    UPDATE_SEEN_HOME_TOUR: ToursDispatchAction.UPDATE_SEEN_HOME_TOUR;
    UPDATE_SEEN_CREDENTIALS_TOUR: ToursDispatchAction.UPDATE_SEEN_CREDENTIALS_TOUR;
    UPDATE_SEEN_CREDENTIAL_OFFER_TOUR: ToursDispatchAction.UPDATE_SEEN_CREDENTIAL_OFFER_TOUR;
    UPDATE_SEEN_PROOF_REQUEST_TOUR: ToursDispatchAction.UPDATE_SEEN_PROOF_REQUEST_TOUR;
    ENABLE_DEVELOPER_MODE: PreferencesDispatchAction.ENABLE_DEVELOPER_MODE;
    USE_BIOMETRY: PreferencesDispatchAction.USE_BIOMETRY;
    USE_PUSH_NOTIFICATIONS: PreferencesDispatchAction.USE_PUSH_NOTIFICATIONS;
    PREFERENCES_UPDATED: PreferencesDispatchAction.PREFERENCES_UPDATED;
    USE_VERIFIER_CAPABILITY: PreferencesDispatchAction.USE_VERIFIER_CAPABILITY;
    USE_CONNECTION_INVITER_CAPABILITY: PreferencesDispatchAction.USE_CONNECTION_INVITER_CAPABILITY;
    HISTORY_CAPABILITY: PreferencesDispatchAction.HISTORY_CAPABILITY;
    USE_DEV_VERIFIER_TEMPLATES: PreferencesDispatchAction.USE_DEV_VERIFIER_TEMPLATES;
    ENABLE_WALLET_NAMING: PreferencesDispatchAction.ENABLE_WALLET_NAMING;
    UPDATE_WALLET_NAME: PreferencesDispatchAction.UPDATE_WALLET_NAME;
    ACCEPT_DEV_CREDENTIALS: PreferencesDispatchAction.ACCEPT_DEV_CREDENTIALS;
    USE_DATA_RETENTION: PreferencesDispatchAction.USE_DATA_RETENTION;
    PREVENT_AUTO_LOCK: PreferencesDispatchAction.PREVENT_AUTO_LOCK;
    USE_SHAREABLE_LINK: PreferencesDispatchAction.USE_SHAREABLE_LINK;
    UPDATE_ALTERNATE_CONTACT_NAMES: PreferencesDispatchAction.UPDATE_ALTERNATE_CONTACT_NAMES;
    LOCKOUT_UPDATED: LockoutDispatchAction.LOCKOUT_UPDATED;
    ATTEMPT_UPDATED: LoginAttemptDispatchAction.ATTEMPT_UPDATED;
    ONBOARDING_UPDATED: OnboardingDispatchAction.ONBOARDING_UPDATED;
    DID_SEE_PREFACE: OnboardingDispatchAction.DID_SEE_PREFACE;
    DID_COMPLETE_TUTORIAL: OnboardingDispatchAction.DID_COMPLETE_TUTORIAL;
    DID_AGREE_TO_TERMS: OnboardingDispatchAction.DID_AGREE_TO_TERMS;
    DID_CREATE_PIN: OnboardingDispatchAction.DID_CREATE_PIN;
    DID_NAME_WALLET: OnboardingDispatchAction.DID_NAME_WALLET;
    DID_COMPLETE_ONBOARDING: OnboardingDispatchAction.DID_COMPLETE_ONBOARDING;
    ONBOARDING_VERSION: OnboardingDispatchAction.ONBOARDING_VERSION;
    SET_POST_AUTH_SCREENS: OnboardingDispatchAction.SET_POST_AUTH_SCREENS;
    STATE_DISPATCH: StateDispatchAction.STATE_DISPATCH;
    STATE_LOADED: StateDispatchAction.STATE_LOADED;
};
export interface ReducerAction<R> {
    type: R;
    payload?: Array<any>;
}
export declare const reducer: <S extends State>(state: S, action: ReducerAction<DispatchAction>) => S;
export default reducer;
//# sourceMappingURL=store.d.ts.map