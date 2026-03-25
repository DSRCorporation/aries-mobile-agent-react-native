"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const PINScreenTitleText = ({
  header,
  subheader
}) => {
  const style = _reactNative.StyleSheet.create({
    container: {
      paddingTop: 16,
      paddingBottom: 32
    },
    header: {
      marginBottom: 16
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold",
    style: style.header
  }, header), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold"
  }, subheader));
};
var _default = exports.default = PINScreenTitleText;
//# sourceMappingURL=PINScreenTitleText.js.map