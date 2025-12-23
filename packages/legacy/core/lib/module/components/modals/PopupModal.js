import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { useTheme } from '../../contexts/theme';
import InfoBox from '../misc/InfoBox';
const PopupModal = ({
  title,
  bodyContent,
  description,
  message,
  onCallToActionPressed,
  notificationType,
  onCallToActionLabel
}) => {
  const {
    ColorPallet
  } = useTheme();
  const styles = StyleSheet.create({
    modalCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPallet.notification.popupOverlay,
      padding: 20
    }
  });
  return /*#__PURE__*/React.createElement(Modal, {
    transparent: true
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.modalCenter
  }, /*#__PURE__*/React.createElement(InfoBox, {
    notificationType: notificationType,
    title: title,
    description: description,
    message: message,
    bodyContent: bodyContent,
    onCallToActionLabel: onCallToActionLabel,
    onCallToActionPressed: onCallToActionPressed
  })));
};
export default PopupModal;
//# sourceMappingURL=PopupModal.js.map