import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../texts/ThemedText';
const PINScreenTitleText = ({
  header,
  subheader
}) => {
  const style = StyleSheet.create({
    container: {
      paddingTop: 16,
      paddingBottom: 32
    },
    header: {
      marginBottom: 16
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: style.container
  }, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "bold",
    style: style.header
  }, header), /*#__PURE__*/React.createElement(ThemedText, {
    variant: "bold"
  }, subheader));
};
export default PINScreenTitleText;
//# sourceMappingURL=PINScreenTitleText.js.map