import { BrandingOverlayType } from '@bifold/oca/build/legacy';
import React, { useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from '../../contexts/theme';
import LogoOrLetter from '../../components/misc/LogoOrLetter';
const CredentialCardLogo = ({
  overlay,
  brandingOverlayType = BrandingOverlayType.Branding10
}) => {
  var _overlay$brandingOver, _overlay$brandingOver2, _overlay$brandingOver3;
  const {
    CredentialCardShadowTheme
  } = useTheme();
  const {
    fontScale
  } = useWindowDimensions();
  const logoHeight = brandingOverlayType === BrandingOverlayType.Branding10 ? 80 : 48;
  const paddingHorizontal = 24;
  const isBranding11 = brandingOverlayType === BrandingOverlayType.Branding11;
  const textColor = (_overlay$brandingOver = overlay.brandingOverlay) !== null && _overlay$brandingOver !== void 0 && _overlay$brandingOver.secondaryBackgroundColor && overlay.brandingOverlay.secondaryBackgroundColor !== '' ? overlay.brandingOverlay.secondaryBackgroundColor : (_overlay$brandingOver2 = overlay.brandingOverlay) === null || _overlay$brandingOver2 === void 0 ? void 0 : _overlay$brandingOver2.primaryBackgroundColor;
  const logoText = useMemo(() => {
    var _overlay$metaOverlay2, _overlay$metaOverlay3;
    if (brandingOverlayType === BrandingOverlayType.Branding11) {
      var _overlay$metaOverlay;
      return (((_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.issuer) ?? 'I').charAt(0).toUpperCase();
    }
    return (((_overlay$metaOverlay2 = overlay.metaOverlay) === null || _overlay$metaOverlay2 === void 0 ? void 0 : _overlay$metaOverlay2.name) ?? ((_overlay$metaOverlay3 = overlay.metaOverlay) === null || _overlay$metaOverlay3 === void 0 ? void 0 : _overlay$metaOverlay3.issuer) ?? 'C').charAt(0).toUpperCase();
  }, [brandingOverlayType, overlay]);
  const styles = StyleSheet.create({
    logoContainer: {
      width: logoHeight * (fontScale > 1.7 ? 1.2 : 1),
      height: logoHeight * (fontScale > 1.7 ? 1.2 : 1),
      backgroundColor: '#ffffff',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      ...(brandingOverlayType === BrandingOverlayType.Branding10 && {
        top: -0.5 * logoHeight,
        left: paddingHorizontal,
        marginBottom: -1 * logoHeight,
        ...CredentialCardShadowTheme
      })
    }
  });
  return /*#__PURE__*/React.createElement(LogoOrLetter, {
    containerStyle: styles.logoContainer,
    logo: (_overlay$brandingOver3 = overlay.brandingOverlay) === null || _overlay$brandingOver3 === void 0 ? void 0 : _overlay$brandingOver3.logo,
    logoHeight: logoHeight,
    letter: logoText,
    letterVariant: "title",
    letterColor: isBranding11 ? textColor ?? '#000' : '#000',
    showTestIds: false // this one didn’t have testIDs before
  });
};
export default CredentialCardLogo;
//# sourceMappingURL=CredentialCardLogo.js.map