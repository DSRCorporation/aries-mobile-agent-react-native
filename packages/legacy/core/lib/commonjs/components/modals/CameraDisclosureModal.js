"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _theme = require("../../contexts/theme");
var _navigators = require("../../types/navigators");
var _testable = require("../../utils/testable");
var _Button = _interopRequireWildcard(require("../buttons/Button"));
var _DismissiblePopupModal = _interopRequireDefault(require("./DismissiblePopupModal"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CameraDisclosureModal = ({
  requestCameraUse
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const navigation = (0, _native.useNavigation)();
  const [modalVisible, setModalVisible] = (0, _react.useState)(true);
  const [showSettingsPopup, setShowSettingsPopup] = (0, _react.useState)(false);
  const [requestInProgress, setRequestInProgress] = (0, _react.useState)(false);
  const {
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: ColorPallet.brand.modalPrimaryBackground,
      padding: 20
    },
    messageText: {
      marginTop: 30
    },
    controlsContainer: {
      backgroundColor: ColorPallet.brand.modalPrimaryBackground,
      marginTop: 'auto',
      margin: 20
    },
    buttonContainer: {
      paddingTop: 10
    }
  });
  const onContinueTouched = async () => {
    setRequestInProgress(true);
    const granted = await requestCameraUse();
    if (!granted) {
      setShowSettingsPopup(true);
    }
    setRequestInProgress(false);
  };
  const onOpenSettingsTouched = async () => {
    var _navigation$getParent;
    setModalVisible(false);
    await _reactNative.Linking.openSettings();
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.TabStacks.HomeStack, {
      screen: _navigators.Screens.Home
    });
  };
  const onNotNowTouched = () => {
    var _navigation$getParent2;
    setModalVisible(false);
    (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(_navigators.TabStacks.HomeStack, {
      screen: _navigators.Screens.Home
    });
  };
  const onOpenSettingsDismissed = () => {
    setShowSettingsPopup(false);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    visible: modalVisible,
    animationType: 'slide',
    supportedOrientations: ['portrait', 'landscape'],
    transparent: true
  }, showSettingsPopup && /*#__PURE__*/_react.default.createElement(_DismissiblePopupModal.default, {
    title: t('CameraDisclosure.AllowCameraUse'),
    description: t('CameraDisclosure.ToContinueUsing'),
    onCallToActionLabel: t('CameraDisclosure.OpenSettings'),
    onCallToActionPressed: onOpenSettingsTouched,
    onDismissPressed: onOpenSettingsDismissed
  }), /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      backgroundColor: ColorPallet.brand.modalPrimaryBackground
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.modalHeadingOne,
    testID: (0, _testable.testIdWithKey)('AllowCameraUse')
  }, t('CameraDisclosure.AllowCameraUse')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [TextTheme.modalNormal, styles.messageText]
  }, t('CameraDisclosure.CameraDisclosure')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [TextTheme.modalNormal, styles.messageText]
  }, t('CameraDisclosure.ToContinueUsing'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.controlsContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Global.Continue'),
    accessibilityLabel: t('Global.Continue'),
    testID: (0, _testable.testIdWithKey)('Continue'),
    onPress: onContinueTouched,
    buttonType: _Button.ButtonType.ModalPrimary,
    disabled: requestInProgress
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Global.NotNow'),
    accessibilityLabel: t('Global.NotNow'),
    testID: (0, _testable.testIdWithKey)('NotNow'),
    onPress: onNotNowTouched,
    buttonType: _Button.ButtonType.ModalSecondary
  })))));
};
var _default = exports.default = CameraDisclosureModal;
//# sourceMappingURL=CameraDisclosureModal.js.map