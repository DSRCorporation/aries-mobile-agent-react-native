import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../contexts/theme';
const slideTiming = {
  toValue: -15,
  duration: 1400,
  useNativeDriver: true
};
const fadeTiming = {
  toValue: 1,
  duration: 400,
  useNativeDriver: true
};
const animationDelay = 300;
const CredentialPending = () => {
  const {
    Assets
  } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0));
  const tranAnim = useRef(new Animated.Value(-90));
  const animation = useRef(null);
  const style = StyleSheet.create({
    container: {
      flexDirection: 'column'
    },
    back: {
      backgroundColor: 'transparent',
      position: 'absolute',
      marginTop: -30
    },
    front: {
      backgroundColor: 'transparent'
    },
    card: {
      backgroundColor: 'transparent',
      position: 'absolute',
      marginLeft: 10
    }
  });
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!(Animated !== null && Animated !== void 0 && Animated.loop) || !(Animated !== null && Animated !== void 0 && Animated.sequence) || !(Animated !== null && Animated !== void 0 && Animated.timing)) {
        return;
      }
      animation.current = Animated.loop(Animated.sequence([Animated.timing(fadeAnim.current, fadeTiming), Animated.timing(tranAnim.current, slideTiming)]));
      animation.current.start();
    }, animationDelay);
    return () => {
      var _animation$current, _animation$current$st;
      clearTimeout(timeout);
      (_animation$current = animation.current) === null || _animation$current === void 0 || (_animation$current$st = _animation$current.stop) === null || _animation$current$st === void 0 || _animation$current$st.call(_animation$current);
    };
  }, []);
  return /*#__PURE__*/React.createElement(View, {
    style: style.container
  }, /*#__PURE__*/React.createElement(Assets.svg.walletBack, {
    style: style.back,
    height: 110,
    width: 110
  }), /*#__PURE__*/React.createElement(Animated.View, {
    style: {
      opacity: fadeAnim.current,
      transform: [{
        translateY: tranAnim.current
      }]
    }
  }, /*#__PURE__*/React.createElement(Assets.svg.credentialCard, {
    style: style.card,
    height: 110,
    width: 110
  })), /*#__PURE__*/React.createElement(Assets.svg.walletFront, {
    style: style.front,
    height: 140,
    width: 140
  }));
};
export default CredentialPending;
//# sourceMappingURL=CredentialPending.js.map