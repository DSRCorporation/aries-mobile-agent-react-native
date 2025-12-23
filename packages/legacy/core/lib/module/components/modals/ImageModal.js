import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, View, useWindowDimensions, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { hitSlop } from '../../constants';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
const ImageModal = ({
  uri,
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
    ColorPallet
  } = useTheme();
  const styles = StyleSheet.create({
    modalCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPallet.notification.popupOverlay,
      minHeight: height,
      minWidth: width,
      paddingHorizontal: 20,
      paddingVertical: 50
    },
    container: {
      flexShrink: 1,
      backgroundColor: ColorPallet.brand.primaryBackground
    },
    image: {
      width: width - 40,
      aspectRatio: 1,
      resizeMode: 'contain'
    },
    dismissIcon: {
      zIndex: 10,
      position: 'absolute',
      right: 20,
      top: 20
    }
  });
  const iconSize = 30;
  const dismissIconName = 'clear';
  const iconColor = ColorPallet.brand.primary;
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
  }))), /*#__PURE__*/React.createElement(Image, {
    style: styles.image,
    source: {
      uri
    }
  }))))));
};
export default ImageModal;
//# sourceMappingURL=ImageModal.js.map