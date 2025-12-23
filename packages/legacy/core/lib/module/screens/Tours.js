import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
const Tours = () => {
  const [store, dispatch] = useStore();
  const {
    t
  } = useTranslation();
  const {
    ColorPallet,
    TextTheme,
    SettingsTheme
  } = useTheme();
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
  const options = [{
    value: t('Global.On'),
    bool: true
  }, {
    value: t('Global.Off'),
    bool: false
  }];
  const handleSettingChange = async enableTours => {
    dispatch({
      type: DispatchAction.ENABLE_TOURS,
      payload: [enableTours]
    });
  };
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(FlatList, {
    data: options,
    renderItem: ({
      item: option
    }) => {
      const {
        value,
        bool
      } = option;
      return /*#__PURE__*/React.createElement(View, {
        style: [styles.section, styles.sectionRow]
      }, /*#__PURE__*/React.createElement(Text, {
        style: TextTheme.title
      }, value), /*#__PURE__*/React.createElement(BouncyCheckbox, {
        accessibilityLabel: value,
        disableText: true,
        fillColor: "#FFFFFFFF",
        unfillColor: "#FFFFFFFF",
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
        onPress: async () => await handleSettingChange(bool),
        isChecked: store.tours.enableTours === bool,
        disableBuiltInState: true
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
export default Tours;
//# sourceMappingURL=Tours.js.map