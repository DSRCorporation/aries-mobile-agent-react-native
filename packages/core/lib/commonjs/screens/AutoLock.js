"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _reactNativeBouncyCheckbox = _interopRequireDefault(require("react-native-bouncy-checkbox"));
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _activity = require("../contexts/activity");
var _testable = require("../utils/testable");
var _store = require("../contexts/store");
var _store2 = require("../contexts/reducers/store");
var _theme = require("../contexts/theme");
var _ThemedText = require("../components/texts/ThemedText");
var _containerApi = require("../container-api");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const AutoLock = () => {
  var _customAutoLockTimes$, _store$preferences;
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [store, dispatch] = (0, _store.useStore)();
  const {
    ColorPalette,
    SettingsTheme
  } = (0, _theme.useTheme)();
  const [{
    customAutoLockTimes
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  const defaultAutoLockoutTime = (customAutoLockTimes === null || customAutoLockTimes === void 0 || (_customAutoLockTimes$ = customAutoLockTimes.default) === null || _customAutoLockTimes$ === void 0 ? void 0 : _customAutoLockTimes$.time) ?? _activity.AutoLockTime.FiveMinutes;
  const currentLockoutTime = ((_store$preferences = store.preferences) === null || _store$preferences === void 0 ? void 0 : _store$preferences.autoLockTime) ?? defaultAutoLockoutTime;
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
    },
    checkboxContainer: {
      justifyContent: 'center'
    }
  });
  const handleTimeoutChange = time => {
    dispatch({
      type: _store2.DispatchAction.AUTO_LOCK_TIME,
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
    value: _activity.AutoLockTime.FiveMinutes,
    testID: `auto-lock-time-${_activity.AutoLockTime.FiveMinutes}`,
    onPress: handleTimeoutChange
  }, {
    title: t('AutoLockTimes.ThreeMinutes'),
    value: _activity.AutoLockTime.ThreeMinutes,
    testID: `auto-lock-time-${_activity.AutoLockTime.ThreeMinutes}`,
    onPress: handleTimeoutChange
  }, {
    title: t('AutoLockTimes.OneMinute'),
    value: _activity.AutoLockTime.OneMinute,
    testID: `auto-lock-time-${_activity.AutoLockTime.OneMinute}`,
    onPress: handleTimeoutChange
  }, {
    title: t('AutoLockTimes.Never'),
    value: _activity.AutoLockTime.Never,
    testID: `auto-lock-time-${_activity.AutoLockTime.Never}`,
    onPress: handleTimeoutChange
  }];
  const LockoutRow = ({
    title,
    value,
    selected,
    testID,
    onPress
  }) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.section, styles.sectionRow]
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "title"
  }, title), /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: styles.checkboxContainer,
    accessibilityLabel: title,
    accessibilityRole: 'checkbox',
    testID: (0, _testable.testIdWithKey)('ToggleConnectionInviterCapabilitySwitch')
  }, /*#__PURE__*/_react.default.createElement(_reactNativeBouncyCheckbox.default, {
    accessibilityLabel: title,
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
    onPress: () => onPress(value),
    isChecked: selected,
    disableBuiltInState: true,
    testID: (0, _testable.testIdWithKey)(testID)
  })));
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: autoLockTimes,
    renderItem: ({
      item
    }) => {
      const data = item;
      return /*#__PURE__*/_react.default.createElement(LockoutRow, {
        title: data.title,
        selected: currentLockoutTime === data.value,
        value: data.value,
        testID: data.testID,
        onPress: data.onPress
      });
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
var _default = exports.default = AutoLock;
//# sourceMappingURL=AutoLock.js.map