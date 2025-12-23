import { DidExchangeState, ProofState } from '@credo-ts/core';
import { useAgent, useProofById } from '@credo-ts/react-hooks';
import { ProofMetadata, linkProofWithTemplate, sendProofRequest } from '@hyperledger/aries-bifold-verifier';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, DeviceEventEmitter, ScrollView, Share, StyleSheet, Text, Vibration, View, useWindowDimensions } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingIndicator from '../components/animated/LoadingIndicator';
import Button, { ButtonType } from '../components/buttons/Button';
import HeaderButton, { ButtonLocation } from '../components/buttons/HeaderButton';
import QRRenderer from '../components/misc/QRRenderer';
import { EventTypes } from '../constants';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { useConnectionByOutOfBandId } from '../hooks/connections';
import { useTemplate } from '../hooks/proof-request-templates';
import { BifoldError } from '../types/error';
import { Screens } from '../types/navigators';
import { createTempConnectionInvitation } from '../utils/helpers';
import { testIdWithKey } from '../utils/testable';
const useQrSizeForDevice = () => {
  const {
    width
  } = useWindowDimensions();
  const qrContainerSize = isTablet() ? width - width * 0.3 : width - 20;
  const qrSize = qrContainerSize - 20;
  return {
    qrSize,
    qrContainerSize
  };
};
const ProofRequesting = ({
  route,
  navigation
}) => {
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('ProofRequesting route prams were not set properly');
  }
  const {
    templateId,
    predicateValues
  } = route === null || route === void 0 ? void 0 : route.params;
  const {
    agent
  } = useAgent();
  if (!agent) {
    throw new Error('Unable to fetch agent from Credo');
  }
  const {
    t
  } = useTranslation();
  const {
    ColorPallet,
    TextTheme
  } = useTheme();
  const isFocused = useIsFocused();
  const [store] = useStore();
  const [generating, setGenerating] = useState(true);
  const [message, setMessage] = useState(undefined);
  const [connectionRecordId, setConnectionRecordId] = useState(undefined);
  const [proofRecordId, setProofRecordId] = useState(undefined);
  const record = useConnectionByOutOfBandId(connectionRecordId ?? '');
  const proofRecord = useProofById(proofRecordId ?? '');
  const template = useTemplate(templateId);
  const {
    qrSize,
    qrContainerSize
  } = useQrSizeForDevice();
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: ColorPallet.grayscale.white
    },
    headerContainer: {
      alignItems: 'center',
      paddingVertical: 16,
      marginHorizontal: 20,
      textAlign: 'center'
    },
    primaryHeaderText: {
      ...TextTheme.headingThree,
      textAlign: 'center',
      marginTop: 20
    },
    secondaryHeaderText: {
      ...TextTheme.normal,
      textAlign: 'center',
      marginTop: 8,
      color: ColorPallet.grayscale.black
    },
    interopText: {
      alignSelf: 'center',
      marginBottom: -20,
      paddingHorizontal: 10,
      backgroundColor: ColorPallet.grayscale.white,
      zIndex: 100,
      textAlign: 'center',
      fontWeight: TextTheme.bold.fontWeight,
      fontSize: 22,
      color: ColorPallet.brand.primary
    },
    qrContainer: {
      height: qrContainerSize,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
      marginTop: 15
    },
    buttonContainer: {
      marginTop: 'auto',
      marginHorizontal: 20,
      marginBottom: 10
    }
  });
  const createProofRequest = useCallback(async () => {
    try {
      setMessage(undefined);
      setGenerating(true);
      const result = await createTempConnectionInvitation(agent, 'verify');
      if (result) {
        setConnectionRecordId(result.record.id);
        setMessage(result.invitationUrl);
      }
    } catch (e) {
      const error = new BifoldError(t('Error.Title1038'), t('Error.Message1038'), (e === null || e === void 0 ? void 0 : e.message) ?? e, 1038);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
      navigation.goBack();
    } finally {
      setGenerating(false);
    }
  }, []);
  useFocusEffect(useCallback(() => {
    const onBackPress = () => {
      navigation.navigate(Screens.ProofRequests, {});
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []));
  useEffect(() => {
    if (message && store.preferences.enableShareableLink) {
      const scanShareUrl = () => /*#__PURE__*/React.createElement(HeaderButton, {
        buttonLocation: ButtonLocation.Right,
        accessibilityLabel: t('Global.Share'),
        testID: testIdWithKey('ShareButton'),
        onPress: () => {
          Share.share({
            message
          });
        },
        icon: "share-variant"
      });
      navigation.setOptions({
        headerRight: scanShareUrl
      });
    }
  }, [message, store.preferences.enableShareableLink]);
  useEffect(() => {
    if (isFocused) {
      createProofRequest();
    }
  }, [isFocused]);
  useEffect(() => {
    if (!template) {
      return;
    }
    const sendAsyncProof = async () => {
      if (record && record.state === DidExchangeState.Completed) {
        //send haptic feedback to verifier that connection is completed
        Vibration.vibrate();
        // send proof logic
        const result = await sendProofRequest(agent, template, record.id, predicateValues);
        if (result !== null && result !== void 0 && result.proofRecord) {
          // verifier side doesn't have access to the goal code so we need to add metadata here
          const metadata = result.proofRecord.metadata.get(ProofMetadata.customMetadata);
          result.proofRecord.metadata.set(ProofMetadata.customMetadata, {
            ...metadata,
            delete_conn_after_seen: true
          });
          linkProofWithTemplate(agent, result.proofRecord, templateId);
        }
        setProofRecordId(result === null || result === void 0 ? void 0 : result.proofRecord.id);
      }
    };
    sendAsyncProof();
  }, [record, template]);
  useEffect(() => {
    if (proofRecord && proofRecord.state === ProofState.RequestSent) {
      navigation.navigate(Screens.MobileVerifierLoading, {
        proofId: proofRecord.id,
        connectionId: (record === null || record === void 0 ? void 0 : record.id) ?? ''
      });
    }
  }, [proofRecord]);
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.container,
    edges: ['left', 'right', 'bottom']
  }, /*#__PURE__*/React.createElement(ScrollView, null, /*#__PURE__*/React.createElement(View, {
    style: styles.qrContainer
  }, generating && /*#__PURE__*/React.createElement(LoadingIndicator, null), message && /*#__PURE__*/React.createElement(QRRenderer, {
    value: message,
    size: qrSize
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.headerContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.secondaryHeaderText
  }, t('Verifier.ScanQR')), /*#__PURE__*/React.createElement(Text, {
    style: styles.primaryHeaderText
  }, template === null || template === void 0 ? void 0 : template.name))), /*#__PURE__*/React.createElement(View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('Verifier.RefreshQR'),
    accessibilityLabel: t('Verifier.RefreshQR'),
    testID: testIdWithKey('GenerateNewQR'),
    buttonType: ButtonType.Primary,
    onPress: () => createProofRequest(),
    disabled: generating
  })));
};
export default ProofRequesting;
//# sourceMappingURL=ProofRequesting.js.map