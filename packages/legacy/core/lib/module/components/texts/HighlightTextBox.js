import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/theme';
const offset = 10;
const HighlightTextBox = ({
  children
}) => {
  const {
    ColorPallet,
    OnboardingTheme
  } = useTheme();
  const style = StyleSheet.create({
    icon: {
      marginRight: offset
    },
    container: {
      flexDirection: 'row',
      backgroundColor: ColorPallet.brand.primaryBackground
    },
    accentBox: {
      marginRight: offset,
      backgroundColor: ColorPallet.brand.highlight,
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
  }), /*#__PURE__*/React.createElement(Text, {
    style: [style.headerText, {
      paddingTop: offset,
      paddingBottom: offset
    }]
  }, children));
};
export default HighlightTextBox;
//# sourceMappingURL=HighlightTextBox.js.map