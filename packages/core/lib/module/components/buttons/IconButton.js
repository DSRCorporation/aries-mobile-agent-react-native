import React, { useCallback } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { hitSlop } from '../../constants';
import { useTheme } from '../../contexts/theme';
import { ThemedText } from '../texts/ThemedText';
import { TOKENS, useServices } from '../../container-api';
const defaultIconSize = 26;
export let ButtonLocation = /*#__PURE__*/function (ButtonLocation) {
  ButtonLocation[ButtonLocation["Left"] = 0] = "Left";
  ButtonLocation[ButtonLocation["Right"] = 1] = "Right";
  return ButtonLocation;
}({});
const IconButton = ({
  buttonLocation,
  icon,
  text,
  accessibilityLabel,
  testID,
  onPress,
  iconTintColor
}) => {
  const {
    ColorPalette
  } = useTheme();
  const [logger] = useServices([TOKENS.UTIL_LOGGER]);
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
      color: ColorPalette.brand.headerText,
      marginRight: 4
    }
  });
  const myIcon = useCallback(() => {
    const iconColor = iconTintColor ?? ColorPalette.brand.headerIcon;

    // First, check if the icon exists in MaterialCommunityIcons
    if (MaterialCommunityIcon.hasIcon(icon)) {
      return /*#__PURE__*/React.createElement(MaterialCommunityIcon, {
        name: icon,
        size: defaultIconSize,
        color: iconColor
      });
    }

    // Next, check if the icon exists in MaterialIcons
    if (MaterialIcon.hasIcon(icon)) {
      return /*#__PURE__*/React.createElement(MaterialIcon, {
        name: icon,
        size: defaultIconSize,
        color: iconColor
      });
    }

    // Otherwise, render default icon (?) and log a warning
    logger.warn(`IconButton: Icon "${icon}" not found in MaterialIcons or MaterialCommunityIcons. Defaulting to (?).`);
    return /*#__PURE__*/React.createElement(MaterialIcon, {
      name: 'question-mark',
      size: defaultIconSize,
      color: iconColor
    });
  }, [ColorPalette.brand.headerIcon, icon, iconTintColor, logger]);
  const myText = () => text ? /*#__PURE__*/React.createElement(ThemedText, {
    maxFontSizeMultiplier: 1,
    variant: "label",
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
export default IconButton;
//# sourceMappingURL=IconButton.js.map