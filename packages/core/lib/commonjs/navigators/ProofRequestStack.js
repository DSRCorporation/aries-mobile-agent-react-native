"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stack = require("@react-navigation/stack");
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _IconButton = _interopRequireWildcard(require("../components/buttons/IconButton"));
var _HeaderHome = _interopRequireDefault(require("../components/buttons/HeaderHome"));
var _theme = require("../contexts/theme");
var _ListProofRequests = _interopRequireDefault(require("../screens/ListProofRequests"));
var _MobileVerifierLoading = _interopRequireDefault(require("../screens/MobileVerifierLoading"));
var _ProofChangeCredential = _interopRequireDefault(require("../screens/ProofChangeCredential"));
var _ProofRequestDetails = _interopRequireDefault(require("../screens/ProofRequestDetails"));
var _ProofRequestUsageHistory = _interopRequireDefault(require("../screens/ProofRequestUsageHistory"));
var _ProofRequesting = _interopRequireDefault(require("../screens/ProofRequesting"));
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
var _defaultStackOptions = require("./defaultStackOptions");
var _containerApi = require("../container-api");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ProofRequestStack = () => {
  const Stack = (0, _stack.createStackNavigator)();
  const theme = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const defaultStackOptions = (0, _defaultStackOptions.useDefaultStackOptions)(theme);
  const [ScreenOptionsDictionary] = (0, _containerApi.useServices)([_containerApi.TOKENS.OBJECT_SCREEN_CONFIG]);
  const [ProofDetails] = (0, _containerApi.useServices)([_containerApi.TOKENS.SCREEN_PROOF_DETAILS]);
  return /*#__PURE__*/_react.default.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ProofRequests,
    component: _ListProofRequests.default,
    options: {
      title: t('Screens.ChooseProofRequest'),
      ...ScreenOptionsDictionary[_navigators.Screens.ProofRequest]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ProofRequestDetails,
    component: _ProofRequestDetails.default,
    options: () => ({
      title: '',
      ...ScreenOptionsDictionary[_navigators.Screens.ProofRequestDetails]
    })
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.MobileVerifierLoading,
    component: _MobileVerifierLoading.default,
    options: {
      ...defaultStackOptions
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ProofChangeCredential,
    component: _ProofChangeCredential.default,
    options: {
      title: t('Screens.ProofChangeCredential'),
      ...ScreenOptionsDictionary[_navigators.Screens.ProofChangeCredential]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ProofRequesting,
    component: _ProofRequesting.default,
    options: ({
      navigation
    }) => ({
      title: t('ProofRequest.RequestForProof'),
      headerLeft: () => /*#__PURE__*/_react.default.createElement(_IconButton.default, {
        buttonLocation: _IconButton.ButtonLocation.Left,
        accessibilityLabel: t('Global.Back'),
        testID: (0, _testable.testIdWithKey)('BackButton'),
        onPress: () => navigation.navigate(_navigators.Screens.ProofRequests, {}),
        icon: "arrow-left"
      }),
      ...ScreenOptionsDictionary[_navigators.Screens.ProofRequesting]
    })
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ProofDetails,
    component: ProofDetails,
    options: ({
      navigation,
      route
    }) => ({
      title: '',
      headerLeft: () => /*#__PURE__*/_react.default.createElement(_IconButton.default, {
        buttonLocation: _IconButton.ButtonLocation.Left,
        accessibilityLabel: t('Global.Back'),
        testID: (0, _testable.testIdWithKey)('BackButton'),
        onPress: () => {
          if (route.params.isHistory) {
            navigation.goBack();
          } else {
            navigation.navigate(_navigators.Screens.ProofRequests, {});
          }
        },
        icon: "arrow-left"
      }),
      headerRight: () => /*#__PURE__*/_react.default.createElement(_HeaderHome.default, null),
      ...ScreenOptionsDictionary[_navigators.Screens.ProofDetails]
    })
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ProofRequestUsageHistory,
    component: _ProofRequestUsageHistory.default,
    options: () => ({
      title: t('Screens.ProofRequestUsageHistory'),
      headerRight: () => /*#__PURE__*/_react.default.createElement(_HeaderHome.default, null),
      ...ScreenOptionsDictionary[_navigators.Screens.ProofRequestUsageHistory]
    })
  }));
};
var _default = exports.default = ProofRequestStack;
//# sourceMappingURL=ProofRequestStack.js.map