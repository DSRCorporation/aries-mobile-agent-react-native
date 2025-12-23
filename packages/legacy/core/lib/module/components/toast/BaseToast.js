import React from 'react';
import { View, Text, useWindowDimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
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
    ColorPallet
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
      backgroundColor = ColorPallet.notification.success;
      borderColor = ColorPallet.notification.successBorder;
      iconColor = ColorPallet.notification.successIcon;
      textColor = ColorPallet.notification.successText;
      break;
    case ToastType.Info:
      iconName = 'info';
      backgroundColor = ColorPallet.notification.info;
      borderColor = ColorPallet.notification.infoBorder;
      iconColor = ColorPallet.notification.infoIcon;
      textColor = ColorPallet.notification.infoText;
      break;
    case ToastType.Warn:
      iconName = 'report-problem';
      backgroundColor = ColorPallet.notification.warn;
      borderColor = ColorPallet.notification.warnBorder;
      iconColor = ColorPallet.notification.warnIcon;
      textColor = ColorPallet.notification.warnText;
      break;
    case ToastType.Error:
      iconName = 'error';
      backgroundColor = ColorPallet.notification.error;
      borderColor = ColorPallet.notification.errorBorder;
      iconColor = ColorPallet.notification.errorIcon;
      textColor = ColorPallet.notification.errorText;
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
  }, /*#__PURE__*/React.createElement(Icon, {
    style: styles.icon,
    name: iconName,
    color: iconColor,
    size: iconSize
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.textContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: [TextTheme.normal, styles.title, {
      color: textColor
    }],
    testID: testIdWithKey('ToastTitle')
  }, title), /*#__PURE__*/React.createElement(Text, {
    style: [TextTheme.normal, styles.body, {
      color: textColor
    }],
    testID: testIdWithKey('ToastBody')
  }, body))));
};
export default BaseToast;
//# sourceMappingURL=BaseToast.js.map