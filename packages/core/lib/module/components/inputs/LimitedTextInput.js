function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { ThemedText } from '../texts/ThemedText';
const LimitedTextInput = ({
  showLimitCounter = true,
  label,
  limit,
  handleChangeText,
  ...textInputProps
}) => {
  const [focused, setFocused] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const {
    Inputs,
    TextTheme,
    maxFontSizeMultiplier
  } = useTheme();
  const styles = StyleSheet.create({
    container: {
      marginVertical: 10,
      width: '100%'
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
  }, /*#__PURE__*/React.createElement(ThemedText, {
    style: {
      marginBottom: 5
    }
  }, label), /*#__PURE__*/React.createElement(TextInput, _extends({
    maxLength: limit,
    maxFontSizeMultiplier: maxFontSizeMultiplier,
    style: [styles.textInput, focused && {
      ...Inputs.inputSelected
    }],
    selectionColor: Inputs.inputSelected.borderColor,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChangeText: onChangeText
  }, textInputProps)), showLimitCounter && /*#__PURE__*/React.createElement(ThemedText, {
    style: styles.limitCounter
  }, characterCount, "/", limit));
};
export default LimitedTextInput;
//# sourceMappingURL=LimitedTextInput.js.map