import { CommonActions, useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, BackHandler, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button, { ButtonType } from '../components/buttons/Button';
import { useAnimatedComponents } from '../contexts/animated-components';
import { useTheme } from '../contexts/theme';
import { useConnectionByOutOfBandId, useOutOfBandById } from '../hooks/connections';
import { Screens, Stacks, TabStacks } from '../types/navigators';
import { testIdWithKey } from '../utils/testable';
import { useServices, TOKENS } from './../container-api';
const GoalCodes = {
  proofRequestVerify: 'aries.vc.verify',
  proofRequestVerifyOnce: 'aries.vc.verify.once',
  credentialOffer: 'aries.vc.issue'
};
const Connection = ({
  navigation,
  route
}) => {
  const {
    oobRecordId
  } = route.params;
  const timerRef = useRef(null);
  const {
    t
  } = useTranslation();
  const {
    ColorPallet,
    TextTheme
  } = useTheme();
  const {
    ConnectionLoading
  } = useAnimatedComponents();
  const [logger, {
    useNotifications
  }, {
    connectionTimerDelay,
    autoRedirectConnectionToHome
  }] = useServices([TOKENS.UTIL_LOGGER, TOKENS.NOTIFICATIONS, TOKENS.CONFIG]);
  const connTimerDelay = connectionTimerDelay ?? 10000; // in ms
  const notifications = useNotifications();
  const oobRecord = useOutOfBandById(oobRecordId);
  const connection = useConnectionByOutOfBandId(oobRecordId);
  const merge = (current, next) => ({
    ...current,
    ...next
  });
  const [state, dispatch] = useReducer(merge, {
    inProgress: true,
    isInitialized: false,
    shouldShowDelayMessage: false,
    notificationRecord: undefined
  });
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
  const startTimer = () => {
    if (!state.isInitialized) {
      timerRef.current = setTimeout(() => {
        dispatch({
          shouldShowDelayMessage: true
        });
        timerRef.current = null;
      }, connTimerDelay);
      dispatch({
        isInitialized: true
      });
    }
  };
  const abortTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  const onDismissModalTouched = () => {
    var _navigation$getParent;
    dispatch({
      shouldShowDelayMessage: false,
      inProgress: false
    });
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(TabStacks.HomeStack, {
      screen: Screens.Home
    });
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    if (state.shouldShowDelayMessage && !state.notificationRecord) {
      if (autoRedirectConnectionToHome) {
        var _navigation$getParent2;
        dispatch({
          shouldShowDelayMessage: false,
          inProgress: false
        });
        (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(TabStacks.HomeStack, {
          screen: Screens.Home
        });
      } else {
        AccessibilityInfo.announceForAccessibility(t('Connection.TakingTooLong'));
      }
    }
  }, [state.shouldShowDelayMessage]);
  useEffect(() => {
    var _navigation$getParent4;
    if (!oobRecord || !state.inProgress) {
      return;
    }

    // If we have a connection, but no goal code, we should navigate
    // to Chat
    if (connection && !Object.values(GoalCodes).includes((oobRecord === null || oobRecord === void 0 ? void 0 : oobRecord.outOfBandInvitation.goalCode) ?? '')) {
      var _navigation$getParent3;
      logger === null || logger === void 0 || logger.info('Connection: Handling connection without goal code, navigate to Chat');
      dispatch({
        inProgress: false
      });
      (_navigation$getParent3 = navigation.getParent()) === null || _navigation$getParent3 === void 0 || _navigation$getParent3.dispatch(CommonActions.reset({
        index: 1,
        routes: [{
          name: Stacks.TabStack
        }, {
          name: Screens.Chat,
          params: {
            connectionId: connection.id
          }
        }]
      }));
      return;
    }

    // At this point we should be waiting for a notification
    // to be processed
    if (!state.notificationRecord) {
      return;
    }

    // Connectionless proof request, we don't have connectionless offers.
    if (!connection) {
      dispatch({
        inProgress: false
      });
      navigation.replace(Screens.ProofRequest, {
        proofId: state.notificationRecord.id
      });
      return;
    }

    // At this point, we have connection based proof or offer with
    // a goal code.

    if (!oobRecord) {
      logger === null || logger === void 0 || logger.error(`Connection: No OOB record where one is expected`);
      return;
    }
    const {
      goalCode
    } = oobRecord.outOfBandInvitation;
    if (goalCode === GoalCodes.proofRequestVerify || goalCode === GoalCodes.proofRequestVerifyOnce) {
      logger === null || logger === void 0 || logger.info(`Connection: Handling ${goalCode} goal code, navigate to ProofRequest`);
      dispatch({
        inProgress: false
      });
      navigation.replace(Screens.ProofRequest, {
        proofId: state.notificationRecord.id
      });
      return;
    }
    if (goalCode === GoalCodes.credentialOffer) {
      logger === null || logger === void 0 || logger.info(`Connection: Handling ${goalCode} goal code, navigate to CredentialOffer`);
      dispatch({
        inProgress: false
      });
      navigation.replace(Screens.CredentialOffer, {
        credentialId: state.notificationRecord.id
      });
      return;
    }
    logger === null || logger === void 0 || logger.info(`Connection: Unable to handle ${goalCode} goal code`);
    dispatch({
      inProgress: false
    });
    (_navigation$getParent4 = navigation.getParent()) === null || _navigation$getParent4 === void 0 || _navigation$getParent4.dispatch(CommonActions.reset({
      index: 1,
      routes: [{
        name: Stacks.TabStack
      }, {
        name: Screens.Chat,
        params: {
          connectionId: connection.id
        }
      }]
    }));
  }, [connection, oobRecord, state]);
  useMemo(() => {
    startTimer();
    return () => abortTimer;
  }, []);
  useFocusEffect(useCallback(() => {
    startTimer();
    return () => abortTimer;
  }, []));
  useEffect(() => {
    if (!state.inProgress || state.notificationRecord) {
      return;
    }
    for (const notification of notifications) {
      var _oobRecord$getTags;
      // no action taken for BasicMessageRecords
      if (notification.type === 'BasicMessageRecord') {
        logger === null || logger === void 0 || logger.info('Connection: BasicMessageRecord, skipping');
        continue;
      }
      if (connection && notification.connectionId === connection.id || oobRecord !== null && oobRecord !== void 0 && (_oobRecord$getTags = oobRecord.getTags()) !== null && _oobRecord$getTags !== void 0 && (_oobRecord$getTags = _oobRecord$getTags.invitationRequestsThreadIds) !== null && _oobRecord$getTags !== void 0 && _oobRecord$getTags.includes((notification === null || notification === void 0 ? void 0 : notification.threadId) ?? "")) {
        logger === null || logger === void 0 || logger.info(`Connection: Handling notification ${notification.id}`);
        dispatch({
          notificationRecord: notification
        });
        break;
      }
    }
  }, [notifications, state]);
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      backgroundColor: ColorPallet.brand.modalPrimaryBackground
    }
  }, /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.messageContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: [TextTheme.modalHeadingThree, styles.messageText],
    testID: testIdWithKey('CredentialOnTheWay')
  }, t('Connection.JustAMoment'))), /*#__PURE__*/React.createElement(View, {
    style: styles.image
  }, /*#__PURE__*/React.createElement(ConnectionLoading, null)), state.shouldShowDelayMessage && /*#__PURE__*/React.createElement(Text, {
    style: [TextTheme.modalNormal, styles.delayMessageText],
    testID: testIdWithKey('TakingTooLong')
  }, t('Connection.TakingTooLong'))), /*#__PURE__*/React.createElement(View, {
    style: styles.controlsContainer
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('Loading.BackToHome'),
    accessibilityLabel: t('Loading.BackToHome'),
    testID: testIdWithKey('BackToHome'),
    onPress: onDismissModalTouched,
    buttonType: ButtonType.ModalSecondary
  })));
};
export default Connection;
//# sourceMappingURL=Connection.js.map