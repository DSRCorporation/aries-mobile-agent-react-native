import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
const timing = {
  toValue: 1,
  duration: 2000,
  useNativeDriver: true
};
const LoadingIndicator = () => {
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
    animation: {
      position: 'absolute'
    }
  });
  const imageDisplayOptions = {
    fill: ColorPalette.notification.infoText,
    height: 200,
    width: 200
  };
  useEffect(() => {
    Animated.loop(Animated.timing(rotationAnim.current, timing)).start();
  }, []);
  return /*#__PURE__*/React.createElement(View, {
    style: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    testID: testIdWithKey('LoadingActivityIndicator')
  }, /*#__PURE__*/React.createElement(Image, {
    source: Assets.img.logoSecondary.src,
    style: {
      width: Assets.img.logoSecondary.width,
      height: Assets.img.logoSecondary.height,
      objectFit: 'contain'
    },
    testID: testIdWithKey('LoadingActivityIndicatorImage')
  }), /*#__PURE__*/React.createElement(Animated.View, {
    style: [style.animation, {
      transform: [{
        rotate: rotation
      }]
    }]
  }, /*#__PURE__*/React.createElement(Assets.svg.activityIndicator, imageDisplayOptions)));
};
export default LoadingIndicator;
//# sourceMappingURL=LoadingIndicator.js.map