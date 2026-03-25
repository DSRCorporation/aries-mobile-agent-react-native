"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@credo-ts/core");
var _reactHooks = require("@bifold/react-hooks");
var _didcomm = require("@credo-ts/didcomm");
var _native = require("@react-navigation/native");
var _moment = _interopRequireDefault(require("moment"));
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _ConnectionImage = _interopRequireDefault(require("../components/misc/ConnectionImage"));
var _InfoBox = _interopRequireWildcard(require("../components/misc/InfoBox"));
var _CommonRemoveModal = _interopRequireDefault(require("../components/modals/CommonRemoveModal"));
var _ProofCancelModal = _interopRequireDefault(require("../components/modals/ProofCancelModal"));
var _InfoTextBox = _interopRequireDefault(require("../components/texts/InfoTextBox"));
var _constants = require("../constants");
var _containerApi = require("../container-api");
var _network = require("../contexts/network");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _tourContext = require("../contexts/tour/tour-context");
var _connections = require("../hooks/connections");
var _oob = require("../hooks/oob");
var _proofs = require("../hooks/proofs");
var _attestation = require("../types/attestation");
var _error = require("../types/error");
var _navigators = require("../types/navigators");
var _remove = require("../types/remove");
var _agent = require("../utils/agent");
var _helpers = require("../utils/helpers");
var _testable = require("../utils/testable");
var _LoadingPlaceholder = _interopRequireWildcard(require("../components/views/LoadingPlaceholder"));
var _ProofRequestAccept = _interopRequireDefault(require("./ProofRequestAccept"));
var _types = require("../modules/history/types");
var _tour = require("../types/tour");
var _ThemedText = require("../components/texts/ThemedText");
var _credentials = require("../types/credentials");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ProofRequest = ({
  navigation,
  proofId
}) => {
  var _useOutOfBandByConnec, _useOutOfBandByReceiv;
  const {
    agent
  } = (0, _agent.useAppAgent)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    assertNetworkConnected
  } = (0, _network.useNetwork)();
  const {
    height
  } = (0, _reactNative.useWindowDimensions)();
  const proof = (0, _reactHooks.useProofById)(proofId);
  const connection = (0, _reactHooks.useConnectionById)((proof === null || proof === void 0 ? void 0 : proof.connectionId) ?? '');
  const [pendingModalVisible, setPendingModalVisible] = (0, _react.useState)(false);
  const [revocationOffense, setRevocationOffense] = (0, _react.useState)(false);
  const [retrievedCredentials, setRetrievedCredentials] = (0, _react.useState)();
  // all credentials in the users wallet
  const [userCredentials, setUserCredentials] = (0, _react.useState)([]);
  const [missingCredentials, setMissingCredentials] = (0, _react.useState)([]);
  const [descriptorMetadata, setDescriptorMetadata] = (0, _react.useState)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [declineModalVisible, setDeclineModalVisible] = (0, _react.useState)(false);
  const [cancelModalVisible, setCancelModalVisible] = (0, _react.useState)(false);
  const {
    ColorPalette,
    ListItems,
    TextTheme
  } = (0, _theme.useTheme)();
  const goalCode = (_useOutOfBandByConnec = (0, _connections.useOutOfBandByConnectionId)((proof === null || proof === void 0 ? void 0 : proof.connectionId) ?? '')) === null || _useOutOfBandByConnec === void 0 ? void 0 : _useOutOfBandByConnec.outOfBandInvitation.goalCode;
  const outOfBandInvitation = (_useOutOfBandByReceiv = (0, _oob.useOutOfBandByReceivedInvitationId)((proof === null || proof === void 0 ? void 0 : proof.parentThreadId) ?? '')) === null || _useOutOfBandByReceiv === void 0 ? void 0 : _useOutOfBandByReceiv.outOfBandInvitation;
  const [containsPI, setContainsPI] = (0, _react.useState)(false);
  const [activeCreds, setActiveCreds] = (0, _react.useState)([]);
  const [selectedCredentials, setSelectedCredentials] = (0, _react.useState)([]);
  const [attestationLoading, setAttestationLoading] = (0, _react.useState)(false);
  const [showDetailsModal, setShowDetailsModal] = (0, _react.useState)(false);
  const [showErrorModal, setShowErrorModal] = (0, _react.useState)(false);
  const [store, dispatch] = (0, _store2.useStore)();
  const credProofPromise = (0, _proofs.useAllCredentialsForProof)(proofId);
  const [ConnectionAlert] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMPONENT_CONNECTION_ALERT]);
  const proofConnectionLabel = (0, _react.useMemo)(() => (0, _helpers.getConnectionName)(connection, store.preferences.alternateContactNames), [connection, store.preferences.alternateContactNames]);
  const {
    start
  } = (0, _tourContext.useTour)();
  const screenIsFocused = (0, _native.useIsFocused)();
  const [bundleResolver, attestationMonitor, {
    enableTours: enableToursConfig
  }, logger, historyManagerCurried, historyEnabled, historyEventsLogger, CredentialCard] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_OCA_RESOLVER, _containerApi.TOKENS.UTIL_ATTESTATION_MONITOR, _containerApi.TOKENS.CONFIG, _containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.FN_LOAD_HISTORY, _containerApi.TOKENS.HISTORY_ENABLED, _containerApi.TOKENS.HISTORY_EVENTS_LOGGER, _containerApi.TOKENS.COMPONENT_CREDENTIAL_CARD]);
  const styles = _reactNative.StyleSheet.create({
    pageContainer: {
      flex: 1
    },
    pageContent: {
      flexGrow: 1,
      justifyContent: 'space-between'
    },
    pageMargin: {
      marginHorizontal: 20
    },
    pageFooter: {
      marginVertical: 15
    },
    headerTextContainer: {
      paddingVertical: 16
    },
    headerText: {
      ...ListItems.recordAttributeText,
      flexShrink: 1
    },
    footerButton: {
      paddingTop: 10
    },
    link: {
      ...ListItems.recordAttributeText,
      ...ListItems.recordLink,
      paddingVertical: 2
    },
    valueContainer: {
      minHeight: ListItems.recordAttributeText.fontSize,
      paddingVertical: 4
    },
    detailsButton: {
      ...ListItems.recordAttributeText,
      color: ColorPalette.brand.link,
      textDecorationLine: 'underline'
    }
  });
  (0, _react.useEffect)(() => {
    if (proof && (proof === null || proof === void 0 ? void 0 : proof.state) !== _didcomm.DidCommProofState.RequestReceived) {
      setShowErrorModal(true);
    }
  }, [t, proof]);
  (0, _react.useEffect)(() => {
    if (!attestationMonitor) {
      return;
    }
    const handleStartedAttestation = () => {
      setAttestationLoading(true);
    };
    const handleStartedCompleted = () => {
      setAttestationLoading(false);
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
    const shouldShowTour = enableToursConfig && store.tours.enableTours && !store.tours.seenProofRequestTour;
    if (shouldShowTour && screenIsFocused) {
      start(_tour.BaseTourID.ProofRequestTour);
      dispatch({
        type: _store.DispatchAction.UPDATE_SEEN_PROOF_REQUEST_TOUR,
        payload: [true]
      });
    }
  }, [enableToursConfig, store.tours.enableTours, store.tours.seenProofRequestTour, screenIsFocused, start, dispatch]);
  (0, _react.useEffect)(() => {
    if (!agent || !proof) {
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, new _error.BifoldError(t('Error.Title1034'), t('Error.Message1034'), t('ProofRequest.ProofRequestNotFound'), 1034));
    }
  }, [agent, proof, t]);
  const containsRevokedCreds = (credExRecords, fields) => {
    const revList = credExRecords.map(cred => {
      var _cred$revocationNotif;
      return {
        id: cred.credentials.map(item => item.credentialRecordId),
        revocationDate: (_cred$revocationNotif = cred.revocationNotification) === null || _cred$revocationNotif === void 0 ? void 0 : _cred$revocationNotif.revocationDate
      };
    });
    return revList.some(item => {
      // no revocation date means it's not revoked, leave early
      if (!item.revocationDate) {
        return false;
      }
      const revDate = (0, _moment.default)(item.revocationDate);
      return item.id.some(id => {
        return Object.keys(fields).some(key => {
          var _fields$key;
          const dateIntervals = (_fields$key = fields[key]) === null || _fields$key === void 0 ? void 0 : _fields$key.filter(attr => attr.credentialId === id).map(attr => {
            var _attr$nonRevoked, _attr$nonRevoked2;
            return {
              to: ((_attr$nonRevoked = attr.nonRevoked) === null || _attr$nonRevoked === void 0 ? void 0 : _attr$nonRevoked.to) !== undefined ? _moment.default.unix(attr.nonRevoked.to) : undefined,
              from: ((_attr$nonRevoked2 = attr.nonRevoked) === null || _attr$nonRevoked2 === void 0 ? void 0 : _attr$nonRevoked2.from) !== undefined ? _moment.default.unix(attr.nonRevoked.from) : undefined
            };
          });
          return dateIntervals === null || dateIntervals === void 0 ? void 0 : dateIntervals.some(inter => inter.to !== undefined && inter.to > revDate || inter.from !== undefined && inter.from > revDate);
        });
      });
    });
  };
  (0, _react.useEffect)(() => {
    setLoading(true);
    const credPromise = async () => {
      let value = undefined;
      try {
        value = await credProofPromise;
        if (!value) {
          setLoading(false);
          return;
        }
      } catch (err) {
        const error = new _error.BifoldError(t('Error.Title1026'), t('Error.Message1026'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1026);
        _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
        setLoading(false);
        return;
      }
      const {
        groupedProof,
        retrievedCredentials,
        fullCredentials,
        descriptorMetadata
      } = value;
      setLoading(false);
      setDescriptorMetadata(descriptorMetadata);

      // Credentials that satisfy the proof request
      let credList = [];
      if (selectedCredentials.length > 0) {
        credList = selectedCredentials;
      } else {
        // we only want one of each satisfying credential
        groupedProof.forEach(item => {
          var _item$altCredentials;
          const credId = (_item$altCredentials = item.altCredentials) === null || _item$altCredentials === void 0 ? void 0 : _item$altCredentials[0];
          if (credId && !credList.includes(credId)) {
            credList.push(credId);
          }
        });
      }
      const formatCredentials = (retrievedItems, credList) => {
        return Object.keys(retrievedItems).map(key => {
          return {
            [key]: retrievedItems[key].filter(attr => credList.includes(attr.credentialId))
          };
        }).reduce((prev, curr) => {
          return {
            ...prev,
            ...curr
          };
        }, {});
      };
      const selectRetrievedCredentials = retrievedCredentials ? {
        ...retrievedCredentials,
        attributes: formatCredentials(retrievedCredentials.attributes, credList),
        predicates: formatCredentials(retrievedCredentials.predicates, credList)
      } : undefined;
      setRetrievedCredentials(selectRetrievedCredentials);
      const activeCreds = groupedProof.filter(item => credList.includes(item.credId));
      setActiveCreds(activeCreds);
      const unpackCredToField = credentials => {
        return credentials.reduce((prev, current) => {
          return {
            ...prev,
            [current.credId]: current.attributes ?? current.predicates ?? []
          };
        }, {});
      };
      const userCredentials = [];
      const missingCredentials = [];
      const schemaIds = new Set(fullCredentials.map(fullCredential => (0, _helpers.getCredentialSchemaIdForRecord)(fullCredential)).filter(id => id !== null));
      const credDefIds = new Set(fullCredentials.map(fullCredential => (0, _helpers.getCredentialDefinitionIdForRecord)(fullCredential)).filter(id => id !== null));
      activeCreds.forEach(cred => {
        const isMissing = !schemaIds.has(cred.schemaId ?? '') && !credDefIds.has(cred.credDefId ?? '');
        const isUserCredential = schemaIds.has(cred.schemaId ?? '') || credDefIds.has(cred.credDefId ?? '');
        if (isMissing && !cred.credExchangeRecord) {
          missingCredentials.push(cred);
        }
        if (isUserCredential || cred.credExchangeRecord) {
          userCredentials.push(cred);
        }
      });
      setUserCredentials(userCredentials);
      setMissingCredentials(missingCredentials);

      // Check for revoked credentials
      const records = fullCredentials.filter(record => record.credentials.some(cred => credList.includes(cred.credentialRecordId)));
      const foundRevocationOffense = containsRevokedCreds(records, unpackCredToField(activeCreds));
      setRevocationOffense(foundRevocationOffense);
    };
    credPromise();
  }, [selectedCredentials, credProofPromise, t]);
  const toggleDeclineModalVisible = (0, _react.useCallback)(() => setDeclineModalVisible(prev => !prev), []);
  const toggleCancelModalVisible = (0, _react.useCallback)(() => setCancelModalVisible(prev => !prev), []);
  const getCredentialsFields = (0, _react.useCallback)(() => ({
    ...(retrievedCredentials === null || retrievedCredentials === void 0 ? void 0 : retrievedCredentials.attributes),
    ...(retrievedCredentials === null || retrievedCredentials === void 0 ? void 0 : retrievedCredentials.predicates)
  }), [retrievedCredentials]);
  (0, _react.useEffect)(() => {
    // get oca bundle to see if we're presenting personally identifiable elements
    activeCreds.some(async item => {
      var _resolvedBundle$captu;
      if (!item || !(item.credDefId || item.schemaId)) {
        return false;
      }
      const labels = (item.attributes ?? []).flatMap(field => [field.label, field.name].filter(Boolean));
      const bundle = await bundleResolver.resolveAllBundles({
        identifiers: {
          credentialDefinitionId: item.credDefId,
          schemaId: item.schemaId
        }
      });
      const resolvedBundle = bundle === null || bundle === void 0 ? void 0 : bundle.bundle;
      const overlayBundle = (resolvedBundle === null || resolvedBundle === void 0 ? void 0 : resolvedBundle.bundle) ?? resolvedBundle;
      const flagged = (overlayBundle === null || overlayBundle === void 0 ? void 0 : overlayBundle.flaggedAttributes) ?? (resolvedBundle === null || resolvedBundle === void 0 || (_resolvedBundle$captu = resolvedBundle.captureBase) === null || _resolvedBundle$captu === void 0 ? void 0 : _resolvedBundle$captu.flaggedAttributes);
      const flaggedNames = Array.isArray(flagged) && flagged.every(item => typeof item === 'string') ? flagged : Array.isArray(flagged) ? flagged.map(attr => attr === null || attr === void 0 ? void 0 : attr.name).filter(Boolean) : [];
      const foundPI = labels.some(label => flaggedNames.includes(label));
      setContainsPI(foundPI);
      return foundPI;
    });
  }, [activeCreds, bundleResolver]);
  const hasAvailableCredentials = (0, _react.useMemo)(() => {
    const fields = getCredentialsFields();
    return !!retrievedCredentials && Object.values(fields).every(c => c.length > 0);
  }, [retrievedCredentials, getCredentialsFields]);
  const hasSatisfiedPredicates = (0, _react.useCallback)((fields, credId) => {
    return activeCreds.flatMap(item => (0, _helpers.evaluatePredicates)(fields, credId)(item)).every(p => p.satisfied);
  }, [activeCreds]);
  const logHistoryRecord = (0, _react.useCallback)(async type => {
    try {
      var _message;
      if (!(agent && historyEnabled)) {
        logger.trace(`[${ProofRequest.name}]:[logHistoryRecord] Skipping history log, either history function disabled or agent undefined!`);
        return;
      }
      const historyManager = historyManagerCurried(agent);
      if (!proof) {
        logger.error(`[${ProofRequest.name}]:[logHistoryRecord] Cannot save history, proof undefined!`);
        return;
      }
      let message;
      try {
        message = await (agent === null || agent === void 0 ? void 0 : agent.modules.didcomm.proofs.findRequestMessage(proofId));
      } catch (error) {
        logger.error('Error finding request message:', error);
      }

      /** Save history record for proof accepted/declined */
      const recordData = {
        type: type,
        message: ((_message = message) === null || _message === void 0 ? void 0 : _message.comment) ?? '',
        createdAt: proof.createdAt,
        correspondenceId: proofId,
        correspondenceName: proofConnectionLabel
      };
      historyManager.saveHistory(recordData);
    } catch (err) {
      logger.error(`[${ProofRequest.name}]:[logHistoryRecord] Error saving history: ${err}`);
    }
  }, [agent, historyEnabled, logger, historyManagerCurried, proof, proofId, proofConnectionLabel]);
  const handleAcceptPress = (0, _react.useCallback)(async () => {
    try {
      var _format$request, _format$request2;
      if (!(agent && proof && assertNetworkConnected())) {
        return;
      }
      setPendingModalVisible(true);
      if (!retrievedCredentials) {
        throw new Error(t('ProofRequest.RequestedCredentialsCouldNotBeFound'));
      }
      const format = await agent.modules.didcomm.proofs.getFormatData(proof.id);
      if ((_format$request = format.request) !== null && _format$request !== void 0 && _format$request.presentationExchange) {
        if (!descriptorMetadata) throw new Error(t('ProofRequest.PresentationMetadataNotFound'));
        const selectedCredentials = Object.fromEntries(Object.entries(descriptorMetadata).map(([descriptorId, meta]) => {
          const activeCredentialIds = activeCreds.map(cred => cred.credId);
          const selectedRecord = meta.find(item => activeCredentialIds.includes(item.record.id));
          if (!selectedRecord) {
            throw new Error(t('ProofRequest.CredentialMetadataNotFound'));
          }
          const recordReturn = {
            claimFormat: _core.ClaimFormat.JwtVc,
            credentialRecord: selectedRecord.record
          };
          return [descriptorId, [recordReturn]];
        }));
        await agent.modules.didcomm.proofs.acceptRequest({
          proofExchangeRecordId: proof.id,
          proofFormats: {
            presentationExchange: {
              credentials: selectedCredentials
            }
          }
        });
        if (proof.connectionId && goalCode !== null && goalCode !== void 0 && goalCode.endsWith('verify.once')) {
          agent.modules.didcomm.connections.deleteById(proof.connectionId);
        }
        return;
      }
      const formatToUse = (_format$request2 = format.request) !== null && _format$request2 !== void 0 && _format$request2.anoncreds ? 'anoncreds' : 'indy';
      const formatCredentials = (retrievedItems, credList) => {
        return Object.keys(retrievedItems).map(key => {
          return {
            [key]: retrievedItems[key].find(cred => credList.includes(cred.credentialId))
          };
        }).reduce((prev, current) => {
          return {
            ...prev,
            ...current
          };
        }, {});
      };

      // this is the best way to supply our desired credentials in the proof, otherwise it selects them automatically
      const credObject = {
        ...retrievedCredentials,
        attributes: formatCredentials(retrievedCredentials.attributes, activeCreds.map(item => item.credId)),
        predicates: formatCredentials(retrievedCredentials.predicates, activeCreds.map(item => item.credId)),
        selfAttestedAttributes: {}
      };
      const automaticRequestedCreds = {
        proofFormats: {
          [formatToUse]: {
            ...credObject
          }
        }
      };
      if (!automaticRequestedCreds) {
        throw new Error(t('ProofRequest.RequestedCredentialsCouldNotBeFound'));
      }
      await agent.modules.didcomm.proofs.acceptRequest({
        proofExchangeRecordId: proof.id,
        proofFormats: automaticRequestedCreds.proofFormats
      });
      if (proof.connectionId && goalCode !== null && goalCode !== void 0 && goalCode.endsWith('verify.once')) {
        agent.modules.didcomm.connections.deleteById(proof.connectionId);
      }
      if (historyEventsLogger.logInformationSent) {
        logHistoryRecord(_types.HistoryCardType.InformationSent);
      }
    } catch (err) {
      setPendingModalVisible(false);
      const error = new _error.BifoldError(t('Error.Title1027'), t('Error.Message1027'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1027);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
  }, [agent, proof, assertNetworkConnected, retrievedCredentials, activeCreds, descriptorMetadata, goalCode, t, historyEventsLogger.logInformationSent, logHistoryRecord]);
  const handleDeclineTouched = (0, _react.useCallback)(async () => {
    var _navigation$getParent;
    try {
      if (agent && proof) {
        const connectionId = proof.connectionId ?? '';
        const connection = await agent.modules.didcomm.connections.findById(connectionId);
        if (connection) {
          await agent.modules.didcomm.proofs.sendProblemReport({
            proofExchangeRecordId: proof.id,
            description: t('ProofRequest.Declined')
          });
        }
        await agent.modules.didcomm.proofs.declineRequest({
          proofExchangeRecordId: proof.id
        });
        if (connectionId && goalCode !== null && goalCode !== void 0 && goalCode.endsWith('verify.once')) {
          agent.modules.didcomm.connections.deleteById(connectionId);
        }
      }
    } catch (err) {
      const error = new _error.BifoldError(t('Error.Title1028'), t('Error.Message1028'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1028);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
    toggleDeclineModalVisible();
    if (historyEventsLogger.logInformationNotSent) {
      logHistoryRecord(_types.HistoryCardType.InformationNotSent);
    }
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.TabStacks.HomeStack, {
      screen: _navigators.Screens.Home
    });
  }, [agent, proof, goalCode, t, navigation, toggleDeclineModalVisible, historyEventsLogger.logInformationNotSent, logHistoryRecord]);
  const handleCancelTouched = (0, _react.useCallback)(async () => {
    try {
      toggleCancelModalVisible();
      if (agent && proof) {
        await agent.modules.didcomm.proofs.sendProblemReport({
          proofExchangeRecordId: proof.id,
          description: t('ProofRequest.Declined')
        });
        await agent.modules.didcomm.proofs.declineRequest({
          proofExchangeRecordId: proof.id
        });
        if (proof.connectionId && goalCode !== null && goalCode !== void 0 && goalCode.endsWith('verify.once')) {
          agent.modules.didcomm.connections.deleteById(proof.connectionId);
        }
      }
    } catch (err) {
      const error = new _error.BifoldError(t('Error.Title1028'), t('Error.Message1028'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1028);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
  }, [toggleCancelModalVisible, agent, proof, t, goalCode]);
  const onCancelDone = (0, _react.useCallback)(() => {
    var _navigation$getParent2;
    (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(_navigators.TabStacks.HomeStack, {
      screen: _navigators.Screens.Home
    });
  }, [navigation]);
  const callViewJSONDetails = (0, _react.useCallback)(() => {
    navigation.navigate(_navigators.Stacks.ContactStack, {
      screen: _navigators.Screens.JSONDetails,
      params: {
        jsonBlob: '"proof":' + JSON.stringify(proof, null, 2) + '\n"retrievedCredentials":' + JSON.stringify(retrievedCredentials, null, 2)
      }
    });
  }, [navigation, proof, retrievedCredentials]);
  const shareDisabledErrors = (0, _react.useMemo)(() => {
    return {
      hasCredentialError: !hasAvailableCredentials,
      hasSatisfiedPredicateError: !hasSatisfiedPredicates(getCredentialsFields()),
      hasRevokedOffense: revocationOffense,
      hasProofStateReceivedError: (proof === null || proof === void 0 ? void 0 : proof.state) !== _didcomm.DidCommProofState.RequestReceived
    };
  }, [hasAvailableCredentials, hasSatisfiedPredicates, getCredentialsFields, revocationOffense, proof]);
  const isShareDisabled = (0, _react.useMemo)(() => {
    return Object.values(shareDisabledErrors).some(value => value);
  }, [shareDisabledErrors]);
  const proofPageHeader = () => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, attestationLoading && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        padding: 20
      }
    }, /*#__PURE__*/_react.default.createElement(_InfoTextBox.default, null, t('ProofRequest.JustAMoment'))), loading || attestationLoading ? /*#__PURE__*/_react.default.createElement(_LoadingPlaceholder.default, {
      workflowType: _LoadingPlaceholder.LoadingPlaceholderWorkflowType.ProofRequested,
      timeoutDurationInMs: 10000,
      loadingProgressPercent: 30,
      onCancelTouched: async () => {
        await handleDeclineTouched();
      },
      testID: (0, _testable.testIdWithKey)('ProofRequestLoading')
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.pageMargin
    }, /*#__PURE__*/_react.default.createElement(_ConnectionImage.default, {
      connectionId: proof === null || proof === void 0 ? void 0 : proof.connectionId
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.headerTextContainer
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: styles.headerText,
      testID: (0, _testable.testIdWithKey)('HeaderText')
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "title"
    }, proofConnectionLabel || (outOfBandInvitation === null || outOfBandInvitation === void 0 ? void 0 : outOfBandInvitation.label) || t('ContactDetails.AContact')), ' ', /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('ProofRequest.IsRequestingYouToShare')), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "title"
    }, ` ${activeCreds === null || activeCreds === void 0 ? void 0 : activeCreds.length} `), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, (activeCreds === null || activeCreds === void 0 ? void 0 : activeCreds.length) > 1 ? t('ProofRequest.Credentials') : t('ProofRequest.Credential'))), isShareDisabled && /*#__PURE__*/_react.default.createElement(_InfoTextBox.default, {
      type: _InfoBox.InfoBoxType.Error,
      style: {
        marginTop: 16
      },
      textStyle: {
        fontWeight: 'normal'
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flex: 1,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: {
        alignSelf: 'center',
        flex: 1,
        flexWrap: 'wrap',
        color: ColorPalette.notification.errorText
      }
    }, t('ProofRequest.YouCantRespond'), ' ', /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: {
        fontWeight: TextTheme.normal.fontWeight,
        color: ColorPalette.brand.link
      },
      onPress: () => setShowDetailsModal(true)
    }, t('Global.ShowDetails'))))))));
  };
  const shareDisabledMessage = (0, _react.useMemo)(() => {
    let finalMessage = `${t('ProofRequest.YouCantRespondReasons')}\n`;
    if (shareDisabledErrors.hasCredentialError) {
      finalMessage += `\n \u2022 ${t('ProofRequest.CredentialIsMissing')}`;
    }
    if (shareDisabledErrors.hasSatisfiedPredicateError) {
      finalMessage += `\n \u2022 ${t('ProofRequest.ProofRequestPredicateError')}`;
    }
    if (shareDisabledErrors.hasRevokedOffense) {
      finalMessage += `\n \u2022 ${t('ProofRequest.CredentialForProofIsRevoked')}`;
    }
    if (shareDisabledErrors.hasProofStateReceivedError) {
      finalMessage += `\n \u2022 ${t('ProofRequest.ProofRequestStateError', {
        state: proof === null || proof === void 0 ? void 0 : proof.state
      })}`;
    }
    finalMessage += `\n\n${t('ProofRequest.PleaseAddress')}`;
    return finalMessage;
  }, [t, shareDisabledErrors, proof]);
  const handleAltCredChange = (0, _react.useCallback)((selectedCred, altCredentials) => {
    var _navigation$getParent3;
    const onCredChange = cred => {
      const newSelectedCreds = (selectedCredentials.length > 0 ? selectedCredentials : activeCreds.map(item => item.credId)).filter(id => !altCredentials.includes(id));
      setSelectedCredentials([cred, ...newSelectedCreds]);
    };
    (_navigation$getParent3 = navigation.getParent()) === null || _navigation$getParent3 === void 0 || _navigation$getParent3.navigate(_navigators.Stacks.ProofRequestsStack, {
      screen: _navigators.Screens.ProofChangeCredential,
      params: {
        selectedCred,
        altCredentials,
        proofId,
        onCredChange
      }
    });
  }, [selectedCredentials, activeCreds, proofId, navigation]);
  const proofPageFooter = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.pageFooter, styles.pageMargin]
    }, containsPI && /*#__PURE__*/_react.default.createElement(_InfoTextBox.default, {
      type: _InfoBox.InfoBoxType.Warn,
      style: {
        marginTop: 16
      },
      textStyle: {
        fontSize: TextTheme.title.fontSize
      }
    }, t('ProofRequest.SensitiveInformation')), !loading && Boolean(proofConnectionLabel) && goalCode === 'aries.vc.verify' && /*#__PURE__*/_react.default.createElement(ConnectionAlert, {
      connectionLabel: proofConnectionLabel
    }), !loading && isShareDisabled ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.footerButton
    }, /*#__PURE__*/_react.default.createElement(_Button.default, {
      title: t('Global.Cancel'),
      accessibilityLabel: t('Global.Cancel'),
      testID: (0, _testable.testIdWithKey)('Cancel'),
      buttonType: _Button.ButtonType.Primary,
      onPress: handleCancelTouched
    })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !loading && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.footerButton
    }, /*#__PURE__*/_react.default.createElement(_Button.default, {
      title: t('Global.Share'),
      accessibilityLabel: t('Global.Share'),
      testID: (0, _testable.testIdWithKey)('Share'),
      buttonType: _Button.ButtonType.Primary,
      onPress: handleAcceptPress
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.footerButton
    }, /*#__PURE__*/_react.default.createElement(_Button.default, {
      title: t('Global.Decline'),
      accessibilityLabel: t('Global.Decline'),
      testID: (0, _testable.testIdWithKey)('Decline'),
      buttonType: !retrievedCredentials ? _Button.ButtonType.Primary : _Button.ButtonType.Secondary,
      onPress: toggleDeclineModalVisible
    })), store.preferences.developerModeEnabled && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.footerButton
    }, /*#__PURE__*/_react.default.createElement(_Button.default, {
      title: t('Global.ViewJSON'),
      accessibilityLabel: t('Global.ViewJSON'),
      testID: (0, _testable.testIdWithKey)('JSONDetails'),
      buttonType: _Button.ButtonType.Secondary,
      onPress: callViewJSONDetails
    }))))));
  };
  const CredentialList = ({
    header,
    footer,
    items,
    missing
  }) => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      data: items,
      scrollEnabled: false,
      ListHeaderComponent: header,
      ListFooterComponent: footer,
      renderItem: ({
        item
      }) => {
        var _item$credExchangeRec;
        const errors = [];
        missing && errors.push(_credentials.CredentialErrors.NotInWallet);
        ((_item$credExchangeRec = item.credExchangeRecord) === null || _item$credExchangeRec === void 0 || (_item$credExchangeRec = _item$credExchangeRec.revocationNotification) === null || _item$credExchangeRec === void 0 ? void 0 : _item$credExchangeRec.revocationDate) && errors.push(_credentials.CredentialErrors.Revoked);
        !hasSatisfiedPredicates(getCredentialsFields(), item.credId) && errors.push(_credentials.CredentialErrors.PredicateError);
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, loading || attestationLoading ? null : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            marginVertical: 10,
            marginHorizontal: 20
          }
        }, /*#__PURE__*/_react.default.createElement(CredentialCard, {
          credential: item.credExchangeRecord,
          credDefId: item.credDefId,
          schemaId: item.schemaId,
          displayItems: [...(item.attributes ?? []), ...(0, _helpers.evaluatePredicates)(getCredentialsFields(), item.credId)(item)],
          credName: item.credName,
          hasAltCredentials: item.altCredentials && item.altCredentials.length > 1,
          handleAltCredChange: item.altCredentials && item.altCredentials.length > 1 ? () => {
            handleAltCredChange(item.credId, item.altCredentials ?? [item.credId]);
          } : undefined,
          proof: true,
          credentialErrors: errors
        })));
      }
    });
  };
  const credentialListHeader = headerText => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.pageMargin
    }, !(loading || attestationLoading) && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "title",
      testID: (0, _testable.testIdWithKey)('ProofRequestHeaderText'),
      style: {
        marginTop: 10
      }
    }, headerText));
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.pageContainer,
    edges: ['bottom', 'left', 'right']
  }, showErrorModal && /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      minHeight: height,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPalette.brand.primaryBackground
    }
  }, /*#__PURE__*/_react.default.createElement(_InfoBox.default, {
    title: t('Error.Title1027'),
    description: t('ProofRequest.ProofRequestErrorMessage'),
    message: t('ProofRequest.ProofRequestStateError', {
      state: proof === null || proof === void 0 ? void 0 : proof.state
    }),
    notificationType: _InfoBox.InfoBoxType.Error,
    onCallToActionLabel: t('Global.TryAgain'),
    onCallToActionPressed: () => {
      setShowErrorModal(false);
      handleCancelTouched();
    },
    showVersionFooter: true
  })), showDetailsModal && /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      minHeight: height,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPalette.brand.primaryBackground
    }
  }, /*#__PURE__*/_react.default.createElement(_InfoBox.default, {
    title: t('Error.Title1027'),
    description: t('ProofRequest.ProofRequestErrorMessage'),
    message: shareDisabledMessage,
    notificationType: _InfoBox.InfoBoxType.Error,
    onCallToActionPressed: () => setShowDetailsModal(false),
    onCallToActionLabel: t('Global.GotIt'),
    showVersionFooter: true,
    renderShowDetails: true,
    onClosePressed: () => setShowDetailsModal(false)
  })), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.pageContent
  }, proofPageHeader(), /*#__PURE__*/_react.default.createElement(CredentialList, {
    header: missingCredentials.length > 0 && userCredentials.length > 0 ? credentialListHeader(t('ProofRequest.MissingCredentials')) : undefined,
    items: missingCredentials,
    missing: true,
    footer: missingCredentials.length > 0 && userCredentials.length > 0 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        width: 'auto',
        borderWidth: 1,
        borderColor: ColorPalette.grayscale.lightGrey,
        marginTop: 20
      }
    }) : undefined
  }), /*#__PURE__*/_react.default.createElement(CredentialList, {
    header: missingCredentials.length > 0 && userCredentials.length > 0 ? credentialListHeader(t('ProofRequest.FromYourWallet')) : undefined,
    items: userCredentials,
    missing: false
  }), proofPageFooter()), /*#__PURE__*/_react.default.createElement(_ProofRequestAccept.default, {
    visible: pendingModalVisible,
    proofId: proofId
  }), /*#__PURE__*/_react.default.createElement(_CommonRemoveModal.default, {
    usage: _remove.ModalUsage.ProofRequestDecline,
    visible: declineModalVisible,
    onSubmit: handleDeclineTouched,
    onCancel: toggleDeclineModalVisible
  }), /*#__PURE__*/_react.default.createElement(_ProofCancelModal.default, {
    visible: cancelModalVisible,
    onDone: onCancelDone
  })));
};
var _default = exports.default = ProofRequest;
//# sourceMappingURL=ProofRequest.js.map