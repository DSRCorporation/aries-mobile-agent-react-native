"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _theme = require("../../contexts/theme");
var _InfoBox = require("../misc/InfoBox");
var _ThemedText = require("./ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const iconSize = 30;
const offset = 10;
const InfoTextBox = ({
  children,
  type = _InfoBox.InfoBoxType.Info,
  iconVerticalPosition = 'high',
  iconHorizontalPosition = 'left',
  style = {},
  textStyle = {}
}) => {
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      backgroundColor: ColorPalette.notification.info,
      borderColor: ColorPalette.notification.infoBorder,
      ...style
    },
    row: {
      flexDirection: iconHorizontalPosition === 'left' ? 'row' : 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    text: {
      alignSelf: 'center',
      flex: 1,
      flexWrap: 'wrap',
      color: ColorPalette.notification.infoText,
      ...textStyle
    },
    iconContainer: {
      marginRight: iconHorizontalPosition === 'left' ? offset : 0,
      marginLeft: iconHorizontalPosition === 'right' ? offset : 0,
      alignSelf: iconVerticalPosition === 'high' ? 'flex-start' : 'center'
    }
  });
  let iconName = 'info';
  let iconColor = ColorPalette.notification.infoIcon;
  switch (type) {
    case _InfoBox.InfoBoxType.Info:
      break;
    case _InfoBox.InfoBoxType.Success:
      iconName = 'check-circle';
      iconColor = ColorPalette.notification.successIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPalette.notification.success,
        borderColor: ColorPalette.notification.successBorder
      };
      styles.text = {
        ...styles.text,
        color: ColorPalette.notification.successText
      };
      break;
    case _InfoBox.InfoBoxType.Warn:
      iconName = 'warning';
      iconColor = ColorPalette.notification.warnIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPalette.notification.warn,
        borderColor: ColorPalette.notification.warnBorder
      };
      styles.text = {
        ...styles.text,
        color: ColorPalette.notification.warnText
      };
      break;
    case _InfoBox.InfoBoxType.Error:
      iconName = 'error';
      iconColor = ColorPalette.notification.errorIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPalette.notification.error,
        borderColor: ColorPalette.notification.errorBorder
      };
      styles.text = {
        ...styles.text,
        color: ColorPalette.notification.errorText
      };
      break;
    default:
      throw new Error('InfoTextBox type needs to be set correctly');
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.row
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.iconContainer
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: iconName,
    size: iconSize,
    color: iconColor
  })), typeof children === 'string' ? /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold",
    style: styles.text
  }, children) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children)));
};
var _default = exports.default = InfoTextBox;
//# sourceMappingURL=InfoTextBox.js.map