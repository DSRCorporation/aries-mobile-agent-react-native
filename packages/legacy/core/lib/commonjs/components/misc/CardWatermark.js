"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const styles = exports.styles = _reactNative.StyleSheet.create({
  container: {
    position: 'absolute',
    width: '200%',
    height: '200%',
    marginTop: -220
  },
  watermarkText: {
    opacity: 0.16,
    marginLeft: -80,
    transform: [{
      rotate: '-30deg'
    }],
    overflow: 'hidden'
  }
});
const CardWatermark = ({
  watermark,
  style,
  height,
  width
}) => {
  const {
    TextTheme
  } = (0, _theme.useTheme)();
  const fontSize = Number((style === null || style === void 0 ? void 0 : style.fontSize) ?? TextTheme.headingFour.fontSize);
  const watermarkText = `${watermark} `.repeat(Math.ceil(width / (Math.cos(30) * (fontSize / 2 * (watermark.length + 1)))));
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, Array.from({
    length: Math.ceil(height * 2 / fontSize + 1)
  }).map((_, i) => /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    accessible: false,
    key: i,
    numberOfLines: 1,
    style: _reactNative.StyleSheet.compose({
      ...styles.watermarkText,
      ...{
        fontSize
      }
    }, style)
  }, watermarkText)));
};
var _default = exports.default = CardWatermark;
//# sourceMappingURL=CardWatermark.js.map