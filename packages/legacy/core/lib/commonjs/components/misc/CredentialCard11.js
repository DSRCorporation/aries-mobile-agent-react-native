"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _legacy = require("@hyperledger/aries-oca/build/legacy");
var _native = require("@react-navigation/native");
var _lodash = _interopRequireDefault(require("lodash.startcase"));
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _containerApi = require("../../container-api");
var _theme = require("../../contexts/theme");
var _credential = require("../../utils/credential");
var _helpers = require("../../utils/helpers");
var _luminance = require("../../utils/luminance");
var _testable = require("../../utils/testable");
var _CardWatermark = _interopRequireDefault(require("./CardWatermark"));
var _CredentialCard11ActionFooter = _interopRequireDefault(require("./CredentialCard11ActionFooter"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
  A card is defined as a nx8 (height/rows x width/columns) grid.
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
  | 2 |   |   |   |   |   |   |   |
  | 3 |   |   |   |   |   |   |   |
  | 4 |   |   |   |   |   |   |   |
  ...

  The card width is the full screen width.

  Secondary Body (1):
  Primary Body   (2): Small Logo (1x1) -> L (shifted left by 50%)
                      Issuer Name (1x6)
                      Credential Name (1x6)
                      Primary Attribute 1 (1x6)
                      Primary Attribute 2 (1x6)
  Status         (3): Icon (1x1) -> S

   (1)            (2)           (3)
  | L | Issuer Name            | S |
  |   | Credential Name        |   |
  |   |                        |   |
  |   | Primary Attribute 1    |   |
  |   | Primary Attribute 2    |   |
  ...

  Note: The small logo MUST be provided as 1x1 (height/width) ratio.
 */

const CredentialCard11 = ({
  credential,
  style = {},
  displayItems,
  onPress = undefined,
  error = false,
  predicateError = false,
  elevated = false,
  credName,
  credDefId,
  schemaId,
  proof,
  hasAltCredentials,
  handleAltCredChange
}) => {
  var _overlay$presentation, _overlay$presentation2, _overlay$bundle, _overlay$bundle2, _overlay$brandingOver6, _overlay$brandingOver7, _overlay$brandingOver8, _overlay$metaOverlay10, _overlay$metaOverlay11;
  const {
    width
  } = (0, _reactNative.useWindowDimensions)();
  const borderRadius = 10;
  const padding = width * 0.05;
  const logoHeight = width * 0.12;
  const [dimensions, setDimensions] = (0, _react.useState)({
    cardWidth: 0,
    cardHeight: 0
  });
  const {
    i18n,
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPallet,
    TextTheme,
    ListItems
  } = (0, _theme.useTheme)();
  const [isRevoked, setIsRevoked] = (0, _react.useState)((credential === null || credential === void 0 ? void 0 : credential.revocationNotification) !== undefined);
  const [flaggedAttributes, setFlaggedAttributes] = (0, _react.useState)();
  const [allPI, setAllPI] = (0, _react.useState)();
  const credentialConnectionLabel = (0, _helpers.useCredentialConnectionLabel)(credential);
  const [isProofRevoked, setIsProofRevoked] = (0, _react.useState)((credential === null || credential === void 0 ? void 0 : credential.revocationNotification) !== undefined && !!proof);
  const [bundleResolver, credHelpActionOverrides] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_OCA_RESOLVER, _containerApi.TOKENS.CRED_HELP_ACTION_OVERRIDES]);
  const [helpAction, setHelpAction] = (0, _react.useState)();
  const [overlay, setOverlay] = (0, _react.useState)({});
  const primaryField = overlay === null || overlay === void 0 || (_overlay$presentation = overlay.presentationFields) === null || _overlay$presentation === void 0 ? void 0 : _overlay$presentation.find(field => {
    var _overlay$brandingOver;
    return field.name === (overlay === null || overlay === void 0 || (_overlay$brandingOver = overlay.brandingOverlay) === null || _overlay$brandingOver === void 0 ? void 0 : _overlay$brandingOver.primaryAttribute);
  });
  const secondaryField = overlay === null || overlay === void 0 || (_overlay$presentation2 = overlay.presentationFields) === null || _overlay$presentation2 === void 0 ? void 0 : _overlay$presentation2.find(field => {
    var _overlay$brandingOver2;
    return field.name === (overlay === null || overlay === void 0 || (_overlay$brandingOver2 = overlay.brandingOverlay) === null || _overlay$brandingOver2 === void 0 ? void 0 : _overlay$brandingOver2.secondaryAttribute);
  });
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
  const cardData = [...(displayItems ?? []), primaryField, secondaryField];
  const navigation = (0, _native.useNavigation)();
  const getSecondaryBackgroundColor = () => {
    if (proof) {
      var _overlay$brandingOver3;
      return (_overlay$brandingOver3 = overlay.brandingOverlay) === null || _overlay$brandingOver3 === void 0 ? void 0 : _overlay$brandingOver3.primaryBackgroundColor;
    } else {
      var _overlay$brandingOver4, _overlay$brandingOver5;
      return (_overlay$brandingOver4 = overlay.brandingOverlay) !== null && _overlay$brandingOver4 !== void 0 && _overlay$brandingOver4.backgroundImageSlice ? 'rgba(0, 0, 0, 0)' : (_overlay$brandingOver5 = overlay.brandingOverlay) === null || _overlay$brandingOver5 === void 0 ? void 0 : _overlay$brandingOver5.secondaryBackgroundColor;
    }
  };
  const styles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: (_overlay$brandingOver6 = overlay.brandingOverlay) === null || _overlay$brandingOver6 === void 0 ? void 0 : _overlay$brandingOver6.primaryBackgroundColor,
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
      backgroundColor: getSecondaryBackgroundColor() ?? ((_overlay$brandingOver7 = overlay.brandingOverlay) === null || _overlay$brandingOver7 === void 0 ? void 0 : _overlay$brandingOver7.primaryBackgroundColor)
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
      color: proof ? TextTheme.normal.color : (0, _credential.credentialTextColor)(ColorPallet, (_overlay$brandingOver8 = overlay.brandingOverlay) === null || _overlay$brandingOver8 === void 0 ? void 0 : _overlay$brandingOver8.primaryBackgroundColor),
      flexShrink: 1
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
      borderColor: ColorPallet.semantic.focus
    },
    seperator: {
      width: '100%',
      height: 2,
      marginVertical: 10,
      backgroundColor: ColorPallet.grayscale.lightGrey
    },
    credActionText: {
      fontSize: 20,
      fontWeight: TextTheme.bold.fontWeight,
      color: ColorPallet.brand.link
    }
  });
  const backgroundColorIfErrorState = backgroundColor => error || predicateError || isProofRevoked ? ColorPallet.notification.errorBorder : backgroundColor;
  const fontColorWithHighContrast = () => {
    var _overlay$brandingOver9;
    if (proof) {
      return ColorPallet.grayscale.mediumGrey;
    }
    const c = backgroundColorIfErrorState((_overlay$brandingOver9 = overlay.brandingOverlay) === null || _overlay$brandingOver9 === void 0 ? void 0 : _overlay$brandingOver9.primaryBackgroundColor) ?? ColorPallet.grayscale.lightGrey;
    const shade = (0, _luminance.shadeIsLightOrDark)(c);
    return shade == _luminance.Shade.Light ? ColorPallet.grayscale.darkGrey : ColorPallet.grayscale.lightGrey;
  };
  const parseAttribute = item => {
    var _parsedItem, _parsedItem2, _parsedItem3;
    let parsedItem = item;
    if (item && item.pValue != null) {
      parsedItem = (0, _helpers.pTypeToText)(item, t, attributeTypes);
    }
    const parsedValue = (0, _helpers.formatIfDate)(attributeFormats === null || attributeFormats === void 0 ? void 0 : attributeFormats[(item === null || item === void 0 ? void 0 : item.name) ?? ''], ((_parsedItem = parsedItem) === null || _parsedItem === void 0 ? void 0 : _parsedItem.value) ?? ((_parsedItem2 = parsedItem) === null || _parsedItem2 === void 0 ? void 0 : _parsedItem2.pValue) ?? null);
    return {
      label: (item === null || item === void 0 ? void 0 : item.label) ?? (item === null || item === void 0 ? void 0 : item.name) ?? '',
      value: (item === null || item === void 0 ? void 0 : item.value) !== undefined && (item === null || item === void 0 ? void 0 : item.value) != null ? parsedValue : `${(_parsedItem3 = parsedItem) === null || _parsedItem3 === void 0 ? void 0 : _parsedItem3.pType} ${parsedValue}`
    };
  };
  (0, _react.useEffect)(() => {
    setAllPI(credential && cardData.every(item => {
      if (item === undefined) {
        return true;
      } else if (item instanceof _legacy.Attribute) {
        const {
          label
        } = parseAttribute(item);
        return flaggedAttributes === null || flaggedAttributes === void 0 ? void 0 : flaggedAttributes.includes(label);
      } else {
        // Predicates are not PII
        return false;
      }
    }));
  }, [flaggedAttributes]);
  (0, _react.useEffect)(() => {
    const params = {
      identifiers: credential ? (0, _credential.getCredentialIdentifiers)(credential) : {
        schemaId,
        credentialDefinitionId: credDefId
      },
      attributes: proof ? [] : credential === null || credential === void 0 ? void 0 : credential.credentialAttributes,
      meta: {
        credName: credName,
        credConnectionId: credential === null || credential === void 0 ? void 0 : credential.connectionId,
        alias: credentialConnectionLabel
      },
      language: i18n.language
    };
    bundleResolver.resolveAllBundles(params).then(bundle => {
      if (proof) {
        var _Object$values;
        setFlaggedAttributes(bundle.bundle.bundle.flaggedAttributes.map(attr => attr.name));
        const credHelpUrl = bundle.bundle.bundle.metadata.credentialSupportUrl[params.language] ?? ((_Object$values = Object.values(bundle.bundle.bundle.metadata.credentialSupportUrl)) === null || _Object$values === void 0 ? void 0 : _Object$values[0]);

        // Check if there is a help action override for this credential
        const override = credHelpActionOverrides === null || credHelpActionOverrides === void 0 ? void 0 : credHelpActionOverrides.find(override => credDefId && override.credDefIds.includes(credDefId) || schemaId && override.schemaIds.includes(schemaId));
        if (override) {
          setHelpAction(() => () => {
            override.action(navigation);
          });
        } else if (credHelpUrl) {
          setHelpAction(() => () => {
            _reactNative.Linking.openURL(credHelpUrl);
          });
        }
      }
      setOverlay({
        ...overlay,
        ...bundle,
        brandingOverlay: bundle.brandingOverlay
      });
    });
  }, [credential, i18n.language]);
  (0, _react.useEffect)(() => {
    setIsRevoked((credential === null || credential === void 0 ? void 0 : credential.revocationNotification) !== undefined && !proof);
    setIsProofRevoked((credential === null || credential === void 0 ? void 0 : credential.revocationNotification) !== undefined && !!proof);
  }, [credential === null || credential === void 0 ? void 0 : credential.revocationNotification]);
  const CredentialCardLogo = () => {
    var _overlay$brandingOver10, _overlay$brandingOver11, _ref, _overlay$metaOverlay, _overlay$metaOverlay2;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.logoContainer, {
        elevation: elevated ? 5 : 0
      }]
    }, (_overlay$brandingOver10 = overlay.brandingOverlay) !== null && _overlay$brandingOver10 !== void 0 && _overlay$brandingOver10.logo ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: (0, _credential.toImageSource)((_overlay$brandingOver11 = overlay.brandingOverlay) === null || _overlay$brandingOver11 === void 0 ? void 0 : _overlay$brandingOver11.logo),
      style: {
        resizeMode: 'cover',
        width: logoHeight,
        height: logoHeight,
        borderRadius: 8
      }
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [TextTheme.bold, {
        fontSize: 0.5 * logoHeight,
        alignSelf: 'center',
        color: '#000'
      }]
    }, !predicateError && !error ? (_ref = ((_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.name) ?? ((_overlay$metaOverlay2 = overlay.metaOverlay) === null || _overlay$metaOverlay2 === void 0 ? void 0 : _overlay$metaOverlay2.issuer) ?? 'C') === null || _ref === void 0 ? void 0 : _ref.charAt(0).toUpperCase() : /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
      name: 'error',
      size: 30,
      style: styles.errorIcon
    })));
  };
  const AttributeLabel = ({
    label
  }) => {
    var _overlay$bundle3;
    const ylabel = ((_overlay$bundle3 = overlay.bundle) === null || _overlay$bundle3 === void 0 || (_overlay$bundle3 = _overlay$bundle3.labelOverlay) === null || _overlay$bundle3 === void 0 ? void 0 : _overlay$bundle3.attributeLabels[label]) ?? (0, _lodash.default)(label);
    return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [TextTheme.labelSubtitle, styles.textContainer, {
        lineHeight: 19,
        opacity: 0.8
      }],
      testID: (0, _testable.testIdWithKey)('AttributeName')
    }, ylabel);
  };
  const AttributeValue = ({
    value,
    warn
  }) => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (0, _helpers.isDataUrl)(value) ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      style: styles.imageAttr,
      source: {
        uri: value
      }
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [TextTheme.bold, styles.textContainer, {
        lineHeight: 24
      }, {
        color: warn ? ColorPallet.notification.warnText : styles.textContainer.color
      }],
      testID: (0, _testable.testIdWithKey)('AttributeValue')
    }, value));
  };
  const renderCardAttribute = item => {
    const {
      label,
      value
    } = parseAttribute(item);
    const parsedValue = (0, _helpers.formatIfDate)(item === null || item === void 0 ? void 0 : item.format, value) ?? '';
    return item && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        marginTop: 15
      }
    }, !(item !== null && item !== void 0 && item.value || item !== null && item !== void 0 && item.satisfied) ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center'
      }
    }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
      style: {
        paddingTop: 2,
        paddingHorizontal: 2
      },
      name: "close",
      color: ListItems.proofError.color,
      size: ListItems.recordAttributeText.fontSize
    }), /*#__PURE__*/_react.default.createElement(AttributeLabel, {
      label: label
    })) : /*#__PURE__*/_react.default.createElement(AttributeLabel, {
      label: label
    }), !(item !== null && item !== void 0 && item.value || item !== null && item !== void 0 && item.pValue) ? null : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center'
      }
    }, (flaggedAttributes === null || flaggedAttributes === void 0 ? void 0 : flaggedAttributes.includes(label)) && !item.pValue && !allPI && proof && /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
      style: {
        paddingTop: 2,
        paddingHorizontal: 2
      },
      name: "warning",
      color: ColorPallet.notification.warnIcon,
      size: ListItems.recordAttributeText.fontSize
    }), !error ? /*#__PURE__*/_react.default.createElement(AttributeValue, {
      warn: (flaggedAttributes === null || flaggedAttributes === void 0 ? void 0 : flaggedAttributes.includes(label)) && !item.pValue && proof,
      value: parsedValue
    }) : null), !error && (item === null || item === void 0 ? void 0 : item.satisfied) != undefined && (item === null || item === void 0 ? void 0 : item.satisfied) === false ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.errorText,
      numberOfLines: 1
    }, t('ProofRequest.PredicateNotSatisfied')) : null);
  };
  const CredentialCardPrimaryBody = () => {
    var _overlay$metaOverlay3, _overlay$metaOverlay4, _overlay$metaOverlay5;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      testID: (0, _testable.testIdWithKey)('CredentialCardPrimaryBody'),
      style: styles.primaryBodyContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, !(((_overlay$metaOverlay3 = overlay.metaOverlay) === null || _overlay$metaOverlay3 === void 0 ? void 0 : _overlay$metaOverlay3.issuer) === 'Unknown Contact' && proof) && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: 'row'
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      testID: (0, _testable.testIdWithKey)('CredentialIssuer'),
      style: [TextTheme.label, styles.textContainer, {
        lineHeight: 19,
        opacity: 0.8,
        flex: 1,
        flexWrap: 'wrap'
      }]
    }, (_overlay$metaOverlay4 = overlay.metaOverlay) === null || _overlay$metaOverlay4 === void 0 ? void 0 : _overlay$metaOverlay4.issuer)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: 'row'
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      testID: (0, _testable.testIdWithKey)('CredentialName'),
      style: [TextTheme.bold, styles.textContainer, {
        lineHeight: 24,
        flex: 1,
        flexWrap: 'wrap',
        color: allPI && proof ? ColorPallet.notification.warnText : styles.textContainer.color
      }]
    }, (_overlay$metaOverlay5 = overlay.metaOverlay) === null || _overlay$metaOverlay5 === void 0 ? void 0 : _overlay$metaOverlay5.name))), (error || isProofRevoked) && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center'
      }
    }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
      style: styles.errorIcon,
      name: "close",
      size: 30
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.errorText,
      testID: (0, _testable.testIdWithKey)('RevokedOrNotAvailable'),
      numberOfLines: 1
    }, error ? t('ProofRequest.NotAvailableInYourWallet') : t('CredentialDetails.Revoked'))), /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      data: cardData,
      scrollEnabled: false,
      initialNumToRender: cardData === null || cardData === void 0 ? void 0 : cardData.length,
      renderItem: ({
        item
      }) => {
        return renderCardAttribute(item);
      },
      ListFooterComponent: hasAltCredentials && handleAltCredChange ? /*#__PURE__*/_react.default.createElement(_CredentialCard11ActionFooter.default, {
        onPress: handleAltCredChange,
        text: t('ProofRequest.ChangeCredential'),
        testID: 'ChangeCredential'
      }) : error && helpAction ? /*#__PURE__*/_react.default.createElement(_CredentialCard11ActionFooter.default, {
        onPress: helpAction,
        text: t('ProofRequest.GetThisCredential'),
        testID: 'GetThisCredential'
      }) : null
    }));
  };
  const CredentialCardSecondaryBody = () => {
    var _overlay$brandingOver12, _overlay$brandingOver13;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      testID: (0, _testable.testIdWithKey)('CredentialCardSecondaryBody'),
      style: [styles.secondaryBodyContainer, {
        backgroundColor: backgroundColorIfErrorState(styles.secondaryBodyContainer.backgroundColor),
        overflow: 'hidden'
      }]
    }, (_overlay$brandingOver12 = overlay.brandingOverlay) !== null && _overlay$brandingOver12 !== void 0 && _overlay$brandingOver12.backgroundImageSlice && !displayItems ? /*#__PURE__*/_react.default.createElement(_reactNative.ImageBackground, {
      source: (0, _credential.toImageSource)((_overlay$brandingOver13 = overlay.brandingOverlay) === null || _overlay$brandingOver13 === void 0 ? void 0 : _overlay$brandingOver13.backgroundImageSlice),
      style: {
        flexGrow: 1
      },
      imageStyle: {
        borderTopLeftRadius: borderRadius,
        borderBottomLeftRadius: borderRadius
      }
    }) : !(error || predicateError || proof || getSecondaryBackgroundColor()) && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [{
        position: 'absolute',
        width: logoHeight,
        height: '100%',
        borderTopLeftRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
        backgroundColor: 'rgba(0,0,0,0.24)'
      }]
    }));
  };
  const CredentialCardStatus = ({
    status
  }) => {
    const Status = ({
      status
    }) => {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, status ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.statusContainer, {
          backgroundColor: status === 'error' ? ColorPallet.notification.error : ColorPallet.notification.warn
        }]
      }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
        size: 0.7 * logoHeight,
        style: {
          color: status === 'error' ? ColorPallet.semantic.error : ColorPallet.notification.warnIcon
        },
        name: status === 'error' ? 'error' : 'warning'
      })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.statusContainer
      }));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      testID: (0, _testable.testIdWithKey)('CredentialCardStatus'),
      style: [styles.statusContainer, {
        position: 'absolute',
        right: 0,
        top: 0
      }]
    }, /*#__PURE__*/_react.default.createElement(Status, {
      status: status
    }));
  };
  const CredentialCard = ({
    status
  }) => {
    var _overlay$metaOverlay6, _overlay$metaOverlay7, _overlay$metaOverlay8, _overlay$metaOverlay9;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.cardContainer,
      accessible: true,
      accessibilityLabel: `${(_overlay$metaOverlay6 = overlay.metaOverlay) !== null && _overlay$metaOverlay6 !== void 0 && _overlay$metaOverlay6.issuer ? `${t('Credentials.IssuedBy')} ${(_overlay$metaOverlay7 = overlay.metaOverlay) === null || _overlay$metaOverlay7 === void 0 ? void 0 : _overlay$metaOverlay7.issuer}` : ''}, ${((_overlay$metaOverlay8 = overlay.metaOverlay) === null || _overlay$metaOverlay8 === void 0 ? void 0 : _overlay$metaOverlay8.watermark) ?? ''} ${((_overlay$metaOverlay9 = overlay.metaOverlay) === null || _overlay$metaOverlay9 === void 0 ? void 0 : _overlay$metaOverlay9.name) ?? ''} ${t('Credentials.Credential')}.` + cardData.map(item => {
        const {
          label,
          value
        } = parseAttribute(item);
        if (label && value) {
          return ` ${label}, ${value}`;
        }
      })
    }, /*#__PURE__*/_react.default.createElement(CredentialCardSecondaryBody, null), /*#__PURE__*/_react.default.createElement(CredentialCardLogo, null), /*#__PURE__*/_react.default.createElement(CredentialCardPrimaryBody, null), /*#__PURE__*/_react.default.createElement(CredentialCardStatus, {
      status: status
    }));
  };
  return overlay.bundle ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
  }, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.TouchableOpacity, {
    accessible: false,
    accessibilityLabel: typeof onPress === 'undefined' ? undefined : t('Credentials.CredentialDetails'),
    disabled: typeof onPress === 'undefined' ? true : false,
    onPress: onPress,
    style: [styles.container, style, {
      backgroundColor: isProofRevoked ? ColorPallet.notification.error : style.backgroundColor
    }],
    testID: (0, _testable.testIdWithKey)('ShowCredentialDetails')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    testID: (0, _testable.testIdWithKey)('CredentialCard')
  }, ((_overlay$metaOverlay10 = overlay.metaOverlay) === null || _overlay$metaOverlay10 === void 0 ? void 0 : _overlay$metaOverlay10.watermark) && /*#__PURE__*/_react.default.createElement(_CardWatermark.default, {
    width: dimensions.cardWidth,
    height: dimensions.cardHeight,
    style: {
      color: fontColorWithHighContrast()
    },
    watermark: (_overlay$metaOverlay11 = overlay.metaOverlay) === null || _overlay$metaOverlay11 === void 0 ? void 0 : _overlay$metaOverlay11.watermark
  }), /*#__PURE__*/_react.default.createElement(CredentialCard, {
    status: isRevoked ? 'error' : allPI && proof ? 'warn' : undefined
  })))) : null;
};
var _default = exports.default = CredentialCard11;
//# sourceMappingURL=CredentialCard11.js.map