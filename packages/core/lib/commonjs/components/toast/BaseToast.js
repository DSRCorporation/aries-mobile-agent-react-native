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
var _reactNativeToastMessage = _interopRequireDefault(require("react-native-toast-message"));
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
    ColorPalette
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
      backgroundColor = ColorPalette.notification.success;
      borderColor = ColorPalette.notification.successBorder;
      iconColor = ColorPalette.notification.successIcon;
      textColor = ColorPalette.notification.successText;
      break;
    case ToastType.Info:
      iconName = 'info';
      backgroundColor = ColorPalette.notification.info;
      borderColor = ColorPalette.notification.infoBorder;
      iconColor = ColorPalette.notification.infoIcon;
      textColor = ColorPalette.notification.infoText;
      break;
    case ToastType.Warn:
      iconName = 'report-problem';
      backgroundColor = ColorPalette.notification.warn;
      borderColor = ColorPalette.notification.warnBorder;
      iconColor = ColorPalette.notification.warnIcon;
      textColor = ColorPalette.notification.warnText;
      break;
    case ToastType.Error:
      iconName = 'error';
      backgroundColor = ColorPalette.notification.error;
      borderColor = ColorPalette.notification.errorBorder;
      iconColor = ColorPalette.notification.errorIcon;
      textColor = ColorPalette.notification.errorText;
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
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1,
      flexDirection: 'row'
    }
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    style: styles.icon,
    name: iconName,
    color: iconColor,
    size: iconSize
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.textContainer
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: [styles.title, {
      color: textColor
    }],
    testID: (0, _testable.testIdWithKey)('ToastTitle')
  }, title), body && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: [styles.body, {
      color: textColor
    }],
    testID: (0, _testable.testIdWithKey)('ToastBody')
  }, body))), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => {
      _reactNativeToastMessage.default.hide();
    }
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    style: styles.icon,
    name: 'close',
    color: iconColor,
    size: iconSize
  })))));
};
var _default = exports.default = BaseToast;
//# sourceMappingURL=BaseToast.js.map