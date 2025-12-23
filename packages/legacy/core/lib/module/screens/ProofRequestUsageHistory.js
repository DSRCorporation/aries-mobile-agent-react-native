import { ProofState } from '@credo-ts/core';
import { useConnectionById } from '@credo-ts/react-hooks';
import { isPresentationReceived, useProofsByTemplateId } from '@hyperledger/aries-bifold-verifier';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EmptyList from '../components/misc/EmptyList';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { Screens } from '../types/navigators';
import { formatTime, getConnectionName } from '../utils/helpers';
import { testIdWithKey } from '../utils/testable';
const getPresentationStateLabel = record => {
  switch (record.state) {
    case ProofState.RequestSent:
      return 'Verifier.RequestSent';
    case ProofState.PresentationReceived:
      return 'Verifier.PresentationReceived';
    case ProofState.Declined:
    case ProofState.Abandoned:
      return 'Verifier.ProofRequestRejected';
    case ProofState.Done:
      return record.isVerified ? 'Verifier.PresentationReceived' : 'Verifier.PresentationFailed';
    default:
      return '';
  }
};
const ProofRequestUsageHistoryRecord = ({
  record,
  navigation
}) => {
  const {
    t
  } = useTranslation();
  const {
    ListItems,
    ColorPallet
  } = useTheme();
  const [store] = useStore();
  const connection = useConnectionById(record.connectionId ?? '');
  const theirLabel = useMemo(() => getConnectionName(connection, store.preferences.alternateContactNames), [connection, store.preferences.alternateContactNames]);
  const style = StyleSheet.create({
    card: {
      ...ListItems.requestTemplateBackground,
      flexGrow: 1,
      flexDirection: 'row',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10
    },
    leftContainer: {
      flexDirection: 'column',
      marginVertical: 10
    },
    cardRow: {
      flexDirection: 'row',
      marginVertical: 2
    },
    valueLabel: {
      color: ColorPallet.grayscale.black
    },
    valueText: {
      ...ListItems.requestTemplateTitle,
      marginLeft: 4
    },
    rightContainer: {
      flexGrow: 1,
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
    },
    icon: {
      ...ListItems.requestTemplateIcon
    },
    date: {
      ...ListItems.requestTemplateDate
    }
  });
  const presentationReceived = useMemo(() => isPresentationReceived(record), [record]);
  const onDetails = useCallback(() => {
    navigation.navigate(Screens.ProofDetails, {
      recordId: record.id,
      isHistory: true
    });
  }, [navigation, record]);
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: style.card,
    onPress: onDetails,
    disabled: !presentationReceived,
    accessibilityLabel: t('Screens.ProofDetails'),
    testID: testIdWithKey('ProofDetails')
  }, /*#__PURE__*/React.createElement(View, {
    style: style.leftContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: style.cardRow
  }, /*#__PURE__*/React.createElement(Text, {
    style: style.valueLabel
  }, t('Verifier.PresentationFrom'), ":"), /*#__PURE__*/React.createElement(Text, {
    style: style.valueText
  }, theirLabel || t('Verifier.ConnectionlessPresentation'))), /*#__PURE__*/React.createElement(View, {
    style: style.cardRow
  }, /*#__PURE__*/React.createElement(Text, {
    style: style.valueLabel
  }, t('Verifier.PresentationState'), ":"), /*#__PURE__*/React.createElement(Text, {
    style: style.valueText
  }, t(getPresentationStateLabel(record))))), /*#__PURE__*/React.createElement(View, {
    style: style.rightContainer
  }, presentationReceived && /*#__PURE__*/React.createElement(Icon, {
    style: style.icon,
    name: 'chevron-right'
  }), /*#__PURE__*/React.createElement(Text, {
    style: style.date
  }, formatTime(record.createdAt, {
    shortMonth: true
  }))));
};
const ProofRequestUsageHistory = ({
  route,
  navigation
}) => {
  const {
    templateId
  } = route === null || route === void 0 ? void 0 : route.params;
  const style = StyleSheet.create({
    container: {
      flexGrow: 1,
      margin: 20,
      elevation: 5
    }
  });
  const proofs = useProofsByTemplateId(templateId);
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: style.container,
    edges: ['left', 'right']
  }, /*#__PURE__*/React.createElement(FlatList, {
    data: proofs,
    keyExtractor: proof => proof.id,
    renderItem: ({
      item
    }) => /*#__PURE__*/React.createElement(ProofRequestUsageHistoryRecord, {
      record: item,
      navigation: navigation
    }),
    ListEmptyComponent: () => /*#__PURE__*/React.createElement(EmptyList, null)
  }));
};
export default ProofRequestUsageHistory;
//# sourceMappingURL=ProofRequestUsageHistory.js.map