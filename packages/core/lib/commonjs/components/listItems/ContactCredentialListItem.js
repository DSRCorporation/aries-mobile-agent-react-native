"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _theme = require("../../contexts/theme");
var _reactNative = require("react-native");
var _bundleResolver = require("../../hooks/bundle-resolver");
var _reactI18next = require("react-i18next");
var _credential = require("../../utils/credential");
var _helpers = require("../../utils/helpers");
var _ThemedText = require("../texts/ThemedText");
var _react = require("react");
const ContactCredentialListItem = ({
  credential,
  onPress
}) => {
  var _overlay$metaOverlay, _overlay$metaOverlay2;
  const {
    Assets,
    ColorPalette
  } = (0, _theme.useTheme)();
  const {
    t,
    i18n
  } = (0, _reactI18next.useTranslation)();
  const credentialConnectionLabel = (0, _helpers.useCredentialConnectionLabel)(credential);
  const params = (0, _react.useMemo)(() => ({
    identifiers: (0, _credential.getCredentialIdentifiers)(credential),
    attributes: credential.credentialAttributes,
    meta: {
      credConnectionId: credential.connectionId,
      alias: credentialConnectionLabel
    },
    language: i18n.language
  }), [credential, credentialConnectionLabel, i18n.language]);
  const {
    overlay
  } = (0, _bundleResolver.useBranding)(params);
  const styles = _reactNative.StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    credentialContainer: {
      flex: 9
    },
    credentialName: {
      color: ColorPalette.brand.primary,
      fontWeight: '600'
    },
    iconContainer: {
      flex: 1,
      padding: 8
    }
  });
  const icon = {
    color: ColorPalette.brand.primary,
    width: 48,
    height: 48
  };
  return /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
    onPress: onPress,
    style: styles.container,
    accessibilityHint: t('ContactDetails.GoToCredentialDetail'),
    accessibilityLabel: `${t('ContactDetails.CredentialName')}: ${overlay === null || overlay === void 0 || (_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.name}`,
    accessibilityRole: 'button'
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.credentialContainer
  }, /*#__PURE__*/React.createElement(_ThemedText.ThemedText, {
    style: styles.credentialName
  }, overlay === null || overlay === void 0 || (_overlay$metaOverlay2 = overlay.metaOverlay) === null || _overlay$metaOverlay2 === void 0 ? void 0 : _overlay$metaOverlay2.name)), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.iconContainer
  }, /*#__PURE__*/React.createElement(Assets.svg.iconChevronRight, icon)));
};
var _default = exports.default = ContactCredentialListItem;
//# sourceMappingURL=ContactCredentialListItem.js.map