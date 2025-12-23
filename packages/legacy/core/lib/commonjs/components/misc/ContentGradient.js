"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * To be used in a relative position controlsContainer that is below (and not in) scrollview content
 */
const ContentGradient = ({
  backgroundColor,
  height = 30
}) => {
  const id = 'gradient';
  const styles = _reactNative.StyleSheet.create({
    container: {
      position: 'absolute',
      height,
      width: '100%',
      top: -height
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.default, {
    height: `${height}`,
    width: "100%",
    style: _reactNative.StyleSheet.absoluteFill
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Defs, null, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.LinearGradient, {
    id: id,
    x1: "0%",
    y1: "0%",
    x2: "0%",
    y2: "100%"
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Stop, {
    offset: "0%",
    stopColor: backgroundColor,
    stopOpacity: 0
  }), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Stop, {
    offset: "100%",
    stopColor: backgroundColor,
    stopOpacity: 1
  }))), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Rect, {
    height: `${height}`,
    width: "100%",
    fill: `url(#${id})`
  })));
};
var _default = exports.default = ContentGradient;
//# sourceMappingURL=ContentGradient.js.map