import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { testIdWithKey } from '../../utils/testable';
const timing = {
  toValue: 1,
  duration: 2000,
  useNativeDriver: true
};
const LoadingSpinner = ({
  size = 25,
  color
}) => {
  const rotationAnim = useRef(new Animated.Value(0));
  const rotation = rotationAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  useEffect(() => {
    Animated.loop(Animated.timing(rotationAnim.current, timing)).start();
  }, []);
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: {
      transform: [{
        rotate: rotation
      }]
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    style: {
      color
    },
    size: size,
    name: "refresh",
    testID: testIdWithKey('Loading')
  }));
};
export default LoadingSpinner;
//# sourceMappingURL=LoadingSpinner.js.map