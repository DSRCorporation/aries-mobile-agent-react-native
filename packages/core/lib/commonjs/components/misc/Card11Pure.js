"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _ThemedText = require("../texts/ThemedText");
var _testable = require("../../utils/testable");
var _credentialCardStyles = _interopRequireDefault(require("../../hooks/credential-card-styles"));
var _CardWatermark = _interopRequireDefault(require("./CardWatermark"));
var _CredentialCardGenLogo = _interopRequireDefault(require("./CredentialCardGenLogo"));
var _lodash = _interopRequireDefault(require("lodash.startcase"));
var _credential = require("../../utils/credential");
var _CredentialCardStatusBadge = _interopRequireDefault(require("./CredentialCardStatusBadge"));
var _CredentialCardAttributeList = _interopRequireDefault(require("./CredentialCardAttributeList"));
var _CredentialCardSecondaryBody = _interopRequireDefault(require("./CredentialCardSecondaryBody"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const Card11Pure = ({
  data,
  onPress,
  elevated,
  hasAltCredentials,
  onChangeAlt
}) => {
  const [dimensions, setDimensions] = (0, _react.useState)({
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
  } = (0, _credentialCardStyles.default)(
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
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      testID: (0, _testable.testIdWithKey)('CredentialCardPrimaryBody'),
      style: styles.primaryBodyContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: 'row'
      }
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "label",
      testID: (0, _testable.testIdWithKey)('CredentialIssuer'),
      style: [styles.textContainer, {
        lineHeight: 19,
        opacity: 0.8,
        flex: 1,
        flexWrap: 'wrap'
      }]
    }, data.issuerName)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.primaryBodyNameContainer
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "bold",
      testID: (0, _testable.testIdWithKey)('CredentialName'),
      style: [styles.textContainer, styles.credentialName, {
        color: textColor
      }]
    }, data.credentialName)), data.extraOverlayParameter && !proofContext && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flex: 1,
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "caption",
      style: {
        color: styles.textContainer.color
      }
    }, data.extraOverlayParameter.label ?? (0, _lodash.default)(data.extraOverlayParameter.label || ''), ":", ' ', data.extraOverlayParameter.value)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center'
      }
    }, data.revoked && !proofContext && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
      style: styles.errorIcon,
      name: "close",
      size: 30
    }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: styles.errorText,
      testID: (0, _testable.testIdWithKey)('RevokedOrNotAvailable'),
      numberOfLines: 1
    }, "Revoked")), data.notInWallet && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
      style: styles.errorIcon,
      name: "close",
      size: 30
    }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: styles.errorText,
      testID: (0, _testable.testIdWithKey)('RevokedOrNotAvailable')
    }, "Not available in your wallet"))), proofContext && /*#__PURE__*/_react.default.createElement(_CredentialCardAttributeList.default, {
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
  const Main = () => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.cardContainer,
    accessible: true,
    accessibilityLabel: accessibilityLabel
  }, /*#__PURE__*/_react.default.createElement(_CredentialCardSecondaryBody.default, {
    hideSlice: hideSlice,
    secondaryBg: branding.secondaryBg,
    backgroundSliceUri: branding.backgroundSliceUri,
    borderRadius: borderRadius,
    containerStyle: styles.secondaryBodyContainer
  }), /*#__PURE__*/_react.default.createElement(_CredentialCardGenLogo.default, {
    noLogoText: branding.logoText ?? 'U',
    logo: branding.logo1x1Uri,
    primaryBackgroundColor: branding.primaryBg,
    secondaryBackgroundColor: branding.secondaryBg,
    containerStyle: styles.logoContainer,
    logoHeight: logoHeight,
    elevated: elevated
  }), /*#__PURE__*/_react.default.createElement(PrimaryBody, null), /*#__PURE__*/_react.default.createElement(_CredentialCardStatusBadge.default, {
    status: data.status,
    logoHeight: logoHeight,
    containerStyle: styles.statusContainer
  }));
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessible: false,
    accessibilityLabel: onPress ? 'Credential details' : undefined,
    disabled: !onPress,
    onPress: onPress,
    style: styles.container,
    testID: (0, _testable.testIdWithKey)('ShowCredentialDetails')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    testID: (0, _testable.testIdWithKey)('CredentialCard'),
    style: {
      overflow: 'hidden'
    }
  }, branding.watermark && /*#__PURE__*/_react.default.createElement(_CardWatermark.default, {
    width: dimensions.cardWidth,
    height: dimensions.cardHeight,
    style: {
      color: branding.primaryBg
    },
    watermark: branding.watermark
  }), branding.backgroundFullUri && hideSlice ? /*#__PURE__*/_react.default.createElement(_reactNative.ImageBackground, {
    source: (0, _credential.toImageSource)(branding.backgroundFullUri)
  }, /*#__PURE__*/_react.default.createElement(Main, null)) : /*#__PURE__*/_react.default.createElement(Main, null))));
};
var _default = exports.default = Card11Pure;
//# sourceMappingURL=Card11Pure.js.map