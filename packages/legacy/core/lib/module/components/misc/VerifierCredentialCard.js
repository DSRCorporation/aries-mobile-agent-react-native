import { Attribute, Predicate } from '@hyperledger/aries-oca/build/legacy';
import startCase from 'lodash.startcase';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions, FlatList, Image, ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImageModal from '../../components/modals/ImageModal';
import { TOKENS, useServices } from '../../container-api';
import { useTheme } from '../../contexts/theme';
import { toImageSource } from '../../utils/credential';
import { formatIfDate, isDataUrl, pTypeToText } from '../../utils/helpers';
import { testIdWithKey } from '../../utils/testable';
import CardWatermark from './CardWatermark';
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
  onChangeValue
}) => {
  var _overlay$bundle, _overlay$bundle2, _overlay$brandingOver, _overlay$brandingOver2, _overlay$metaOverlay10, _overlay$metaOverlay11;
  const {
    width
  } = useWindowDimensions();
  const borderRadius = 10;
  const padding = width * 0.05;
  const logoHeight = width * 0.12;
  const [dimensions, setDimensions] = useState({
    cardWidth: 0,
    cardHeight: 0
  });
  const {
    i18n,
    t
  } = useTranslation();
  const {
    ColorPallet,
    TextTheme
  } = useTheme();
  const [bundleResolver] = useServices([TOKENS.UTIL_OCA_RESOLVER]);
  const [overlay, setOverlay] = useState({});
  const attributeTypes = (_overlay$bundle = overlay.bundle) === null || _overlay$bundle === void 0 ? void 0 : _overlay$bundle.captureBase.attributes;
  const attributeFormats = (_overlay$bundle2 = overlay.bundle) === null || _overlay$bundle2 === void 0 ? void 0 : _overlay$bundle2.bundle.attributes.map(attr => {
    return {
      name: attr.name,
      format: attr.format
    };
  }).reduce((prev, curr) => {
    return {
      ...prev,
      [curr.name]: curr.format
    };
  }, {});
  const styles = StyleSheet.create({
    container: {
      backgroundColor: (_overlay$brandingOver = overlay.brandingOverlay) === null || _overlay$brandingOver === void 0 ? void 0 : _overlay$brandingOver.primaryBackgroundColor,
      borderRadius: borderRadius
    },
    cardContainer: {
      flexDirection: 'row',
      minHeight: 0.33 * width
    },
    secondaryBodyContainer: {
      width: logoHeight,
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
      backgroundColor: (_overlay$brandingOver2 = overlay.brandingOverlay) === null || _overlay$brandingOver2 === void 0 ? void 0 : _overlay$brandingOver2.primaryBackgroundColor
    },
    primaryBodyContainer: {
      flex: 1,
      padding,
      marginLeft: -1 * logoHeight + padding
    },
    imageAttr: {
      height: 150,
      aspectRatio: 1,
      resizeMode: 'contain',
      borderRadius: 10
    },
    logoContainer: {
      top: padding,
      left: -1 * logoHeight + padding,
      width: logoHeight,
      height: logoHeight,
      backgroundColor: '#ffffff',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 1
      },
      shadowOpacity: 0.3
    },
    textContainer: {
      color: TextTheme.normal.color,
      flexShrink: 1
    }
  });
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
      setOverlay({
        ...overlay,
        ...bundle,
        brandingOverlay: bundle.brandingOverlay
      });
    });
  }, [credDefId, schemaId]);
  const CredentialCardLogo = () => {
    var _overlay$brandingOver3, _overlay$brandingOver4, _ref, _overlay$metaOverlay, _overlay$metaOverlay2;
    return /*#__PURE__*/React.createElement(View, {
      style: [styles.logoContainer, {
        elevation: elevated ? 5 : 0
      }]
    }, (_overlay$brandingOver3 = overlay.brandingOverlay) !== null && _overlay$brandingOver3 !== void 0 && _overlay$brandingOver3.logo ? /*#__PURE__*/React.createElement(Image, {
      source: toImageSource((_overlay$brandingOver4 = overlay.brandingOverlay) === null || _overlay$brandingOver4 === void 0 ? void 0 : _overlay$brandingOver4.logo),
      style: {
        resizeMode: 'cover',
        width: logoHeight,
        height: logoHeight,
        borderRadius: 8
      }
    }) : /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.bold, {
        fontSize: 0.5 * logoHeight,
        alignSelf: 'center',
        color: '#000'
      }]
    }, (_ref = ((_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.name) ?? ((_overlay$metaOverlay2 = overlay.metaOverlay) === null || _overlay$metaOverlay2 === void 0 ? void 0 : _overlay$metaOverlay2.issuer) ?? 'C') === null || _ref === void 0 ? void 0 : _ref.charAt(0).toUpperCase()));
  };
  const AttributeItem = ({
    item
  }) => {
    var _overlay$bundle3;
    const label = item.name || item.label;
    const ylabel = ((_overlay$bundle3 = overlay.bundle) === null || _overlay$bundle3 === void 0 || (_overlay$bundle3 = _overlay$bundle3.labelOverlay) === null || _overlay$bundle3 === void 0 ? void 0 : _overlay$bundle3.attributeLabels[label]) ?? startCase(label);
    const [value, setValue] = useState(item.value);
    const [showImageModal, setShowImageModal] = useState(false);
    useEffect(() => {
      setValue(formatIfDate(item.format, value));
    }, []);
    return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.labelSubtitle, styles.textContainer, {
        lineHeight: 19,
        opacity: 0.8
      }],
      testID: testIdWithKey('AttributeName')
    }, ylabel), value && /*#__PURE__*/React.createElement(View, null, isDataUrl(value) ? /*#__PURE__*/React.createElement(TouchableOpacity, {
      accessibilityLabel: t('Record.Zoom'),
      testID: testIdWithKey('zoom'),
      onPress: () => setShowImageModal(true)
    }, /*#__PURE__*/React.createElement(Image, {
      style: styles.imageAttr,
      source: {
        uri: value
      }
    })) : /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.bold, styles.textContainer],
      testID: testIdWithKey('AttributeValue')
    }, value)), showImageModal && /*#__PURE__*/React.createElement(ImageModal, {
      uri: value,
      onDismissPressed: () => setShowImageModal(false)
    }));
  };
  const PredicateItem = ({
    item
  }) => {
    var _overlay$bundle4;
    const {
      ColorPallet
    } = useTheme();
    const label = item.label || item.name;
    const ylabel = ((_overlay$bundle4 = overlay.bundle) === null || _overlay$bundle4 === void 0 || (_overlay$bundle4 = _overlay$bundle4.labelOverlay) === null || _overlay$bundle4 === void 0 ? void 0 : _overlay$bundle4.attributeLabels[label]) ?? startCase(label);
    const [currentValue, setCurrentValue] = useState(`${item.pValue ?? ''}`);
    const predicateStyles = StyleSheet.create({
      input: {
        textAlign: 'center',
        textAlignVertical: 'bottom',
        borderBottomColor: ColorPallet.grayscale.black,
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
        lineHeight: 19,
        marginRight: 5
      }
    });
    return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.labelSubtitle, styles.textContainer, predicateStyles.predicateLabel],
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
      color: ColorPallet.semantic.success
    }) : null, /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.bold, styles.textContainer, predicateStyles.predicateType]
    }, item.pType), item.parameterizable && preview && onChangeValue ? /*#__PURE__*/React.createElement(TextInput, {
      keyboardType: "numeric",
      style: [TextTheme.bold, predicateStyles.input],
      onChangeText: value => setCurrentValue(value),
      onBlur: () => {
        onChangeValue(schemaId, item.label || item.name || '', item.name || '', currentValue);
      },
      testID: testIdWithKey('PredicateInput')
    }, currentValue) : /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.bold, styles.textContainer],
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
      style: {
        marginTop: 15
      }
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
    var _overlay$metaOverlay3, _overlay$metaOverlay4, _overlay$metaOverlay5;
    return /*#__PURE__*/React.createElement(View, {
      testID: testIdWithKey('CredentialCardPrimaryBody'),
      style: styles.primaryBodyContainer
    }, /*#__PURE__*/React.createElement(View, null, !(((_overlay$metaOverlay3 = overlay.metaOverlay) === null || _overlay$metaOverlay3 === void 0 ? void 0 : _overlay$metaOverlay3.issuer) === 'Unknown Contact') && /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row'
      }
    }, /*#__PURE__*/React.createElement(Text, {
      testID: testIdWithKey('CredentialIssuer'),
      style: [TextTheme.label, styles.textContainer, {
        lineHeight: 19,
        opacity: 0.8,
        flex: 1,
        flexWrap: 'wrap'
      }]
    }, (_overlay$metaOverlay4 = overlay.metaOverlay) === null || _overlay$metaOverlay4 === void 0 ? void 0 : _overlay$metaOverlay4.issuer)), /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row'
      }
    }, /*#__PURE__*/React.createElement(Text, {
      testID: testIdWithKey('CredentialName'),
      style: [TextTheme.bold, styles.textContainer, {
        lineHeight: 24,
        flex: 1,
        flexWrap: 'wrap',
        color: styles.textContainer.color
      }]
    }, (_overlay$metaOverlay5 = overlay.metaOverlay) === null || _overlay$metaOverlay5 === void 0 ? void 0 : _overlay$metaOverlay5.name))), /*#__PURE__*/React.createElement(FlatList, {
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
    }));
  };
  const CredentialCardSecondaryBody = () => {
    var _overlay$brandingOver5, _overlay$brandingOver6;
    return /*#__PURE__*/React.createElement(View, {
      testID: testIdWithKey('CredentialCardSecondaryBody'),
      style: styles.secondaryBodyContainer
    }, (_overlay$brandingOver5 = overlay.brandingOverlay) !== null && _overlay$brandingOver5 !== void 0 && _overlay$brandingOver5.backgroundImageSlice && !displayItems ? /*#__PURE__*/React.createElement(ImageBackground, {
      source: toImageSource((_overlay$brandingOver6 = overlay.brandingOverlay) === null || _overlay$brandingOver6 === void 0 ? void 0 : _overlay$brandingOver6.backgroundImageSlice),
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
    var _overlay$metaOverlay6, _overlay$metaOverlay7, _overlay$metaOverlay8, _overlay$metaOverlay9;
    return /*#__PURE__*/React.createElement(View, {
      style: styles.cardContainer,
      accessible: true,
      accessibilityLabel: `${(_overlay$metaOverlay6 = overlay.metaOverlay) !== null && _overlay$metaOverlay6 !== void 0 && _overlay$metaOverlay6.issuer ? `${t('Credentials.IssuedBy')} ${(_overlay$metaOverlay7 = overlay.metaOverlay) === null || _overlay$metaOverlay7 === void 0 ? void 0 : _overlay$metaOverlay7.issuer}` : ''}, ${((_overlay$metaOverlay8 = overlay.metaOverlay) === null || _overlay$metaOverlay8 === void 0 ? void 0 : _overlay$metaOverlay8.watermark) ?? ''} ${((_overlay$metaOverlay9 = overlay.metaOverlay) === null || _overlay$metaOverlay9 === void 0 ? void 0 : _overlay$metaOverlay9.name) ?? ''} ${t('Credentials.Credential')}.` + displayItems.map(item => {
        const {
          label,
          value
        } = parseAttribute(item);
        if (label) {
          return value ? ` ${label}, ${value}` : ` ${label}`;
        }
      })
    }, /*#__PURE__*/React.createElement(CredentialCardSecondaryBody, null), /*#__PURE__*/React.createElement(CredentialCardLogo, null), /*#__PURE__*/React.createElement(CredentialCardPrimaryBody, null));
  };
  return overlay.bundle ? /*#__PURE__*/React.createElement(View, {
    style: [styles.container, style, {
      elevation: elevated ? 5 : 0,
      overflow: 'hidden'
    }],
    onLayout: event => {
      setDimensions({
        cardHeight: event.nativeEvent.layout.height,
        cardWidth: event.nativeEvent.layout.width
      });
    }
  }, /*#__PURE__*/React.createElement(View, {
    testID: testIdWithKey('CredentialCard')
  }, ((_overlay$metaOverlay10 = overlay.metaOverlay) === null || _overlay$metaOverlay10 === void 0 ? void 0 : _overlay$metaOverlay10.watermark) && /*#__PURE__*/React.createElement(CardWatermark, {
    width: dimensions.cardWidth,
    height: dimensions.cardHeight,
    style: {
      color: ColorPallet.grayscale.mediumGrey
    },
    watermark: (_overlay$metaOverlay11 = overlay.metaOverlay) === null || _overlay$metaOverlay11 === void 0 ? void 0 : _overlay$metaOverlay11.watermark
  }), /*#__PURE__*/React.createElement(CredentialCard, null))) : null;
};
export default VerifierCredentialCard;
//# sourceMappingURL=VerifierCredentialCard.js.map