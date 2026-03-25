import { BrandingOverlayType } from '@bifold/oca/build/legacy';
import React from 'react';
import { TOKENS, useServices } from '../../container-api';
import { useTheme } from '../../contexts/theme';
import useCredentialCardStyles from '../../hooks/credential-card-styles';
import LogoOrLetter from './LogoOrLetter';
const CredentialCard11Logo = ({
  noLogoText,
  overlay,
  elevated
}) => {
  var _overlay$brandingOver, _overlay$brandingOver2, _overlay$brandingOver3;
  const {
    TextTheme
  } = useTheme();
  const [bundleResolver] = useServices([TOKENS.UTIL_OCA_RESOLVER]);
  const isBranding11 = bundleResolver.getBrandingOverlayType() === BrandingOverlayType.Branding11;
  const textColor = (_overlay$brandingOver = overlay.brandingOverlay) !== null && _overlay$brandingOver !== void 0 && _overlay$brandingOver.secondaryBackgroundColor && overlay.brandingOverlay.secondaryBackgroundColor !== '' ? overlay.brandingOverlay.secondaryBackgroundColor : (_overlay$brandingOver2 = overlay.brandingOverlay) === null || _overlay$brandingOver2 === void 0 ? void 0 : _overlay$brandingOver2.primaryBackgroundColor;
  const {
    styles,
    logoHeight
  } = useCredentialCardStyles(overlay, bundleResolver.getBrandingOverlayType());
  return /*#__PURE__*/React.createElement(LogoOrLetter, {
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
export default CredentialCard11Logo;
//# sourceMappingURL=CredentialCard11Logo.js.map