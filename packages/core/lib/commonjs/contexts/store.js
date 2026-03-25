"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStore = exports.mergeReducers = exports.defaultState = exports.defaultReducer = exports.StoreProvider = exports.StoreContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _helpers = require("../utils/helpers");
var _store = _interopRequireDefault(require("./reducers/store"));
var _reactNativeConfig = _interopRequireDefault(require("react-native-config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const defaultState = exports.defaultState = {
  onboarding: {
    didSeePreface: false,
    didAgreeToTerms: false,
    didCompleteTutorial: false,
    didCreatePIN: false,
    didConsiderPushNotifications: false,
    didConsiderBiometry: false,
    didNameWallet: false,
    onboardingVersion: 0,
    didCompleteOnboarding: false
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
    useDevVerifierTemplates: false,
    acceptDevCredentials: false,
    useDataRetention: true,
    enableWalletNaming: false,
    walletName: (0, _helpers.generateRandomWalletName)(),
    preventAutoLock: false,
    enableShareableLink: false,
    alternateContactNames: {},
    autoLockTime: undefined,
    // default wallets lockout time to 5 minutes
    availableMediators: [_reactNativeConfig.default.MEDIATOR_URL ?? ''],
    selectedMediator: _reactNativeConfig.default.MEDIATOR_URL ?? '',
    bannerMessages: [],
    genericErrorMessages: true
  },
  tours: {
    seenToursPrompt: false,
    enableTours: true,
    seenHomeTour: false,
    seenCredentialsTour: false,
    seenCredentialOfferTour: false,
    seenProofRequestTour: false
  },
  stateLoaded: false,
  versionInfo: {
    needsUpdate: false,
    lastChecked: undefined,
    version: undefined
  }
};
const StoreContext = exports.StoreContext = /*#__PURE__*/(0, _react.createContext)([defaultState, () => {
  return;
}]);
const mergeReducers = (a, b) => {
  return (state, action) => {
    return a(b(state, action), action);
  };
};
exports.mergeReducers = mergeReducers;
const defaultReducer = exports.defaultReducer = _store.default;
const StoreProvider = ({
  children,
  initialState,
  reducer
}) => {
  const _reducer = reducer ?? defaultReducer;
  const _state = initialState ?? defaultState;
  const [state, dispatch] = (0, _react.useReducer)(_reducer, _state);
  return /*#__PURE__*/_react.default.createElement(StoreContext.Provider, {
    value: [state, dispatch]
  }, children);
};
exports.StoreProvider = StoreProvider;
const useStore = () => {
  const context = (0, _react.useContext)(StoreContext);
  return context;
};
exports.useStore = useStore;
//# sourceMappingURL=store.js.map