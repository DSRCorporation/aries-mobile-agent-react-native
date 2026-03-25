import { BrandingOverlayType } from '@bifold/oca/build/legacy';
import { View } from 'react-native';
import { testIdWithKey } from '../../utils/testable';
import useCredentialCardStyles from '../../hooks/credential-card-styles';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { ThemedText } from '../texts/ThemedText';
const CredentialIssuerBody = ({
  overlay,
  overlayType,
  hasBody,
  proof
}) => {
  var _overlay$metaOverlay, _overlay$metaOverlay2, _overlay$metaOverlay3;
  const isBranding10 = overlayType === BrandingOverlayType.Branding10;
  const {
    styles
  } = useCredentialCardStyles(overlay, overlayType, proof);
  const {
    t
  } = useTranslation();
  if (!hasBody) return;
  return /*#__PURE__*/React.createElement(React.Fragment, null, isBranding10 ? /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row'
    }
  }, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "label",
    testID: testIdWithKey('CredentialIssuer'),
    style: [styles.textContainer, {
      lineHeight: 19,
      opacity: 0.8,
      flex: 1,
      flexWrap: 'wrap'
    }]
  }, (_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.issuer)) : /*#__PURE__*/React.createElement(View, {
    style: styles.credentialIssuerContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      alignSelf: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(ThemedText, {
    testID: testIdWithKey('CredentialIssuer'),
    style: [styles.textContainer, {
      fontWeight: '500',
      fontSize: 12,
      lineHeight: 19,
      opacity: 0.8,
      textAlign: 'right'
    }]
  }, ((_overlay$metaOverlay2 = overlay.metaOverlay) === null || _overlay$metaOverlay2 === void 0 ? void 0 : _overlay$metaOverlay2.issuer) !== 'Unknown Contact' ? (_overlay$metaOverlay3 = overlay.metaOverlay) === null || _overlay$metaOverlay3 === void 0 ? void 0 : _overlay$metaOverlay3.issuer : t('Contacts.UnknownContact')))));
};
export default CredentialIssuerBody;
//# sourceMappingURL=CredentialCard11Issuer.js.map