import React from 'react';
import { useTheme } from '../../contexts/theme';
import LogoOrLetter from './LogoOrLetter';
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
  } = useTheme();
  const textColor = secondaryBackgroundColor && secondaryBackgroundColor !== '' ? secondaryBackgroundColor : primaryBackgroundColor;
  return /*#__PURE__*/React.createElement(LogoOrLetter, {
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
export default CredentialCardGenLogo;
//# sourceMappingURL=CredentialCardGenLogo.js.map