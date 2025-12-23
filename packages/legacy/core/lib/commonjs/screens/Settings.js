"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeDeviceInfo = require("react-native-device-info");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _HeaderButton = _interopRequireWildcard(require("../components/buttons/HeaderButton"));
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
var _containerApi = require("../container-api");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const touchCountToEnableBiometrics = 9;
const Settings = ({
  navigation
}) => {
  const {
    t,
    i18n
  } = (0, _reactI18next.useTranslation)();
  const [store, dispatch] = (0, _store2.useStore)();
  const developerOptionCount = (0, _react.useRef)(0);
  const {
    SettingsTheme,
    TextTheme,
    ColorPallet,
    Assets
  } = (0, _theme.useTheme)();
  const [{
    settings,
    enableTours,
    enablePushNotifications
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  const defaultIconSize = 24;
  const styles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: ColorPallet.brand.primaryBackground,
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexGrow: 1,
      paddingHorizontal: 25
    },
    itemSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: ColorPallet.brand.primaryBackground,
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
  const incrementDeveloperMenuCounter = () => {
    if (developerOptionCount.current >= touchCountToEnableBiometrics) {
      developerOptionCount.current = 0;
      dispatch({
        type: _store.DispatchAction.ENABLE_DEVELOPER_MODE,
        payload: [true]
      });
      return;
    }
    developerOptionCount.current = developerOptionCount.current + 1;
  };
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
          navigation.navigate(_navigators.Screens.NameWallet);
        },
        accessibilityLabel: t('NameWallet.EditWalletName'),
        testID: (0, _testable.testIdWithKey)('EditWalletName'),
        style: {
          color: ColorPallet.brand.primary
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
      onPress: () => navigation.navigate(_navigators.Screens.UseBiometry)
    }, {
      title: t('Settings.ChangePin'),
      value: undefined,
      accessibilityLabel: t('Settings.ChangePin'),
      testID: (0, _testable.testIdWithKey)('Change Pin'),
      onPress: () => {
        var _navigation$getParent3;
        return (_navigation$getParent3 = navigation.getParent()) === null || _navigation$getParent3 === void 0 ? void 0 : _navigation$getParent3.navigate(_navigators.Stacks.SettingStack, {
          screen: _navigators.Screens.CreatePIN,
          params: {
            updatePin: true
          }
        });
      }
    }, {
      title: t('Settings.Language'),
      value: currentLanguage,
      accessibilityLabel: t('Settings.Language'),
      testID: (0, _testable.testIdWithKey)('Language'),
      onPress: () => navigation.navigate(_navigators.Screens.Language)
    }]
  }, ...(settings || [])];

  // add optional push notifications menu to settings
  if (enablePushNotifications) {
    var _settingsSections$fin;
    (_settingsSections$fin = settingsSections.find(item => item.header.title === t('Settings.AppSettings'))) === null || _settingsSections$fin === void 0 || _settingsSections$fin.data.push({
      title: t('Settings.Notifications'),
      value: undefined,
      accessibilityLabel: t('Settings.Notifications'),
      testID: (0, _testable.testIdWithKey)('Notifications'),
      onPress: () => {
        var _navigation$getParent4;
        return (_navigation$getParent4 = navigation.getParent()) === null || _navigation$getParent4 === void 0 ? void 0 : _navigation$getParent4.navigate(_navigators.Stacks.SettingStack, {
          screen: _navigators.Screens.UsePushNotifications,
          params: {
            isMenu: true
          }
        });
      }
    });
  }

  // add optional history menu to settings
  if (store.preferences.useHistoryCapability) {
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
          var _navigation$getParent5;
          return (_navigation$getParent5 = navigation.getParent()) === null || _navigation$getParent5 === void 0 ? void 0 : _navigation$getParent5.navigate(_navigators.Stacks.ProofRequestsStack, {
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
          var _navigation$getParent6;
          return (_navigation$getParent6 = navigation.getParent()) === null || _navigation$getParent6 === void 0 ? void 0 : _navigation$getParent6.navigate(_navigators.Stacks.ConnectStack, {
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
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: titleTestID,
    numberOfLines: 1,
    accessibilityRole: 'header',
    style: [TextTheme.headingThree, {
      flexShrink: 1
    }]
  }, title)), iconRight && /*#__PURE__*/_react.default.createElement(_HeaderButton.default, {
    buttonLocation: _HeaderButton.ButtonLocation.Right,
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
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    accessibilityRole: 'header',
    style: [TextTheme.headingThree, {
      flexShrink: 1
    }]
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
    testID: testID,
    style: styles.sectionRow,
    onPress: onPress
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [TextTheme.settingsText, {
      marginRight: 14
    }]
  }, title), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [TextTheme.settingsText, {
      color: ColorPallet.brand.link
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
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: TextTheme.normal,
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