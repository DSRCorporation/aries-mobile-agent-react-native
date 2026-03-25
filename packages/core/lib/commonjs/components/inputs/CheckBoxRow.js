"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CheckBoxRow = ({
  title,
  titleStyle = {},
  accessibilityLabel,
  testID,
  checked,
  onPress,
  reverse
}) => {
  const {
    Inputs
  } = (0, _theme.useTheme)();
  const style = _reactNative.StyleSheet.create({
    container: {
      flexDirection: reverse ? 'row-reverse' : 'row',
      alignItems: 'center',
      margin: 10
    },
    text: {
      ...Inputs.checkBoxText,
      flexShrink: 1,
      marginLeft: reverse ? 0 : 10,
      marginRight: reverse ? 10 : 0
    }
  });
  const accessible = accessibilityLabel && accessibilityLabel !== '' ? true : false;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessible: accessible,
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: "checkbox",
    accessibilityState: {
      checked
    },
    testID: testID,
    onPress: onPress,
    hitSlop: _constants.hitSlop
  }, checked ? /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: 'check-box',
    size: 36,
    color: Inputs.checkBoxColor.color
  }) : /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: 'check-box-outline-blank',
    size: 36,
    color: Inputs.checkBoxColor.color
  })), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: [style.text, titleStyle]
  }, title));
};
var _default = exports.default = CheckBoxRow;
//# sourceMappingURL=CheckBoxRow.js.map