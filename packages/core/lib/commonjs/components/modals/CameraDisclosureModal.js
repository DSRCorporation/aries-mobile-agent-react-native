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
var _ThemedText = require("../texts/ThemedText");
var _SafeAreaModal = _interopRequireDefault(require("./SafeAreaModal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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
    ColorPalette
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: ColorPalette.brand.modalPrimaryBackground,
      padding: 20
    },
    messageText: {
      marginTop: 30
    },
    controlsContainer: {
      backgroundColor: ColorPalette.brand.modalPrimaryBackground,
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
  return /*#__PURE__*/_react.default.createElement(_SafeAreaModal.default, {
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
      backgroundColor: ColorPalette.brand.modalPrimaryBackground,
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "modalHeadingOne",
    testID: (0, _testable.testIdWithKey)('AllowCameraUse'),
    accessibilityRole: "header"
  }, t('CameraDisclosure.AllowCameraUse')), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "modalNormal",
    style: styles.messageText
  }, t('CameraDisclosure.CameraDisclosure')), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "modalNormal",
    style: [styles.messageText, {
      marginBottom: 20
    }]
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