"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const RecordFooter = ({
  children
}) => {
  const {
    ColorPallet
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: ColorPallet.brand.primaryBackground,
      height: '100%'
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, children);
};
var _default = exports.default = RecordFooter;
//# sourceMappingURL=RecordFooter.js.map