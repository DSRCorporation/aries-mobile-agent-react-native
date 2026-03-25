"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderSend = exports.renderInputToolbar = exports.renderComposer = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeGiftedChat = require("react-native-gifted-chat");
var _MaterialCommunityIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialCommunityIcons"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    accessibilityLabel: '',
    maxFontSizeMultiplier: 1.2
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