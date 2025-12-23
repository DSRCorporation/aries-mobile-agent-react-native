"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTheme = exports.ThemeProvider = exports.ThemeContext = void 0;
var _react = require("react");
var _theme = require("../theme");
const ThemeContext = exports.ThemeContext = /*#__PURE__*/(0, _react.createContext)(_theme.theme);
const ThemeProvider = exports.ThemeProvider = ThemeContext.Provider;
const useTheme = () => (0, _react.useContext)(ThemeContext);
exports.useTheme = useTheme;
//# sourceMappingURL=theme.js.map