"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
var _ThemedText = require("./ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Link = ({
  linkText,
  onPress,
  style = {},
  testID,
  ...textProps
}) => {
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    link: {
      color: ColorPalette.brand.link,
      textDecorationLine: 'underline',
      alignSelf: 'flex-start'
    }
  });
  return /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, _extends({
    style: [styles.link, style],
    accessibilityLabel: linkText,
    accessible: true,
    accessibilityRole: 'link',
    testID: testID ? testID : (0, _testable.testIdWithKey)((0, _testable.testIdForAccessabilityLabel)(linkText)),
    onPress: onPress
  }, textProps), linkText);
};
var _default = exports.default = Link;
//# sourceMappingURL=Link.js.map