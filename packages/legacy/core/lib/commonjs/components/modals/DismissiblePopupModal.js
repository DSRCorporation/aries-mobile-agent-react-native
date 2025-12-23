"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
var _Button = _interopRequireWildcard(require("../buttons/Button"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DismissiblePopupModal = ({
  title,
  description,
  onCallToActionPressed,
  onCallToActionLabel,
  onDismissPressed
}) => {
  const {
    height,
    width
  } = (0, _reactNative.useWindowDimensions)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    TextTheme,
    ColorPallet
  } = (0, _theme.useTheme)();
  const iconSize = 30;
  const styles = _reactNative.StyleSheet.create({
    modalCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPallet.notification.popupOverlay,
      padding: 20,
      minHeight: height,
      minWidth: width
    },
    container: {
      backgroundColor: ColorPallet.brand.modalPrimaryBackground,
      borderColor: ColorPallet.brand.modalSecondaryBackground,
      borderRadius: 5,
      borderWidth: 1,
      padding: 10,
      minWidth: width - 2 * 25,
      flex: 1,
      maxHeight: '50%'
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
      paddingTop: 5
    },
    bodyContainer: {
      marginLeft: 10 + iconSize,
      paddingHorizontal: 5,
      paddingBottom: 5,
      flexShrink: 1,
      justifyContent: 'space-between'
    },
    headerTextContainer: {
      flexGrow: 1
    },
    headerText: {
      ...TextTheme.bold,
      alignSelf: 'flex-start',
      color: ColorPallet.notification.infoText
    },
    scrollViewContentContainer: {
      flexGrow: 1
    },
    scrollViewStyle: {
      flex: 1
    },
    bodyText: {
      ...TextTheme.normal,
      paddingVertical: 16,
      color: ColorPallet.notification.infoText
    },
    footer: {
      paddingTop: 10
    },
    infoIcon: {
      marginRight: 10,
      alignSelf: 'center'
    },
    dismissIcon: {
      alignSelf: 'flex-end'
    }
  });
  const infoIconName = 'info';
  const dismissIconName = 'clear';
  const iconColor = ColorPallet.notification.infoIcon;
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    transparent: true
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onDismissPressed,
    accessible: false
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.modalCenter
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    accessible: false
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.infoIcon
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: infoIconName,
    size: iconSize,
    color: iconColor
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerTextContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerText,
    testID: (0, _testable.testIdWithKey)('HeaderText')
  }, title)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.dismissIcon
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onDismissPressed,
    testID: (0, _testable.testIdWithKey)('Dismiss'),
    accessibilityLabel: t('Global.Dismiss'),
    accessibilityRole: 'button',
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: dismissIconName,
    size: iconSize,
    color: iconColor
  })))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.bodyContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    showsVerticalScrollIndicator: false,
    contentContainerStyle: styles.scrollViewContentContainer,
    style: styles.scrollViewStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    onStartShouldSetResponder: () => true
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    selectable: true,
    style: styles.bodyText,
    testID: (0, _testable.testIdWithKey)('BodyText')
  }, description))), onCallToActionPressed && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.footer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: onCallToActionLabel || t('Global.Okay'),
    accessibilityLabel: onCallToActionLabel || t('Global.Okay'),
    testID: (0, _testable.testIdWithKey)('Okay'),
    buttonType: _Button.ButtonType.ModalPrimary,
    onPress: onCallToActionPressed
  }))))))));
};
var _default = exports.default = DismissiblePopupModal;
//# sourceMappingURL=DismissiblePopupModal.js.map