"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _legacy = require("@bifold/oca/build/legacy");
var _reactNative = require("react-native");
var _testable = require("../../utils/testable");
var _credentialCardStyles = _interopRequireDefault(require("../../hooks/credential-card-styles"));
var _reactI18next = require("react-i18next");
var _react = _interopRequireDefault(require("react"));
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CredentialIssuerBody = ({
  overlay,
  overlayType,
  hasBody,
  proof
}) => {
  var _overlay$metaOverlay, _overlay$metaOverlay2, _overlay$metaOverlay3;
  const isBranding10 = overlayType === _legacy.BrandingOverlayType.Branding10;
  const {
    styles
  } = (0, _credentialCardStyles.default)(overlay, overlayType, proof);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  if (!hasBody) return;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, isBranding10 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row'
    }
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "label",
    testID: (0, _testable.testIdWithKey)('CredentialIssuer'),
    style: [styles.textContainer, {
      lineHeight: 19,
      opacity: 0.8,
      flex: 1,
      flexWrap: 'wrap'
    }]
  }, (_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.issuer)) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.credentialIssuerContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      alignSelf: 'flex-end'
    }
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    testID: (0, _testable.testIdWithKey)('CredentialIssuer'),
    style: [styles.textContainer, {
      fontWeight: '500',
      fontSize: 12,
      lineHeight: 19,
      opacity: 0.8,
      textAlign: 'right'
    }]
  }, ((_overlay$metaOverlay2 = overlay.metaOverlay) === null || _overlay$metaOverlay2 === void 0 ? void 0 : _overlay$metaOverlay2.issuer) !== 'Unknown Contact' ? (_overlay$metaOverlay3 = overlay.metaOverlay) === null || _overlay$metaOverlay3 === void 0 ? void 0 : _overlay$metaOverlay3.issuer : t('Contacts.UnknownContact')))));
};
var _default = exports.default = CredentialIssuerBody;
//# sourceMappingURL=CredentialCard11Issuer.js.map