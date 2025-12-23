"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStore = exports.mergeReducers = exports.defaultState = exports.defaultReducer = exports.StoreProvider = exports.StoreContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _helpers = require("../utils/helpers");
var _store = _interopRequireDefault(require("./reducers/store"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
    walletName: (0, _helpers.generateRandomWalletName)(),
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