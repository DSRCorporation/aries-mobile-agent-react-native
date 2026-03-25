"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultScreenOptionsDictionary = void 0;
exports.useDefaultStackOptions = useDefaultStackOptions;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _HeaderTitle = _interopRequireDefault(require("../components/texts/HeaderTitle"));
var _theme = require("../theme");
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
var _containerApi = require("../container-api");
var _HeaderWithBanner = _interopRequireDefault(require("../components/views/HeaderWithBanner"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DefaultScreenOptionsDictionary = exports.DefaultScreenOptionsDictionary = {
  [_navigators.Screens.Preface]: {
    headerTintColor: _theme.OnboardingTheme.headerTintColor,
    headerLeft: () => false
  },
  [_navigators.Screens.Splash]: {
    headerShown: false
  },
  [_navigators.Screens.Onboarding]: {
    headerTintColor: _theme.OnboardingTheme.headerTintColor,
    gestureEnabled: false
  },
  [_navigators.Screens.Terms]: {
    headerTintColor: _theme.OnboardingTheme.headerTintColor,
    headerBackTestID: (0, _testable.testIdWithKey)('Back')
  },
  [_navigators.Screens.CreatePIN]: {
    headerBackTestID: (0, _testable.testIdWithKey)('Back')
  },
  [_navigators.Screens.ChangePINSuccess]: {
    headerBackTestID: (0, _testable.testIdWithKey)('Back')
  },
  [_navigators.Screens.ChangePIN]: {
    headerBackTestID: (0, _testable.testIdWithKey)('Back')
  },
  [_navigators.Screens.VerifyPIN]: {
    headerBackTestID: (0, _testable.testIdWithKey)('Back')
  },
  [_navigators.Screens.NameWallet]: {
    headerTintColor: _theme.OnboardingTheme.headerTintColor,
    headerBackTestID: (0, _testable.testIdWithKey)('Back')
  },
  [_navigators.Screens.RenameWallet]: {
    headerTintColor: _theme.OnboardingTheme.headerTintColor,
    headerBackTestID: (0, _testable.testIdWithKey)('Back')
  },
  [_navigators.Screens.Biometry]: {
    headerTintColor: _theme.OnboardingTheme.headerTintColor,
    headerBackTestID: (0, _testable.testIdWithKey)('Back')
  },
  [_navigators.Screens.ToggleBiometry]: {
    headerTintColor: _theme.OnboardingTheme.headerTintColor,
    headerBackTestID: (0, _testable.testIdWithKey)('Back')
  },
  [_navigators.Screens.Developer]: {
    headerTintColor: _theme.OnboardingTheme.headerTintColor,
    headerBackTestID: (0, _testable.testIdWithKey)('Back')
  },
  [_navigators.Screens.PushNotifications]: {
    headerTintColor: _theme.OnboardingTheme.headerTintColor,
    headerBackTestID: (0, _testable.testIdWithKey)('Back')
  },
  [_navigators.Screens.TogglePushNotifications]: {
    headerTintColor: _theme.OnboardingTheme.headerTintColor,
    headerBackTestID: (0, _testable.testIdWithKey)('Back')
  },
  [_navigators.Screens.OpenIDCredentialDetails]: {
    headerShown: true
  },
  [_navigators.Screens.OpenIDCredentialOffer]: {
    headerShown: true
  },
  [_navigators.Screens.OpenIDProofPresentation]: {
    headerShown: true,
    headerRight: () => false
  }
};
function useDefaultStackOptions({
  ColorPalette
}) {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [{
    globalScreenOptions
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  return {
    headerTintColor: ColorPalette.brand.headerIcon,
    headerShown: true,
    headerBackTitleVisible: false,
    headerTitleContainerStyle: {
      flexShrink: 1,
      maxWidth: '68%',
      width: '100%'
    },
    headerStyle: {
      elevation: 0,
      shadowOffset: {
        width: 0,
        height: 6
      },
      shadowRadius: 6,
      shadowColor: ColorPalette.grayscale.black,
      shadowOpacity: 0.15,
      borderBottomWidth: 0
    },
    headerTitleAlign: 'center',
    headerTitle: props => /*#__PURE__*/_react.default.createElement(_HeaderTitle.default, props),
    header: props => /*#__PURE__*/_react.default.createElement(_HeaderWithBanner.default, props),
    headerBackAccessibilityLabel: t('Global.Back'),
    ...globalScreenOptions
  };
}
//# sourceMappingURL=defaultStackOptions.js.map