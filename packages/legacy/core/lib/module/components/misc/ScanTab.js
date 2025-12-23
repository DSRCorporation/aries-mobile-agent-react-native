import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
const ScanTab = ({
  onPress,
  active,
  iconName,
  title
}) => {
  const {
    TabTheme,
    TextTheme
  } = useTheme();
  const {
    fontScale
  } = useWindowDimensions();
  const showLabels = fontScale * TabTheme.tabBarTextStyle.fontSize < 18;
  const styles = StyleSheet.create({
    container: {
      ...TabTheme.tabBarContainerStyle
    },
    text: {
      ...TabTheme.tabBarTextStyle,
      color: active ? TabTheme.tabBarActiveTintColor : TabTheme.tabBarInactiveTintColor,
      fontWeight: active ? TextTheme.bold.fontWeight : TextTheme.normal.fontWeight
    }
  });
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.container,
    onPress: onPress,
    accessibilityLabel: title,
    testID: testIdWithKey(title)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: iconName,
    size: 30,
    color: styles.text.color
  }), showLabels ? /*#__PURE__*/React.createElement(Text, {
    style: styles.text
  }, title) : null);
};
export default ScanTab;
//# sourceMappingURL=ScanTab.js.map