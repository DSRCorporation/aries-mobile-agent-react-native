"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _Text = _interopRequireDefault(require("../texts/Text"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ModularView = ({
  title,
  subtitle,
  content
}) => {
  const {
    borderRadius,
    TextTheme,
    ColorPallet
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      borderRadius,
      backgroundColor: ColorPallet.notification.info,
      margin: 20,
      padding: 20
    },
    content: {
      marginTop: 10
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_Text.default, {
    style: TextTheme.headingFour
  }, title), /*#__PURE__*/_react.default.createElement(_Text.default, {
    style: TextTheme.normal
  }, subtitle), typeof content === 'string' ? /*#__PURE__*/_react.default.createElement(_Text.default, {
    style: styles.content
  }, content) : content);
};
var _default = exports.default = ModularView;
//# sourceMappingURL=ModularView.js.map