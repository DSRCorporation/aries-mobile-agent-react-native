function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import ActivityIndicator from '../../assets/img/activity-indicator-circle.svg';
import CheckInCircle from '../../assets/img/check-in-circle.svg';
import CredentialInHand from '../../assets/img/credential-in-hand.svg';
import { useTheme } from '../../contexts/theme';
const SentProof = () => {
  const {
    ColorPallet
  } = useTheme();
  const ringFadeAnim = useRef(new Animated.Value(1)).current;
  const checkFadeAnim = useRef(new Animated.Value(0)).current;
  const ringFadeTiming = {
    toValue: 0,
    duration: 600,
    useNativeDriver: true
  };
  const checkFadeTiming = {
    toValue: 1,
    duration: 600,
    useNativeDriver: true
  };
  const style = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center'
      // backgroundColor: 'red',
    },
    credential: {
      marginTop: 25
    },
    ring: {
      flexGrow: 3,
      position: 'absolute'
      // backgroundColor: 'yellow',
    },
    check: {
      position: 'absolute'
    }
  });
  const credentialInHandDisplayOptions = {
    fill: ColorPallet.notification.infoText,
    height: 130,
    width: 130
  };
  const animatedCircleDisplayOptions = {
    fill: ColorPallet.notification.infoText,
    height: 250,
    width: 250
  };
  useEffect(() => {
    // Animated.loop(
    Animated.parallel([Animated.timing(ringFadeAnim, ringFadeTiming), Animated.timing(checkFadeAnim, checkFadeTiming)]).start();
    // ).start()
    // Animated.loop(Animated.timing(rotationAnim, rotationTiming)).start()
  }, []);
  return /*#__PURE__*/React.createElement(View, {
    style: style.container
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(CredentialInHand, _extends({
    style: style.credential
  }, credentialInHandDisplayOptions)), /*#__PURE__*/React.createElement(Animated.View, {
    style: [{
      opacity: checkFadeAnim
    }, style.check]
  }, /*#__PURE__*/React.createElement(CheckInCircle, {
    height: 45,
    width: 45
  }))), /*#__PURE__*/React.createElement(View, {
    style: style.ring
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: {
      opacity: ringFadeAnim
    }
  }, /*#__PURE__*/React.createElement(ActivityIndicator, animatedCircleDisplayOptions))));
};
export default SentProof;
//# sourceMappingURL=SentProof.js.map