"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LimitedTextInput = ({
  showLimitCounter = true,
  label,
  limit,
  handleChangeText,
  ...textInputProps
}) => {
  const [focused, setFocused] = (0, _react.useState)(false);
  const [characterCount, setCharacterCount] = (0, _react.useState)(0);
  const {
    Inputs,
    TextTheme,
    maxFontSizeMultiplier
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
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
  (0, _react.useEffect)(() => {
    var _textInputProps$defau;
    if ((_textInputProps$defau = textInputProps.defaultValue) !== null && _textInputProps$defau !== void 0 && _textInputProps$defau.length) {
      setCharacterCount(textInputProps.defaultValue.length);
    }
  }, [textInputProps.defaultValue]);
  const onChangeText = text => {
    setCharacterCount(text.length);
    handleChangeText(text);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: {
      marginBottom: 5
    }
  }, label), /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, _extends({
    maxLength: limit,
    maxFontSizeMultiplier: maxFontSizeMultiplier,
    style: [styles.textInput, focused && {
      ...Inputs.inputSelected
    }],
    selectionColor: Inputs.inputSelected.borderColor,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChangeText: onChangeText
  }, textInputProps)), showLimitCounter && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: styles.limitCounter
  }, characterCount, "/", limit));
};
var _default = exports.default = LimitedTextInput;
//# sourceMappingURL=LimitedTextInput.js.map