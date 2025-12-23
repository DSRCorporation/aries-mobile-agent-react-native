import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { hitSlop } from '../../constants';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
// eslint-disable-next-line import/no-named-as-default
import Button, { ButtonType } from '../buttons/Button';
import { TOKENS, useServices } from '../../container-api';
const iconSize = 30;
export let InfoBoxType = /*#__PURE__*/function (InfoBoxType) {
  InfoBoxType[InfoBoxType["Info"] = 0] = "Info";
  InfoBoxType[InfoBoxType["Success"] = 1] = "Success";
  InfoBoxType[InfoBoxType["Warn"] = 2] = "Warn";
  InfoBoxType[InfoBoxType["Error"] = 3] = "Error";
  return InfoBoxType;
}({});
const InfoBox = ({
  notificationType,
  title,
  description,
  bodyContent,
  message,
  secondaryCallToActionTitle,
  secondaryCallToActionPressed,
  onCallToActionPressed,
  onCallToActionLabel,
  onClosePressed
}) => {
  const {
    width
  } = useWindowDimensions();
  const {
    t
  } = useTranslation();
  const {
    TextTheme,
    ColorPallet
  } = useTheme();
  const [showDetails, setShowDetails] = useState(false);
  const [{
    showDetailsInfo
  }] = useServices([TOKENS.CONFIG]);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: ColorPallet.brand.modalPrimaryBackground,
      borderColor: ColorPallet.notification.infoBorder,
      borderRadius: 5,
      borderWidth: 1,
      padding: 10,
      minWidth: width - 2 * 25
    },
    headerContainer: {
      flexDirection: 'row',
      paddingHorizontal: 5,
      paddingTop: 5
    },
    bodyContainer: {
      flexDirection: 'column',
      marginLeft: 10 + iconSize,
      paddingHorizontal: 5,
      paddingBottom: 5,
      flexGrow: 0
    },
    headerText: {
      ...TextTheme.bold,
      marginLeft: 7,
      flexShrink: 1,
      alignSelf: 'center',
      color: ColorPallet.notification.infoText
    },
    bodyText: {
      ...TextTheme.normal,
      flexShrink: 1,
      marginVertical: 16,
      color: ColorPallet.notification.infoText
    },
    icon: {
      marginRight: 10,
      alignSelf: 'center'
    },
    showDetailsText: {
      ...TextTheme.title,
      fontWeight: TextTheme.normal.fontWeight,
      color: ColorPallet.brand.link
    }
  });
  let iconName = 'info';
  let iconColor = ColorPallet.notification.infoIcon;
  switch (notificationType) {
    case InfoBoxType.Info:
      iconName = 'info';
      iconColor = ColorPallet.notification.infoIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPallet.notification.info,
        borderColor: ColorPallet.notification.infoBorder
      };
      styles.headerText = {
        ...styles.headerText,
        color: ColorPallet.notification.infoText
      };
      styles.bodyText = {
        ...styles.bodyText,
        color: ColorPallet.notification.infoText
      };
      break;
    case InfoBoxType.Success:
      iconName = 'check-circle';
      iconColor = ColorPallet.notification.successIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPallet.notification.success,
        borderColor: ColorPallet.notification.successBorder
      };
      styles.headerText = {
        ...styles.headerText,
        color: ColorPallet.notification.successText
      };
      styles.bodyText = {
        ...styles.bodyText,
        color: ColorPallet.notification.successText
      };
      break;
    case InfoBoxType.Warn:
      iconName = 'warning';
      iconColor = ColorPallet.notification.warnIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPallet.notification.warn,
        borderColor: ColorPallet.notification.warnBorder
      };
      styles.headerText = {
        ...styles.headerText,
        color: ColorPallet.notification.warnText
      };
      styles.bodyText = {
        ...styles.bodyText,
        color: ColorPallet.notification.warnText
      };
      break;
    case InfoBoxType.Error:
      iconName = 'error';
      iconColor = ColorPallet.notification.errorIcon;
      styles.container = {
        ...styles.container,
        backgroundColor: ColorPallet.notification.error,
        borderColor: ColorPallet.notification.errorBorder
      };
      styles.headerText = {
        ...styles.headerText,
        color: ColorPallet.notification.errorText
      };
      styles.bodyText = {
        ...styles.bodyText,
        color: ColorPallet.notification.errorText
      };
      break;
    default:
      throw new Error('InfoTextBoxType needs to be set correctly');
  }
  const onShowDetailsTouched = () => {
    setShowDetails(true);
  };
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.headerContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.icon, {
      flexDirection: 'row'
    }]
  }, /*#__PURE__*/React.createElement(Icon, {
    accessible: false,
    name: iconName,
    size: iconSize,
    color: iconColor
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.headerText,
    testID: testIdWithKey('HeaderText')
  }, title)), onClosePressed && /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(TouchableOpacity, {
    accessibilityLabel: t('Global.Dismiss'),
    accessibilityRole: 'button',
    testID: testIdWithKey(`Dismiss${notificationType}`),
    onPress: onClosePressed,
    hitSlop: hitSlop
  }, /*#__PURE__*/React.createElement(Icon, {
    name: 'close',
    size: iconSize,
    color: ColorPallet.notification.infoIcon
  })))), /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.bodyContainer
  }, /*#__PURE__*/React.createElement(React.Fragment, null, !showDetails ? bodyContent : null, (description || message && showDetails) && /*#__PURE__*/React.createElement(Text, {
    style: styles.bodyText,
    testID: testIdWithKey('BodyText')
  }, showDetails ? message : description), message && !showDetails && (showDetailsInfo ?? true) && /*#__PURE__*/React.createElement(TouchableOpacity, {
    accessibilityLabel: t('Global.ShowDetails'),
    testID: testIdWithKey('ShowDetails'),
    style: {
      marginVertical: 14
    },
    onPress: onShowDetailsTouched,
    hitSlop: hitSlop
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row'
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.showDetailsText
  }, t('Global.ShowDetails'), " "), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: iconSize,
    color: ColorPallet.brand.link
  }))), onCallToActionPressed && /*#__PURE__*/React.createElement(View, {
    style: {
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    title: onCallToActionLabel || t('Global.Okay'),
    accessibilityLabel: onCallToActionLabel || t('Global.Okay'),
    testID: onCallToActionLabel ? testIdWithKey(onCallToActionLabel) : testIdWithKey('Okay'),
    buttonType: ButtonType.Primary,
    onPress: onCallToActionPressed
  })), secondaryCallToActionTitle && secondaryCallToActionPressed && /*#__PURE__*/React.createElement(View, {
    style: {
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    title: secondaryCallToActionTitle,
    accessibilityLabel: secondaryCallToActionTitle,
    testID: testIdWithKey(secondaryCallToActionTitle),
    buttonType: ButtonType.Secondary,
    onPress: secondaryCallToActionPressed
  })))));
};
export default InfoBox;
//# sourceMappingURL=InfoBox.js.map