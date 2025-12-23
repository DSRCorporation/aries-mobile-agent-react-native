"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _checkInCircle = _interopRequireDefault(require("../../assets/img/check-in-circle.svg"));
var _credentialCard = _interopRequireDefault(require("../../assets/img/credential-card.svg"));
var _walletBack = _interopRequireDefault(require("../../assets/img/wallet-back.svg"));
var _walletFront = _interopRequireDefault(require("../../assets/img/wallet-front.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CredentialAdded = () => {
  const cardFadeAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const checkFadeAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const tranAnim = (0, _react.useRef)(new _reactNative.Animated.Value(-90)).current;
  const slideTiming = {
    toValue: -15,
    duration: 1200,
    useNativeDriver: true
  };
  const fadeTiming = {
    toValue: 1,
    duration: 600,
    useNativeDriver: true
  };
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
    },
    check: {
      alignItems: 'center',
      marginBottom: 10
    }
  });
  (0, _react.useEffect)(() => {
    const animationDelay = 300;
    setTimeout(() => {
      _reactNative.Animated.sequence([_reactNative.Animated.timing(cardFadeAnim, fadeTiming), _reactNative.Animated.timing(tranAnim, slideTiming), _reactNative.Animated.timing(checkFadeAnim, fadeTiming)]).start();
    }, animationDelay);
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [{
      opacity: checkFadeAnim
    }, style.check]
  }, /*#__PURE__*/_react.default.createElement(_checkInCircle.default, {
    height: 45,
    width: 45
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_walletBack.default, {
    style: style.back,
    height: 110,
    width: 110
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: {
      opacity: cardFadeAnim,
      transform: [{
        translateY: tranAnim
      }]
    }
  }, /*#__PURE__*/_react.default.createElement(_credentialCard.default, {
    style: style.card,
    height: 110,
    width: 110
  })), /*#__PURE__*/_react.default.createElement(_walletFront.default, {
    style: style.front,
    height: 140,
    width: 140
  })));
};
var _default = exports.default = CredentialAdded;
//# sourceMappingURL=CredentialAdded.js.map