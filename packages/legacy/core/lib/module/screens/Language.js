import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../contexts/theme';
import { storeLanguage } from '../localization';
import { testIdWithKey } from '../utils/testable';
import { TOKENS, useServices } from '../container-api';
const Language = () => {
  const {
    i18n
  } = useTranslation();
  const {
    ColorPallet,
    TextTheme,
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

  /**
   * Once user select the particular language from the list,
   * store user preference into the AsyncStorage
   *
   * @param {BlockSelection} language
   */
  const handleLanguageChange = async language => {
    await i18n.changeLanguage(language.id);
    await storeLanguage(language.id);
    // const langId = await AsyncStorage.getItem('language')
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
      }, /*#__PURE__*/React.createElement(Text, {
        style: TextTheme.title
      }, value), /*#__PURE__*/React.createElement(BouncyCheckbox, {
        accessibilityLabel: value,
        disableText: true,
        fillColor: ColorPallet.brand.secondaryBackground,
        unfillColor: ColorPallet.brand.secondaryBackground,
        size: 36,
        innerIconStyle: {
          borderColor: ColorPallet.brand.primary,
          borderWidth: 2
        },
        ImageComponent: () => /*#__PURE__*/React.createElement(Icon, {
          name: "circle",
          size: 18,
          color: ColorPallet.brand.primary
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