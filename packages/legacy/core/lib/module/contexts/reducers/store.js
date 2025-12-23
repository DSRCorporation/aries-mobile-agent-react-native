import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalStorageKeys } from '../../constants';
import { storeLoginAttempt } from '../../services/keychain';
import { generateRandomWalletName } from '../../utils/helpers';
var StateDispatchAction = /*#__PURE__*/function (StateDispatchAction) {
  StateDispatchAction["STATE_DISPATCH"] = "state/stateDispatch";
  StateDispatchAction["STATE_LOADED"] = "state/stateLoaded";
  return StateDispatchAction;
}(StateDispatchAction || {});
var OnboardingDispatchAction = /*#__PURE__*/function (OnboardingDispatchAction) {
  OnboardingDispatchAction["ONBOARDING_UPDATED"] = "onboarding/onboardingStateLoaded";
  OnboardingDispatchAction["DID_SEE_PREFACE"] = "onboarding/didSeePreface";
  OnboardingDispatchAction["DID_COMPLETE_TUTORIAL"] = "onboarding/didCompleteTutorial";
  OnboardingDispatchAction["DID_AGREE_TO_TERMS"] = "onboarding/didAgreeToTerms";
  OnboardingDispatchAction["DID_CREATE_PIN"] = "onboarding/didCreatePIN";
  OnboardingDispatchAction["DID_NAME_WALLET"] = "onboarding/didNameWallet";
  OnboardingDispatchAction["DID_COMPLETE_ONBOARDING"] = "onboarding/didCompleteOnboarding";
  OnboardingDispatchAction["ONBOARDING_VERSION"] = "onboarding/onboardingVersion";
  OnboardingDispatchAction["SET_POST_AUTH_SCREENS"] = "onboarding/postAuthScreens";
  return OnboardingDispatchAction;
}(OnboardingDispatchAction || {});
var MigrationDispatchAction = /*#__PURE__*/function (MigrationDispatchAction) {
  MigrationDispatchAction["DID_MIGRATE_TO_ASKAR"] = "migration/didMigrateToAskar";
  MigrationDispatchAction["MIGRATION_UPDATED"] = "migration/migrationStateLoaded";
  return MigrationDispatchAction;
}(MigrationDispatchAction || {});
var LockoutDispatchAction = /*#__PURE__*/function (LockoutDispatchAction) {
  LockoutDispatchAction["LOCKOUT_UPDATED"] = "lockout/lockoutUpdated";
  return LockoutDispatchAction;
}(LockoutDispatchAction || {});
var LoginAttemptDispatchAction = /*#__PURE__*/function (LoginAttemptDispatchAction) {
  LoginAttemptDispatchAction["ATTEMPT_UPDATED"] = "loginAttempt/loginAttemptUpdated";
  return LoginAttemptDispatchAction;
}(LoginAttemptDispatchAction || {});
var PreferencesDispatchAction = /*#__PURE__*/function (PreferencesDispatchAction) {
  PreferencesDispatchAction["ENABLE_DEVELOPER_MODE"] = "preferences/enableDeveloperMode";
  PreferencesDispatchAction["USE_BIOMETRY"] = "preferences/useBiometry";
  PreferencesDispatchAction["USE_PUSH_NOTIFICATIONS"] = "preferences/usePushNotifications";
  PreferencesDispatchAction["PREFERENCES_UPDATED"] = "preferences/preferencesStateLoaded";
  PreferencesDispatchAction["USE_VERIFIER_CAPABILITY"] = "preferences/useVerifierCapability";
  PreferencesDispatchAction["USE_CONNECTION_INVITER_CAPABILITY"] = "preferences/useConnectionInviterCapability";
  PreferencesDispatchAction["HISTORY_CAPABILITY"] = "preferences/historyCapability";
  PreferencesDispatchAction["USE_DEV_VERIFIER_TEMPLATES"] = "preferences/useDevVerifierTemplates";
  PreferencesDispatchAction["ENABLE_WALLET_NAMING"] = "preferences/enableWalletNaming";
  PreferencesDispatchAction["UPDATE_WALLET_NAME"] = "preferences/updateWalletName";
  PreferencesDispatchAction["ACCEPT_DEV_CREDENTIALS"] = "preferences/acceptDevCredentials";
  PreferencesDispatchAction["USE_DATA_RETENTION"] = "preferences/useDataRetention";
  PreferencesDispatchAction["PREVENT_AUTO_LOCK"] = "preferences/preventAutoLock";
  PreferencesDispatchAction["USE_SHAREABLE_LINK"] = "preferences/useShareableLink";
  PreferencesDispatchAction["UPDATE_ALTERNATE_CONTACT_NAMES"] = "preferences/updateAlternateContactNames";
  return PreferencesDispatchAction;
}(PreferencesDispatchAction || {});
var ToursDispatchAction = /*#__PURE__*/function (ToursDispatchAction) {
  ToursDispatchAction["TOUR_DATA_UPDATED"] = "tours/tourDataUpdated";
  ToursDispatchAction["UPDATE_SEEN_TOUR_PROMPT"] = "tours/seenTourPrompt";
  ToursDispatchAction["ENABLE_TOURS"] = "tours/enableTours";
  ToursDispatchAction["UPDATE_SEEN_HOME_TOUR"] = "tours/seenHomeTour";
  ToursDispatchAction["UPDATE_SEEN_CREDENTIALS_TOUR"] = "tours/seenCredentialsTour";
  ToursDispatchAction["UPDATE_SEEN_CREDENTIAL_OFFER_TOUR"] = "tours/seenCredentialOfferTour";
  ToursDispatchAction["UPDATE_SEEN_PROOF_REQUEST_TOUR"] = "tours/seenProofRequestTour";
  return ToursDispatchAction;
}(ToursDispatchAction || {});
var AuthenticationDispatchAction = /*#__PURE__*/function (AuthenticationDispatchAction) {
  AuthenticationDispatchAction["DID_AUTHENTICATE"] = "authentication/didAuthenticate";
  return AuthenticationDispatchAction;
}(AuthenticationDispatchAction || {});
var DeepLinkDispatchAction = /*#__PURE__*/function (DeepLinkDispatchAction) {
  DeepLinkDispatchAction["ACTIVE_DEEP_LINK"] = "deepLink/activeDeepLink";
  return DeepLinkDispatchAction;
}(DeepLinkDispatchAction || {});
export const DispatchAction = {
  ...StateDispatchAction,
  ...OnboardingDispatchAction,
  ...LoginAttemptDispatchAction,
  ...LockoutDispatchAction,
  ...PreferencesDispatchAction,
  ...ToursDispatchAction,
  ...AuthenticationDispatchAction,
  ...DeepLinkDispatchAction,
  ...MigrationDispatchAction
};
export const reducer = (state, action) => {
  switch (action.type) {
    case StateDispatchAction.STATE_LOADED:
      {
        return {
          ...state,
          stateLoaded: true
        };
      }
    case StateDispatchAction.STATE_DISPATCH:
      {
        const newState = ((action === null || action === void 0 ? void 0 : action.payload) || []).pop();
        return {
          ...state,
          ...newState
        };
      }
    case PreferencesDispatchAction.ENABLE_DEVELOPER_MODE:
      {
        const choice = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const preferences = {
          ...state.preferences,
          developerModeEnabled: choice
        };
        AsyncStorage.setItem(LocalStorageKeys.Preferences, JSON.stringify(preferences));
        return {
          ...state,
          preferences
        };
      }
    case PreferencesDispatchAction.USE_BIOMETRY:
      {
        const choice = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const preferences = {
          ...state.preferences,
          useBiometry: choice
        };
        const onboarding = {
          ...state.onboarding,
          didConsiderBiometry: true
        };
        const newState = {
          ...state,
          onboarding,
          preferences
        };
        AsyncStorage.setItem(LocalStorageKeys.Onboarding, JSON.stringify(onboarding));
        AsyncStorage.setItem(LocalStorageKeys.Preferences, JSON.stringify(preferences));
        return newState;
      }
    case PreferencesDispatchAction.USE_PUSH_NOTIFICATIONS:
      {
        const choice = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const preferences = {
          ...state.preferences,
          usePushNotifications: choice
        };
        const onboarding = {
          ...state.onboarding,
          didConsiderPushNotifications: true
        };
        const newState = {
          ...state,
          onboarding,
          preferences
        };
        AsyncStorage.setItem(LocalStorageKeys.Onboarding, JSON.stringify(onboarding));
        AsyncStorage.setItem(LocalStorageKeys.Preferences, JSON.stringify(preferences));
        return newState;
      }
    case PreferencesDispatchAction.USE_VERIFIER_CAPABILITY:
      {
        const choice = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const preferences = {
          ...state.preferences,
          useVerifierCapability: choice
        };
        const newState = {
          ...state,
          preferences
        };
        AsyncStorage.setItem(LocalStorageKeys.Preferences, JSON.stringify(preferences));
        return newState;
      }
    case PreferencesDispatchAction.USE_CONNECTION_INVITER_CAPABILITY:
      {
        const choice = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const preferences = {
          ...state.preferences,
          useConnectionInviterCapability: choice
        };
        const newState = {
          ...state,
          preferences
        };
        AsyncStorage.setItem(LocalStorageKeys.Preferences, JSON.stringify(preferences));
        return newState;
      }
    case PreferencesDispatchAction.HISTORY_CAPABILITY:
      {
        const choice = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const preferences = {
          ...state.preferences,
          useHistoryCapability: choice
        };
        const newState = {
          ...state,
          preferences
        };
        AsyncStorage.setItem(LocalStorageKeys.Preferences, JSON.stringify(preferences));
        return newState;
      }
    case PreferencesDispatchAction.USE_DEV_VERIFIER_TEMPLATES:
      {
        const choice = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const preferences = {
          ...state.preferences,
          useDevVerifierTemplates: choice
        };
        const newState = {
          ...state,
          preferences
        };
        AsyncStorage.setItem(LocalStorageKeys.Preferences, JSON.stringify(preferences));
        return newState;
      }
    case PreferencesDispatchAction.ACCEPT_DEV_CREDENTIALS:
      {
        const choice = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const preferences = {
          ...state.preferences,
          acceptDevCredentials: choice
        };
        const newState = {
          ...state,
          preferences
        };
        AsyncStorage.setItem(LocalStorageKeys.Preferences, JSON.stringify(preferences));
        return newState;
      }
    case PreferencesDispatchAction.USE_DATA_RETENTION:
      {
        const choice = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const preferences = {
          ...state.preferences,
          useDataRetention: choice
        };
        const newState = {
          ...state,
          preferences
        };
        AsyncStorage.setItem(LocalStorageKeys.Preferences, JSON.stringify(preferences));
        return newState;
      }
    case PreferencesDispatchAction.PREFERENCES_UPDATED:
      {
        const preferences = ((action === null || action === void 0 ? void 0 : action.payload) || []).pop();
        // For older wallets that haven't explicitly named their wallet yet
        if (!preferences.walletName) {
          preferences.walletName = generateRandomWalletName();
        }
        // For older wallets initialized before data retention option was created
        if (preferences.useDataRetention === undefined) {
          preferences.useDataRetention = true;
        }
        if (!preferences.alternateContactNames) {
          preferences.alternateContactNames = {};
        }
        return {
          ...state,
          preferences
        };
      }
    case PreferencesDispatchAction.ENABLE_WALLET_NAMING:
      {
        const choice = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const preferences = {
          ...state.preferences,
          enableWalletNaming: choice
        };
        AsyncStorage.setItem(LocalStorageKeys.Preferences, JSON.stringify(preferences));
        return {
          ...state,
          preferences
        };
      }
    case PreferencesDispatchAction.UPDATE_WALLET_NAME:
      {
        // We should never see 'My Wallet - 123', that's just there to let us know something went wrong while saving the wallet name
        const name = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? 'My Wallet - 123';
        const preferences = {
          ...state.preferences,
          walletName: name
        };
        const newState = {
          ...state,
          preferences
        };
        AsyncStorage.setItem(LocalStorageKeys.Preferences, JSON.stringify(preferences));
        return newState;
      }
    case PreferencesDispatchAction.PREVENT_AUTO_LOCK:
      {
        const choice = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const preferences = {
          ...state.preferences,
          preventAutoLock: choice
        };
        AsyncStorage.setItem(LocalStorageKeys.Preferences, JSON.stringify(preferences));
        return {
          ...state,
          preferences
        };
      }
    case PreferencesDispatchAction.USE_SHAREABLE_LINK:
      {
        const choice = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const preferences = {
          ...state.preferences,
          enableShareableLink: choice
        };
        AsyncStorage.setItem(LocalStorageKeys.Preferences, JSON.stringify(preferences));
        return {
          ...state,
          preferences
        };
      }
    case PreferencesDispatchAction.UPDATE_ALTERNATE_CONTACT_NAMES:
      {
        const idNamePair = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? {};
        const preferences = {
          ...state.preferences,
          alternateContactNames: {
            ...state.preferences.alternateContactNames,
            ...idNamePair
          }
        };
        const newState = {
          ...state,
          preferences
        };
        AsyncStorage.setItem(LocalStorageKeys.Preferences, JSON.stringify(preferences));
        return newState;
      }
    case ToursDispatchAction.UPDATE_SEEN_TOUR_PROMPT:
      {
        const seenToursPrompt = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const tours = {
          ...state.tours,
          seenToursPrompt
        };
        const newState = {
          ...state,
          tours
        };
        return newState;
      }
    case ToursDispatchAction.TOUR_DATA_UPDATED:
      {
        const tourData = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? {};
        const tours = {
          ...state.tours,
          ...tourData
        };
        const newState = {
          ...state,
          tours
        };
        return newState;
      }
    case ToursDispatchAction.ENABLE_TOURS:
      {
        const enableTours = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const tours = {
          ...state.tours
        };
        if (enableTours) {
          tours.enableTours = enableTours;
          tours.seenHomeTour = false;
          tours.seenCredentialsTour = false;
          tours.seenCredentialOfferTour = false;
          tours.seenProofRequestTour = false;
        } else {
          tours.enableTours = enableTours;
        }
        const newState = {
          ...state,
          tours
        };
        AsyncStorage.setItem(LocalStorageKeys.Tours, JSON.stringify(tours));
        return newState;
      }
    case ToursDispatchAction.UPDATE_SEEN_HOME_TOUR:
      {
        const seenHomeTour = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const tours = {
          ...state.tours,
          seenHomeTour
        };
        if (seenHomeTour && tours.seenCredentialsTour && tours.seenCredentialOfferTour && tours.seenProofRequestTour) {
          tours.enableTours = false;
        }
        const newState = {
          ...state,
          tours
        };
        AsyncStorage.setItem(LocalStorageKeys.Tours, JSON.stringify(tours));
        return newState;
      }
    case ToursDispatchAction.UPDATE_SEEN_CREDENTIALS_TOUR:
      {
        const seenCredentialsTour = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const tours = {
          ...state.tours,
          seenCredentialsTour
        };
        if (seenCredentialsTour && tours.seenHomeTour && tours.seenCredentialOfferTour && tours.seenProofRequestTour) {
          tours.enableTours = false;
        }
        const newState = {
          ...state,
          tours
        };
        AsyncStorage.setItem(LocalStorageKeys.Tours, JSON.stringify(tours));
        return newState;
      }
    case ToursDispatchAction.UPDATE_SEEN_CREDENTIAL_OFFER_TOUR:
      {
        const seenCredentialOfferTour = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const tours = {
          ...state.tours,
          seenCredentialOfferTour
        };
        if (seenCredentialOfferTour && tours.seenHomeTour && tours.seenCredentialsTour && tours.seenProofRequestTour) {
          tours.enableTours = false;
        }
        const newState = {
          ...state,
          tours
        };
        AsyncStorage.setItem(LocalStorageKeys.Tours, JSON.stringify(tours));
        return newState;
      }
    case ToursDispatchAction.UPDATE_SEEN_PROOF_REQUEST_TOUR:
      {
        const seenProofRequestTour = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const tours = {
          ...state.tours,
          seenProofRequestTour
        };
        if (seenProofRequestTour && tours.seenHomeTour && tours.seenCredentialOfferTour && tours.seenCredentialsTour) {
          tours.enableTours = false;
        }
        const newState = {
          ...state,
          tours
        };
        AsyncStorage.setItem(LocalStorageKeys.Tours, JSON.stringify(tours));
        return newState;
      }
    case LoginAttemptDispatchAction.ATTEMPT_UPDATED:
      {
        const loginAttempt = ((action === null || action === void 0 ? void 0 : action.payload) || []).pop();
        const newState = {
          ...state,
          loginAttempt
        };
        storeLoginAttempt(loginAttempt);
        return newState;
      }
    case LockoutDispatchAction.LOCKOUT_UPDATED:
      {
        const lockout = ((action === null || action === void 0 ? void 0 : action.payload) || []).pop();
        return {
          ...state,
          lockout
        };
      }
    case OnboardingDispatchAction.ONBOARDING_VERSION:
      {
        const version = ((action === null || action === void 0 ? void 0 : action.payload) || []).pop();
        const onboarding = {
          ...state.onboarding,
          onboardingVersion: version
        };
        const newState = {
          ...state,
          onboarding
        };
        AsyncStorage.setItem(LocalStorageKeys.Onboarding, JSON.stringify(newState.onboarding));
        return newState;
      }
    case OnboardingDispatchAction.DID_COMPLETE_ONBOARDING:
      {
        const onboarding = {
          ...state.onboarding,
          didCompleteOnboarding: true
        };
        const newState = {
          ...state,
          onboarding
        };
        AsyncStorage.setItem(LocalStorageKeys.Onboarding, JSON.stringify(newState.onboarding));
        return newState;
      }
    case OnboardingDispatchAction.ONBOARDING_UPDATED:
      {
        const onboarding = ((action === null || action === void 0 ? void 0 : action.payload) || []).pop();
        return {
          ...state,
          onboarding
        };
      }
    case OnboardingDispatchAction.DID_SEE_PREFACE:
      {
        const onboarding = {
          ...state.onboarding,
          didSeePreface: true
        };
        const newState = {
          ...state,
          onboarding
        };
        AsyncStorage.setItem(LocalStorageKeys.Onboarding, JSON.stringify(newState.onboarding));
        return newState;
      }
    case OnboardingDispatchAction.DID_COMPLETE_TUTORIAL:
      {
        const onboarding = {
          ...state.onboarding,
          didCompleteTutorial: true
        };
        const newState = {
          ...state,
          onboarding
        };
        AsyncStorage.setItem(LocalStorageKeys.Onboarding, JSON.stringify(newState.onboarding));
        return newState;
      }
    case OnboardingDispatchAction.DID_AGREE_TO_TERMS:
      {
        const terms = ((action === null || action === void 0 ? void 0 : action.payload) || []).pop();
        const version = terms === null || terms === void 0 ? void 0 : terms.DidAgreeToTerms;
        const onboarding = {
          ...state.onboarding,
          didAgreeToTerms: version ?? true
        };
        const newState = {
          ...state,
          onboarding
        };
        AsyncStorage.setItem(LocalStorageKeys.Onboarding, JSON.stringify(newState.onboarding));
        return newState;
      }
    case OnboardingDispatchAction.DID_CREATE_PIN:
      {
        const onboarding = {
          ...state.onboarding,
          didCreatePIN: true
        };
        // If the pin is created with this version (that includes Askar), we
        // we can assume that a wallet using Indy SDK was never created. This
        // allows us to skip the migration step. For wallets initialized using
        // the indy sdk this won't be called, so the migration will be performed
        const migration = {
          ...state.migration,
          didMigrateToAskar: true
        };
        const newState = {
          ...state,
          onboarding,
          migration
        };
        AsyncStorage.setItem(LocalStorageKeys.Onboarding, JSON.stringify(newState.onboarding));
        AsyncStorage.setItem(LocalStorageKeys.Migration, JSON.stringify(newState.migration));
        return newState;
      }
    case OnboardingDispatchAction.DID_NAME_WALLET:
      {
        const onboarding = {
          ...state.onboarding,
          didNameWallet: true
        };
        const newState = {
          ...state,
          onboarding
        };
        AsyncStorage.setItem(LocalStorageKeys.Onboarding, JSON.stringify(onboarding));
        return newState;
      }
    case OnboardingDispatchAction.SET_POST_AUTH_SCREENS:
      {
        const value = ((action === null || action === void 0 ? void 0 : action.payload) || []).pop();
        const onboarding = {
          ...state.onboarding,
          postAuthScreens: value
        };
        const newState = {
          ...state,
          onboarding
        };
        return newState;
      }
    case MigrationDispatchAction.DID_MIGRATE_TO_ASKAR:
      {
        const migration = {
          ...state.migration,
          didMigrateToAskar: true
        };
        const newState = {
          ...state,
          migration
        };
        AsyncStorage.setItem(LocalStorageKeys.Migration, JSON.stringify(newState.migration));
        return newState;
      }
    case MigrationDispatchAction.MIGRATION_UPDATED:
      {
        const migration = ((action === null || action === void 0 ? void 0 : action.payload) || []).pop();
        return {
          ...state,
          migration
        };
      }
    case AuthenticationDispatchAction.DID_AUTHENTICATE:
      {
        const value = ((action === null || action === void 0 ? void 0 : action.payload) || []).pop();
        const payload = value ?? {
          didAuthenticate: true
        };
        const newState = {
          ...state,
          ...{
            authentication: payload
          }
        };
        return newState;
      }
    case DeepLinkDispatchAction.ACTIVE_DEEP_LINK:
      {
        const value = ((action === null || action === void 0 ? void 0 : action.payload) || []).pop();
        return {
          ...state,
          ...{
            deepLink: value
          }
        };
      }
    default:
      return state;
  }
};
export default reducer;
//# sourceMappingURL=store.js.map