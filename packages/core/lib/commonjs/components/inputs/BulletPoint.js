"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _theme = require("../../contexts/theme");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const BulletPoint = ({
  text,
  textStyle
}) => {
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    iconContainer: {
      marginRight: 10,
      marginVertical: 6
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.iconContainer
  }, /*#__PURE__*/React.createElement(_MaterialIcons.default, {
    name: 'circle',
    size: 9,
    color: ColorPalette.brand.modalIcon
  })), /*#__PURE__*/React.createElement(_ThemedText.ThemedText, {
    style: [textStyle, {
      flexShrink: 1
    }]
  }, text));
};
var _default = exports.default = BulletPoint;
//# sourceMappingURL=BulletPoint.js.map