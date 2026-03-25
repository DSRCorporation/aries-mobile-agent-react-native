"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTheme = exports.ThemeProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _theme = require("../theme");
var _store = require("./reducers/store");
var _store2 = require("./store");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ThemeContext = /*#__PURE__*/(0, _react.createContext)({
  ..._theme.bifoldTheme,
  setTheme: () => {}
});
const ThemeProvider = ({
  themes,
  defaultThemeName,
  children
}) => {
  const [store, dispatch] = (0, _store2.useStore)();
  const activeTheme = (0, _react.useMemo)(() => {
    return store.preferences.theme && themes.find(t => t.themeName === store.preferences.theme) || themes.find(t => t.themeName === defaultThemeName) || themes[0];
  }, [store.preferences.theme, themes, defaultThemeName]);
  const setTheme = (0, _react.useCallback)(themeName => {
    const newTheme = themes.find(t => t.themeName === themeName) || themes[0];
    dispatch({
      type: _store.DispatchAction.SET_THEME,
      payload: [newTheme.themeName]
    });
  }, [themes, dispatch]);

  // prevent re-rendering of the context value
  const value = (0, _react.useMemo)(() => {
    return {
      ...activeTheme,
      setTheme
    };
  }, [activeTheme, setTheme]);
  return /*#__PURE__*/_react.default.createElement(ThemeContext.Provider, {
    value: value
  }, children);
};
exports.ThemeProvider = ThemeProvider;
const useTheme = () => (0, _react.useContext)(ThemeContext);
exports.useTheme = useTheme;
//# sourceMappingURL=theme.js.map