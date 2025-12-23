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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      backgroundColor: ColorPallet.notification.info,
      borderColor: ColorPallet.notification.infoBorder,
      ...style
    },
    row: {
      flexDirection: iconHorizontalPosition === 'left' ? 'row' : 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    text: {
      ...TextTheme.bold,
      alignSelf: 'center',
      flex: 1,
      flexWrap: 'wrap',
      color: ColorPallet.notification.infoText,
      ...textStyle
    },
    iconContainer: {
      marginRight: iconHorizontalPosition === 'left' ? offset : 0,
      marginLeft: iconHorizontalPosition === 'right' ? offset : 0,
      alignSelf: iconVerticalPosition === 'high' ? 'flex-start' : 'center'
    }
  });
  let iconName = 'info';
  let iconColor = ColorPallet.notification.infoIcon;
  switch (type) {
    case _InfoBox.InfoBoxType.Info:
      break;
    case _InfoBox.InfoBoxType.Success:
      iconName = 'check-circle';
      iconColor = ColorPallet.notification.successIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPallet.notification.success,
        borderColor: ColorPallet.notification.successBorder
      };
      styles.text = {
        ...styles.text,
        color: ColorPallet.notification.successText
      };
      break;
    case _InfoBox.InfoBoxType.Warn:
      iconName = 'warning';
      iconColor = ColorPallet.notification.warnIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPallet.notification.warn,
        borderColor: ColorPallet.notification.warnBorder
      };
      styles.text = {
        ...styles.text,
        color: ColorPallet.notification.warnText
      };
      break;
    case _InfoBox.InfoBoxType.Error:
      iconName = 'error';
      iconColor = ColorPallet.notification.errorIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPallet.notification.error,
        borderColor: ColorPallet.notification.errorBorder
      };
      styles.text = {
        ...styles.text,
        color: ColorPallet.notification.errorText
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
  })), typeof children === 'string' ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.text
  }, children) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children)));
};
var _default = exports.default = InfoTextBox;
//# sourceMappingURL=InfoTextBox.js.map