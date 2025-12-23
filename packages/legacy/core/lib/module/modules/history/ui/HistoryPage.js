import { useAgent } from '@credo-ts/react-hooks';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, View } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler'

import { ButtonType } from '../../../components/buttons/Button-api';
import KeyboardView from '../../../components/views/KeyboardView';
import { TOKENS, useServices } from '../../../container-api';
import { useAnimatedComponents } from '../../../contexts/animated-components';
import { useTheme } from '../../../contexts/theme';
import { testIdWithKey } from '../../../utils/testable';
import { RecordType } from '../types';
import HistoryListItem from './components/HistoryListItem';
const HistoryPage = () => {
  //   const updatePin = (route.params as any)?.updatePin
  const [continueEnabled] = useState(true);
  const [isLoading] = useState(false);
  const [historyItems, setHistoryItems] = useState();
  const {
    t
  } = useTranslation();
  const {
    agent
  } = useAgent();
  const {
    ColorPallet,
    TextTheme
  } = useTheme();
  const {
    ButtonLoading
  } = useAnimatedComponents();
  const actionButtonLabel = t('Global.SaveSettings');
  const actionButtonTestId = testIdWithKey('Save');
  const [Button, logger, loadHistory] = useServices([TOKENS.COMP_BUTTON, TOKENS.UTIL_LOGGER, TOKENS.FN_LOAD_HISTORY]);
  const historyManager = agent ? loadHistory(agent) : undefined;

  //State

  const style = StyleSheet.create({
    screenContainer: {
      height: '100%',
      backgroundColor: ColorPallet.brand.primaryBackground,
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

  /** Load history */
  const getAllHistory = async () => {
    if (!historyManager) {
      logger.error(`[${HistoryPage.name}][getAllHistory]: historyManager undefined!`);
      return;
    }
    const allRecords = await historyManager.getHistoryItems({
      type: RecordType.HistoryRecord
    });
    allRecords.sort((objA, objB) => Number(objB.content.createdAt) - Number(objA.content.createdAt));
    if (allRecords) {
      setHistoryItems(allRecords);
    }
  };

  //UI
  const renderEmptyListComponent = () => {
    return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
      style: [style.title, TextTheme.headerTitle]
    }, t('ActivityHistory.NoHistory')));
  };
  const renderHistoryListItem = item => {
    return /*#__PURE__*/React.createElement(HistoryListItem, {
      item: item
    });
  };
  useFocusEffect(useCallback(() => {
    getAllHistory();
  }, []));
  return /*#__PURE__*/React.createElement(KeyboardView, null, /*#__PURE__*/React.createElement(View, {
    style: style.screenContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: style.contentContainer
  }, /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Button, {
    title: t('History.SortFilterButton'),
    testID: actionButtonTestId,
    accessibilityLabel: actionButtonLabel,
    buttonType: ButtonType.Secondary,
    onPress: async () => {
      //TODO: Save settings
      // console.log('save history')
    }
  }, !continueEnabled && isLoading ? /*#__PURE__*/React.createElement(ButtonLoading, null) : null), /*#__PURE__*/React.createElement(View, {
    style: style.gap
  }), /*#__PURE__*/React.createElement(FlatList, {
    showsVerticalScrollIndicator: false,
    style: {
      flexGrow: 0
    },
    data: historyItems,
    ListEmptyComponent: renderEmptyListComponent,
    renderItem: element => renderHistoryListItem(element.item)
  })))));
};
export default HistoryPage;
//# sourceMappingURL=HistoryPage.js.map