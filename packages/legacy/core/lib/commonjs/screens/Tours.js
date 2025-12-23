"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeBouncyCheckbox = _interopRequireDefault(require("react-native-bouncy-checkbox"));
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Tours = () => {
  const [store, dispatch] = (0, _store2.useStore)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPallet,
    TextTheme,
    SettingsTheme
  } = (0, _theme.useTheme)();
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
  const options = [{
    value: t('Global.On'),
    bool: true
  }, {
    value: t('Global.Off'),
    bool: false
  }];
  const handleSettingChange = async enableTours => {
    dispatch({
      type: _store.DispatchAction.ENABLE_TOURS,
      payload: [enableTours]
    });
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: options,
    renderItem: ({
      item: option
    }) => {
      const {
        value,
        bool
      } = option;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.section, styles.sectionRow]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: TextTheme.title
      }, value), /*#__PURE__*/_react.default.createElement(_reactNativeBouncyCheckbox.default, {
        accessibilityLabel: value,
        disableText: true,
        fillColor: "#FFFFFFFF",
        unfillColor: "#FFFFFFFF",
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
        onPress: async () => await handleSettingChange(bool),
        isChecked: store.tours.enableTours === bool,
        disableBuiltInState: true
      }));
    },
    ItemSeparatorComponent: () => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        backgroundColor: SettingsTheme.groupBackground
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.itemSeparator
    }))
  }));
};
var _default = exports.default = Tours;
//# sourceMappingURL=Tours.js.map