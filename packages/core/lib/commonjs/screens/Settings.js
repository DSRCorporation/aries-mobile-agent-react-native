"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _auth = require("../contexts/auth");
var _reactNative = require("react-native");
var _reactNativeDeviceInfo = require("react-native-device-info");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _IconButton = _interopRequireWildcard(require("../components/buttons/IconButton"));
var _ThemedText = require("../components/texts/ThemedText");
var _containerApi = require("../container-api");
var _activity = require("../contexts/activity");
var _store = require("../contexts/store");
var _theme = require("../contexts/theme");
var _developerMode = require("../hooks/developer-mode");
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
var _constants = require("../constants");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Settings = ({
  navigation
}) => {
  var _customAutoLockTimes$, _store$preferences;
  const {
    t,
    i18n
  } = (0, _reactI18next.useTranslation)();
  const [store] = (0, _store.useStore)();
  const {
    lockOutUser
  } = (0, _auth.useAuth)();
  const onDevModeTriggered = () => {
    _reactNative.Vibration.vibrate();
    navigation.navigate(_navigators.Screens.Developer);
  };
  const {
    incrementDeveloperMenuCounter
  } = (0, _developerMode.useDeveloperMode)(onDevModeTriggered);
  const {
    SettingsTheme,
    TextTheme,
    ColorPalette,
    Assets,
    maxFontSizeMultiplier
  } = (0, _theme.useTheme)();
  const [{
    settings,
    enableTours,
    enablePushNotifications,
    disableContactsInSettings,
    customAutoLockTimes
  }, historyEnabled] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG, _containerApi.TOKENS.HISTORY_ENABLED]);
  const defaultAutoLockoutTime = (customAutoLockTimes === null || customAutoLockTimes === void 0 || (_customAutoLockTimes$ = customAutoLockTimes.default) === null || _customAutoLockTimes$ === void 0 ? void 0 : _customAutoLockTimes$.time) ?? _constants.defaultAutoLockTime;
  const autoLockTime = ((_store$preferences = store.preferences) === null || _store$preferences === void 0 ? void 0 : _store$preferences.autoLockTime) ?? defaultAutoLockoutTime;
  const {
    fontScale
  } = (0, _reactNative.useWindowDimensions)();
  const fontIsGreaterThanCap = fontScale >= maxFontSizeMultiplier;
  const defaultIconSize = 24;
  const styles = _reactNative.StyleSheet.create({
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
          navigation.navigate(_navigators.Screens.RenameWallet);
        },
        accessibilityLabel: t('NameWallet.EditWalletName'),
        testID: (0, _testable.testIdWithKey)('EditWalletName'),
        style: {
          color: ColorPalette.brand.primary
        }
      },
      titleTestID: store.preferences.useConnectionInviterCapability ? (0, _testable.testIdWithKey)('WalletName') : undefined
    },
    data: [{
      title: t('Screens.Contacts'),
      accessibilityLabel: t('Screens.Contacts'),
      testID: (0, _testable.testIdWithKey)('Contacts'),
      onPress: () => {
        var _navigation$getParent;
        return (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 ? void 0 : _navigation$getParent.navigate(_navigators.Stacks.ContactStack, {
          screen: _navigators.Screens.Contacts
        });
      }
    }, {
      title: t('Settings.WhatAreContacts'),
      accessibilityLabel: t('Settings.WhatAreContacts'),
      testID: (0, _testable.testIdWithKey)('WhatAreContacts'),
      onPress: () => {
        var _navigation$getParent2;
        return (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 ? void 0 : _navigation$getParent2.navigate(_navigators.Stacks.ContactStack, {
          screen: _navigators.Screens.WhatAreContacts
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
      testID: (0, _testable.testIdWithKey)('Biometrics'),
      onPress: () => navigation.navigate(_navigators.Screens.ToggleBiometry)
    }, {
      title: t('Settings.ChangePin'),
      accessibilityLabel: t('Settings.ChangePin'),
      testID: (0, _testable.testIdWithKey)('Change Pin'),
      onPress: () => navigation.navigate(_navigators.Screens.ChangePIN)
    }, {
      title: t('Settings.Language'),
      value: currentLanguage,
      accessibilityLabel: t('Settings.Language'),
      testID: (0, _testable.testIdWithKey)('Language'),
      onPress: () => navigation.navigate(_navigators.Screens.Language)
    }, {
      title: t('Settings.AutoLockTime'),
      value: autoLockTime !== _activity.AutoLockTime.Never ? t('AutoLockTimes.Preview', {
        autoLockTime
      }) : t('AutoLockTimes.Never'),
      accessibilityLabel: t('Settings.AutoLockTime'),
      testID: (0, _testable.testIdWithKey)('Lockout'),
      onPress: () => navigation.navigate(_navigators.Screens.AutoLock)
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
      testID: (0, _testable.testIdWithKey)('Notifications'),
      onPress: () => navigation.navigate(_navigators.Screens.TogglePushNotifications)
    });
  }

  // add optional history menu to settings
  if (historyEnabled) {
    var _settingsSections$fin2;
    (_settingsSections$fin2 = settingsSections.find(item => item.header.title === t('Settings.AppSettings'))) === null || _settingsSections$fin2 === void 0 || _settingsSections$fin2.data.push({
      title: t('Global.History'),
      value: undefined,
      accessibilityLabel: t('Global.History'),
      testID: (0, _testable.testIdWithKey)('History'),
      onPress: () => navigation.navigate(_navigators.Screens.HistorySettings)
    });
  }
  if (enableTours) {
    const section = settingsSections.find(item => item.header.title === t('Settings.AppSettings'));
    if (section) {
      section.data = [...section.data, {
        title: t('Settings.AppGuides'),
        value: store.tours.enableTours ? t('Global.On') : t('Global.Off'),
        accessibilityLabel: t('Settings.AppGuides'),
        testID: (0, _testable.testIdWithKey)('AppGuides'),
        onPress: () => navigation.navigate(_navigators.Screens.Tours)
      }];
    }
  }
  if (store.preferences.developerModeEnabled) {
    const section = settingsSections.find(item => item.header.title === t('Settings.AppSettings'));
    if (section) {
      section.data = [...section.data, {
        title: t('Settings.Developer'),
        accessibilityLabel: t('Settings.Developer'),
        testID: (0, _testable.testIdWithKey)('DeveloperOptions'),
        onPress: () => navigation.navigate(_navigators.Screens.Developer)
      }, {
        title: t('Settings.ConfigureMediator'),
        value: store.preferences.selectedMediator,
        accessibilityLabel: t('Settings.ConfigureMediator'),
        testID: (0, _testable.testIdWithKey)('ConfigureMediator'),
        onPress: () => navigation.navigate(_navigators.Screens.ConfigureMediator)
      }, {
        title: t('Settings.Logout'),
        accessibilityLabel: t('Settings.Logout'),
        testID: (0, _testable.testIdWithKey)('Logout'),
        onPress: () => lockOutUser(_auth.LockoutReason.Logout)
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
        testID: (0, _testable.testIdWithKey)('ProofRequests'),
        onPress: () => {
          var _navigation$getParent3;
          return (_navigation$getParent3 = navigation.getParent()) === null || _navigation$getParent3 === void 0 ? void 0 : _navigation$getParent3.navigate(_navigators.Stacks.ProofRequestsStack, {
            screen: _navigators.Screens.ProofRequests
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
          testID: (0, _testable.testIdWithKey)('DataRetention'),
          onPress: () => navigation.navigate(_navigators.Screens.DataRetention)
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
        testID: (0, _testable.testIdWithKey)('ScanMyQR'),
        onPress: () => {
          var _navigation$getParent4;
          return (_navigation$getParent4 = navigation.getParent()) === null || _navigation$getParent4 === void 0 ? void 0 : _navigation$getParent4.navigate(_navigators.Stacks.ConnectStack, {
            screen: _navigators.Screens.Scan,
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
  store.preferences.useConnectionInviterCapability ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.section, styles.sectionHeader, {
      justifyContent: iconRight ? 'space-between' : undefined
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    importantForAccessibility: 'no-hide-descendants',
    accessible: false,
    name: icon.name,
    size: icon.size ?? defaultIconSize,
    style: [{
      marginRight: 10,
      color: SettingsTheme.iconColor
    }, icon.style]
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "headingThree",
    testID: titleTestID,
    numberOfLines: 1,
    accessibilityRole: 'header',
    style: {
      flexShrink: 1
    }
  }, title)), iconRight && /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    buttonLocation: _IconButton.ButtonLocation.Right,
    accessibilityLabel: iconRight.accessibilityLabel,
    testID: iconRight.testID,
    onPress: iconRight.action,
    icon: 'pencil',
    iconTintColor: TextTheme.headingThree.color
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.section, styles.sectionHeader]
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    importantForAccessibility: 'no-hide-descendants',
    accessible: false,
    name: icon.name,
    size: 24,
    style: {
      marginRight: 10,
      color: SettingsTheme.iconColor
    }
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
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
  }) => /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    horizontal: true,
    style: styles.section,
    contentContainerStyle: {
      flexGrow: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessible: true,
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: "button",
    testID: testID,
    style: styles.sectionRow,
    onPress: onPress
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: [TextTheme.settingsText, {
      marginRight: 14,
      maxWidth: fontIsGreaterThanCap ? '95%' : '100%'
    }]
  }, title), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: [TextTheme.settingsText, {
      color: ColorPalette.brand.link
    }]
  }, value)));
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.container,
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.SectionList, {
    renderItem: ({
      item: {
        title,
        value,
        accessibilityLabel,
        testID,
        onPress
      }
    }) => /*#__PURE__*/_react.default.createElement(SectionRow, {
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
    }) => /*#__PURE__*/_react.default.createElement(SectionHeader, {
      icon: icon,
      iconRight: iconRight,
      title: title,
      titleTestID: titleTestID
    }),
    ItemSeparatorComponent: () => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        backgroundColor: SettingsTheme.groupBackground
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.itemSeparator
    })),
    SectionSeparatorComponent: () => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.sectionSeparator
    }),
    ListFooterComponent: () => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.footer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
      onPress: incrementDeveloperMenuCounter,
      disabled: store.preferences.developerModeEnabled
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      testID: (0, _testable.testIdWithKey)('Version')
    }, `${t('Settings.Version')} ${(0, _reactNativeDeviceInfo.getVersion)()} ${t('Settings.Build')} (${(0, _reactNativeDeviceInfo.getBuildNumber)()})`), /*#__PURE__*/_react.default.createElement(Assets.svg.logo, {
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
var _default = exports.default = Settings;
//# sourceMappingURL=Settings.js.map