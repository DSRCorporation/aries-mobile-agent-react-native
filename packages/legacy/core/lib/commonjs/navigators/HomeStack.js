"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stack = require("@react-navigation/stack");
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _SettingsMenu = _interopRequireDefault(require("../components/buttons/SettingsMenu"));
var _store = require("../contexts/store");
var _theme = require("../contexts/theme");
var _HistoryMenu = _interopRequireDefault(require("../modules/history/ui/components/HistoryMenu"));
var _navigators = require("../types/navigators");
var _Home = _interopRequireDefault(require("../screens/Home"));
var _defaultStackOptions = require("./defaultStackOptions");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const HomeStack = () => {
  const Stack = (0, _stack.createStackNavigator)();
  const theme = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [store] = (0, _store.useStore)();
  const defaultStackOptions = (0, _defaultStackOptions.useDefaultStackOptions)(theme);
  return /*#__PURE__*/_react.default.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Home,
    component: _Home.default,
    options: () => ({
      title: t('Screens.Home'),
      headerRight: () => store.preferences.useHistoryCapability ? /*#__PURE__*/_react.default.createElement(_HistoryMenu.default, null) : null,
      headerLeft: () => /*#__PURE__*/_react.default.createElement(_SettingsMenu.default, null)
    })
  }));
};
var _default = exports.default = HomeStack;
//# sourceMappingURL=HomeStack.js.map