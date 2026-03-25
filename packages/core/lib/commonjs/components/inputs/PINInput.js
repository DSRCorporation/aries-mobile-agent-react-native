"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeConfirmationCodeField = require("react-native-confirmation-code-field");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _constants = require("../../constants");
var _containerApi = require("../../container-api");
var _theme = require("../../contexts/theme");
var _error = require("../../types/error");
var _testable = require("../../utils/testable");
var _ThemedText = require("../texts/ThemedText");
var _InlineErrorText = _interopRequireDefault(require("./InlineErrorText"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// adjusting for the spaces between numbers
const cellCount = _constants.minPINLength * 2 - 1;
const separatedPINCellCount = 6;
const PINInput = ({
  label,
  onPINChanged,
  testID,
  accessibilityLabel,
  autoFocus = false,
  inlineMessage,
  onSubmitEditing = () => {},
  ref
}) => {
  const [{
    PINScreensConfig
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  const {
    PINInputTheme,
    SeparatedPINInputTheme,
    ColorPalette
  } = (0, _theme.useTheme)();
  const theme = PINScreensConfig.useNewPINDesign ? SeparatedPINInputTheme : PINInputTheme;
  const [PIN, setPIN] = (0, _react.useState)('');
  const [showPIN, setShowPIN] = (0, _react.useState)(false);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const cellHeight = 48;

  // including spaces to prevent screen reader from reading the PIN as a single number
  // filling with bullets when masked to prevent screen reader from reading the actual PIN
  // and to have the proper appearance when the PIN is masked
  const displayValue = (0, _react.useMemo)(() => {
    if (showPIN) {
      return PIN.split('').join(' ');
    } else {
      return '●'.repeat(PIN.length).split('').join(' ');
    }
  }, [PIN, showPIN]);
  const onChangeText = (0, _react.useCallback)(value => {
    const cleanValue = value.replaceAll(' ', '');
    // typed new characters
    if (cleanValue.length > PIN.length) {
      // add new characters to the actual PIN
      // only allow numbers
      const newChars = cleanValue.slice(PIN.length);
      const newPIN = PIN + newChars.replace(/●/g, '').replace(/\D/g, '');
      setPIN(newPIN);
      onPINChanged && onPINChanged(newPIN);
      // characters were removed
    } else if (cleanValue.length < displayValue.replaceAll(' ', '').length) {
      // remove same number of characters from actual PIN
      const newPIN = PIN.slice(0, cleanValue.length);
      setPIN(newPIN);
      onPINChanged && onPINChanged(newPIN);
    }
  }, [PIN, displayValue, onPINChanged]);
  const [props, getCellOnLayoutHandler] = (0, _reactNativeConfirmationCodeField.useClearByFocusCell)({
    value: PINScreensConfig.useNewPINDesign ? PIN : displayValue,
    setValue: onChangeText
  });
  const allyLabel = (0, _react.useMemo)(() => {
    return showPIN ? accessibilityLabel : t('PINCreate.Masked');
  }, [accessibilityLabel, showPIN, t]);
  const style = _reactNative.StyleSheet.create({
    container: {
      flexDirection: 'column',
      marginBottom: 24
    },
    codeFieldContainer: {
      flex: 1
    },
    cell: {
      ...theme.cell,
      borderColor: inlineMessage && PINScreensConfig.useNewPINDesign ? ColorPalette.semantic.error : theme.cell.borderColor
    },
    cellText: {
      color: theme.cellText.color,
      textAlign: 'center',
      lineHeight: cellHeight
    },
    hideIcon: {
      paddingLeft: PINScreensConfig.useNewPINDesign ? 2 : 10
    }
  });
  const content = () => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: theme.labelAndFieldContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.codeFieldContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNativeConfirmationCodeField.CodeField, _extends({}, props, {
    testID: testID,
    accessibilityLabel: allyLabel,
    accessibilityRole: 'text',
    accessible: true,
    value: PINScreensConfig.useNewPINDesign ? PIN : displayValue,
    rootStyle: theme.codeFieldRoot,
    onChangeText: onChangeText,
    cellCount: PINScreensConfig.useNewPINDesign ? separatedPINCellCount : cellCount,
    keyboardType: "number-pad",
    textContentType: "password",
    renderCell: ({
      index,
      symbol,
      isFocused
    }) => {
      let child = '';
      // skip spaces
      if (symbol && symbol !== ' ') {
        if (PINScreensConfig.useNewPINDesign) {
          child = showPIN ? symbol : /*#__PURE__*/_react.default.createElement(_reactNativeConfirmationCodeField.MaskSymbol, {
            maskSymbol: "\u25CF",
            isLastFilledCell: (0, _reactNativeConfirmationCodeField.isLastFilledCell)({
              index,
              value: PINScreensConfig.useNewPINDesign ? PIN : displayValue
            })
          }, symbol);
        } else {
          child = symbol;
        }
      } else if (isFocused) {
        child = /*#__PURE__*/_react.default.createElement(_reactNativeConfirmationCodeField.Cursor, null);
      }
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        key: index,
        style: style.cell,
        onLayout: getCellOnLayoutHandler(index)
      }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
        variant: "headingThree",
        style: style.cellText,
        maxFontSizeMultiplier: 1
      }, child));
    },
    autoFocus: autoFocus,
    ref: ref,
    onSubmitEditing: e => {
      var _e$nativeEvent;
      onSubmitEditing((e === null || e === void 0 || (_e$nativeEvent = e.nativeEvent) === null || _e$nativeEvent === void 0 ? void 0 : _e$nativeEvent.text) ?? '');
    }
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: style.hideIcon,
    accessibilityLabel: showPIN ? t('PINCreate.Hide') : t('PINCreate.Show'),
    accessibilityRole: 'button',
    testID: showPIN ? (0, _testable.testIdWithKey)('Hide') : (0, _testable.testIdWithKey)('Show'),
    onPress: () => setShowPIN(!showPIN),
    hitSlop: PINScreensConfig.useNewPINDesign ? {
      ..._constants.hitSlop,
      left: 10
    } : _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    color: PINInputTheme.icon.color,
    name: showPIN ? 'visibility-off' : 'visibility',
    size: 30
  })));
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container
  }, label && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: PINScreensConfig.useNewPINDesign ? 'labelTitle' : 'label',
    style: {
      marginBottom: 8
    }
  }, label), (inlineMessage === null || inlineMessage === void 0 ? void 0 : inlineMessage.config.position) === _error.InlineErrorPosition.Above ? /*#__PURE__*/_react.default.createElement(_InlineErrorText.default, {
    message: inlineMessage.message,
    inlineType: inlineMessage.inlineType,
    config: inlineMessage.config
  }) : null, content(), (inlineMessage === null || inlineMessage === void 0 ? void 0 : inlineMessage.config.position) === _error.InlineErrorPosition.Below ? /*#__PURE__*/_react.default.createElement(_InlineErrorText.default, {
    message: inlineMessage.message,
    inlineType: inlineMessage.inlineType,
    config: inlineMessage.config
  }) : null);
};
var _default = exports.default = PINInput;
//# sourceMappingURL=PINInput.js.map