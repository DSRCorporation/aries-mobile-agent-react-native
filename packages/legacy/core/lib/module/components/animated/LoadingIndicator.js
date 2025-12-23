import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import ActivityIndicator from '../../assets/img/activity-indicator-circle.svg';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
const LoadingIndicator = () => {
  const {
    ColorPallet,
    Assets
  } = useTheme();
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const timing = {
    toValue: 1,
    duration: 2000,
    useNativeDriver: true
  };
  const rotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  const style = StyleSheet.create({
    animation: {
      position: 'absolute'
    }
  });
  const imageDisplayOptions = {
    fill: ColorPallet.notification.infoText,
    height: 200,
    width: 200
  };
  useEffect(() => {
    Animated.loop(Animated.timing(rotationAnim, timing)).start();
  }, [rotationAnim]);
  return /*#__PURE__*/React.createElement(View, {
    style: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    testID: testIdWithKey('LoadingActivityIndicator')
  }, /*#__PURE__*/React.createElement(Image, {
    source: Assets.img.logoPrimary.src,
    style: {
      width: Assets.img.logoPrimary.width,
      height: Assets.img.logoPrimary.height
    },
    testID: testIdWithKey('LoadingActivityIndicatorImage')
  }), /*#__PURE__*/React.createElement(Animated.View, {
    style: [style.animation, {
      transform: [{
        rotate: rotation
      }]
    }]
  }, /*#__PURE__*/React.createElement(ActivityIndicator, imageDisplayOptions)));
};
export default LoadingIndicator;
//# sourceMappingURL=LoadingIndicator.js.map