"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _InfoBox = require("../../components/misc/InfoBox");
var _PopupModal = _interopRequireDefault(require("./PopupModal"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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