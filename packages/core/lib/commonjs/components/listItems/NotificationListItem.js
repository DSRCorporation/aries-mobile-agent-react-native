"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NotificationType = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _didcomm = require("@credo-ts/didcomm");
var _verifier = require("@bifold/verifier");
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _constants = require("../../constants");
var _containerApi = require("../../container-api");
var _store = require("../../contexts/store");
var _theme = require("../../contexts/theme");
var _error = require("../../types/error");
var _metadata = require("../../types/metadata");
var _navigators = require("../../types/navigators");
var _remove = require("../../types/remove");
var _helpers = require("../../utils/helpers");
var _testable = require("../../utils/testable");
var _Button = _interopRequireWildcard(require("../buttons/Button"));
var _InfoBox = require("../misc/InfoBox");
var _CommonRemoveModal = _interopRequireDefault(require("../modals/CommonRemoveModal"));
var _ThemedText = require("../texts/ThemedText");
var _types = require("../../modules/openid/refresh/types");
var _useOpenIdReplacementNavigation = require("../../modules/openid/hooks/useOpenIdReplacementNavigation");
var _useUpgradeExpiredCredential = require("../../modules/openid/hooks/useUpgradeExpiredCredential");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const iconSize = 30;
let NotificationType = exports.NotificationType = /*#__PURE__*/function (NotificationType) {
  NotificationType["BasicMessage"] = "BasicMessage";
  NotificationType["CredentialOffer"] = "Offer";
  NotificationType["ProofRequest"] = "ProofRecord";
  NotificationType["Revocation"] = "Revocation";
  NotificationType["Custom"] = "Custom";
  NotificationType["Proof"] = "Proof";
  return NotificationType;
}({});
const markMessageAsSeen = async (agent, record) => {
  const meta = record.metadata.get(_metadata.BasicMessageMetadata.customMetadata);
  record.metadata.set(_metadata.BasicMessageMetadata.customMetadata, {
    ...meta,
    seen: true
  });
  const basicMessageRepository = agent.context.dependencyManager.resolve(_didcomm.DidCommBasicMessageRepository);
  await basicMessageRepository.update(agent.context, record);
};
const defaultDetails = {
  type: _InfoBox.InfoBoxType.Info,
  title: undefined,
  body: undefined,
  buttonTitle: undefined
};
const NotificationListItem = ({
  notificationType,
  notification,
  customNotification
}) => {
  const navigation = (0, _native.useNavigation)();
  const openReplacementOffer = (0, _useOpenIdReplacementNavigation.useOpenIdReplacementNavigation)();
  const {
    upgrade
  } = (0, _useUpgradeExpiredCredential.useUpgradeExpiredCredential)();
  const [store, dispatch] = (0, _store.useStore)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const [declineModalVisible, setDeclineModalVisible] = (0, _react.useState)(false);
  const [action, setAction] = (0, _react.useState)();
  const [closeAction, setCloseAction] = (0, _react.useState)();
  const [logger] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER]);
  const connectionId = notification instanceof _didcomm.DidCommBasicMessageRecord || notification instanceof _didcomm.DidCommCredentialExchangeRecord || notification instanceof _didcomm.DidCommProofExchangeRecord ? notification.connectionId ?? '' : '';
  const connection = (0, _reactHooks.useConnectionById)(connectionId);
  const [details, setDetails] = (0, _react.useState)(defaultDetails);
  const [styleConfig, setStyleConfig] = (0, _react.useState)({
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
  const styles = _reactNative.StyleSheet.create({
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
  const isReceivedProof = (0, _react.useMemo)(() => {
    return notificationType === NotificationType.ProofRequest && (notification.state === _didcomm.DidCommProofState.Done || notification.state === _didcomm.DidCommProofState.PresentationSent);
  }, [notificationType, notification]);
  const toggleDeclineModalVisible = (0, _react.useCallback)(() => setDeclineModalVisible(prev => !prev), []);
  const declineProofRequest = (0, _react.useCallback)(async () => {
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
      const error = new _error.BifoldError(t('Error.Title1028'), t('Error.Message1028'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1028);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
    toggleDeclineModalVisible();
  }, [notification, agent, t, toggleDeclineModalVisible]);
  const dismissProofRequest = (0, _react.useCallback)(async () => {
    if (agent && notificationType === NotificationType.ProofRequest) {
      (0, _verifier.markProofAsViewed)(agent, notification);
    }
  }, [agent, notification, notificationType]);
  const dismissBasicMessage = (0, _react.useCallback)(async () => {
    if (agent && notificationType === NotificationType.BasicMessage) {
      markMessageAsSeen(agent, notification);
    }
  }, [agent, notification, notificationType]);
  const declineCredentialOffer = (0, _react.useCallback)(async () => {
    try {
      const credentialId = notification.id;
      if (agent) {
        await agent.modules.credentials.declineOffer(credentialId);
      }
    } catch (err) {
      const error = new _error.BifoldError(t('Error.Title1028'), t('Error.Message1028'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1028);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
    toggleDeclineModalVisible();
  }, [notification, agent, t, toggleDeclineModalVisible]);
  const declineCustomNotification = (0, _react.useCallback)(async () => {
    customNotification === null || customNotification === void 0 || customNotification.onCloseAction(dispatch);
    toggleDeclineModalVisible();
  }, [customNotification, dispatch, toggleDeclineModalVisible]);
  const commonRemoveModal = () => {
    let usage;
    let onSubmit;
    if (notificationType === NotificationType.ProofRequest) {
      usage = _remove.ModalUsage.ProofRequestDecline;
      if (notification.state === _didcomm.DidCommProofState.Done) {
        onSubmit = dismissProofRequest;
      } else {
        onSubmit = declineProofRequest;
      }
    } else if (notificationType === NotificationType.CredentialOffer) {
      usage = _remove.ModalUsage.CredentialOfferDecline;
      onSubmit = declineCredentialOffer;
    } else if (notificationType === NotificationType.Custom) {
      usage = _remove.ModalUsage.CustomNotificationDecline;
      onSubmit = declineCustomNotification;
    } else {
      usage = undefined;
    }
    return usage !== undefined && onSubmit !== undefined ? /*#__PURE__*/_react.default.createElement(_CommonRemoveModal.default, {
      usage: usage,
      visible: declineModalVisible,
      onSubmit: onSubmit,
      onCancel: toggleDeclineModalVisible
    }) : null;
  };
  (0, _react.useEffect)(() => {
    const getDetails = async () => {
      const {
        name,
        version
      } = (0, _helpers.parsedSchema)(notification);
      const theirLabel = (0, _helpers.getConnectionName)(connection, store.preferences.alternateContactNames);
      let details;
      switch (notificationType) {
        case NotificationType.BasicMessage:
          details = {
            type: _InfoBox.InfoBoxType.Info,
            title: t('Home.NewMessage'),
            body: theirLabel ? `${theirLabel} ${t('Home.SentMessage')}` : t('Home.ReceivedMessage'),
            buttonTitle: t('Home.ViewMessage')
          };
          break;
        case NotificationType.CredentialOffer:
          details = {
            type: _InfoBox.InfoBoxType.Info,
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

            if (message instanceof _didcomm.DidCommRequestPresentationV2Message) {
              var _attachment$getDataAs;
              // workaround for getting proof request name in v2 proof request
              // https://github.com/openwallet-foundation/credo-ts/blob/5f08bc67e3d1cc0ab98e7cce7747fedd2bf71ec1/packages/core/src/modules/proofs/protocol/v2/messages/V2RequestPresentationMessage.ts#L78
              const attachment = message.requestAttachments.find(attachment => attachment.id === 'indy');
              const name = (attachment === null || attachment === void 0 || (_attachment$getDataAs = attachment.getDataAsJson()) === null || _attachment$getDataAs === void 0 ? void 0 : _attachment$getDataAs.name) ?? null;
              body = name ?? body;
            }
            details = {
              type: _InfoBox.InfoBoxType.Info,
              title: t('ProofRequest.NewProofRequest'),
              body,
              buttonTitle: undefined
            };
            break;
          }
        case NotificationType.Revocation:
          details = {
            type: _InfoBox.InfoBoxType.Error,
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
        type: _InfoBox.InfoBoxType.Info,
        title: t(customNotification === null || customNotification === void 0 ? void 0 : customNotification.title),
        body: t(customNotification === null || customNotification === void 0 ? void 0 : customNotification.description),
        buttonTitle: t(customNotification === null || customNotification === void 0 ? void 0 : customNotification.buttonTitle)
      });
    } else {
      getDetails();
    }
  }, [notification, notificationType, logger, connection, store.preferences.alternateContactNames, t, agent, customNotification]);
  (0, _react.useEffect)(() => {
    let onPress;
    let onClose;
    switch (notificationType) {
      case NotificationType.BasicMessage:
        onPress = () => {
          var _navigation$getParent;
          (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.Stacks.ContactStack, {
            screen: _navigators.Screens.Chat,
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
          (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(_navigators.Stacks.ConnectionStack, {
            screen: _navigators.Screens.Connection,
            params: {
              credentialId: notification.id
            }
          });
        };
        onClose = toggleDeclineModalVisible;
        break;
      case NotificationType.ProofRequest:
        if (notification.state === _didcomm.DidCommProofState.Done || notification.state === _didcomm.DidCommProofState.PresentationReceived) {
          onPress = () => {
            var _navigation$getParent3;
            (_navigation$getParent3 = navigation.getParent()) === null || _navigation$getParent3 === void 0 || _navigation$getParent3.navigate(_navigators.Stacks.ContactStack, {
              screen: _navigators.Screens.ProofDetails,
              params: {
                recordId: notification.id,
                isHistory: true
              }
            });
          };
        } else {
          onPress = () => {
            var _navigation$getParent4;
            (_navigation$getParent4 = navigation.getParent()) === null || _navigation$getParent4 === void 0 || _navigation$getParent4.navigate(_navigators.Stacks.ConnectionStack, {
              screen: _navigators.Screens.Connection,
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
          return (_navigation$getParent5 = navigation.getParent()) === null || _navigation$getParent5 === void 0 ? void 0 : _navigation$getParent5.navigate(_navigators.Stacks.NotificationStack, {
            screen: _navigators.Screens.ProofDetails,
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
          return (_navigation$getParent6 = navigation.getParent()) === null || _navigation$getParent6 === void 0 ? void 0 : _navigation$getParent6.navigate(_navigators.Stacks.NotificationStack, {
            screen: _navigators.Screens.CredentialDetails,
            params: {
              credentialId: notification.id
            }
          });
        };
        break;
      case NotificationType.Custom:
        onPress = () => {
          var _navigation$getParent7;
          if ((customNotification === null || customNotification === void 0 ? void 0 : customNotification.type) === _types.OpenIDCustomNotificationType.CredentialExpired && customNotification.metadata && typeof customNotification.metadata.oldId === 'string') {
            upgrade(customNotification.metadata.oldId);
            return;
          }
          customNotification !== null && customNotification !== void 0 && customNotification.onPressAction ? customNotification.onPressAction() : (_navigation$getParent7 = navigation.getParent()) === null || _navigation$getParent7 === void 0 ? void 0 : _navigation$getParent7.navigate(_navigators.Stacks.NotificationStack, {
            screen: _navigators.Screens.CustomNotification
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
  (0, _react.useEffect)(() => {
    switch (details.type) {
      case _InfoBox.InfoBoxType.Success:
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
      case _InfoBox.InfoBoxType.Warn:
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
      case _InfoBox.InfoBoxType.Error:
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
      case _InfoBox.InfoBoxType.Info:
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
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, styleConfig.containerStyle],
    testID: (0, _testable.testIdWithKey)('NotificationListItem')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.icon
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    accessible: false,
    name: styleConfig.iconName,
    size: iconSize,
    color: styleConfig.iconColor
  })), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold",
    style: [styles.headerText, styleConfig.textStyle],
    testID: (0, _testable.testIdWithKey)('HeaderText')
  }, details.title), [NotificationType.BasicMessage, NotificationType.Custom, NotificationType.ProofRequest, NotificationType.CredentialOffer].includes(notificationType) && /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessibilityLabel: t('Global.Dismiss'),
    accessibilityRole: 'button',
    testID: (0, _testable.testIdWithKey)(`Dismiss${notificationType}`),
    onPress: closeAction,
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: 'close',
    size: iconSize,
    color: styleConfig.iconColor
  })))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.bodyContainer
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: [styles.bodyText, styleConfig.textStyle],
    testID: (0, _testable.testIdWithKey)('BodyText')
  }, details.body), /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: details.buttonTitle ?? t('Global.View'),
    accessibilityLabel: details.buttonTitle ?? t('Global.View'),
    testID: (0, _testable.testIdWithKey)(`View${notificationType}${isReceivedProof ? 'Received' : ''}`),
    buttonType: _Button.ButtonType.Primary,
    onPress: action
  })), commonRemoveModal());
};
var _default = exports.default = NotificationListItem;
//# sourceMappingURL=NotificationListItem.js.map