"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _native = require("@react-navigation/native");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _testable = require("../utils/testable");
var _ThemedText = require("../components/texts/ThemedText");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _DeveloperToggleRow = _interopRequireDefault(require("../components/inputs/DeveloperToggleRow"));
var _navigators = require("../types/navigators");
var _constants = require("../constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  settingContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
const Developer = () => {
  const [store, dispatch] = (0, _store2.useStore)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const navigation = (0, _native.useNavigation)();
  const [useVerifierCapability, setUseVerifierCapability] = (0, _react.useState)(!!store.preferences.useVerifierCapability);
  const [useConnectionInviterCapability, setConnectionInviterCapability] = (0, _react.useState)(!!store.preferences.useConnectionInviterCapability);
  const [acceptDevCredentials, setAcceptDevCredentials] = (0, _react.useState)(!!store.preferences.acceptDevCredentials);
  const [useDevVerifierTemplates, setDevVerifierTemplates] = (0, _react.useState)(!!store.preferences.useDevVerifierTemplates);
  const [enableWalletNaming, setEnableWalletNaming] = (0, _react.useState)(!!store.preferences.enableWalletNaming);
  const [enableShareableLink, setEnableShareableLink] = (0, _react.useState)(!!store.preferences.enableShareableLink);
  const [preventAutoLock, setPreventAutoLock] = (0, _react.useState)(!!store.preferences.preventAutoLock);
  const [enableGenericErrorMessages, setEnableGenericErrorMessages] = (0, _react.useState)(!!store.preferences.genericErrorMessages);
  const toggleVerifierCapabilitySwitch = () => {
    // if verifier feature is switched off then also turn off the dev templates
    if (useVerifierCapability) {
      dispatch({
        type: _store.DispatchAction.USE_DEV_VERIFIER_TEMPLATES,
        payload: [false]
      });
      setDevVerifierTemplates(false);
    }
    dispatch({
      type: _store.DispatchAction.USE_VERIFIER_CAPABILITY,
      payload: [!useVerifierCapability]
    });
    setUseVerifierCapability(previousState => !previousState);
  };
  const toggleAcceptDevCredentialsSwitch = () => {
    dispatch({
      type: _store.DispatchAction.ACCEPT_DEV_CREDENTIALS,
      payload: [!acceptDevCredentials]
    });
    setAcceptDevCredentials(previousState => !previousState);
  };
  const toggleConnectionInviterCapabilitySwitch = () => {
    dispatch({
      type: _store.DispatchAction.USE_CONNECTION_INVITER_CAPABILITY,
      payload: [!useConnectionInviterCapability]
    });
    setConnectionInviterCapability(previousState => !previousState);
  };
  const toggleDevVerifierTemplatesSwitch = () => {
    // if we switch on dev templates we can assume the user also wants to enable the verifier capability
    if (!useDevVerifierTemplates) {
      dispatch({
        type: _store.DispatchAction.USE_VERIFIER_CAPABILITY,
        payload: [true]
      });
      setUseVerifierCapability(true);
    }
    dispatch({
      type: _store.DispatchAction.USE_DEV_VERIFIER_TEMPLATES,
      payload: [!useDevVerifierTemplates]
    });
    setDevVerifierTemplates(previousState => !previousState);
  };
  const toggleWalletNamingSwitch = () => {
    dispatch({
      type: _store.DispatchAction.ENABLE_WALLET_NAMING,
      payload: [!enableWalletNaming]
    });
    setEnableWalletNaming(previousState => !previousState);
  };
  const togglePreventAutoLockSwitch = () => {
    dispatch({
      type: _store.DispatchAction.PREVENT_AUTO_LOCK,
      payload: [!preventAutoLock]
    });
    setPreventAutoLock(previousState => !previousState);
  };
  const toggleShareableLinkSwitch = () => {
    dispatch({
      type: _store.DispatchAction.USE_SHAREABLE_LINK,
      payload: [!enableShareableLink]
    });
    setEnableShareableLink(previousState => !previousState);
  };
  const toggleGenericErrorMessages = () => {
    dispatch({
      type: _store.DispatchAction.GENERIC_ERROR_MESSAGES,
      payload: [!enableGenericErrorMessages]
    });
    setEnableGenericErrorMessages(previousState => !previousState);
  };
  const onRunRefreshCycleTouched = () => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.Stacks.TabStack, {
      screen: _navigators.Screens.Home
    });
    setTimeout(() => {
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.OPENID_REFRESH_REQUEST);
    }, 50);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      flex: 1
    },
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: {
      margin: 10
    }
  }, "Place content here you would like to make available to developers when developer mode is enabled."), /*#__PURE__*/_react.default.createElement(_DeveloperToggleRow.default, {
    label: t('Verifier.UseVerifierCapability'),
    value: useVerifierCapability,
    onToggle: toggleVerifierCapabilitySwitch,
    accessibilityLabel: t('Verifier.Toggle'),
    pressableTestId: (0, _testable.testIdWithKey)('ToggleVerifierCapability'),
    switchTestId: (0, _testable.testIdWithKey)('VerifierCapabilitySwitchElement')
  }), /*#__PURE__*/_react.default.createElement(_DeveloperToggleRow.default, {
    label: t('Verifier.AcceptDevCredentials'),
    value: acceptDevCredentials,
    onToggle: toggleAcceptDevCredentialsSwitch,
    accessibilityLabel: t('Verifier.Toggle'),
    pressableTestId: (0, _testable.testIdWithKey)('ToggleAcceptDevCredentials'),
    switchTestId: (0, _testable.testIdWithKey)('AcceptDevCredentialsSwitchElement')
  }), /*#__PURE__*/_react.default.createElement(_DeveloperToggleRow.default, {
    label: t('Connection.UseConnectionInviterCapability'),
    value: useConnectionInviterCapability,
    onToggle: toggleConnectionInviterCapabilitySwitch,
    accessibilityLabel: t('Connection.Toggle'),
    pressableTestId: (0, _testable.testIdWithKey)('ToggleConnectionInviterCapabilitySwitch'),
    switchTestId: (0, _testable.testIdWithKey)('ConnectionInviterCapabilitySwitchElement')
  }), /*#__PURE__*/_react.default.createElement(_DeveloperToggleRow.default, {
    label: t('Verifier.UseDevVerifierTemplates'),
    value: useDevVerifierTemplates,
    onToggle: toggleDevVerifierTemplatesSwitch,
    accessibilityLabel: t('Verifier.ToggleDevTemplates'),
    pressableTestId: (0, _testable.testIdWithKey)('ToggleDevVerifierTemplatesSwitch'),
    switchTestId: (0, _testable.testIdWithKey)('DevVerifierTemplatesSwitchElement')
  }), !store.onboarding.didCreatePIN && /*#__PURE__*/_react.default.createElement(_DeveloperToggleRow.default, {
    label: t('NameWallet.EnableWalletNaming'),
    value: enableWalletNaming,
    onToggle: toggleWalletNamingSwitch,
    accessibilityLabel: t('NameWallet.ToggleWalletNaming'),
    pressableTestId: (0, _testable.testIdWithKey)('ToggleEnableWalletNamingSwitch'),
    switchTestId: (0, _testable.testIdWithKey)('EnableWalletNamingSwitchElement')
  }), /*#__PURE__*/_react.default.createElement(_DeveloperToggleRow.default, {
    label: t('Settings.PreventAutoLock'),
    value: preventAutoLock,
    onToggle: togglePreventAutoLockSwitch,
    accessibilityLabel: t('Settings.TogglePreventAutoLock'),
    pressableTestId: (0, _testable.testIdWithKey)('TogglePreventAutoLockSwitch'),
    switchTestId: (0, _testable.testIdWithKey)('PreventAutoLockSwitchElement')
  }), /*#__PURE__*/_react.default.createElement(_DeveloperToggleRow.default, {
    label: t('PasteUrl.UseShareableLink'),
    value: enableShareableLink,
    onToggle: toggleShareableLinkSwitch,
    accessibilityLabel: t('PasteUrl.UseShareableLink'),
    pressableTestId: (0, _testable.testIdWithKey)('ToggleUseShareableLink'),
    switchTestId: (0, _testable.testIdWithKey)('ShareableLinkSwitchElement')
  }), /*#__PURE__*/_react.default.createElement(_DeveloperToggleRow.default, {
    label: t('Settings.GenericErrorMessages'),
    value: enableGenericErrorMessages,
    onToggle: toggleGenericErrorMessages,
    accessibilityLabel: t('Settings.GenericErrorMessages'),
    pressableTestId: (0, _testable.testIdWithKey)('ToggleUseGenericErrorMessages'),
    switchTestId: (0, _testable.testIdWithKey)('GenericErrorMessagesSwitchElement')
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.settingContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Global.RefreshCredentials'),
    accessibilityLabel: t('Global.RefreshCredentials'),
    testID: (0, _testable.testIdWithKey)('Refresh Credentials'),
    onPress: onRunRefreshCycleTouched,
    buttonType: _Button.ButtonType.ModalPrimary
  })))));
};
var _default = exports.default = Developer;
//# sourceMappingURL=Developer.js.map