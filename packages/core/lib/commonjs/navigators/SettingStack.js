"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stack = require("@react-navigation/stack");
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _theme = require("../contexts/theme");
var _HistorySettings = _interopRequireDefault(require("../modules/history/ui/HistorySettings"));
var _DataRetention = _interopRequireDefault(require("../screens/DataRetention"));
var _Language = _interopRequireDefault(require("../screens/Language"));
var _RenameWallet = _interopRequireDefault(require("../screens/RenameWallet"));
var _Onboarding = _interopRequireDefault(require("../screens/Onboarding"));
var _OnboardingPages = require("../screens/OnboardingPages");
var _PINChange = _interopRequireDefault(require("../screens/PINChange"));
var _TogglePushNotifications = _interopRequireDefault(require("../screens/TogglePushNotifications"));
var _Settings = _interopRequireDefault(require("../screens/Settings"));
var _Tours = _interopRequireDefault(require("../screens/Tours"));
var _AutoLock = _interopRequireDefault(require("../screens/AutoLock"));
var _ConfigureMediator = _interopRequireDefault(require("../screens/ConfigureMediator"));
var _PINChangeSuccess = _interopRequireDefault(require("../screens/PINChangeSuccess"));
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
var _defaultStackOptions = require("./defaultStackOptions");
var _containerApi = require("../container-api");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SettingStack = () => {
  const Stack = (0, _stack.createStackNavigator)();
  const theme = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [pages, {
    screen: terms
  }, ToggleBiometry, developer, ScreenOptionsDictionary] = (0, _containerApi.useServices)([_containerApi.TOKENS.SCREEN_ONBOARDING_PAGES, _containerApi.TOKENS.SCREEN_TERMS, _containerApi.TOKENS.SCREEN_TOGGLE_BIOMETRY, _containerApi.TOKENS.SCREEN_DEVELOPER, _containerApi.TOKENS.OBJECT_SCREEN_CONFIG]);
  const defaultStackOptions = (0, _defaultStackOptions.useDefaultStackOptions)(theme);
  const OnboardingTheme = theme.OnboardingTheme;
  const carousel = (0, _OnboardingPages.createCarouselStyle)(OnboardingTheme);
  return /*#__PURE__*/_react.default.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Settings,
    component: _Settings.default,
    options: {
      title: t('Screens.Settings'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back'),
      ...ScreenOptionsDictionary[_navigators.Screens.Settings]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.RenameWallet,
    component: _RenameWallet.default,
    options: {
      title: t('Screens.NameWallet'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back'),
      ...ScreenOptionsDictionary[_navigators.Screens.RenameWallet]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Language,
    component: _Language.default,
    options: {
      title: t('Screens.Language'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back'),
      ...ScreenOptionsDictionary[_navigators.Screens.Language]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ConfigureMediator,
    component: _ConfigureMediator.default,
    options: {
      title: 'Configure Mediator',
      headerBackTestID: (0, _testable.testIdWithKey)('Back'),
      ...ScreenOptionsDictionary[_navigators.Screens.ConfigureMediator]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.AutoLock,
    component: _AutoLock.default,
    options: {
      title: 'Auto lock Options',
      headerBackTestID: (0, _testable.testIdWithKey)('Back'),
      ...ScreenOptionsDictionary[_navigators.Screens.AutoLock]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.DataRetention,
    component: _DataRetention.default,
    options: {
      title: t('Screens.DataRetention'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back'),
      ...ScreenOptionsDictionary[_navigators.Screens.DataRetention]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Tours,
    component: _Tours.default,
    options: {
      title: t('Screens.Tours'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back'),
      ...ScreenOptionsDictionary[_navigators.Screens.Tours]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ToggleBiometry,
    component: ToggleBiometry,
    options: {
      title: t('Screens.Biometry'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back'),
      ...ScreenOptionsDictionary[_navigators.Screens.ToggleBiometry]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ChangePIN,
    component: _PINChange.default,
    options: {
      title: t('Screens.ChangePIN'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back'),
      ...ScreenOptionsDictionary[_navigators.Screens.ChangePIN]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ChangePINSuccess,
    component: _PINChangeSuccess.default,
    options: {
      title: t('Screens.ConfirmPIN'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back'),
      headerLeft: () => null,
      ...ScreenOptionsDictionary[_navigators.Screens.ChangePINSuccess]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.TogglePushNotifications,
    component: _TogglePushNotifications.default,
    options: {
      title: t('Screens.PushNotifications'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back'),
      ...ScreenOptionsDictionary[_navigators.Screens.TogglePushNotifications]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Terms,
    component: terms,
    options: {
      title: t('Screens.Terms'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back'),
      ...ScreenOptionsDictionary[_navigators.Screens.Terms]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Developer,
    component: developer,
    options: {
      title: t('Screens.Developer'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back'),
      ...ScreenOptionsDictionary[_navigators.Screens.Developer]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Onboarding,
    options: {
      title: t('Screens.Onboarding')
    }
  }, props => /*#__PURE__*/_react.default.createElement(_Onboarding.default, _extends({}, props, {
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
      headerBackTestID: (0, _testable.testIdWithKey)('Back'),
      ...ScreenOptionsDictionary[_navigators.Screens.HistorySettings]
    }
  }));
};
var _default = exports.default = SettingStack;
//# sourceMappingURL=SettingStack.js.map