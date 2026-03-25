"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Config = void 0;
var _react = _interopRequireDefault(require("react"));
var _BaseToast = _interopRequireWildcard(require("./BaseToast"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Config = exports.Config = {
  success: props => /*#__PURE__*/_react.default.createElement(_BaseToast.default, {
    title: props === null || props === void 0 ? void 0 : props.text1,
    body: props === null || props === void 0 ? void 0 : props.text2,
    toastType: _BaseToast.ToastType.Success
  }),
  warn: props => /*#__PURE__*/_react.default.createElement(_BaseToast.default, {
    title: props === null || props === void 0 ? void 0 : props.text1,
    body: props === null || props === void 0 ? void 0 : props.text2,
    toastType: _BaseToast.ToastType.Warn,
    onPress: props === null || props === void 0 ? void 0 : props.onPress
  }),
  error: props => /*#__PURE__*/_react.default.createElement(_BaseToast.default, {
    title: props === null || props === void 0 ? void 0 : props.text1,
    body: props === null || props === void 0 ? void 0 : props.text2,
    toastType: _BaseToast.ToastType.Error,
    onPress: props === null || props === void 0 ? void 0 : props.onPress
  }),
  info: props => /*#__PURE__*/_react.default.createElement(_BaseToast.default, {
    title: props === null || props === void 0 ? void 0 : props.text1,
    body: props === null || props === void 0 ? void 0 : props.text2,
    toastType: _BaseToast.ToastType.Info,
    onPress: props === null || props === void 0 ? void 0 : props.onPress
  })
};
var _default = exports.default = Config;
//# sourceMappingURL=ToastConfig.js.map