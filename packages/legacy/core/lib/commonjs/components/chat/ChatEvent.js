"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatEvent = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _chat = require("../../types/chat");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ChatEvent = ({
  userLabel,
  actionLabel,
  role
}) => {
  const {
    ChatTheme
  } = (0, _theme.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    }
  }, userLabel && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [role === _chat.Role.me ? ChatTheme.rightText : ChatTheme.leftText, {
      marginRight: 4
    }]
  }, userLabel), actionLabel && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: role === _chat.Role.me ? ChatTheme.rightTextHighlighted : ChatTheme.leftTextHighlighted
  }, actionLabel));
};
exports.ChatEvent = ChatEvent;
//# sourceMappingURL=ChatEvent.js.map