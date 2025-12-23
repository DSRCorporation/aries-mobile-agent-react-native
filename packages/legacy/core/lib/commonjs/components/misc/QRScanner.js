"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _MaterialCommunityIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialCommunityIcons"));
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _navigators = require("../../types/navigators");
var _testable = require("../../utils/testable");
var _InfoBox = _interopRequireWildcard(require("../misc/InfoBox"));
var _DismissiblePopupModal = _interopRequireDefault(require("../modals/DismissiblePopupModal"));
var _QRScannerTorch = _interopRequireDefault(require("./QRScannerTorch"));
var _ScanCamera = _interopRequireDefault(require("./ScanCamera"));
var _containerApi = require("../../container-api");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const QRScanner = ({
  handleCodeScan,
  error,
  enableCameraOnError
}) => {
  const navigation = (0, _native.useNavigation)();
  const [{
    showScanHelp,
    showScanButton
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  const [torchActive, setTorchActive] = (0, _react.useState)(false);
  const [showInfoBox, setShowInfoBox] = (0, _react.useState)(false);
  const [showErrorDetailsModal, setShowErrorDetailsModal] = (0, _react.useState)(false);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1
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
    textStyle: {
      ...TextTheme.title,
      color: 'white',
      marginHorizontal: 10,
      textAlign: 'center'
    }
  });
  const styleForState = ({
    pressed
  }) => [{
    opacity: pressed ? 0.2 : 1
  }];
  const toggleShowInfoBox = () => setShowInfoBox(!showInfoBox);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
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
    error: error,
    enableCameraOnError: enableCameraOnError
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
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
      marginHorizontal: 24,
      height: 24,
      marginBottom: 60,
      flexDirection: 'row'
    }
  }, showScanHelp && /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    accessibilityLabel: t('Scan.ScanHelp'),
    accessibilityRole: 'button',
    testID: (0, _testable.testIdWithKey)('ScanHelp')
    // @ts-ignore
    ,
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
  }))));
};
var _default = exports.default = QRScanner;
//# sourceMappingURL=QRScanner.js.map