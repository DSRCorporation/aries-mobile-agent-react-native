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
var _Text = _interopRequireDefault(require("../texts/Text"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  }, /*#__PURE__*/_react.default.createElement(_Text.default, {
    style: Inputs.singleSelectText
  }, item.value), item.id === selected.id ? /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: 'check',
    size: 25,
    color: Inputs.singleSelectIcon.color
  }) : null)));
};
var _default = exports.default = SingleSelectBlock;
//# sourceMappingURL=SingleSelectBlock.js.map