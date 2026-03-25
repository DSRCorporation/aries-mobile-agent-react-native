"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _theme = require("../../contexts/theme");
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ProgressBar = ({
  progressPercent
}) => {
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const {
    width: windowWidth
  } = (0, _reactNative.useWindowDimensions)();
  const [progressBarScale] = (0, _react.useState)(new _reactNative.Animated.Value(0));
  (0, _react.useEffect)(() => {
    _reactNative.Animated.timing(progressBarScale, {
      toValue: progressPercent,
      duration: 300,
      useNativeDriver: true // allows for much smoother animation
    }).start();
  }, [progressBarScale, progressPercent]);
  const styles = _reactNative.StyleSheet.create({
    progressBarContainer: {
      width: '100%',
      height: 8,
      backgroundColor: ColorPalette.brand.primaryBackground
    },
    progressBar: {
      height: '100%',
      width: '100%',
      backgroundColor: ColorPalette.brand.highlight
    }
  });
  // scaleX rather than width is used for the progress bar as this allows useNativeDriver to be true
  const scaleX = progressBarScale.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1]
  });
  const animatedBarStyle = {
    // without these two translates, the progress would start from the center and expand outward, rather than start from the left
    transform: [{
      translateX: -(windowWidth / 2)
    }, {
      scaleX
    }, {
      translateX: windowWidth / 2
    }]
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.progressBarContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [_reactNative.StyleSheet.absoluteFill, styles.progressBar, animatedBarStyle]
  }));
};
var _default = exports.default = ProgressBar;
//# sourceMappingURL=ProgressBar.js.map