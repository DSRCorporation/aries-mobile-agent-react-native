import React, { useMemo } from 'react';
import { View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { ThemedText } from '../texts/ThemedText';
import { testIdWithKey } from '../../utils/testable';
import useCredentialCardStyles from '../../hooks/credential-card-styles';
import CardWatermark from '../misc/CardWatermark';
import CredentialCardStatusBadge from './CredentialCardStatusBadge';
import CredentialCardAttributeList from './CredentialCardAttributeList';
import CredentialCardSecondaryBody from './CredentialCardSecondaryBody';
/**
 * Card10Pure: overlay-free Card 10 UI that renders from WalletCredentialCardData.
 * - Passes 'Branding10' to the style hook for layout differences.
 * - No OCA resolution or overlay usage at render time.
 */
const Card10Pure = ({
  data,
  onPress,
  elevated,
  hasAltCredentials,
  onChangeAlt
}) => {
  const {
    branding,
    hideSlice
  } = data;
  const {
    styles,
    borderRadius,
    logoHeight
  } = useCredentialCardStyles({
    primaryBackgroundColor: branding.primaryBg,
    secondaryBackgroundColor: branding.secondaryBg
  }, 'Branding10', !!data.proofContext);
  const byKey = useMemo(() => Object.fromEntries(data.items.map(i => [i.key, i])), [data.items]);
  const primary = data.primaryAttributeKey ? byKey[data.primaryAttributeKey] : undefined;
  const secondary = data.secondaryAttributeKey ? byKey[data.secondaryAttributeKey] : undefined;
  const list = useMemo(() => [primary, secondary, ...data.items.filter(i => i.key !== (primary === null || primary === void 0 ? void 0 : primary.key) && i.key !== (secondary === null || secondary === void 0 ? void 0 : secondary.key))].filter(Boolean), [primary, secondary, data.items]);
  const textColor = data.branding.preferredTextColor ?? styles.textContainer.color;
  const issuerAccessibilityLabel = data.issuerName ? `Issued by ${data.issuerName}` : '';
  const dataLabels = list.map(f => `${f.label}, ${f.value ?? ''}`).join(', ');
  const accessibilityLabel = `${issuerAccessibilityLabel}, ${data.credentialName}, ${dataLabels}`;
  const Header = () => /*#__PURE__*/React.createElement(View, {
    style: [styles.primaryBodyNameContainer, {
      flexDirection: 'row',
      alignItems: 'center'
    }]
  }, branding.logo1x1Uri ? /*#__PURE__*/React.createElement(Image, {
    source: {
      uri: branding.logo1x1Uri
    },
    style: {
      width: logoHeight,
      height: logoHeight,
      borderRadius
    }
  }) : /*#__PURE__*/React.createElement(View, {
    style: {
      width: logoHeight,
      height: logoHeight
    }
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1,
      paddingLeft: 8
    }
  }, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "label",
    testID: testIdWithKey('CredentialIssuer'),
    style: [styles.textContainer]
  }, data.issuerName), /*#__PURE__*/React.createElement(ThemedText, {
    variant: "bold",
    testID: testIdWithKey('CredentialName'),
    style: [styles.textContainer]
  }, data.credentialName)));
  const PrimaryBody = () => /*#__PURE__*/React.createElement(View, {
    testID: testIdWithKey('CredentialCardPrimaryBody'),
    style: styles.primaryBodyContainer
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(CredentialCardAttributeList, {
    list: list,
    textColor: textColor,
    showPiiWarning: !!data.proofContext,
    isNotInWallet: data.notInWallet,
    hasAltCredentials: hasAltCredentials,
    onChangeAlt: onChangeAlt,
    helpActionUrl: data.helpActionUrl,
    styles: styles
  }));
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
  }), /*#__PURE__*/React.createElement(PrimaryBody, null), /*#__PURE__*/React.createElement(CredentialCardStatusBadge, {
    status: data.status,
    logoHeight: logoHeight,
    containerStyle: styles.statusContainer
  }));
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      elevation: elevated ? 5 : 0,
      overflow: elevated ? 'visible' : 'hidden'
    }]
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
    width: 0,
    height: 0,
    style: {},
    watermark: branding.watermark
  }), branding.backgroundFullUri && hideSlice ? /*#__PURE__*/React.createElement(ImageBackground, {
    source: {
      uri: branding.backgroundFullUri
    }
  }, /*#__PURE__*/React.createElement(Main, null)) : /*#__PURE__*/React.createElement(Main, null))));
};
export default Card10Pure;
//# sourceMappingURL=Card10Pure.js.map