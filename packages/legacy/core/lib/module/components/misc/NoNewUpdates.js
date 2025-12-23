import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
import InfoTextBox from '../texts/InfoTextBox';
const NoNewUpdates = () => {
  const {
    t
  } = useTranslation();
  const {
    HomeTheme,
    ColorPallet
  } = useTheme();
  const styles = StyleSheet.create({
    noNewUpdatesContainer: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      backgroundColor: ColorPallet.brand.secondaryBackground
    },
    noNewUpdatesText: {
      ...HomeTheme.noNewUpdatesText,
      alignSelf: 'center',
      flex: 1,
      flexWrap: 'wrap'
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: styles.noNewUpdatesContainer
  }, /*#__PURE__*/React.createElement(InfoTextBox, null, /*#__PURE__*/React.createElement(Text, {
    style: styles.noNewUpdatesText,
    testID: testIdWithKey('NoNewUpdates')
  }, t('Home.NoNewUpdates'))));
};
export default NoNewUpdates;
//# sourceMappingURL=NoNewUpdates.js.map