"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stack = require("@react-navigation/stack");
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _containerApi = require("../container-api");
var _theme = require("../contexts/theme");
var _navigators = require("../types/navigators");
var _defaultStackOptions = require("./defaultStackOptions");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const NotificationStack = () => {
  var _customNotification$a;
  const Stack = (0, _stack.createStackNavigator)();
  const theme = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const defaultStackOptions = (0, _defaultStackOptions.useDefaultStackOptions)(theme);
  const [CredentialDetails, CredentialOffer, ProofRequest, {
    customNotificationConfig: customNotification
  }, ScreenOptionsDictionary] = (0, _containerApi.useServices)([_containerApi.TOKENS.SCREEN_CREDENTIAL_DETAILS, _containerApi.TOKENS.SCREEN_CREDENTIAL_OFFER, _containerApi.TOKENS.SCREEN_PROOF_REQUEST, _containerApi.TOKENS.NOTIFICATIONS, _containerApi.TOKENS.OBJECT_SCREEN_CONFIG]);
  return /*#__PURE__*/_react.default.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.CredentialDetails,
    component: CredentialDetails,
    options: {
      title: t('Screens.CredentialDetails'),
      ...ScreenOptionsDictionary[_navigators.Screens.CredentialDetails]
    }
  }), customNotification && /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.CustomNotification,
    component: customNotification.component,
    options: {
      title: t(customNotification.pageTitle),
      ...ScreenOptionsDictionary[_navigators.Screens.CustomNotification]
    }
  }), customNotification && ((_customNotification$a = customNotification.additionalStackItems) === null || _customNotification$a === void 0 ? void 0 : _customNotification$a.length) && customNotification.additionalStackItems.map((item, i) => /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    key: i + 1,
    name: item.name,
    component: item.component,
    options: item.stackOptions
  })));
};
var _default = exports.default = NotificationStack;
//# sourceMappingURL=NotificationStack.js.map