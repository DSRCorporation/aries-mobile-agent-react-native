import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { ThemedText } from '../texts/ThemedText';
import { ButtonType } from './Button-api';
const ButtonImpl = ({
  title,
  buttonType,
  accessibilityLabel,
  accessibilityHint,
  testID,
  onPress,
  disabled = false,
  maxfontSizeMultiplier,
  children,
  ref
}) => {
  const {
    Buttons,
    heavyOpacity
  } = useTheme();
  const buttonStyles = {
    [ButtonType.Critical]: {
      color: Buttons.critical,
      colorDisabled: Buttons.criticalDisabled,
      text: Buttons.criticalText,
      textDisabled: Buttons.criticalTextDisabled
    },
    [ButtonType.Primary]: {
      color: Buttons.primary,
      colorDisabled: Buttons.primaryDisabled,
      text: Buttons.primaryText,
      textDisabled: Buttons.primaryTextDisabled
    },
    [ButtonType.Secondary]: {
      color: Buttons.secondary,
      colorDisabled: Buttons.secondaryDisabled,
      text: Buttons.secondaryText,
      textDisabled: Buttons.secondaryTextDisabled
    },
    [ButtonType.Tertiary]: {
      color: Buttons.tertiary,
      colorDisabled: Buttons.tertiaryDisabled,
      text: Buttons.tertiaryText,
      textDisabled: Buttons.tertiaryTextDisabled
    },
    [ButtonType.ModalCritical]: {
      color: Buttons.modalCritical,
      colorDisabled: Buttons.modalCriticalDisabled,
      text: Buttons.modalCriticalText,
      textDisabled: Buttons.modalCriticalTextDisabled
    },
    [ButtonType.ModalPrimary]: {
      color: Buttons.modalPrimary,
      colorDisabled: Buttons.modalPrimaryDisabled,
      text: Buttons.modalPrimaryText,
      textDisabled: Buttons.modalPrimaryTextDisabled
    },
    [ButtonType.ModalSecondary]: {
      color: Buttons.modalSecondary,
      colorDisabled: Buttons.modalSecondaryDisabled,
      text: Buttons.modalSecondaryText,
      textDisabled: Buttons.modalSecondaryTextDisabled
    },
    [ButtonType.SecondaryCritical]: {
      color: Buttons.secondaryCritical,
      colorDisabled: Buttons.secondaryCritical,
      text: Buttons.secondaryCriticalText,
      textDisabled: Buttons.secondaryCriticalText
    },
    [ButtonType.ModalTertiary]: {
      color: Buttons.modalTertiary,
      colorDisabled: Buttons.modalTertiaryDisabled,
      text: Buttons.modalTertiaryText,
      textDisabled: Buttons.modalTertiaryTextDisabled
    }
  };
  const [isActive, setIsActive] = useState(false);
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onPress,
    accessible: true,
    accessibilityLabel: accessibilityLabel,
    accessibilityHint: accessibilityHint,
    accessibilityRole: 'button',
    onPressIn: () => setIsActive(!disabled && true),
    onPressOut: () => setIsActive(false),
    testID: testID,
    style: [buttonStyles[buttonType].color, disabled && buttonStyles[buttonType].colorDisabled],
    disabled: disabled,
    activeOpacity: heavyOpacity,
    ref: ref
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, children, /*#__PURE__*/React.createElement(ThemedText, {
    maxFontSizeMultiplier: maxfontSizeMultiplier,
    style: [buttonStyles[buttonType].text, disabled && buttonStyles[buttonType].textDisabled, isActive && {
      textDecorationLine: 'underline'
    }]
  }, title)));
};
export default ButtonImpl;
export { ButtonType } from './Button-api';
export { ButtonImpl };
//# sourceMappingURL=Button.js.map