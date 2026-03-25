"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _didcomm = require("@credo-ts/didcomm");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _MaterialCommunityIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialCommunityIcons"));
var _constants = require("../../constants");
var _store = require("../../contexts/store");
var _theme = require("../../contexts/theme");
var _connections = require("../../hooks/connections");
var _navigators = require("../../types/navigators");
var _helpers = require("../../utils/helpers");
var _testable = require("../../utils/testable");
var _LoadingIndicator = _interopRequireDefault(require("../animated/LoadingIndicator"));
var _IconButton = _interopRequireWildcard(require("../buttons/IconButton"));
var _DismissiblePopupModal = _interopRequireDefault(require("../modals/DismissiblePopupModal"));
var _SafeAreaModal = _interopRequireDefault(require("../modals/SafeAreaModal"));
var _InfoBox = _interopRequireWildcard(require("./InfoBox"));
var _containerApi = require("../../container-api");
var _ThemedText = require("../texts/ThemedText");
var _QRRenderer = _interopRequireDefault(require("./QRRenderer"));
var _QRScannerTorch = _interopRequireDefault(require("./QRScannerTorch"));
var _ScanCamera = _interopRequireDefault(require("./ScanCamera"));
var _ScanTab = _interopRequireDefault(require("./ScanTab"));
var _SVGOverlay = _interopRequireWildcard(require("./SVGOverlay"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const QRScanner = ({
  showTabs = false,
  defaultToConnect,
  handleCodeScan,
  error,
  enableCameraOnError,
  navigation
}) => {
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const {
    width
  } = (0, _reactNative.useWindowDimensions)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette,
    TextTheme,
    TabTheme
  } = (0, _theme.useTheme)();
  const [store] = (0, _store.useStore)();
  const [{
    showScanHelp,
    showScanButton,
    showScanErrorButton = true
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  const [firstTabActive, setFirstTabActive] = (0, _react.useState)(!defaultToConnect);
  const [invitation, setInvitation] = (0, _react.useState)(undefined);
  const [recordId, setRecordId] = (0, _react.useState)(undefined);
  const record = (0, _connections.useConnectionByOutOfBandId)(recordId || '');
  const [torchActive, setTorchActive] = (0, _react.useState)(false);
  const [showInfoBox, setShowInfoBox] = (0, _react.useState)(false);
  const [showErrorDetailsModal, setShowErrorDetailsModal] = (0, _react.useState)(false);
  const qrSize = width - 40;
  const styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1
    },
    mainSafeArea: {
      flex: 1,
      backgroundColor: ColorPalette.brand.secondaryBackground
    },
    bottomSafeArea: {
      flex: 0,
      backgroundColor: TabTheme.tabBarSecondaryBackgroundColor
    },
    cameraViewContainer: {
      flex: 1,
      justifyContent: 'space-between'
    },
    messageContainer: {
      marginHorizontal: 40,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      paddingTop: 30
    },
    // no properties needed, this is just a helpful label
    bottomButtonsContainer: {},
    icon: {
      color: ColorPalette.grayscale.white,
      padding: 4
    },
    textStyle: {
      color: 'white',
      marginHorizontal: 10,
      textAlign: 'center'
    },
    // all styles below are only used when tabs are enabled
    tabContainer: {
      flexDirection: 'row',
      ...TabTheme.tabBarStyle,
      position: 'relative'
    },
    qrContainer: {
      marginTop: 10,
      flex: 1
    },
    walletName: {
      textAlign: 'center'
    },
    secondaryText: {
      marginTop: 20,
      textAlign: 'center'
    }
  });
  const createInvitation = (0, _react.useCallback)(async () => {
    setInvitation(undefined);
    const result = await (0, _helpers.createConnectionInvitation)(agent);
    if (result) {
      setRecordId(result.record.id);
      setInvitation(result.invitationUrl);
    }
  }, [agent]);
  const handleEdit = (0, _react.useCallback)(() => {
    navigation.navigate(_navigators.Screens.RenameWallet);
  }, [navigation]);
  (0, _react.useEffect)(() => {
    // Effect not required if tabs are not enabled
    if (!showTabs) return;
    let headerRight = invitation ? /*#__PURE__*/_react.default.createElement(_IconButton.default, {
      buttonLocation: _IconButton.ButtonLocation.Right,
      accessibilityLabel: t('Global.Share'),
      testID: (0, _testable.testIdWithKey)('ShareButton'),
      onPress: () => {
        _reactNative.Share.share({
          message: invitation ?? ''
        });
      },
      icon: "share-variant"
    }) : undefined;
    let title = t('Scan.MyQRCode');
    if (firstTabActive) {
      headerRight = /*#__PURE__*/_react.default.createElement(_IconButton.default, {
        buttonLocation: _IconButton.ButtonLocation.Right,
        accessibilityLabel: t('Global.Share'),
        testID: (0, _testable.testIdWithKey)('ShareButton'),
        onPress: () => {
          navigation.navigate(_navigators.Screens.PasteUrl);
        },
        icon: "link"
      });
      title = t('Scan.ScanQRCode');
    }
    if (!store.preferences.enableShareableLink) {
      headerRight = undefined;
    }
    navigation.setOptions({
      title,
      headerRight: () => headerRight
    });
  }, [showTabs, invitation, t, firstTabActive, navigation, store.preferences.enableShareableLink]);
  (0, _react.useEffect)(() => {
    // Effect not required if tabs are not enabled
    if (showTabs && !firstTabActive) {
      createInvitation();
    }
  }, [showTabs, firstTabActive, createInvitation, store.preferences.walletName]);
  (0, _react.useEffect)(() => {
    // Effect not required if tabs are not enabled
    if (showTabs && (record === null || record === void 0 ? void 0 : record.state) === _didcomm.DidCommDidExchangeState.Completed) {
      var _navigation$getParent;
      (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.Stacks.ConnectionStack, {
        screen: _navigators.Screens.Connection,
        params: {
          oobRecordId: recordId
        }
      });
    }
  }, [showTabs, record, navigation, recordId]);
  const styleForState = ({
    pressed
  }) => [{
    opacity: pressed ? 0.2 : 1
  }];
  const toggleShowInfoBox = () => setShowInfoBox(!showInfoBox);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    edges: ['left', 'right'],
    style: styles.mainSafeArea,
    testID: (0, _testable.testIdWithKey)('QRScanner')
  }, !showTabs || firstTabActive ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ScanCamera.default, {
    handleCodeScan: handleCodeScan,
    error: error,
    enableCameraOnError: enableCameraOnError,
    torchActive: torchActive
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _reactNative.StyleSheet.absoluteFill,
    pointerEvents: "none",
    testID: (0, _testable.testIdWithKey)('ScanOverlay')
  }, /*#__PURE__*/_react.default.createElement(_SVGOverlay.default, {
    maskType: _SVGOverlay.MaskType.QR_CODE,
    strokeColor: ColorPalette.grayscale.white
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.cameraViewContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.messageContainer
  }, error ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
    style: styles.icon,
    name: "cancel",
    size: 40
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    testID: (0, _testable.testIdWithKey)('ErrorMessage'),
    style: styles.textStyle
  }, error.message), showScanErrorButton && /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: () => setShowErrorDetailsModal(true),
    accessibilityLabel: t('Scan.ShowDetails'),
    accessibilityRole: 'button',
    testID: (0, _testable.testIdWithKey)('ShowDetails'),
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
    name: "information-outline",
    size: 40,
    style: styles.icon
  }))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
    name: "qrcode-scan",
    size: 40,
    style: styles.icon
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "title",
    style: styles.textStyle
  }, t('Scan.WillScanAutomatically')))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.bottomButtonsContainer
  }, showScanButton && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    accessibilityLabel: t('Scan.ScanNow'),
    accessibilityRole: 'button',
    testID: (0, _testable.testIdWithKey)('ScanNow'),
    onPress: toggleShowInfoBox,
    style: styleForState,
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
    name: "circle-outline",
    size: 60,
    style: {
      color: 'white',
      marginBottom: -15
    }
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginHorizontal: 24,
      height: 24,
      marginBottom: 60,
      flexDirection: 'row'
    }
  }, showScanHelp && /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    accessibilityLabel: t('Scan.ScanHelp'),
    accessibilityRole: 'button',
    testID: (0, _testable.testIdWithKey)('ScanHelp'),
    onPress: () => navigation.navigate(_navigators.Screens.ScanHelp),
    style: styleForState,
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
    name: "help-circle",
    size: 24,
    style: {
      color: 'white'
    }
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      width: 10,
      marginLeft: 'auto'
    }
  }), /*#__PURE__*/_react.default.createElement(_QRScannerTorch.default, {
    active: torchActive,
    onPress: () => setTorchActive(!torchActive)
  })))), /*#__PURE__*/_react.default.createElement(_SafeAreaModal.default, {
    visible: showInfoBox,
    animationType: "fade",
    transparent: true
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1,
      paddingHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)'
    }
  }, /*#__PURE__*/_react.default.createElement(_InfoBox.default, {
    notificationType: _InfoBox.InfoBoxType.Info,
    title: t('Scan.BadQRCode'),
    description: t('Scan.BadQRCodeDescription'),
    onCallToActionPressed: toggleShowInfoBox
  }))), showErrorDetailsModal && /*#__PURE__*/_react.default.createElement(_DismissiblePopupModal.default, {
    title: t('Scan.ErrorDetails'),
    description: (error === null || error === void 0 ? void 0 : error.details) || t('Scan.NoDetails'),
    onCallToActionLabel: t('Global.Dismiss'),
    onCallToActionPressed: () => setShowErrorDetailsModal(false),
    onDismissPressed: () => setShowErrorDetailsModal(false)
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.qrContainer
  }, !invitation && /*#__PURE__*/_react.default.createElement(_LoadingIndicator.default, null), invitation && /*#__PURE__*/_react.default.createElement(_QRRenderer.default, {
    value: invitation,
    size: qrSize
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      paddingHorizontal: 20,
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "headingTwo",
    testID: (0, _testable.testIdWithKey)('WalletName'),
    style: [styles.walletName, {
      paddingHorizontal: 20
    }]
  }, store.preferences.walletName), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    buttonLocation: _IconButton.ButtonLocation.Right,
    accessibilityLabel: t('NameWallet.EditWalletName'),
    testID: (0, _testable.testIdWithKey)('EditWalletName'),
    onPress: handleEdit,
    icon: 'pencil',
    iconTintColor: TextTheme.headingTwo.color
  })), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: styles.secondaryText
  }, t('Connection.ShareQR'))))), showTabs ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    accessible: true,
    style: styles.tabContainer,
    accessibilityRole: "tablist"
  }, /*#__PURE__*/_react.default.createElement(_ScanTab.default, {
    title: t('Scan.ScanQRCode'),
    iconName: 'crop-free',
    onPress: () => setFirstTabActive(true),
    active: firstTabActive
  }), /*#__PURE__*/_react.default.createElement(_ScanTab.default, {
    title: t('Scan.MyQRCode'),
    iconName: 'qr-code',
    onPress: () => setFirstTabActive(false),
    active: !firstTabActive
  })) : null), showTabs ? /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    edges: ['bottom'],
    style: styles.bottomSafeArea
  }) : null);
};
var _default = exports.default = QRScanner;
//# sourceMappingURL=QRScanner.js.map