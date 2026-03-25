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
var _ThemedText = require("../texts/ThemedText");
var _SafeAreaModal = _interopRequireDefault(require("./SafeAreaModal"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
    ColorPalette
  } = (0, _theme.useTheme)();
  const iconSize = 30;
  const dismissIconName = 'clear';
  const iconColor = ColorPalette.notification.infoIcon;
  const styles = _reactNative.StyleSheet.create({
    modalCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPalette.notification.popupOverlay,
      padding: 10,
      minHeight: height,
      minWidth: width
    },
    container: {
      backgroundColor: ColorPalette.notification.info,
      borderColor: ColorPalette.notification.infoBorder,
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
      alignSelf: 'flex-start',
      flexWrap: 'wrap',
      color: ColorPalette.notification.infoText
    },
    bodyText: {
      flexShrink: 1,
      marginVertical: 16,
      color: ColorPalette.notification.infoText
    },
    dismissIcon: {
      alignSelf: 'center'
    }
  });
  return /*#__PURE__*/_react.default.createElement(_SafeAreaModal.default, {
    transparent: true,
    accessibilityViewIsModal: true
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.modalCenter
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerTextContainer
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    maxFontSizeMultiplier: 1.5,
    variant: "headingThree",
    style: styles.headerText,
    testID: (0, _testable.testIdWithKey)('HeaderText'),
    accessibilityRole: "header"
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
  })))), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    maxFontSizeMultiplier: 1.5,
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
    onPress: onCallToActionPressed,
    maxfontSizeMultiplier: 1.5
  })), onSecondCallToActionPressed && /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: onSecondCallToActionLabel || t('Global.Dismiss'),
    accessibilityLabel: onSecondCallToActionLabel || t('Global.Dismiss'),
    testID: (0, _testable.testIdWithKey)('Secondary'),
    buttonType: _Button.ButtonType.Secondary,
    onPress: onSecondCallToActionPressed,
    maxfontSizeMultiplier: 1.5
  })))));
};
var _default = exports.default = AppGuideModal;
//# sourceMappingURL=AppGuideModal.js.map