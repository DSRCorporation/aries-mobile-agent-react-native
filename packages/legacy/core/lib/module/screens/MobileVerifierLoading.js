import { useAgent, useProofById } from '@credo-ts/react-hooks';
import { isPresentationFailed, isPresentationReceived } from '@hyperledger/aries-bifold-verifier';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import PresentationLoading from '../components/animated/PresentationLoading';
import Button, { ButtonType } from '../components/buttons/Button';
import { useTheme } from '../contexts/theme';
import { useOutOfBandByConnectionId } from '../hooks/connections';
import { Screens } from '../types/navigators';
import { testIdWithKey } from '../utils/testable';
const MobileVerifierLoading = ({
  navigation,
  route
}) => {
  var _useOutOfBandByConnec;
  const {
    proofId,
    connectionId
  } = route.params;
  const goalCode = (_useOutOfBandByConnec = useOutOfBandByConnectionId(connectionId)) === null || _useOutOfBandByConnec === void 0 ? void 0 : _useOutOfBandByConnec.outOfBandInvitation.goalCode;
  const proofRecord = useProofById(proofId);
  const {
    ColorPallet,
    TextTheme
  } = useTheme();
  const {
    agent
  } = useAgent();
  if (!agent) {
    throw new Error('Unable to fetch agent from Credo');
  }
  const {
    t
  } = useTranslation();
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: ColorPallet.brand.modalPrimaryBackground,
      padding: 20
    },
    image: {
      marginTop: 20
    },
    messageContainer: {
      alignItems: 'center'
    },
    messageText: {
      fontWeight: TextTheme.normal.fontWeight,
      textAlign: 'center',
      marginTop: 30
    },
    controlsContainer: {
      marginTop: 'auto',
      margin: 20
    },
    delayMessageText: {
      textAlign: 'center',
      marginTop: 20
    }
  });
  const onDismissModalTouched = () => {
    navigation.pop();
  };
  useEffect(() => {
    if (proofRecord && (isPresentationReceived(proofRecord) || isPresentationFailed(proofRecord))) {
      if (goalCode !== null && goalCode !== void 0 && goalCode.endsWith('verify.once')) {
        agent.connections.deleteById(connectionId);
      }
      navigation.replace(Screens.ProofDetails, {
        recordId: proofRecord.id
      });
    }
  }, [proofRecord]);
  return /*#__PURE__*/React.createElement(Modal, {
    transparent: true,
    animationType: 'slide'
  }, /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      backgroundColor: ColorPallet.brand.modalPrimaryBackground
    }
  }, /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.messageContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: [TextTheme.modalHeadingThree, styles.messageText],
    testID: testIdWithKey('VerifierLoading')
  }, t('Verifier.WaitingForResponse'))), /*#__PURE__*/React.createElement(View, {
    style: styles.image
  }, /*#__PURE__*/React.createElement(PresentationLoading, null))), /*#__PURE__*/React.createElement(View, {
    style: styles.controlsContainer
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('Global.GoBack'),
    accessibilityLabel: t('Global.GoBack'),
    testID: testIdWithKey('BackToProofList'),
    onPress: onDismissModalTouched,
    buttonType: ButtonType.ModalSecondary
  }))));
};
export default MobileVerifierLoading;
//# sourceMappingURL=MobileVerifierLoading.js.map