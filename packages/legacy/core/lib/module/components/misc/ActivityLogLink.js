import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
const ActivityLogLink = () => {
  const {
    ColorPallet
  } = useTheme();
  const {
    t
  } = useTranslation();
  const styles = StyleSheet.create({
    textContainer: {
      flexDirection: 'row'
    },
    text: {
      color: ColorPallet.notification.infoText
    },
    link: {
      color: ColorPallet.notification.infoText,
      textDecorationLine: 'underline'
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: styles.textContainer,
    testID: testIdWithKey('ActivityLogLink')
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.text
  }, t('ActivityLog.Your')), /*#__PURE__*/React.createElement(Text, null, " "), /*#__PURE__*/React.createElement(Text, {
    style: styles.link
  }, t('ActivityLog.Activity')), /*#__PURE__*/React.createElement(Text, null, " "), /*#__PURE__*/React.createElement(Text, {
    style: styles.text
  }, t('ActivityLog.Updated')));
};
export default ActivityLogLink;
//# sourceMappingURL=ActivityLogLink.js.map