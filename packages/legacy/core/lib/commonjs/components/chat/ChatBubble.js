"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderBubble = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeGiftedChat = require("react-native-gifted-chat");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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