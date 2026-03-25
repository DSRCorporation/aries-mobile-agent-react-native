"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemedText = ThemedText;
var _theme = require("../../contexts/theme");
var _reactNative = require("react-native");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 *
 * @param {variant} variant - A key of the TextTheme object that is defined in the theme file
 * @param {maxFontSizeMultiplier} maxFontSizeMultiplier - It allows to override the maxFontSizeMultiplier. Default value is 2
 * @param {style} style - It allows to add extra styles to the component in addition to the one coming from the variant option
 * @param {rest} rest - It allows to pass the rest of the props to the Text component
 * @returns
 */
function ThemedText({
  variant = 'normal',
  maxFontSizeMultiplier,
  style,
  ...rest
}) {
  const {
    TextTheme,
    maxFontSizeMultiplier: maxFontSize
  } = (0, _theme.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.Text, _extends({
    maxFontSizeMultiplier: maxFontSizeMultiplier ?? maxFontSize,
    style: [TextTheme[variant], style]
  }, rest));
}
//# sourceMappingURL=ThemedText.js.map