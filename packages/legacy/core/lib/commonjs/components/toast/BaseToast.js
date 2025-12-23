"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ToastType = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let ToastType = exports.ToastType = /*#__PURE__*/function (ToastType) {
  ToastType["Success"] = "success";
  ToastType["Info"] = "info";
  ToastType["Warn"] = "warn";
  ToastType["Error"] = "error";
  return ToastType;
}({});
const BaseToast = ({
  title,
  body,
  toastType,
  onPress = () => null
}) => {
  const {
    TextTheme,
    borderRadius,
    borderWidth,
    ColorPallet
  } = (0, _theme.useTheme)();
  const {
    width
  } = (0, _reactNative.useWindowDimensions)();
  const iconSize = 24;
  let iconName = '';
  let backgroundColor = '';
  let borderColor = '';
  let iconColor = '';
  let textColor = '';
  const styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      flexDirection: 'row',
      marginTop: 25,
      borderWidth,
      borderRadius
    },
    textContainer: {
      flexShrink: 1,
      marginVertical: 15,
      marginRight: 10
    },
    icon: {
      marginTop: 15,
      marginHorizontal: 15
    },
    title: {
      fontWeight: TextTheme.bold.fontWeight
    },
    body: {
      marginTop: 10
    }
  });
  switch (toastType) {
    case ToastType.Success:
      iconName = 'check-circle';
      backgroundColor = ColorPallet.notification.success;
      borderColor = ColorPallet.notification.successBorder;
      iconColor = ColorPallet.notification.successIcon;
      textColor = ColorPallet.notification.successText;
      break;
    case ToastType.Info:
      iconName = 'info';
      backgroundColor = ColorPallet.notification.info;
      borderColor = ColorPallet.notification.infoBorder;
      iconColor = ColorPallet.notification.infoIcon;
      textColor = ColorPallet.notification.infoText;
      break;
    case ToastType.Warn:
      iconName = 'report-problem';
      backgroundColor = ColorPallet.notification.warn;
      borderColor = ColorPallet.notification.warnBorder;
      iconColor = ColorPallet.notification.warnIcon;
      textColor = ColorPallet.notification.warnText;
      break;
    case ToastType.Error:
      iconName = 'error';
      backgroundColor = ColorPallet.notification.error;
      borderColor = ColorPallet.notification.errorBorder;
      iconColor = ColorPallet.notification.errorIcon;
      textColor = ColorPallet.notification.errorText;
      break;
    default:
      throw new Error('ToastType was not set correctly.');
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    activeOpacity: 1,
    onPress: () => onPress()
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      backgroundColor,
      borderColor,
      width: width - width * 0.1
    }]
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    style: styles.icon,
    name: iconName,
    color: iconColor,
    size: iconSize
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.textContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [TextTheme.normal, styles.title, {
      color: textColor
    }],
    testID: (0, _testable.testIdWithKey)('ToastTitle')
  }, title), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [TextTheme.normal, styles.body, {
      color: textColor
    }],
    testID: (0, _testable.testIdWithKey)('ToastBody')
  }, body))));
};
var _default = exports.default = BaseToast;
//# sourceMappingURL=BaseToast.js.map