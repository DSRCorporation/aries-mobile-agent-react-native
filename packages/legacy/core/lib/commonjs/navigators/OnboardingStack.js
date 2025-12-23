"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _native = require("@react-navigation/native");
var _stack = require("@react-navigation/stack");
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _containerApi = require("../container-api");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _NameWallet = _interopRequireDefault(require("../screens/NameWallet"));
var _OnboardingPages = require("../screens/OnboardingPages");
var _PushNotification = _interopRequireDefault(require("../screens/PushNotification"));
var _navigators = require("../types/navigators");
var _defaultStackOptions = require("./defaultStackOptions");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } /* eslint-disable @typescript-eslint/no-non-null-assertion */
const OnboardingStack = () => {
  const [, dispatch] = (0, _store2.useStore)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const Stack = (0, _stack.createStackNavigator)();
  const theme = (0, _theme.useTheme)();
  const OnboardingTheme = theme.OnboardingTheme;
  const carousel = (0, _OnboardingPages.createCarouselStyle)(OnboardingTheme);
  const [splash, pages, useBiometry, Onboarding, Developer, {
    screen: Terms
  }, onTutorialCompletedCurried, ScreenOptionsDictionary, Preface, PINCreate, PINEnter, AttemptLockout] = (0, _containerApi.useServices)([_containerApi.TOKENS.SCREEN_SPLASH, _containerApi.TOKENS.SCREEN_ONBOARDING_PAGES, _containerApi.TOKENS.SCREEN_USE_BIOMETRY, _containerApi.TOKENS.SCREEN_ONBOARDING, _containerApi.TOKENS.SCREEN_DEVELOPER, _containerApi.TOKENS.SCREEN_TERMS, _containerApi.TOKENS.FN_ONBOARDING_DONE, _containerApi.TOKENS.OBJECT_ONBOARDING_CONFIG, _containerApi.TOKENS.SCREEN_PREFACE, _containerApi.TOKENS.SCREEN_PIN_CREATE, _containerApi.TOKENS.SCREEN_PIN_ENTER, _containerApi.TOKENS.SCREEN_ATTEMPT_LOCKOUT]);
  const defaultStackOptions = (0, _defaultStackOptions.useDefaultStackOptions)(theme);
  const navigation = (0, _native.useNavigation)();
  const onTutorialCompleted = onTutorialCompletedCurried(dispatch, navigation);
  const onAuthenticated = status => {
    if (!status) {
      return;
    }
    dispatch({
      type: _store.DispatchAction.DID_AUTHENTICATE
    });
  };
  const OnBoardingScreen = () => {
    return /*#__PURE__*/_react.default.createElement(Onboarding, {
      nextButtonText: t('Global.Next'),
      previousButtonText: t('Global.Back'),
      disableSkip: true,
      pages: pages(onTutorialCompleted, OnboardingTheme),
      style: carousel
    });
  };

  // these need to be in the children of the stack screen otherwise they will unmount/remount which resets the component state in memory and causes issues
  const CreatePINScreen = props => {
    return /*#__PURE__*/_react.default.createElement(PINCreate, _extends({
      setAuthenticated: onAuthenticated
    }, props));
  };
  const EnterPINScreen = props => {
    return /*#__PURE__*/_react.default.createElement(PINEnter, _extends({
      setAuthenticated: onAuthenticated
    }, props));
  };
  const screens = [{
    name: _navigators.Screens.Splash,
    component: splash,
    options: ScreenOptionsDictionary[_navigators.Screens.Splash]
  }, {
    name: _navigators.Screens.Preface,
    component: Preface,
    options: () => {
      return {
        ...ScreenOptionsDictionary[_navigators.Screens.Preface],
        title: t('Screens.Preface')
      };
    }
  }, {
    name: _navigators.Screens.Onboarding,
    children: OnBoardingScreen,
    options: () => {
      return {
        ...ScreenOptionsDictionary[_navigators.Screens.Onboarding],
        headerShown: false
      };
    }
  }, {
    name: _navigators.Screens.Terms,
    options: () => ({
      ...ScreenOptionsDictionary[_navigators.Screens.Terms],
      title: t('Screens.Terms'),
      headerShown: true,
      headerTitleAlign: 'left'
    }),
    component: Terms
  }, {
    name: _navigators.Screens.CreatePIN,
    children: CreatePINScreen,
    initialParams: {},
    options: () => ({
      ...ScreenOptionsDictionary[_navigators.Screens.CreatePIN],
      title: t('Screens.CreatePIN'),
      headerShown: false
    })
  }, {
    name: _navigators.Screens.NameWallet,
    options: () => ({
      ...ScreenOptionsDictionary[_navigators.Screens.NameWallet],
      title: t('Screens.NameWallet')
    }),
    component: _NameWallet.default
  }, {
    name: _navigators.Screens.UseBiometry,
    options: () => ({
      ...ScreenOptionsDictionary[_navigators.Screens.UseBiometry],
      title: t('Screens.Biometry'),
      headerShown: true,
      headerTitleAlign: 'left'
    }),
    component: useBiometry
  }, {
    name: _navigators.Screens.UsePushNotifications,
    options: () => ({
      ...ScreenOptionsDictionary[_navigators.Screens.UsePushNotifications],
      title: t('Screens.UsePushNotifications')
    }),
    children: _PushNotification.default
  }, {
    name: _navigators.Screens.Developer,
    component: Developer,
    options: () => {
      return {
        ...ScreenOptionsDictionary[_navigators.Screens.Developer],
        title: t('Screens.Developer'),
        headerBackAccessibilityLabel: t('Global.Back')
      };
    }
  }, {
    name: _navigators.Screens.EnterPIN,
    children: EnterPINScreen,
    options: () => {
      return {
        title: t('Screens.EnterPIN'),
        headerShown: false,
        headerLeft: () => false,
        rightLeft: () => false
      };
    }
  }, {
    name: _navigators.Screens.AttemptLockout,
    component: AttemptLockout,
    options: () => ({
      headerShown: false,
      headerLeft: () => null
    })
  }];
  return /*#__PURE__*/_react.default.createElement(Stack.Navigator, {
    initialRouteName: _navigators.Screens.Splash,
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