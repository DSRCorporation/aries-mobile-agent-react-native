"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stack = require("@react-navigation/stack");
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _SettingsMenu = _interopRequireDefault(require("../components/buttons/SettingsMenu"));
var _theme = require("../contexts/theme");
var _HistoryMenu = _interopRequireDefault(require("../modules/history/ui/components/HistoryMenu"));
var _navigators = require("../types/navigators");
var _Home = _interopRequireDefault(require("../screens/Home"));
var _defaultStackOptions = require("./defaultStackOptions");
var _containerApi = require("../container-api");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const HomeStack = () => {
  const Stack = (0, _stack.createStackNavigator)();
  const theme = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const defaultStackOptions = (0, _defaultStackOptions.useDefaultStackOptions)(theme);
  const [ScreenOptionsDictionary, historyEnabled] = (0, _containerApi.useServices)([_containerApi.TOKENS.OBJECT_SCREEN_CONFIG, _containerApi.TOKENS.HISTORY_ENABLED]);
  return /*#__PURE__*/_react.default.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Home,
    component: _Home.default,
    options: () => ({
      title: t('Screens.Home'),
      headerRight: () => historyEnabled ? /*#__PURE__*/_react.default.createElement(_HistoryMenu.default, null) : null,
      headerLeft: () => /*#__PURE__*/_react.default.createElement(_SettingsMenu.default, null),
      ...ScreenOptionsDictionary[_navigators.Screens.Home]
    })
  }));
};
var _default = exports.default = HomeStack;
//# sourceMappingURL=HomeStack.js.map