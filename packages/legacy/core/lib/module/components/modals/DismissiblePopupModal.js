import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { hitSlop } from '../../constants';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
import Button, { ButtonType } from '../buttons/Button';
const DismissiblePopupModal = ({
  title,
  description,
  onCallToActionPressed,
  onCallToActionLabel,
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
  const styles = StyleSheet.create({
    modalCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPallet.notification.popupOverlay,
      padding: 20,
      minHeight: height,
      minWidth: width
    },
    container: {
      backgroundColor: ColorPallet.brand.modalPrimaryBackground,
      borderColor: ColorPallet.brand.modalSecondaryBackground,
      borderRadius: 5,
      borderWidth: 1,
      padding: 10,
      minWidth: width - 2 * 25,
      flex: 1,
      maxHeight: '50%'
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
      paddingTop: 5
    },
    bodyContainer: {
      marginLeft: 10 + iconSize,
      paddingHorizontal: 5,
      paddingBottom: 5,
      flexShrink: 1,
      justifyContent: 'space-between'
    },
    headerTextContainer: {
      flexGrow: 1
    },
    headerText: {
      ...TextTheme.bold,
      alignSelf: 'flex-start',
      color: ColorPallet.notification.infoText
    },
    scrollViewContentContainer: {
      flexGrow: 1
    },
    scrollViewStyle: {
      flex: 1
    },
    bodyText: {
      ...TextTheme.normal,
      paddingVertical: 16,
      color: ColorPallet.notification.infoText
    },
    footer: {
      paddingTop: 10
    },
    infoIcon: {
      marginRight: 10,
      alignSelf: 'center'
    },
    dismissIcon: {
      alignSelf: 'flex-end'
    }
  });
  const infoIconName = 'info';
  const dismissIconName = 'clear';
  const iconColor = ColorPallet.notification.infoIcon;
  return /*#__PURE__*/React.createElement(Modal, {
    transparent: true
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onDismissPressed,
    accessible: false
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.modalCenter
  }, /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    accessible: false
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.headerContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.infoIcon
  }, /*#__PURE__*/React.createElement(Icon, {
    name: infoIconName,
    size: iconSize,
    color: iconColor
  })), /*#__PURE__*/React.createElement(View, {
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
  })))), /*#__PURE__*/React.createElement(View, {
    style: styles.bodyContainer
  }, /*#__PURE__*/React.createElement(ScrollView, {
    showsVerticalScrollIndicator: false,
    contentContainerStyle: styles.scrollViewContentContainer,
    style: styles.scrollViewStyle
  }, /*#__PURE__*/React.createElement(View, {
    onStartShouldSetResponder: () => true
  }, /*#__PURE__*/React.createElement(Text, {
    selectable: true,
    style: styles.bodyText,
    testID: testIdWithKey('BodyText')
  }, description))), onCallToActionPressed && /*#__PURE__*/React.createElement(View, {
    style: styles.footer
  }, /*#__PURE__*/React.createElement(Button, {
    title: onCallToActionLabel || t('Global.Okay'),
    accessibilityLabel: onCallToActionLabel || t('Global.Okay'),
    testID: testIdWithKey('Okay'),
    buttonType: ButtonType.ModalPrimary,
    onPress: onCallToActionPressed
  }))))))));
};
export default DismissiblePopupModal;
//# sourceMappingURL=DismissiblePopupModal.js.map