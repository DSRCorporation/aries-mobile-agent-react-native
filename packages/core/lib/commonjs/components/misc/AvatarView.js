"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _oca = require("@bifold/oca");
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const AvatarView = ({
  name,
  style
}) => {
  const {
    ListItems
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    avatar: {
      ...ListItems.avatarCircle,
      margin: 12,
      borderWidth: 3,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.avatar, {
      borderColor: (0, _oca.hashToRGBA)((0, _oca.hashCode)(name))
    }, style]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: ListItems.avatarText,
    testID: (0, _testable.testIdWithKey)('AvatarName')
  }, name.charAt(0)));
};
var _default = exports.default = AvatarView;
//# sourceMappingURL=AvatarView.js.map