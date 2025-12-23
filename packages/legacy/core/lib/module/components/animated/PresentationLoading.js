function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import ActivityIndicator from '../../assets/img/activity-indicator-circle.svg';
import ChatLoading from '../../assets/img/chat-loading.svg';
import { useTheme } from '../../contexts/theme';
const PresentationLoading = () => {
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
    fill: ColorPallet.notification.infoText
  };
  const animatedCircleDisplayOptions = {
    fill: ColorPallet.notification.infoText,
    height: 250,
    width: 250
  };
  useEffect(() => {
    Animated.loop(Animated.timing(rotationAnim, timing)).start();
  }, [rotationAnim]);
  return /*#__PURE__*/React.createElement(View, {
    style: style.container
  }, /*#__PURE__*/React.createElement(ChatLoading, _extends({
    style: style.animation
  }, displayOptions)), /*#__PURE__*/React.createElement(Animated.View, {
    style: {
      transform: [{
        rotate: rotation
      }]
    }
  }, /*#__PURE__*/React.createElement(ActivityIndicator, animatedCircleDisplayOptions)));
};
export default PresentationLoading;
//# sourceMappingURL=PresentationLoading.js.map