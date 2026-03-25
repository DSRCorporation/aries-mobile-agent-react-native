import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { ThemedText } from '../texts/ThemedText';
const PushNotificationsDisabledContent = () => {
  const {
    t
  } = useTranslation();
  const {
    TextTheme
  } = useTheme();
  const settingsInstructions = [t('PushNotifications.InstructionsOne'), t('PushNotifications.InstructionsTwo'), t('PushNotifications.InstructionsThree')];
  const style = StyleSheet.create({
    heading: {
      marginBottom: 20
    },
    listItem: {
      ...TextTheme.normal,
      flex: 1,
      paddingLeft: 5
    }
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "headingThree",
    style: style.heading
  }, t('PushNotifications.EnableNotifications')), /*#__PURE__*/React.createElement(ThemedText, null, t('PushNotifications.NotificationsOffMessage')), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "bold"
  }, t('PushNotifications.NotificationsOffTitle')), /*#__PURE__*/React.createElement(ThemedText, null, t('PushNotifications.NotificationsInstructionTitle')), settingsInstructions.map((item, index) => /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      marginTop: 20
    },
    key: index
  }, /*#__PURE__*/React.createElement(ThemedText, null, `${index + 1}. `), /*#__PURE__*/React.createElement(ThemedText, {
    style: style.listItem
  }, item)))));
};
export default PushNotificationsDisabledContent;
//# sourceMappingURL=PushNotificationsDisabledContent.js.map