import { V1RequestPresentationMessage } from '@credo-ts/anoncreds';
import { BasicMessageRecord, BasicMessageRepository, CredentialExchangeRecord, ProofExchangeRecord, ProofState } from '@credo-ts/core';
import { useAgent, useConnectionById } from '@credo-ts/react-hooks';
import { markProofAsViewed } from '@hyperledger/aries-bifold-verifier';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { EventTypes, hitSlop } from '../../constants';
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
  const basicMessageRepository = agent.context.dependencyManager.resolve(BasicMessageRepository);
  await basicMessageRepository.update(agent.context, record);
};
const NotificationListItem = ({
  notificationType,
  notification,
  customNotification
}) => {
  const navigation = useNavigation();
  const [store, dispatch] = useStore();
  const {
    t
  } = useTranslation();
  const {
    ColorPallet,
    TextTheme
  } = useTheme();
  const {
    agent
  } = useAgent();
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [action, setAction] = useState();
  const [closeAction, setCloseAction] = useState();
  const connectionId = notification instanceof BasicMessageRecord || notification instanceof CredentialExchangeRecord || notification instanceof ProofExchangeRecord ? notification.connectionId ?? '' : '';
  const connection = useConnectionById(connectionId);
  const [details, setDetails] = useState({
    type: InfoBoxType.Info,
    title: undefined,
    body: undefined,
    buttonTitle: undefined
  });
  const [styleConfig, setStyleConfig] = useState({
    containerStyle: {
      backgroundColor: ColorPallet.notification.info,
      borderColor: ColorPallet.notification.infoBorder
    },
    textStyle: {
      color: ColorPallet.notification.infoText
    },
    iconColor: ColorPallet.notification.infoIcon,
    iconName: 'info'
  });
  const {
    name,
    version
  } = parsedSchema(notification);
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
      ...TextTheme.bold,
      flexGrow: 1,
      alignSelf: 'center',
      flex: 1
    },
    bodyText: {
      ...TextTheme.normal,
      flexShrink: 1,
      marginVertical: 15,
      paddingBottom: 10
    },
    icon: {
      marginRight: 10,
      alignSelf: 'center'
    }
  });
  const toggleDeclineModalVisible = () => setDeclineModalVisible(!declineModalVisible);
  const declineProofRequest = async () => {
    try {
      const proofId = notification.id;
      if (agent) {
        await agent.proofs.declineRequest({
          proofRecordId: proofId
        });
      }
    } catch (err) {
      const error = new BifoldError(t('Error.Title1028'), t('Error.Message1028'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1028);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
    toggleDeclineModalVisible();
  };
  const dismissProofRequest = async () => {
    if (agent && notificationType === NotificationType.ProofRequest) {
      markProofAsViewed(agent, notification);
    }
  };
  const dismissBasicMessage = async () => {
    if (agent && notificationType === NotificationType.BasicMessage) {
      markMessageAsSeen(agent, notification);
    }
  };
  const declineCredentialOffer = async () => {
    try {
      const credentialId = notification.id;
      if (agent) {
        await agent.credentials.declineOffer(credentialId);
      }
    } catch (err) {
      const error = new BifoldError(t('Error.Title1028'), t('Error.Message1028'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1028);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
    toggleDeclineModalVisible();
  };
  const declineCustomNotification = async () => {
    customNotification === null || customNotification === void 0 || customNotification.onCloseAction(dispatch);
    toggleDeclineModalVisible();
  };
  const commonRemoveModal = () => {
    let usage;
    let onSubmit;
    if (notificationType === NotificationType.ProofRequest) {
      usage = ModalUsage.ProofRequestDecline;
      if (notification.state === ProofState.Done) {
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
  const detailsForNotificationType = async notificationType => {
    return new Promise(resolve => {
      const theirLabel = getConnectionName(connection, store.preferences.alternateContactNames);
      switch (notificationType) {
        case NotificationType.BasicMessage:
          resolve({
            type: InfoBoxType.Info,
            title: t('Home.NewMessage'),
            body: theirLabel ? `${theirLabel} ${t('Home.SentMessage')}` : t('Home.ReceivedMessage'),
            buttonTitle: t('Home.ViewMessage')
          });
          break;
        case NotificationType.CredentialOffer:
          resolve({
            type: InfoBoxType.Info,
            title: t('CredentialOffer.NewCredentialOffer'),
            body: `${name + (version ? ` v${version}` : '')}`,
            buttonTitle: undefined
          });
          break;
        case NotificationType.ProofRequest:
          {
            const proofId = notification.id;
            agent === null || agent === void 0 || agent.proofs.findRequestMessage(proofId).then(message => {
              if (message instanceof V1RequestPresentationMessage && message.indyProofRequest) {
                resolve({
                  type: InfoBoxType.Info,
                  title: t('ProofRequest.NewProofRequest'),
                  body: message.indyProofRequest.name ?? message.comment ?? '',
                  buttonTitle: undefined
                });
              } else {
                //TODO:(jl) Should we have a default message or stick with an empty string?
                resolve({
                  type: InfoBoxType.Info,
                  title: t('ProofRequest.NewProofRequest'),
                  body: '',
                  buttonTitle: undefined
                });
              }
            });
            break;
          }
        case NotificationType.Revocation:
          resolve({
            type: InfoBoxType.Error,
            title: t('CredentialDetails.NewRevoked'),
            body: `${name + (version ? ` v${version}` : '')}`,
            buttonTitle: undefined
          });
          break;
        case NotificationType.Custom:
          resolve({
            type: InfoBoxType.Info,
            title: t(customNotification === null || customNotification === void 0 ? void 0 : customNotification.title),
            body: t(customNotification === null || customNotification === void 0 ? void 0 : customNotification.description),
            buttonTitle: t(customNotification === null || customNotification === void 0 ? void 0 : customNotification.buttonTitle)
          });
          break;
        default:
          throw new Error('NotificationType was not set correctly.');
      }
    });
  };
  const getActionForNotificationType = (notification, notificationType) => {
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
          (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(Stacks.NotificationStack, {
            screen: Screens.CredentialOffer,
            params: {
              credentialId: notification.id
            }
          });
        };
        onClose = toggleDeclineModalVisible;
        break;
      case NotificationType.ProofRequest:
        if (notification.state === ProofState.Done || notification.state === ProofState.PresentationReceived) {
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
            (_navigation$getParent4 = navigation.getParent()) === null || _navigation$getParent4 === void 0 || _navigation$getParent4.navigate(Stacks.NotificationStack, {
              screen: Screens.ProofRequest,
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
              credential: notification
            }
          });
        };
        break;
      case NotificationType.Custom:
        onPress = () => {
          var _navigation$getParent7;
          return (_navigation$getParent7 = navigation.getParent()) === null || _navigation$getParent7 === void 0 ? void 0 : _navigation$getParent7.navigate(Stacks.NotificationStack, {
            screen: Screens.CustomNotification
          });
        };
        onClose = toggleDeclineModalVisible;
        break;
      default:
        throw new Error('NotificationType was not set correctly.');
    }
    return {
      onPress,
      onClose
    };
  };
  useEffect(() => {
    const {
      onPress,
      onClose
    } = getActionForNotificationType(notification, notificationType);
    setAction(() => onPress);
    setCloseAction(() => onClose);
  }, [notification]);
  useEffect(() => {
    const detailsPromise = async () => {
      const details = await detailsForNotificationType(notificationType);
      setDetails(details);
    };
    detailsPromise();
  }, [notificationType]);
  useEffect(() => {
    switch (details.type) {
      case InfoBoxType.Success:
        setStyleConfig({
          containerStyle: {
            backgroundColor: ColorPallet.notification.success,
            borderColor: ColorPallet.notification.successBorder
          },
          textStyle: {
            color: ColorPallet.notification.successText
          },
          iconColor: ColorPallet.notification.successIcon,
          iconName: 'check-circle'
        });
        break;
      case InfoBoxType.Warn:
        setStyleConfig({
          containerStyle: {
            backgroundColor: ColorPallet.notification.warn,
            borderColor: ColorPallet.notification.warnBorder
          },
          textStyle: {
            color: ColorPallet.notification.warnText
          },
          iconColor: ColorPallet.notification.warnIcon,
          iconName: 'warning'
        });
        break;
      case InfoBoxType.Error:
        setStyleConfig({
          containerStyle: {
            backgroundColor: ColorPallet.notification.error,
            borderColor: ColorPallet.notification.errorBorder
          },
          textStyle: {
            color: ColorPallet.notification.errorText
          },
          iconColor: ColorPallet.notification.errorIcon,
          iconName: 'error'
        });
        break;
      case InfoBoxType.Info:
      default:
        setStyleConfig({
          containerStyle: {
            backgroundColor: ColorPallet.notification.info,
            borderColor: ColorPallet.notification.infoBorder
          },
          textStyle: {
            color: ColorPallet.notification.infoText
          },
          iconColor: ColorPallet.notification.infoIcon,
          iconName: 'info'
        });
    }
  }, [details]);
  const isReceivedProof = notificationType === NotificationType.ProofRequest && (notification.state === ProofState.Done || notification.state === ProofState.PresentationSent);
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
  })), /*#__PURE__*/React.createElement(Text, {
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
  }, /*#__PURE__*/React.createElement(Text, {
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