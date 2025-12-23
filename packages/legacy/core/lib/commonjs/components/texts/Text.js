"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Text = ({
  children,
  style
}) => {
  const {
    TextTheme
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    text: {
      color: TextTheme.normal.color
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.text, style]
  }, children);
};
var _default = exports.default = Text;
//# sourceMappingURL=Text.js.map