import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { hitSlop } from '../../constants';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
import Button, { ButtonType } from '../buttons/Button';
import { ThemedText } from '../texts/ThemedText';
import SafeAreaModal from './SafeAreaModal';
const AppGuideModal = ({
  title,
  description,
  onCallToActionPressed,
  onCallToActionLabel,
  onSecondCallToActionPressed,
  onSecondCallToActionLabel,
  onDismissPressed
}) => {
  const {
    height,
    width
  } = useWindowDimensions();
  const {
    t
  } = useTranslation();
  const {
    ColorPalette
  } = useTheme();
  const iconSize = 30;
  const dismissIconName = 'clear';
  const iconColor = ColorPalette.notification.infoIcon;
  const styles = StyleSheet.create({
    modalCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPalette.notification.popupOverlay,
      padding: 10,
      minHeight: height,
      minWidth: width
    },
    container: {
      backgroundColor: ColorPalette.notification.info,
      borderColor: ColorPalette.notification.infoBorder,
      borderRadius: 5,
      borderWidth: 1,
      padding: 20,
      width: width - 50
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    headerTextContainer: {
      flex: 1,
      flexWrap: 'wrap'
    },
    headerText: {
      alignSelf: 'flex-start',
      flexWrap: 'wrap',
      color: ColorPalette.notification.infoText
    },
    bodyText: {
      flexShrink: 1,
      marginVertical: 16,
      color: ColorPalette.notification.infoText
    },
    dismissIcon: {
      alignSelf: 'center'
    }
  });
  return /*#__PURE__*/React.createElement(SafeAreaModal, {
    transparent: true,
    accessibilityViewIsModal: true
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.modalCenter
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.headerContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.headerTextContainer
  }, /*#__PURE__*/React.createElement(ThemedText, {
    maxFontSizeMultiplier: 1.5,
    variant: "headingThree",
    style: styles.headerText,
    testID: testIdWithKey('HeaderText'),
    accessibilityRole: "header"
  }, title)), /*#__PURE__*/React.createElement(View, {
    style: styles.dismissIcon
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onDismissPressed,
    testID: testIdWithKey('Dismiss'),
    accessibilityLabel: t('Global.Dismiss'),
    accessibilityRole: 'button',
    hitSlop: hitSlop
  }, /*#__PURE__*/React.createElement(Icon, {
    name: dismissIconName,
    size: iconSize,
    color: iconColor
  })))), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(ThemedText, {
    maxFontSizeMultiplier: 1.5,
    style: styles.bodyText,
    testID: testIdWithKey('BodyText')
  }, description), onCallToActionPressed && /*#__PURE__*/React.createElement(View, {
    style: {
      width: '100%',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    title: onCallToActionLabel || t('Global.Okay'),
    accessibilityLabel: onCallToActionLabel || t('Global.Okay'),
    testID: testIdWithKey('Primary'),
    buttonType: ButtonType.Primary,
    onPress: onCallToActionPressed,
    maxfontSizeMultiplier: 1.5
  })), onSecondCallToActionPressed && /*#__PURE__*/React.createElement(Button, {
    title: onSecondCallToActionLabel || t('Global.Dismiss'),
    accessibilityLabel: onSecondCallToActionLabel || t('Global.Dismiss'),
    testID: testIdWithKey('Secondary'),
    buttonType: ButtonType.Secondary,
    onPress: onSecondCallToActionPressed,
    maxfontSizeMultiplier: 1.5
  })))));
};
export default AppGuideModal;
//# sourceMappingURL=AppGuideModal.js.map