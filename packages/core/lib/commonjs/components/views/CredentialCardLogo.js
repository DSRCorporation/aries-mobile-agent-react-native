"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _legacy = require("@bifold/oca/build/legacy");
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _LogoOrLetter = _interopRequireDefault(require("../../components/misc/LogoOrLetter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const CredentialCardLogo = ({
  overlay,
  brandingOverlayType = _legacy.BrandingOverlayType.Branding10
}) => {
  var _overlay$brandingOver, _overlay$brandingOver2, _overlay$brandingOver3;
  const {
    CredentialCardShadowTheme
  } = (0, _theme.useTheme)();
  const {
    fontScale
  } = (0, _reactNative.useWindowDimensions)();
  const logoHeight = brandingOverlayType === _legacy.BrandingOverlayType.Branding10 ? 80 : 48;
  const paddingHorizontal = 24;
  const isBranding11 = brandingOverlayType === _legacy.BrandingOverlayType.Branding11;
  const textColor = (_overlay$brandingOver = overlay.brandingOverlay) !== null && _overlay$brandingOver !== void 0 && _overlay$brandingOver.secondaryBackgroundColor && overlay.brandingOverlay.secondaryBackgroundColor !== '' ? overlay.brandingOverlay.secondaryBackgroundColor : (_overlay$brandingOver2 = overlay.brandingOverlay) === null || _overlay$brandingOver2 === void 0 ? void 0 : _overlay$brandingOver2.primaryBackgroundColor;
  const logoText = (0, _react.useMemo)(() => {
    var _overlay$metaOverlay2, _overlay$metaOverlay3;
    if (brandingOverlayType === _legacy.BrandingOverlayType.Branding11) {
      var _overlay$metaOverlay;
      return (((_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.issuer) ?? 'I').charAt(0).toUpperCase();
    }
    return (((_overlay$metaOverlay2 = overlay.metaOverlay) === null || _overlay$metaOverlay2 === void 0 ? void 0 : _overlay$metaOverlay2.name) ?? ((_overlay$metaOverlay3 = overlay.metaOverlay) === null || _overlay$metaOverlay3 === void 0 ? void 0 : _overlay$metaOverlay3.issuer) ?? 'C').charAt(0).toUpperCase();
  }, [brandingOverlayType, overlay]);
  const styles = _reactNative.StyleSheet.create({
    logoContainer: {
      width: logoHeight * (fontScale > 1.7 ? 1.2 : 1),
      height: logoHeight * (fontScale > 1.7 ? 1.2 : 1),
      backgroundColor: '#ffffff',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      ...(brandingOverlayType === _legacy.BrandingOverlayType.Branding10 && {
        top: -0.5 * logoHeight,
        left: paddingHorizontal,
        marginBottom: -1 * logoHeight,
        ...CredentialCardShadowTheme
      })
    }
  });
  return /*#__PURE__*/_react.default.createElement(_LogoOrLetter.default, {
    containerStyle: styles.logoContainer,
    logo: (_overlay$brandingOver3 = overlay.brandingOverlay) === null || _overlay$brandingOver3 === void 0 ? void 0 : _overlay$brandingOver3.logo,
    logoHeight: logoHeight,
    letter: logoText,
    letterVariant: "title",
    letterColor: isBranding11 ? textColor ?? '#000' : '#000',
    showTestIds: false // this one didn’t have testIDs before
  });
};
var _default = exports.default = CredentialCardLogo;
//# sourceMappingURL=CredentialCardLogo.js.map