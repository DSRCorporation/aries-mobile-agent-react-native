"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _verifier = require("@bifold/verifier");
var _reactHooks = require("@bifold/react-hooks");
var _didcomm = require("@credo-ts/didcomm");
var _stack = require("@react-navigation/stack");
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactI18next = require("react-i18next");
var _IconButton = _interopRequireWildcard(require("../components/buttons/IconButton"));
var _containerApi = require("../container-api");
var _theme = require("../contexts/theme");
var _HistoryStack = _interopRequireDefault(require("../modules/history/navigation/HistoryStack"));
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
var _store = require("../contexts/store");
var _tourContext = require("../contexts/tour/tour-context");
var _deepLinks = require("../hooks/deep-links");
var _OpenIDCredentialDetails = _interopRequireDefault(require("../modules/openid/screens/OpenIDCredentialDetails"));
var _ConnectStack = _interopRequireDefault(require("./ConnectStack"));
var _ContactStack = _interopRequireDefault(require("./ContactStack"));
var _DeliveryStack = _interopRequireDefault(require("./DeliveryStack"));
var _NotificationStack = _interopRequireDefault(require("./NotificationStack"));
var _ProofRequestStack = _interopRequireDefault(require("./ProofRequestStack"));
var _SettingStack = _interopRequireDefault(require("./SettingStack"));
var _defaultStackOptions = require("./defaultStackOptions");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const MainStack = () => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const theme = (0, _theme.useTheme)();
  const {
    currentStep
  } = (0, _tourContext.useTour)();
  const [store] = (0, _store.useStore)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const defaultStackOptions = (0, _defaultStackOptions.useDefaultStackOptions)(theme);
  const [CustomNavStack1, ScreenOptionsDictionary, Chat, CredentialDetails, TabStack] = (0, _containerApi.useServices)([_containerApi.TOKENS.CUSTOM_NAV_STACK_1, _containerApi.TOKENS.OBJECT_SCREEN_CONFIG, _containerApi.TOKENS.SCREEN_CHAT, _containerApi.TOKENS.SCREEN_CREDENTIAL_DETAILS, _containerApi.TOKENS.STACK_TAB]);
  const declinedProofs = (0, _reactHooks.useProofByState)([_didcomm.DidCommProofState.Declined, _didcomm.DidCommProofState.Abandoned]);
  (0, _deepLinks.useDeepLinks)();

  // remove connection on mobile verifier proofs if proof is rejected
  (0, _react.useEffect)(() => {
    declinedProofs.forEach(proof => {
      var _proof$metadata;
      const meta = proof === null || proof === void 0 || (_proof$metadata = proof.metadata) === null || _proof$metadata === void 0 ? void 0 : _proof$metadata.get(_verifier.ProofMetadata.customMetadata);
      if (meta !== null && meta !== void 0 && meta.delete_conn_after_seen) {
        agent === null || agent === void 0 || agent.modules.didcomm.connections.deleteById((proof === null || proof === void 0 ? void 0 : proof.connectionId) ?? '').catch(() => null);
        proof === null || proof === void 0 || proof.metadata.set(_verifier.ProofMetadata.customMetadata, {
          ...meta,
          delete_conn_after_seen: false
        });
      }
    });
  }, [declinedProofs, agent, store.preferences.useDataRetention]);
  const Stack = (0, _stack.createStackNavigator)();

  // This function is to make the fade in behavior of both iOS and
  // Android consistent for the settings menu
  const forFade = ({
    current
  }) => ({
    cardStyle: {
      opacity: current.progress
    }
  });
  const hideElements = (0, _react.useMemo)(() => currentStep === undefined ? 'auto' : 'no-hide-descendants', [currentStep]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    },
    importantForAccessibility: hideElements
  }, /*#__PURE__*/_react.default.createElement(Stack.Navigator, {
    initialRouteName: _navigators.Stacks.TabStack,
    screenOptions: {
      ...defaultStackOptions,
      headerShown: false
    }
  }, /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Stacks.TabStack,
    component: TabStack
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.CredentialDetails,
    component: CredentialDetails,
    options: {
      title: t('Screens.CredentialDetails'),
      headerShown: true,
      ...ScreenOptionsDictionary[_navigators.Screens.CredentialDetails]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.OpenIDCredentialDetails,
    component: _OpenIDCredentialDetails.default,
    options: {
      title: t('Screens.CredentialDetails'),
      ...ScreenOptionsDictionary[_navigators.Screens.OpenIDCredentialDetails]
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Screens.Chat,
    component: Chat,
    options: ({
      navigation
    }) => ({
      headerShown: true,
      title: t('Screens.CredentialOffer'),
      headerLeft: () => /*#__PURE__*/_react.default.createElement(_IconButton.default, {
        buttonLocation: _IconButton.ButtonLocation.Left,
        accessibilityLabel: t('Global.Back'),
        testID: (0, _testable.testIdWithKey)('BackButton'),
        onPress: () => {
          navigation.navigate(_navigators.TabStacks.HomeStack, {
            screen: _navigators.Screens.Home
          });
        },
        icon: "arrow-left"
      })
    })
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Stacks.ConnectStack,
    component: _ConnectStack.default
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Stacks.SettingStack,
    component: _SettingStack.default,
    options: {
      cardStyleInterpolator: forFade
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Stacks.ContactStack,
    component: _ContactStack.default
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Stacks.NotificationStack,
    component: _NotificationStack.default
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Stacks.ConnectionStack,
    component: _DeliveryStack.default,
    options: {
      gestureEnabled: false,
      cardStyleInterpolator: _stack.CardStyleInterpolators.forVerticalIOS,
      presentation: 'modal'
    }
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Stacks.ProofRequestsStack,
    component: _ProofRequestStack.default
  }), /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Stacks.HistoryStack,
    component: _HistoryStack.default,
    options: {
      cardStyleInterpolator: forFade
    }
  }), CustomNavStack1 ? /*#__PURE__*/_react.default.createElement(Stack.Screen, {
    name: _navigators.Stacks.CustomNavStack1,
    component: CustomNavStack1
  }) : null));
};
var _default = exports.default = MainStack;
//# sourceMappingURL=MainStack.js.map