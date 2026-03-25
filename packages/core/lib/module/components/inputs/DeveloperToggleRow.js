import React from 'react';
import { View, StyleSheet, Pressable, Switch } from 'react-native';
import { ThemedText } from '../texts/ThemedText';
import { useTheme } from '../../contexts/theme';
const DeveloperToggleRow = ({
  label,
  value,
  onToggle,
  accessibilityLabel,
  pressableTestId,
  switchTestId
}) => {
  const {
    ColorPalette
  } = useTheme();
  return /*#__PURE__*/React.createElement(View, {
    style: styles.settingContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "bold",
    style: styles.settingLabelText
  }, label)), /*#__PURE__*/React.createElement(Pressable, {
    style: styles.settingSwitchContainer,
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: "switch",
    testID: pressableTestId
  }, /*#__PURE__*/React.createElement(Switch, {
    trackColor: {
      false: ColorPalette.grayscale.lightGrey,
      true: ColorPalette.brand.primaryDisabled
    },
    thumbColor: value ? ColorPalette.brand.primary : ColorPalette.grayscale.mediumGrey,
    ios_backgroundColor: ColorPalette.grayscale.lightGrey,
    onValueChange: onToggle,
    testID: switchTestId,
    value: value
  })));
};
const styles = StyleSheet.create({
  settingContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  settingLabelText: {
    marginRight: 10,
    textAlign: 'left'
  },
  settingSwitchContainer: {
    justifyContent: 'center'
  }
});
export default DeveloperToggleRow;
//# sourceMappingURL=DeveloperToggleRow.js.map