import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { hitSlop } from '../../constants';
import { useTheme } from '../../contexts/theme';
const CheckBoxRow = ({
  title,
  titleStyle = {},
  accessibilityLabel,
  testID,
  checked,
  onPress,
  reverse
}) => {
  const {
    Inputs
  } = useTheme();
  const style = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: reverse ? 'row-reverse' : 'row',
      alignItems: 'center',
      margin: 10
    },
    text: {
      ...Inputs.checkBoxText,
      flexShrink: 1,
      marginLeft: reverse ? 0 : 10,
      marginRight: reverse ? 10 : 0
    }
  });
  const accessible = accessibilityLabel && accessibilityLabel !== '' ? true : false;
  return /*#__PURE__*/React.createElement(View, {
    style: style.container
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    accessible: accessible,
    accessibilityLabel: accessibilityLabel,
    testID: testID,
    onPress: onPress,
    hitSlop: hitSlop
  }, checked ? /*#__PURE__*/React.createElement(Icon, {
    name: 'check-box',
    size: 36,
    color: Inputs.checkBoxColor.color
  }) : /*#__PURE__*/React.createElement(Icon, {
    name: 'check-box-outline-blank',
    size: 36,
    color: Inputs.checkBoxColor.color
  })), /*#__PURE__*/React.createElement(Text, {
    style: [style.text, titleStyle]
  }, title));
};
export default CheckBoxRow;
//# sourceMappingURL=CheckBoxRow.js.map