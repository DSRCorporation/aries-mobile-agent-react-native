import { useAgent } from '@bifold/react-hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

// eslint-disable-next-line import/no-named-as-default
import { ButtonType } from '../../../components/buttons/Button-api';
import ScreenWrapper from '../../../components/views/ScreenWrapper';
import { TOKENS, useServices } from '../../../container-api';
import { useAnimatedComponents } from '../../../contexts/animated-components';
import { useTheme } from '../../../contexts/theme';
import { testIdWithKey } from '../../../utils/testable';
import SingleSelectBlock from './components/SingleSelectBlock';
import { ThemedText } from '../../../components/texts/ThemedText';
const HistorySettings = () => {
  const [continueEnabled] = useState(true);
  const [isLoading] = useState(false);
  const {
    t
  } = useTranslation();
  const {
    ColorPalette
  } = useTheme();
  const {
    ButtonLoading
  } = useAnimatedComponents();
  const actionButtonLabel = t('Global.SaveSettings');
  const actionButtonTestId = testIdWithKey('Save');
  const [Button, logger, loadHistory] = useServices([TOKENS.COMPONENT_BUTTON, TOKENS.UTIL_LOGGER, TOKENS.FN_LOAD_HISTORY]);
  const {
    agent
  } = useAgent();
  const historyManager = agent ? loadHistory(agent) : undefined;

  //State
  const [initialHistory, setInitialHistory] = useState(); // Initial history settings option
  const [historyOptionSelected, setHistoryOptionSelected] = useState(initialHistory); // Selected history settings option

  const style = StyleSheet.create({
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
  const handleSaveHistorySettings = useCallback(async () => {
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
  useEffect(() => {
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
  return /*#__PURE__*/React.createElement(ScreenWrapper, {
    keyboardActive: true
  }, /*#__PURE__*/React.createElement(View, {
    style: style.screenContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: style.contentContainer
  }, /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "headerTitle",
    style: style.title
  }, t('ActivityHistory.Title')), /*#__PURE__*/React.createElement(ThemedText, {
    style: style.title
  }, t('ActivityHistory.Description')), /*#__PURE__*/React.createElement(View, {
    style: style.gap
  }), /*#__PURE__*/React.createElement(SingleSelectBlock, {
    initialSelect: initialHistory,
    selection: historyManager === null || historyManager === void 0 ? void 0 : historyManager.getHistorySettingsOptionList(),
    onSelect: onSelectHistory
  }))), /*#__PURE__*/React.createElement(View, {
    style: style.controlsContainer
  }, /*#__PURE__*/React.createElement(Button, {
    title: actionButtonLabel,
    testID: actionButtonTestId,
    accessibilityLabel: actionButtonLabel,
    buttonType: ButtonType.Primary,
    onPress: handleSaveHistorySettings
  }, !continueEnabled && isLoading ? /*#__PURE__*/React.createElement(ButtonLoading, null) : null), /*#__PURE__*/React.createElement(View, {
    style: {
      marginBottom: 10
    }
  }), /*#__PURE__*/React.createElement(Button, {
    title: t('ActivityHistory.StopKeepingHistory'),
    testID: actionButtonTestId,
    accessibilityLabel: actionButtonLabel,
    buttonType: ButtonType.Secondary,
    onPress: async () => {
      // console.log('save history')
    }
  }, !continueEnabled && isLoading ? /*#__PURE__*/React.createElement(ButtonLoading, null) : null))));
};
export default HistorySettings;
//# sourceMappingURL=HistorySettings.js.map