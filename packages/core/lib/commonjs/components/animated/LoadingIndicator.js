"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const timing = {
  toValue: 1,
  duration: 2000,
  useNativeDriver: true
};
const LoadingIndicator = () => {
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
    animation: {
      position: 'absolute'
    }
  });
  const imageDisplayOptions = {
    fill: ColorPalette.notification.infoText,
    height: 200,
    width: 200
  };
  (0, _react.useEffect)(() => {
    _reactNative.Animated.loop(_reactNative.Animated.timing(rotationAnim.current, timing)).start();
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    testID: (0, _testable.testIdWithKey)('LoadingActivityIndicator')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: Assets.img.logoSecondary.src,
    style: {
      width: Assets.img.logoSecondary.width,
      height: Assets.img.logoSecondary.height,
      objectFit: 'contain'
    },
    testID: (0, _testable.testIdWithKey)('LoadingActivityIndicatorImage')
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [style.animation, {
      transform: [{
        rotate: rotation
      }]
    }]
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.activityIndicator, imageDisplayOptions)));
};
var _default = exports.default = LoadingIndicator;
//# sourceMappingURL=LoadingIndicator.js.map