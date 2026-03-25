import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../contexts/theme';
import { ThemedText } from '../texts/ThemedText';
const BulletPoint = ({
  text,
  textStyle
}) => {
  const {
    ColorPalette
  } = useTheme();
  const styles = StyleSheet.create({
    iconContainer: {
      marginRight: 10,
      marginVertical: 6
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: {
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.iconContainer
  }, /*#__PURE__*/React.createElement(Icon, {
    name: 'circle',
    size: 9,
    color: ColorPalette.brand.modalIcon
  })), /*#__PURE__*/React.createElement(ThemedText, {
    style: [textStyle, {
      flexShrink: 1
    }]
  }, text));
};
export default BulletPoint;
//# sourceMappingURL=BulletPoint.js.map