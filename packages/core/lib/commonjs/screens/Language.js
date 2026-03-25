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
var _theme = require("../contexts/theme");
var _localization = require("../localization");
var _testable = require("../utils/testable");
var _containerApi = require("../container-api");
var _ThemedText = require("../components/texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Language = () => {
  const {
    t,
    i18n
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette,
    SettingsTheme
  } = (0, _theme.useTheme)();
  const [{
    supportedLanguages
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  const languages = supportedLanguages.map(lang => ({
    id: lang,
    value: i18n.t(`Language.code`, {
      context: lang
    })
  }));
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

  /**
   * Once user select the particular language from the list,
   * store user preference into the AsyncStorage
   *
   * @param {BlockSelection} language
   */
  const handleLanguageChange = async language => {
    await i18n.changeLanguage(language.id);
    await (0, _localization.storeLanguage)(language.id);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: languages,
    renderItem: ({
      item: language
    }) => {
      const {
        id,
        value
      } = language;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.section, styles.sectionRow]
      }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
        variant: "title"
      }, value), /*#__PURE__*/_react.default.createElement(_reactNativeBouncyCheckbox.default, {
        accessibilityLabel: `${id === i18n.language ? t('Language.Checked') : t('Language.NotChecked')}` // add on voice over the text checked / not checked after the text from value above
        ,
        accessibilityRole: "radio",
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
        onPress: async () => await handleLanguageChange(language),
        isChecked: id === i18n.language,
        disableBuiltInState: true,
        testID: (0, _testable.testIdWithKey)(id.toLocaleLowerCase())
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
var _default = exports.default = Language;
//# sourceMappingURL=Language.js.map