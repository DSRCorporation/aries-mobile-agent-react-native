"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
var _containerApi = require("../../container-api");
var _legacy = require("@bifold/oca/build/legacy");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const RecordRemove = ({
  onRemove = () => null
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    TextTheme,
    ColorPalette,
    Assets
  } = (0, _theme.useTheme)();
  const [bundleResolver] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_OCA_RESOLVER]);
  const styles = _reactNative.StyleSheet.create({
    headerText: {
      ...TextTheme.normal
    },
    footerText: {
      color: ColorPalette.brand.link
    },
    linkContainer: {
      minHeight: TextTheme.normal.fontSize,
      paddingVertical: 2
    },
    credentialRemoveContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      backgroundColor: ColorPalette.brand.secondaryBackground,
      marginTop: 16,
      paddingHorizontal: bundleResolver.getBrandingOverlayType() === _legacy.BrandingOverlayType.Branding10 ? 25 : 16,
      paddingVertical: 16
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.credentialRemoveContainer,
    accessible: true,
    accessibilityLabel: t('CredentialDetails.RemoveFromWallet'),
    accessibilityRole: 'button',
    testID: (0, _testable.testIdWithKey)('RemoveFromWallet'),
    activeOpacity: 1,
    onPress: onRemove
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.iconDelete, {
    width: 20,
    height: 20,
    color: ColorPalette.semantic.error
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: [styles.footerText, {
      color: ColorPalette.semantic.error
    }]
  }, t('CredentialDetails.RemoveFromWallet'))));
};
var _default = exports.default = RecordRemove;
//# sourceMappingURL=RecordRemove.js.map