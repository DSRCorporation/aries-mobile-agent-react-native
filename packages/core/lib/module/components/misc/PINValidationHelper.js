import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../contexts/theme';
import { ThemedText } from '../texts/ThemedText';
const iconSize = 24;
const PINValidationHelper = ({
  validations
}) => {
  const {
    t
  } = useTranslation();
  const {
    ColorPalette
  } = useTheme();
  return /*#__PURE__*/React.createElement(View, {
    style: {
      marginBottom: 16
    }
  }, validations.map((validation, index) => /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row'
    },
    key: index
  }, validation.isInvalid ? /*#__PURE__*/React.createElement(Icon, {
    accessibilityLabel: t('PINCreate.Helper.ClearIcon'),
    name: "clear",
    size: iconSize,
    color: ColorPalette.notification.errorIcon
  }) : /*#__PURE__*/React.createElement(Icon, {
    accessibilityLabel: t('PINCreate.Helper.CheckIcon'),
    name: "check",
    size: iconSize,
    color: ColorPalette.notification.successIcon
  }), /*#__PURE__*/React.createElement(ThemedText, {
    style: {
      paddingLeft: 4
    }
  }, t(`PINCreate.Helper.${validation.errorName}`, validation === null || validation === void 0 ? void 0 : validation.errorTextAddition)))));
};
export default PINValidationHelper;
//# sourceMappingURL=PINValidationHelper.js.map