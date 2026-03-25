"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _ThemedText = require("./ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// this component is used to create a custom header title that doesn't become oversized
// https://reactnavigation.org/docs/native-stack-navigator#headertitle
const HeaderTitle = ({
  children
}) => {
  return /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    adjustsFontSizeToFit: true,
    variant: "headerTitle",
    accessibilityRole: "header",
    numberOfLines: 1,
    ellipsizeMode: "tail",
    style: {
      textAlign: 'center'
    }
  }, children);
};
var _default = exports.default = HeaderTitle;
//# sourceMappingURL=HeaderTitle.js.map