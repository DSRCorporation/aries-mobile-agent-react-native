import { useTheme } from '../../contexts/theme';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useBranding } from '../../hooks/bundle-resolver';
import { useTranslation } from 'react-i18next';
import { getCredentialIdentifiers } from '../../utils/credential';
import { useCredentialConnectionLabel } from '../../utils/helpers';
import { ThemedText } from '../texts/ThemedText';
import { useMemo } from 'react';
const ContactCredentialListItem = ({
  credential,
  onPress
}) => {
  var _overlay$metaOverlay, _overlay$metaOverlay2;
  const {
    Assets,
    ColorPalette
  } = useTheme();
  const {
    t,
    i18n
  } = useTranslation();
  const credentialConnectionLabel = useCredentialConnectionLabel(credential);
  const params = useMemo(() => ({
    identifiers: getCredentialIdentifiers(credential),
    attributes: credential.credentialAttributes,
    meta: {
      credConnectionId: credential.connectionId,
      alias: credentialConnectionLabel
    },
    language: i18n.language
  }), [credential, credentialConnectionLabel, i18n.language]);
  const {
    overlay
  } = useBranding(params);
  const styles = StyleSheet.create({
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
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onPress,
    style: styles.container,
    accessibilityHint: t('ContactDetails.GoToCredentialDetail'),
    accessibilityLabel: `${t('ContactDetails.CredentialName')}: ${overlay === null || overlay === void 0 || (_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.name}`,
    accessibilityRole: 'button'
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.credentialContainer
  }, /*#__PURE__*/React.createElement(ThemedText, {
    style: styles.credentialName
  }, overlay === null || overlay === void 0 || (_overlay$metaOverlay2 = overlay.metaOverlay) === null || _overlay$metaOverlay2 === void 0 ? void 0 : _overlay$metaOverlay2.name)), /*#__PURE__*/React.createElement(View, {
    style: styles.iconContainer
  }, /*#__PURE__*/React.createElement(Assets.svg.iconChevronRight, icon)));
};
export default ContactCredentialListItem;
//# sourceMappingURL=ContactCredentialListItem.js.map