"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _native = require("@react-navigation/native");
var _stack = require("@react-navigation/stack");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _constants = require("../constants");
var _containerApi = require("../container-api");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _useOnboardingState = require("../hooks/useOnboardingState");
var _AttemptLockout = _interopRequireDefault(require("../screens/AttemptLockout"));
var _NameWallet = _interopRequireDefault(require("../screens/NameWallet"));
var _OnboardingPages = require("../screens/OnboardingPages");
var _PINCreate = _interopRequireDefault(require("../screens/PINCreate"));
var _PINEnter = _interopRequireDefault(require("../screens/PINEnter"));
var _PushNotifications = _interopRequireDefault(require("../screens/PushNotifications"));
var _defaultStackOptions = require("./defaultStackOptions");
var _OnboardingScreens = require("./OnboardingScreens");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/no-non-null-assertion */
const OnboardingStack = ({
  initializeAgent,
  agent
}) => {
  const [store, dispatch] = (0, _store2.useStore)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const Stack = (0, _stack.createStackNavigator)();
  const theme = (0, _theme.useTheme)();
  const OnboardingTheme = theme.OnboardingTheme;
  const carousel = (0, _OnboardingPages.createCarouselStyle)(OnboardingTheme);
  const [config, Splash, pages, Biometry, Onboarding, {
    screen: Terms,
    version: termsVersion
  }, onTutorialCompletedCurried, ScreenOptionsDictionary, Preface, UpdateAvailable, versionMonitor, generateOnboardingWorkflowSteps] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG, _containerApi.TOKENS.SCREEN_SPLASH, _containerApi.TOKENS.SCREEN_ONBOARDING_PAGES, _containerApi.TOKENS.SCREEN_BIOMETRY, _containerApi.TOKENS.SCREEN_ONBOARDING, _containerApi.TOKENS.SCREEN_TERMS, _containerApi.TOKENS.FN_ONBOARDING_DONE, _containerApi.TOKENS.OBJECT_SCREEN_CONFIG, _containerApi.TOKENS.SCREEN_PREFACE, _containerApi.TOKENS.SCREEN_UPDATE_AVAILABLE, _containerApi.TOKENS.UTIL_APP_VERSION_MONITOR, _containerApi.TOKENS.ONBOARDING]);
  const defaultStackOptions = (0, _defaultStackOptions.useDefaultStackOptions)(theme);
  const navigation = (0, _native.useNavigation)();
  const onTutorialCompleted = onTutorialCompletedCurried(dispatch, navigation);
  const currentRoute = (0, _native.useNavigationState)(state => state === null || state === void 0 ? void 0 : state.routes[state === null || state === void 0 ? void 0 : state.index]);
  const {
    disableOnboardingSkip
  } = config;
  const {
    onboardingState,
    activeScreen
  } = (0, _useOnboardingState.useOnboardingState)(store, config, Number(termsVersion), agent, generateOnboardingWorkflowSteps);
  (0, _react.useEffect)(() => {
    var _versionMonitor$check;
    versionMonitor === null || versionMonitor === void 0 || (_versionMonitor$check = versionMonitor.checkForUpdate) === null || _versionMonitor$check === void 0 || _versionMonitor$check.call(versionMonitor).then(versionInfo => {
      dispatch({
        type: _store.DispatchAction.SET_VERSION_INFO,
        payload: [versionInfo]
      });
    });
  }, [versionMonitor, dispatch]);
  const onAuthenticated = (0, _react.useCallback)(status => {
    if (!status) {
      return;
    }
    dispatch({
      type: _store.DispatchAction.DID_AUTHENTICATE
    });
  }, [dispatch]);
  const SplashScreen = (0, _react.useCallback)(() => {
    return /*#__PURE__*/_react.default.createElement(Splash, {
      initializeAgent: initializeAgent
    });
  }, [Splash, initializeAgent]);
  const UpdateAvailableScreen = (0, _react.useCallback)(() => {
    var _config$appUpdateConf, _config$appUpdateConf2;
    return /*#__PURE__*/_react.default.createElement(UpdateAvailable, {
      appleAppStoreUrl: (_config$appUpdateConf = config.appUpdateConfig) === null || _config$appUpdateConf === void 0 ? void 0 : _config$appUpdateConf.appleAppStoreUrl,
      googlePlayStoreUrl: (_config$appUpdateConf2 = config.appUpdateConfig) === null || _config$appUpdateConf2 === void 0 ? void 0 : _config$appUpdateConf2.googlePlayStoreUrl
    });
  }, [UpdateAvailable, config.appUpdateConfig]);
  const OnboardingScreen = (0, _react.useCallback)(() => {
    return /*#__PURE__*/_react.default.createElement(Onboarding, {
      nextButtonText: t('Global.Next'),
      previousButtonText: t('Global.Back'),
      disableSkip: disableOnboardingSkip,
      pages: pages(onTutorialCompleted, OnboardingTheme),
      style: carousel
    });
  }, [Onboarding, OnboardingTheme, carousel, disableOnboardingSkip, onTutorialCompleted, pages, t]);

  // These need to be in the children of the stack screen otherwise they
  // will unmount/remount which resets the component state in memory and causes
  // issues
  const CreatePINScreen = (0, _react.useCallback)(props => {
    return /*#__PURE__*/_react.default.createElement(_PINCreate.default, _extends({
      setAuthenticated: onAuthenticated
    }, props));
  }, [onAuthenticated]);
  const EnterPINScreen = (0, _react.useCallback)(props => {
    return /*#__PURE__*/_react.default.createElement(_PINEnter.default, _extends({
      setAuthenticated: onAuthenticated
    }, props));
  }, [onAuthenticated]);
  (0, _react.useEffect)(() => {
    // If the active screen is the same as the current route, then we don't
    // need to do anything.
    if (activeScreen && activeScreen === (currentRoute === null || currentRoute === void 0 ? void 0 : currentRoute.name)) {
      return;
    }

    // If the active screen is different from the current route, then we need
    // to navigate to the active screen.
    if (activeScreen) {
      navigation.dispatch(_native.StackActions.replace(activeScreen));
      return;
    }

    // Nothing to do here, we are done with onboarding.
    _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.DID_COMPLETE_ONBOARDING);
  }, [activeScreen, currentRoute, onboardingState, navigation]);
  const screens = (0, _react.useMemo)(() => (0, _OnboardingScreens.getOnboardingScreens)(t, ScreenOptionsDictionary, {
    SplashScreen,
    Preface,
    UpdateAvailableScreen,
    Terms,
    NameWallet: _NameWallet.default,
    Biometry,
    PushNotifications: _PushNotifications.default,
    AttemptLockout: _AttemptLockout.default,
    OnboardingScreen,
    CreatePINScreen,
    EnterPINScreen
  }), [SplashScreen, CreatePINScreen, EnterPINScreen, OnboardingScreen, Preface, Terms, Biometry, t, ScreenOptionsDictionary, UpdateAvailableScreen]);
  return /*#__PURE__*/_react.default.createElement(Stack.Navigator, {
    initialRouteName: activeScreen,
    screenOptions: {
      ...defaultStackOptions
    }
  }, screens.map(item => {
    return /*#__PURE__*/_react.default.createElement(Stack.Screen, _extends({
      key: item.name
    }, item));
  }));
};
var _default = exports.default = OnboardingStack;
//# sourceMappingURL=OnboardingStack.js.map