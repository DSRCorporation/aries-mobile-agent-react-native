import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/theme';
export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '200%',
    height: '200%',
    marginTop: -220
  },
  watermarkText: {
    opacity: 0.16,
    marginLeft: -80,
    transform: [{
      rotate: '-30deg'
    }],
    overflow: 'hidden'
  }
});
const CardWatermark = ({
  watermark,
  style,
  height,
  width
}) => {
  const {
    TextTheme
  } = useTheme();
  const fontSize = Number((style === null || style === void 0 ? void 0 : style.fontSize) ?? TextTheme.headingFour.fontSize);
  const watermarkText = `${watermark} `.repeat(Math.ceil(width / (Math.cos(30) * (fontSize / 2 * (watermark.length + 1)))));
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, Array.from({
    length: Math.ceil(height * 2 / fontSize + 1)
  }).map((_, i) => /*#__PURE__*/React.createElement(Text, {
    accessible: false,
    key: i,
    numberOfLines: 1,
    style: StyleSheet.compose({
      ...styles.watermarkText,
      ...{
        fontSize
      }
    }, style)
  }, watermarkText)));
};
export default CardWatermark;
//# sourceMappingURL=CardWatermark.js.map