"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _InfoBox = require("../misc/InfoBox");
var _PopupModal = _interopRequireDefault(require("./PopupModal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const NetInfoModal = ({
  visible,
  onSubmit = () => null
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  return /*#__PURE__*/React.createElement(React.Fragment, null, visible && /*#__PURE__*/React.createElement(_reactNativeSafeAreaContext.SafeAreaView, null, /*#__PURE__*/React.createElement(_PopupModal.default, {
    notificationType: _InfoBox.InfoBoxType.Error,
    title: t('NetInfo.NoInternetConnectionTitle'),
    description: t('NetInfo.NoInternetConnectionMessage'),
    onCallToActionLabel: t('Global.Okay'),
    onCallToActionPressed: () => onSubmit()
  })));
};
var _default = exports.default = NetInfoModal;
//# sourceMappingURL=NetInfoModal.js.map