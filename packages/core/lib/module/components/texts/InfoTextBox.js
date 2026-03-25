import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../contexts/theme';
import { InfoBoxType } from '../misc/InfoBox';
import { ThemedText } from './ThemedText';
const iconSize = 30;
const offset = 10;
const InfoTextBox = ({
  children,
  type = InfoBoxType.Info,
  iconVerticalPosition = 'high',
  iconHorizontalPosition = 'left',
  style = {},
  textStyle = {}
}) => {
  const {
    ColorPalette
  } = useTheme();
  const styles = StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      backgroundColor: ColorPalette.notification.info,
      borderColor: ColorPalette.notification.infoBorder,
      ...style
    },
    row: {
      flexDirection: iconHorizontalPosition === 'left' ? 'row' : 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    text: {
      alignSelf: 'center',
      flex: 1,
      flexWrap: 'wrap',
      color: ColorPalette.notification.infoText,
      ...textStyle
    },
    iconContainer: {
      marginRight: iconHorizontalPosition === 'left' ? offset : 0,
      marginLeft: iconHorizontalPosition === 'right' ? offset : 0,
      alignSelf: iconVerticalPosition === 'high' ? 'flex-start' : 'center'
    }
  });
  let iconName = 'info';
  let iconColor = ColorPalette.notification.infoIcon;
  switch (type) {
    case InfoBoxType.Info:
      break;
    case InfoBoxType.Success:
      iconName = 'check-circle';
      iconColor = ColorPalette.notification.successIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPalette.notification.success,
        borderColor: ColorPalette.notification.successBorder
      };
      styles.text = {
        ...styles.text,
        color: ColorPalette.notification.successText
      };
      break;
    case InfoBoxType.Warn:
      iconName = 'warning';
      iconColor = ColorPalette.notification.warnIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPalette.notification.warn,
        borderColor: ColorPalette.notification.warnBorder
      };
      styles.text = {
        ...styles.text,
        color: ColorPalette.notification.warnText
      };
      break;
    case InfoBoxType.Error:
      iconName = 'error';
      iconColor = ColorPalette.notification.errorIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPalette.notification.error,
        borderColor: ColorPalette.notification.errorBorder
      };
      styles.text = {
        ...styles.text,
        color: ColorPalette.notification.errorText
      };
      break;
    default:
      throw new Error('InfoTextBox type needs to be set correctly');
  }
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.row
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.iconContainer
  }, /*#__PURE__*/React.createElement(Icon, {
    name: iconName,
    size: iconSize,
    color: iconColor
  })), typeof children === 'string' ? /*#__PURE__*/React.createElement(ThemedText, {
    variant: "bold",
    style: styles.text
  }, children) : /*#__PURE__*/React.createElement(React.Fragment, null, children)));
};
export default InfoTextBox;
//# sourceMappingURL=InfoTextBox.js.map