import { ClaimFormat } from '@credo-ts/core';
import { useConnectionById, useProofById } from '@bifold/react-hooks';
import { DidCommProofState } from '@credo-ts/didcomm';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter, FlatList, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button, { ButtonType } from '../components/buttons/Button';
import ConnectionImage from '../components/misc/ConnectionImage';
import InfoBox, { InfoBoxType } from '../components/misc/InfoBox';
import CommonRemoveModal from '../components/modals/CommonRemoveModal';
import ProofCancelModal from '../components/modals/ProofCancelModal';
import InfoTextBox from '../components/texts/InfoTextBox';
import { EventTypes } from '../constants';
import { TOKENS, useServices } from '../container-api';
import { useNetwork } from '../contexts/network';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { useTour } from '../contexts/tour/tour-context';
import { useOutOfBandByConnectionId } from '../hooks/connections';
import { useOutOfBandByReceivedInvitationId } from '../hooks/oob';
import { useAllCredentialsForProof } from '../hooks/proofs';
import { AttestationEventTypes } from '../types/attestation';
import { BifoldError } from '../types/error';
import { Screens, Stacks, TabStacks } from '../types/navigators';
import { ModalUsage } from '../types/remove';
import { useAppAgent } from '../utils/agent';
import { evaluatePredicates, getConnectionName, getCredentialDefinitionIdForRecord, getCredentialSchemaIdForRecord } from '../utils/helpers';
import { testIdWithKey } from '../utils/testable';
import LoadingPlaceholder, { LoadingPlaceholderWorkflowType } from '../components/views/LoadingPlaceholder';
import ProofRequestAccept from './ProofRequestAccept';
import { HistoryCardType } from '../modules/history/types';
import { BaseTourID } from '../types/tour';
import { ThemedText } from '../components/texts/ThemedText';
import { CredentialErrors } from '../types/credentials';
const ProofRequest = ({
  navigation,
  proofId
}) => {
  var _useOutOfBandByConnec, _useOutOfBandByReceiv;
  const {
    agent
  } = useAppAgent();
  const {
    t
  } = useTranslation();
  const {
    assertNetworkConnected
  } = useNetwork();
  const {
    height
  } = useWindowDimensions();
  const proof = useProofById(proofId);
  const connection = useConnectionById((proof === null || proof === void 0 ? void 0 : proof.connectionId) ?? '');
  const [pendingModalVisible, setPendingModalVisible] = useState(false);
  const [revocationOffense, setRevocationOffense] = useState(false);
  const [retrievedCredentials, setRetrievedCredentials] = useState();
  // all credentials in the users wallet
  const [userCredentials, setUserCredentials] = useState([]);
  const [missingCredentials, setMissingCredentials] = useState([]);
  const [descriptorMetadata, setDescriptorMetadata] = useState();
  const [loading, setLoading] = useState(true);
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const {
    ColorPalette,
    ListItems,
    TextTheme
  } = useTheme();
  const goalCode = (_useOutOfBandByConnec = useOutOfBandByConnectionId((proof === null || proof === void 0 ? void 0 : proof.connectionId) ?? '')) === null || _useOutOfBandByConnec === void 0 ? void 0 : _useOutOfBandByConnec.outOfBandInvitation.goalCode;
  const outOfBandInvitation = (_useOutOfBandByReceiv = useOutOfBandByReceivedInvitationId((proof === null || proof === void 0 ? void 0 : proof.parentThreadId) ?? '')) === null || _useOutOfBandByReceiv === void 0 ? void 0 : _useOutOfBandByReceiv.outOfBandInvitation;
  const [containsPI, setContainsPI] = useState(false);
  const [activeCreds, setActiveCreds] = useState([]);
  const [selectedCredentials, setSelectedCredentials] = useState([]);
  const [attestationLoading, setAttestationLoading] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [store, dispatch] = useStore();
  const credProofPromise = useAllCredentialsForProof(proofId);
  const [ConnectionAlert] = useServices([TOKENS.COMPONENT_CONNECTION_ALERT]);
  const proofConnectionLabel = useMemo(() => getConnectionName(connection, store.preferences.alternateContactNames), [connection, store.preferences.alternateContactNames]);
  const {
    start
  } = useTour();
  const screenIsFocused = useIsFocused();
  const [bundleResolver, attestationMonitor, {
    enableTours: enableToursConfig
  }, logger, historyManagerCurried, historyEnabled, historyEventsLogger, CredentialCard] = useServices([TOKENS.UTIL_OCA_RESOLVER, TOKENS.UTIL_ATTESTATION_MONITOR, TOKENS.CONFIG, TOKENS.UTIL_LOGGER, TOKENS.FN_LOAD_HISTORY, TOKENS.HISTORY_ENABLED, TOKENS.HISTORY_EVENTS_LOGGER, TOKENS.COMPONENT_CREDENTIAL_CARD]);
  const styles = StyleSheet.create({
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
  useEffect(() => {
    if (proof && (proof === null || proof === void 0 ? void 0 : proof.state) !== DidCommProofState.RequestReceived) {
      setShowErrorModal(true);
    }
  }, [t, proof]);
  useEffect(() => {
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
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    };
    const subscriptions = Array();
    subscriptions.push(DeviceEventEmitter.addListener(AttestationEventTypes.Started, handleStartedAttestation));
    subscriptions.push(DeviceEventEmitter.addListener(AttestationEventTypes.Completed, handleStartedCompleted));
    subscriptions.push(DeviceEventEmitter.addListener(AttestationEventTypes.FailedHandleProof, handleFailedAttestation));
    subscriptions.push(DeviceEventEmitter.addListener(AttestationEventTypes.FailedHandleOffer, handleFailedAttestation));
    subscriptions.push(DeviceEventEmitter.addListener(AttestationEventTypes.FailedRequestCredential, handleFailedAttestation));
    return () => {
      subscriptions.forEach(subscription => subscription.remove());
    };
  }, [attestationMonitor]);
  useEffect(() => {
    const shouldShowTour = enableToursConfig && store.tours.enableTours && !store.tours.seenProofRequestTour;
    if (shouldShowTour && screenIsFocused) {
      start(BaseTourID.ProofRequestTour);
      dispatch({
        type: DispatchAction.UPDATE_SEEN_PROOF_REQUEST_TOUR,
        payload: [true]
      });
    }
  }, [enableToursConfig, store.tours.enableTours, store.tours.seenProofRequestTour, screenIsFocused, start, dispatch]);
  useEffect(() => {
    if (!agent || !proof) {
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, new BifoldError(t('Error.Title1034'), t('Error.Message1034'), t('ProofRequest.ProofRequestNotFound'), 1034));
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
      const revDate = moment(item.revocationDate);
      return item.id.some(id => {
        return Object.keys(fields).some(key => {
          var _fields$key;
          const dateIntervals = (_fields$key = fields[key]) === null || _fields$key === void 0 ? void 0 : _fields$key.filter(attr => attr.credentialId === id).map(attr => {
            var _attr$nonRevoked, _attr$nonRevoked2;
            return {
              to: ((_attr$nonRevoked = attr.nonRevoked) === null || _attr$nonRevoked === void 0 ? void 0 : _attr$nonRevoked.to) !== undefined ? moment.unix(attr.nonRevoked.to) : undefined,
              from: ((_attr$nonRevoked2 = attr.nonRevoked) === null || _attr$nonRevoked2 === void 0 ? void 0 : _attr$nonRevoked2.from) !== undefined ? moment.unix(attr.nonRevoked.from) : undefined
            };
          });
          return dateIntervals === null || dateIntervals === void 0 ? void 0 : dateIntervals.some(inter => inter.to !== undefined && inter.to > revDate || inter.from !== undefined && inter.from > revDate);
        });
      });
    });
  };
  useEffect(() => {
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
        const error = new BifoldError(t('Error.Title1026'), t('Error.Message1026'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1026);
        DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
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
      const schemaIds = new Set(fullCredentials.map(fullCredential => getCredentialSchemaIdForRecord(fullCredential)).filter(id => id !== null));
      const credDefIds = new Set(fullCredentials.map(fullCredential => getCredentialDefinitionIdForRecord(fullCredential)).filter(id => id !== null));
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
  const toggleDeclineModalVisible = useCallback(() => setDeclineModalVisible(prev => !prev), []);
  const toggleCancelModalVisible = useCallback(() => setCancelModalVisible(prev => !prev), []);
  const getCredentialsFields = useCallback(() => ({
    ...(retrievedCredentials === null || retrievedCredentials === void 0 ? void 0 : retrievedCredentials.attributes),
    ...(retrievedCredentials === null || retrievedCredentials === void 0 ? void 0 : retrievedCredentials.predicates)
  }), [retrievedCredentials]);
  useEffect(() => {
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
  const hasAvailableCredentials = useMemo(() => {
    const fields = getCredentialsFields();
    return !!retrievedCredentials && Object.values(fields).every(c => c.length > 0);
  }, [retrievedCredentials, getCredentialsFields]);
  const hasSatisfiedPredicates = useCallback((fields, credId) => {
    return activeCreds.flatMap(item => evaluatePredicates(fields, credId)(item)).every(p => p.satisfied);
  }, [activeCreds]);
  const logHistoryRecord = useCallback(async type => {
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
  const handleAcceptPress = useCallback(async () => {
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
            claimFormat: ClaimFormat.JwtVc,
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
        logHistoryRecord(HistoryCardType.InformationSent);
      }
    } catch (err) {
      setPendingModalVisible(false);
      const error = new BifoldError(t('Error.Title1027'), t('Error.Message1027'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1027);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
  }, [agent, proof, assertNetworkConnected, retrievedCredentials, activeCreds, descriptorMetadata, goalCode, t, historyEventsLogger.logInformationSent, logHistoryRecord]);
  const handleDeclineTouched = useCallback(async () => {
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
      const error = new BifoldError(t('Error.Title1028'), t('Error.Message1028'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1028);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
    toggleDeclineModalVisible();
    if (historyEventsLogger.logInformationNotSent) {
      logHistoryRecord(HistoryCardType.InformationNotSent);
    }
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(TabStacks.HomeStack, {
      screen: Screens.Home
    });
  }, [agent, proof, goalCode, t, navigation, toggleDeclineModalVisible, historyEventsLogger.logInformationNotSent, logHistoryRecord]);
  const handleCancelTouched = useCallback(async () => {
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
      const error = new BifoldError(t('Error.Title1028'), t('Error.Message1028'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1028);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
  }, [toggleCancelModalVisible, agent, proof, t, goalCode]);
  const onCancelDone = useCallback(() => {
    var _navigation$getParent2;
    (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(TabStacks.HomeStack, {
      screen: Screens.Home
    });
  }, [navigation]);
  const callViewJSONDetails = useCallback(() => {
    navigation.navigate(Stacks.ContactStack, {
      screen: Screens.JSONDetails,
      params: {
        jsonBlob: '"proof":' + JSON.stringify(proof, null, 2) + '\n"retrievedCredentials":' + JSON.stringify(retrievedCredentials, null, 2)
      }
    });
  }, [navigation, proof, retrievedCredentials]);
  const shareDisabledErrors = useMemo(() => {
    return {
      hasCredentialError: !hasAvailableCredentials,
      hasSatisfiedPredicateError: !hasSatisfiedPredicates(getCredentialsFields()),
      hasRevokedOffense: revocationOffense,
      hasProofStateReceivedError: (proof === null || proof === void 0 ? void 0 : proof.state) !== DidCommProofState.RequestReceived
    };
  }, [hasAvailableCredentials, hasSatisfiedPredicates, getCredentialsFields, revocationOffense, proof]);
  const isShareDisabled = useMemo(() => {
    return Object.values(shareDisabledErrors).some(value => value);
  }, [shareDisabledErrors]);
  const proofPageHeader = () => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, attestationLoading && /*#__PURE__*/React.createElement(View, {
      style: {
        padding: 20
      }
    }, /*#__PURE__*/React.createElement(InfoTextBox, null, t('ProofRequest.JustAMoment'))), loading || attestationLoading ? /*#__PURE__*/React.createElement(LoadingPlaceholder, {
      workflowType: LoadingPlaceholderWorkflowType.ProofRequested,
      timeoutDurationInMs: 10000,
      loadingProgressPercent: 30,
      onCancelTouched: async () => {
        await handleDeclineTouched();
      },
      testID: testIdWithKey('ProofRequestLoading')
    }) : /*#__PURE__*/React.createElement(View, {
      style: styles.pageMargin
    }, /*#__PURE__*/React.createElement(ConnectionImage, {
      connectionId: proof === null || proof === void 0 ? void 0 : proof.connectionId
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.headerTextContainer
    }, /*#__PURE__*/React.createElement(ThemedText, {
      style: styles.headerText,
      testID: testIdWithKey('HeaderText')
    }, /*#__PURE__*/React.createElement(ThemedText, {
      variant: "title"
    }, proofConnectionLabel || (outOfBandInvitation === null || outOfBandInvitation === void 0 ? void 0 : outOfBandInvitation.label) || t('ContactDetails.AContact')), ' ', /*#__PURE__*/React.createElement(ThemedText, null, t('ProofRequest.IsRequestingYouToShare')), /*#__PURE__*/React.createElement(ThemedText, {
      variant: "title"
    }, ` ${activeCreds === null || activeCreds === void 0 ? void 0 : activeCreds.length} `), /*#__PURE__*/React.createElement(ThemedText, null, (activeCreds === null || activeCreds === void 0 ? void 0 : activeCreds.length) > 1 ? t('ProofRequest.Credentials') : t('ProofRequest.Credential'))), isShareDisabled && /*#__PURE__*/React.createElement(InfoTextBox, {
      type: InfoBoxType.Error,
      style: {
        marginTop: 16
      },
      textStyle: {
        fontWeight: 'normal'
      }
    }, /*#__PURE__*/React.createElement(View, {
      style: {
        flex: 1,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(ThemedText, {
      style: {
        alignSelf: 'center',
        flex: 1,
        flexWrap: 'wrap',
        color: ColorPalette.notification.errorText
      }
    }, t('ProofRequest.YouCantRespond'), ' ', /*#__PURE__*/React.createElement(ThemedText, {
      style: {
        fontWeight: TextTheme.normal.fontWeight,
        color: ColorPalette.brand.link
      },
      onPress: () => setShowDetailsModal(true)
    }, t('Global.ShowDetails'))))))));
  };
  const shareDisabledMessage = useMemo(() => {
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
  const handleAltCredChange = useCallback((selectedCred, altCredentials) => {
    var _navigation$getParent3;
    const onCredChange = cred => {
      const newSelectedCreds = (selectedCredentials.length > 0 ? selectedCredentials : activeCreds.map(item => item.credId)).filter(id => !altCredentials.includes(id));
      setSelectedCredentials([cred, ...newSelectedCreds]);
    };
    (_navigation$getParent3 = navigation.getParent()) === null || _navigation$getParent3 === void 0 || _navigation$getParent3.navigate(Stacks.ProofRequestsStack, {
      screen: Screens.ProofChangeCredential,
      params: {
        selectedCred,
        altCredentials,
        proofId,
        onCredChange
      }
    });
  }, [selectedCredentials, activeCreds, proofId, navigation]);
  const proofPageFooter = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: [styles.pageFooter, styles.pageMargin]
    }, containsPI && /*#__PURE__*/React.createElement(InfoTextBox, {
      type: InfoBoxType.Warn,
      style: {
        marginTop: 16
      },
      textStyle: {
        fontSize: TextTheme.title.fontSize
      }
    }, t('ProofRequest.SensitiveInformation')), !loading && Boolean(proofConnectionLabel) && goalCode === 'aries.vc.verify' && /*#__PURE__*/React.createElement(ConnectionAlert, {
      connectionLabel: proofConnectionLabel
    }), !loading && isShareDisabled ? /*#__PURE__*/React.createElement(View, {
      style: styles.footerButton
    }, /*#__PURE__*/React.createElement(Button, {
      title: t('Global.Cancel'),
      accessibilityLabel: t('Global.Cancel'),
      testID: testIdWithKey('Cancel'),
      buttonType: ButtonType.Primary,
      onPress: handleCancelTouched
    })) : /*#__PURE__*/React.createElement(React.Fragment, null, !loading && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
      style: styles.footerButton
    }, /*#__PURE__*/React.createElement(Button, {
      title: t('Global.Share'),
      accessibilityLabel: t('Global.Share'),
      testID: testIdWithKey('Share'),
      buttonType: ButtonType.Primary,
      onPress: handleAcceptPress
    })), /*#__PURE__*/React.createElement(View, {
      style: styles.footerButton
    }, /*#__PURE__*/React.createElement(Button, {
      title: t('Global.Decline'),
      accessibilityLabel: t('Global.Decline'),
      testID: testIdWithKey('Decline'),
      buttonType: !retrievedCredentials ? ButtonType.Primary : ButtonType.Secondary,
      onPress: toggleDeclineModalVisible
    })), store.preferences.developerModeEnabled && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
      style: styles.footerButton
    }, /*#__PURE__*/React.createElement(Button, {
      title: t('Global.ViewJSON'),
      accessibilityLabel: t('Global.ViewJSON'),
      testID: testIdWithKey('JSONDetails'),
      buttonType: ButtonType.Secondary,
      onPress: callViewJSONDetails
    }))))));
  };
  const CredentialList = ({
    header,
    footer,
    items,
    missing
  }) => {
    return /*#__PURE__*/React.createElement(FlatList, {
      data: items,
      scrollEnabled: false,
      ListHeaderComponent: header,
      ListFooterComponent: footer,
      renderItem: ({
        item
      }) => {
        var _item$credExchangeRec;
        const errors = [];
        missing && errors.push(CredentialErrors.NotInWallet);
        ((_item$credExchangeRec = item.credExchangeRecord) === null || _item$credExchangeRec === void 0 || (_item$credExchangeRec = _item$credExchangeRec.revocationNotification) === null || _item$credExchangeRec === void 0 ? void 0 : _item$credExchangeRec.revocationDate) && errors.push(CredentialErrors.Revoked);
        !hasSatisfiedPredicates(getCredentialsFields(), item.credId) && errors.push(CredentialErrors.PredicateError);
        return /*#__PURE__*/React.createElement(View, null, loading || attestationLoading ? null : /*#__PURE__*/React.createElement(View, {
          style: {
            marginVertical: 10,
            marginHorizontal: 20
          }
        }, /*#__PURE__*/React.createElement(CredentialCard, {
          credential: item.credExchangeRecord,
          credDefId: item.credDefId,
          schemaId: item.schemaId,
          displayItems: [...(item.attributes ?? []), ...evaluatePredicates(getCredentialsFields(), item.credId)(item)],
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
    return /*#__PURE__*/React.createElement(View, {
      style: styles.pageMargin
    }, !(loading || attestationLoading) && /*#__PURE__*/React.createElement(ThemedText, {
      variant: "title",
      testID: testIdWithKey('ProofRequestHeaderText'),
      style: {
        marginTop: 10
      }
    }, headerText));
  };
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.pageContainer,
    edges: ['bottom', 'left', 'right']
  }, showErrorModal && /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      minHeight: height,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPalette.brand.primaryBackground
    }
  }, /*#__PURE__*/React.createElement(InfoBox, {
    title: t('Error.Title1027'),
    description: t('ProofRequest.ProofRequestErrorMessage'),
    message: t('ProofRequest.ProofRequestStateError', {
      state: proof === null || proof === void 0 ? void 0 : proof.state
    }),
    notificationType: InfoBoxType.Error,
    onCallToActionLabel: t('Global.TryAgain'),
    onCallToActionPressed: () => {
      setShowErrorModal(false);
      handleCancelTouched();
    },
    showVersionFooter: true
  })), showDetailsModal && /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      minHeight: height,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPalette.brand.primaryBackground
    }
  }, /*#__PURE__*/React.createElement(InfoBox, {
    title: t('Error.Title1027'),
    description: t('ProofRequest.ProofRequestErrorMessage'),
    message: shareDisabledMessage,
    notificationType: InfoBoxType.Error,
    onCallToActionPressed: () => setShowDetailsModal(false),
    onCallToActionLabel: t('Global.GotIt'),
    showVersionFooter: true,
    renderShowDetails: true,
    onClosePressed: () => setShowDetailsModal(false)
  })), /*#__PURE__*/React.createElement(ScrollView, null, /*#__PURE__*/React.createElement(View, {
    style: styles.pageContent
  }, proofPageHeader(), /*#__PURE__*/React.createElement(CredentialList, {
    header: missingCredentials.length > 0 && userCredentials.length > 0 ? credentialListHeader(t('ProofRequest.MissingCredentials')) : undefined,
    items: missingCredentials,
    missing: true,
    footer: missingCredentials.length > 0 && userCredentials.length > 0 ? /*#__PURE__*/React.createElement(View, {
      style: {
        width: 'auto',
        borderWidth: 1,
        borderColor: ColorPalette.grayscale.lightGrey,
        marginTop: 20
      }
    }) : undefined
  }), /*#__PURE__*/React.createElement(CredentialList, {
    header: missingCredentials.length > 0 && userCredentials.length > 0 ? credentialListHeader(t('ProofRequest.FromYourWallet')) : undefined,
    items: userCredentials,
    missing: false
  }), proofPageFooter()), /*#__PURE__*/React.createElement(ProofRequestAccept, {
    visible: pendingModalVisible,
    proofId: proofId
  }), /*#__PURE__*/React.createElement(CommonRemoveModal, {
    usage: ModalUsage.ProofRequestDecline,
    visible: declineModalVisible,
    onSubmit: handleDeclineTouched,
    onCancel: toggleDeclineModalVisible
  }), /*#__PURE__*/React.createElement(ProofCancelModal, {
    visible: cancelModalVisible,
    onDone: onCancelDone
  })));
};
export default ProofRequest;
//# sourceMappingURL=ProofRequest.js.map