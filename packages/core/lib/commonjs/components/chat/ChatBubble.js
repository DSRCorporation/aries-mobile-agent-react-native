"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderBubble = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeGiftedChat = require("react-native-gifted-chat");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const renderBubble = (props, theme) => {
  return /*#__PURE__*/_react.default.createElement(_reactNativeGiftedChat.Bubble, _extends({}, props, {
    wrapperStyle: {
      left: {
        ...theme.leftBubble
      },
      right: {
        ...theme.rightBubble
      }
    },
    textStyle: {
      left: {
        ...theme.leftText
      },
      right: {
        ...theme.rightText
      }
    }
  }));
};
exports.renderBubble = renderBubble;
//# sourceMappingURL=ChatBubble.js.map