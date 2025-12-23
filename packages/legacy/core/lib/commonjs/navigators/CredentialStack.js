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
var _navigators = require("../types/navigators");
var _defaultStackOptions = require("./defaultStackOptions");
var _containerApi = require("../container-api");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CredentialStack = () => {
  const Stack = (0, _stack.createStackNavigator)();
  const theme = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const defaultStackOptions = (0, _defaultStackOptions.useDefaultStackOptions)(theme);
  const [ListCredentials, CredentialDetails, CredentialListHeaderRight] = (0, _containerApi.useServices)([_containerApi.TOKENS.SCREEN_CREDENTIAL_LIST, _containerApi.TOKENS.SCREEN_CREDENTIAL_DETAILS, _containerApi.TOKENS.COMPONENT_CRED_LIST_HEADER_RIGHT]);
  return /*#__PURE__*/_react.default.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Credentials,
    component: ListCredentials,
    options: () => ({
      title: t('Screens.Credentials'),
      headerRight: () => /*#__PURE__*/_react.default.createElement(CredentialListHeaderRight, null),
      headerLeft: () => /*#__PURE__*/_react.default.createElement(_SettingsMenu.default, null)
    })
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.CredentialDetails,
    component: CredentialDetails,
    options: {
      title: t('Screens.CredentialDetails')
    }
  }));
};
var _default = exports.default = CredentialStack;
//# sourceMappingURL=CredentialStack.js.map