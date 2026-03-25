import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { ThemedText } from './ThemedText';
const offset = 10;
const HighlightTextBox = ({
  children
}) => {
  const {
    ColorPalette,
    OnboardingTheme
  } = useTheme();
  const style = StyleSheet.create({
    icon: {
      marginRight: offset
    },
    container: {
      flexDirection: 'row',
      backgroundColor: ColorPalette.brand.primaryBackground
    },
    accentBox: {
      marginRight: offset,
      backgroundColor: ColorPalette.brand.highlight,
      width: 8
    },
    headerText: {
      ...OnboardingTheme.bodyText,
      flexShrink: 1
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: style.container
  }, /*#__PURE__*/React.createElement(View, {
    style: style.accentBox
  }), /*#__PURE__*/React.createElement(ThemedText, {
    style: [style.headerText, {
      paddingTop: offset,
      paddingBottom: offset
    }]
  }, children));
};
export default HighlightTextBox;
//# sourceMappingURL=HighlightTextBox.js.map