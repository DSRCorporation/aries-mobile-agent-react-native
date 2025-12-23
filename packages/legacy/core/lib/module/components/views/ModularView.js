import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/theme';
import Text from '../texts/Text';
const ModularView = ({
  title,
  subtitle,
  content
}) => {
  const {
    borderRadius,
    TextTheme,
    ColorPallet
  } = useTheme();
  const styles = StyleSheet.create({
    container: {
      borderRadius,
      backgroundColor: ColorPallet.notification.info,
      margin: 20,
      padding: 20
    },
    content: {
      marginTop: 10
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.headingFour
  }, title), /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.normal
  }, subtitle), typeof content === 'string' ? /*#__PURE__*/React.createElement(Text, {
    style: styles.content
  }, content) : content);
};
export default ModularView;
//# sourceMappingURL=ModularView.js.map