"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _activityIndicatorCircle = _interopRequireDefault(require("../../assets/img/activity-indicator-circle.svg"));
var _chatLoading = _interopRequireDefault(require("../../assets/img/chat-loading.svg"));
var _theme = require("../../contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const PresentationLoading = () => {
  const {
    ColorPallet
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
    container: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    animation: {
      position: 'absolute',
      zIndex: 1
    }
  });
  const displayOptions = {
    fill: ColorPallet.notification.infoText
  };
  const animatedCircleDisplayOptions = {
    fill: ColorPallet.notification.infoText,
    height: 250,
    width: 250
  };
  (0, _react.useEffect)(() => {
    _reactNative.Animated.loop(_reactNative.Animated.timing(rotationAnim, timing)).start();
  }, [rotationAnim]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container
  }, /*#__PURE__*/_react.default.createElement(_chatLoading.default, _extends({
    style: style.animation
  }, displayOptions)), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: {
      transform: [{
        rotate: rotation
      }]
    }
  }, /*#__PURE__*/_react.default.createElement(_activityIndicatorCircle.default, animatedCircleDisplayOptions)));
};
var _default = exports.default = PresentationLoading;
//# sourceMappingURL=PresentationLoading.js.map