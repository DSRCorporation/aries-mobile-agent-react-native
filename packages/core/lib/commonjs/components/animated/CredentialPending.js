"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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
  } = (0, _theme.useTheme)();
  const fadeAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0));
  const tranAnim = (0, _react.useRef)(new _reactNative.Animated.Value(-90));
  const animation = (0, _react.useRef)(null);
  const style = _reactNative.StyleSheet.create({
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
  (0, _react.useEffect)(() => {
    const timeout = setTimeout(() => {
      if (!(_reactNative.Animated !== null && _reactNative.Animated !== void 0 && _reactNative.Animated.loop) || !(_reactNative.Animated !== null && _reactNative.Animated !== void 0 && _reactNative.Animated.sequence) || !(_reactNative.Animated !== null && _reactNative.Animated !== void 0 && _reactNative.Animated.timing)) {
        return;
      }
      animation.current = _reactNative.Animated.loop(_reactNative.Animated.sequence([_reactNative.Animated.timing(fadeAnim.current, fadeTiming), _reactNative.Animated.timing(tranAnim.current, slideTiming)]));
      animation.current.start();
    }, animationDelay);
    return () => {
      var _animation$current, _animation$current$st;
      clearTimeout(timeout);
      (_animation$current = animation.current) === null || _animation$current === void 0 || (_animation$current$st = _animation$current.stop) === null || _animation$current$st === void 0 || _animation$current$st.call(_animation$current);
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.walletBack, {
    style: style.back,
    height: 110,
    width: 110
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: {
      opacity: fadeAnim.current,
      transform: [{
        translateY: tranAnim.current
      }]
    }
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.credentialCard, {
    style: style.card,
    height: 110,
    width: 110
  })), /*#__PURE__*/_react.default.createElement(Assets.svg.walletFront, {
    style: style.front,
    height: 140,
    width: 140
  }));
};
var _default = exports.default = CredentialPending;
//# sourceMappingURL=CredentialPending.js.map