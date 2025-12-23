import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Pressable, Switch, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { testIdWithKey } from '../utils/testable';
const Developer = () => {
  const [store, dispatch] = useStore();
  const {
    t
  } = useTranslation();
  const {
    ColorPallet,
    TextTheme
  } = useTheme();
  const [useVerifierCapability, setUseVerifierCapability] = useState(!!store.preferences.useVerifierCapability);
  const [useConnectionInviterCapability, setConnectionInviterCapability] = useState(!!store.preferences.useConnectionInviterCapability);
  const [useHistoryCapability, setUseHistoryCapability] = useState(!!store.preferences.useHistoryCapability);
  const [acceptDevCredentials, setAcceptDevCredentials] = useState(!!store.preferences.acceptDevCredentials);
  const [useDevVerifierTemplates, setDevVerifierTemplates] = useState(!!store.preferences.useDevVerifierTemplates);
  const [enableWalletNaming, setEnableWalletNaming] = useState(!!store.preferences.enableWalletNaming);
  const [enableShareableLink, setEnableShareableLink] = useState(!!store.preferences.enableShareableLink);
  const [preventAutoLock, setPreventAutoLock] = useState(!!store.preferences.preventAutoLock);
  const styles = StyleSheet.create({
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
        type: DispatchAction.USE_DEV_VERIFIER_TEMPLATES,
        payload: [false]
      });
      setDevVerifierTemplates(false);
    }
    dispatch({
      type: DispatchAction.USE_VERIFIER_CAPABILITY,
      payload: [!useVerifierCapability]
    });
    setUseVerifierCapability(previousState => !previousState);
  };
  const toggleAcceptDevCredentialsSwitch = () => {
    dispatch({
      type: DispatchAction.ACCEPT_DEV_CREDENTIALS,
      payload: [!acceptDevCredentials]
    });
    setAcceptDevCredentials(previousState => !previousState);
  };
  const toggleConnectionInviterCapabilitySwitch = () => {
    dispatch({
      type: DispatchAction.USE_CONNECTION_INVITER_CAPABILITY,
      payload: [!useConnectionInviterCapability]
    });
    setConnectionInviterCapability(previousState => !previousState);
  };
  const toggleDevVerifierTemplatesSwitch = () => {
    // if we switch on dev templates we can assume the user also wants to enable the verifier capability
    if (!useDevVerifierTemplates) {
      dispatch({
        type: DispatchAction.USE_VERIFIER_CAPABILITY,
        payload: [true]
      });
      setUseVerifierCapability(true);
    }
    dispatch({
      type: DispatchAction.USE_DEV_VERIFIER_TEMPLATES,
      payload: [!useDevVerifierTemplates]
    });
    setDevVerifierTemplates(previousState => !previousState);
  };
  const toggleWalletNamingSwitch = () => {
    dispatch({
      type: DispatchAction.ENABLE_WALLET_NAMING,
      payload: [!enableWalletNaming]
    });
    setEnableWalletNaming(previousState => !previousState);
  };
  const togglePreventAutoLockSwitch = () => {
    dispatch({
      type: DispatchAction.PREVENT_AUTO_LOCK,
      payload: [!preventAutoLock]
    });
    setPreventAutoLock(previousState => !previousState);
  };
  const toggleHistoryCapabilitySwitch = () => {
    dispatch({
      type: DispatchAction.HISTORY_CAPABILITY,
      payload: [!useHistoryCapability]
    });
    setUseHistoryCapability(previousState => !previousState);
  };
  const toggleShareableLinkSwitch = () => {
    dispatch({
      type: DispatchAction.USE_SHAREABLE_LINK,
      payload: [!enableShareableLink]
    });
    setEnableShareableLink(previousState => !previousState);
  };
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      flex: 1
    },
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Text, {
    style: [TextTheme.normal, {
      margin: 10
    }]
  }, "Place content here you would like to make available to developers when developer mode is enabled."), /*#__PURE__*/React.createElement(View, {
    style: styles.settingContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Text, {
    accessible: false,
    style: styles.settingLabelText
  }, t('Verifier.UseVerifierCapability'))), /*#__PURE__*/React.createElement(Pressable, {
    style: styles.settingSwitchContainer,
    accessibilityLabel: t('Verifier.Toggle'),
    accessibilityRole: 'switch',
    testID: testIdWithKey('ToggleVerifierCapability')
  }, /*#__PURE__*/React.createElement(Switch, {
    trackColor: {
      false: ColorPallet.grayscale.lightGrey,
      true: ColorPallet.brand.primaryDisabled
    },
    thumbColor: useVerifierCapability ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey,
    ios_backgroundColor: ColorPallet.grayscale.lightGrey,
    onValueChange: toggleVerifierCapabilitySwitch,
    testID: testIdWithKey('VerifierCapabilitySwitchElement'),
    value: useVerifierCapability
  }))), /*#__PURE__*/React.createElement(View, {
    style: styles.settingContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Text, {
    accessible: false,
    style: styles.settingLabelText
  }, t('Verifier.AcceptDevCredentials'))), /*#__PURE__*/React.createElement(Pressable, {
    style: styles.settingSwitchContainer,
    accessibilityLabel: t('Verifier.Toggle'),
    accessibilityRole: 'switch',
    testID: testIdWithKey('ToggleAcceptDevCredentials')
  }, /*#__PURE__*/React.createElement(Switch, {
    trackColor: {
      false: ColorPallet.grayscale.lightGrey,
      true: ColorPallet.brand.primaryDisabled
    },
    thumbColor: acceptDevCredentials ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey,
    ios_backgroundColor: ColorPallet.grayscale.lightGrey,
    onValueChange: toggleAcceptDevCredentialsSwitch,
    testID: testIdWithKey('AcceptDevCredentialsSwitchElement'),
    value: acceptDevCredentials
  }))), /*#__PURE__*/React.createElement(View, {
    style: styles.settingContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.settingLabelText
  }, t('Connection.UseConnectionInviterCapability'))), /*#__PURE__*/React.createElement(Pressable, {
    style: styles.settingSwitchContainer,
    accessibilityLabel: t('Connection.Toggle'),
    accessibilityRole: 'switch',
    testID: testIdWithKey('ToggleConnectionInviterCapabilitySwitch')
  }, /*#__PURE__*/React.createElement(Switch, {
    trackColor: {
      false: ColorPallet.grayscale.lightGrey,
      true: ColorPallet.brand.primaryDisabled
    },
    thumbColor: useConnectionInviterCapability ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey,
    ios_backgroundColor: ColorPallet.grayscale.lightGrey,
    onValueChange: toggleConnectionInviterCapabilitySwitch,
    testID: testIdWithKey('ConnectionInviterCapabilitySwitchElement'),
    value: useConnectionInviterCapability
  }))), /*#__PURE__*/React.createElement(View, {
    style: styles.settingContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.settingLabelText
  }, t('Verifier.UseDevVerifierTemplates'))), /*#__PURE__*/React.createElement(Pressable, {
    style: styles.settingSwitchContainer,
    accessibilityLabel: t('Verifier.ToggleDevTemplates'),
    accessibilityRole: 'switch',
    testID: testIdWithKey('ToggleDevVerifierTemplatesSwitch')
  }, /*#__PURE__*/React.createElement(Switch, {
    trackColor: {
      false: ColorPallet.grayscale.lightGrey,
      true: ColorPallet.brand.primaryDisabled
    },
    thumbColor: useDevVerifierTemplates ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey,
    ios_backgroundColor: ColorPallet.grayscale.lightGrey,
    onValueChange: toggleDevVerifierTemplatesSwitch,
    testID: testIdWithKey('DevVerifierTemplatesSwitchElement'),
    value: useDevVerifierTemplates
  }))), !store.onboarding.didCreatePIN && /*#__PURE__*/React.createElement(View, {
    style: styles.settingContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.settingLabelText
  }, t('NameWallet.EnableWalletNaming'))), /*#__PURE__*/React.createElement(Pressable, {
    style: styles.settingSwitchContainer,
    accessibilityLabel: t('NameWallet.ToggleWalletNaming'),
    accessibilityRole: 'switch',
    testID: testIdWithKey('ToggleEnableWalletNamingSwitch')
  }, /*#__PURE__*/React.createElement(Switch, {
    trackColor: {
      false: ColorPallet.grayscale.lightGrey,
      true: ColorPallet.brand.primaryDisabled
    },
    thumbColor: enableWalletNaming ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey,
    ios_backgroundColor: ColorPallet.grayscale.lightGrey,
    onValueChange: toggleWalletNamingSwitch,
    testID: testIdWithKey('EnableWalletNamingSwitchElement'),
    value: enableWalletNaming
  }))), /*#__PURE__*/React.createElement(View, {
    style: styles.settingContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.settingLabelText
  }, t('Settings.PreventAutoLock'))), /*#__PURE__*/React.createElement(Pressable, {
    style: styles.settingSwitchContainer,
    accessibilityLabel: t('Settings.TogglePreventAutoLock'),
    accessibilityRole: 'switch',
    testID: testIdWithKey('TogglePreventAutoLockSwitch')
  }, /*#__PURE__*/React.createElement(Switch, {
    trackColor: {
      false: ColorPallet.grayscale.lightGrey,
      true: ColorPallet.brand.primaryDisabled
    },
    thumbColor: preventAutoLock ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey,
    ios_backgroundColor: ColorPallet.grayscale.lightGrey,
    onValueChange: togglePreventAutoLockSwitch,
    testID: testIdWithKey('PreventAutoLockSwitchElement'),
    value: preventAutoLock
  }))), /*#__PURE__*/React.createElement(View, {
    style: styles.settingContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.settingLabelText
  }, t('History.UseHistoryCapability'))), /*#__PURE__*/React.createElement(Pressable, {
    style: styles.settingSwitchContainer,
    accessibilityLabel: t('History.UseHistoryCapabilityToggle'),
    accessibilityRole: 'switch',
    testID: testIdWithKey('HistoryCapabilitySwitch')
  }, /*#__PURE__*/React.createElement(Switch, {
    trackColor: {
      false: ColorPallet.grayscale.lightGrey,
      true: ColorPallet.brand.primaryDisabled
    },
    thumbColor: useHistoryCapability ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey,
    ios_backgroundColor: ColorPallet.grayscale.lightGrey,
    onValueChange: toggleHistoryCapabilitySwitch,
    testID: testIdWithKey('HistoryCapabilitySwitchElement'),
    value: useHistoryCapability
  }))), /*#__PURE__*/React.createElement(View, {
    style: styles.settingContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.settingLabelText
  }, t('PasteUrl.UseShareableLink'))), /*#__PURE__*/React.createElement(Pressable, {
    style: styles.settingSwitchContainer,
    accessibilityLabel: t('PasteUrl.UseShareableLink'),
    accessibilityRole: 'switch',
    testID: testIdWithKey('ToggleUseShareableLink')
  }, /*#__PURE__*/React.createElement(Switch, {
    trackColor: {
      false: ColorPallet.grayscale.lightGrey,
      true: ColorPallet.brand.primaryDisabled
    },
    thumbColor: enableShareableLink ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey,
    ios_backgroundColor: ColorPallet.grayscale.lightGrey,
    onValueChange: toggleShareableLinkSwitch,
    testID: testIdWithKey('ShareableLinkSwitchElement'),
    value: enableShareableLink
  })))));
};
export default Developer;
//# sourceMappingURL=Developer.js.map