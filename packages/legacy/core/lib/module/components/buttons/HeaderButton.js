import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { hitSlop } from '../../constants';
import { useTheme } from '../../contexts/theme';
const defaultIconSize = 26;
export let ButtonLocation = /*#__PURE__*/function (ButtonLocation) {
  ButtonLocation[ButtonLocation["Left"] = 0] = "Left";
  ButtonLocation[ButtonLocation["Right"] = 1] = "Right";
  return ButtonLocation;
}({});
const HeaderButton = ({
  buttonLocation,
  icon,
  text,
  accessibilityLabel,
  testID,
  onPress,
  iconTintColor
}) => {
  const {
    ColorPallet,
    TextTheme
  } = useTheme();
  const style = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: buttonLocation === ButtonLocation.Left ? 0 : 15,
      marginLeft: buttonLocation === ButtonLocation.Right ? 0 : 15,
      minWidth: defaultIconSize,
      minHeight: defaultIconSize
    },
    title: {
      ...TextTheme.label,
      color: ColorPallet.brand.headerText,
      marginRight: 4
    }
  });
  const myIcon = () => /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: defaultIconSize,
    color: iconTintColor ?? ColorPallet.brand.headerIcon
  });
  const myText = () => text ? /*#__PURE__*/React.createElement(Text, {
    style: style.title
  }, text) : null;
  const layoutForButtonLocation = buttonLocation => {
    switch (buttonLocation) {
      case ButtonLocation.Left:
        return /*#__PURE__*/React.createElement(React.Fragment, null, myIcon(), myText());
      case ButtonLocation.Right:
        return /*#__PURE__*/React.createElement(React.Fragment, null, myText(), myIcon());
    }
  };
  return /*#__PURE__*/React.createElement(Pressable, {
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: 'button',
    testID: testID,
    onPress: onPress,
    hitSlop: hitSlop
  }, /*#__PURE__*/React.createElement(View, {
    style: style.container
  }, layoutForButtonLocation(buttonLocation)));
};
export default HeaderButton;
//# sourceMappingURL=HeaderButton.js.map