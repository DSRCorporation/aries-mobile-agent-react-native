"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const timing = {
  toValue: 1,
  duration: 2000,
  useNativeDriver: true
};
const ConnectionLoading = () => {
  const {
    ColorPalette,
    Assets
  } = (0, _theme.useTheme)();
  const rotationAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0));
  const rotation = rotationAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  const style = _reactNative.StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    animation: {
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
  (0, _react.useEffect)(() => {
    _reactNative.Animated.loop(_reactNative.Animated.timing(rotationAnim.current, timing)).start();
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.wallet, _extends({
    style: style.animation
  }, credentialInHandDisplayOptions)), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: {
      transform: [{
        rotate: rotation
      }]
    }
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.activityIndicator, animatedCircleDisplayOptions)));
};
var _default = exports.default = ConnectionLoading;
//# sourceMappingURL=ConnectionLoading.js.map