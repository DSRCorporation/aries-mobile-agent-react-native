import { BrandingOverlayType } from '@bifold/oca/build/legacy';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import CardWatermark from '../../components/misc/CardWatermark';
import { useTheme } from '../../contexts/theme';
import { credentialTextColor, getEffectiveCredentialName } from '../../utils/credential';
import { testIdWithKey } from '../../utils/testable';
import { formatTime } from '../../utils/helpers';
import { ThemedText } from '../texts/ThemedText';
const paddingHorizontal = 24;
const paddingVertical = 16;
const logoHeight = 80;
const CredentialDetailPrimaryHeader = ({
  overlay,
  brandingOverlayType = BrandingOverlayType.Branding10,
  credential
}) => {
  var _overlay$metaOverlay, _overlay$metaOverlay2, _overlay$brandingOver, _overlay$metaOverlay3, _overlay$metaOverlay4, _overlay$metaOverlay5, _overlay$metaOverlay6;
  const {
    t
  } = useTranslation();
  const {
    ColorPalette
  } = useTheme();
  const {
    width,
    height
  } = useWindowDimensions();
  const isBranding11 = brandingOverlayType === BrandingOverlayType.Branding11;
  const effectiveName = credential ? getEffectiveCredentialName(credential, (_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.name) : (_overlay$metaOverlay2 = overlay.metaOverlay) === null || _overlay$metaOverlay2 === void 0 ? void 0 : _overlay$metaOverlay2.name;
  const styles = StyleSheet.create({
    primaryHeaderContainer: {
      paddingHorizontal: isBranding11 ? 16 : paddingHorizontal,
      paddingVertical,
      overflow: 'hidden'
    },
    textContainer: {
      color: brandingOverlayType === BrandingOverlayType.Branding10 ? credentialTextColor(ColorPalette, (_overlay$brandingOver = overlay.brandingOverlay) === null || _overlay$brandingOver === void 0 ? void 0 : _overlay$brandingOver.primaryBackgroundColor) : ColorPalette.brand.primary
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    testID: testIdWithKey('CredentialDetailsPrimaryHeader'),
    style: [styles.primaryHeaderContainer, {
      zIndex: -1
    }]
  }, /*#__PURE__*/React.createElement(View, null, ((_overlay$metaOverlay3 = overlay.metaOverlay) === null || _overlay$metaOverlay3 === void 0 ? void 0 : _overlay$metaOverlay3.watermark) && brandingOverlayType === BrandingOverlayType.Branding10 && /*#__PURE__*/React.createElement(CardWatermark, {
    width: width,
    height: height,
    watermark: (_overlay$metaOverlay4 = overlay.metaOverlay) === null || _overlay$metaOverlay4 === void 0 ? void 0 : _overlay$metaOverlay4.watermark
  }), brandingOverlayType === BrandingOverlayType.Branding10 && /*#__PURE__*/React.createElement(ThemedText, {
    accessibilityLabel: `${t('Credentials.IssuedBy')} ${(_overlay$metaOverlay5 = overlay.metaOverlay) === null || _overlay$metaOverlay5 === void 0 ? void 0 : _overlay$metaOverlay5.issuer}`,
    testID: testIdWithKey('CredentialIssuer'),
    variant: "label",
    style: [styles.textContainer, {
      paddingLeft: logoHeight + paddingVertical,
      paddingBottom: paddingVertical,
      lineHeight: 19,
      opacity: 0.8
    }],
    numberOfLines: 1
  }, (_overlay$metaOverlay6 = overlay.metaOverlay) === null || _overlay$metaOverlay6 === void 0 ? void 0 : _overlay$metaOverlay6.issuer), /*#__PURE__*/React.createElement(ThemedText, {
    accessibilityLabel: `${effectiveName} ${t('Credentials.Credential')}`,
    testID: testIdWithKey('CredentialName'),
    style: [styles.textContainer, {
      lineHeight: 24
    }]
  }, effectiveName), brandingOverlayType === BrandingOverlayType.Branding11 && credential && /*#__PURE__*/React.createElement(ThemedText, {
    testID: testIdWithKey('IssuedOn'),
    style: [styles.textContainer, {
      lineHeight: 24,
      marginTop: 8,
      fontSize: 14,
      color: ColorPalette.grayscale.mediumGrey
    }]
  }, t('CredentialDetails.IssuedOn'), " ", formatTime(credential.createdAt, {
    includeHour: true
  }))));
};
export default CredentialDetailPrimaryHeader;
//# sourceMappingURL=CredentialDetailPrimaryHeader.js.map