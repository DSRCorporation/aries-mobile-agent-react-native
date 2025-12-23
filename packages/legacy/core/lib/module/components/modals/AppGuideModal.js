import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { hitSlop } from '../../constants';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
import Button, { ButtonType } from '../buttons/Button';
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
    TextTheme,
    ColorPallet
  } = useTheme();
  const iconSize = 30;
  const dismissIconName = 'clear';
  const iconColor = ColorPallet.notification.infoIcon;
  const styles = StyleSheet.create({
    modalCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPallet.notification.popupOverlay,
      padding: 10,
      minHeight: height,
      minWidth: width
    },
    container: {
      backgroundColor: ColorPallet.notification.info,
      borderColor: ColorPallet.notification.infoBorder,
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
      ...TextTheme.headingThree,
      alignSelf: 'flex-start',
      flexWrap: 'wrap',
      color: ColorPallet.notification.infoText
    },
    bodyText: {
      ...TextTheme.normal,
      flexShrink: 1,
      marginVertical: 16,
      color: ColorPallet.notification.infoText
    },
    dismissIcon: {
      alignSelf: 'center'
    }
  });
  return /*#__PURE__*/React.createElement(Modal, {
    transparent: true
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.modalCenter
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.headerContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.headerTextContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.headerText,
    testID: testIdWithKey('HeaderText')
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
  })))), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
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
    onPress: onCallToActionPressed
  })), onSecondCallToActionPressed && /*#__PURE__*/React.createElement(Button, {
    title: onSecondCallToActionLabel || t('Global.Dismiss'),
    accessibilityLabel: onSecondCallToActionLabel || t('Global.Dismiss'),
    testID: testIdWithKey('Secondary'),
    buttonType: ButtonType.Secondary,
    onPress: onSecondCallToActionPressed
  })))));
};
export default AppGuideModal;
//# sourceMappingURL=AppGuideModal.js.map