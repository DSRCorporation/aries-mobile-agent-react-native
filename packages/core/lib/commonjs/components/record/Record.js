"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _legacy = require("@bifold/oca/build/legacy");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
var _RecordField = _interopRequireDefault(require("./RecordField"));
var _RecordFooter = _interopRequireDefault(require("./RecordFooter"));
var _RecordHeader = _interopRequireDefault(require("./RecordHeader"));
var _containerApi = require("../../container-api");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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
  const {
    ListItems,
    TextTheme
  } = (0, _theme.useTheme)();
  const [bundleResolver] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_OCA_RESOLVER]);
  const styles = _reactNative.StyleSheet.create({
    linkContainer: {
      ...ListItems.recordContainer,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: bundleResolver.getBrandingOverlayType() === _legacy.BrandingOverlayType.Branding10 ? 25 : 16,
      paddingVertical: 16
    },
    link: {
      minHeight: TextTheme.normal.fontSize,
      paddingVertical: 2
    }
  });
  const hideAll = (0, _react.useCallback)(() => {
    setShown(fields.map(() => false));
  }, [fields]);
  (0, _react.useEffect)(() => {
    hideAll();
  }, [hideAll]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: fields,
    keyExtractor: ({
      name
    }, index) => name || index.toString(),
    showsVerticalScrollIndicator: false,
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
      },
      shown: hideFieldValues ? !!shown[index] : true,
      hideBottomBorder: index === fields.length - 1
    }),
    ListHeaderComponent: header ? /*#__PURE__*/_react.default.createElement(_RecordHeader.default, null, header(), hideFieldValues ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.linkContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.link,
      activeOpacity: 1,
      onPress: hideAll,
      testID: (0, _testable.testIdWithKey)('HideAll'),
      accessible: true,
      accessibilityLabel: t('Record.HideAll'),
      accessibilityRole: "button"
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: ListItems.recordLink
    }, t('Record.HideAll')))) : null) : null,
    ListFooterComponent: footer ? /*#__PURE__*/_react.default.createElement(_RecordFooter.default, null, footer()) : null
  });
};
var _default = exports.default = Record;
//# sourceMappingURL=Record.js.map