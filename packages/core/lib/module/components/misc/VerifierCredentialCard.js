import { Attribute, Predicate, BrandingOverlayType } from '@bifold/oca/build/legacy';
import startCase from 'lodash.startcase';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, ImageBackground, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImageModal from '../../components/modals/ImageModal';
import { TOKENS, useServices } from '../../container-api';
import { useTheme } from '../../contexts/theme';
import { toImageSource } from '../../utils/credential';
import { formatIfDate, getAttributeFormats, isDataUrl, pTypeToText } from '../../utils/helpers';
import { testIdWithKey } from '../../utils/testable';
import CardWatermark from './CardWatermark';
import CredentialCard11Logo from './CredentialCard11Logo';
import useCredentialCardStyles from '../../hooks/credential-card-styles';
import { Shade, shadeIsLightOrDark } from '../../utils/luminance';
import CredentialIssuerBody from './CredentialCard11Issuer';
import { ThemedText } from '../texts/ThemedText';
/**
 * This component is meant to be used in the ProofRequestDetails screen to show what
 * a proof request will look like with proper branding etc. and allow for the changing
 * of predicate values. It is a greatly trimmed-down version of the CredentialCard11.
 */
const VerifierCredentialCard = ({
  style = {},
  displayItems = [],
  elevated = false,
  credDefId,
  schemaId,
  preview,
  onChangeValue,
  brandingOverlayType = BrandingOverlayType.Branding10
}) => {
  var _overlay$bundle, _overlay$metaOverlay11, _overlay$brandingOver3, _overlay$metaOverlay12;
  const [dimensions, setDimensions] = useState({
    cardWidth: 0,
    cardHeight: 0
  });
  const {
    i18n,
    t
  } = useTranslation();
  const {
    ColorPalette,
    TextTheme
  } = useTheme();
  const [bundleResolver] = useServices([TOKENS.UTIL_OCA_RESOLVER]);
  const [overlay, setOverlay] = useState({});
  const isBranding10 = brandingOverlayType === BrandingOverlayType.Branding10;
  const isBranding11 = brandingOverlayType === BrandingOverlayType.Branding11;
  const {
    styles,
    borderRadius
  } = useCredentialCardStyles(overlay, brandingOverlayType, isBranding10);
  const attributeTypes = (_overlay$bundle = overlay.bundle) === null || _overlay$bundle === void 0 ? void 0 : _overlay$bundle.captureBase.attributes;
  const attributeFormats = React.useMemo(() => getAttributeFormats(overlay.bundle), [overlay.bundle]);
  const getCardWatermarkTextColor = background => {
    if (isBranding10) return ColorPalette.grayscale.mediumGrey;
    const shade = shadeIsLightOrDark(background ?? ColorPalette.grayscale.lightGrey);
    return shade == Shade.Light ? ColorPalette.grayscale.darkGrey : ColorPalette.grayscale.lightGrey;
  };
  const parseAttribute = item => {
    var _parsedItem, _parsedItem2, _parsedItem3;
    let parsedItem = item;
    if (item && !item.value) {
      parsedItem = pTypeToText(item, t, attributeTypes);
    }
    const parsedValue = formatIfDate(attributeFormats === null || attributeFormats === void 0 ? void 0 : attributeFormats[(item === null || item === void 0 ? void 0 : item.name) ?? ''], ((_parsedItem = parsedItem) === null || _parsedItem === void 0 ? void 0 : _parsedItem.value) ?? ((_parsedItem2 = parsedItem) === null || _parsedItem2 === void 0 ? void 0 : _parsedItem2.pValue) ?? null);
    return {
      label: (item === null || item === void 0 ? void 0 : item.label) ?? (item === null || item === void 0 ? void 0 : item.name) ?? '',
      value: item !== null && item !== void 0 && item.value ? parsedValue : `${(_parsedItem3 = parsedItem) === null || _parsedItem3 === void 0 ? void 0 : _parsedItem3.pType} ${parsedValue}`
    };
  };
  useEffect(() => {
    const params = {
      identifiers: {
        schemaId,
        credentialDefinitionId: credDefId
      },
      attributes: displayItems,
      language: i18n.language
    };
    bundleResolver.resolveAllBundles(params).then(bundle => {
      setOverlay(o => ({
        ...o,
        ...bundle,
        brandingOverlay: bundle.brandingOverlay
      }));
    });
  }, [schemaId, credDefId, displayItems, i18n.language, bundleResolver]);
  const AttributeItem = ({
    item
  }) => {
    var _overlay$bundle2;
    const label = item.name || item.label;
    const ylabel = ((_overlay$bundle2 = overlay.bundle) === null || _overlay$bundle2 === void 0 || (_overlay$bundle2 = _overlay$bundle2.labelOverlay) === null || _overlay$bundle2 === void 0 ? void 0 : _overlay$bundle2.attributeLabels[label]) ?? startCase(label);
    const [value, setValue] = useState(item.value);
    const [showImageModal, setShowImageModal] = useState(false);
    useEffect(() => {
      setValue(v => formatIfDate(item.format, v));
    }, [item.format]);
    return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(ThemedText, {
      variant: "labelSubtitle",
      style: [styles.textContainer, {
        lineHeight: 19,
        opacity: 0.8
      }],
      testID: testIdWithKey('AttributeName')
    }, ylabel), value && /*#__PURE__*/React.createElement(View, null, isDataUrl(value) ? /*#__PURE__*/React.createElement(TouchableOpacity, {
      accessibilityLabel: t('Record.Zoom'),
      accessibilityRole: "imagebutton",
      testID: testIdWithKey('zoom'),
      onPress: () => setShowImageModal(true)
    }, /*#__PURE__*/React.createElement(Image, {
      style: styles.imageAttr,
      source: {
        uri: value
      }
    })) : /*#__PURE__*/React.createElement(ThemedText, {
      variant: "bold",
      style: styles.textContainer,
      testID: testIdWithKey('AttributeValue')
    }, value)), showImageModal && /*#__PURE__*/React.createElement(ImageModal, {
      uri: value,
      onDismissPressed: () => setShowImageModal(false)
    }));
  };
  const PredicateItem = ({
    item
  }) => {
    var _overlay$bundle3;
    const {
      ColorPalette
    } = useTheme();
    const label = item.label || item.name;
    const ylabel = ((_overlay$bundle3 = overlay.bundle) === null || _overlay$bundle3 === void 0 || (_overlay$bundle3 = _overlay$bundle3.labelOverlay) === null || _overlay$bundle3 === void 0 ? void 0 : _overlay$bundle3.attributeLabels[label]) ?? startCase(label);
    const [currentValue, setCurrentValue] = useState(`${item.pValue ?? ''}`);
    const predicateStyles = StyleSheet.create({
      input: {
        textAlign: 'center',
        textAlignVertical: 'bottom',
        borderBottomColor: ColorPalette.grayscale.black,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderBottomWidth: 1,
        lineHeight: 19,
        padding: 0
      },
      predicateLabel: {
        lineHeight: 19,
        opacity: 0.8
      },
      predicateType: {
        lineHeight: isBranding10 ? 19 : styles.textContainer.lineHeight,
        marginRight: 5
      }
    });
    return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(ThemedText, {
      variant: "labelSubtitle",
      style: [styles.textContainer, predicateStyles.predicateLabel],
      testID: testIdWithKey('PredicateName')
    }, ylabel), /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end'
      }
    }, item.satisfied && !preview ? /*#__PURE__*/React.createElement(Icon, {
      style: {
        marginRight: 5
      },
      size: 24,
      name: 'check-circle',
      color: ColorPalette.semantic.success
    }) : null, /*#__PURE__*/React.createElement(ThemedText, {
      variant: "bold",
      style: [styles.textContainer, predicateStyles.predicateType]
    }, item.pType), item.parameterizable && preview && onChangeValue ? /*#__PURE__*/React.createElement(TextInput, {
      keyboardType: "numeric",
      style: [TextTheme.bold, predicateStyles.input],
      onChangeText: value => setCurrentValue(value),
      onBlur: () => {
        onChangeValue(schemaId, item.label || item.name || '', item.name || '', currentValue);
      },
      testID: testIdWithKey('PredicateInput')
    }, currentValue) : /*#__PURE__*/React.createElement(ThemedText, {
      variant: "bold",
      style: styles.textContainer,
      testID: testIdWithKey('PredicateValue')
    }, item.pValue)));
  };
  const CardAttribute = ({
    item
  }) => {
    item.format = attributeFormats === null || attributeFormats === void 0 ? void 0 : attributeFormats[item.name ?? ''];
    let parsedPredicate = undefined;
    if (item instanceof Predicate) {
      parsedPredicate = pTypeToText(item, t, attributeTypes);
      if (!parsedPredicate.parameterizable) {
        parsedPredicate.pValue = formatIfDate(parsedPredicate.format, parsedPredicate.pValue);
      }
    }
    return /*#__PURE__*/React.createElement(View, {
      style: styles.cardAttributeContainer
    }, item instanceof Attribute && /*#__PURE__*/React.createElement(AttributeItem, {
      item: item
    }), item instanceof Predicate && /*#__PURE__*/React.createElement(PredicateItem, {
      item: parsedPredicate
    }));
  };
  const renderCardAttribute = item => {
    return /*#__PURE__*/React.createElement(CardAttribute, {
      item: item
    });
  };
  const CredentialCardPrimaryBody = () => {
    var _overlay$metaOverlay, _overlay$metaOverlay2, _overlay$metaOverlay3;
    return /*#__PURE__*/React.createElement(View, {
      testID: testIdWithKey('CredentialCardPrimaryBody'),
      style: styles.primaryBodyContainer
    }, /*#__PURE__*/React.createElement(View, null, isBranding10 && /*#__PURE__*/React.createElement(CredentialIssuerBody, {
      overlay: overlay,
      overlayType: brandingOverlayType,
      hasBody: ((_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.issuer) !== 'Unknown Contact',
      proof: true
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.primaryBodyNameContainer
    }, /*#__PURE__*/React.createElement(ThemedText, {
      variant: "bold",
      testID: testIdWithKey('CredentialName'),
      style: [styles.textContainer, styles.credentialName]
    }, (_overlay$metaOverlay2 = overlay.metaOverlay) === null || _overlay$metaOverlay2 === void 0 ? void 0 : _overlay$metaOverlay2.name))), /*#__PURE__*/React.createElement(FlatList, {
      data: displayItems,
      scrollEnabled: false,
      initialNumToRender: displayItems === null || displayItems === void 0 ? void 0 : displayItems.length,
      keyExtractor: ({
        name
      }) => name,
      renderItem: ({
        item
      }) => {
        return renderCardAttribute(item);
      }
    }), brandingOverlayType === BrandingOverlayType.Branding11 && /*#__PURE__*/React.createElement(CredentialIssuerBody, {
      overlay: overlay,
      overlayType: brandingOverlayType,
      hasBody: ((_overlay$metaOverlay3 = overlay.metaOverlay) === null || _overlay$metaOverlay3 === void 0 ? void 0 : _overlay$metaOverlay3.issuer) !== 'Unknown Contact'
    }));
  };
  const CredentialCardSecondaryBody = () => {
    var _overlay$brandingOver, _overlay$brandingOver2;
    return /*#__PURE__*/React.createElement(View, {
      testID: testIdWithKey('CredentialCardSecondaryBody'),
      style: styles.secondaryBodyContainer
    }, (_overlay$brandingOver = overlay.brandingOverlay) !== null && _overlay$brandingOver !== void 0 && _overlay$brandingOver.backgroundImageSlice && (!displayItems || brandingOverlayType === BrandingOverlayType.Branding11) ? /*#__PURE__*/React.createElement(ImageBackground, {
      source: toImageSource((_overlay$brandingOver2 = overlay.brandingOverlay) === null || _overlay$brandingOver2 === void 0 ? void 0 : _overlay$brandingOver2.backgroundImageSlice),
      style: {
        flexGrow: 1
      },
      imageStyle: {
        borderTopLeftRadius: borderRadius,
        borderBottomLeftRadius: borderRadius
      }
    }, null) : null);
  };
  const CredentialCard = () => {
    var _overlay$metaOverlay4, _overlay$metaOverlay5, _overlay$metaOverlay6, _overlay$metaOverlay7, _overlay$metaOverlay8, _overlay$metaOverlay9, _overlay$metaOverlay0, _overlay$metaOverlay1, _overlay$metaOverlay10;
    const watermarkLabel = (_overlay$metaOverlay4 = overlay.metaOverlay) !== null && _overlay$metaOverlay4 !== void 0 && _overlay$metaOverlay4.watermark ? ((_overlay$metaOverlay5 = overlay.metaOverlay) === null || _overlay$metaOverlay5 === void 0 ? void 0 : _overlay$metaOverlay5.watermark) + ',' : '';
    const issuerAccessibilityLabel = (_overlay$metaOverlay6 = overlay.metaOverlay) !== null && _overlay$metaOverlay6 !== void 0 && _overlay$metaOverlay6.issuer ? `${t('Credentials.IssuedBy')} ${(_overlay$metaOverlay7 = overlay.metaOverlay) === null || _overlay$metaOverlay7 === void 0 ? void 0 : _overlay$metaOverlay7.issuer}` : '';
    const accessibilityLabel = isBranding11 ? `${watermarkLabel} ${((_overlay$metaOverlay8 = overlay.metaOverlay) === null || _overlay$metaOverlay8 === void 0 ? void 0 : _overlay$metaOverlay8.name) ?? ''} ${t('Credentials.Credential')}${displayItems.length > 0 ? ',' : ''}` + displayItems.map(item => {
      const {
        label,
        value
      } = parseAttribute(item);
      if (label && value) {
        return ` ${label}, ${value}`;
      }
    }) + `, ${issuerAccessibilityLabel}` : `${issuerAccessibilityLabel}, ${((_overlay$metaOverlay9 = overlay.metaOverlay) === null || _overlay$metaOverlay9 === void 0 ? void 0 : _overlay$metaOverlay9.watermark) ?? ''} ${((_overlay$metaOverlay0 = overlay.metaOverlay) === null || _overlay$metaOverlay0 === void 0 ? void 0 : _overlay$metaOverlay0.name) ?? ''} ${t('Credentials.Credential')}.` + displayItems.map(item => {
      const {
        label,
        value
      } = parseAttribute(item);
      if (label) {
        return value ? ` ${label}, ${value}` : ` ${label}`;
      }
    });
    return /*#__PURE__*/React.createElement(View, {
      style: styles.cardContainer,
      accessible: true,
      accessibilityLabel: accessibilityLabel
    }, /*#__PURE__*/React.createElement(CredentialCardSecondaryBody, null), /*#__PURE__*/React.createElement(CredentialCard11Logo, {
      noLogoText: ((_overlay$metaOverlay1 = overlay.metaOverlay) === null || _overlay$metaOverlay1 === void 0 ? void 0 : _overlay$metaOverlay1.name) ?? ((_overlay$metaOverlay10 = overlay.metaOverlay) === null || _overlay$metaOverlay10 === void 0 ? void 0 : _overlay$metaOverlay10.issuer) ?? 'C',
      overlay: overlay,
      elevated: elevated
    }), /*#__PURE__*/React.createElement(CredentialCardPrimaryBody, null));
  };
  return overlay.bundle ? /*#__PURE__*/React.createElement(View, {
    style: [styles.container, style, {
      elevation: elevated ? 5 : 0,
      overflow: elevated ? 'visible' : 'hidden'
    }],
    onLayout: event => {
      setDimensions({
        cardHeight: event.nativeEvent.layout.height,
        cardWidth: event.nativeEvent.layout.width
      });
    }
  }, /*#__PURE__*/React.createElement(View, {
    testID: testIdWithKey('CredentialCard'),
    style: {
      overflow: 'hidden'
    }
  }, ((_overlay$metaOverlay11 = overlay.metaOverlay) === null || _overlay$metaOverlay11 === void 0 ? void 0 : _overlay$metaOverlay11.watermark) && /*#__PURE__*/React.createElement(CardWatermark, {
    width: dimensions.cardWidth,
    height: dimensions.cardHeight,
    style: {
      color: getCardWatermarkTextColor((_overlay$brandingOver3 = overlay.brandingOverlay) === null || _overlay$brandingOver3 === void 0 ? void 0 : _overlay$brandingOver3.primaryBackgroundColor)
    },
    watermark: (_overlay$metaOverlay12 = overlay.metaOverlay) === null || _overlay$metaOverlay12 === void 0 ? void 0 : _overlay$metaOverlay12.watermark
  }), /*#__PURE__*/React.createElement(CredentialCard, null))) : null;
};
export default VerifierCredentialCard;
//# sourceMappingURL=VerifierCredentialCard.js.map