"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _legacy = require("@bifold/oca/build/legacy");
var _theme = require("../contexts/theme");
var _reactNative = require("react-native");
var _helpers = require("../utils/helpers");
var _credential = require("../utils/credential");
const useCredentialCardStyles = (overlayOrColors, brandingOverlayType, proof) => {
  var _overlayOrColors$bran, _overlayOrColors$bran2;
  const {
    ColorPalette,
    TextTheme,
    ListItems,
    CredentialCardShadowTheme
  } = (0, _theme.useTheme)();
  const {
    width,
    fontScale
  } = (0, _reactNative.useWindowDimensions)();
  const padding = width * 0.05;
  const logoHeight = width * 0.12;
  const borderRadius = 10;
  const isOverlay = o => o && typeof o === 'object' && 'brandingOverlay' in o;
  const primaryBg = isOverlay(overlayOrColors) ? (_overlayOrColors$bran = overlayOrColors.brandingOverlay) === null || _overlayOrColors$bran === void 0 ? void 0 : _overlayOrColors$bran.primaryBackgroundColor : overlayOrColors.primaryBackgroundColor;

  // If we have a full overlay, preserve legacy fallback using helper.
  // Otherwise, use provided secondary or fall back to primary.
  const secondaryFromHelper = isOverlay(overlayOrColors) ? (0, _helpers.getSecondaryBackgroundColor)(overlayOrColors, proof) : undefined;
  const secondaryBg = secondaryFromHelper ?? (isOverlay(overlayOrColors) ? (_overlayOrColors$bran2 = overlayOrColors.brandingOverlay) === null || _overlayOrColors$bran2 === void 0 ? void 0 : _overlayOrColors$bran2.primaryBackgroundColor : overlayOrColors.secondaryBackgroundColor ?? overlayOrColors.primaryBackgroundColor);
  const styles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: primaryBg,
      borderRadius: borderRadius,
      ...CredentialCardShadowTheme
    },
    cardContainer: {
      flexDirection: 'row',
      minHeight: 0.33 * width
    },
    secondaryBodyContainer: {
      width: logoHeight,
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
      backgroundColor: secondaryBg
    },
    primaryBodyContainer: {
      flex: 1,
      padding,
      ...((brandingOverlayType === 'Branding11' || brandingOverlayType === _legacy.BrandingOverlayType.Branding11) && {
        justifyContent: 'space-between'
      }),
      marginLeft: brandingOverlayType === 'Branding10' || brandingOverlayType === _legacy.BrandingOverlayType.Branding10 ? -1 * logoHeight + padding : -1.3 * logoHeight + padding
    },
    primaryBodyNameContainer: {
      flexDirection: 'row',
      ...((brandingOverlayType === 'Branding11' || brandingOverlayType === _legacy.BrandingOverlayType.Branding11) && {
        minHeight: logoHeight,
        alignItems: 'center'
      })
    },
    recordAttributeText: {
      fontSize: ListItems.recordAttributeText.fontSize
    },
    imageAttr: {
      height: 150,
      aspectRatio: 1,
      resizeMode: 'contain',
      borderRadius: borderRadius
    },
    statusContainer: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderTopRightRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
      height: logoHeight,
      width: logoHeight,
      justifyContent: 'center',
      alignItems: 'center'
    },
    logoContainer: {
      width: logoHeight * (fontScale > 1.7 ? 1.2 : 1),
      height: logoHeight * (fontScale > 1.7 ? 1.2 : 1),
      backgroundColor: '#ffffff',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      top: padding,
      left: -1 * logoHeight + padding,
      ...CredentialCardShadowTheme
    },
    headerText: {
      ...TextTheme.labelSubtitle,
      ...ListItems.recordAttributeText,
      fontSize: 15,
      flexShrink: 1
    },
    valueText: {
      ...TextTheme.normal,
      minHeight: ListItems.recordAttributeText.fontSize,
      paddingVertical: 4
    },
    textContainer: {
      color: proof && (brandingOverlayType === 'Branding10' || brandingOverlayType === _legacy.BrandingOverlayType.Branding10) ? TextTheme.normal.color : (0, _credential.credentialTextColor)(ColorPalette, primaryBg),
      flexShrink: 1,
      ...((brandingOverlayType === 'Branding11' || brandingOverlayType === _legacy.BrandingOverlayType.Branding11) && {
        fontSize: 16
      }),
      lineHeight: 24
    },
    credentialName: {
      flex: 1,
      flexWrap: 'wrap',
      ...((brandingOverlayType === 'Branding11' || brandingOverlayType === _legacy.BrandingOverlayType.Branding11) && {
        lineHeight: 16,
        maxWidth: '85%',
        fontSize: 14,
        fontWeight: '600'
      })
    },
    credentialIssuerContainer: {
      flex: 1,
      alignSelf: 'flex-end',
      justifyContent: 'flex-end',
      maxWidth: 225,
      paddingTop: 5
    },
    errorText: {
      ...TextTheme.normal,
      color: ListItems.proofError.color
    },
    errorIcon: {
      color: ListItems.proofError.color
    },
    selectedCred: {
      borderWidth: 5,
      borderRadius: 15,
      borderColor: ColorPalette.semantic.focus
    },
    credActionText: {
      fontSize: 20,
      fontWeight: TextTheme.bold.fontWeight,
      color: ColorPalette.brand.link
    },
    cardAttributeContainer: {
      marginVertical: 16,
      gap: 4
    }
  });
  return {
    styles,
    borderRadius,
    logoHeight
  };
};
var _default = exports.default = useCredentialCardStyles;
//# sourceMappingURL=credential-card-styles.js.map