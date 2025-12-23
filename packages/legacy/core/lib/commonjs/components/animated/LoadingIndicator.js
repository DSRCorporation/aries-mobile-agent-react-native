"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _activityIndicatorCircle = _interopRequireDefault(require("../../assets/img/activity-indicator-circle.svg"));
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const LoadingIndicator = () => {
  const {
    ColorPallet,
    Assets
  } = (0, _theme.useTheme)();
  const rotationAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const timing = {
    toValue: 1,
    duration: 2000,
    useNativeDriver: true
  };
  const rotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  const style = _reactNative.StyleSheet.create({
    animation: {
      position: 'absolute'
    }
  });
  const imageDisplayOptions = {
    fill: ColorPallet.notification.infoText,
    height: 200,
    width: 200
  };
  (0, _react.useEffect)(() => {
    _reactNative.Animated.loop(_reactNative.Animated.timing(rotationAnim, timing)).start();
  }, [rotationAnim]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    testID: (0, _testable.testIdWithKey)('LoadingActivityIndicator')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: Assets.img.logoPrimary.src,
    style: {
      width: Assets.img.logoPrimary.width,
      height: Assets.img.logoPrimary.height
    },
    testID: (0, _testable.testIdWithKey)('LoadingActivityIndicatorImage')
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [style.animation, {
      transform: [{
        rotate: rotation
      }]
    }]
  }, /*#__PURE__*/_react.default.createElement(_activityIndicatorCircle.default, imageDisplayOptions)));
};
var _default = exports.default = LoadingIndicator;
//# sourceMappingURL=LoadingIndicator.js.map