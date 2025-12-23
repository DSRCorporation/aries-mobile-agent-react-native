import { ProofState } from '@credo-ts/core';
import { useAgent, useConnectionById, useProofById } from '@credo-ts/react-hooks';
import { ProofMetadata, markProofAsViewed } from '@hyperledger/aries-bifold-verifier';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InformationReceived from '../assets/img/information-received.svg';
import Button, { ButtonType } from '../components/buttons/Button';
import SharedProofData from '../components/misc/SharedProofData';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { Screens } from '../types/navigators';
import { getConnectionName } from '../utils/helpers';
import { testIdWithKey } from '../utils/testable';
const VerifiedProof = ({
  record,
  navigation,
  isHistory,
  senderReview
}) => {
  const {
    t
  } = useTranslation();
  const {
    ColorPallet,
    TextTheme
  } = useTheme();
  const [store] = useStore();
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1
    },
    iconContainer: {
      backgroundColor: ColorPallet.notification.info,
      width: 100,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15,
      borderRadius: 50,
      borderColor: ColorPallet.notification.infoBorder,
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
    headerTitle: {
      ...TextTheme.bold
    },
    headerDetails: {
      ...TextTheme.normal
    },
    descriptionContainer: {
      marginHorizontal: 30,
      marginVertical: 30
    },
    descriptionText: {
      ...TextTheme.normal
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
  const connection = useConnectionById(record.connectionId || '');
  const connectionLabel = useMemo(() => connection ? getConnectionName(connection, store.preferences.alternateContactNames) : t('Verifier.ConnectionLessLabel'), [connection, store.preferences.alternateContactNames]);
  const [sharedProofDataItems, setSharedProofDataItems] = useState([]);
  const onSharedProofDataLoad = data => {
    setSharedProofDataItems(data);
  };
  const onGenerateNew = useCallback(() => {
    const metadata = record.metadata.get(ProofMetadata.customMetadata);
    if (metadata !== null && metadata !== void 0 && metadata.proof_request_template_id) {
      navigation.navigate(Screens.ProofRequesting, {
        templateId: metadata.proof_request_template_id
      });
    } else {
      navigation.navigate(Screens.ProofRequests, {});
    }
  }, [navigation]);
  const onBack = useCallback(() => {
    navigation.navigate(Screens.ProofRequests, {});
  }, [navigation]);
  useEffect(() => {
    if (!connection || !isHistory) return;
    navigation.setOptions({
      title: connectionLabel
    });
  }, [connection]);
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
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.descriptionText
    }, senderReview ? /*#__PURE__*/React.createElement(React.Fragment, null, t('ProofRequest.ReviewSentInformation', {
      count: sharedProofDataItems.length
    }), ' ', /*#__PURE__*/React.createElement(Text, {
      style: styles.label
    }, connectionLabel)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
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
  }, /*#__PURE__*/React.createElement(InformationReceived, null)), /*#__PURE__*/React.createElement(Text, null, /*#__PURE__*/React.createElement(Text, {
    style: styles.headerTitle
  }, t('Verifier.InformationReceived') + ' '), /*#__PURE__*/React.createElement(Text, {
    style: styles.headerDetails
  }, t('Verifier.InformationReceivedDetails')))), /*#__PURE__*/React.createElement(View, {
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
    onPress: onGenerateNew
  })), /*#__PURE__*/React.createElement(Button, {
    title: t('Verifier.BackToList'),
    accessibilityLabel: t('Verifier.BackToList'),
    testID: testIdWithKey('BackToList'),
    buttonType: ButtonType.Secondary,
    onPress: onBack
  }))));
};
const UnverifiedProof = ({
  record,
  navigation
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
  const onGenerateNew = useCallback(() => {
    const metadata = record.metadata.get(ProofMetadata.customMetadata);
    if (metadata !== null && metadata !== void 0 && metadata.proof_request_template_id) {
      navigation.navigate(Screens.ProofRequesting, {
        templateId: metadata.proof_request_template_id
      });
    } else {
      navigation.navigate(Screens.ProofRequests, {});
    }
  }, [navigation]);
  const onBackToList = useCallback(() => {
    navigation.navigate(Screens.ProofRequests, {});
  }, [navigation]);
  return /*#__PURE__*/React.createElement(ScrollView, {
    contentContainerStyle: {
      flexGrow: 1
    },
    testID: testIdWithKey('UnverifiedProofView')
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.header
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.headerTitleContainer
  }, record.state === ProofState.Abandoned && /*#__PURE__*/React.createElement(Text, {
    style: styles.headerTitle
  }, t('ProofRequest.ProofRequestDeclined')), record.isVerified === false && /*#__PURE__*/React.createElement(Text, {
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
    onPress: onGenerateNew
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('Verifier.BackToList'),
    accessibilityLabel: t('Verifier.BackToList'),
    testID: testIdWithKey('BackToList'),
    buttonType: ButtonType.Secondary,
    onPress: onBackToList
  }))));
};
const ProofDetails = ({
  route,
  navigation
}) => {
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('ProofRequesting route prams were not set properly');
  }
  const {
    recordId,
    isHistory,
    senderReview
  } = route === null || route === void 0 ? void 0 : route.params;
  const record = useProofById(recordId);
  const {
    agent
  } = useAgent();
  const [store] = useStore();
  useEffect(() => {
    return () => {
      if (!store.preferences.useDataRetention) {
        agent === null || agent === void 0 || agent.proofs.deleteById(recordId);
      }
      if ((record === null || record === void 0 ? void 0 : record.metadata.get(ProofMetadata.customMetadata)).delete_conn_after_seen) {
        agent === null || agent === void 0 || agent.connections.deleteById((record === null || record === void 0 ? void 0 : record.connectionId) ?? '');
      }
    };
  }, []);
  useEffect(() => {
    var _record$metadata;
    if (agent && record && !((_record$metadata = record.metadata) !== null && _record$metadata !== void 0 && (_record$metadata = _record$metadata.data) !== null && _record$metadata !== void 0 && (_record$metadata = _record$metadata.customMetadata) !== null && _record$metadata !== void 0 && _record$metadata.details_seen)) {
      markProofAsViewed(agent, record);
    }
  }, [record]);
  useFocusEffect(useCallback(() => {
    const onBackPress = () => {
      if (route.params.isHistory) {
        navigation.goBack();
      } else {
        navigation.navigate(Screens.ProofRequests, {});
      }
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []));
  if (!record) return null;
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      flexGrow: 1
    },
    edges: ['left', 'right']
  }, (record.isVerified || senderReview) && /*#__PURE__*/React.createElement(VerifiedProof, {
    record: record,
    isHistory: isHistory,
    navigation: navigation,
    senderReview: senderReview
  }), !(record.isVerified || senderReview) && /*#__PURE__*/React.createElement(UnverifiedProof, {
    record: record,
    navigation: navigation
  }));
};
export default ProofDetails;
//# sourceMappingURL=ProofDetails.js.map