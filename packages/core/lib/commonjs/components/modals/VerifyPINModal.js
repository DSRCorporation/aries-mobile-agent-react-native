"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _FauxHeader = _interopRequireDefault(require("../../components/misc/FauxHeader"));
var _SafeAreaModal = _interopRequireDefault(require("../../components/modals/SafeAreaModal"));
var _theme = require("../../contexts/theme");
var _PINVerify = _interopRequireWildcard(require("../../screens/PINVerify"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VerifyPINModal = ({
  title = '',
  onBackPressed = () => {},
  onAuthenticationComplete = () => {},
  onCancelAuth = () => {},
  PINVerifyModalUsage = _PINVerify.PINEntryUsage.ChangePIN,
  visible = false
}) => {
  const {
    ColorPalette,
    NavigationTheme
  } = (0, _theme.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_SafeAreaModal.default, {
    style: {
      backgroundColor: ColorPalette.brand.primaryBackground
    },
    visible: visible,
    transparent: false,
    animationType: PINVerifyModalUsage === _PINVerify.PINEntryUsage.ChangePIN ? 'none' : 'slide',
    presentationStyle: 'fullScreen',
    statusBarTranslucent: true
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    edges: ['top'],
    style: {
      backgroundColor: NavigationTheme.colors.primary
    }
  }), /*#__PURE__*/_react.default.createElement(_FauxHeader.default, {
    title: title,
    onBackPressed: onBackPressed
  }), /*#__PURE__*/_react.default.createElement(_PINVerify.default, {
    usage: PINVerifyModalUsage,
    setAuthenticated: onAuthenticationComplete,
    onCancelAuth: onCancelAuth
  }));
};
var _default = exports.default = VerifyPINModal;
//# sourceMappingURL=VerifyPINModal.js.map