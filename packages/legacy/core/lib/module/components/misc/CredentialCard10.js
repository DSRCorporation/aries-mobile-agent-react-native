import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ImageBackground, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TOKENS, useServices } from '../../container-api';
import { useTheme } from '../../contexts/theme';
import { credentialTextColor, getCredentialIdentifiers, isValidAnonCredsCredential, toImageSource } from '../../utils/credential';
import { formatTime, useCredentialConnectionLabel } from '../../utils/helpers';
import { buildFieldsFromAnonCredsCredential } from '../../utils/oca';
import { testIdWithKey } from '../../utils/testable';
import CardWatermark from './CardWatermark';
const paddingVertical = 10;
const paddingHorizontal = 10;
const transparent = 'rgba(0,0,0,0)';
const borderRadius = 15;
const borderPadding = 8;

/**
 * A card is defined as a 4x8 (height/rows x width/columns) grid.
 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
 | 2 |   |   |   |   |   |   |   |
 | 3 |   |   |   |   |   |   |   |
 | 4 |   |   |   |   |   |   |   |

The card width is the full screen width, and the card height is half of the screen width

Variation 1:
  Header: Small Logo (1x1) + Issuer Name (1x3) + Credential Name (1x4)
  Body: Reserved for Future Use (2x4)
  Footer: Issued or Expired Date (1x4)

  | L | Issuer    | Cred Name     |
  |             Body              |
  |             Body              |
  | Issued/Expired Date           |

 Variation 2:
  Header: Large Logo (1x4) + Credential Name (1x4)
  Body: Reserved for Future Use (2x4)
  Footer: Issued or Expired Date (1x4)

  | Logo          | Cred Name     |
  |             Body              |
  |             Body              |
  | Issued/Expired Date           |


Note: The small logo MUST be provided as 1x1 (height/width) ratio, while the large logo MUST be provided as 1x4 (height/width) ratio
 */

