"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ButtonLocation = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _MaterialCommunityIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialCommunityIcons"));
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const defaultIconSize = 26;
let ButtonLocation = exports.ButtonLocation = /*#__PURE__*/function (ButtonLocation) {
  ButtonLocation[ButtonLocation["Left"] = 0] = "Left";
  ButtonLocation[ButtonLocation["Right"] = 1] = "Right";
  return ButtonLocation;
}({});
const HeaderButton = ({
  buttonLocation,
  icon,
  text,
  accessibilityLabel,
  testID,
  onPress,
  iconTintColor
}) => {
  const {
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const style = _reactNative.StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: buttonLocation === ButtonLocation.Left ? 0 : 15,
      marginLeft: buttonLocation === ButtonLocation.Right ? 0 : 15,
      minWidth: defaultIconSize,
      minHeight: defaultIconSize
    },
    title: {
      ...TextTheme.label,
      color: ColorPallet.brand.headerText,
      marginRight: 4
    }
  });
  const myIcon = () => /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
    name: icon,
    size: defaultIconSize,
    color: iconTintColor ?? ColorPallet.brand.headerIcon
  });
  const myText = () => text ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: style.title
  }, text) : null;
  const layoutForButtonLocation = buttonLocation => {
    switch (buttonLocation) {
      case ButtonLocation.Left:
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, myIcon(), myText());
      case ButtonLocation.Right:
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, myText(), myIcon());
    }
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: 'button',
    testID: testID,
    onPress: onPress,
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container
  }, layoutForButtonLocation(buttonLocation)));
};
var _default = exports.default = HeaderButton;
//# sourceMappingURL=HeaderButton.js.map