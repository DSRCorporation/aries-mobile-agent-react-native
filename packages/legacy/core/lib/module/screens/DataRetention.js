import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { testIdWithKey } from '../utils/testable';
const DataRetention = () => {
  const {
    t
  } = useTranslation();
  const [store, dispatch] = useStore();
  const {
    ColorPallet,
    TextTheme,
    SettingsTheme
  } = useTheme();
  const [useDataRetention, setUseDataRetention] = useState(!!store.preferences.useDataRetention);
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
  const updateDataRetention = state => {
    dispatch({
      type: DispatchAction.USE_DATA_RETENTION,
      payload: [state]
    });
    setUseDataRetention(state);
  };
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.section, styles.sectionRow]
  }, /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.title
  }, t('Global.On')), /*#__PURE__*/React.createElement(BouncyCheckbox, {
    accessibilityLabel: t('Global.On'),
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
    onPress: () => updateDataRetention(true),
    isChecked: useDataRetention,
    disableBuiltInState: true,
    testID: testIdWithKey('dataRetentionOn')
  })), /*#__PURE__*/React.createElement(View, {
    style: {
      backgroundColor: SettingsTheme.groupBackground
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.itemSeparator
  })), /*#__PURE__*/React.createElement(View, {
    style: [styles.section, styles.sectionRow]
  }, /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.title
  }, t('Global.Off')), /*#__PURE__*/React.createElement(BouncyCheckbox, {
    accessibilityLabel: t('Global.Off'),
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
    onPress: () => updateDataRetention(false),
    isChecked: !useDataRetention,
    disableBuiltInState: true,
    testID: testIdWithKey('dataRetentionOff')
  })));
};
export default DataRetention;
//# sourceMappingURL=DataRetention.js.map