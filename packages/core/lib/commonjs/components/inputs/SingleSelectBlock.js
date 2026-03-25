"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const SingleSelectBlock = ({
  selection,
  onSelect,
  initialSelect
}) => {
  const [selected, setSelected] = (0, _react.useState)(initialSelect ?? selection[0]);
  const {
    Inputs
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      width: '100%',
      padding: 20
    },
    row: {
      ...Inputs.singleSelect,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8
    }
  });
  const handleSelect = selected => {
    setSelected(selected);
    onSelect(selected);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, selection.map(item => /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    key: item.id,
    style: styles.row,
    onPress: () => handleSelect(item),
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: Inputs.singleSelectText
  }, item.value), item.id === selected.id ? /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: 'check',
    size: 25,
    color: Inputs.singleSelectIcon.color
  }) : null)));
};
var _default = exports.default = SingleSelectBlock;
//# sourceMappingURL=SingleSelectBlock.js.map