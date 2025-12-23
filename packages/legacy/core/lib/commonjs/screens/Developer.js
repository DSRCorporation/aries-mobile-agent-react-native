"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _testable = require("../utils/testable");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Developer = () => {
  const [store, dispatch] = (0, _store2.useStore)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const [useVerifierCapability, setUseVerifierCapability] = (0, _react.useState)(!!store.preferences.useVerifierCapability);
  const [useConnectionInviterCapability, setConnectionInviterCapability] = (0, _react.useState)(!!store.preferences.useConnectionInviterCapability);
  const [useHistoryCapability, setUseHistoryCapability] = (0, _react.useState)(!!store.preferences.useHistoryCapability);
  const [acceptDevCredentials, setAcceptDevCredentials] = (0, _react.useState)(!!store.preferences.acceptDevCredentials);
  const [useDevVerifierTemplates, setDevVerifierTemplates] = (0, _react.useState)(!!store.preferences.useDevVerifierTemplates);
  const [enableWalletNaming, setEnableWalletNaming] = (0, _react.useState)(!!store.preferences.enableWalletNaming);
  const [enableShareableLink, setEnableShareableLink] = (0, _react.useState)(!!store.preferences.enableShareableLink);
  const [preventAutoLock, setPreventAutoLock] = (0, _react.useState)(!!store.preferences.preventAutoLock);
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
    },
    settingLabelText: {
      ...TextTheme.bold,
      marginRight: 10,
      textAlign: 'left'
    },
    settingSwitchContainer: {
      justifyContent: 'center'
    }
  });
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
  const toggleHistoryCapabilitySwitch = () => {
    dispatch({
      type: _store.DispatchAction.HISTORY_CAPABILITY,
      payload: [!useHistoryCapability]
    });
    setUseHistoryCapability(previousState => !previousState);
  };
  const toggleShareableLinkSwitch = () => {
    dispatch({
      type: _store.DispatchAction.USE_SHAREABLE_LINK,
      payload: [!enableShareableLink]
    });
    setEnableShareableLink(previousState => !previousState);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      flex: 1
    },
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [TextTheme.normal, {
      margin: 10
    }]
  }, "Place content here you would like to make available to developers when developer mode is enabled."), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.settingContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    accessible: false,
    style: styles.settingLabelText
  }, t('Verifier.UseVerifierCapability'))), /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: styles.settingSwitchContainer,
    accessibilityLabel: t('Verifier.Toggle'),
    accessibilityRole: 'switch',
    testID: (0, _testable.testIdWithKey)('ToggleVerifierCapability')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Switch, {
    trackColor: {
      false: ColorPallet.grayscale.lightGrey,
      true: ColorPallet.brand.primaryDisabled
    },
    thumbColor: useVerifierCapability ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey,
    ios_backgroundColor: ColorPallet.grayscale.lightGrey,
    onValueChange: toggleVerifierCapabilitySwitch,
    testID: (0, _testable.testIdWithKey)('VerifierCapabilitySwitchElement'),
    value: useVerifierCapability
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.settingContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    accessible: false,
    style: styles.settingLabelText
  }, t('Verifier.AcceptDevCredentials'))), /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: styles.settingSwitchContainer,
    accessibilityLabel: t('Verifier.Toggle'),
    accessibilityRole: 'switch',
    testID: (0, _testable.testIdWithKey)('ToggleAcceptDevCredentials')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Switch, {
    trackColor: {
      false: ColorPallet.grayscale.lightGrey,
      true: ColorPallet.brand.primaryDisabled
    },
    thumbColor: acceptDevCredentials ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey,
    ios_backgroundColor: ColorPallet.grayscale.lightGrey,
    onValueChange: toggleAcceptDevCredentialsSwitch,
    testID: (0, _testable.testIdWithKey)('AcceptDevCredentialsSwitchElement'),
    value: acceptDevCredentials
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.settingContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.settingLabelText
  }, t('Connection.UseConnectionInviterCapability'))), /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: styles.settingSwitchContainer,
    accessibilityLabel: t('Connection.Toggle'),
    accessibilityRole: 'switch',
    testID: (0, _testable.testIdWithKey)('ToggleConnectionInviterCapabilitySwitch')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Switch, {
    trackColor: {
      false: ColorPallet.grayscale.lightGrey,
      true: ColorPallet.brand.primaryDisabled
    },
    thumbColor: useConnectionInviterCapability ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey,
    ios_backgroundColor: ColorPallet.grayscale.lightGrey,
    onValueChange: toggleConnectionInviterCapabilitySwitch,
    testID: (0, _testable.testIdWithKey)('ConnectionInviterCapabilitySwitchElement'),
    value: useConnectionInviterCapability
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.settingContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.settingLabelText
  }, t('Verifier.UseDevVerifierTemplates'))), /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: styles.settingSwitchContainer,
    accessibilityLabel: t('Verifier.ToggleDevTemplates'),
    accessibilityRole: 'switch',
    testID: (0, _testable.testIdWithKey)('ToggleDevVerifierTemplatesSwitch')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Switch, {
    trackColor: {
      false: ColorPallet.grayscale.lightGrey,
      true: ColorPallet.brand.primaryDisabled
    },
    thumbColor: useDevVerifierTemplates ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey,
    ios_backgroundColor: ColorPallet.grayscale.lightGrey,
    onValueChange: toggleDevVerifierTemplatesSwitch,
    testID: (0, _testable.testIdWithKey)('DevVerifierTemplatesSwitchElement'),
    value: useDevVerifierTemplates
  }))), !store.onboarding.didCreatePIN && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.settingContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.settingLabelText
  }, t('NameWallet.EnableWalletNaming'))), /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: styles.settingSwitchContainer,
    accessibilityLabel: t('NameWallet.ToggleWalletNaming'),
    accessibilityRole: 'switch',
    testID: (0, _testable.testIdWithKey)('ToggleEnableWalletNamingSwitch')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Switch, {
    trackColor: {
      false: ColorPallet.grayscale.lightGrey,
      true: ColorPallet.brand.primaryDisabled
    },
    thumbColor: enableWalletNaming ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey,
    ios_backgroundColor: ColorPallet.grayscale.lightGrey,
    onValueChange: toggleWalletNamingSwitch,
    testID: (0, _testable.testIdWithKey)('EnableWalletNamingSwitchElement'),
    value: enableWalletNaming
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.settingContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.settingLabelText
  }, t('Settings.PreventAutoLock'))), /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: styles.settingSwitchContainer,
    accessibilityLabel: t('Settings.TogglePreventAutoLock'),
    accessibilityRole: 'switch',
    testID: (0, _testable.testIdWithKey)('TogglePreventAutoLockSwitch')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Switch, {
    trackColor: {
      false: ColorPallet.grayscale.lightGrey,
      true: ColorPallet.brand.primaryDisabled
    },
    thumbColor: preventAutoLock ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey,
    ios_backgroundColor: ColorPallet.grayscale.lightGrey,
    onValueChange: togglePreventAutoLockSwitch,
    testID: (0, _testable.testIdWithKey)('PreventAutoLockSwitchElement'),
    value: preventAutoLock
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.settingContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.settingLabelText
  }, t('History.UseHistoryCapability'))), /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: styles.settingSwitchContainer,
    accessibilityLabel: t('History.UseHistoryCapabilityToggle'),
    accessibilityRole: 'switch',
    testID: (0, _testable.testIdWithKey)('HistoryCapabilitySwitch')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Switch, {
    trackColor: {
      false: ColorPallet.grayscale.lightGrey,
      true: ColorPallet.brand.primaryDisabled
    },
    thumbColor: useHistoryCapability ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey,
    ios_backgroundColor: ColorPallet.grayscale.lightGrey,
    onValueChange: toggleHistoryCapabilitySwitch,
    testID: (0, _testable.testIdWithKey)('HistoryCapabilitySwitchElement'),
    value: useHistoryCapability
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.settingContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.settingLabelText
  }, t('PasteUrl.UseShareableLink'))), /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: styles.settingSwitchContainer,
    accessibilityLabel: t('PasteUrl.UseShareableLink'),
    accessibilityRole: 'switch',
    testID: (0, _testable.testIdWithKey)('ToggleUseShareableLink')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Switch, {
    trackColor: {
      false: ColorPallet.grayscale.lightGrey,
      true: ColorPallet.brand.primaryDisabled
    },
    thumbColor: enableShareableLink ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey,
    ios_backgroundColor: ColorPallet.grayscale.lightGrey,
    onValueChange: toggleShareableLinkSwitch,
    testID: (0, _testable.testIdWithKey)('ShareableLinkSwitchElement'),
    value: enableShareableLink
  })))));
};
var _default = exports.default = Developer;
//# sourceMappingURL=Developer.js.map