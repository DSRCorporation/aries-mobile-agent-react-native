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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
    gestureEnabled: false,
    headerLeft: () => false
  },
  [_navigators.Screens.Terms]: {
    headerTintColor: _theme.OnboardingTheme.headerTintColor,
    headerLeft: () => false
  },
  [_navigators.Screens.CreatePIN]: {
    headerLeft: () => false
  },
  [_navigators.Screens.NameWallet]: {
    headerTintColor: _theme.OnboardingTheme.headerTintColor,
    headerLeft: () => false
  },
  [_navigators.Screens.UseBiometry]: {
    headerTintColor: _theme.OnboardingTheme.headerTintColor,
    headerLeft: () => false
  },
  [_navigators.Screens.Developer]: {
    headerTintColor: _theme.OnboardingTheme.headerTintColor,
    headerBackTestID: (0, _testable.testIdWithKey)('Back')
  },
  [_navigators.Screens.UsePushNotifications]: {
    headerTintColor: _theme.OnboardingTheme.headerTintColor,
    headerLeft: () => false
  }
};
function useDefaultStackOptions({
  ColorPallet
}) {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [{
    globalScreenOptions
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  return globalScreenOptions ?? {
    headerTintColor: ColorPallet.brand.headerIcon,
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
      shadowColor: ColorPallet.grayscale.black,
      shadowOpacity: 0.15,
      borderBottomWidth: 0
    },
    headerTitleAlign: 'center',
    headerTitle: props => /*#__PURE__*/_react.default.createElement(_HeaderTitle.default, props),
    headerBackAccessibilityLabel: t('Global.Back')
  };
}
//# sourceMappingURL=defaultStackOptions.js.map