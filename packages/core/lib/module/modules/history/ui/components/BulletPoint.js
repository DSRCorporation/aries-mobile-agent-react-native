import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../../../../components/texts/ThemedText';
const styles = StyleSheet.create({
  pointsView: {
    flexDirection: 'row'
  },
  pointsBullet: {
    paddingLeft: 8
  },
  pointsText: {
    flex: 1,
    paddingLeft: 8
  }
});
const BulletPoint = ({
  pointsText,
  pointsTextAxsLabel,
  pointsTextAxsKey
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(View, {
    style: styles.pointsView,
    accessible: true
  }, /*#__PURE__*/React.createElement(ThemedText, {
    style: styles.pointsBullet
  }, '\u2022'), pointsTextAxsLabel ? /*#__PURE__*/React.createElement(ThemedText, {
    style: styles.pointsText,
    accessibilityLabel: pointsTextAxsLabel
  }, /*#__PURE__*/React.createElement(Trans, {
    i18nKey: pointsTextAxsKey,
    components: {
      b: /*#__PURE__*/React.createElement(ThemedText, {
        variant: "bold"
      })
    },
    t: t
  })) : /*#__PURE__*/React.createElement(ThemedText, {
    style: styles.pointsText
  }, pointsText));
};
export default BulletPoint;
//# sourceMappingURL=BulletPoint.js.map