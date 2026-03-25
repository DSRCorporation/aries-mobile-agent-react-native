import React, { useState } from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemedText } from '../texts/ThemedText';
import { testIdWithKey } from '../../utils/testable';
import useCredentialCardStyles from '../../hooks/credential-card-styles';
import CardWatermark from './CardWatermark';
import CredentialCardGenLogo from './CredentialCardGenLogo';
import startCase from 'lodash.startcase';
import { toImageSource } from '../../utils/credential';
import CredentialCardStatusBadge from './CredentialCardStatusBadge';
import CredentialCardAttributeList from './CredentialCardAttributeList';
import CredentialCardSecondaryBody from './CredentialCardSecondaryBody';
const Card11Pure = ({
  data,
  onPress,
  elevated,
  hasAltCredentials,
  onChangeAlt
}) => {
  const [dimensions, setDimensions] = useState({
    cardWidth: 0,
    cardHeight: 0
  });
  const {
    branding,
    proofContext,
    hideSlice
  } = data;
  const {
    styles,
    borderRadius,
    logoHeight
  } = useCredentialCardStyles(
  // NEW: pass simple colors (no overlay object)
  {
    primaryBackgroundColor: branding.primaryBg,
    secondaryBackgroundColor: branding.secondaryBg
  }, branding.type, !!proofContext);
  const list = data.items;
  const textColor = data.branding.preferredTextColor ?? styles.textContainer.color;
  const issuerAccessibilityLabel = data.issuerName ? `Issued by ${data.issuerName}` : '';
  const accessibilityLabel = `${issuerAccessibilityLabel}, ${data.credentialName}, ` + list.map(f => `${f.label}, ${String(f.value ?? '')}`).join(', ');
  const PrimaryBody = () => {
    return /*#__PURE__*/React.createElement(View, {
      testID: testIdWithKey('CredentialCardPrimaryBody'),
      style: styles.primaryBodyContainer
    }, /*#__PURE__*/React.createElement(View, {
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
    }, data.issuerName)), /*#__PURE__*/React.createElement(View, {
      style: styles.primaryBodyNameContainer
    }, /*#__PURE__*/React.createElement(ThemedText, {
      variant: "bold",
      testID: testIdWithKey('CredentialName'),
      style: [styles.textContainer, styles.credentialName, {
        color: textColor
      }]
    }, data.credentialName)), data.extraOverlayParameter && !proofContext && /*#__PURE__*/React.createElement(View, {
      style: {
        flex: 1,
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement(ThemedText, {
      variant: "caption",
      style: {
        color: styles.textContainer.color
      }
    }, data.extraOverlayParameter.label ?? startCase(data.extraOverlayParameter.label || ''), ":", ' ', data.extraOverlayParameter.value)), /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center'
      }
    }, data.revoked && !proofContext && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      style: styles.errorIcon,
      name: "close",
      size: 30
    }), /*#__PURE__*/React.createElement(ThemedText, {
      style: styles.errorText,
      testID: testIdWithKey('RevokedOrNotAvailable'),
      numberOfLines: 1
    }, "Revoked")), data.notInWallet && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      style: styles.errorIcon,
      name: "close",
      size: 30
    }), /*#__PURE__*/React.createElement(ThemedText, {
      style: styles.errorText,
      testID: testIdWithKey('RevokedOrNotAvailable')
    }, "Not available in your wallet"))), proofContext && /*#__PURE__*/React.createElement(CredentialCardAttributeList, {
      list: list,
      textColor: textColor,
      showPiiWarning: !!data.proofContext,
      isNotInWallet: data.notInWallet,
      hasAltCredentials: hasAltCredentials,
      onChangeAlt: onChangeAlt,
      helpActionUrl: data.helpActionUrl,
      styles: styles
    }));
  };
  const Main = () => /*#__PURE__*/React.createElement(View, {
    style: styles.cardContainer,
    accessible: true,
    accessibilityLabel: accessibilityLabel
  }, /*#__PURE__*/React.createElement(CredentialCardSecondaryBody, {
    hideSlice: hideSlice,
    secondaryBg: branding.secondaryBg,
    backgroundSliceUri: branding.backgroundSliceUri,
    borderRadius: borderRadius,
    containerStyle: styles.secondaryBodyContainer
  }), /*#__PURE__*/React.createElement(CredentialCardGenLogo, {
    noLogoText: branding.logoText ?? 'U',
    logo: branding.logo1x1Uri,
    primaryBackgroundColor: branding.primaryBg,
    secondaryBackgroundColor: branding.secondaryBg,
    containerStyle: styles.logoContainer,
    logoHeight: logoHeight,
    elevated: elevated
  }), /*#__PURE__*/React.createElement(PrimaryBody, null), /*#__PURE__*/React.createElement(CredentialCardStatusBadge, {
    status: data.status,
    logoHeight: logoHeight,
    containerStyle: styles.statusContainer
  }));
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      elevation: elevated ? 5 : 0,
      overflow: elevated ? 'visible' : 'hidden'
    }],
    onLayout: event => {
      setDimensions({
        cardHeight: event.nativeEvent.layout.height,
        cardWidth: event.nativeEvent.layout.width
      });
    }
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    accessible: false,
    accessibilityLabel: onPress ? 'Credential details' : undefined,
    disabled: !onPress,
    onPress: onPress,
    style: styles.container,
    testID: testIdWithKey('ShowCredentialDetails')
  }, /*#__PURE__*/React.createElement(View, {
    testID: testIdWithKey('CredentialCard'),
    style: {
      overflow: 'hidden'
    }
  }, branding.watermark && /*#__PURE__*/React.createElement(CardWatermark, {
    width: dimensions.cardWidth,
    height: dimensions.cardHeight,
    style: {
      color: branding.primaryBg
    },
    watermark: branding.watermark
  }), branding.backgroundFullUri && hideSlice ? /*#__PURE__*/React.createElement(ImageBackground, {
    source: toImageSource(branding.backgroundFullUri)
  }, /*#__PURE__*/React.createElement(Main, null)) : /*#__PURE__*/React.createElement(Main, null))));
};
export default Card11Pure;
//# sourceMappingURL=Card11Pure.js.map