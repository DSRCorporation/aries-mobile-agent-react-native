import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/theme';
const Title = ({
  children,
  style
}) => {
  const {
    TextTheme
  } = useTheme();
  const styles = StyleSheet.create({
    title: {
      ...TextTheme.title
    }
  });
  return /*#__PURE__*/React.createElement(Text, {
    adjustsFontSizeToFit: true,
    style: [styles.title, style]
  }, children);
};
export default Title;
//# sourceMappingURL=Title.js.map