"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stack = require("@react-navigation/stack");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _constants = require("../constants");
var _theme = require("../contexts/theme");
var _HistorySettings = _interopRequireDefault(require("../modules/history/ui/HistorySettings"));
var _DataRetention = _interopRequireDefault(require("../screens/DataRetention"));
var _NameWallet = _interopRequireDefault(require("../screens/NameWallet"));
var _OnboardingPages = require("../screens/OnboardingPages");
var _PushNotification = _interopRequireDefault(require("../screens/PushNotification"));
var _Tours = _interopRequireDefault(require("../screens/Tours"));
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
var _defaultStackOptions = require("./defaultStackOptions");
var _containerApi = require("../container-api");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const SettingStack = () => {
  const Stack = (0, _stack.createStackNavigator)();
  const theme = (0, _theme.useTheme)();
  const [biometryUpdatePending, setBiometryUpdatePending] = (0, _react.useState)(false);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [pages, {
    screen: terms
  }, UseBiometry, developer, PINCreate, Settings, Language, Onboarding] = (0, _containerApi.useServices)([_containerApi.TOKENS.SCREEN_ONBOARDING_PAGES, _containerApi.TOKENS.SCREEN_TERMS, _containerApi.TOKENS.SCREEN_USE_BIOMETRY, _containerApi.TOKENS.SCREEN_DEVELOPER, _containerApi.TOKENS.SCREEN_PIN_CREATE, _containerApi.TOKENS.SCREEN_SETTINGS, _containerApi.TOKENS.SCREEN_LANGUAGE, _containerApi.TOKENS.SCREEN_ONBOARDING]);
  const defaultStackOptions = (0, _defaultStackOptions.useDefaultStackOptions)(theme);
  const OnboardingTheme = theme.OnboardingTheme;
  const carousel = (0, _OnboardingPages.createCarouselStyle)(OnboardingTheme);
  (0, _react.useEffect)(() => {
    const handleBiometry = _reactNative.DeviceEventEmitter.addListener(_constants.EventTypes.BIOMETRY_UPDATE, value => {
      setBiometryUpdatePending(value);
    });
    return () => {
      handleBiometry.remove();
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Settings,
    component: Settings,
    options: {
      title: t('Screens.Settings'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back')
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.NameWallet,
    component: _NameWallet.default,
    options: {
      title: t('Screens.NameWallet'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back')
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Language,
    component: Language,
    options: {
      title: t('Screens.Language'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back')
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.DataRetention,
    component: _DataRetention.default,
    options: {
      title: t('Screens.DataRetention'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back')
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Tours,
    component: _Tours.default,
    options: {
      title: t('Screens.Tours'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back')
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.UseBiometry,
    component: UseBiometry,
    options: {
      title: t('Screens.Biometry'),
      headerLeft: biometryUpdatePending ? () => null : undefined,
      headerBackTestID: (0, _testable.testIdWithKey)('Back')
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.CreatePIN,
    component: PINCreate,
    options: {
      title: t('Screens.ChangePIN'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back')
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.UsePushNotifications,
    component: _PushNotification.default,
    options: {
      title: t('Screens.UsePushNotifications'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back')
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Terms,
    component: terms,
    options: {
      title: t('Screens.Terms'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back')
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Developer,
    component: developer,
    options: {
      title: t('Screens.Developer'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back')
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Onboarding,
    options: {
      headerShown: false
    }
  }, props => /*#__PURE__*/_react.default.createElement(Onboarding, _extends({}, props, {
    nextButtonText: t('Global.Next'),
    previousButtonText: t('Global.Back'),
    pages: pages(() => null, OnboardingTheme),
    style: carousel,
    disableSkip: true
  }))), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.HistorySettings,
    component: _HistorySettings.default,
    options: {
      title: t('Screens.HistorySettings'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back')
    }
  }));
};
var _default = exports.default = SettingStack;
//# sourceMappingURL=SettingStack.js.map