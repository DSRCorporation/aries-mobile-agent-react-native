"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
var _RecordField = _interopRequireDefault(require("./RecordField"));
var _RecordFooter = _interopRequireDefault(require("./RecordFooter"));
var _RecordHeader = _interopRequireDefault(require("./RecordHeader"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Record = ({
  header,
  footer,
  fields,
  hideFieldValues = false,
  field = null
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [shown, setShown] = (0, _react.useState)([]);
  const [showAll, setShowAll] = (0, _react.useState)(false);
  const {
    ListItems,
    TextTheme
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    linkContainer: {
      ...ListItems.recordContainer,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: 25,
      paddingVertical: 16
    },
    link: {
      minHeight: TextTheme.normal.fontSize,
      paddingVertical: 2
    }
  });
  const resetShown = () => {
    setShown(fields.map(() => showAll));
    setShowAll(!showAll);
  };
  const toggleShownState = newShowStates => {
    if (newShowStates.filter(shownState => shownState === showAll).length > Math.floor(fields.length / 2)) {
      setShowAll(!showAll);
    }
  };
  (0, _react.useEffect)(() => {
    resetShown();
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: fields,
    keyExtractor: ({
      name
    }, index) => name || index.toString(),
    renderItem: ({
      item: attr,
      index
    }) => field ? field(attr, index, fields) : /*#__PURE__*/_react.default.createElement(_RecordField.default, {
      field: attr,
      hideFieldValue: hideFieldValues,
      onToggleViewPressed: () => {
        const newShowState = [...shown];
        newShowState[index] = !shown[index];
        setShown(newShowState);
        toggleShownState(newShowState);
      },
      shown: hideFieldValues ? !!shown[index] : true,
      hideBottomBorder: index === fields.length - 1
    }),
    ListHeaderComponent: header ? /*#__PURE__*/_react.default.createElement(_RecordHeader.default, null, header(), hideFieldValues ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.linkContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.link,
      activeOpacity: 1,
      onPress: () => resetShown(),
      testID: (0, _testable.testIdWithKey)('HideAll'),
      accessible: true,
      accessibilityLabel: showAll ? t('Record.ShowAll') : t('Record.HideAll')
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: ListItems.recordLink
    }, showAll ? t('Record.ShowAll') : t('Record.HideAll')))) : null) : null,
    ListFooterComponent: footer ? /*#__PURE__*/_react.default.createElement(_RecordFooter.default, null, footer()) : null
  });
};
var _default = exports.default = Record;
//# sourceMappingURL=Record.js.map