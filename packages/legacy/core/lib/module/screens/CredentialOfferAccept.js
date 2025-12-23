import { CredentialState } from '@credo-ts/core';
import { useCredentialById } from '@credo-ts/react-hooks';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button, { ButtonType } from '../components/buttons/Button';
import { useAnimatedComponents } from '../contexts/animated-components';
import { useTheme } from '../contexts/theme';
import { Screens, TabStacks } from '../types/navigators';
import { testIdWithKey } from '../utils/testable';
import { TOKENS, useServices } from '../container-api';
var DeliveryStatus = /*#__PURE__*/function (DeliveryStatus) {
  DeliveryStatus[DeliveryStatus["Pending"] = 0] = "Pending";
  DeliveryStatus[DeliveryStatus["Completed"] = 1] = "Completed";
  DeliveryStatus[DeliveryStatus["Declined"] = 2] = "Declined";
  return DeliveryStatus;
}(DeliveryStatus || {});
const CredentialOfferAccept = ({
  visible,
  credentialId
}) => {
  const {
    t
  } = useTranslation();
  const [shouldShowDelayMessage, setShouldShowDelayMessage] = useState(false);
  const [credentialDeliveryStatus, setCredentialDeliveryStatus] = useState(DeliveryStatus.Pending);
  const [timerDidFire, setTimerDidFire] = useState(false);
  const [timer, setTimer] = useState();
  const credential = useCredentialById(credentialId);
  const navigation = useNavigation();
  const {
    ListItems
  } = useTheme();
  const {
    CredentialAdded,
    CredentialPending
  } = useAnimatedComponents();
  const [{
    connectionTimerDelay
  }] = useServices([TOKENS.CONFIG]);
  const connTimerDelay = connectionTimerDelay ?? 10000; // in ms
  const styles = StyleSheet.create({
    container: {
      ...ListItems.credentialOfferBackground,
      height: '100%',
      padding: 20
    },
    image: {
      marginTop: 20
    },
    messageContainer: {
      alignItems: 'center'
    },
    messageText: {
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
  if (!credential) {
    throw new Error('Unable to fetch credential from Credo');
  }
  const onBackToHomeTouched = () => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(TabStacks.HomeStack, {
      screen: Screens.Home
    });
  };
  const onDoneTouched = () => {
    var _navigation$getParent2;
    (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(TabStacks.HomeStack, {
      screen: Screens.Home
    });
  };
  useEffect(() => {
    if (credential.state === CredentialState.CredentialReceived || credential.state === CredentialState.Done) {
      timer && clearTimeout(timer);
      setCredentialDeliveryStatus(DeliveryStatus.Completed);
    }
  }, [credential]);
  useEffect(() => {
    if (timerDidFire || credentialDeliveryStatus !== DeliveryStatus.Pending || !visible) {
      return;
    }
    const timer = setTimeout(() => {
      setShouldShowDelayMessage(true);
      setTimerDidFire(true);
    }, connTimerDelay);
    setTimer(timer);
    return () => {
      timer && clearTimeout(timer);
    };
  }, [visible]);
  useEffect(() => {
    if (shouldShowDelayMessage && credentialDeliveryStatus !== DeliveryStatus.Completed) {
      AccessibilityInfo.announceForAccessibility(t('Connection.TakingTooLong'));
    }
  }, [shouldShowDelayMessage]);
  return /*#__PURE__*/React.createElement(Modal, {
    visible: visible,
    transparent: true,
    animationType: 'none'
  }, /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      ...ListItems.credentialOfferBackground
    }
  }, /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.messageContainer
  }, credentialDeliveryStatus === DeliveryStatus.Pending && /*#__PURE__*/React.createElement(Text, {
    style: [ListItems.credentialOfferTitle, styles.messageText],
    testID: testIdWithKey('CredentialOnTheWay')
  }, t('CredentialOffer.CredentialOnTheWay')), credentialDeliveryStatus === DeliveryStatus.Completed && /*#__PURE__*/React.createElement(Text, {
    style: [ListItems.credentialOfferTitle, styles.messageText],
    testID: testIdWithKey('CredentialAddedToYourWallet')
  }, t('CredentialOffer.CredentialAddedToYourWallet'))), /*#__PURE__*/React.createElement(View, {
    style: [styles.image, {
      minHeight: 250,
      alignItems: 'center',
      justifyContent: 'flex-end'
    }]
  }, credentialDeliveryStatus === DeliveryStatus.Completed && /*#__PURE__*/React.createElement(CredentialAdded, null), credentialDeliveryStatus === DeliveryStatus.Pending && /*#__PURE__*/React.createElement(CredentialPending, null)), shouldShowDelayMessage && credentialDeliveryStatus === DeliveryStatus.Pending && /*#__PURE__*/React.createElement(Text, {
    style: [ListItems.credentialOfferDetails, styles.delayMessageText],
    testID: testIdWithKey('TakingTooLong')
  }, t('Connection.TakingTooLong'))), /*#__PURE__*/React.createElement(View, {
    style: styles.controlsContainer
  }, credentialDeliveryStatus === DeliveryStatus.Pending && /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Button, {
    title: t('Loading.BackToHome'),
    accessibilityLabel: t('Loading.BackToHome'),
    testID: testIdWithKey('BackToHome'),
    onPress: onBackToHomeTouched,
    buttonType: ButtonType.ModalSecondary
  })), credentialDeliveryStatus === DeliveryStatus.Completed && /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Button, {
    title: t('Global.Done'),
    accessibilityLabel: t('Global.Done'),
    testID: testIdWithKey('Done'),
    onPress: onDoneTouched,
    buttonType: ButtonType.ModalPrimary
  })))));
};
export default CredentialOfferAccept;
//# sourceMappingURL=CredentialOfferAccept.js.map