"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _testable = require("../../utils/testable");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const timing = {
  toValue: 1,
  duration: 2000,
  useNativeDriver: true
};
const LoadingSpinner = ({
  size = 25,
  color
}) => {
  const rotationAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0));
  const rotation = rotationAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  (0, _react.useEffect)(() => {
    _reactNative.Animated.loop(_reactNative.Animated.timing(rotationAnim.current, timing)).start();
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: {
      transform: [{
        rotate: rotation
      }]
    }
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    style: {
      color
    },
    size: size,
    name: "refresh",
    testID: (0, _testable.testIdWithKey)('Loading')
  }));
};
var _default = exports.default = LoadingSpinner;
//# sourceMappingURL=LoadingSpinner.js.map