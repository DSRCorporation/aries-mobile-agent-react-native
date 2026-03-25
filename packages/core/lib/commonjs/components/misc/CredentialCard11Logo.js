"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _legacy = require("@bifold/oca/build/legacy");
var _react = _interopRequireDefault(require("react"));
var _containerApi = require("../../container-api");
var _theme = require("../../contexts/theme");
var _credentialCardStyles = _interopRequireDefault(require("../../hooks/credential-card-styles"));
var _LogoOrLetter = _interopRequireDefault(require("./LogoOrLetter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CredentialCard11Logo = ({
  noLogoText,
  overlay,
  elevated
}) => {
  var _overlay$brandingOver, _overlay$brandingOver2, _overlay$brandingOver3;
  const {
    TextTheme
  } = (0, _theme.useTheme)();
  const [bundleResolver] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_OCA_RESOLVER]);
  const isBranding11 = bundleResolver.getBrandingOverlayType() === _legacy.BrandingOverlayType.Branding11;
  const textColor = (_overlay$brandingOver = overlay.brandingOverlay) !== null && _overlay$brandingOver !== void 0 && _overlay$brandingOver.secondaryBackgroundColor && overlay.brandingOverlay.secondaryBackgroundColor !== '' ? overlay.brandingOverlay.secondaryBackgroundColor : (_overlay$brandingOver2 = overlay.brandingOverlay) === null || _overlay$brandingOver2 === void 0 ? void 0 : _overlay$brandingOver2.primaryBackgroundColor;
  const {
    styles,
    logoHeight
  } = (0, _credentialCardStyles.default)(overlay, bundleResolver.getBrandingOverlayType());
  return /*#__PURE__*/_react.default.createElement(_LogoOrLetter.default, {
    containerStyle: styles.logoContainer,
    elevated: elevated,
    logo: (_overlay$brandingOver3 = overlay.brandingOverlay) === null || _overlay$brandingOver3 === void 0 ? void 0 : _overlay$brandingOver3.logo,
    logoHeight: logoHeight,
    letter: noLogoText,
    letterVariant: "bold",
    letterStyle: TextTheme.bold,
    letterColor: isBranding11 ? textColor ?? '#000' : '#000'
  });
};
var _default = exports.default = CredentialCard11Logo;
//# sourceMappingURL=CredentialCard11Logo.js.map