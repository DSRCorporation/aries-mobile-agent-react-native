import React, { forwardRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { ButtonType } from './Button-api';
const ButtonImplComponent = ({
  title,
  buttonType,
  accessibilityLabel,
  testID,
  onPress,
  disabled = false,
  children
}, ref) => {
  const {
    Buttons,
    heavyOpacity
  } = useTheme();
  const buttonStyles = {
    [ButtonType.Critical]: {
      color: Buttons.critical,
      text: Buttons.primaryText
    },
    [ButtonType.Primary]: {
      color: Buttons.primary,
      text: Buttons.primaryText
    },
    [ButtonType.Secondary]: {
      color: Buttons.secondary,
      text: Buttons.secondaryText
    },
    [ButtonType.ModalCritical]: {
      color: Buttons.modalCritical,
      text: Buttons.primaryText
    },
    [ButtonType.ModalPrimary]: {
      color: Buttons.modalPrimary,
      text: Buttons.modalPrimaryText
    },
    [ButtonType.ModalSecondary]: {
      color: Buttons.modalSecondary,
      text: Buttons.modalSecondaryText
    },
    [ButtonType.SecondaryCritical]: {
      color: Buttons.secondaryCritical,
      text: Buttons.secondaryCriticalText
    }
  };
  const [isActive, setIsActive] = useState(false);
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onPress,
    accessible: true,
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: 'button',
    onPressIn: () => setIsActive(!disabled && true),
    onPressOut: () => setIsActive(false),
    testID: testID,
    style: [buttonStyles[buttonType].color, disabled && (buttonType === ButtonType.Primary ? Buttons.primaryDisabled : Buttons.secondaryDisabled), isActive && buttonType === ButtonType.Secondary && {
      backgroundColor: Buttons.primary.backgroundColor
    }],
    disabled: disabled,
    activeOpacity: heavyOpacity,
    ref: ref
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, children, /*#__PURE__*/React.createElement(Text, {
    style: [buttonStyles[buttonType].text, disabled && (buttonType === ButtonType.Primary ? Buttons.primaryTextDisabled : Buttons.secondaryTextDisabled), isActive && {
      textDecorationLine: 'underline'
    }, isActive && buttonType === ButtonType.Secondary && {
      color: Buttons.primaryText.color
    }]
  }, title)));
};
const ButtonImpl = /*#__PURE__*/forwardRef(ButtonImplComponent);
export default ButtonImpl;
export { ButtonType, ButtonImpl };
//# sourceMappingURL=Button.js.map