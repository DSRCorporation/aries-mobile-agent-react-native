"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stack = require("@react-navigation/stack");
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _HeaderHome = _interopRequireDefault(require("../components/buttons/HeaderHome"));
var _containerApi = require("../container-api");
var _theme = require("../contexts/theme");
var _navigators = require("../types/navigators");
var _defaultStackOptions = require("./defaultStackOptions");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DeliveryStack = () => {
  const Stack = (0, _stack.createStackNavigator)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const theme = (0, _theme.useTheme)();
  const defaultStackOptions = (0, _defaultStackOptions.useDefaultStackOptions)(theme);
  const [CredentialOffer, ProofRequest, Connection] = (0, _containerApi.useServices)([_containerApi.TOKENS.SCREEN_CREDENTIAL_OFFER, _containerApi.TOKENS.SCREEN_PROOF_REQUEST, _containerApi.TOKENS.SCREEN_CONNECTION]);
  return /*#__PURE__*/_react.default.createElement(Stack.Navigator, {
    initialRouteName: _navigators.Screens.Connection,
    screenOptions: {
      ...defaultStackOptions,
      cardStyleInterpolator: _stack.CardStyleInterpolators.forVerticalIOS,
      headerShown: true,
      presentation: 'modal',
      headerLeft: () => null,
      headerRight: () => /*#__PURE__*/_react.default.createElement(_HeaderHome.default, null)
    }
  }, /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Connection,
    component: Connection,
    options: {
      ...defaultStackOptions,
      headerShown: false
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ProofRequest,
    component: ProofRequest,
    options: {
      title: t('Screens.ProofRequest')
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.CredentialOffer,
    component: CredentialOffer,
    options: {
      title: t('Screens.CredentialOffer')
    }
  }));
};
var _default = exports.default = DeliveryStack;
//# sourceMappingURL=DeliveryStack.js.map