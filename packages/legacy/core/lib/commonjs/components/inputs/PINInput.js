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
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const PINInputComponent = ({
  label,
  onPINChanged,
  testID,
  accessibilityLabel,
  autoFocus = false
}, ref) => {
  // const accessible = accessibilityLabel && accessibilityLabel !== '' ? true : false
  const [PIN, setPIN] = (0, _react.useState)('');
  const [showPIN, setShowPIN] = (0, _react.useState)(false);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    TextTheme,
    PINInputTheme
  } = (0, _theme.useTheme)();
  const cellHeight = 48;
  const onChangeText = value => {
    onPINChanged && onPINChanged(value);
    setPIN(value);
  };
  const [props, getCellOnLayoutHandler] = (0, _reactNativeConfirmationCodeField.useClearByFocusCell)({
    value: PIN,
    setValue: onChangeText
  });
  const style = _reactNative.StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      flex: 1,
      marginBottom: 24
    },
    labelAndFieldContainer: {
      flexGrow: 1
    },
    codeFieldRoot: {
      borderRadius: 5,
      paddingHorizontal: 12,
      paddingVertical: 4,
      justifyContent: 'flex-start',
      ...PINInputTheme.cell
    },
    cell: {
      height: cellHeight,
      paddingHorizontal: 2,
      backgroundColor: PINInputTheme.cell.backgroundColor
    },
    cellText: {
      ...TextTheme.headingThree,
      color: PINInputTheme.cellText.color,
      textAlign: 'center',
      lineHeight: cellHeight
    },
    hideIcon: {
      flexShrink: 1,
      marginVertical: 10,
      paddingHorizontal: 10
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.labelAndFieldContainer
  }, label && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [TextTheme.label, {
      marginBottom: 8
    }]
  }, label), /*#__PURE__*/_react.default.createElement(_reactNativeConfirmationCodeField.CodeField, _extends({}, props, {
    testID: testID,
    accessibilityLabel: accessibilityLabel,
    accessible: true,
    value: PIN,
    rootStyle: style.codeFieldRoot,
    onChangeText: onChangeText,
    cellCount: _constants.minPINLength,
    keyboardType: "numeric",
    textContentType: "password",
    renderCell: ({
      index,
      symbol,
      isFocused
    }) => {
      let child = '';
      if (symbol) {
        child = showPIN ? symbol : '●';
      } else if (isFocused) {
        child = /*#__PURE__*/_react.default.createElement(_reactNativeConfirmationCodeField.Cursor, null);
      }
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        key: index,
        style: style.cell,
        onLayout: getCellOnLayoutHandler(index)
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: style.cellText,
        maxFontSizeMultiplier: 1
      }, child));
    },
    autoFocus: autoFocus,
    ref: ref
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.hideIcon
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessibilityLabel: showPIN ? t('PINCreate.Hide') : t('PINCreate.Show'),
    accessibilityRole: 'button',
    testID: showPIN ? (0, _testable.testIdWithKey)('Hide') : (0, _testable.testIdWithKey)('Show'),
    onPress: () => setShowPIN(!showPIN),
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    color: PINInputTheme.icon.color,
    name: showPIN ? 'visibility-off' : 'visibility',
    size: 30
  }))));
};
const PINInput = /*#__PURE__*/(0, _react.forwardRef)(PINInputComponent);
var _default = exports.default = PINInput;
//# sourceMappingURL=PINInput.js.map