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
const AppGuideModal = ({
  title,
  description,
  onCallToActionPressed,
  onCallToActionLabel,
  onSecondCallToActionPressed,
  onSecondCallToActionLabel,
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
  const dismissIconName = 'clear';
  const iconColor = ColorPallet.notification.infoIcon;
  const styles = _reactNative.StyleSheet.create({
    modalCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPallet.notification.popupOverlay,
      padding: 10,
      minHeight: height,
      minWidth: width
    },
    container: {
      backgroundColor: ColorPallet.notification.info,
      borderColor: ColorPallet.notification.infoBorder,
      borderRadius: 5,
      borderWidth: 1,
      padding: 20,
      width: width - 50
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    headerTextContainer: {
      flex: 1,
      flexWrap: 'wrap'
    },
    headerText: {
      ...TextTheme.headingThree,
      alignSelf: 'flex-start',
      flexWrap: 'wrap',
      color: ColorPallet.notification.infoText
    },
    bodyText: {
      ...TextTheme.normal,
      flexShrink: 1,
      marginVertical: 16,
      color: ColorPallet.notification.infoText
    },
    dismissIcon: {
      alignSelf: 'center'
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    transparent: true
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.modalCenter
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
  })))), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.bodyText,
    testID: (0, _testable.testIdWithKey)('BodyText')
  }, description), onCallToActionPressed && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      width: '100%',
      marginBottom: 10
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: onCallToActionLabel || t('Global.Okay'),
    accessibilityLabel: onCallToActionLabel || t('Global.Okay'),
    testID: (0, _testable.testIdWithKey)('Primary'),
    buttonType: _Button.ButtonType.Primary,
    onPress: onCallToActionPressed
  })), onSecondCallToActionPressed && /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: onSecondCallToActionLabel || t('Global.Dismiss'),
    accessibilityLabel: onSecondCallToActionLabel || t('Global.Dismiss'),
    testID: (0, _testable.testIdWithKey)('Secondary'),
    buttonType: _Button.ButtonType.Secondary,
    onPress: onSecondCallToActionPressed
  })))));
};
var _default = exports.default = AppGuideModal;
//# sourceMappingURL=AppGuideModal.js.map