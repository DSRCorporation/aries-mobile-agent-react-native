"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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