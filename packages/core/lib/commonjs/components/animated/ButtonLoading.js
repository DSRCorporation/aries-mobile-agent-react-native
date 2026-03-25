"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _LoadingSpinner = _interopRequireDefault(require("./LoadingSpinner"));
var _theme = require("../../contexts/theme");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ButtonLoading = () => {
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_LoadingSpinner.default, {
    size: 25,
    color: ColorPalette.brand.icon
  });
};
var _default = exports.default = ButtonLoading;
//# sourceMappingURL=ButtonLoading.js.map