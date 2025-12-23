"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const Link = ({
  linkText,
  onPress,
  style = {},
  testID,
  ...textProps
}) => {
  const {
    TextTheme,
    ColorPallet
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    link: {
      ...TextTheme.normal,
      color: ColorPallet.brand.link,
      textDecorationLine: 'underline',
      alignSelf: 'flex-start'
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.Text, _extends({
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