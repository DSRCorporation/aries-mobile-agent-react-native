import { useAgent, useConnectionById } from '@bifold/react-hooks';
import { DidCommBasicMessageRecord, DidCommBasicMessageRepository, DidCommProofExchangeRecord, DidCommProofState, DidCommRequestPresentationV2Message, DidCommCredentialExchangeRecord } from '@credo-ts/didcomm';
import { markProofAsViewed } from '@bifold/verifier';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { EventTypes, hitSlop } from '../../constants';
import { TOKENS, useServices } from '../../container-api';
import { useStore } from '../../contexts/store';
import { useTheme } from '../../contexts/theme';
import { BifoldError } from '../../types/error';
import { BasicMessageMetadata } from '../../types/metadata';
import { Screens, Stacks } from '../../types/navigators';
import { ModalUsage } from '../../types/remove';
import { getConnectionName, parsedSchema } from '../../utils/helpers';
import { testIdWithKey } from '../../utils/testable';
import Button, { ButtonType } from '../buttons/Button';
import { InfoBoxType } from '../misc/InfoBox';
import CommonRemoveModal from '../modals/CommonRemoveModal';
import { ThemedText } from '../texts/ThemedText';
import { OpenIDCustomNotificationType } from '../../modules/openid/refresh/types';
import { useOpenIdReplacementNavigation } from '../../modules/openid/hooks/useOpenIdReplacementNavigation';
import { useUpgradeExpiredCredential } from '../../modules/openid/hooks/useUpgradeExpiredCredential';
const iconSize = 30;
export let NotificationType = /*#__PURE__*/function (NotificationType) {
  NotificationType["BasicMessage"] = "BasicMessage";
  NotificationType["CredentialOffer"] = "Offer";
  NotificationType["ProofRequest"] = "ProofRecord";
  NotificationType["Revocation"] = "Revocation";
  NotificationType["Custom"] = "Custom";
  NotificationType["Proof"] = "Proof";
  return NotificationType;
}({});
const markMessageAsSeen = async (agent, record) => {
  const meta = record.metadata.get(BasicMessageMetadata.customMetadata);
  record.metadata.set(BasicMessageMetadata.customMetadata, {
    ...meta,
    seen: true
  });
  const basicMessageRepository = agent.context.dependencyManager.resolve(DidCommBasicMessageRepository);
  await basicMessageRepository.update(agent.context, record);
};
const defaultDetails = {
  type: InfoBoxType.Info,
  title: undefined,
  body: undefined,
  buttonTitle: undefined
};
const NotificationListItem = ({
  notificationType,
  notification,
  customNotification
}) => {
  const navigation = useNavigation();
  const openReplacementOffer = useOpenIdReplacementNavigation();
  const {
    upgrade
  } = useUpgradeExpiredCredential();
  const [store, dispatch] = useStore();
  const {
    t
  } = useTranslation();
  const {
    ColorPalette
  } = useTheme();
  const {
    agent
  } = useAgent();
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [action, setAction] = useState();
  const [closeAction, setCloseAction] = useState();
  const [logger] = useServices([TOKENS.UTIL_LOGGER]);
  const connectionId = notification instanceof DidCommBasicMessageRecord || notification instanceof DidCommCredentialExchangeRecord || notification instanceof DidCommProofExchangeRecord ? notification.connectionId ?? '' : '';
  const connection = useConnectionById(connectionId);
  const [details, setDetails] = useState(defaultDetails);
  const [styleConfig, setStyleConfig] = useState({
    containerStyle: {
      backgroundColor: ColorPalette.notification.info,
      borderColor: ColorPalette.notification.infoBorder
    },
    textStyle: {
      color: ColorPalette.notification.infoText
    },
    iconColor: ColorPalette.notification.infoIcon,
    iconName: 'info'
  });
  const styles = StyleSheet.create({
    container: {
      borderRadius: 5,
      borderWidth: 1,
      padding: 10
    },
    headerContainer: {
      flexDirection: 'row',
      paddingHorizontal: 5,
      paddingTop: 5
    },
    bodyContainer: {
      flexGrow: 1,
      flexDirection: 'column',
      marginLeft: 10 + iconSize,
      paddingHorizontal: 5,
      paddingBottom: 5
    },
    headerText: {
      flexGrow: 1,
      alignSelf: 'center',
      flex: 1
    },
    bodyText: {
      flexShrink: 1,
      marginVertical: 15,
      paddingBottom: 10
    },
    icon: {
      marginRight: 10,
      alignSelf: 'center'
    }
  });
  const isReceivedProof = useMemo(() => {
    return notificationType === NotificationType.ProofRequest && (notification.state === DidCommProofState.Done || notification.state === DidCommProofState.PresentationSent);
  }, [notificationType, notification]);
  const toggleDeclineModalVisible = useCallback(() => setDeclineModalVisible(prev => !prev), []);
  const declineProofRequest = useCallback(async () => {
    try {
      const proofRecord = notification;
      if (agent && proofRecord) {
        const connectionId = proofRecord.connectionId ?? '';
        const connection = await agent.modules.connections.findById(connectionId);
        if (connection) {
          await agent.modules.proofs.sendProblemReport({
            proofRecordId: proofRecord.id,
            description: t('ProofRequest.Declined')
          });
        }
        await agent.modules.proofs.declineRequest({
          proofRecordId: proofRecord.id
        });
      }
    } catch (err) {
      const error = new BifoldError(t('Error.Title1028'), t('Error.Message1028'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1028);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
    toggleDeclineModalVisible();
  }, [notification, agent, t, toggleDeclineModalVisible]);
  const dismissProofRequest = useCallback(async () => {
    if (agent && notificationType === NotificationType.ProofRequest) {
      markProofAsViewed(agent, notification);
    }
  }, [agent, notification, notificationType]);
  const dismissBasicMessage = useCallback(async () => {
    if (agent && notificationType === NotificationType.BasicMessage) {
      markMessageAsSeen(agent, notification);
    }
  }, [agent, notification, notificationType]);
  const declineCredentialOffer = useCallback(async () => {
    try {
      const credentialId = notification.id;
      if (agent) {
        await agent.modules.credentials.declineOffer(credentialId);
      }
    } catch (err) {
      const error = new BifoldError(t('Error.Title1028'), t('Error.Message1028'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1028);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
    toggleDeclineModalVisible();
  }, [notification, agent, t, toggleDeclineModalVisible]);
  const declineCustomNotification = useCallback(async () => {
    customNotification === null || customNotification === void 0 || customNotification.onCloseAction(dispatch);
    toggleDeclineModalVisible();
  }, [customNotification, dispatch, toggleDeclineModalVisible]);
  const commonRemoveModal = () => {
    let usage;
    let onSubmit;
    if (notificationType === NotificationType.ProofRequest) {
      usage = ModalUsage.ProofRequestDecline;
      if (notification.state === DidCommProofState.Done) {
        onSubmit = dismissProofRequest;
      } else {
        onSubmit = declineProofRequest;
      }
    } else if (notificationType === NotificationType.CredentialOffer) {
      usage = ModalUsage.CredentialOfferDecline;
      onSubmit = declineCredentialOffer;
    } else if (notificationType === NotificationType.Custom) {
      usage = ModalUsage.CustomNotificationDecline;
      onSubmit = declineCustomNotification;
    } else {
      usage = undefined;
    }
    return usage !== undefined && onSubmit !== undefined ? /*#__PURE__*/React.createElement(CommonRemoveModal, {
      usage: usage,
      visible: declineModalVisible,
      onSubmit: onSubmit,
      onCancel: toggleDeclineModalVisible
    }) : null;
  };
  useEffect(() => {
    const getDetails = async () => {
      const {
        name,
        version
      } = parsedSchema(notification);
      const theirLabel = getConnectionName(connection, store.preferences.alternateContactNames);
      let details;
      switch (notificationType) {
        case NotificationType.BasicMessage:
          details = {
            type: InfoBoxType.Info,
            title: t('Home.NewMessage'),
            body: theirLabel ? `${theirLabel} ${t('Home.SentMessage')}` : t('Home.ReceivedMessage'),
            buttonTitle: t('Home.ViewMessage')
          };
          break;
        case NotificationType.CredentialOffer:
          details = {
            type: InfoBoxType.Info,
            title: t('CredentialOffer.NewCredentialOffer'),
            body: `${name + (version ? ` v${version}` : '')}`,
            buttonTitle: undefined
          };
          break;
        case NotificationType.ProofRequest:
          {
            var _message;
            const proofId = notification.id;
            let message;
            try {
              message = await (agent === null || agent === void 0 ? void 0 : agent.modules.didcomm.proofs.findRequestMessage(proofId));
            } catch (error) {
              logger.error('Error finding request message:', error);
            }

            // message.comment is the common fallback title for both v1 and v2 proof requests
            let body = ((_message = message) === null || _message === void 0 ? void 0 : _message.comment) ?? '';

            // if (message instanceof DidCommRequestPresentationV1Message) {
            //   body = message.indyProofRequest?.name ?? body
            // }

            if (message instanceof DidCommRequestPresentationV2Message) {
              var _attachment$getDataAs;
              // workaround for getting proof request name in v2 proof request
              // https://github.com/openwallet-foundation/credo-ts/blob/5f08bc67e3d1cc0ab98e7cce7747fedd2bf71ec1/packages/core/src/modules/proofs/protocol/v2/messages/V2RequestPresentationMessage.ts#L78
              const attachment = message.requestAttachments.find(attachment => attachment.id === 'indy');
              const name = (attachment === null || attachment === void 0 || (_attachment$getDataAs = attachment.getDataAsJson()) === null || _attachment$getDataAs === void 0 ? void 0 : _attachment$getDataAs.name) ?? null;
              body = name ?? body;
            }
            details = {
              type: InfoBoxType.Info,
              title: t('ProofRequest.NewProofRequest'),
              body,
              buttonTitle: undefined
            };
            break;
          }
        case NotificationType.Revocation:
          details = {
            type: InfoBoxType.Error,
            title: t('CredentialDetails.NewRevoked'),
            body: `${name + (version ? ` v${version}` : '')}`,
            buttonTitle: undefined
          };
          break;
        default:
          throw new Error('NotificationType was not set correctly.');
      }
      setDetails(details ?? defaultDetails);
    };
    if (notificationType === NotificationType.Custom && customNotification) {
      setDetails({
        type: InfoBoxType.Info,
        title: t(customNotification === null || customNotification === void 0 ? void 0 : customNotification.title),
        body: t(customNotification === null || customNotification === void 0 ? void 0 : customNotification.description),
        buttonTitle: t(customNotification === null || customNotification === void 0 ? void 0 : customNotification.buttonTitle)
      });
    } else {
      getDetails();
    }
  }, [notification, notificationType, logger, connection, store.preferences.alternateContactNames, t, agent, customNotification]);
  useEffect(() => {
    let onPress;
    let onClose;
    switch (notificationType) {
      case NotificationType.BasicMessage:
        onPress = () => {
          var _navigation$getParent;
          (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(Stacks.ContactStack, {
            screen: Screens.Chat,
            params: {
              connectionId: notification.connectionId
            }
          });
        };
        onClose = dismissBasicMessage;
        break;
      case NotificationType.CredentialOffer:
        onPress = () => {
          var _navigation$getParent2;
          (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(Stacks.ConnectionStack, {
            screen: Screens.Connection,
            params: {
              credentialId: notification.id
            }
          });
        };
        onClose = toggleDeclineModalVisible;
        break;
      case NotificationType.ProofRequest:
        if (notification.state === DidCommProofState.Done || notification.state === DidCommProofState.PresentationReceived) {
          onPress = () => {
            var _navigation$getParent3;
            (_navigation$getParent3 = navigation.getParent()) === null || _navigation$getParent3 === void 0 || _navigation$getParent3.navigate(Stacks.ContactStack, {
              screen: Screens.ProofDetails,
              params: {
                recordId: notification.id,
                isHistory: true
              }
            });
          };
        } else {
          onPress = () => {
            var _navigation$getParent4;
            (_navigation$getParent4 = navigation.getParent()) === null || _navigation$getParent4 === void 0 || _navigation$getParent4.navigate(Stacks.ConnectionStack, {
              screen: Screens.Connection,
              params: {
                proofId: notification.id
              }
            });
          };
        }
        onClose = toggleDeclineModalVisible;
        break;
      case NotificationType.Proof:
        onPress = () => {
          var _navigation$getParent5;
          return (_navigation$getParent5 = navigation.getParent()) === null || _navigation$getParent5 === void 0 ? void 0 : _navigation$getParent5.navigate(Stacks.NotificationStack, {
            screen: Screens.ProofDetails,
            params: {
              recordId: notification.id,
              isHistory: true
            }
          });
        };
        break;
      case NotificationType.Revocation:
        onPress = () => {
          var _navigation$getParent6;
          return (_navigation$getParent6 = navigation.getParent()) === null || _navigation$getParent6 === void 0 ? void 0 : _navigation$getParent6.navigate(Stacks.NotificationStack, {
            screen: Screens.CredentialDetails,
            params: {
              credentialId: notification.id
            }
          });
        };
        break;
      case NotificationType.Custom:
        onPress = () => {
          var _navigation$getParent7;
          if ((customNotification === null || customNotification === void 0 ? void 0 : customNotification.type) === OpenIDCustomNotificationType.CredentialExpired && customNotification.metadata && typeof customNotification.metadata.oldId === 'string') {
            upgrade(customNotification.metadata.oldId);
            return;
          }
          customNotification !== null && customNotification !== void 0 && customNotification.onPressAction ? customNotification.onPressAction() : (_navigation$getParent7 = navigation.getParent()) === null || _navigation$getParent7 === void 0 ? void 0 : _navigation$getParent7.navigate(Stacks.NotificationStack, {
            screen: Screens.CustomNotification
          });
        };
        onClose = toggleDeclineModalVisible;
        break;
      default:
        throw new Error('NotificationType was not set correctly.');
    }
    setAction(() => onPress);
    setCloseAction(() => onClose);
  }, [navigation, notification, notificationType, toggleDeclineModalVisible, dismissBasicMessage, customNotification, openReplacementOffer, upgrade]);
  useEffect(() => {
    switch (details.type) {
      case InfoBoxType.Success:
        setStyleConfig({
          containerStyle: {
            backgroundColor: ColorPalette.notification.success,
            borderColor: ColorPalette.notification.successBorder
          },
          textStyle: {
            color: ColorPalette.notification.successText
          },
          iconColor: ColorPalette.notification.successIcon,
          iconName: 'check-circle'
        });
        break;
      case InfoBoxType.Warn:
        setStyleConfig({
          containerStyle: {
            backgroundColor: ColorPalette.notification.warn,
            borderColor: ColorPalette.notification.warnBorder
          },
          textStyle: {
            color: ColorPalette.notification.warnText
          },
          iconColor: ColorPalette.notification.warnIcon,
          iconName: 'warning'
        });
        break;
      case InfoBoxType.Error:
        setStyleConfig({
          containerStyle: {
            backgroundColor: ColorPalette.notification.error,
            borderColor: ColorPalette.notification.errorBorder
          },
          textStyle: {
            color: ColorPalette.notification.errorText
          },
          iconColor: ColorPalette.notification.errorIcon,
          iconName: 'error'
        });
        break;
      case InfoBoxType.Info:
      default:
        setStyleConfig({
          containerStyle: {
            backgroundColor: ColorPalette.notification.info,
            borderColor: ColorPalette.notification.infoBorder
          },
          textStyle: {
            color: ColorPalette.notification.infoText
          },
          iconColor: ColorPalette.notification.infoIcon,
          iconName: 'info'
        });
    }
  }, [details, ColorPalette]);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, styleConfig.containerStyle],
    testID: testIdWithKey('NotificationListItem')
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.headerContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.icon
  }, /*#__PURE__*/React.createElement(Icon, {
    accessible: false,
    name: styleConfig.iconName,
    size: iconSize,
    color: styleConfig.iconColor
  })), /*#__PURE__*/React.createElement(ThemedText, {
    variant: "bold",
    style: [styles.headerText, styleConfig.textStyle],
    testID: testIdWithKey('HeaderText')
  }, details.title), [NotificationType.BasicMessage, NotificationType.Custom, NotificationType.ProofRequest, NotificationType.CredentialOffer].includes(notificationType) && /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(TouchableOpacity, {
    accessibilityLabel: t('Global.Dismiss'),
    accessibilityRole: 'button',
    testID: testIdWithKey(`Dismiss${notificationType}`),
    onPress: closeAction,
    hitSlop: hitSlop
  }, /*#__PURE__*/React.createElement(Icon, {
    name: 'close',
    size: iconSize,
    color: styleConfig.iconColor
  })))), /*#__PURE__*/React.createElement(View, {
    style: styles.bodyContainer
  }, /*#__PURE__*/React.createElement(ThemedText, {
    style: [styles.bodyText, styleConfig.textStyle],
    testID: testIdWithKey('BodyText')
  }, details.body), /*#__PURE__*/React.createElement(Button, {
    title: details.buttonTitle ?? t('Global.View'),
    accessibilityLabel: details.buttonTitle ?? t('Global.View'),
    testID: testIdWithKey(`View${notificationType}${isReceivedProof ? 'Received' : ''}`),
    buttonType: ButtonType.Primary,
    onPress: action
  })), commonRemoveModal());
};
export default NotificationListItem;
//# sourceMappingURL=NotificationListItem.js.map