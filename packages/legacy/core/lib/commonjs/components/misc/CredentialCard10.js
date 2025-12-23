"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _containerApi = require("../../container-api");
var _theme = require("../../contexts/theme");
var _credential = require("../../utils/credential");
var _helpers = require("../../utils/helpers");
var _oca = require("../../utils/oca");
var _testable = require("../../utils/testable");
var _CardWatermark = _interopRequireDefault(require("./CardWatermark"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  } = (0, _reactNative.useWindowDimensions)();
  const cardHeight = width / 2; // a card height is half of the screen width
  const cardHeaderHeight = cardHeight / 4; // a card has a total of 4 rows, and the header occupy 1 row
  const {
    t,
    i18n
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const [overlay, setOverlay] = (0, _react.useState)({});
  const [isRevoked, setIsRevoked] = (0, _react.useState)(false);
  const credentialConnectionLabel = (0, _helpers.useCredentialConnectionLabel)(credential);
  const [bundleResolver] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_OCA_RESOLVER]);
  const styles = _reactNative.StyleSheet.create({
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
  (0, _react.useEffect)(() => {
    if (!(credential && (0, _credential.isValidAnonCredsCredential)(credential))) {
      return;
    }
    const params = {
      identifiers: (0, _credential.getCredentialIdentifiers)(credential),
      attributes: (0, _oca.buildFieldsFromAnonCredsCredential)(credential),
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
  (0, _react.useEffect)(() => {
    setIsRevoked(credential.revocationNotification !== undefined);
  }, [credential.revocationNotification]);
  const CredentialCardHeader = () => {
    var _overlay$brandingOver6, _overlay$brandingOver7, _overlay$brandingOver8, _overlay$brandingOver9, _overlay$brandingOver10, _overlay$brandingOver11, _overlay$brandingOver12, _overlay$brandingOver13, _overlay$metaOverlay, _overlay$brandingOver14, _overlay$brandingOver15, _overlay$brandingOver16, _overlay$metaOverlay2;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.outerHeaderContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      testID: (0, _testable.testIdWithKey)('CredentialCardHeader'),
      style: styles.innerHeaderContainer
    }, (overlay === null || overlay === void 0 || (_overlay$brandingOver6 = overlay.brandingOverlay) === null || _overlay$brandingOver6 === void 0 || (_overlay$brandingOver6 = _overlay$brandingOver6.header) === null || _overlay$brandingOver6 === void 0 ? void 0 : _overlay$brandingOver6.imageSource) && /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: (0, _credential.toImageSource)(overlay === null || overlay === void 0 || (_overlay$brandingOver7 = overlay.brandingOverlay) === null || _overlay$brandingOver7 === void 0 || (_overlay$brandingOver7 = _overlay$brandingOver7.header) === null || _overlay$brandingOver7 === void 0 ? void 0 : _overlay$brandingOver7.imageSource),
      style: {
        flex: !(overlay !== null && overlay !== void 0 && (_overlay$brandingOver8 = overlay.brandingOverlay) !== null && _overlay$brandingOver8 !== void 0 && (_overlay$brandingOver8 = _overlay$brandingOver8.header) !== null && _overlay$brandingOver8 !== void 0 && _overlay$brandingOver8.hideIssuer) ? 1 : 4,
        resizeMode: 'contain',
        maxHeight: styles.outerHeaderContainer.height - borderPadding
      }
    }), overlay !== null && overlay !== void 0 && (_overlay$brandingOver9 = overlay.brandingOverlay) !== null && _overlay$brandingOver9 !== void 0 && (_overlay$brandingOver9 = _overlay$brandingOver9.header) !== null && _overlay$brandingOver9 !== void 0 && _overlay$brandingOver9.hideIssuer ? null : /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      numberOfLines: 1,
      ellipsizeMode: "tail",
      style: [TextTheme.label, {
        color: (overlay === null || overlay === void 0 || (_overlay$brandingOver10 = overlay.brandingOverlay) === null || _overlay$brandingOver10 === void 0 || (_overlay$brandingOver10 = _overlay$brandingOver10.header) === null || _overlay$brandingOver10 === void 0 ? void 0 : _overlay$brandingOver10.color) ?? (0, _credential.credentialTextColor)(ColorPallet, (overlay === null || overlay === void 0 || (_overlay$brandingOver11 = overlay.brandingOverlay) === null || _overlay$brandingOver11 === void 0 || (_overlay$brandingOver11 = _overlay$brandingOver11.header) === null || _overlay$brandingOver11 === void 0 ? void 0 : _overlay$brandingOver11.backgroundColor) || (overlay === null || overlay === void 0 || (_overlay$brandingOver12 = overlay.brandingOverlay) === null || _overlay$brandingOver12 === void 0 ? void 0 : _overlay$brandingOver12.backgroundColor)),
        paddingHorizontal: 0.5 * paddingHorizontal,
        flex: !(overlay !== null && overlay !== void 0 && (_overlay$brandingOver13 = overlay.brandingOverlay) !== null && _overlay$brandingOver13 !== void 0 && (_overlay$brandingOver13 = _overlay$brandingOver13.header) !== null && _overlay$brandingOver13 !== void 0 && _overlay$brandingOver13.imageSource) ? 4 : 3,
        textAlignVertical: 'center'
      }],
      testID: (0, _testable.testIdWithKey)('CredentialIssuer'),
      maxFontSizeMultiplier: 1
    }, overlay === null || overlay === void 0 || (_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.issuer), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      numberOfLines: 1,
      ellipsizeMode: "tail",
      style: [TextTheme.label, {
        color: (overlay === null || overlay === void 0 || (_overlay$brandingOver14 = overlay.brandingOverlay) === null || _overlay$brandingOver14 === void 0 || (_overlay$brandingOver14 = _overlay$brandingOver14.header) === null || _overlay$brandingOver14 === void 0 ? void 0 : _overlay$brandingOver14.color) ?? (0, _credential.credentialTextColor)(ColorPallet, (overlay === null || overlay === void 0 || (_overlay$brandingOver15 = overlay.brandingOverlay) === null || _overlay$brandingOver15 === void 0 || (_overlay$brandingOver15 = _overlay$brandingOver15.header) === null || _overlay$brandingOver15 === void 0 ? void 0 : _overlay$brandingOver15.backgroundColor) || (overlay === null || overlay === void 0 || (_overlay$brandingOver16 = overlay.brandingOverlay) === null || _overlay$brandingOver16 === void 0 ? void 0 : _overlay$brandingOver16.backgroundColor)),
        textAlign: 'right',
        paddingHorizontal: 0.5 * paddingHorizontal,
        flex: 4,
        textAlignVertical: 'center'
      }],
      testID: (0, _testable.testIdWithKey)('CredentialName'),
      maxFontSizeMultiplier: 1
    }, overlay === null || overlay === void 0 || (_overlay$metaOverlay2 = overlay.metaOverlay) === null || _overlay$metaOverlay2 === void 0 ? void 0 : _overlay$metaOverlay2.name)));
  };
  const CredentialCardBody = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.bodyContainer,
      testID: (0, _testable.testIdWithKey)('CredentialCardBody')
    });
  };
  const CredentialCardFooter = ({
    revoked = false
  }) => {
    var _overlay$brandingOver17, _overlay$brandingOver18, _overlay$brandingOver19;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      testID: (0, _testable.testIdWithKey)('CredentialCardFooter'),
      style: styles.footerContainer
    }, revoked ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.revokedFooter
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [TextTheme.label, {
        color: ColorPallet.semantic.error
      }],
      testID: (0, _testable.testIdWithKey)('CredentialRevoked')
    }, t('CredentialDetails.Revoked'))) : /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [TextTheme.caption, {
        color: (overlay === null || overlay === void 0 || (_overlay$brandingOver17 = overlay.brandingOverlay) === null || _overlay$brandingOver17 === void 0 || (_overlay$brandingOver17 = _overlay$brandingOver17.footer) === null || _overlay$brandingOver17 === void 0 ? void 0 : _overlay$brandingOver17.color) ?? (0, _credential.credentialTextColor)(ColorPallet, (overlay === null || overlay === void 0 || (_overlay$brandingOver18 = overlay.brandingOverlay) === null || _overlay$brandingOver18 === void 0 || (_overlay$brandingOver18 = _overlay$brandingOver18.footer) === null || _overlay$brandingOver18 === void 0 ? void 0 : _overlay$brandingOver18.backgroundColor) || (overlay === null || overlay === void 0 || (_overlay$brandingOver19 = overlay.brandingOverlay) === null || _overlay$brandingOver19 === void 0 ? void 0 : _overlay$brandingOver19.backgroundColor))
      }],
      testID: (0, _testable.testIdWithKey)('CredentialIssued'),
      maxFontSizeMultiplier: 1
    }, t('CredentialDetails.Issued'), ": ", (0, _helpers.formatTime)(credential.createdAt, {
      shortMonth: true
    })));
  };
  const CredentialCard = ({
    revoked = false
  }) => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(CredentialCardHeader, null), /*#__PURE__*/_react.default.createElement(CredentialCardBody, null), /*#__PURE__*/_react.default.createElement(CredentialCardFooter, {
      revoked: revoked
    }));
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.TouchableOpacity, {
    accessible: true,
    accessibilityLabel: `${(_overlay$metaOverlay3 = overlay.metaOverlay) !== null && _overlay$metaOverlay3 !== void 0 && _overlay$metaOverlay3.issuer ? `${t('Credentials.IssuedBy')} ${(_overlay$metaOverlay4 = overlay.metaOverlay) === null || _overlay$metaOverlay4 === void 0 ? void 0 : _overlay$metaOverlay4.issuer}` : ''}, ${((_overlay$metaOverlay5 = overlay.metaOverlay) === null || _overlay$metaOverlay5 === void 0 ? void 0 : _overlay$metaOverlay5.watermark) ?? ''} ${((_overlay$metaOverlay6 = overlay.metaOverlay) === null || _overlay$metaOverlay6 === void 0 ? void 0 : _overlay$metaOverlay6.name) ?? ''} ${t('Credentials.Credential')}.`,
    disabled: typeof onPress === 'undefined' ? true : false,
    onPress: onPress,
    style: [styles.container, style],
    testID: (0, _testable.testIdWithKey)('ShowCredentialDetails')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.flexGrow, {
      overflow: 'hidden'
    }],
    testID: (0, _testable.testIdWithKey)('CredentialCard')
  }, overlay !== null && overlay !== void 0 && (_overlay$brandingOver20 = overlay.brandingOverlay) !== null && _overlay$brandingOver20 !== void 0 && _overlay$brandingOver20.imageSource ? /*#__PURE__*/_react.default.createElement(_reactNative.ImageBackground, {
    source: (0, _credential.toImageSource)(overlay === null || overlay === void 0 || (_overlay$brandingOver21 = overlay.brandingOverlay) === null || _overlay$brandingOver21 === void 0 ? void 0 : _overlay$brandingOver21.imageSource),
    style: styles.flexGrow,
    imageStyle: {
      borderRadius
    }
  }, ((_overlay$metaOverlay7 = overlay.metaOverlay) === null || _overlay$metaOverlay7 === void 0 ? void 0 : _overlay$metaOverlay7.watermark) && /*#__PURE__*/_react.default.createElement(_CardWatermark.default, {
    width: width,
    height: cardHeight,
    style: styles.watermark,
    watermark: (_overlay$metaOverlay8 = overlay.metaOverlay) === null || _overlay$metaOverlay8 === void 0 ? void 0 : _overlay$metaOverlay8.watermark
  }), /*#__PURE__*/_react.default.createElement(CredentialCard, {
    revoked: isRevoked
  })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, ((_overlay$metaOverlay9 = overlay.metaOverlay) === null || _overlay$metaOverlay9 === void 0 ? void 0 : _overlay$metaOverlay9.watermark) && /*#__PURE__*/_react.default.createElement(_CardWatermark.default, {
    width: width,
    height: cardHeight,
    style: styles.watermark,
    watermark: (_overlay$metaOverlay10 = overlay.metaOverlay) === null || _overlay$metaOverlay10 === void 0 ? void 0 : _overlay$metaOverlay10.watermark
  }), /*#__PURE__*/_react.default.createElement(CredentialCard, {
    revoked: isRevoked
  }))));
};
var _default = exports.default = CredentialCard10;
//# sourceMappingURL=CredentialCard10.js.map