"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stack = require("@react-navigation/stack");
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _HeaderHome = _interopRequireDefault(require("../components/buttons/HeaderHome"));
var _IconButton = _interopRequireWildcard(require("../components/buttons/IconButton"));
var _theme = require("../contexts/theme");
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
var _defaultStackOptions = require("./defaultStackOptions");
var _OpenIDProofPresentation = _interopRequireDefault(require("../modules/openid/screens/OpenIDProofPresentation"));
var _containerApi = require("../container-api");
var _OpenIDCredentialOffer = _interopRequireDefault(require("../modules/openid/screens/OpenIDCredentialOffer"));
var _OpenIDProofChangeCredential = _interopRequireDefault(require("../modules/openid/screens/OpenIDProofChangeCredential"));
var _OpenIDConnection = _interopRequireDefault(require("../modules/openid/screens/OpenIDConnection"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DeliveryStack = () => {
  const Stack = (0, _stack.createStackNavigator)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const theme = (0, _theme.useTheme)();
  const defaultStackOptions = (0, _defaultStackOptions.useDefaultStackOptions)(theme);
  const [ScreenOptionsDictionary, Connection] = (0, _containerApi.useServices)([_containerApi.TOKENS.OBJECT_SCREEN_CONFIG, _containerApi.TOKENS.SCREEN_CONNECTION]);
  return /*#__PURE__*/_react.default.createElement(Stack.Navigator, {
    initialRouteName: _navigators.Screens.Connection,
    screenOptions: {
      ...defaultStackOptions,
      cardStyleInterpolator: _stack.CardStyleInterpolators.forVerticalIOS,
      headerShown: true,
      presentation: 'modal',
      headerLeft: () => null,
      headerRight: () => /*#__PURE__*/_react.default.createElement(_HeaderHome.default, null),
      ...ScreenOptionsDictionary[_navigators.Screens.Connection]
    }
  }, /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.OpenIDConnection,
    component: _OpenIDConnection.default,
    options: {
      ...defaultStackOptions
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Connection,
    component: Connection,
    options: {
      ...defaultStackOptions
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.OpenIDCredentialOffer,
    component: _OpenIDCredentialOffer.default,
    options: {
      title: t('Screens.CredentialOffer'),
      ...ScreenOptionsDictionary[_navigators.Screens.OpenIDCredentialOffer]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.OpenIDProofPresentation,
    component: _OpenIDProofPresentation.default,
    options: {
      title: t('Screens.ProofRequest'),
      ...ScreenOptionsDictionary[_navigators.Screens.OpenIDProofPresentation]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.OpenIDProofCredentialSelect,
    component: _OpenIDProofChangeCredential.default,
    options: ({
      navigation
    }) => ({
      title: t('Screens.ChangeCard'),
      headerLeft: () => /*#__PURE__*/_react.default.createElement(_IconButton.default, {
        buttonLocation: _IconButton.ButtonLocation.Left,
        accessibilityLabel: t('Global.Back'),
        testID: (0, _testable.testIdWithKey)('BackButton'),
        onPress: () => navigation.goBack(),
        icon: "arrow-left"
      }),
      ...ScreenOptionsDictionary[_navigators.Screens.OpenIDProofCredentialSelect]
    })
  }));
};
var _default = exports.default = DeliveryStack;
//# sourceMappingURL=DeliveryStack.js.map