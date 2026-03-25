import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { ThemedText } from '../texts/ThemedText';
const PushNotificationsContent = () => {
  const {
    t
  } = useTranslation();
  const {
    TextTheme,
    Assets
  } = useTheme();
  const list = [t('PushNotifications.BulletOne'), t('PushNotifications.BulletTwo'), t('PushNotifications.BulletThree'), t('PushNotifications.BulletFour')];
  const style = StyleSheet.create({
    image: {
      height: 200,
      marginBottom: 20
    },
    heading: {
      marginBottom: 20
    },
    listItem: {
      ...TextTheme.normal,
      flex: 1,
      paddingLeft: 5
    }
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: style.image
  }, /*#__PURE__*/React.createElement(Assets.svg.pushNotificationImg, null)), /*#__PURE__*/React.createElement(ThemedText, {
    variant: "headingThree",
    style: style.heading
  }, t('PushNotifications.EnableNotifications')), /*#__PURE__*/React.createElement(ThemedText, null, t('PushNotifications.BeNotified')), list.map((item, index) => /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      marginTop: 20
    },
    key: index
  }, /*#__PURE__*/React.createElement(ThemedText, null, '\u2022'), /*#__PURE__*/React.createElement(ThemedText, {
    style: style.listItem
  }, item))));
};
export default PushNotificationsContent;
//# sourceMappingURL=PushNotificationsContent.js.map