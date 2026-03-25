"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _legacy = require("@bifold/oca/build/legacy");
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _CardWatermark = _interopRequireDefault(require("../../components/misc/CardWatermark"));
var _theme = require("../../contexts/theme");
var _credential = require("../../utils/credential");
var _testable = require("../../utils/testable");
var _helpers = require("../../utils/helpers");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const paddingHorizontal = 24;
const paddingVertical = 16;
const logoHeight = 80;
const CredentialDetailPrimaryHeader = ({
  overlay,
  brandingOverlayType = _legacy.BrandingOverlayType.Branding10,
  credential
}) => {
  var _overlay$metaOverlay, _overlay$metaOverlay2, _overlay$brandingOver, _overlay$metaOverlay3, _overlay$metaOverlay4, _overlay$metaOverlay5, _overlay$metaOverlay6;
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const {
    width,
    height
  } = (0, _reactNative.useWindowDimensions)();
  const isBranding11 = brandingOverlayType === _legacy.BrandingOverlayType.Branding11;
  const effectiveName = credential ? (0, _credential.getEffectiveCredentialName)(credential, (_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.name) : (_overlay$metaOverlay2 = overlay.metaOverlay) === null || _overlay$metaOverlay2 === void 0 ? void 0 : _overlay$metaOverlay2.name;
  const styles = _reactNative.StyleSheet.create({
    primaryHeaderContainer: {
      paddingHorizontal: isBranding11 ? 16 : paddingHorizontal,
      paddingVertical,
      overflow: 'hidden'
    },
    textContainer: {
      color: brandingOverlayType === _legacy.BrandingOverlayType.Branding10 ? (0, _credential.credentialTextColor)(ColorPalette, (_overlay$brandingOver = overlay.brandingOverlay) === null || _overlay$brandingOver === void 0 ? void 0 : _overlay$brandingOver.primaryBackgroundColor) : ColorPalette.brand.primary
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    testID: (0, _testable.testIdWithKey)('CredentialDetailsPrimaryHeader'),
    style: [styles.primaryHeaderContainer, {
      zIndex: -1
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, ((_overlay$metaOverlay3 = overlay.metaOverlay) === null || _overlay$metaOverlay3 === void 0 ? void 0 : _overlay$metaOverlay3.watermark) && brandingOverlayType === _legacy.BrandingOverlayType.Branding10 && /*#__PURE__*/_react.default.createElement(_CardWatermark.default, {
    width: width,
    height: height,
    watermark: (_overlay$metaOverlay4 = overlay.metaOverlay) === null || _overlay$metaOverlay4 === void 0 ? void 0 : _overlay$metaOverlay4.watermark
  }), brandingOverlayType === _legacy.BrandingOverlayType.Branding10 && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    accessibilityLabel: `${t('Credentials.IssuedBy')} ${(_overlay$metaOverlay5 = overlay.metaOverlay) === null || _overlay$metaOverlay5 === void 0 ? void 0 : _overlay$metaOverlay5.issuer}`,
    testID: (0, _testable.testIdWithKey)('CredentialIssuer'),
    variant: "label",
    style: [styles.textContainer, {
      paddingLeft: logoHeight + paddingVertical,
      paddingBottom: paddingVertical,
      lineHeight: 19,
      opacity: 0.8
    }],
    numberOfLines: 1
  }, (_overlay$metaOverlay6 = overlay.metaOverlay) === null || _overlay$metaOverlay6 === void 0 ? void 0 : _overlay$metaOverlay6.issuer), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    accessibilityLabel: `${effectiveName} ${t('Credentials.Credential')}`,
    testID: (0, _testable.testIdWithKey)('CredentialName'),
    style: [styles.textContainer, {
      lineHeight: 24
    }]
  }, effectiveName), brandingOverlayType === _legacy.BrandingOverlayType.Branding11 && credential && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    testID: (0, _testable.testIdWithKey)('IssuedOn'),
    style: [styles.textContainer, {
      lineHeight: 24,
      marginTop: 8,
      fontSize: 14,
      color: ColorPalette.grayscale.mediumGrey
    }]
  }, t('CredentialDetails.IssuedOn'), " ", (0, _helpers.formatTime)(credential.createdAt, {
    includeHour: true
  }))));
};
var _default = exports.default = CredentialDetailPrimaryHeader;
//# sourceMappingURL=CredentialDetailPrimaryHeader.js.map