import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/theme';
import Text from './Text';
const Label = ({
  title,
  subtitle,
  label
}) => {
  const {
    TextTheme
  } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90%',
      marginTop: 10
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    title: {
      ...TextTheme.labelTitle,
      marginRight: 7
    },
    subtitle: {
      ...TextTheme.labelSubtitle
    },
    label: {
      marginLeft: 10,
      ...TextTheme.labelText
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.titleContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.title
  }, title, ":"), /*#__PURE__*/React.createElement(Text, {
    style: styles.subtitle
  }, subtitle)), /*#__PURE__*/React.createElement(Text, {
    style: styles.label
  }, label));
};
export default Label;
//# sourceMappingURL=Label.js.map