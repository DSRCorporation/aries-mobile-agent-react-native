"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Config = void 0;
var _react = _interopRequireDefault(require("react"));
var _BaseToast = _interopRequireWildcard(require("./BaseToast"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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