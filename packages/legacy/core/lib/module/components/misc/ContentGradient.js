import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg';
/**
 * To be used in a relative position controlsContainer that is below (and not in) scrollview content
 */
const ContentGradient = ({
  backgroundColor,
  height = 30
}) => {
  const id = 'gradient';
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      height,
      width: '100%',
      top: -height
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Svg, {
    height: `${height}`,
    width: "100%",
    style: StyleSheet.absoluteFill
  }, /*#__PURE__*/React.createElement(Defs, null, /*#__PURE__*/React.createElement(LinearGradient, {
    id: id,
    x1: "0%",
    y1: "0%",
    x2: "0%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement(Stop, {
    offset: "0%",
    stopColor: backgroundColor,
    stopOpacity: 0
  }), /*#__PURE__*/React.createElement(Stop, {
    offset: "100%",
    stopColor: backgroundColor,
    stopOpacity: 1
  }))), /*#__PURE__*/React.createElement(Rect, {
    height: `${height}`,
    width: "100%",
    fill: `url(#${id})`
  })));
};
export default ContentGradient;
//# sourceMappingURL=ContentGradient.js.map