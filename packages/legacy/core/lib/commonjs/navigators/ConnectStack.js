"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stack = require("@react-navigation/stack");
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _theme = require("../contexts/theme");
var _NameWallet = _interopRequireDefault(require("../screens/NameWallet"));
var _PasteUrl = _interopRequireDefault(require("../screens/PasteUrl"));
var _ScanHelp = _interopRequireDefault(require("../screens/ScanHelp"));
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
var _defaultStackOptions = require("./defaultStackOptions");
var _containerApi = require("../container-api");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ConnectStack = () => {
  const Stack = (0, _stack.createStackNavigator)();
  const theme = (0, _theme.useTheme)();
  const defaultStackOptions = (0, _defaultStackOptions.useDefaultStackOptions)(theme);
  const [scan] = (0, _containerApi.useServices)([_containerApi.TOKENS.SCREEN_SCAN]);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  return /*#__PURE__*/_react.default.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Scan,
    component: scan,
    options: {
      headerBackTestID: (0, _testable.testIdWithKey)('Back'),
      headerShown: false
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.PasteUrl,
    component: _PasteUrl.default,
    options: () => ({
      title: t('PasteUrl.PasteUrl'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back')
    })
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ScanHelp,
    component: _ScanHelp.default
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.NameWallet,
    component: _NameWallet.default,
    options: {
      title: t('Screens.NameWallet'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back')
    }
  }));
};
var _default = exports.default = ConnectStack;
//# sourceMappingURL=ConnectStack.js.map