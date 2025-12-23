"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stack = require("@react-navigation/stack");
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _HeaderButton = _interopRequireWildcard(require("../components/buttons/HeaderButton"));
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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ProofRequestStack = () => {
  const Stack = (0, _stack.createStackNavigator)();
  const theme = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const defaultStackOptions = (0, _defaultStackOptions.useDefaultStackOptions)(theme);
  const [ProofDetails] = (0, _containerApi.useServices)([_containerApi.TOKENS.SCREEN_PROOF_DETAILS]);
  return /*#__PURE__*/_react.default.createElement(Stack.Navigator, {
    screenOptions: {
      ...defaultStackOptions
    }
  }, /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ProofRequests,
    component: _ListProofRequests.default,
    options: {
      title: t('Screens.ChooseProofRequest')
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ProofRequestDetails,
    component: _ProofRequestDetails.default,
    options: () => ({
      title: ''
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
      title: t('Screens.ProofChangeCredential')
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ProofRequesting,
    component: _ProofRequesting.default,
    options: ({
      navigation
    }) => ({
      title: t('ProofRequest.RequestForProof'),
      headerLeft: () => /*#__PURE__*/_react.default.createElement(_HeaderButton.default, {
        buttonLocation: _HeaderButton.ButtonLocation.Left,
        accessibilityLabel: t('Global.Back'),
        testID: (0, _testable.testIdWithKey)('BackButton'),
        onPress: () => navigation.navigate(_navigators.Screens.ProofRequests, {}),
        icon: "arrow-left"
      })
    })
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ProofDetails,
    component: ProofDetails,
    options: ({
      navigation,
      route
    }) => ({
      title: '',
      headerLeft: () => /*#__PURE__*/_react.default.createElement(_HeaderButton.default, {
        buttonLocation: _HeaderButton.ButtonLocation.Left,
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
      headerRight: () => /*#__PURE__*/_react.default.createElement(_HeaderHome.default, null)
    })
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.ProofRequestUsageHistory,
    component: _ProofRequestUsageHistory.default,
    options: () => ({
      title: t('Screens.ProofRequestUsageHistory'),
      headerRight: () => /*#__PURE__*/_react.default.createElement(_HeaderHome.default, null)
    })
  }));
};
var _default = exports.default = ProofRequestStack;
//# sourceMappingURL=ProofRequestStack.js.map