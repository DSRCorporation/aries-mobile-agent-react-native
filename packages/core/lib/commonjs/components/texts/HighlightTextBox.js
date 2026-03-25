"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _ThemedText = require("./ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const offset = 10;
const HighlightTextBox = ({
  children
}) => {
  const {
    ColorPalette,
    OnboardingTheme
  } = (0, _theme.useTheme)();
  const style = _reactNative.StyleSheet.create({
    icon: {
      marginRight: offset
    },
    container: {
      flexDirection: 'row',
      backgroundColor: ColorPalette.brand.primaryBackground
    },
    accentBox: {
      marginRight: offset,
      backgroundColor: ColorPalette.brand.highlight,
      width: 8
    },
    headerText: {
      ...OnboardingTheme.bodyText,
      flexShrink: 1
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.accentBox
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: [style.headerText, {
      paddingTop: offset,
      paddingBottom: offset
    }]
  }, children));
};
var _default = exports.default = HighlightTextBox;
//# sourceMappingURL=HighlightTextBox.js.map