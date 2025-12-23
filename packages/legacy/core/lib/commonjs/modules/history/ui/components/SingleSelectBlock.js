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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.languageText, _theme.TextTheme.normal]
  }, item.value))));
};
var _default = exports.default = SingleSelectBlock;
//# sourceMappingURL=SingleSelectBlock.js.map