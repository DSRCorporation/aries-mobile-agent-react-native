import { ProofState } from '@credo-ts/core';
import { useProofById } from '@credo-ts/react-hooks';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button, { ButtonType } from '../components/buttons/Button';
import { useAnimatedComponents } from '../contexts/animated-components';
import { useTheme } from '../contexts/theme';
import { Screens, TabStacks } from '../types/navigators';
import { testIdWithKey } from '../utils/testable';
const ProofRequestAccept = ({
  visible,
  proofId
}) => {
  const {
    t
  } = useTranslation();
  const [proofDeliveryStatus, setProofDeliveryStatus] = useState(ProofState.RequestReceived);
  const proof = useProofById(proofId);
  const navigation = useNavigation();
  const {
    ColorPallet,
    TextTheme
  } = useTheme();
  const {
    SendingProof,
    SentProof
  } = useAnimatedComponents();
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
  if (!proof) {
    throw new Error('Unable to fetch proof from Credo');
  }
  const onBackToHomeTouched = () => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(TabStacks.HomeStack, {
      screen: Screens.Home
    });
  };
  useEffect(() => {
    if (proof.state === proofDeliveryStatus) {
      return;
    }
    if (proof.state === ProofState.Done || proof.state === ProofState.PresentationSent) {
      setProofDeliveryStatus(proof.state);
    }
  }, [proof]);
  return /*#__PURE__*/React.createElement(Modal, {
    visible: visible,
    transparent: true,
    animationType: 'none'
  }, /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      backgroundColor: ColorPallet.brand.modalPrimaryBackground
    }
  }, /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.messageContainer
  }, proofDeliveryStatus === ProofState.RequestReceived && /*#__PURE__*/React.createElement(Text, {
    style: [TextTheme.modalHeadingThree, styles.messageText],
    testID: testIdWithKey('SendingProofRequest')
  }, t('ProofRequest.SendingTheInformationSecurely')), (proofDeliveryStatus === ProofState.PresentationSent || proofDeliveryStatus === ProofState.Done) && /*#__PURE__*/React.createElement(Text, {
    style: [TextTheme.modalHeadingThree, styles.messageText],
    testID: testIdWithKey('SentProofRequest')
  }, t('ProofRequest.InformationSentSuccessfully'))), /*#__PURE__*/React.createElement(View, {
    style: [styles.image, {
      minHeight: 250,
      alignItems: 'center',
      justifyContent: 'flex-end'
    }]
  }, proofDeliveryStatus === ProofState.RequestReceived && /*#__PURE__*/React.createElement(SendingProof, null), (proofDeliveryStatus === ProofState.PresentationSent || proofDeliveryStatus === ProofState.Done) && /*#__PURE__*/React.createElement(SentProof, null))), /*#__PURE__*/React.createElement(View, {
    style: styles.controlsContainer
  }, /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Button, {
    title: t('Loading.BackToHome'),
    accessibilityLabel: t('Loading.BackToHome'),
    testID: testIdWithKey('BackToHome'),
    onPress: onBackToHomeTouched,
    buttonType: ButtonType.ModalSecondary
  })))));
};
export default ProofRequestAccept;
//# sourceMappingURL=ProofRequestAccept.js.map