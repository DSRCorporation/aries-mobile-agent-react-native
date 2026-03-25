import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../contexts/theme';
import { storeLanguage } from '../localization';
import { testIdWithKey } from '../utils/testable';
import { TOKENS, useServices } from '../container-api';
import { ThemedText } from '../components/texts/ThemedText';
const Language = () => {
  const {
    t,
    i18n
  } = useTranslation();
  const {
    ColorPalette,
    SettingsTheme
  } = useTheme();
  const [{
    supportedLanguages
  }] = useServices([TOKENS.CONFIG]);
  const languages = supportedLanguages.map(lang => ({
    id: lang,
    value: i18n.t(`Language.code`, {
      context: lang
    })
  }));
  const styles = StyleSheet.create({
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
    await storeLanguage(language.id);
  };
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(FlatList, {
    data: languages,
    renderItem: ({
      item: language
    }) => {
      const {
        id,
        value
      } = language;
      return /*#__PURE__*/React.createElement(View, {
        style: [styles.section, styles.sectionRow]
      }, /*#__PURE__*/React.createElement(ThemedText, {
        variant: "title"
      }, value), /*#__PURE__*/React.createElement(BouncyCheckbox, {
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
        ImageComponent: () => /*#__PURE__*/React.createElement(Icon, {
          name: "circle",
          size: 18,
          color: ColorPalette.brand.primary
        }),
        onPress: async () => await handleLanguageChange(language),
        isChecked: id === i18n.language,
        disableBuiltInState: true,
        testID: testIdWithKey(id.toLocaleLowerCase())
      }));
    },
    ItemSeparatorComponent: () => /*#__PURE__*/React.createElement(View, {
      style: {
        backgroundColor: SettingsTheme.groupBackground
      }
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.itemSeparator
    }))
  }));
};
export default Language;
//# sourceMappingURL=Language.js.map