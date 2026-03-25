import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter, Image, ImageBackground, StyleSheet, Text, useWindowDimensions, View, TouchableOpacity } from 'react-native';
import { testIdWithKey } from '../../../utils/testable';
import { credentialTextColor, toImageSource } from '../../../utils/credential';
import { useTheme } from '../../../contexts/theme';
import { SvgUri } from 'react-native-svg';
import { getCredentialForDisplay } from '../display';
import { BifoldError } from '../../../types/error';
import { EventTypes } from '../../../constants';
import { getAttributeField } from '../../../utils/oca';
import { useCredentialErrorsFromRegistry } from '../hooks/useCredentialErrorsFromRegistry';
import { CredentialErrors } from '../../../types/credentials';
const paddingVertical = 10;
const paddingHorizontal = 10;
const transparent = 'rgba(0,0,0,0)';
const borderRadius = 15;
const borderPadding = 8;
const InvalidBadge = ({
  isInvalid
}) => {
  const {
    ColorPalette,
    TextTheme
  } = useTheme();
  const styles = StyleSheet.create({
    badgeWrap: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: ColorPalette.notification.error,
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 4
    },
    badgeText: {
      ...TextTheme.label,
      color: '#fff',
      fontWeight: '700',
      fontSize: 12
    }
  });
  if (!isInvalid) return null;
  return /*#__PURE__*/React.createElement(View, {
    style: styles.badgeWrap,
    testID: testIdWithKey('CredentialInvalidBadge')
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.badgeText
  }, "Invalid"));
};
const OpenIDCredentialCard = ({
  credentialDisplay,
  credentialRecord,
  style = {},
  onPress = undefined
}) => {
  const {
    t
  } = useTranslation();
  const {
    ColorPalette,
    TextTheme
  } = useTheme();
  const computedErrors = useCredentialErrorsFromRegistry(credentialRecord, []);
  const isInvalid = useMemo(() => {
    return computedErrors.includes(CredentialErrors.Revoked);
  }, [computedErrors]);
  const display = useMemo(() => {
    if (credentialDisplay) return credentialDisplay.display;
    if (!credentialRecord) {
      const error = new BifoldError(t('Error.Title1047'), t('Error.Message1047'), 'Error[Logical] credentialDisplay and credentialRecord are undefined', 1047);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
      return;
    }
    const result = getCredentialForDisplay(credentialRecord);
    return result.display;
  }, [credentialDisplay, credentialRecord, t]);
  const overlayAttributeField = useMemo(() => {
    var _getAttributeField;
    if (!(display !== null && display !== void 0 && display.primary_overlay_attribute) || !credentialDisplay) return undefined;
    return (_getAttributeField = getAttributeField(credentialDisplay, display.primary_overlay_attribute)) === null || _getAttributeField === void 0 ? void 0 : _getAttributeField.field;
  }, [display, credentialDisplay]);
  const {
    width
  } = useWindowDimensions();
  const cardHeight = width * 0.55; // a card height is half of the screen width
  const cardHeaderHeight = cardHeight / 4; // a card has a total of 4 rows, and the header occupy 1 row

  const styles = StyleSheet.create({
    container: {},
    issuerLogoContainer: {
      marginBottom: 30
    },
    cardContainer: {
      backgroundColor: display !== null && display !== void 0 && display.backgroundColor ? display.backgroundColor : transparent,
      height: cardHeight,
      borderRadius: borderRadius
    },
    outerHeaderContainer: {
      flexDirection: 'column',
      backgroundColor: transparent,
      height: cardHeaderHeight + borderPadding,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius
    },
    innerHeaderContainer: {
      flexDirection: 'row',
      height: cardHeaderHeight,
      marginLeft: borderPadding,
      marginRight: borderPadding,
      marginTop: 20,
      marginBottom: borderPadding,
      backgroundColor: transparent
    },
    innerHeaderContainerCredLogo: {
      flex: 1
    },
    innerHeaderCredInfoContainer: {
      flex: 3,
      alignItems: 'flex-end',
      marginRight: paddingHorizontal
    },
    bodyContainer: {
      flexGrow: 1
    },
    footerContainer: {
      flexDirection: 'row',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      paddingHorizontal,
      paddingVertical,
      paddingLeft: paddingHorizontal + 10,
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius
    },
    revokedFooter: {
      backgroundColor: ColorPalette.notification.error,
      flexGrow: 1,
      marginHorizontal: -1 * paddingHorizontal,
      marginVertical: -1 * paddingVertical,
      paddingHorizontal: paddingHorizontal,
      paddingVertical: paddingVertical,
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius
    },
    flexGrow: {
      flexGrow: 1
    },
    watermark: {
      opacity: 0.16,
      fontSize: 22,
      transform: [{
        rotate: '-30deg'
      }]
    },
    credentialInfoContainer: {},
    titleFontCredentialName: {
      ...TextTheme.labelTitle,
      color: (display === null || display === void 0 ? void 0 : display.textColor) ?? credentialTextColor(ColorPalette, display === null || display === void 0 ? void 0 : display.backgroundColor),
      textAlignVertical: 'center',
      marginBottom: 8
    },
    titleFontCredentialDescription: {
      ...TextTheme.label,
      color: (display === null || display === void 0 ? void 0 : display.textColor) ?? credentialTextColor(ColorPalette, display === null || display === void 0 ? void 0 : display.backgroundColor),
      textAlignVertical: 'center'
    }
  });

  //This should be implimented for credential log
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const logoContaineter = logo => {
    const width = 64;
    const height = 48;
    const src = logo === null || logo === void 0 ? void 0 : logo.uri;
    if (!src) {
      return /*#__PURE__*/React.createElement(View, null);
    }
    if (typeof src === 'string' && src.endsWith('.svg')) return /*#__PURE__*/React.createElement(SvgUri, {
      role: "img",
      width: width,
      height: height,
      uri: src,
      "aria-label": logo.altText
    });
    return /*#__PURE__*/React.createElement(Image, {
      source: toImageSource(src),
      style: {
        flex: 4,
        resizeMode: 'contain',
        width: width,
        height: height
      }
    });
  };
  const CardHeader = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: [styles.outerHeaderContainer]
    }, /*#__PURE__*/React.createElement(InvalidBadge, {
      isInvalid: isInvalid
    }), /*#__PURE__*/React.createElement(View, {
      testID: testIdWithKey('CredentialCardHeader'),
      style: [styles.innerHeaderContainer]
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.innerHeaderContainerCredLogo
    }, logoContaineter(display === null || display === void 0 ? void 0 : display.logo)), /*#__PURE__*/React.createElement(View, {
      style: styles.innerHeaderCredInfoContainer
    }, /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
      numberOfLines: 1,
      ellipsizeMode: "tail",
      style: styles.titleFontCredentialName,
      testID: testIdWithKey('CredentialIssuer'),
      maxFontSizeMultiplier: 1
    }, display === null || display === void 0 ? void 0 : display.name)), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
      numberOfLines: 1,
      ellipsizeMode: "tail",
      style: styles.titleFontCredentialDescription,
      testID: testIdWithKey('CredentialName'),
      maxFontSizeMultiplier: 1
    }, display === null || display === void 0 ? void 0 : display.description)))));
  };
  const CardBody = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.bodyContainer,
      testID: testIdWithKey('CredentialCardBody')
    });
  };
  const CardFooter = () => {
    if (!overlayAttributeField) return null;
    return /*#__PURE__*/React.createElement(View, {
      testID: testIdWithKey('CredentialCardFooter'),
      style: styles.footerContainer
    }, /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.caption, {
        color: (display === null || display === void 0 ? void 0 : display.textColor) ?? credentialTextColor(ColorPalette, display === null || display === void 0 ? void 0 : display.backgroundColor)
      }],
      testID: testIdWithKey('CredentialIssued'),
      maxFontSizeMultiplier: 1
    }, overlayAttributeField.label ?? overlayAttributeField.name, ": ", overlayAttributeField.value));
  };
  const CredentialCard = () => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CardHeader, null), /*#__PURE__*/React.createElement(CardBody, null), /*#__PURE__*/React.createElement(CardFooter, null));
  };
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(TouchableOpacity, {
    accessible: true,
    accessibilityLabel: `${display !== null && display !== void 0 && display.issuer.name ? `${t('Credentials.IssuedBy')} ${display === null || display === void 0 ? void 0 : display.issuer.name}` : ''}, ${t('Credentials.Credential')}.`,
    accessibilityRole: "button",
    disabled: typeof onPress === 'undefined' ? true : false,
    onPress: onPress,
    style: [styles.cardContainer, style],
    testID: testIdWithKey('ShowCredentialDetails')
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.flexGrow, {
      overflow: 'hidden'
    }],
    testID: testIdWithKey('CredentialCard')
  }, display !== null && display !== void 0 && display.backgroundImage ? /*#__PURE__*/React.createElement(ImageBackground, {
    source: toImageSource(display.backgroundImage.uri),
    style: styles.flexGrow,
    imageStyle: {
      borderRadius
    }
  }, /*#__PURE__*/React.createElement(CredentialCard, null)) : /*#__PURE__*/React.createElement(CredentialCard, null))));
};
export default OpenIDCredentialCard;
//# sourceMappingURL=OpenIDCredentialCard.js.map