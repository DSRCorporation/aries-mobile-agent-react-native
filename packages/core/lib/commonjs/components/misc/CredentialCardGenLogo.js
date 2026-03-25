"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _theme = require("../../contexts/theme");
var _LogoOrLetter = _interopRequireDefault(require("./LogoOrLetter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CredentialCardGenLogo = ({
  noLogoText,
  containerStyle,
  logoHeight,
  secondaryBackgroundColor,
  primaryBackgroundColor,
  elevated,
  logo,
  isBranding11
}) => {
  const {
    TextTheme
  } = (0, _theme.useTheme)();
  const textColor = secondaryBackgroundColor && secondaryBackgroundColor !== '' ? secondaryBackgroundColor : primaryBackgroundColor;
  return /*#__PURE__*/_react.default.createElement(_LogoOrLetter.default, {
    containerStyle: containerStyle,
    elevated: elevated,
    logo: logo,
    logoHeight: logoHeight,
    letter: noLogoText,
    letterVariant: "bold",
    letterStyle: TextTheme.bold,
    letterColor: isBranding11 ? textColor : '#000'
  });
};
var _default = exports.default = CredentialCardGenLogo;
//# sourceMappingURL=CredentialCardGenLogo.js.map