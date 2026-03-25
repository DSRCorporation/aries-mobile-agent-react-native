"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _InfoBox = _interopRequireWildcard(require("../../../components/misc/InfoBox"));
var _ThemedText = require("../../../components/texts/ThemedText");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const OpenIDUnsatisfiedProofRequest = ({
  verifierName,
  credentialName,
  requestPurpose
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingTop: 30,
      paddingHorizontal: 16
    },
    textContainer: {
      flex: 1,
      paddingHorizontal: 8
    },
    verifierDetailsText: {
      marginTop: 30
    },
    verifierNameText: {
      marginTop: 8,
      marginBottom: 30
    },
    credentialDetailsText: {
      marginTop: 8
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_InfoBox.default, {
    title: t('UnsatisfiedProofRequest.InfoBox.Title'),
    message: t('UnsatisfiedProofRequest.InfoBox.Subtitle', {
      verifierName
    }),
    notificationType: _InfoBox.InfoBoxType.Error,
    renderShowDetails: true
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.textContainer
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "normal",
    style: styles.verifierDetailsText
  }, t("UnsatisfiedProofRequest.VerifierDetail")), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold",
    style: styles.verifierNameText
  }, verifierName), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold"
  }, credentialName), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "normal",
    style: styles.credentialDetailsText
  }, t("UnsatisfiedProofRequest.RequestPurpose", {
    requestPurpose
  }))));
};
var _default = exports.default = OpenIDUnsatisfiedProofRequest;
//# sourceMappingURL=OpenIDUnsatisfiedProofRequest.js.map