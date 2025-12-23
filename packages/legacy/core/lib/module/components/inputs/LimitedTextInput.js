function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useTheme } from '../../contexts/theme';
const LimitedTextInput = ({
  label,
  limit,
  handleChangeText,
  ...textInputProps
}) => {
  const [focused, setFocused] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const {
    Inputs,
    TextTheme
  } = useTheme();
  const styles = StyleSheet.create({
    container: {
      marginVertical: 10
    },
    label: {
      ...TextTheme.normal,
      marginBottom: 5
    },
    textInput: {
      ...Inputs.textInput
    },
    limitCounter: {
      color: TextTheme.normal.color,
      alignSelf: 'flex-end'
    }
  });
  useEffect(() => {
    var _textInputProps$defau;
    if ((_textInputProps$defau = textInputProps.defaultValue) !== null && _textInputProps$defau !== void 0 && _textInputProps$defau.length) {
      setCharacterCount(textInputProps.defaultValue.length);
    }
  }, [textInputProps.defaultValue]);
  const onChangeText = text => {
    setCharacterCount(text.length);
    handleChangeText(text);
  };
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.label
  }, label), /*#__PURE__*/React.createElement(TextInput, _extends({
    style: [styles.textInput, focused && {
      ...Inputs.inputSelected
    }],
    selectionColor: Inputs.inputSelected.borderColor,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChangeText: onChangeText
  }, textInputProps)), /*#__PURE__*/React.createElement(Text, {
    style: styles.limitCounter
  }, characterCount, "/", limit));
};
export default LimitedTextInput;
//# sourceMappingURL=LimitedTextInput.js.map