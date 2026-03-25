"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _ThemedText = require("../texts/ThemedText");
var _theme = require("../../contexts/theme");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DeveloperToggleRow = ({
  label,
  value,
  onToggle,
  accessibilityLabel,
  pressableTestId,
  switchTestId
}) => {
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.settingContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold",
    style: styles.settingLabelText
  }, label)), /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: styles.settingSwitchContainer,
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: "switch",
    testID: pressableTestId
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Switch, {
    trackColor: {
      false: ColorPalette.grayscale.lightGrey,
      true: ColorPalette.brand.primaryDisabled
    },
    thumbColor: value ? ColorPalette.brand.primary : ColorPalette.grayscale.mediumGrey,
    ios_backgroundColor: ColorPalette.grayscale.lightGrey,
    onValueChange: onToggle,
    testID: switchTestId,
    value: value
  })));
};
const styles = _reactNative.StyleSheet.create({
  settingContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  settingLabelText: {
    marginRight: 10,
    textAlign: 'left'
  },
  settingSwitchContainer: {
    justifyContent: 'center'
  }
});
var _default = exports.default = DeveloperToggleRow;
//# sourceMappingURL=DeveloperToggleRow.js.map