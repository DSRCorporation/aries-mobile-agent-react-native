import React from 'react';
import { View, useWindowDimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
import Toast from 'react-native-toast-message';
import { ThemedText } from '../texts/ThemedText';
export let ToastType = /*#__PURE__*/function (ToastType) {
  ToastType["Success"] = "success";
  ToastType["Info"] = "info";
  ToastType["Warn"] = "warn";
  ToastType["Error"] = "error";
  return ToastType;
}({});
const BaseToast = ({
  title,
  body,
  toastType,
  onPress = () => null
}) => {
  const {
    TextTheme,
    borderRadius,
    borderWidth,
    ColorPalette
  } = useTheme();
  const {
    width
  } = useWindowDimensions();
  const iconSize = 24;
  let iconName = '';
  let backgroundColor = '';
  let borderColor = '';
  let iconColor = '';
  let textColor = '';
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      flexDirection: 'row',
      marginTop: 25,
      borderWidth,
      borderRadius
    },
    textContainer: {
      flexShrink: 1,
      marginVertical: 15,
      marginRight: 10
    },
    icon: {
      marginTop: 15,
      marginHorizontal: 15
    },
    title: {
      fontWeight: TextTheme.bold.fontWeight
    },
    body: {
      marginTop: 10
    }
  });
  switch (toastType) {
    case ToastType.Success:
      iconName = 'check-circle';
      backgroundColor = ColorPalette.notification.success;
      borderColor = ColorPalette.notification.successBorder;
      iconColor = ColorPalette.notification.successIcon;
      textColor = ColorPalette.notification.successText;
      break;
    case ToastType.Info:
      iconName = 'info';
      backgroundColor = ColorPalette.notification.info;
      borderColor = ColorPalette.notification.infoBorder;
      iconColor = ColorPalette.notification.infoIcon;
      textColor = ColorPalette.notification.infoText;
      break;
    case ToastType.Warn:
      iconName = 'report-problem';
      backgroundColor = ColorPalette.notification.warn;
      borderColor = ColorPalette.notification.warnBorder;
      iconColor = ColorPalette.notification.warnIcon;
      textColor = ColorPalette.notification.warnText;
      break;
    case ToastType.Error:
      iconName = 'error';
      backgroundColor = ColorPalette.notification.error;
      borderColor = ColorPalette.notification.errorBorder;
      iconColor = ColorPalette.notification.errorIcon;
      textColor = ColorPalette.notification.errorText;
      break;
    default:
      throw new Error('ToastType was not set correctly.');
  }
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    activeOpacity: 1,
    onPress: () => onPress()
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      backgroundColor,
      borderColor,
      width: width - width * 0.1
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1,
      flexDirection: 'row'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    style: styles.icon,
    name: iconName,
    color: iconColor,
    size: iconSize
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.textContainer
  }, /*#__PURE__*/React.createElement(ThemedText, {
    style: [styles.title, {
      color: textColor
    }],
    testID: testIdWithKey('ToastTitle')
  }, title), body && /*#__PURE__*/React.createElement(ThemedText, {
    style: [styles.body, {
      color: textColor
    }],
    testID: testIdWithKey('ToastBody')
  }, body))), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => {
      Toast.hide();
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    style: styles.icon,
    name: 'close',
    color: iconColor,
    size: iconSize
  })))));
};
export default BaseToast;
//# sourceMappingURL=BaseToast.js.map