"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.default = exports.DispatchAction = void 0;
var _reactNativeConfig = _interopRequireDefault(require("react-native-config"));
var _constants = require("../../constants");
var _keychain = require("../../services/keychain");
var _storage = require("../../services/storage");
var _helpers = require("../../utils/helpers");
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var StateDispatchAction = /*#__PURE__*/function (StateDispatchAction) {
  StateDispatchAction["STATE_DISPATCH"] = "state/stateDispatch";
  return StateDispatchAction;
}(StateDispatchAction || {});
var OnboardingDispatchAction = /*#__PURE__*/function (OnboardingDispatchAction) {
  OnboardingDispatchAction["ONBOARDING_UPDATED"] = "onboarding/onboardingStateLoaded";
  OnboardingDispatchAction["DID_SEE_PREFACE"] = "onboarding/didSeePreface";
  OnboardingDispatchAction["DID_COMPLETE_TUTORIAL"] = "onboarding/didCompleteTutorial";
  OnboardingDispatchAction["DID_AGREE_TO_TERMS"] = "onboarding/didAgreeToTerms";
  OnboardingDispatchAction["DID_CREATE_PIN"] = "onboarding/didCreatePIN";
  OnboardingDispatchAction["DID_CONFIRM_PIN"] = "onboarding.didConfirmPIN";
  OnboardingDispatchAction["DID_NAME_WALLET"] = "onboarding/didNameWallet";
  OnboardingDispatchAction["DID_COMPLETE_ONBOARDING"] = "onboarding/didCompleteOnboarding";
  OnboardingDispatchAction["ONBOARDING_VERSION"] = "onboarding/onboardingVersion";
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
  PreferencesDispatchAction["USE_DEV_VERIFIER_TEMPLATES"] = "preferences/useDevVerifierTemplates";
  PreferencesDispatchAction["ENABLE_WALLET_NAMING"] = "preferences/enableWalletNaming";
  PreferencesDispatchAction["UPDATE_WALLET_NAME"] = "preferences/updateWalletName";
  PreferencesDispatchAction["ACCEPT_DEV_CREDENTIALS"] = "preferences/acceptDevCredentials";
  PreferencesDispatchAction["USE_DATA_RETENTION"] = "preferences/useDataRetention";
  PreferencesDispatchAction["PREVENT_AUTO_LOCK"] = "preferences/preventAutoLock";
  PreferencesDispatchAction["USE_SHAREABLE_LINK"] = "preferences/useShareableLink";
  PreferencesDispatchAction["UPDATE_ALTERNATE_CONTACT_NAMES"] = "preferences/updateAlternateContactNames";
  PreferencesDispatchAction["AUTO_LOCK_TIME"] = "preferences/autoLockTime";
  PreferencesDispatchAction["SET_THEME"] = "preferences/setTheme";
  PreferencesDispatchAction["SET_SELECTED_MEDIATOR"] = "preferences/setSelectedMediator";
  PreferencesDispatchAction["ADD_AVAILABLE_MEDIATOR"] = "preferences/addAvailableMediator";
  PreferencesDispatchAction["RESET_MEDIATORS"] = "preferences/resetMediators";
  PreferencesDispatchAction["BANNER_MESSAGES"] = "preferences/bannerMessages";
  PreferencesDispatchAction["GENERIC_ERROR_MESSAGES"] = "preferences/genericErrorMessages";
  PreferencesDispatchAction["REMOVE_BANNER_MESSAGE"] = "REMOVE_BANNER_MESSAGE";
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
var AppStatusDispatchAction = /*#__PURE__*/function (AppStatusDispatchAction) {
  AppStatusDispatchAction["SET_VERSION_INFO"] = "appStatus/checkVersionUpdate";
  return AppStatusDispatchAction;
}(AppStatusDispatchAction || {});
const DispatchAction = exports.DispatchAction = {
  ...StateDispatchAction,
  ...OnboardingDispatchAction,
  ...LoginAttemptDispatchAction,
  ...LockoutDispatchAction,
  ...PreferencesDispatchAction,
  ...ToursDispatchAction,
  ...AuthenticationDispatchAction,
  ...DeepLinkDispatchAction,
  ...MigrationDispatchAction,
  ...AppStatusDispatchAction
};
const reducer = (state, action) => {
  switch (action.type) {
    case AppStatusDispatchAction.SET_VERSION_INFO:
      {
        const info = (action.payload || []).pop();
        const versionInfo = {
          ...state.versionInfo,
          ...info
        };
        return {
          ...state,
          versionInfo
        };
      }
    case StateDispatchAction.STATE_DISPATCH:
      {
        const newState = ((action === null || action === void 0 ? void 0 : action.payload) || []).pop();
        return {
          ...state,
          ...newState,
          stateLoaded: true
        };
      }
    case PreferencesDispatchAction.ENABLE_DEVELOPER_MODE:
      {
        const choice = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const preferences = {
          ...state.preferences,
          developerModeEnabled: choice
        };
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Onboarding, onboarding);
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Onboarding, onboarding);
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
        return newState;
      }
    case PreferencesDispatchAction.GENERIC_ERROR_MESSAGES:
      {
        const choice = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const preferences = {
          ...state.preferences,
          genericErrorMessages: choice
        };
        const newState = {
          ...state,
          preferences
        };
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
        return newState;
      }
    case PreferencesDispatchAction.PREFERENCES_UPDATED:
      {
        const preferences = ((action === null || action === void 0 ? void 0 : action.payload) || []).pop();
        // For older wallets that haven't explicitly named their wallet yet
        if (!preferences.walletName) {
          preferences.walletName = (0, _helpers.generateRandomWalletName)();
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
        return newState;
      }
    case PreferencesDispatchAction.PREVENT_AUTO_LOCK:
      {
        const choice = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? false;
        const preferences = {
          ...state.preferences,
          preventAutoLock: choice
        };
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
        return newState;
      }
    case PreferencesDispatchAction.SET_THEME:
      {
        const theme = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? '';
        const preferences = {
          ...state.preferences,
          theme
        };
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
        return {
          ...state,
          preferences
        };
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Tours, tours);
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Tours, tours);
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Tours, tours);
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Tours, tours);
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Tours, tours);
        return newState;
      }
    case LoginAttemptDispatchAction.ATTEMPT_UPDATED:
      {
        const loginAttempt = ((action === null || action === void 0 ? void 0 : action.payload) || []).pop();
        const newState = {
          ...state,
          loginAttempt
        };
        (0, _keychain.storeLoginAttempt)(loginAttempt);
        return newState;
      }
    case LockoutDispatchAction.LOCKOUT_UPDATED:
      {
        const {
          displayNotification
        } = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? {
          displayNotification: false
        };
        const lockout = {
          ...state.lockout,
          displayNotification
        };
        return {
          ...state,
          lockout
        };
      }
    case PreferencesDispatchAction.AUTO_LOCK_TIME:
      {
        const autoLockTime = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? 5;
        const preferences = {
          ...state.preferences,
          autoLockTime
        };
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
        return {
          ...state,
          preferences
        };
      }
    case PreferencesDispatchAction.SET_SELECTED_MEDIATOR:
      {
        const selectedMediator = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? state.preferences.selectedMediator;
        const preferences = {
          ...state.preferences,
          selectedMediator
        };
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
        return {
          ...state,
          preferences
        };
      }
    case PreferencesDispatchAction.ADD_AVAILABLE_MEDIATOR:
      {
        const mediatorToAdd = ((action === null || action === void 0 ? void 0 : action.payload) ?? []).pop() ?? '';
        if (!state.preferences.availableMediators.includes(mediatorToAdd)) {
          const updatedAvailableMediators = [...state.preferences.availableMediators, mediatorToAdd];
          const preferences = {
            ...state.preferences,
            availableMediators: updatedAvailableMediators
          };
          _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
          return {
            ...state,
            preferences
          };
        }
        return state;
      }
    case PreferencesDispatchAction.RESET_MEDIATORS:
      {
        const preferences = {
          ...state.preferences,
          availableMediators: [_reactNativeConfig.default.MEDIATOR_URL],
          selectedMediator: _reactNativeConfig.default.MEDIATOR_URL
        };
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
        return {
          ...state,
          preferences
        };
      }
    case PreferencesDispatchAction.BANNER_MESSAGES:
      {
        const newBannerMessages = (action === null || action === void 0 ? void 0 : action.payload) ?? [];
        const allBannerMessages = [...state.preferences.bannerMessages, ...newBannerMessages];
        const uniqueBannerMessages = _lodash.default.uniqBy(allBannerMessages, 'id');

        // If there were no new unique messages, don't update state to avoid re-renders
        if (allBannerMessages.length !== uniqueBannerMessages.length) {
          return state;
        }
        const preferences = {
          ...state.preferences,
          bannerMessages: uniqueBannerMessages
        };
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
        return {
          ...state,
          preferences
        };
      }
    case PreferencesDispatchAction.REMOVE_BANNER_MESSAGE:
      {
        const keysToRemove = (action === null || action === void 0 ? void 0 : action.payload) ?? [];
        const newBannerMessages = state.preferences.bannerMessages.filter(msg => !keysToRemove.includes(msg.id));
        const preferences = {
          ...state.preferences,
          bannerMessages: newBannerMessages
        };
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Preferences, preferences);
        return {
          ...state,
          preferences
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Onboarding, newState.onboarding);
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Onboarding, newState.onboarding);
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Onboarding, newState.onboarding);
        return newState;
      }
    case OnboardingDispatchAction.DID_COMPLETE_TUTORIAL:
      {
        var _ref;
        const payload = (_ref = (action === null || action === void 0 ? void 0 : action.payload) ?? []) === null || _ref === void 0 ? void 0 : _ref.pop();
        const onboarding = {
          ...state.onboarding,
          didCompleteTutorial: (payload === null || payload === void 0 ? void 0 : payload.didCompleteTutorial) ?? true
        };
        const newState = {
          ...state,
          onboarding
        };
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Onboarding, newState.onboarding);
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Onboarding, newState.onboarding);
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

        // Reset any login attempts and penalty in keychain
        // Since the app is being reinstalled, we can erase the login attempts from keychain
        // in the previous installation
        const loginAttempt = {
          loginAttempts: 0,
          lockoutDate: undefined,
          servedPenalty: true
        };
        const newState = {
          ...state,
          onboarding,
          migration,
          loginAttempt
        };
        (0, _keychain.storeLoginAttempt)(loginAttempt);
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Onboarding, newState.onboarding);
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Migration, newState.migration);
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Onboarding, onboarding);
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
        _storage.PersistentStorage.storeValueForKey(_constants.LocalStorageKeys.Migration, newState.migration);
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
        const didAuthenticate = ((action === null || action === void 0 ? void 0 : action.payload) || []).pop() ?? true;
        const authentication = {
          didAuthenticate
        };
        return {
          ...state,
          authentication
        };
      }
    case DeepLinkDispatchAction.ACTIVE_DEEP_LINK:
      {
        const value = ((action === null || action === void 0 ? void 0 : action.payload) || []).pop();
        return {
          ...state,
          deepLink: value
        };
      }
    default:
      return state;
  }
};
exports.reducer = reducer;
var _default = exports.default = reducer;
//# sourceMappingURL=store.js.map