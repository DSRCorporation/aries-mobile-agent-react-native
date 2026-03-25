"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _ThemedText = require("../texts/ThemedText");
var _testable = require("../../utils/testable");
var _credentialCardStyles = _interopRequireDefault(require("../../hooks/credential-card-styles"));
var _CardWatermark = _interopRequireDefault(require("../misc/CardWatermark"));
var _CredentialCardStatusBadge = _interopRequireDefault(require("./CredentialCardStatusBadge"));
var _CredentialCardAttributeList = _interopRequireDefault(require("./CredentialCardAttributeList"));
var _CredentialCardSecondaryBody = _interopRequireDefault(require("./CredentialCardSecondaryBody"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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
  } = (0, _credentialCardStyles.default)({
    primaryBackgroundColor: branding.primaryBg,
    secondaryBackgroundColor: branding.secondaryBg
  }, 'Branding10', !!data.proofContext);
  const byKey = (0, _react.useMemo)(() => Object.fromEntries(data.items.map(i => [i.key, i])), [data.items]);
  const primary = data.primaryAttributeKey ? byKey[data.primaryAttributeKey] : undefined;
  const secondary = data.secondaryAttributeKey ? byKey[data.secondaryAttributeKey] : undefined;
  const list = (0, _react.useMemo)(() => [primary, secondary, ...data.items.filter(i => i.key !== (primary === null || primary === void 0 ? void 0 : primary.key) && i.key !== (secondary === null || secondary === void 0 ? void 0 : secondary.key))].filter(Boolean), [primary, secondary, data.items]);
  const textColor = data.branding.preferredTextColor ?? styles.textContainer.color;
  const issuerAccessibilityLabel = data.issuerName ? `Issued by ${data.issuerName}` : '';
  const dataLabels = list.map(f => `${f.label}, ${f.value ?? ''}`).join(', ');
  const accessibilityLabel = `${issuerAccessibilityLabel}, ${data.credentialName}, ${dataLabels}`;
  const Header = () => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.primaryBodyNameContainer, {
      flexDirection: 'row',
      alignItems: 'center'
    }]
  }, branding.logo1x1Uri ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: {
      uri: branding.logo1x1Uri
    },
    style: {
      width: logoHeight,
      height: logoHeight,
      borderRadius
    }
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      width: logoHeight,
      height: logoHeight
    }
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1,
      paddingLeft: 8
    }
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "label",
    testID: (0, _testable.testIdWithKey)('CredentialIssuer'),
    style: [styles.textContainer]
  }, data.issuerName), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold",
    testID: (0, _testable.testIdWithKey)('CredentialName'),
    style: [styles.textContainer]
  }, data.credentialName)));
  const PrimaryBody = () => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    testID: (0, _testable.testIdWithKey)('CredentialCardPrimaryBody'),
    style: styles.primaryBodyContainer
  }, /*#__PURE__*/_react.default.createElement(Header, null), /*#__PURE__*/_react.default.createElement(_CredentialCardAttributeList.default, {
    list: list,
    textColor: textColor,
    showPiiWarning: !!data.proofContext,
    isNotInWallet: data.notInWallet,
    hasAltCredentials: hasAltCredentials,
    onChangeAlt: onChangeAlt,
    helpActionUrl: data.helpActionUrl,
    styles: styles
  }));
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
  }), /*#__PURE__*/_react.default.createElement(PrimaryBody, null), /*#__PURE__*/_react.default.createElement(_CredentialCardStatusBadge.default, {
    status: data.status,
    logoHeight: logoHeight,
    containerStyle: styles.statusContainer
  }));
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      elevation: elevated ? 5 : 0,
      overflow: elevated ? 'visible' : 'hidden'
    }]
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
    width: 0,
    height: 0,
    style: {},
    watermark: branding.watermark
  }), branding.backgroundFullUri && hideSlice ? /*#__PURE__*/_react.default.createElement(_reactNative.ImageBackground, {
    source: {
      uri: branding.backgroundFullUri
    }
  }, /*#__PURE__*/_react.default.createElement(Main, null)) : /*#__PURE__*/_react.default.createElement(Main, null))));
};
var _default = exports.default = Card10Pure;
//# sourceMappingURL=Card10Pure.js.map