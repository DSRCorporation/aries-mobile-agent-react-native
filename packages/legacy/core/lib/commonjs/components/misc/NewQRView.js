"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@credo-ts/core");
var _reactHooks = require("@credo-ts/react-hooks");
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
var _HeaderButton = _interopRequireWildcard(require("../buttons/HeaderButton"));
var _InfoBox = _interopRequireWildcard(require("../misc/InfoBox"));
var _DismissiblePopupModal = _interopRequireDefault(require("../modals/DismissiblePopupModal"));
var _QRRenderer = _interopRequireDefault(require("./QRRenderer"));
var _QRScannerTorch = _interopRequireDefault(require("./QRScannerTorch"));
var _ScanCamera = _interopRequireDefault(require("./ScanCamera"));
var _ScanTab = _interopRequireDefault(require("./ScanTab"));
var _containerApi = require("../../container-api");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const NewQRView = ({
  defaultToConnect,
  handleCodeScan,
  error,
  enableCameraOnError,
  navigation
}) => {
  const {
    width
  } = (0, _reactNative.useWindowDimensions)();
  const qrSize = width - 40;
  const [store] = (0, _store.useStore)();
  const [{
    showScanHelp,
    showScanButton
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  const [showInfoBox, setShowInfoBox] = (0, _react.useState)(false);
  const [torchActive, setTorchActive] = (0, _react.useState)(false);
  const [showErrorDetailsModal, setShowErrorDetailsModal] = (0, _react.useState)(false);
  const [firstTabActive, setFirstTabActive] = (0, _react.useState)(!defaultToConnect);
  const [invitation, setInvitation] = (0, _react.useState)(undefined);
  const [recordId, setRecordId] = (0, _react.useState)(undefined);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPallet,
    TextTheme,
    TabTheme
  } = (0, _theme.useTheme)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const styles = _reactNative.StyleSheet.create({
    mainSafeArea: {
      flex: 1,
      backgroundColor: ColorPallet.brand.secondaryBackground
    },
    bottomSafeArea: {
      flex: 0,
      backgroundColor: ColorPallet.brand.primaryBackground
    },
    camera: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    cameraViewContainer: {
      alignItems: 'center',
      flex: 1,
      width: '100%'
    },
    viewFinder: {
      width: 250,
      height: 250,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: ColorPallet.grayscale.white
    },
    viewFinderContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    messageContainer: {
      marginHorizontal: 40,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      paddingTop: 30
    },
    icon: {
      color: ColorPallet.grayscale.white,
      padding: 4
    },
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
      ...TextTheme.headingTwo,
      textAlign: 'center'
    },
    secondaryText: {
      ...TextTheme.normal,
      marginTop: 20,
      textAlign: 'center'
    },
    textStyle: {
      ...TextTheme.title,
      color: 'white',
      marginHorizontal: 10,
      textAlign: 'center'
    },
    editButton: {
      ...TextTheme.headingTwo,
      marginBottom: 20,
      marginLeft: 10,
      color: ColorPallet.brand.primary
    }
  });
  const createInvitation = (0, _react.useCallback)(async () => {
    setInvitation(undefined);
    const result = await (0, _helpers.createConnectionInvitation)(agent);
    if (result) {
      setRecordId(result.record.id);
      setInvitation(result.invitationUrl);
    }
  }, []);
  const handleEdit = () => {
    navigation.navigate(_navigators.Screens.NameWallet);
  };
  const scanPasteUrl = () => /*#__PURE__*/_react.default.createElement(_HeaderButton.default, {
    buttonLocation: _HeaderButton.ButtonLocation.Right,
    accessibilityLabel: t('Global.Share'),
    testID: (0, _testable.testIdWithKey)('ShareButton'),
    onPress: () => {
      navigation.navigate(_navigators.Screens.PasteUrl);
    },
    icon: "link"
  });
  const scanShareUrl = () => /*#__PURE__*/_react.default.createElement(_HeaderButton.default, {
    buttonLocation: _HeaderButton.ButtonLocation.Right,
    accessibilityLabel: t('Global.Share'),
    testID: (0, _testable.testIdWithKey)('ShareButton'),
    onPress: () => {
      _reactNative.Share.share({
        message: invitation ?? ''
      });
    },
    icon: "share-variant"
  });
  (0, _react.useEffect)(() => {
    let headerRight = invitation ? scanShareUrl : undefined;
    let title = t('Scan.MyQRCode');
    if (firstTabActive) {
      headerRight = scanPasteUrl;
      title = t('Scan.ScanQRCode');
    }
    if (!store.preferences.enableShareableLink) {
      headerRight = undefined;
    }
    navigation.setOptions({
      title,
      headerRight
    });
  }, [firstTabActive, invitation, store.preferences.enableShareableLink]);
  (0, _react.useEffect)(() => {
    if (!firstTabActive) {
      createInvitation();
    }
  }, [firstTabActive, store.preferences.walletName]);
  const record = (0, _connections.useConnectionByOutOfBandId)(recordId || '');
  (0, _react.useEffect)(() => {
    if ((record === null || record === void 0 ? void 0 : record.state) === _core.DidExchangeState.Completed) {
      var _navigation$getParent;
      (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.Stacks.ConnectionStack, {
        screen: _navigators.Screens.Connection,
        params: {
          oobRecordId: recordId
        }
      });
    }
  }, [record]);
  const styleForState = ({
    pressed
  }) => [{
    opacity: pressed ? 0.2 : 1
  }];
  const toggleShowInfoBox = () => setShowInfoBox(!showInfoBox);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    edges: ['left', 'right'],
    style: styles.mainSafeArea
  }, firstTabActive ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
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
  }), /*#__PURE__*/_react.default.createElement(_ScanCamera.default, {
    handleCodeScan: handleCodeScan,
    enableCameraOnError: enableCameraOnError,
    error: error,
    torchActive: torchActive
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.cameraViewContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.messageContainer
  }, error ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
    style: styles.icon,
    name: "cancel",
    size: 40
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: (0, _testable.testIdWithKey)('ErrorMessage'),
    style: styles.textStyle
  }, error.message), /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
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
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.textStyle
  }, t('Scan.WillScanAutomatically')))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.viewFinderContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.viewFinder
  })), showScanButton && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
      width: '90%',
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
  })))) : /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: (0, _testable.testIdWithKey)('WalletName'),
    style: [styles.walletName, {
      paddingHorizontal: 20
    }]
  }, store.preferences.walletName), /*#__PURE__*/_react.default.createElement(_HeaderButton.default, {
    buttonLocation: _HeaderButton.ButtonLocation.Right,
    accessibilityLabel: t('NameWallet.EditWalletName'),
    testID: (0, _testable.testIdWithKey)('EditWalletName'),
    onPress: handleEdit,
    icon: 'pencil',
    iconTintColor: styles.walletName.color
  })), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.secondaryText
  }, t('Connection.ShareQR'))))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.tabContainer
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
  }))), /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    edges: ['bottom'],
    style: styles.bottomSafeArea
  }));
};
var _default = exports.default = NewQRView;
//# sourceMappingURL=NewQRView.js.map