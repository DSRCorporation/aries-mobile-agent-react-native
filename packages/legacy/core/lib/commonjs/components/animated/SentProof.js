"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _activityIndicatorCircle = _interopRequireDefault(require("../../assets/img/activity-indicator-circle.svg"));
var _checkInCircle = _interopRequireDefault(require("../../assets/img/check-in-circle.svg"));
var _credentialInHand = _interopRequireDefault(require("../../assets/img/credential-in-hand.svg"));
var _theme = require("../../contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const SentProof = () => {
  const {
    ColorPallet
  } = (0, _theme.useTheme)();
  const ringFadeAnim = (0, _react.useRef)(new _reactNative.Animated.Value(1)).current;
  const checkFadeAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
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
  const style = _reactNative.StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center'
      // backgroundColor: 'red',
    },
    credential: {
      marginTop: 25
    },
    ring: {
      flexGrow: 3,
      position: 'absolute'
      // backgroundColor: 'yellow',
    },
    check: {
      position: 'absolute'
    }
  });
  const credentialInHandDisplayOptions = {
    fill: ColorPallet.notification.infoText,
    height: 130,
    width: 130
  };
  const animatedCircleDisplayOptions = {
    fill: ColorPallet.notification.infoText,
    height: 250,
    width: 250
  };
  (0, _react.useEffect)(() => {
    // Animated.loop(
    _reactNative.Animated.parallel([_reactNative.Animated.timing(ringFadeAnim, ringFadeTiming), _reactNative.Animated.timing(checkFadeAnim, checkFadeTiming)]).start();
    // ).start()
    // Animated.loop(Animated.timing(rotationAnim, rotationTiming)).start()
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_credentialInHand.default, _extends({
    style: style.credential
  }, credentialInHandDisplayOptions)), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [{
      opacity: checkFadeAnim
    }, style.check]
  }, /*#__PURE__*/_react.default.createElement(_checkInCircle.default, {
    height: 45,
    width: 45
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.ring
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: {
      opacity: ringFadeAnim
    }
  }, /*#__PURE__*/_react.default.createElement(_activityIndicatorCircle.default, animatedCircleDisplayOptions))));
};
var _default = exports.default = SentProof;
//# sourceMappingURL=SentProof.js.map