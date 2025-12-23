"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeBouncyCheckbox = _interopRequireDefault(require("react-native-bouncy-checkbox"));
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _testable = require("../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const DataRetention = () => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [store, dispatch] = (0, _store2.useStore)();
  const {
    ColorPallet,
    TextTheme,
    SettingsTheme
  } = (0, _theme.useTheme)();
  const [useDataRetention, setUseDataRetention] = (0, _react.useState)(!!store.preferences.useDataRetention);
  const styles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: ColorPallet.brand.primaryBackground,
      width: '100%'
    },
    section: {
      backgroundColor: SettingsTheme.groupBackground,
      paddingHorizontal: 25,
      paddingVertical: 16
    },
    sectionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    itemSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: ColorPallet.brand.primaryBackground,
      marginHorizontal: 25
    }
  });
  const updateDataRetention = state => {
    dispatch({
      type: _store.DispatchAction.USE_DATA_RETENTION,
      payload: [state]
    });
    setUseDataRetention(state);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.section, styles.sectionRow]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.title
  }, t('Global.On')), /*#__PURE__*/_react.default.createElement(_reactNativeBouncyCheckbox.default, {
    accessibilityLabel: t('Global.On'),
    disableText: true,
    fillColor: ColorPallet.brand.secondaryBackground,
    unfillColor: ColorPallet.brand.secondaryBackground,
    size: 36,
    innerIconStyle: {
      borderColor: ColorPallet.brand.primary,
      borderWidth: 2
    },
    ImageComponent: () => /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
      name: "circle",
      size: 18,
      color: ColorPallet.brand.primary
    }),
    onPress: () => updateDataRetention(true),
    isChecked: useDataRetention,
    disableBuiltInState: true,
    testID: (0, _testable.testIdWithKey)('dataRetentionOn')
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      backgroundColor: SettingsTheme.groupBackground
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.itemSeparator
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.section, styles.sectionRow]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.title
  }, t('Global.Off')), /*#__PURE__*/_react.default.createElement(_reactNativeBouncyCheckbox.default, {
    accessibilityLabel: t('Global.Off'),
    disableText: true,
    fillColor: ColorPallet.brand.secondaryBackground,
    unfillColor: ColorPallet.brand.secondaryBackground,
    size: 36,
    innerIconStyle: {
      borderColor: ColorPallet.brand.primary,
      borderWidth: 2
    },
    ImageComponent: () => /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
      name: "circle",
      size: 18,
      color: ColorPallet.brand.primary
    }),
    onPress: () => updateDataRetention(false),
    isChecked: !useDataRetention,
    disableBuiltInState: true,
    testID: (0, _testable.testIdWithKey)('dataRetentionOff')
  })));
};
var _default = exports.default = DataRetention;
//# sourceMappingURL=DataRetention.js.map