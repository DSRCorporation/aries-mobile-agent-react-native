function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Composer, InputToolbar, Send } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export const renderInputToolbar = (props, theme) => /*#__PURE__*/React.createElement(InputToolbar, _extends({}, props, {
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
export const renderComposer = (props, theme, placeholder) => /*#__PURE__*/React.createElement(Composer, _extends({}, props, {
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
export const renderSend = (props, theme) => /*#__PURE__*/React.createElement(Send, _extends({}, props, {
  alwaysShowSend: true,
  disabled: !props.text,
  containerStyle: {
    ...theme.sendContainer
  }
}), /*#__PURE__*/React.createElement(Icon, {
  name: "send",
  size: 38,
  color: props.text ? theme.sendEnabled : theme.sendDisabled
}));
//# sourceMappingURL=MessageInput.js.map