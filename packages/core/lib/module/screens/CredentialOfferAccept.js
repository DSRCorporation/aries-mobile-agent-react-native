import { useCredentialById, useAgent } from '@bifold/react-hooks';
import { DidCommCredentialState } from '@credo-ts/didcomm';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, StyleSheet, View } from 'react-native';
import Button, { ButtonType } from '../components/buttons/Button';
import SafeAreaModal from '../components/modals/SafeAreaModal';
import { useAnimatedComponents } from '../contexts/animated-components';
import { useTheme } from '../contexts/theme';
import { Screens, TabStacks } from '../types/navigators';
import { testIdWithKey } from '../utils/testable';
import { TOKENS, useServices } from '../container-api';
import { ThemedText } from '../components/texts/ThemedText';
import { ensureCredentialMetadata } from '../utils/credential';
import ScreenWrapper from '../components/views/ScreenWrapper';
var DeliveryStatus = /*#__PURE__*/function (DeliveryStatus) {
  DeliveryStatus[DeliveryStatus["Pending"] = 0] = "Pending";
  DeliveryStatus[DeliveryStatus["Completed"] = 1] = "Completed";
  DeliveryStatus[DeliveryStatus["Declined"] = 2] = "Declined";
  return DeliveryStatus;
}(DeliveryStatus || {});
const CredentialOfferAccept = ({
  visible,
  credentialId,
  confirmationOnly
}) => {
  const {
    t
  } = useTranslation();
  const {
    agent
  } = useAgent();
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
  }, logger] = useServices([TOKENS.CONFIG, TOKENS.UTIL_LOGGER]);
  const connTimerDelay = connectionTimerDelay ?? 10000; // in ms
  const styles = StyleSheet.create({
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
    delayMessageText: {
      textAlign: 'center',
      marginTop: 20
    }
  });
  if (!credential && !confirmationOnly) {
    throw new Error('Unable to fetch credential from Credo');
  }
  const onBackToHomeTouched = useCallback(() => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(TabStacks.HomeStack, {
      screen: Screens.Home
    });
  }, [navigation]);
  const onDoneTouched = useCallback(() => {
    var _navigation$getParent2;
    (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(TabStacks.HomeStack, {
      screen: Screens.Home
    });
  }, [navigation]);
  useEffect(() => {
    if (!credential) {
      return;
    }
    if (credential.state === DidCommCredentialState.CredentialReceived || credential.state === DidCommCredentialState.Done) {
      timer && clearTimeout(timer);
      setCredentialDeliveryStatus(DeliveryStatus.Completed);
      const restoreMetadata = async () => {
        if (agent) {
          try {
            await ensureCredentialMetadata(credential, agent, undefined, logger);
          } catch (error) {
            logger === null || logger === void 0 || logger.warn('Failed to restore credential metadata', {
              error: error
            });
          }
        }
      };
      restoreMetadata();
    }
  }, [credential, timer, agent, logger]);
  useEffect(() => {
    if (confirmationOnly) {
      timer && clearTimeout(timer);
      setCredentialDeliveryStatus(DeliveryStatus.Completed);
    }
  }, [confirmationOnly, timer]);
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
  }, [timerDidFire, credentialDeliveryStatus, visible, connTimerDelay]);
  useEffect(() => {
    if (shouldShowDelayMessage && credentialDeliveryStatus !== DeliveryStatus.Completed) {
      AccessibilityInfo.announceForAccessibility(t('Connection.TakingTooLong'));
    }
  }, [shouldShowDelayMessage, credentialDeliveryStatus, t]);
  const controls = /*#__PURE__*/React.createElement(React.Fragment, null, credentialDeliveryStatus === DeliveryStatus.Pending && /*#__PURE__*/React.createElement(Button, {
    title: t('Loading.BackToHome'),
    accessibilityLabel: t('Loading.BackToHome'),
    testID: testIdWithKey('BackToHome'),
    onPress: onBackToHomeTouched,
    buttonType: ButtonType.ModalSecondary
  }), credentialDeliveryStatus === DeliveryStatus.Completed && /*#__PURE__*/React.createElement(Button, {
    title: t('Global.Done'),
    accessibilityLabel: t('Global.Done'),
    testID: testIdWithKey('Done'),
    onPress: onDoneTouched,
    buttonType: ButtonType.ModalPrimary
  }));
  return /*#__PURE__*/React.createElement(SafeAreaModal, {
    visible: visible,
    transparent: true,
    animationType: "none"
  }, /*#__PURE__*/React.createElement(ScreenWrapper, {
    edges: ['bottom', 'top', 'left', 'right'],
    controls: controls
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.messageContainer
  }, credentialDeliveryStatus === DeliveryStatus.Pending && /*#__PURE__*/React.createElement(ThemedText, {
    style: [ListItems.credentialOfferTitle, styles.messageText],
    testID: testIdWithKey('CredentialOnTheWay')
  }, t('CredentialOffer.CredentialOnTheWay')), credentialDeliveryStatus === DeliveryStatus.Completed && /*#__PURE__*/React.createElement(ThemedText, {
    style: [ListItems.credentialOfferTitle, styles.messageText],
    testID: testIdWithKey('CredentialAddedToYourWallet')
  }, t('CredentialOffer.CredentialAddedToYourWallet'))), /*#__PURE__*/React.createElement(View, {
    style: [styles.image, {
      minHeight: 250,
      alignItems: 'center',
      justifyContent: 'flex-end'
    }]
  }, credentialDeliveryStatus === DeliveryStatus.Completed && /*#__PURE__*/React.createElement(CredentialAdded, null), credentialDeliveryStatus === DeliveryStatus.Pending && /*#__PURE__*/React.createElement(CredentialPending, null)), shouldShowDelayMessage && credentialDeliveryStatus === DeliveryStatus.Pending && /*#__PURE__*/React.createElement(ThemedText, {
    style: [ListItems.credentialOfferDetails, styles.delayMessageText],
    testID: testIdWithKey('TakingTooLong')
  }, t('Connection.TakingTooLong'))));
};
export default CredentialOfferAccept;
//# sourceMappingURL=CredentialOfferAccept.js.map