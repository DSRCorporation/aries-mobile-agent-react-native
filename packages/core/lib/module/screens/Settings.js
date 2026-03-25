import React from 'react';
import { useTranslation } from 'react-i18next';
import { LockoutReason, useAuth } from '../contexts/auth';
import { ScrollView, SectionList, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, Vibration, View } from 'react-native';
import { getBuildNumber, getVersion } from 'react-native-device-info';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconButton, { ButtonLocation } from '../components/buttons/IconButton';
import { ThemedText } from '../components/texts/ThemedText';
import { TOKENS, useServices } from '../container-api';
import { AutoLockTime } from '../contexts/activity';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { useDeveloperMode } from '../hooks/developer-mode';
import { Screens, Stacks } from '../types/navigators';
import { testIdWithKey } from '../utils/testable';
import { defaultAutoLockTime } from '../constants';
const Settings = ({
  navigation
}) => {
  var _customAutoLockTimes$, _store$preferences;
  const {
    t,
    i18n
  } = useTranslation();
  const [store] = useStore();
  const {
    lockOutUser
  } = useAuth();
  const onDevModeTriggered = () => {
    Vibration.vibrate();
    navigation.navigate(Screens.Developer);
  };
  const {
    incrementDeveloperMenuCounter
  } = useDeveloperMode(onDevModeTriggered);
  const {
    SettingsTheme,
    TextTheme,
    ColorPalette,
    Assets,
    maxFontSizeMultiplier
  } = useTheme();
  const [{
    settings,
    enableTours,
    enablePushNotifications,
    disableContactsInSettings,
    customAutoLockTimes
  }, historyEnabled] = useServices([TOKENS.CONFIG, TOKENS.HISTORY_ENABLED]);
  const defaultAutoLockoutTime = (customAutoLockTimes === null || customAutoLockTimes === void 0 || (_customAutoLockTimes$ = customAutoLockTimes.default) === null || _customAutoLockTimes$ === void 0 ? void 0 : _customAutoLockTimes$.time) ?? defaultAutoLockTime;
  const autoLockTime = ((_store$preferences = store.preferences) === null || _store$preferences === void 0 ? void 0 : _store$preferences.autoLockTime) ?? defaultAutoLockoutTime;
  const {
    fontScale
  } = useWindowDimensions();
  const fontIsGreaterThanCap = fontScale >= maxFontSizeMultiplier;
  const defaultIconSize = 24;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: ColorPalette.brand.primaryBackground,
      width: '100%'
    },
    section: {
      backgroundColor: SettingsTheme.groupBackground,
      paddingVertical: 24,
      flexGrow: 1
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 0,
      marginBottom: -11,
      paddingHorizontal: 25
    },
    sectionSeparator: {
      marginBottom: 10
    },
    sectionRow: {
      flexDirection: fontIsGreaterThanCap ? 'column' : 'row',
      alignItems: fontIsGreaterThanCap ? 'flex-start' : 'center',
      justifyContent: 'space-between',
      flexGrow: 1,
      paddingHorizontal: 25
    },
    itemSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: ColorPalette.brand.primaryBackground,
      marginHorizontal: 25
    },
    footer: {
      marginVertical: 25,
      alignItems: 'center'
    }
  });
  const currentLanguage = i18n.t('Language.code', {
    context: i18n.language
  });
  const settingsSections = [{
    header: {
      icon: {
        name: store.preferences.useConnectionInviterCapability ? 'person' : 'apartment',
        size: 30
      },
      title: store.preferences.useConnectionInviterCapability ? store.preferences.walletName : t('Screens.Contacts'),
      iconRight: {
        name: 'edit',
        action: () => {
          navigation.navigate(Screens.RenameWallet);
        },
        accessibilityLabel: t('NameWallet.EditWalletName'),
        testID: testIdWithKey('EditWalletName'),
        style: {
          color: ColorPalette.brand.primary
        }
      },
      titleTestID: store.preferences.useConnectionInviterCapability ? testIdWithKey('WalletName') : undefined
    },
    data: [{
      title: t('Screens.Contacts'),
      accessibilityLabel: t('Screens.Contacts'),
      testID: testIdWithKey('Contacts'),
      onPress: () => {
        var _navigation$getParent;
        return (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 ? void 0 : _navigation$getParent.navigate(Stacks.ContactStack, {
          screen: Screens.Contacts
        });
      }
    }, {
      title: t('Settings.WhatAreContacts'),
      accessibilityLabel: t('Settings.WhatAreContacts'),
      testID: testIdWithKey('WhatAreContacts'),
      onPress: () => {
        var _navigation$getParent2;
        return (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 ? void 0 : _navigation$getParent2.navigate(Stacks.ContactStack, {
          screen: Screens.WhatAreContacts
        });
      },
      value: undefined
    }]
  }, {
    header: {
      icon: {
        name: 'settings'
      },
      title: t('Settings.AppSettings')
    },
    data: [{
      title: t('Global.Biometrics'),
      value: store.preferences.useBiometry ? t('Global.On') : t('Global.Off'),
      accessibilityLabel: t('Global.Biometrics'),
      testID: testIdWithKey('Biometrics'),
      onPress: () => navigation.navigate(Screens.ToggleBiometry)
    }, {
      title: t('Settings.ChangePin'),
      accessibilityLabel: t('Settings.ChangePin'),
      testID: testIdWithKey('Change Pin'),
      onPress: () => navigation.navigate(Screens.ChangePIN)
    }, {
      title: t('Settings.Language'),
      value: currentLanguage,
      accessibilityLabel: t('Settings.Language'),
      testID: testIdWithKey('Language'),
      onPress: () => navigation.navigate(Screens.Language)
    }, {
      title: t('Settings.AutoLockTime'),
      value: autoLockTime !== AutoLockTime.Never ? t('AutoLockTimes.Preview', {
        autoLockTime
      }) : t('AutoLockTimes.Never'),
      accessibilityLabel: t('Settings.AutoLockTime'),
      testID: testIdWithKey('Lockout'),
      onPress: () => navigation.navigate(Screens.AutoLock)
    }]
  }, ...(settings || [])];

  // Remove the Contact section from Setting per TOKENS.CONFIG
  if (disableContactsInSettings) {
    settingsSections.shift();
  }

  // add optional push notifications menu to settings
  if (enablePushNotifications) {
    var _settingsSections$fin;
    (_settingsSections$fin = settingsSections.find(item => item.header.title === t('Settings.AppSettings'))) === null || _settingsSections$fin === void 0 || _settingsSections$fin.data.push({
      title: t('Settings.Notifications'),
      value: undefined,
      accessibilityLabel: t('Settings.Notifications'),
      testID: testIdWithKey('Notifications'),
      onPress: () => navigation.navigate(Screens.TogglePushNotifications)
    });
  }

  // add optional history menu to settings
  if (historyEnabled) {
    var _settingsSections$fin2;
    (_settingsSections$fin2 = settingsSections.find(item => item.header.title === t('Settings.AppSettings'))) === null || _settingsSections$fin2 === void 0 || _settingsSections$fin2.data.push({
      title: t('Global.History'),
      value: undefined,
      accessibilityLabel: t('Global.History'),
      testID: testIdWithKey('History'),
      onPress: () => navigation.navigate(Screens.HistorySettings)
    });
  }
  if (enableTours) {
    const section = settingsSections.find(item => item.header.title === t('Settings.AppSettings'));
    if (section) {
      section.data = [...section.data, {
        title: t('Settings.AppGuides'),
        value: store.tours.enableTours ? t('Global.On') : t('Global.Off'),
        accessibilityLabel: t('Settings.AppGuides'),
        testID: testIdWithKey('AppGuides'),
        onPress: () => navigation.navigate(Screens.Tours)
      }];
    }
  }
  if (store.preferences.developerModeEnabled) {
    const section = settingsSections.find(item => item.header.title === t('Settings.AppSettings'));
    if (section) {
      section.data = [...section.data, {
        title: t('Settings.Developer'),
        accessibilityLabel: t('Settings.Developer'),
        testID: testIdWithKey('DeveloperOptions'),
        onPress: () => navigation.navigate(Screens.Developer)
      }, {
        title: t('Settings.ConfigureMediator'),
        value: store.preferences.selectedMediator,
        accessibilityLabel: t('Settings.ConfigureMediator'),
        testID: testIdWithKey('ConfigureMediator'),
        onPress: () => navigation.navigate(Screens.ConfigureMediator)
      }, {
        title: t('Settings.Logout'),
        accessibilityLabel: t('Settings.Logout'),
        testID: testIdWithKey('Logout'),
        onPress: () => lockOutUser(LockoutReason.Logout)
      }];
    }
  }
  if (store.preferences.useVerifierCapability) {
    settingsSections.splice(1, 0, {
      header: {
        icon: {
          name: 'send'
        },
        title: t('Screens.ProofRequests')
      },
      data: [{
        title: t('Screens.SendProofRequest'),
        accessibilityLabel: t('Screens.ProofRequests'),
        testID: testIdWithKey('ProofRequests'),
        onPress: () => {
          var _navigation$getParent3;
          return (_navigation$getParent3 = navigation.getParent()) === null || _navigation$getParent3 === void 0 ? void 0 : _navigation$getParent3.navigate(Stacks.ProofRequestsStack, {
            screen: Screens.ProofRequests
          });
        }
      }]
    });
    if (!store.preferences.disableDataRetentionOption) {
      const section = settingsSections.find(item => item.header.title === t('Settings.AppSettings'));
      if (section) {
        section.data.splice(3, 0, {
          title: t('Settings.DataRetention'),
          value: store.preferences.useDataRetention ? t('Global.On') : t('Global.Off'),
          accessibilityLabel: t('Settings.DataRetention'),
          testID: testIdWithKey('DataRetention'),
          onPress: () => navigation.navigate(Screens.DataRetention)
        });
      }
    }
  }
  if (store.preferences.useConnectionInviterCapability) {
    const section = settingsSections.find(item => item.header.title === store.preferences.walletName);
    if (section) {
      section.data.splice(1, 0, {
        title: t('Settings.ScanMyQR'),
        accessibilityLabel: t('Settings.ScanMyQR'),
        testID: testIdWithKey('ScanMyQR'),
        onPress: () => {
          var _navigation$getParent4;
          return (_navigation$getParent4 = navigation.getParent()) === null || _navigation$getParent4 === void 0 ? void 0 : _navigation$getParent4.navigate(Stacks.ConnectStack, {
            screen: Screens.Scan,
            params: {
              defaultToConnect: true
            }
          });
        }
      });
    }
  }
  const SectionHeader = ({
    icon,
    iconRight,
    title,
    titleTestID
  }) =>
  // gate keep behind developer mode
  store.preferences.useConnectionInviterCapability ? /*#__PURE__*/React.createElement(View, {
    style: [styles.section, styles.sectionHeader, {
      justifyContent: iconRight ? 'space-between' : undefined
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    importantForAccessibility: 'no-hide-descendants',
    accessible: false,
    name: icon.name,
    size: icon.size ?? defaultIconSize,
    style: [{
      marginRight: 10,
      color: SettingsTheme.iconColor
    }, icon.style]
  }), /*#__PURE__*/React.createElement(ThemedText, {
    variant: "headingThree",
    testID: titleTestID,
    numberOfLines: 1,
    accessibilityRole: 'header',
    style: {
      flexShrink: 1
    }
  }, title)), iconRight && /*#__PURE__*/React.createElement(IconButton, {
    buttonLocation: ButtonLocation.Right,
    accessibilityLabel: iconRight.accessibilityLabel,
    testID: iconRight.testID,
    onPress: iconRight.action,
    icon: 'pencil',
    iconTintColor: TextTheme.headingThree.color
  })) : /*#__PURE__*/React.createElement(View, {
    style: [styles.section, styles.sectionHeader]
  }, /*#__PURE__*/React.createElement(Icon, {
    importantForAccessibility: 'no-hide-descendants',
    accessible: false,
    name: icon.name,
    size: 24,
    style: {
      marginRight: 10,
      color: SettingsTheme.iconColor
    }
  }), /*#__PURE__*/React.createElement(ThemedText, {
    maxFontSizeMultiplier: 1.8,
    variant: "headingThree",
    accessibilityRole: 'header',
    style: {
      flexShrink: 1
    }
  }, title));
  const SectionRow = ({
    title,
    value,
    accessibilityLabel,
    testID,
    onPress
  }) => /*#__PURE__*/React.createElement(ScrollView, {
    horizontal: true,
    style: styles.section,
    contentContainerStyle: {
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    accessible: true,
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: "button",
    testID: testID,
    style: styles.sectionRow,
    onPress: onPress
  }, /*#__PURE__*/React.createElement(ThemedText, {
    style: [TextTheme.settingsText, {
      marginRight: 14,
      maxWidth: fontIsGreaterThanCap ? '95%' : '100%'
    }]
  }, title), /*#__PURE__*/React.createElement(ThemedText, {
    style: [TextTheme.settingsText, {
      color: ColorPalette.brand.link
    }]
  }, value)));
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.container,
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/React.createElement(SectionList, {
    renderItem: ({
      item: {
        title,
        value,
        accessibilityLabel,
        testID,
        onPress
      }
    }) => /*#__PURE__*/React.createElement(SectionRow, {
      title: title,
      accessibilityLabel: accessibilityLabel,
      testID: testID ?? 'NoTestIdFound',
      value: value,
      onPress: onPress
    }),
    renderSectionHeader: ({
      section: {
        header: {
          title,
          icon,
          iconRight,
          titleTestID
        }
      }
    }) => /*#__PURE__*/React.createElement(SectionHeader, {
      icon: icon,
      iconRight: iconRight,
      title: title,
      titleTestID: titleTestID
    }),
    ItemSeparatorComponent: () => /*#__PURE__*/React.createElement(View, {
      style: {
        backgroundColor: SettingsTheme.groupBackground
      }
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.itemSeparator
    })),
    SectionSeparatorComponent: () => /*#__PURE__*/React.createElement(View, {
      style: styles.sectionSeparator
    }),
    ListFooterComponent: () => /*#__PURE__*/React.createElement(View, {
      style: styles.footer
    }, /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
      onPress: incrementDeveloperMenuCounter,
      disabled: store.preferences.developerModeEnabled
    }, /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(ThemedText, {
      testID: testIdWithKey('Version')
    }, `${t('Settings.Version')} ${getVersion()} ${t('Settings.Build')} (${getBuildNumber()})`), /*#__PURE__*/React.createElement(Assets.svg.logo, {
      style: {
        alignSelf: 'center'
      },
      width: 150,
      height: 75
    })))),
    sections: settingsSections,
    stickySectionHeadersEnabled: false
  }));
};
export default Settings;
//# sourceMappingURL=Settings.js.map