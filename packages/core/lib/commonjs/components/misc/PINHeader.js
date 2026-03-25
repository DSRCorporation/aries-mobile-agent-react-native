"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactI18next = require("react-i18next");
var _containerApi = require("../../container-api");
var _theme = require("../../contexts/theme");
var _InfoBox = _interopRequireWildcard(require("./InfoBox"));
var _ThemedText = require("../texts/ThemedText");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const PINHeader = ({
  updatePin
}) => {
  const {
    TextTheme
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [{
    PINScreensConfig
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  return PINScreensConfig.useNewPINDesign ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.infoBox
  }, /*#__PURE__*/_react.default.createElement(_InfoBox.default, {
    title: t('PINCreate.InfoBox.title'),
    message: t('PINCreate.InfoBox.message'),
    notificationType: _InfoBox.InfoBoxType.Info,
    renderShowDetails: true
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: style.text
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: {
      fontWeight: TextTheme.bold.fontWeight
    }
  }, updatePin ? t('PINChange.RememberChangePIN') : t('PINCreate.RememberPIN')), ' ', t('PINCreate.PINDisclaimer')));
};
const style = _reactNative.StyleSheet.create({
  infoBox: {
    marginBottom: 24
  },
  text: {
    marginBottom: 16
  }
});
var _default = exports.default = PINHeader;
//# sourceMappingURL=PINHeader.js.map