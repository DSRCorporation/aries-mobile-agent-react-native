"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderSend = exports.renderInputToolbar = exports.renderComposer = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeGiftedChat = require("react-native-gifted-chat");
var _MaterialCommunityIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialCommunityIcons"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const renderInputToolbar = (props, theme) => /*#__PURE__*/_react.default.createElement(_reactNativeGiftedChat.InputToolbar, _extends({}, props, {
  containerStyle: {
    ...theme.inputToolbar,
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2
  }
}));
exports.renderInputToolbar = renderInputToolbar;
const renderComposer = (props, theme, placeholder) => /*#__PURE__*/_react.default.createElement(_reactNativeGiftedChat.Composer, _extends({}, props, {
  textInputStyle: {
    ...theme.inputText
  },
  placeholder: placeholder,
  placeholderTextColor: theme.placeholderText
  // the placeholder is read by accessibility features when multiline is enabled so a label is not necessary (results in double announcing if used)
  ,
  textInputProps: {
    accessibilityLabel: ''
  }
}));
exports.renderComposer = renderComposer;
const renderSend = (props, theme) => /*#__PURE__*/_react.default.createElement(_reactNativeGiftedChat.Send, _extends({}, props, {
  alwaysShowSend: true,
  disabled: !props.text,
  containerStyle: {
    ...theme.sendContainer
  }
}), /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
  name: "send",
  size: 38,
  color: props.text ? theme.sendEnabled : theme.sendDisabled
}));
exports.renderSend = renderSend;
//# sourceMappingURL=MessageInput.js.map