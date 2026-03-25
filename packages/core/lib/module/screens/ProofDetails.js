import { useAgent, useConnectionById, useProofById } from '@bifold/react-hooks';
import { DidCommProofState } from '@credo-ts/didcomm';
import { ProofMetadata, markProofAsViewed } from '@bifold/verifier';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button, { ButtonType } from '../components/buttons/Button';
import SharedProofData from '../components/misc/SharedProofData';
import { useStore } from '../contexts/store';
import { TOKENS, useServices } from '../container-api';
import { useTheme } from '../contexts/theme';
import { Screens } from '../types/navigators';
import { getConnectionName } from '../utils/helpers';
import { testIdWithKey } from '../utils/testable';
import { useOutOfBandByConnectionId } from '../hooks/connections';
import { ThemedText } from '../components/texts/ThemedText';
import usePreventScreenCapture from '../hooks/screen-capture';
const VerifiedProof = ({
  record,
  isHistory,
  senderReview,
  connectionLabel,
  onBackPressed,
  onGenerateNewPressed
}) => {
  const {
    t
  } = useTranslation();
  const {
    ColorPalette,
    TextTheme,
    Assets
  } = useTheme();
  const [sharedProofDataItems, setSharedProofDataItems] = useState([]);
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1
    },
    iconContainer: {
      backgroundColor: ColorPalette.notification.info,
      width: 100,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15,
      borderRadius: 50,
      borderColor: ColorPalette.notification.infoBorder,
      borderWidth: 3,
      alignSelf: 'center',
      overflow: 'hidden'
    },
    header: {
      paddingHorizontal: 30,
      paddingTop: 20
    },
    headerTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    descriptionContainer: {
      marginHorizontal: 30,
      marginVertical: 30
    },
    label: {
      fontWeight: TextTheme.bold.fontWeight
    },
    content: {
      flexGrow: 1,
      marginHorizontal: 30,
      marginTop: 10
    },
    footerButton: {
      margin: 20
    }
  });
  const onSharedProofDataLoad = useCallback(data => {
    setSharedProofDataItems(data);
  }, []);
  if (isHistory) {
    return /*#__PURE__*/React.createElement(ScrollView, {
      style: {
        flexGrow: 1
      },
      testID: testIdWithKey('ProofDetailsHistoryView')
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.container
    }, sharedProofDataItems.length > 0 && /*#__PURE__*/React.createElement(View, {
      style: styles.descriptionContainer
    }, /*#__PURE__*/React.createElement(ThemedText, null, senderReview ? /*#__PURE__*/React.createElement(React.Fragment, null, t('ProofRequest.ReviewSentInformation', {
      count: sharedProofDataItems.length
    }), ' ', /*#__PURE__*/React.createElement(ThemedText, {
      style: styles.label
    }, connectionLabel)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ThemedText, {
      style: styles.label
    }, connectionLabel), ' ', t('ProofRequest.ShareFollowingInformation', {
      count: sharedProofDataItems.length
    })))), /*#__PURE__*/React.createElement(View, {
      style: styles.content
    }, /*#__PURE__*/React.createElement(SharedProofData, {
      recordId: record.id,
      onSharedProofDataLoad: onSharedProofDataLoad
    }))));
  }
  return /*#__PURE__*/React.createElement(ScrollView, {
    contentContainerStyle: {
      flexGrow: 1
    },
    testID: testIdWithKey('ProofDetailsView')
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.header
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.iconContainer
  }, /*#__PURE__*/React.createElement(Assets.svg.informationReceived, null)), /*#__PURE__*/React.createElement(ThemedText, null, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "bold"
  }, t('Verifier.InformationReceived') + ' '), /*#__PURE__*/React.createElement(ThemedText, null, t('Verifier.InformationReceivedDetails')))), /*#__PURE__*/React.createElement(View, {
    style: styles.content
  }, /*#__PURE__*/React.createElement(SharedProofData, {
    recordId: record.id
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.footerButton
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      marginBottom: 15
    }
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('Verifier.GenerateNewQR'),
    accessibilityLabel: t('Verifier.GenerateNewQR'),
    testID: testIdWithKey('GenerateNewQR'),
    buttonType: ButtonType.Primary,
    onPress: onGenerateNewPressed
  })), /*#__PURE__*/React.createElement(Button, {
    title: t('Verifier.BackToList'),
    accessibilityLabel: t('Verifier.BackToList'),
    testID: testIdWithKey('BackToList'),
    buttonType: ButtonType.Secondary,
    onPress: onBackPressed
  }))));
};
const UnverifiedProof = ({
  record,
  onBackPressed,
  onGenerateNewPressed
}) => {
  const {
    t
  } = useTranslation();
  const {
    TextTheme,
    Assets
  } = useTheme();
  const styles = StyleSheet.create({
    header: {
      paddingHorizontal: 20,
      paddingVertical: 30
    },
    headerTitleContainer: {
      marginTop: 70,
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    headerTitle: {
      ...TextTheme.headingTwo,
      fontWeight: TextTheme.normal.fontWeight
    },
    footerButtons: {
      margin: 20,
      marginTop: 'auto'
    },
    buttonContainer: {
      marginBottom: 10,
      width: '100%'
    }
  });
  return /*#__PURE__*/React.createElement(ScrollView, {
    contentContainerStyle: {
      flexGrow: 1
    },
    testID: testIdWithKey('UnverifiedProofView')
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.header
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.headerTitleContainer
  }, record.state === DidCommProofState.Abandoned && /*#__PURE__*/React.createElement(ThemedText, {
    variant: "bold",
    style: styles.headerTitle
  }, t('ProofRequest.ProofRequestDeclined')), record.isVerified === false && /*#__PURE__*/React.createElement(ThemedText, {
    variant: "bold",
    style: styles.headerTitle
  }, t('Verifier.ProofVerificationFailed'))), /*#__PURE__*/React.createElement(Assets.svg.verifierRequestDeclined, {
    style: {
      alignSelf: 'center',
      marginTop: 20
    },
    height: 200
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.footerButtons
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('Verifier.GenerateNewQR'),
    accessibilityLabel: t('Verifier.GenerateNewQR'),
    testID: testIdWithKey('GenerateNewQR'),
    buttonType: ButtonType.Primary,
    onPress: onGenerateNewPressed
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('Verifier.BackToList'),
    accessibilityLabel: t('Verifier.BackToList'),
    testID: testIdWithKey('BackToList'),
    buttonType: ButtonType.Secondary,
    onPress: onBackPressed
  }))));
};
const ProofDetails = ({
  route,
  navigation
}) => {
  var _useOutOfBandByConnec;
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('ProofRequesting route params were not set properly');
  }
  const {
    recordId,
    isHistory,
    senderReview
  } = route.params;
  const record = useProofById(recordId);
  const connection = useConnectionById((record === null || record === void 0 ? void 0 : record.connectionId) ?? '');
  const goalCode = (_useOutOfBandByConnec = useOutOfBandByConnectionId((connection === null || connection === void 0 ? void 0 : connection.id) ?? '')) === null || _useOutOfBandByConnec === void 0 ? void 0 : _useOutOfBandByConnec.outOfBandInvitation.goalCode;
  const {
    t
  } = useTranslation();
  const {
    agent
  } = useAgent();
  const [store] = useStore();
  const [logger, {
    preventScreenCapture
  }] = useServices([TOKENS.UTIL_LOGGER, TOKENS.CONFIG]);
  usePreventScreenCapture(preventScreenCapture);
  const connectionLabel = useMemo(() => connection ? getConnectionName(connection, store.preferences.alternateContactNames) : t('Verifier.ConnectionLessLabel'), [connection, store.preferences.alternateContactNames, t]);
  const cleanup = useCallback(() => {
    if (!agent) {
      return;
    }
    const promises = Array();
    if (!store.preferences.useDataRetention) {
      promises.push(agent.modules.proofs.deleteById(recordId));
    }
    if (record && record.connectionId && (record.metadata.get(ProofMetadata.customMetadata).delete_conn_after_seen || goalCode !== null && goalCode !== void 0 && goalCode.endsWith('verify.once'))) {
      promises.push(agent.modules.connections.deleteById(record.connectionId));
    }
    return Promise.allSettled(promises);
  }, [store.preferences.useDataRetention, agent, recordId, record, goalCode]);
  const onBackPressed = useCallback(() => {
    var _cleanup;
    (_cleanup = cleanup()) === null || _cleanup === void 0 || _cleanup.catch(err => logger.error(`Error cleaning up proof, ${err}`));
    if (route.params.isHistory) {
      navigation.goBack();
      return null;
    }
    navigation.navigate(Screens.ProofRequests, {});
    return null;
  }, [navigation, cleanup, route.params.isHistory, logger]);
  const onGenerateNewPressed = useCallback(() => {
    var _cleanup2;
    if (!record) {
      return;
    }
    (_cleanup2 = cleanup()) === null || _cleanup2 === void 0 || _cleanup2.catch(err => logger.error(`Error cleaning up proof, ${err}`));
    const metadata = record.metadata.get(ProofMetadata.customMetadata);
    if (metadata !== null && metadata !== void 0 && metadata.proof_request_template_id) {
      navigation.navigate(Screens.ProofRequesting, {
        templateId: metadata.proof_request_template_id
      });
    } else {
      navigation.navigate(Screens.ProofRequests, {});
    }
  }, [record, navigation, cleanup, logger]);
  useEffect(() => {
    var _record$metadata;
    if (agent && record && !((_record$metadata = record.metadata) !== null && _record$metadata !== void 0 && (_record$metadata = _record$metadata.data) !== null && _record$metadata !== void 0 && (_record$metadata = _record$metadata.customMetadata) !== null && _record$metadata !== void 0 && _record$metadata.details_seen)) {
      markProofAsViewed(agent, record);
    }
  }, [agent, record]);
  useFocusEffect(useCallback(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPressed);
    return () => subscription.remove();
  }, [onBackPressed]));
  useEffect(() => {
    if (!connectionLabel || !isHistory) {
      return;
    }
    navigation.setOptions({
      title: connectionLabel
    });
  }, [isHistory, navigation, connectionLabel]);
  if (!record) return null;
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      flexGrow: 1
    },
    edges: ['left', 'right']
  }, (record.isVerified || senderReview) && /*#__PURE__*/React.createElement(VerifiedProof, {
    record: record,
    isHistory: isHistory,
    senderReview: senderReview,
    connectionLabel: connectionLabel,
    onBackPressed: onBackPressed,
    onGenerateNewPressed: onGenerateNewPressed
  }), !(record.isVerified || senderReview) && /*#__PURE__*/React.createElement(UnverifiedProof, {
    record: record,
    onBackPressed: onBackPressed,
    onGenerateNewPressed: onGenerateNewPressed
  }));
};
export default ProofDetails;
//# sourceMappingURL=ProofDetails.js.map