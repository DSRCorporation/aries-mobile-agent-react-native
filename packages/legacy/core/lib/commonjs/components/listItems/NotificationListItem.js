"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NotificationType = void 0;
var _anoncreds = require("@credo-ts/anoncreds");
var _core = require("@credo-ts/core");
var _reactHooks = require("@credo-ts/react-hooks");
var _ariesBifoldVerifier = require("@hyperledger/aries-bifold-verifier");
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _constants = require("../../constants");
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  const basicMessageRepository = agent.context.dependencyManager.resolve(_core.BasicMessageRepository);
  await basicMessageRepository.update(agent.context, record);
};
const NotificationListItem = ({
  notificationType,
  notification,
  customNotification
}) => {
  const navigation = (0, _native.useNavigation)();
  const [store, dispatch] = (0, _store.useStore)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const [declineModalVisible, setDeclineModalVisible] = (0, _react.useState)(false);
  const [action, setAction] = (0, _react.useState)();
  const [closeAction, setCloseAction] = (0, _react.useState)();
  const connectionId = notification instanceof _core.BasicMessageRecord || notification instanceof _core.CredentialExchangeRecord || notification instanceof _core.ProofExchangeRecord ? notification.connectionId ?? '' : '';
  const connection = (0, _reactHooks.useConnectionById)(connectionId);
  const [details, setDetails] = (0, _react.useState)({
    type: _InfoBox.InfoBoxType.Info,
    title: undefined,
    body: undefined,
    buttonTitle: undefined
  });
  const [styleConfig, setStyleConfig] = (0, _react.useState)({
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
  } = (0, _helpers.parsedSchema)(notification);
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
      const error = new _error.BifoldError(t('Error.Title1028'), t('Error.Message1028'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1028);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
    toggleDeclineModalVisible();
  };
  const dismissProofRequest = async () => {
    if (agent && notificationType === NotificationType.ProofRequest) {
      (0, _ariesBifoldVerifier.markProofAsViewed)(agent, notification);
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
      const error = new _error.BifoldError(t('Error.Title1028'), t('Error.Message1028'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1028);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
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
      usage = _remove.ModalUsage.ProofRequestDecline;
      if (notification.state === _core.ProofState.Done) {
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
  const detailsForNotificationType = async notificationType => {
    return new Promise(resolve => {
      const theirLabel = (0, _helpers.getConnectionName)(connection, store.preferences.alternateContactNames);
      switch (notificationType) {
        case NotificationType.BasicMessage:
          resolve({
            type: _InfoBox.InfoBoxType.Info,
            title: t('Home.NewMessage'),
            body: theirLabel ? `${theirLabel} ${t('Home.SentMessage')}` : t('Home.ReceivedMessage'),
            buttonTitle: t('Home.ViewMessage')
          });
          break;
        case NotificationType.CredentialOffer:
          resolve({
            type: _InfoBox.InfoBoxType.Info,
            title: t('CredentialOffer.NewCredentialOffer'),
            body: `${name + (version ? ` v${version}` : '')}`,
            buttonTitle: undefined
          });
          break;
        case NotificationType.ProofRequest:
          {
            const proofId = notification.id;
            agent === null || agent === void 0 || agent.proofs.findRequestMessage(proofId).then(message => {
              if (message instanceof _anoncreds.V1RequestPresentationMessage && message.indyProofRequest) {
                resolve({
                  type: _InfoBox.InfoBoxType.Info,
                  title: t('ProofRequest.NewProofRequest'),
                  body: message.indyProofRequest.name ?? message.comment ?? '',
                  buttonTitle: undefined
                });
              } else {
                //TODO:(jl) Should we have a default message or stick with an empty string?
                resolve({
                  type: _InfoBox.InfoBoxType.Info,
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
            type: _InfoBox.InfoBoxType.Error,
            title: t('CredentialDetails.NewRevoked'),
            body: `${name + (version ? ` v${version}` : '')}`,
            buttonTitle: undefined
          });
          break;
        case NotificationType.Custom:
          resolve({
            type: _InfoBox.InfoBoxType.Info,
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
          (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(_navigators.Stacks.NotificationStack, {
            screen: _navigators.Screens.CredentialOffer,
            params: {
              credentialId: notification.id
            }
          });
        };
        onClose = toggleDeclineModalVisible;
        break;
      case NotificationType.ProofRequest:
        if (notification.state === _core.ProofState.Done || notification.state === _core.ProofState.PresentationReceived) {
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
            (_navigation$getParent4 = navigation.getParent()) === null || _navigation$getParent4 === void 0 || _navigation$getParent4.navigate(_navigators.Stacks.NotificationStack, {
              screen: _navigators.Screens.ProofRequest,
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
              credential: notification
            }
          });
        };
        break;
      case NotificationType.Custom:
        onPress = () => {
          var _navigation$getParent7;
          return (_navigation$getParent7 = navigation.getParent()) === null || _navigation$getParent7 === void 0 ? void 0 : _navigation$getParent7.navigate(_navigators.Stacks.NotificationStack, {
            screen: _navigators.Screens.CustomNotification
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
  (0, _react.useEffect)(() => {
    const {
      onPress,
      onClose
    } = getActionForNotificationType(notification, notificationType);
    setAction(() => onPress);
    setCloseAction(() => onClose);
  }, [notification]);
  (0, _react.useEffect)(() => {
    const detailsPromise = async () => {
      const details = await detailsForNotificationType(notificationType);
      setDetails(details);
    };
    detailsPromise();
  }, [notificationType]);
  (0, _react.useEffect)(() => {
    switch (details.type) {
      case _InfoBox.InfoBoxType.Success:
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
      case _InfoBox.InfoBoxType.Warn:
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
      case _InfoBox.InfoBoxType.Error:
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
      case _InfoBox.InfoBoxType.Info:
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
  const isReceivedProof = notificationType === NotificationType.ProofRequest && (notification.state === _core.ProofState.Done || notification.state === _core.ProofState.PresentationSent);
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
  })), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
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
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
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