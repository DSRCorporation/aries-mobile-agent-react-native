"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _theme = require("../../../../theme");
var _ThemedText = require("../../../../components/texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const styles = _reactNative.StyleSheet.create({
  flexView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minWidth: 24,
    minHeight: 48
  },
  languageText: {
    marginLeft: 8
  }
});
const SingleSelectBlock = ({
  selection,
  onSelect,
  initialSelect,
  color = _theme.TextTheme.normal.color
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [selected, setSelected] = (0, _react.useState)();
  const handleSelect = selected => {
    setSelected(selected);
    onSelect(selected);
  };
  (0, _react.useEffect)(() => {
    if (initialSelect) {
      setSelected(initialSelect);
    }
  }, [initialSelect]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, selection === null || selection === void 0 ? void 0 : selection.map(item => /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessible: true,
    accessibilityLabel: (item.id === (selected === null || selected === void 0 ? void 0 : selected.id) ? t('SelectionAxs.RadioChecked') : t('SelectionAxs.RadioUnchecked')) + item.value,
    accessibilityRole: "radio",
    accessibilityState: {
      selected: item.id === (selected === null || selected === void 0 ? void 0 : selected.id)
    },
    key: item.id,
    style: styles.flexView,
    onPress: () => handleSelect(item)
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: item.id === (selected === null || selected === void 0 ? void 0 : selected.id) ? 'radio-button-checked' : 'radio-button-unchecked',
    size: 36,
    color: color
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: styles.languageText
  }, item.value))));
};
var _default = exports.default = SingleSelectBlock;
//# sourceMappingURL=SingleSelectBlock.js.map