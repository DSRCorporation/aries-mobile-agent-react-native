"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpotCutout = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSvg = require("react-native-svg");
var _tourContext = require("../../contexts/tour/tour-context");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const AnimatedRectangle = _reactNative.Animated.createAnimatedComponent(_reactNativeSvg.Rect);
const SpotCutout = () => {
  const {
    spot
  } = (0, _react.useContext)(_tourContext.TourContext);
  const spotPadding = 20;
  const start = (0, _react.useRef)(new _reactNative.Animated.ValueXY({
    x: 0,
    y: 0
  }));
  const width = (0, _react.useRef)(new _reactNative.Animated.Value(0));
  const height = (0, _react.useRef)(new _reactNative.Animated.Value(0));
  (0, _react.useEffect)(() => {
    const {
      height: spotHeight,
      width: spotWidth,
      x,
      y
    } = spot;
    const w = spotWidth + spotPadding;
    const h = spotHeight + spotPadding;
    const paddedX = x - spotPadding / 2;
    const paddedY = y - spotPadding / 2;
    const transition = () => {
      return _reactNative.Animated.parallel([_reactNative.Animated.timing(start.current, {
        duration: 500,
        easing: _reactNative.Easing.out(_reactNative.Easing.exp),
        toValue: {
          x: paddedX,
          y: paddedY
        },
        useNativeDriver: false
      }), _reactNative.Animated.timing(width.current, {
        duration: 500,
        easing: _reactNative.Easing.out(_reactNative.Easing.exp),
        toValue: w,
        useNativeDriver: false
      }), _reactNative.Animated.timing(height.current, {
        duration: 500,
        easing: _reactNative.Easing.out(_reactNative.Easing.exp),
        toValue: h,
        useNativeDriver: false
      })]);
    };
    transition().start();
  }, [spot.height, spot.width, spot.x, spot.y]);
  if ([spot.height, spot.width].every(value => value <= 0)) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement(AnimatedRectangle, {
    width: width.current,
    height: height.current,
    x: start.current.x,
    y: start.current.y,
    opacity: 1,
    rx: 10,
    fill: "black"
  });
};
exports.SpotCutout = SpotCutout;
//# sourceMappingURL=SpotCutout.js.map