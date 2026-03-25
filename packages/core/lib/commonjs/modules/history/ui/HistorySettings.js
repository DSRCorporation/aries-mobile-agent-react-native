"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _ButtonApi = require("../../../components/buttons/Button-api");
var _ScreenWrapper = _interopRequireDefault(require("../../../components/views/ScreenWrapper"));
var _containerApi = require("../../../container-api");
var _animatedComponents = require("../../../contexts/animated-components");
var _theme = require("../../../contexts/theme");
var _testable = require("../../../utils/testable");
var _SingleSelectBlock = _interopRequireDefault(require("./components/SingleSelectBlock"));
var _ThemedText = require("../../../components/texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// eslint-disable-next-line import/no-named-as-default

const HistorySettings = () => {
  const [continueEnabled] = (0, _react.useState)(true);
  const [isLoading] = (0, _react.useState)(false);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const {
    ButtonLoading
  } = (0, _animatedComponents.useAnimatedComponents)();
  const actionButtonLabel = t('Global.SaveSettings');
  const actionButtonTestId = (0, _testable.testIdWithKey)('Save');
  const [Button, logger, loadHistory] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMPONENT_BUTTON, _containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.FN_LOAD_HISTORY]);
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const historyManager = agent ? loadHistory(agent) : undefined;

  //State
  const [initialHistory, setInitialHistory] = (0, _react.useState)(); // Initial history settings option
  const [historyOptionSelected, setHistoryOptionSelected] = (0, _react.useState)(initialHistory); // Selected history settings option

  const style = _reactNative.StyleSheet.create({
    screenContainer: {
      height: '100%',
      backgroundColor: ColorPalette.brand.primaryBackground,
      padding: 20,
      justifyContent: 'space-between'
    },
    title: {
      marginTop: 16
    },
    deleteButtonText: {
      alignSelf: 'flex-start',
      color: '#CD0000' //TODO: Use Bifold alert color
    },
    deleteButton: {
      marginBottom: 16
    },
    gap: {
      marginTop: 10,
      marginBottom: 10
    },
    // below used as helpful labels for views, no properties needed atp
    contentContainer: {},
    controlsContainer: {}
  });
  const onSelectHistory = newHistoryOption => {
    // console.log('on select history:', JSON.stringify(newHistoryOption))
    //TODO: Impliment warning of old history clearing on the below condition
    // if (newHistoryOption && newHistoryOption.key) {
    //   if ((initialHistory?.key as number) > newHistoryOption.key) {
    //     setShowWarningDisclaimer(true)
    //   } else {
    //     setShowWarningDisclaimer(false)
    //   }
    // }
    setHistoryOptionSelected(newHistoryOption);
    //TODO: Impliment success alert
    // setIsSuccess(false)
  };
  const handleSaveHistorySettings = (0, _react.useCallback)(async () => {
    if (!historyManager) {
      logger.error(`[${HistorySettings.name}]: historyManager undefined!`);
      return;
    }
    try {
      if (!historyOptionSelected && initialHistory) {
        await historyManager.handleStoreHistorySettings(initialHistory);
      } else {
        await historyManager.handleStoreHistorySettings(historyOptionSelected);
      }
      //TODO: Impliment Alert
      //   setShowWarningDisclaimer(false)
      //   setIsSuccess(true)
      //   scrollViewRef.current?.scrollTo({
      //     y: 0,
      //     animated: true,
      //   })
      // console.log('History option saved')
    } catch {
      //TODO: Impliment Alert
      // console.log('Error:', e)
      //   log(`[${SettingsActivityHistory.name}]: Handle history save: ${e}`, LogLevel.error)
      //   Toast.show({
      //     type: 'error',
      //     text1: (e as Error)?.message || t('Global.Failure'),
      //   })
    }
  }, [historyManager, logger, historyOptionSelected, initialHistory]);

  /**
   * Find current set history
   */
  (0, _react.useEffect)(() => {
    const getSavedHistorySettingsOption = async () => {
      if (!historyManager) {
        logger.error(`[${HistorySettings.name}]:[getSavedHistorySettingsOption] historyManager undefined!`);
        return;
      }
      const storedHistorySettingsOption = await historyManager.getStoredHistorySettingsOption();
      if (storedHistorySettingsOption === 'Never') {
        //TODO: Impliment "Never" option
        //   setIsActivityHistoryDisabled(true)
      } else {
        setInitialHistory(storedHistorySettingsOption ? historyManager.getHistorySettingsOptionList().find(l => l.id === storedHistorySettingsOption) : undefined);
      }
    };
    getSavedHistorySettingsOption().catch(e => {
      logger.error(`[${HistorySettings.name}]:[getSavedHistorySettingsOption] Error: ${e}`);
    });
  }, [historyManager, logger]);
  return /*#__PURE__*/_react.default.createElement(_ScreenWrapper.default, {
    keyboardActive: true
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.screenContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.contentContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "headerTitle",
    style: style.title
  }, t('ActivityHistory.Title')), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: style.title
  }, t('ActivityHistory.Description')), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.gap
  }), /*#__PURE__*/_react.default.createElement(_SingleSelectBlock.default, {
    initialSelect: initialHistory,
    selection: historyManager === null || historyManager === void 0 ? void 0 : historyManager.getHistorySettingsOptionList(),
    onSelect: onSelectHistory
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.controlsContainer
  }, /*#__PURE__*/_react.default.createElement(Button, {
    title: actionButtonLabel,
    testID: actionButtonTestId,
    accessibilityLabel: actionButtonLabel,
    buttonType: _ButtonApi.ButtonType.Primary,
    onPress: handleSaveHistorySettings
  }, !continueEnabled && isLoading ? /*#__PURE__*/_react.default.createElement(ButtonLoading, null) : null), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginBottom: 10
    }
  }), /*#__PURE__*/_react.default.createElement(Button, {
    title: t('ActivityHistory.StopKeepingHistory'),
    testID: actionButtonTestId,
    accessibilityLabel: actionButtonLabel,
    buttonType: _ButtonApi.ButtonType.Secondary,
    onPress: async () => {
      // console.log('save history')
    }
  }, !continueEnabled && isLoading ? /*#__PURE__*/_react.default.createElement(ButtonLoading, null) : null))));
};
var _default = exports.default = HistorySettings;
//# sourceMappingURL=HistorySettings.js.map