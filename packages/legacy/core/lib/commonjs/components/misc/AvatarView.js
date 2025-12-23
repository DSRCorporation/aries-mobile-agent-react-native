"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ariesOca = require("@hyperledger/aries-oca");
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
      borderColor: (0, _ariesOca.hashToRGBA)((0, _ariesOca.hashCode)(name))
    }, style]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: ListItems.avatarText,
    testID: (0, _testable.testIdWithKey)('AvatarName')
  }, name.charAt(0)));
};
var _default = exports.default = AvatarView;
//# sourceMappingURL=AvatarView.js.map