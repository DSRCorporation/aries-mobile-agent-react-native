"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _testable = require("../../../utils/testable");
var _credential = require("../../../utils/credential");
var _theme = require("../../../contexts/theme");
var _reactNativeSvg = require("react-native-svg");
var _display = require("../display");
var _error = require("../../../types/error");
var _constants = require("../../../constants");
var _oca = require("../../../utils/oca");
var _useCredentialErrorsFromRegistry = require("../hooks/useCredentialErrorsFromRegistry");
var _credentials = require("../../../types/credentials");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
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
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.badgeWrap,
    testID: (0, _testable.testIdWithKey)('CredentialInvalidBadge')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
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
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette,
    TextTheme
  } = (0, _theme.useTheme)();
  const computedErrors = (0, _useCredentialErrorsFromRegistry.useCredentialErrorsFromRegistry)(credentialRecord, []);
  const isInvalid = (0, _react.useMemo)(() => {
    return computedErrors.includes(_credentials.CredentialErrors.Revoked);
  }, [computedErrors]);
  const display = (0, _react.useMemo)(() => {
    if (credentialDisplay) return credentialDisplay.display;
    if (!credentialRecord) {
      const error = new _error.BifoldError(t('Error.Title1047'), t('Error.Message1047'), 'Error[Logical] credentialDisplay and credentialRecord are undefined', 1047);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
      return;
    }
    const result = (0, _display.getCredentialForDisplay)(credentialRecord);
    return result.display;
  }, [credentialDisplay, credentialRecord, t]);
  const overlayAttributeField = (0, _react.useMemo)(() => {
    var _getAttributeField;
    if (!(display !== null && display !== void 0 && display.primary_overlay_attribute) || !credentialDisplay) return undefined;
    return (_getAttributeField = (0, _oca.getAttributeField)(credentialDisplay, display.primary_overlay_attribute)) === null || _getAttributeField === void 0 ? void 0 : _getAttributeField.field;
  }, [display, credentialDisplay]);
  const {
    width
  } = (0, _reactNative.useWindowDimensions)();
  const cardHeight = width * 0.55; // a card height is half of the screen width
  const cardHeaderHeight = cardHeight / 4; // a card has a total of 4 rows, and the header occupy 1 row

  const styles = _reactNative.StyleSheet.create({
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
      color: (display === null || display === void 0 ? void 0 : display.textColor) ?? (0, _credential.credentialTextColor)(ColorPalette, display === null || display === void 0 ? void 0 : display.backgroundColor),
      textAlignVertical: 'center',
      marginBottom: 8
    },
    titleFontCredentialDescription: {
      ...TextTheme.label,
      color: (display === null || display === void 0 ? void 0 : display.textColor) ?? (0, _credential.credentialTextColor)(ColorPalette, display === null || display === void 0 ? void 0 : display.backgroundColor),
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
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
    }
    if (typeof src === 'string' && src.endsWith('.svg')) return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.SvgUri, {
      role: "img",
      width: width,
      height: height,
      uri: src,
      "aria-label": logo.altText
    });
    return /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: (0, _credential.toImageSource)(src),
      style: {
        flex: 4,
        resizeMode: 'contain',
        width: width,
        height: height
      }
    });
  };
  const CardHeader = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.outerHeaderContainer]
    }, /*#__PURE__*/_react.default.createElement(InvalidBadge, {
      isInvalid: isInvalid
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      testID: (0, _testable.testIdWithKey)('CredentialCardHeader'),
      style: [styles.innerHeaderContainer]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.innerHeaderContainerCredLogo
    }, logoContaineter(display === null || display === void 0 ? void 0 : display.logo)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.innerHeaderCredInfoContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      numberOfLines: 1,
      ellipsizeMode: "tail",
      style: styles.titleFontCredentialName,
      testID: (0, _testable.testIdWithKey)('CredentialIssuer'),
      maxFontSizeMultiplier: 1
    }, display === null || display === void 0 ? void 0 : display.name)), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      numberOfLines: 1,
      ellipsizeMode: "tail",
      style: styles.titleFontCredentialDescription,
      testID: (0, _testable.testIdWithKey)('CredentialName'),
      maxFontSizeMultiplier: 1
    }, display === null || display === void 0 ? void 0 : display.description)))));
  };
  const CardBody = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.bodyContainer,
      testID: (0, _testable.testIdWithKey)('CredentialCardBody')
    });
  };
  const CardFooter = () => {
    if (!overlayAttributeField) return null;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      testID: (0, _testable.testIdWithKey)('CredentialCardFooter'),
      style: styles.footerContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [TextTheme.caption, {
        color: (display === null || display === void 0 ? void 0 : display.textColor) ?? (0, _credential.credentialTextColor)(ColorPalette, display === null || display === void 0 ? void 0 : display.backgroundColor)
      }],
      testID: (0, _testable.testIdWithKey)('CredentialIssued'),
      maxFontSizeMultiplier: 1
    }, overlayAttributeField.label ?? overlayAttributeField.name, ": ", overlayAttributeField.value));
  };
  const CredentialCard = () => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(CardHeader, null), /*#__PURE__*/_react.default.createElement(CardBody, null), /*#__PURE__*/_react.default.createElement(CardFooter, null));
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessible: true,
    accessibilityLabel: `${display !== null && display !== void 0 && display.issuer.name ? `${t('Credentials.IssuedBy')} ${display === null || display === void 0 ? void 0 : display.issuer.name}` : ''}, ${t('Credentials.Credential')}.`,
    accessibilityRole: "button",
    disabled: typeof onPress === 'undefined' ? true : false,
    onPress: onPress,
    style: [styles.cardContainer, style],
    testID: (0, _testable.testIdWithKey)('ShowCredentialDetails')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.flexGrow, {
      overflow: 'hidden'
    }],
    testID: (0, _testable.testIdWithKey)('CredentialCard')
  }, display !== null && display !== void 0 && display.backgroundImage ? /*#__PURE__*/_react.default.createElement(_reactNative.ImageBackground, {
    source: (0, _credential.toImageSource)(display.backgroundImage.uri),
    style: styles.flexGrow,
    imageStyle: {
      borderRadius
    }
  }, /*#__PURE__*/_react.default.createElement(CredentialCard, null)) : /*#__PURE__*/_react.default.createElement(CredentialCard, null))));
};
var _default = exports.default = OpenIDCredentialCard;
//# sourceMappingURL=OpenIDCredentialCard.js.map