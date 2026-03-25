import { Pressable, StyleSheet, View, FlatList } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AutoLockTime } from '../contexts/activity';
import { testIdWithKey } from '../utils/testable';
import { useStore } from '../contexts/store';
import { DispatchAction } from '../contexts/reducers/store';
import { useTheme } from '../contexts/theme';
import { ThemedText } from '../components/texts/ThemedText';
import { useServices, TOKENS } from '../container-api';
const AutoLock = () => {
  var _customAutoLockTimes$, _store$preferences;
  const {
    t
  } = useTranslation();
  const [store, dispatch] = useStore();
  const {
    ColorPalette,
    SettingsTheme
  } = useTheme();
  const [{
    customAutoLockTimes
  }] = useServices([TOKENS.CONFIG]);
  const defaultAutoLockoutTime = (customAutoLockTimes === null || customAutoLockTimes === void 0 || (_customAutoLockTimes$ = customAutoLockTimes.default) === null || _customAutoLockTimes$ === void 0 ? void 0 : _customAutoLockTimes$.time) ?? AutoLockTime.FiveMinutes;
  const currentLockoutTime = ((_store$preferences = store.preferences) === null || _store$preferences === void 0 ? void 0 : _store$preferences.autoLockTime) ?? defaultAutoLockoutTime;
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
    },
    checkboxContainer: {
      justifyContent: 'center'
    }
  });
  const handleTimeoutChange = time => {
    dispatch({
      type: DispatchAction.AUTO_LOCK_TIME,
      payload: [time]
    });
  };
  const autoLockTimes = customAutoLockTimes ? customAutoLockTimes === null || customAutoLockTimes === void 0 ? void 0 : customAutoLockTimes.values.map(timer => {
    return {
      title: (timer === null || timer === void 0 ? void 0 : timer.title) ?? '',
      value: (timer === null || timer === void 0 ? void 0 : timer.time) ?? 0,
      testID: `auto-lock-time-${timer.time}`,
      onPress: handleTimeoutChange
    };
  }) : [{
    title: t('AutoLockTimes.FiveMinutes'),
    value: AutoLockTime.FiveMinutes,
    testID: `auto-lock-time-${AutoLockTime.FiveMinutes}`,
    onPress: handleTimeoutChange
  }, {
    title: t('AutoLockTimes.ThreeMinutes'),
    value: AutoLockTime.ThreeMinutes,
    testID: `auto-lock-time-${AutoLockTime.ThreeMinutes}`,
    onPress: handleTimeoutChange
  }, {
    title: t('AutoLockTimes.OneMinute'),
    value: AutoLockTime.OneMinute,
    testID: `auto-lock-time-${AutoLockTime.OneMinute}`,
    onPress: handleTimeoutChange
  }, {
    title: t('AutoLockTimes.Never'),
    value: AutoLockTime.Never,
    testID: `auto-lock-time-${AutoLockTime.Never}`,
    onPress: handleTimeoutChange
  }];
  const LockoutRow = ({
    title,
    value,
    selected,
    testID,
    onPress
  }) => /*#__PURE__*/React.createElement(View, {
    style: [styles.section, styles.sectionRow]
  }, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "title"
  }, title), /*#__PURE__*/React.createElement(Pressable, {
    style: styles.checkboxContainer,
    accessibilityLabel: title,
    accessibilityRole: 'checkbox',
    testID: testIdWithKey('ToggleConnectionInviterCapabilitySwitch')
  }, /*#__PURE__*/React.createElement(BouncyCheckbox, {
    accessibilityLabel: title,
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
    onPress: () => onPress(value),
    isChecked: selected,
    disableBuiltInState: true,
    testID: testIdWithKey(testID)
  })));
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(FlatList, {
    data: autoLockTimes,
    renderItem: ({
      item
    }) => {
      const data = item;
      return /*#__PURE__*/React.createElement(LockoutRow, {
        title: data.title,
        selected: currentLockoutTime === data.value,
        value: data.value,
        testID: data.testID,
        onPress: data.onPress
      });
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
export default AutoLock;
//# sourceMappingURL=AutoLock.js.map