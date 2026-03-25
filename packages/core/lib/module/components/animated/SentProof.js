function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../contexts/theme';
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
const SentProof = () => {
  const {
    ColorPalette,
    Assets
  } = useTheme();
  const ringFadeAnim = useRef(new Animated.Value(1));
  const checkFadeAnim = useRef(new Animated.Value(0));
  const style = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    credential: {
      marginTop: 25
    },
    ring: {
      flexGrow: 3,
      position: 'absolute'
    },
    check: {
      position: 'absolute'
    }
  });
  const credentialInHandDisplayOptions = {
    fill: ColorPalette.notification.infoText,
    height: 130,
    width: 130
  };
  const animatedCircleDisplayOptions = {
    fill: ColorPalette.notification.infoText,
    height: 250,
    width: 250
  };
  useEffect(() => {
    Animated.parallel([Animated.timing(ringFadeAnim.current, ringFadeTiming), Animated.timing(checkFadeAnim.current, checkFadeTiming)]).start();
  }, []);
  return /*#__PURE__*/React.createElement(View, {
    style: style.container
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Assets.svg.credentialInHand, _extends({
    style: style.credential
  }, credentialInHandDisplayOptions)), /*#__PURE__*/React.createElement(Animated.View, {
    style: [{
      opacity: checkFadeAnim.current
    }, style.check]
  }, /*#__PURE__*/React.createElement(Assets.svg.checkInCircle, {
    height: 45,
    width: 45
  }))), /*#__PURE__*/React.createElement(View, {
    style: style.ring
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: {
      opacity: ringFadeAnim.current
    }
  }, /*#__PURE__*/React.createElement(Assets.svg.activityIndicator, animatedCircleDisplayOptions))));
};
export default SentProof;
//# sourceMappingURL=SentProof.js.map