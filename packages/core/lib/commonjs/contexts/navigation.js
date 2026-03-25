"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _native = require("@react-navigation/native");
var _react = _interopRequireDefault(require("react"));
var _theme = require("./theme");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const NavContainer = ({
  navigationRef,
  children
}) => {
  const {
    NavigationTheme
  } = (0, _theme.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_native.NavigationContainer, {
    ref: navigationRef,
    theme: NavigationTheme
  }, children);
};
var _default = exports.default = NavContainer;
//# sourceMappingURL=navigation.js.map