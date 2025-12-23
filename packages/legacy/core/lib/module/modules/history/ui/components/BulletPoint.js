import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { TextTheme } from '../../../../theme';
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
  }, /*#__PURE__*/React.createElement(Text, {
    style: [TextTheme.normal, styles.pointsBullet]
  }, '\u2022'), pointsTextAxsLabel ? /*#__PURE__*/React.createElement(Text, {
    style: [TextTheme.normal, styles.pointsText],
    accessibilityLabel: pointsTextAxsLabel
  }, /*#__PURE__*/React.createElement(Trans, {
    i18nKey: pointsTextAxsKey,
    components: {
      b: /*#__PURE__*/React.createElement(Text, {
        style: TextTheme.bold
      })
    },
    t: t
  })) : /*#__PURE__*/React.createElement(Text, {
    style: [TextTheme.normal, styles.pointsText]
  }, pointsText));
};
export default BulletPoint;
//# sourceMappingURL=BulletPoint.js.map