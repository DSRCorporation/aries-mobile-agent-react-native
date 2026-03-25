function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../contexts/theme';
const timing = {
  toValue: 1,
  duration: 2000,
  useNativeDriver: true
};
const PresentationLoading = () => {
  const {
    ColorPalette,
    Assets
  } = useTheme();
  const rotationAnim = useRef(new Animated.Value(0));
  const rotation = rotationAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  const style = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    animation: {
      position: 'absolute',
      zIndex: 1
    }
  });
  const displayOptions = {
    fill: ColorPalette.notification.infoText
  };
  const animatedCircleDisplayOptions = {
    fill: ColorPalette.notification.infoText,
    height: 250,
    width: 250
  };
  useEffect(() => {
    Animated.loop(Animated.timing(rotationAnim.current, timing)).start();
  }, []);
  return /*#__PURE__*/React.createElement(View, {
    style: style.container
  }, /*#__PURE__*/React.createElement(Assets.svg.chatLoading, _extends({
    style: style.animation
  }, displayOptions)), /*#__PURE__*/React.createElement(Animated.View, {
    style: {
      transform: [{
        rotate: rotation
      }]
    }
  }, /*#__PURE__*/React.createElement(Assets.svg.activityIndicator, animatedCircleDisplayOptions)));
};
export default PresentationLoading;
//# sourceMappingURL=PresentationLoading.js.map