"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// this component is used to create a custom header title that doesn't become oversized
// https://reactnavigation.org/docs/native-stack-navigator#headertitle
const HeaderTitle = ({
  children
}) => {
  const {
    TextTheme
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    title: {
      ...TextTheme.headerTitle,
      textAlign: 'center'
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    numberOfLines: 1,
    ellipsizeMode: "tail",
    style: styles.title
  }, children);
};
var _default = exports.default = HeaderTitle;
//# sourceMappingURL=HeaderTitle.js.map