const CredentialCard10 = ({
  credential,
  style = {},
  onPress = undefined
}) => {
  var _overlay$brandingOver, _overlay$brandingOver2, _overlay$brandingOver3, _overlay$brandingOver4, _overlay$brandingOver5, _overlay$metaOverlay3, _overlay$metaOverlay4, _overlay$metaOverlay5, _overlay$metaOverlay6, _overlay$brandingOver20, _overlay$brandingOver21, _overlay$metaOverlay7, _overlay$metaOverlay8, _overlay$metaOverlay9, _overlay$metaOverlay10;
  const {
    width
  } = useWindowDimensions();
  const cardHeight = width / 2; // a card height is half of the screen width
  const cardHeaderHeight = cardHeight / 4; // a card has a total of 4 rows, and the header occupy 1 row
  const {
    t,
    i18n
  } = useTranslation();
  const {
    ColorPallet,
    TextTheme
  } = useTheme();
  const [overlay, setOverlay] = useState({});
  const [isRevoked, setIsRevoked] = useState(false);
  const credentialConnectionLabel = useCredentialConnectionLabel(credential);
  const [bundleResolver] = useServices([TOKENS.UTIL_OCA_RESOLVER]);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: overlay !== null && overlay !== void 0 && (_overlay$brandingOver = overlay.brandingOverlay) !== null && _overlay$brandingOver !== void 0 && _overlay$brandingOver.imageSource ? transparent : overlay === null || overlay === void 0 || (_overlay$brandingOver2 = overlay.brandingOverlay) === null || _overlay$brandingOver2 === void 0 ? void 0 : _overlay$brandingOver2.backgroundColor,
      height: cardHeight,
      borderRadius: borderRadius
    },
    outerHeaderContainer: {
      flexDirection: 'column',
      backgroundColor: (overlay === null || overlay === void 0 || (_overlay$brandingOver3 = overlay.brandingOverlay) === null || _overlay$brandingOver3 === void 0 || (_overlay$brandingOver3 = _overlay$brandingOver3.header) === null || _overlay$brandingOver3 === void 0 ? void 0 : _overlay$brandingOver3.backgroundColor) ?? transparent,
      height: cardHeaderHeight + borderPadding,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius
    },
    innerHeaderContainer: {
      flexDirection: 'row',
      height: cardHeaderHeight,
      marginLeft: borderPadding,
      marginRight: borderPadding,
      marginTop: borderPadding,
      marginBottom: borderPadding,
      backgroundColor: (overlay === null || overlay === void 0 || (_overlay$brandingOver4 = overlay.brandingOverlay) === null || _overlay$brandingOver4 === void 0 || (_overlay$brandingOver4 = _overlay$brandingOver4.header) === null || _overlay$brandingOver4 === void 0 ? void 0 : _overlay$brandingOver4.backgroundColor) ?? transparent
    },
    bodyContainer: {
      flexGrow: 1
    },
    footerContainer: {
      flexDirection: 'row',
      backgroundColor: (overlay === null || overlay === void 0 || (_overlay$brandingOver5 = overlay.brandingOverlay) === null || _overlay$brandingOver5 === void 0 || (_overlay$brandingOver5 = _overlay$brandingOver5.footer) === null || _overlay$brandingOver5 === void 0 ? void 0 : _overlay$brandingOver5.backgroundColor) ?? transparent,
      paddingHorizontal,
      paddingVertical,
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius
    },
    revokedFooter: {
      backgroundColor: ColorPallet.notification.error,
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
    }
  });
  useEffect(() => {
    if (!(credential && isValidAnonCredsCredential(credential))) {
      return;
    }
    const params = {
      identifiers: getCredentialIdentifiers(credential),
      attributes: buildFieldsFromAnonCredsCredential(credential),
      meta: {
        credConnectionId: credential === null || credential === void 0 ? void 0 : credential.connectionId,
        alias: credentialConnectionLabel
      },
      language: i18n.language
    };
    bundleResolver.resolveAllBundles(params).then(bundle => {
      setOverlay({
        ...overlay,
        ...bundle,
        brandingOverlay: bundle.brandingOverlay
      });
    });
  }, []);
  useEffect(() => {
    setIsRevoked(credential.revocationNotification !== undefined);
  }, [credential.revocationNotification]);
  const CredentialCardHeader = () => {
    var _overlay$brandingOver6, _overlay$brandingOver7, _overlay$brandingOver8, _overlay$brandingOver9, _overlay$brandingOver10, _overlay$brandingOver11, _overlay$brandingOver12, _overlay$brandingOver13, _overlay$metaOverlay, _overlay$brandingOver14, _overlay$brandingOver15, _overlay$brandingOver16, _overlay$metaOverlay2;
    return /*#__PURE__*/React.createElement(View, {
      style: styles.outerHeaderContainer
    }, /*#__PURE__*/React.createElement(View, {
      testID: testIdWithKey('CredentialCardHeader'),
      style: styles.innerHeaderContainer
    }, (overlay === null || overlay === void 0 || (_overlay$brandingOver6 = overlay.brandingOverlay) === null || _overlay$brandingOver6 === void 0 || (_overlay$brandingOver6 = _overlay$brandingOver6.header) === null || _overlay$brandingOver6 === void 0 ? void 0 : _overlay$brandingOver6.imageSource) && /*#__PURE__*/React.createElement(Image, {
      source: toImageSource(overlay === null || overlay === void 0 || (_overlay$brandingOver7 = overlay.brandingOverlay) === null || _overlay$brandingOver7 === void 0 || (_overlay$brandingOver7 = _overlay$brandingOver7.header) === null || _overlay$brandingOver7 === void 0 ? void 0 : _overlay$brandingOver7.imageSource),
      style: {
        flex: !(overlay !== null && overlay !== void 0 && (_overlay$brandingOver8 = overlay.brandingOverlay) !== null && _overlay$brandingOver8 !== void 0 && (_overlay$brandingOver8 = _overlay$brandingOver8.header) !== null && _overlay$brandingOver8 !== void 0 && _overlay$brandingOver8.hideIssuer) ? 1 : 4,
        resizeMode: 'contain',
        maxHeight: styles.outerHeaderContainer.height - borderPadding
      }
    }), overlay !== null && overlay !== void 0 && (_overlay$brandingOver9 = overlay.brandingOverlay) !== null && _overlay$brandingOver9 !== void 0 && (_overlay$brandingOver9 = _overlay$brandingOver9.header) !== null && _overlay$brandingOver9 !== void 0 && _overlay$brandingOver9.hideIssuer ? null : /*#__PURE__*/React.createElement(Text, {
      numberOfLines: 1,
      ellipsizeMode: "tail",
      style: [TextTheme.label, {
        color: (overlay === null || overlay === void 0 || (_overlay$brandingOver10 = overlay.brandingOverlay) === null || _overlay$brandingOver10 === void 0 || (_overlay$brandingOver10 = _overlay$brandingOver10.header) === null || _overlay$brandingOver10 === void 0 ? void 0 : _overlay$brandingOver10.color) ?? credentialTextColor(ColorPallet, (overlay === null || overlay === void 0 || (_overlay$brandingOver11 = overlay.brandingOverlay) === null || _overlay$brandingOver11 === void 0 || (_overlay$brandingOver11 = _overlay$brandingOver11.header) === null || _overlay$brandingOver11 === void 0 ? void 0 : _overlay$brandingOver11.backgroundColor) || (overlay === null || overlay === void 0 || (_overlay$brandingOver12 = overlay.brandingOverlay) === null || _overlay$brandingOver12 === void 0 ? void 0 : _overlay$brandingOver12.backgroundColor)),
        paddingHorizontal: 0.5 * paddingHorizontal,
        flex: !(overlay !== null && overlay !== void 0 && (_overlay$brandingOver13 = overlay.brandingOverlay) !== null && _overlay$brandingOver13 !== void 0 && (_overlay$brandingOver13 = _overlay$brandingOver13.header) !== null && _overlay$brandingOver13 !== void 0 && _overlay$brandingOver13.imageSource) ? 4 : 3,
        textAlignVertical: 'center'
      }],
      testID: testIdWithKey('CredentialIssuer'),
      maxFontSizeMultiplier: 1
    }, overlay === null || overlay === void 0 || (_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.issuer), /*#__PURE__*/React.createElement(Text, {
      numberOfLines: 1,
      ellipsizeMode: "tail",
      style: [TextTheme.label, {
        color: (overlay === null || overlay === void 0 || (_overlay$brandingOver14 = overlay.brandingOverlay) === null || _overlay$brandingOver14 === void 0 || (_overlay$brandingOver14 = _overlay$brandingOver14.header) === null || _overlay$brandingOver14 === void 0 ? void 0 : _overlay$brandingOver14.color) ?? credentialTextColor(ColorPallet, (overlay === null || overlay === void 0 || (_overlay$brandingOver15 = overlay.brandingOverlay) === null || _overlay$brandingOver15 === void 0 || (_overlay$brandingOver15 = _overlay$brandingOver15.header) === null || _overlay$brandingOver15 === void 0 ? void 0 : _overlay$brandingOver15.backgroundColor) || (overlay === null || overlay === void 0 || (_overlay$brandingOver16 = overlay.brandingOverlay) === null || _overlay$brandingOver16 === void 0 ? void 0 : _overlay$brandingOver16.backgroundColor)),
        textAlign: 'right',
        paddingHorizontal: 0.5 * paddingHorizontal,
        flex: 4,
        textAlignVertical: 'center'
      }],
      testID: testIdWithKey('CredentialName'),
      maxFontSizeMultiplier: 1
    }, overlay === null || overlay === void 0 || (_overlay$metaOverlay2 = overlay.metaOverlay) === null || _overlay$metaOverlay2 === void 0 ? void 0 : _overlay$metaOverlay2.name)));
  };
  const CredentialCardBody = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.bodyContainer,
      testID: testIdWithKey('CredentialCardBody')
    });
  };
  const CredentialCardFooter = ({
    revoked = false
  }) => {
    var _overlay$brandingOver17, _overlay$brandingOver18, _overlay$brandingOver19;
    return /*#__PURE__*/React.createElement(View, {
      testID: testIdWithKey('CredentialCardFooter'),
      style: styles.footerContainer
    }, revoked ? /*#__PURE__*/React.createElement(View, {
      style: styles.revokedFooter
    }, /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.label, {
        color: ColorPallet.semantic.error
      }],
      testID: testIdWithKey('CredentialRevoked')
    }, t('CredentialDetails.Revoked'))) : /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.caption, {
        color: (overlay === null || overlay === void 0 || (_overlay$brandingOver17 = overlay.brandingOverlay) === null || _overlay$brandingOver17 === void 0 || (_overlay$brandingOver17 = _overlay$brandingOver17.footer) === null || _overlay$brandingOver17 === void 0 ? void 0 : _overlay$brandingOver17.color) ?? credentialTextColor(ColorPallet, (overlay === null || overlay === void 0 || (_overlay$brandingOver18 = overlay.brandingOverlay) === null || _overlay$brandingOver18 === void 0 || (_overlay$brandingOver18 = _overlay$brandingOver18.footer) === null || _overlay$brandingOver18 === void 0 ? void 0 : _overlay$brandingOver18.backgroundColor) || (overlay === null || overlay === void 0 || (_overlay$brandingOver19 = overlay.brandingOverlay) === null || _overlay$brandingOver19 === void 0 ? void 0 : _overlay$brandingOver19.backgroundColor))
      }],
      testID: testIdWithKey('CredentialIssued'),
      maxFontSizeMultiplier: 1
    }, t('CredentialDetails.Issued'), ": ", formatTime(credential.createdAt, {
      shortMonth: true
    })));
  };
  const CredentialCard = ({
    revoked = false
  }) => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CredentialCardHeader, null), /*#__PURE__*/React.createElement(CredentialCardBody, null), /*#__PURE__*/React.createElement(CredentialCardFooter, {
      revoked: revoked
    }));
  };
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    accessible: true,
    accessibilityLabel: `${(_overlay$metaOverlay3 = overlay.metaOverlay) !== null && _overlay$metaOverlay3 !== void 0 && _overlay$metaOverlay3.issuer ? `${t('Credentials.IssuedBy')} ${(_overlay$metaOverlay4 = overlay.metaOverlay) === null || _overlay$metaOverlay4 === void 0 ? void 0 : _overlay$metaOverlay4.issuer}` : ''}, ${((_overlay$metaOverlay5 = overlay.metaOverlay) === null || _overlay$metaOverlay5 === void 0 ? void 0 : _overlay$metaOverlay5.watermark) ?? ''} ${((_overlay$metaOverlay6 = overlay.metaOverlay) === null || _overlay$metaOverlay6 === void 0 ? void 0 : _overlay$metaOverlay6.name) ?? ''} ${t('Credentials.Credential')}.`,
    disabled: typeof onPress === 'undefined' ? true : false,
    onPress: onPress,
    style: [styles.container, style],
    testID: testIdWithKey('ShowCredentialDetails')
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.flexGrow, {
      overflow: 'hidden'
    }],
    testID: testIdWithKey('CredentialCard')
  }, overlay !== null && overlay !== void 0 && (_overlay$brandingOver20 = overlay.brandingOverlay) !== null && _overlay$brandingOver20 !== void 0 && _overlay$brandingOver20.imageSource ? /*#__PURE__*/React.createElement(ImageBackground, {
    source: toImageSource(overlay === null || overlay === void 0 || (_overlay$brandingOver21 = overlay.brandingOverlay) === null || _overlay$brandingOver21 === void 0 ? void 0 : _overlay$brandingOver21.imageSource),
    style: styles.flexGrow,
    imageStyle: {
      borderRadius
    }
  }, ((_overlay$metaOverlay7 = overlay.metaOverlay) === null || _overlay$metaOverlay7 === void 0 ? void 0 : _overlay$metaOverlay7.watermark) && /*#__PURE__*/React.createElement(CardWatermark, {
    width: width,
    height: cardHeight,
    style: styles.watermark,
    watermark: (_overlay$metaOverlay8 = overlay.metaOverlay) === null || _overlay$metaOverlay8 === void 0 ? void 0 : _overlay$metaOverlay8.watermark
  }), /*#__PURE__*/React.createElement(CredentialCard, {
    revoked: isRevoked
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, ((_overlay$metaOverlay9 = overlay.metaOverlay) === null || _overlay$metaOverlay9 === void 0 ? void 0 : _overlay$metaOverlay9.watermark) && /*#__PURE__*/React.createElement(CardWatermark, {
    width: width,
    height: cardHeight,
    style: styles.watermark,
    watermark: (_overlay$metaOverlay10 = overlay.metaOverlay) === null || _overlay$metaOverlay10 === void 0 ? void 0 : _overlay$metaOverlay10.watermark
  }), /*#__PURE__*/React.createElement(CredentialCard, {
    revoked: isRevoked
  }))));
};
export default CredentialCard10;
//# sourceMappingURL=CredentialCard10.js.map