import React, { createContext, useContext, useReducer } from 'react';
import { generateRandomWalletName } from '../utils/helpers';
import _defaultReducer from './reducers/store';
export const defaultState = {
  onboarding: {
    didSeePreface: false,
    didAgreeToTerms: false,
    didCompleteTutorial: false,
    didCreatePIN: false,
    didConsiderPushNotifications: false,
    didConsiderBiometry: false,
    didNameWallet: false,
    onboardingVersion: 0,
    didCompleteOnboarding: false,
    postAuthScreens: []
  },
  authentication: {
    didAuthenticate: false
  },
  // NOTE: from Credo 0.4.0 on we use Aries Askar. New wallets will be created with Askar from the start
  // which we will know when we create the pin while using askar as a dependency.
  migration: {
    didMigrateToAskar: false
  },
  loginAttempt: {
    loginAttempts: 0,
    servedPenalty: true
  },
  lockout: {
    displayNotification: false
  },
  preferences: {
    developerModeEnabled: false,
    biometryPreferencesUpdated: false,
    useBiometry: false,
    usePushNotifications: false,
    useVerifierCapability: false,
    useConnectionInviterCapability: false,
    useHistoryCapability: false,
    useDevVerifierTemplates: false,
    acceptDevCredentials: false,
    useDataRetention: true,
    enableWalletNaming: false,
    walletName: generateRandomWalletName(),
    preventAutoLock: false,
    enableShareableLink: false,
    alternateContactNames: {}
  },
  tours: {
    seenToursPrompt: false,
    enableTours: true,
    seenHomeTour: false,
    seenCredentialsTour: false,
    seenCredentialOfferTour: false,
    seenProofRequestTour: false
  },
  loading: false,
  stateLoaded: false
};
export const StoreContext = /*#__PURE__*/createContext([defaultState, () => {
  return;
}]);
export const mergeReducers = (a, b) => {
  return (state, action) => {
    return a(b(state, action), action);
  };
};
export const defaultReducer = _defaultReducer;
export const StoreProvider = ({
  children,
  initialState,
  reducer
}) => {
  const _reducer = reducer ?? defaultReducer;
  const _state = initialState ?? defaultState;
  const [state, dispatch] = useReducer(_reducer, _state);
  return /*#__PURE__*/React.createElement(StoreContext.Provider, {
    value: [state, dispatch]
  }, children);
};
export const useStore = () => {
  const context = useContext(StoreContext);
  return context;
};
//# sourceMappingURL=store.js.map