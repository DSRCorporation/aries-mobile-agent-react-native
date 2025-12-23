import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../contexts/theme';
const ButtonLoading = () => {
  const {
    ColorPallet
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
  useEffect(() => {
    Animated.loop(Animated.timing(rotationAnim, timing)).start();
  }, [rotationAnim]);
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: {
      transform: [{
        rotate: rotation
      }]
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    style: {
      color: ColorPallet.brand.icon
    },
    size: 25,
    name: "refresh"
  }));
};
export default ButtonLoading;
//# sourceMappingURL=ButtonLoading.js.map