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
var _ThemedText = require("../components/texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const DataRetention = () => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [store, dispatch] = (0, _store2.useStore)();
  const {
    ColorPalette,
    SettingsTheme
  } = (0, _theme.useTheme)();
  const [useDataRetention, setUseDataRetention] = (0, _react.useState)(!!store.preferences.useDataRetention);
  const styles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: ColorPalette.brand.primaryBackground,
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
      borderBottomColor: ColorPalette.brand.primaryBackground,
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
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "title"
  }, t('Global.On')), /*#__PURE__*/_react.default.createElement(_reactNativeBouncyCheckbox.default, {
    accessibilityLabel: t('Global.On'),
    disableText: true,
    fillColor: ColorPalette.brand.secondaryBackground,
    unfillColor: ColorPalette.brand.secondaryBackground,
    size: 36,
    innerIconStyle: {
      borderColor: ColorPalette.brand.primary,
      borderWidth: 2
    },
    ImageComponent: () => /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
      name: "circle",
      size: 18,
      color: ColorPalette.brand.primary
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
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "title"
  }, t('Global.Off')), /*#__PURE__*/_react.default.createElement(_reactNativeBouncyCheckbox.default, {
    accessibilityLabel: t('Global.Off'),
    disableText: true,
    fillColor: ColorPalette.brand.secondaryBackground,
    unfillColor: ColorPalette.brand.secondaryBackground,
    size: 36,
    innerIconStyle: {
      borderColor: ColorPalette.brand.primary,
      borderWidth: 2
    },
    ImageComponent: () => /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
      name: "circle",
      size: 18,
      color: ColorPalette.brand.primary
    }),
    onPress: () => updateDataRetention(false),
    isChecked: !useDataRetention,
    disableBuiltInState: true,
    testID: (0, _testable.testIdWithKey)('dataRetentionOff')
  })));
};
var _default = exports.default = DataRetention;
//# sourceMappingURL=DataRetention.js.map