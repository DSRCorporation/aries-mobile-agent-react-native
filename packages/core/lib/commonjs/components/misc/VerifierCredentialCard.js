"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _legacy = require("@bifold/oca/build/legacy");
var _lodash = _interopRequireDefault(require("lodash.startcase"));
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _ImageModal = _interopRequireDefault(require("../../components/modals/ImageModal"));
var _containerApi = require("../../container-api");
var _theme = require("../../contexts/theme");
var _credential = require("../../utils/credential");
var _helpers = require("../../utils/helpers");
var _testable = require("../../utils/testable");
var _CardWatermark = _interopRequireDefault(require("./CardWatermark"));
var _CredentialCard11Logo = _interopRequireDefault(require("./CredentialCard11Logo"));
var _credentialCardStyles = _interopRequireDefault(require("../../hooks/credential-card-styles"));
var _luminance = require("../../utils/luminance");
var _CredentialCard11Issuer = _interopRequireDefault(require("./CredentialCard11Issuer"));
var _ThemedText = require("../texts/ThemedText");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
  brandingOverlayType = _legacy.BrandingOverlayType.Branding10
}) => {
  var _overlay$bundle, _overlay$metaOverlay11, _overlay$brandingOver3, _overlay$metaOverlay12;
  const [dimensions, setDimensions] = (0, _react.useState)({
    cardWidth: 0,
    cardHeight: 0
  });
  const {
    i18n,
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette,
    TextTheme
  } = (0, _theme.useTheme)();
  const [bundleResolver] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_OCA_RESOLVER]);
  const [overlay, setOverlay] = (0, _react.useState)({});
  const isBranding10 = brandingOverlayType === _legacy.BrandingOverlayType.Branding10;
  const isBranding11 = brandingOverlayType === _legacy.BrandingOverlayType.Branding11;
  const {
    styles,
    borderRadius
  } = (0, _credentialCardStyles.default)(overlay, brandingOverlayType, isBranding10);
  const attributeTypes = (_overlay$bundle = overlay.bundle) === null || _overlay$bundle === void 0 ? void 0 : _overlay$bundle.captureBase.attributes;
  const attributeFormats = _react.default.useMemo(() => (0, _helpers.getAttributeFormats)(overlay.bundle), [overlay.bundle]);
  const getCardWatermarkTextColor = background => {
    if (isBranding10) return ColorPalette.grayscale.mediumGrey;
    const shade = (0, _luminance.shadeIsLightOrDark)(background ?? ColorPalette.grayscale.lightGrey);
    return shade == _luminance.Shade.Light ? ColorPalette.grayscale.darkGrey : ColorPalette.grayscale.lightGrey;
  };
  const parseAttribute = item => {
    var _parsedItem, _parsedItem2, _parsedItem3;
    let parsedItem = item;
    if (item && !item.value) {
      parsedItem = (0, _helpers.pTypeToText)(item, t, attributeTypes);
    }
    const parsedValue = (0, _helpers.formatIfDate)(attributeFormats === null || attributeFormats === void 0 ? void 0 : attributeFormats[(item === null || item === void 0 ? void 0 : item.name) ?? ''], ((_parsedItem = parsedItem) === null || _parsedItem === void 0 ? void 0 : _parsedItem.value) ?? ((_parsedItem2 = parsedItem) === null || _parsedItem2 === void 0 ? void 0 : _parsedItem2.pValue) ?? null);
    return {
      label: (item === null || item === void 0 ? void 0 : item.label) ?? (item === null || item === void 0 ? void 0 : item.name) ?? '',
      value: item !== null && item !== void 0 && item.value ? parsedValue : `${(_parsedItem3 = parsedItem) === null || _parsedItem3 === void 0 ? void 0 : _parsedItem3.pType} ${parsedValue}`
    };
  };
  (0, _react.useEffect)(() => {
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
    const ylabel = ((_overlay$bundle2 = overlay.bundle) === null || _overlay$bundle2 === void 0 || (_overlay$bundle2 = _overlay$bundle2.labelOverlay) === null || _overlay$bundle2 === void 0 ? void 0 : _overlay$bundle2.attributeLabels[label]) ?? (0, _lodash.default)(label);
    const [value, setValue] = (0, _react.useState)(item.value);
    const [showImageModal, setShowImageModal] = (0, _react.useState)(false);
    (0, _react.useEffect)(() => {
      setValue(v => (0, _helpers.formatIfDate)(item.format, v));
    }, [item.format]);
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "labelSubtitle",
      style: [styles.textContainer, {
        lineHeight: 19,
        opacity: 0.8
      }],
      testID: (0, _testable.testIdWithKey)('AttributeName')
    }, ylabel), value && /*#__PURE__*/_react.default.createElement(_reactNative.View, null, (0, _helpers.isDataUrl)(value) ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      accessibilityLabel: t('Record.Zoom'),
      accessibilityRole: "imagebutton",
      testID: (0, _testable.testIdWithKey)('zoom'),
      onPress: () => setShowImageModal(true)
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      style: styles.imageAttr,
      source: {
        uri: value
      }
    })) : /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "bold",
      style: styles.textContainer,
      testID: (0, _testable.testIdWithKey)('AttributeValue')
    }, value)), showImageModal && /*#__PURE__*/_react.default.createElement(_ImageModal.default, {
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
    } = (0, _theme.useTheme)();
    const label = item.label || item.name;
    const ylabel = ((_overlay$bundle3 = overlay.bundle) === null || _overlay$bundle3 === void 0 || (_overlay$bundle3 = _overlay$bundle3.labelOverlay) === null || _overlay$bundle3 === void 0 ? void 0 : _overlay$bundle3.attributeLabels[label]) ?? (0, _lodash.default)(label);
    const [currentValue, setCurrentValue] = (0, _react.useState)(`${item.pValue ?? ''}`);
    const predicateStyles = _reactNative.StyleSheet.create({
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
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "labelSubtitle",
      style: [styles.textContainer, predicateStyles.predicateLabel],
      testID: (0, _testable.testIdWithKey)('PredicateName')
    }, ylabel), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end'
      }
    }, item.satisfied && !preview ? /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
      style: {
        marginRight: 5
      },
      size: 24,
      name: 'check-circle',
      color: ColorPalette.semantic.success
    }) : null, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "bold",
      style: [styles.textContainer, predicateStyles.predicateType]
    }, item.pType), item.parameterizable && preview && onChangeValue ? /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
      keyboardType: "numeric",
      style: [TextTheme.bold, predicateStyles.input],
      onChangeText: value => setCurrentValue(value),
      onBlur: () => {
        onChangeValue(schemaId, item.label || item.name || '', item.name || '', currentValue);
      },
      testID: (0, _testable.testIdWithKey)('PredicateInput')
    }, currentValue) : /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "bold",
      style: styles.textContainer,
      testID: (0, _testable.testIdWithKey)('PredicateValue')
    }, item.pValue)));
  };
  const CardAttribute = ({
    item
  }) => {
    item.format = attributeFormats === null || attributeFormats === void 0 ? void 0 : attributeFormats[item.name ?? ''];
    let parsedPredicate = undefined;
    if (item instanceof _legacy.Predicate) {
      parsedPredicate = (0, _helpers.pTypeToText)(item, t, attributeTypes);
      if (!parsedPredicate.parameterizable) {
        parsedPredicate.pValue = (0, _helpers.formatIfDate)(parsedPredicate.format, parsedPredicate.pValue);
      }
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.cardAttributeContainer
    }, item instanceof _legacy.Attribute && /*#__PURE__*/_react.default.createElement(AttributeItem, {
      item: item
    }), item instanceof _legacy.Predicate && /*#__PURE__*/_react.default.createElement(PredicateItem, {
      item: parsedPredicate
    }));
  };
  const renderCardAttribute = item => {
    return /*#__PURE__*/_react.default.createElement(CardAttribute, {
      item: item
    });
  };
  const CredentialCardPrimaryBody = () => {
    var _overlay$metaOverlay, _overlay$metaOverlay2, _overlay$metaOverlay3;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      testID: (0, _testable.testIdWithKey)('CredentialCardPrimaryBody'),
      style: styles.primaryBodyContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, isBranding10 && /*#__PURE__*/_react.default.createElement(_CredentialCard11Issuer.default, {
      overlay: overlay,
      overlayType: brandingOverlayType,
      hasBody: ((_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.issuer) !== 'Unknown Contact',
      proof: true
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.primaryBodyNameContainer
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "bold",
      testID: (0, _testable.testIdWithKey)('CredentialName'),
      style: [styles.textContainer, styles.credentialName]
    }, (_overlay$metaOverlay2 = overlay.metaOverlay) === null || _overlay$metaOverlay2 === void 0 ? void 0 : _overlay$metaOverlay2.name))), /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
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
    }), brandingOverlayType === _legacy.BrandingOverlayType.Branding11 && /*#__PURE__*/_react.default.createElement(_CredentialCard11Issuer.default, {
      overlay: overlay,
      overlayType: brandingOverlayType,
      hasBody: ((_overlay$metaOverlay3 = overlay.metaOverlay) === null || _overlay$metaOverlay3 === void 0 ? void 0 : _overlay$metaOverlay3.issuer) !== 'Unknown Contact'
    }));
  };
  const CredentialCardSecondaryBody = () => {
    var _overlay$brandingOver, _overlay$brandingOver2;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      testID: (0, _testable.testIdWithKey)('CredentialCardSecondaryBody'),
      style: styles.secondaryBodyContainer
    }, (_overlay$brandingOver = overlay.brandingOverlay) !== null && _overlay$brandingOver !== void 0 && _overlay$brandingOver.backgroundImageSlice && (!displayItems || brandingOverlayType === _legacy.BrandingOverlayType.Branding11) ? /*#__PURE__*/_react.default.createElement(_reactNative.ImageBackground, {
      source: (0, _credential.toImageSource)((_overlay$brandingOver2 = overlay.brandingOverlay) === null || _overlay$brandingOver2 === void 0 ? void 0 : _overlay$brandingOver2.backgroundImageSlice),
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
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.cardContainer,
      accessible: true,
      accessibilityLabel: accessibilityLabel
    }, /*#__PURE__*/_react.default.createElement(CredentialCardSecondaryBody, null), /*#__PURE__*/_react.default.createElement(_CredentialCard11Logo.default, {
      noLogoText: ((_overlay$metaOverlay1 = overlay.metaOverlay) === null || _overlay$metaOverlay1 === void 0 ? void 0 : _overlay$metaOverlay1.name) ?? ((_overlay$metaOverlay10 = overlay.metaOverlay) === null || _overlay$metaOverlay10 === void 0 ? void 0 : _overlay$metaOverlay10.issuer) ?? 'C',
      overlay: overlay,
      elevated: elevated
    }), /*#__PURE__*/_react.default.createElement(CredentialCardPrimaryBody, null));
  };
  return overlay.bundle ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    testID: (0, _testable.testIdWithKey)('CredentialCard'),
    style: {
      overflow: 'hidden'
    }
  }, ((_overlay$metaOverlay11 = overlay.metaOverlay) === null || _overlay$metaOverlay11 === void 0 ? void 0 : _overlay$metaOverlay11.watermark) && /*#__PURE__*/_react.default.createElement(_CardWatermark.default, {
    width: dimensions.cardWidth,
    height: dimensions.cardHeight,
    style: {
      color: getCardWatermarkTextColor((_overlay$brandingOver3 = overlay.brandingOverlay) === null || _overlay$brandingOver3 === void 0 ? void 0 : _overlay$brandingOver3.primaryBackgroundColor)
    },
    watermark: (_overlay$metaOverlay12 = overlay.metaOverlay) === null || _overlay$metaOverlay12 === void 0 ? void 0 : _overlay$metaOverlay12.watermark
  }), /*#__PURE__*/_react.default.createElement(CredentialCard, null))) : null;
};
var _default = exports.default = VerifierCredentialCard;
//# sourceMappingURL=VerifierCredentialCard.js.map