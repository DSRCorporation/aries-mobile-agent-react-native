"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _WalletNameForm = _interopRequireDefault(require("../components/forms/WalletNameForm"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const RenameWallet = () => {
  const navigation = (0, _native.useNavigation)();
  const onCancel = (0, _react.useCallback)(() => {
    navigation.goBack();
  }, [navigation]);
  const onSubmitSuccess = (0, _react.useCallback)(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _ => {
    // TODO: We can't assign to this label anymore, do we want to do anything with this argument still?
    // agent.config.label = name
    navigation.goBack();
  }, [navigation]);
  return /*#__PURE__*/_react.default.createElement(_WalletNameForm.default, {
    isRenaming: true,
    onCancel: onCancel,
    onSubmitSuccess: onSubmitSuccess
  });
};
var _default = exports.default = RenameWallet;
//# sourceMappingURL=RenameWallet.js.map