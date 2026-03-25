"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _connections = require("../hooks/connections");
var _navigators = require("../types/navigators");
var _LoadingPlaceholder = _interopRequireWildcard(require("../components/views/LoadingPlaceholder"));
var _ProofRequest = _interopRequireDefault(require("./ProofRequest"));
var _CredentialOffer = _interopRequireDefault(require("./CredentialOffer"));
var _containerApi = require("../container-api");
var _attestation = require("../types/attestation");
var _constants = require("../constants");
var _testable = require("../utils/testable");
var _reactNativeToastMessage = _interopRequireDefault(require("react-native-toast-message"));
var _BaseToast = require("../components/toast/BaseToast");
var _agent = require("../utils/agent");
var _types = require("../modules/history/types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const GoalCodes = {
  proofRequestVerify: 'aries.vc.verify',
  proofRequestVerifyOnce: 'aries.vc.verify.once',
  credentialOffer: 'aries.vc.issue'
};
const Connection = ({
  navigation,
  route
}) => {
  var _oobRecord$outOfBandI2;
  const {
    oobRecordId,
    openIDUri,
    openIDPresentationUri,
    proofId,
    credentialId
  } = route.params;
  const [logger, {
    useNotifications
  }, {
    connectionTimerDelay,
    autoRedirectConnectionToHome,
    enableChat
  }, attestationMonitor, historyManagerCurried, historyEnabled, historyEventsLogger] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.NOTIFICATIONS, _containerApi.TOKENS.CONFIG, _containerApi.TOKENS.UTIL_ATTESTATION_MONITOR, _containerApi.TOKENS.FN_LOAD_HISTORY, _containerApi.TOKENS.HISTORY_ENABLED, _containerApi.TOKENS.HISTORY_EVENTS_LOGGER]);
  const connTimerDelay = connectionTimerDelay ?? 10000; // in ms
  const notifications = useNotifications({
    openIDUri: openIDUri,
    openIDPresentationUri: openIDPresentationUri
  });
  const {
    agent
  } = (0, _agent.useAppAgent)();
  const oobRecord = (0, _connections.useOutOfBandById)(oobRecordId ?? '');
  const connection = (0, _connections.useConnectionByOutOfBandId)(oobRecordId ?? '');
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const merge = (current, next) => ({
    ...current,
    ...next
  });
  const [state, dispatch] = (0, _react.useReducer)(merge, {
    inProgress: true,
    notificationRecord: undefined,
    attestationLoading: false,
    shouldShowProofComponent: false,
    shouldShowOfferComponent: false,
    percentComplete: 30,
    queriedConnection: undefined
  });
  const styles = _reactNative.StyleSheet.create({
    pageContainer: {
      flex: 1
    }
  });
  const logHistoryRecord = (0, _react.useCallback)(() => {
    try {
      if (!(agent && historyEnabled)) {
        logger.trace(`[${_CredentialOffer.default.name}]:[logHistoryRecord] Skipping history log, either history function disabled or agent undefined!`);
        return;
      }
      const historyManager = historyManagerCurried(agent);
      if (!connection) {
        logger.error(`[${_CredentialOffer.default.name}]:[logHistoryRecord] Cannot save history, credential undefined!`);
        return;
      }

      /** Save history record for connection */
      const recordData = {
        type: _types.HistoryCardType.Connection,
        message: _types.HistoryCardType.Connection,
        createdAt: connection.createdAt,
        correspondenceId: connection.id,
        correspondenceName: connection.theirLabel
      };
      historyManager.saveHistory(recordData);
    } catch (err) {
      logger.error(`[${_CredentialOffer.default.name}]:[logHistoryRecord] Error saving history: ${err}`);
    }
  }, [agent, historyEnabled, logger, historyManagerCurried, connection]);
  const handleNavigation = (0, _react.useCallback)(connectionId => {
    dispatch({
      inProgress: false
    });
    if (enableChat) {
      var _navigation$getParent;
      (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.dispatch(_native.CommonActions.reset({
        index: 1,
        routes: [{
          name: _navigators.Stacks.TabStack
        }, {
          name: _navigators.Screens.Chat,
          params: {
            connectionId
          }
        }]
      }));
    } else {
      var _navigation$getParent2;
      (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(_navigators.TabStacks.HomeStack, {
        screen: _navigators.Screens.Home
      });
      _reactNativeToastMessage.default.show({
        type: _BaseToast.ToastType.Success,
        text1: t('Connection.ConnectionCompleted')
      });
    }
  }, [dispatch, navigation, enableChat, t]);
  const onDismissModalTouched = (0, _react.useCallback)(() => {
    var _navigation$getParent3;
    dispatch({
      inProgress: false
    });
    (_navigation$getParent3 = navigation.getParent()) === null || _navigation$getParent3 === void 0 || _navigation$getParent3.navigate(_navigators.TabStacks.HomeStack, {
      screen: _navigators.Screens.Home
    });
  }, [dispatch, navigation]);
  (0, _react.useEffect)(() => {
    if (!attestationMonitor) {
      return;
    }
    const handleStartedAttestation = () => {
      dispatch({
        attestationLoading: true
      });
    };
    const handleStartedCompleted = () => {
      dispatch({
        attestationLoading: false
      });
    };
    const handleFailedAttestation = error => {
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    };
    const subscriptions = Array();
    subscriptions.push(_reactNative.DeviceEventEmitter.addListener(_attestation.AttestationEventTypes.Started, handleStartedAttestation));
    subscriptions.push(_reactNative.DeviceEventEmitter.addListener(_attestation.AttestationEventTypes.Completed, handleStartedCompleted));
    subscriptions.push(_reactNative.DeviceEventEmitter.addListener(_attestation.AttestationEventTypes.FailedHandleProof, handleFailedAttestation));
    subscriptions.push(_reactNative.DeviceEventEmitter.addListener(_attestation.AttestationEventTypes.FailedHandleOffer, handleFailedAttestation));
    subscriptions.push(_reactNative.DeviceEventEmitter.addListener(_attestation.AttestationEventTypes.FailedRequestCredential, handleFailedAttestation));
    return () => {
      subscriptions.forEach(subscription => subscription.remove());
    };
  }, [attestationMonitor]);
  (0, _react.useEffect)(() => {
    const backHandler = _reactNative.BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);
  (0, _react.useEffect)(() => {
    if (proofId) {
      navigation.setOptions({
        title: t('Screens.ProofRequest')
      });
      dispatch({
        inProgress: false,
        shouldShowProofComponent: true
      });
      return;
    }
    if (credentialId) {
      navigation.setOptions({
        title: t('Screens.CredentialOffer')
      });
      dispatch({
        inProgress: false,
        shouldShowOfferComponent: true
      });
      return;
    }
  }, [proofId, credentialId, navigation, t]);
  (0, _react.useEffect)(() => {
    var _oobRecord$outOfBandI;
    if (state.inProgress) {
      return;
    }
    const goalCode = oobRecord === null || oobRecord === void 0 || (_oobRecord$outOfBandI = oobRecord.outOfBandInvitation) === null || _oobRecord$outOfBandI === void 0 ? void 0 : _oobRecord$outOfBandI.goalCode;
    if (historyEventsLogger.logConnection && goalCode != GoalCodes.proofRequestVerifyOnce) {
      logHistoryRecord();
    }
  }, [state.inProgress, state.percentComplete, connTimerDelay, historyEventsLogger.logConnectionRemoved, logHistoryRecord, historyEventsLogger.logConnection, oobRecord === null || oobRecord === void 0 || (_oobRecord$outOfBandI2 = oobRecord.outOfBandInvitation) === null || _oobRecord$outOfBandI2 === void 0 ? void 0 : _oobRecord$outOfBandI2.goalCode]);
  (0, _react.useEffect)(() => {
    if (!oobRecord || !state.inProgress) {
      return;
    }

    // Use queriedConnection as fallback if the hook hasn't found the connection yet
    const actualConnection = connection || state.queriedConnection;

    // If we have a connection, but no goal code, we should navigate
    // to Chat
    if (actualConnection && !Object.values(GoalCodes).includes((oobRecord === null || oobRecord === void 0 ? void 0 : oobRecord.outOfBandInvitation.goalCode) ?? '')) {
      logger === null || logger === void 0 || logger.info('Connection: Handling connection without goal code, navigate to Chat');
      handleNavigation(actualConnection.id);
      return;
    }

    // At this point we should be waiting for a notification
    // to be processed
    if (!state.notificationRecord) {
      return;
    }

    // Connectionless proof request, we don't have connectionless offers.
    if (!actualConnection) {
      navigation.setOptions({
        title: t('Screens.ProofRequest')
      });
      dispatch({
        inProgress: false,
        shouldShowProofComponent: true
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
      navigation.setOptions({
        title: t('Screens.ProofRequest')
      });
      dispatch({
        inProgress: false,
        shouldShowProofComponent: true
      });
      return;
    }
    if (goalCode === GoalCodes.credentialOffer) {
      logger === null || logger === void 0 || logger.info(`Connection: Handling ${goalCode} goal code, navigate to CredentialOffer`);
      navigation.setOptions({
        title: t('Screens.CredentialOffer')
      });
      dispatch({
        inProgress: false,
        shouldShowProofComponent: false,
        shouldShowOfferComponent: true
      });
      return;
    }
    logger === null || logger === void 0 || logger.info(`Connection: Unable to handle ${goalCode} goal code`);
    handleNavigation(actualConnection.id);
  }, [oobRecord, state.inProgress, connection, state.queriedConnection, logger, dispatch, navigation, t, state.notificationRecord, handleNavigation]);

  // This hook will monitor notification for openID type credentials
  // where there is not connection or oobID present
  (0, _react.useEffect)(() => {
    if (!state.inProgress) {
      return;
    }
    if (!state.notificationRecord) {
      return;
    }
    if (state.notificationRecord.type === 'W3cCredentialRecord' || state.notificationRecord.type === 'SdJwtVcRecord' || state.notificationRecord.type === 'MdocRecord') {
      logger === null || logger === void 0 || logger.info(`Connection: Handling OpenID4VCi Credential, navigate to CredentialOffer`);
      dispatch({
        inProgress: false
      });
      navigation.replace(_navigators.Screens.OpenIDCredentialOffer, {
        credential: state.notificationRecord
      });
      return;
    }
    if (state.notificationRecord.type === 'OpenId4VPRequestRecord') {
      dispatch({
        inProgress: false
      });
      navigation.replace(_navigators.Screens.OpenIDProofPresentation, {
        credential: state.notificationRecord
      });
    }
  }, [logger, navigation, state]);
  (0, _react.useEffect)(() => {
    if (!state.inProgress || state.notificationRecord) {
      return;
    }
    const actualConnection = connection || state.queriedConnection;
    const checkNotifications = async () => {
      // First, try to find the connection for this OOB record directly from the agent
      // This handles cases where the connection was created but not yet indexed by the hook
      let foundConnection = actualConnection;
      if (!foundConnection && agent && oobRecordId) {
        try {
          const allConnections = await agent.modules.didcomm.connections.getAll();
          foundConnection = allConnections.find(conn => conn.outOfBandId === oobRecordId);
          if (foundConnection) {
            // Store the found connection in state so other useEffects can access it
            dispatch({
              queriedConnection: foundConnection
            });
          }
        } catch (error) {
          // Silently continue if query fails
          logger.debug(`[Connection] Failed to query connections, continuing: ${error}`);
        }
      }
      for (const notification of notifications) {
        var _oobRecord$getTags;
        // no action taken for BasicMessageRecords
        if (notification.type === 'BasicMessageRecord') {
          continue;
        }
        const notifConnectionId = notification.connectionId;
        const notifThreadId = notification === null || notification === void 0 ? void 0 : notification.threadId;
        const matchesConnection = foundConnection && notifConnectionId === foundConnection.id;
        const matchesOobThread = oobRecord === null || oobRecord === void 0 || (_oobRecord$getTags = oobRecord.getTags()) === null || _oobRecord$getTags === void 0 || (_oobRecord$getTags = _oobRecord$getTags.invitationRequestsThreadIds) === null || _oobRecord$getTags === void 0 ? void 0 : _oobRecord$getTags.includes(notifThreadId ?? '');

        // Check if this notification is for a reused connection
        const matchesReuseConnection = (oobRecord === null || oobRecord === void 0 ? void 0 : oobRecord.reuseConnectionId) && notifConnectionId === oobRecord.reuseConnectionId;

        // For robustness, also check if the notification's connection matches this OOB record
        let matchesOobConnection = false;
        if (agent && oobRecordId && notifConnectionId && !foundConnection) {
          try {
            // Get all connections
            const allConnections = await agent.modules.didcomm.connections.getAll();

            // Find any connection that references this OOB record ID
            const oobConnection = allConnections.find(conn => conn.outOfBandId === oobRecordId);

            // If we found a connection for this OOB record and the notification is for that connection
            if (oobConnection && oobConnection.id === notifConnectionId) {
              matchesOobConnection = true;
            }
          } catch (error) {
            logger.debug(`[Connection] Failed to query connections for OOB match, continuing: ${error} `);
          }
        }
        if (matchesConnection || matchesOobThread || matchesReuseConnection || matchesOobConnection) {
          dispatch({
            notificationRecord: notification
          });
          break;
        }
        if (notification.type === 'W3cCredentialRecord' || notification.type === 'SdJwtVcRecord' || notification.type === 'MdocRecord' || notification.type === 'OpenId4VPRequestRecord') {
          dispatch({
            notificationRecord: notification
          });
          break;
        }
      }
    };
    checkNotifications();
  }, [state.inProgress, state.notificationRecord, state.queriedConnection, notifications, logger, connection, oobRecord, dispatch, oobRecordId, agent]);
  const loadingPlaceholderWorkflowType = () => {
    if (state.shouldShowProofComponent) {
      return _LoadingPlaceholder.LoadingPlaceholderWorkflowType.ProofRequested;
    }
    if (state.shouldShowOfferComponent) {
      return _LoadingPlaceholder.LoadingPlaceholderWorkflowType.ReceiveOffer;
    }
    return _LoadingPlaceholder.LoadingPlaceholderWorkflowType.Connection;
  };
  const displayComponent = () => {
    if (state.inProgress || state.attestationLoading) {
      return /*#__PURE__*/_react.default.createElement(_LoadingPlaceholder.default, {
        workflowType: loadingPlaceholderWorkflowType(),
        timeoutDurationInMs: connTimerDelay,
        loadingProgressPercent: state.percentComplete,
        onCancelTouched: onDismissModalTouched,
        onTimeoutTriggered: autoRedirectConnectionToHome ? onDismissModalTouched : undefined,
        testID: (0, _testable.testIdWithKey)('ConnectionLoading')
      });
    }
    if (state.shouldShowProofComponent) {
      return /*#__PURE__*/_react.default.createElement(_ProofRequest.default, {
        proofId: proofId ?? state.notificationRecord.id,
        navigation: navigation
      });
    }
    if (state.shouldShowOfferComponent) {
      return /*#__PURE__*/_react.default.createElement(_CredentialOffer.default, {
        credentialId: credentialId ?? state.notificationRecord.id,
        navigation: navigation
      });
    }
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.pageContainer
  }, displayComponent());
};
var _default = exports.default = Connection;
//# sourceMappingURL=Connection.js.map