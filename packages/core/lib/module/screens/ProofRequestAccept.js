import { useProofById } from '@bifold/react-hooks';
import { DidCommProofState } from '@credo-ts/didcomm';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import Button, { ButtonType } from '../components/buttons/Button';
import SafeAreaModal from '../components/modals/SafeAreaModal';
import { useAnimatedComponents } from '../contexts/animated-components';
import { useTheme } from '../contexts/theme';
import { Screens, TabStacks } from '../types/navigators';
import { testIdWithKey } from '../utils/testable';
import { ThemedText } from '../components/texts/ThemedText';
import ScreenWrapper from '../components/views/ScreenWrapper';
const ProofRequestAccept = ({
  visible,
  proofId,
  confirmationOnly
}) => {
  const {
    t
  } = useTranslation();
  const [proofDeliveryStatus, setProofDeliveryStatus] = useState(DidCommProofState.RequestReceived);
  const proof = useProofById(proofId);
  const navigation = useNavigation();
  const {
    TextTheme
  } = useTheme();
  const {
    SendingProof,
    SentProof
  } = useAnimatedComponents();
  const styles = StyleSheet.create({
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
    delayMessageText: {
      textAlign: 'center',
      marginTop: 20
    }
  });
  if (!proof && !confirmationOnly) {
    throw new Error('Unable to fetch proof from Credo');
  }
  const onBackToHomeTouched = () => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(TabStacks.HomeStack, {
      screen: Screens.Home
    });
  };
  useEffect(() => {
    if (confirmationOnly) {
      setProofDeliveryStatus(DidCommProofState.PresentationSent);
      return;
    }
    if (!proof) return;
    if (proof.state === proofDeliveryStatus) {
      return;
    }
    if (proof.state === DidCommProofState.Done || proof.state === DidCommProofState.PresentationSent) {
      setProofDeliveryStatus(proof.state);
    }
  }, [proof, proofDeliveryStatus, confirmationOnly]);
  const controls = /*#__PURE__*/React.createElement(Button, {
    title: t('Loading.BackToHome'),
    accessibilityLabel: t('Loading.BackToHome'),
    testID: testIdWithKey('BackToHome'),
    onPress: onBackToHomeTouched,
    buttonType: ButtonType.ModalSecondary
  });
  return /*#__PURE__*/React.createElement(SafeAreaModal, {
    visible: visible,
    transparent: true,
    animationType: 'none'
  }, /*#__PURE__*/React.createElement(ScreenWrapper, {
    edges: ['bottom', 'top', 'left', 'right'],
    controls: controls
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.messageContainer
  }, proofDeliveryStatus === DidCommProofState.RequestReceived && /*#__PURE__*/React.createElement(ThemedText, {
    variant: "modalHeadingThree",
    style: styles.messageText,
    testID: testIdWithKey('SendingProofRequest')
  }, t('ProofRequest.SendingTheInformationSecurely')), (proofDeliveryStatus === DidCommProofState.PresentationSent || proofDeliveryStatus === DidCommProofState.Done) && /*#__PURE__*/React.createElement(ThemedText, {
    variant: "modalHeadingThree",
    style: styles.messageText,
    testID: testIdWithKey('SentProofRequest')
  }, t('ProofRequest.InformationSentSuccessfully'))), /*#__PURE__*/React.createElement(View, {
    style: [styles.image, {
      minHeight: 250,
      alignItems: 'center',
      justifyContent: 'flex-end'
    }]
  }, proofDeliveryStatus === DidCommProofState.RequestReceived && /*#__PURE__*/React.createElement(SendingProof, null), (proofDeliveryStatus === DidCommProofState.PresentationSent || proofDeliveryStatus === DidCommProofState.Done) && /*#__PURE__*/React.createElement(SentProof, null))));
};
export default ProofRequestAccept;
//# sourceMappingURL=ProofRequestAccept.js.map