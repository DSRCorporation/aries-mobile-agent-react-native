import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, View } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
import IconButton, { ButtonLocation } from '../buttons/IconButton';
import { ThemedText } from '../texts/ThemedText';
// Used for modals that we want to look like regular screens
const FauxHeader = ({
  title,
  onBackPressed = () => {},
  showBackButton = true
}) => {
  const {
    Spacing,
    NavigationTheme
  } = useTheme();
  const {
    t
  } = useTranslation();
  const styles = StyleSheet.create({
    header: {
      backgroundColor: NavigationTheme.colors.primary,
      zIndex: 2,
      borderWidth: 0,
      flexDirection: 'row',
      alignItems: 'stretch',
      minHeight: Platform.OS === 'ios' ? 44 : 56,
      ...NavigationTheme.header
    },
    left: {
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    titleContainer: {
      marginHorizontal: Spacing.md,
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 1,
      maxWidth: '68%',
      width: '100%'
    },
    title: {
      textAlign: 'center'
    },
    right: {
      justifyContent: 'center',
      alignItems: 'flex-end'
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: styles.header
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.left
  }, showBackButton && /*#__PURE__*/React.createElement(IconButton, {
    buttonLocation: ButtonLocation.Left,
    accessibilityLabel: t('Global.Back'),
    testID: testIdWithKey('BackButton'),
    onPress: onBackPressed,
    icon: "chevron-left"
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.titleContainer
  }, /*#__PURE__*/React.createElement(ThemedText, {
    variant: 'headerTitle',
    numberOfLines: 1,
    ellipsizeMode: "tail",
    style: styles.title
  }, title)), /*#__PURE__*/React.createElement(View, {
    style: styles.right
  }));
};
export default FauxHeader;
//# sourceMappingURL=FauxHeader.js.map