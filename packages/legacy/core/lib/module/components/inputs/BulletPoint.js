import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../contexts/theme';
const BulletPoint = ({
  text,
  textStyle
}) => {
  const {
    ColorPallet
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
    color: ColorPallet.brand.modalIcon
  })), /*#__PURE__*/React.createElement(Text, {
    style: [textStyle, {
      flexShrink: 1
    }]
  }, text));
};
export default BulletPoint;
//# sourceMappingURL=BulletPoint.js.map