"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stack = require("@react-navigation/stack");
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _theme = require("../../../contexts/theme");
var _defaultStackOptions = require("../../../navigators/defaultStackOptions");
var _navigators = require("../../../types/navigators");
var _testable = require("../../../utils/testable");
var _HistoryPage = _interopRequireDefault(require("../ui/HistoryPage"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import HistoryDetailsPage from '../ui/HistoryDetails'

const HistoryStack = () => {
  const Stack = (0, _stack.createStackNavigator)();
  const theme = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const defaultStackOptions = (0, _defaultStackOptions.useDefaultStackOptions)(theme);
  return /*#__PURE__*/_react.default.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.HistoryPage,
    component: _HistoryPage.default,
    options: {
      title: t('Screens.History'),
      headerBackTestID: (0, _testable.testIdWithKey)('Back')
    }
  }));
};
var _default = exports.default = HistoryStack;
//# sourceMappingURL=HistoryStack.js.map