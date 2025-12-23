import { ProofState } from '@credo-ts/core';
import { useConnectionById, useProofById } from '@credo-ts/react-hooks';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button, { ButtonType } from '../components/buttons/Button';
import ConnectionAlert from '../components/misc/ConnectionAlert';
import ConnectionImage from '../components/misc/ConnectionImage';
import { InfoBoxType } from '../components/misc/InfoBox';
import CommonRemoveModal from '../components/modals/CommonRemoveModal';
import ProofCancelModal from '../components/modals/ProofCancelModal';
import InfoTextBox from '../components/texts/InfoTextBox';
import { EventTypes } from '../constants';
import { TOKENS, useServices } from '../container-api';
import { useAnimatedComponents } from '../contexts/animated-components';
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
import { TourID } from '../types/tour';
import { useAppAgent } from '../utils/agent';
import { evaluatePredicates, getConnectionName } from '../utils/helpers';
import { testIdWithKey } from '../utils/testable';
import ProofRequestAccept from './ProofRequestAccept';
const ProofRequest = ({
  navigation,
  route
}) => {
  var _useOutOfBandByConnec, _useOutOfBandByReceiv;
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('ProofRequest route prams were not set properly');
  }
  const {
    proofId
  } = route === null || route === void 0 ? void 0 : route.params;
  const {
    agent
  } = useAppAgent();
  const {
    t
  } = useTranslation();
  const {
    assertConnectedNetwork
  } = useNetwork();
  const proof = useProofById(proofId);
  const connection = useConnectionById((proof === null || proof === void 0 ? void 0 : proof.connectionId) ?? '');
  const [pendingModalVisible, setPendingModalVisible] = useState(false);
  const [revocationOffense, setRevocationOffense] = useState(false);
  const [retrievedCredentials, setRetrievedCredentials] = useState();
  const [descriptorMetadata, setDescriptorMetadata] = useState();
  const [loading, setLoading] = useState(true);
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const {
    ColorPallet,
    ListItems,
    TextTheme
  } = useTheme();
  const {
    RecordLoading
  } = useAnimatedComponents();
  const goalCode = (_useOutOfBandByConnec = useOutOfBandByConnectionId((proof === null || proof === void 0 ? void 0 : proof.connectionId) ?? '')) === null || _useOutOfBandByConnec === void 0 ? void 0 : _useOutOfBandByConnec.outOfBandInvitation.goalCode;
  const outOfBandInvitation = (_useOutOfBandByReceiv = useOutOfBandByReceivedInvitationId((proof === null || proof === void 0 ? void 0 : proof.parentThreadId) ?? '')) === null || _useOutOfBandByReceiv === void 0 ? void 0 : _useOutOfBandByReceiv.outOfBandInvitation;
  const [containsPI, setContainsPI] = useState(false);
  const [activeCreds, setActiveCreds] = useState([]);
  const [selectedCredentials, setSelectedCredentials] = useState([]);
  const [attestationLoading, setAttestationLoading] = useState(false);
  const [store, dispatch] = useStore();
  const credProofPromise = useAllCredentialsForProof(proofId);
  const proofConnectionLabel = useMemo(() => getConnectionName(connection, store.preferences.alternateContactNames), [connection, store.preferences.alternateContactNames]);
  const {
    start
  } = useTour();
  const screenIsFocused = useIsFocused();
  const [CredentialCard, bundleResolver, attestationMonitor, {
    enableTours: enableToursConfig
  }] = useServices([TOKENS.COMP_CREDENTIAL_CARD, TOKENS.UTIL_OCA_RESOLVER, TOKENS.UTIL_ATTESTATION_MONITOR, TOKENS.CONFIG]);
  const hasMatchingCredDef = useMemo(() => activeCreds.some(cred => cred.credExchangeRecord !== undefined), [activeCreds]);
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
      color: ColorPallet.brand.link,
      textDecorationLine: 'underline'
    },
    cardLoading: {
      backgroundColor: ColorPallet.brand.secondaryBackground,
      flex: 1,
      flexGrow: 1,
      marginVertical: 35,
      borderRadius: 15,
      paddingHorizontal: 10
    }
  });
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
      start(TourID.ProofRequestTour);
      dispatch({
        type: DispatchAction.UPDATE_SEEN_PROOF_REQUEST_TOUR,
        payload: [true]
      });
    }
  }, [screenIsFocused]);
  useEffect(() => {
    if (!agent) {
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, new BifoldError(t('Error.Title1034'), t('Error.Message1034'), t('ProofRequest.ProofRequestNotFound'), 1034));
    }
  }, []);
  useEffect(() => {
    if (!proof) {
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, new BifoldError(t('Error.Title1034'), t('Error.Message1034'), t('ProofRequest.ProofRequestNotFound'), 1034));
    }
  }, []);
  const containsRevokedCreds = (credExRecords, fields) => {
    const revList = credExRecords.map(cred => {
      var _cred$revocationNotif;
      return {
        id: cred.credentials.map(item => item.credentialRecordId),
        revocationDate: (_cred$revocationNotif = cred.revocationNotification) === null || _cred$revocationNotif === void 0 ? void 0 : _cred$revocationNotif.revocationDate
      };
    });
    return revList.some(item => {
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
    credProofPromise === null || credProofPromise === void 0 || credProofPromise.then(value => {
      if (value) {
        const {
          groupedProof,
          retrievedCredentials,
          fullCredentials,
          descriptorMetadata
        } = value;
        setLoading(false);
        setDescriptorMetadata(descriptorMetadata);
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
        const records = fullCredentials.filter(record => record.credentials.some(cred => credList.includes(cred.credentialRecordId)));
        const foundRevocationOffense = containsRevokedCreds(records, unpackCredToField(activeCreds)) || containsRevokedCreds(records, unpackCredToField(activeCreds));
        setRevocationOffense(foundRevocationOffense);
      }
    }).catch(err => {
      const error = new BifoldError(t('Error.Title1026'), t('Error.Message1026'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1026);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    });
  }, [selectedCredentials, credProofPromise]);
  const toggleDeclineModalVisible = () => setDeclineModalVisible(!declineModalVisible);
  const toggleCancelModalVisible = () => setCancelModalVisible(!cancelModalVisible);
  const getCredentialsFields = () => ({
    ...(retrievedCredentials === null || retrievedCredentials === void 0 ? void 0 : retrievedCredentials.attributes),
    ...(retrievedCredentials === null || retrievedCredentials === void 0 ? void 0 : retrievedCredentials.predicates)
  });
  useEffect(() => {
    // get oca bundle to see if we're presenting personally identifiable elements
    activeCreds.some(async item => {
      if (!item || !(item.credDefId || item.schemaId)) {
        return false;
      }
      const labels = (item.attributes ?? []).map(field => field.label ?? field.name ?? '');
      const bundle = await bundleResolver.resolveAllBundles({
        identifiers: {
          credentialDefinitionId: item.credDefId,
          schemaId: item.schemaId
        }
      });
      const flaggedAttributes = bundle.bundle.bundle.flaggedAttributes.map(attr => attr.name);
      const foundPI = labels.some(label => flaggedAttributes.includes(label));
      setContainsPI(foundPI);
      return foundPI;
    });
  }, [activeCreds]);
  const hasAvailableCredentials = useMemo(() => {
    const fields = getCredentialsFields();
    return !!retrievedCredentials && Object.values(fields).every(c => c.length > 0);
  }, [retrievedCredentials]);
  const hasSatisfiedPredicates = (fields, credId) => activeCreds.flatMap(item => evaluatePredicates(fields, credId)(item)).every(p => p.satisfied);
  const handleAcceptPress = async () => {
    try {
      var _format$request, _format$request2;
      if (!(agent && proof && assertConnectedNetwork())) {
        return;
      }
      setPendingModalVisible(true);
      if (!retrievedCredentials) {
        throw new Error(t('ProofRequest.RequestedCredentialsCouldNotBeFound'));
      }
      const format = await agent.proofs.getFormatData(proof.id);
      if ((_format$request = format.request) !== null && _format$request !== void 0 && _format$request.presentationExchange) {
        if (!descriptorMetadata) throw new Error(t('ProofRequest.PresentationMetadataNotFound'));
        const selectedCredentials = Object.fromEntries(Object.entries(descriptorMetadata).map(([descriptorId, meta]) => {
          const activeCredentialIds = activeCreds.map(cred => cred.credId);
          const selectedRecord = meta.find(item => activeCredentialIds.includes(item.record.id));
          if (!selectedRecord) throw new Error(t('ProofRequest.CredentialMetadataNotFound'));
          return [descriptorId, [selectedRecord.record]];
        }));
        await agent.proofs.acceptRequest({
          proofRecordId: proof.id,
          proofFormats: {
            presentationExchange: {
              credentials: selectedCredentials
            }
          }
        });
        if (proof.connectionId && goalCode && goalCode.endsWith('verify.once')) {
          agent.connections.deleteById(proof.connectionId);
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
      await agent.proofs.acceptRequest({
        proofRecordId: proof.id,
        proofFormats: automaticRequestedCreds.proofFormats
      });
      if (proof.connectionId && goalCode && goalCode.endsWith('verify.once')) {
        agent.connections.deleteById(proof.connectionId);
      }
    } catch (err) {
      setPendingModalVisible(false);
      const error = new BifoldError(t('Error.Title1027'), t('Error.Message1027'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1027);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
  };
  const handleDeclineTouched = async () => {
    var _navigation$getParent;
    try {
      if (agent && proof) {
        await agent.proofs.sendProblemReport({
          proofRecordId: proof.id,
          description: t('ProofRequest.Declined')
        });
        await agent.proofs.declineRequest({
          proofRecordId: proof.id
        });
        if (proof.connectionId && goalCode && goalCode.endsWith('verify.once')) {
          agent.connections.deleteById(proof.connectionId);
        }
      }
    } catch (err) {
      const error = new BifoldError(t('Error.Title1028'), t('Error.Message1028'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1028);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
    toggleDeclineModalVisible();
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(TabStacks.HomeStack, {
      screen: Screens.Home
    });
  };
  const handleCancelTouched = async () => {
    try {
      toggleCancelModalVisible();
      if (agent && proof) {
        await agent.proofs.sendProblemReport({
          proofRecordId: proof.id,
          description: t('ProofRequest.Declined')
        });
        await agent.proofs.declineRequest({
          proofRecordId: proof.id
        });
        if (proof.connectionId && goalCode && goalCode.endsWith('verify.once')) {
          agent.connections.deleteById(proof.connectionId);
        }
      }
    } catch (err) {
      const error = new BifoldError(t('Error.Title1028'), t('Error.Message1028'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1028);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
  };
  const onCancelDone = () => {
    var _navigation$getParent2;
    (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(TabStacks.HomeStack, {
      screen: Screens.Home
    });
  };
  const isShareDisabled = () => {
    return !hasAvailableCredentials || !hasSatisfiedPredicates(getCredentialsFields()) || revocationOffense || (proof === null || proof === void 0 ? void 0 : proof.state) !== ProofState.RequestReceived;
  };
  const proofPageHeader = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.pageMargin
    }, attestationLoading && /*#__PURE__*/React.createElement(View, {
      style: {
        paddingTop: 20
      }
    }, /*#__PURE__*/React.createElement(InfoTextBox, null, t('ProofRequest.JustAMoment'))), loading || attestationLoading ? /*#__PURE__*/React.createElement(View, {
      style: styles.cardLoading
    }, /*#__PURE__*/React.createElement(RecordLoading, null)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ConnectionImage, {
      connectionId: proof === null || proof === void 0 ? void 0 : proof.connectionId
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.headerTextContainer
    }, hasAvailableCredentials && !hasSatisfiedPredicates(getCredentialsFields()) ? /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      style: {
        marginLeft: -2,
        marginRight: 10
      },
      name: "highlight-off",
      color: ListItems.proofIcon.color,
      size: ListItems.proofIcon.fontSize
    }), /*#__PURE__*/React.createElement(Text, {
      style: styles.headerText,
      testID: testIdWithKey('HeaderText')
    }, t('ProofRequest.YouDoNotHaveDataPredicate'), ' ', /*#__PURE__*/React.createElement(Text, {
      style: TextTheme.title
    }, proofConnectionLabel || (outOfBandInvitation === null || outOfBandInvitation === void 0 ? void 0 : outOfBandInvitation.label) || t('ContactDetails.AContact')))) : /*#__PURE__*/React.createElement(Text, {
      style: styles.headerText,
      testID: testIdWithKey('HeaderText')
    }, /*#__PURE__*/React.createElement(Text, {
      style: TextTheme.title
    }, proofConnectionLabel || (outOfBandInvitation === null || outOfBandInvitation === void 0 ? void 0 : outOfBandInvitation.label) || t('ContactDetails.AContact')), ' ', /*#__PURE__*/React.createElement(Text, null, t('ProofRequest.IsRequestingYouToShare')), /*#__PURE__*/React.createElement(Text, {
      style: TextTheme.title
    }, ` ${activeCreds === null || activeCreds === void 0 ? void 0 : activeCreds.length} `), /*#__PURE__*/React.createElement(Text, null, (activeCreds === null || activeCreds === void 0 ? void 0 : activeCreds.length) > 1 ? t('ProofRequest.Credentials') : t('ProofRequest.Credential'))), containsPI ? /*#__PURE__*/React.createElement(InfoTextBox, {
      type: InfoBoxType.Warn,
      style: {
        marginTop: 16
      },
      textStyle: {
        fontSize: TextTheme.title.fontSize
      }
    }, t('ProofRequest.SensitiveInformation')) : null, isShareDisabled() ? /*#__PURE__*/React.createElement(InfoTextBox, {
      type: InfoBoxType.Error,
      style: {
        marginTop: 16
      },
      textStyle: {
        fontWeight: 'normal'
      }
    }, t('ProofRequest.YouCantRespond')) : null), !hasAvailableCredentials && hasMatchingCredDef && /*#__PURE__*/React.createElement(Text, {
      style: {
        ...TextTheme.title
      }
    }, t('ProofRequest.FromYourWallet'))));
  };
  const handleAltCredChange = (selectedCred, altCredentials) => {
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
  };
  const proofPageFooter = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: [styles.pageFooter, styles.pageMargin]
    }, !(loading || attestationLoading) && proofConnectionLabel && goalCode === 'aries.vc.verify' ? /*#__PURE__*/React.createElement(ConnectionAlert, {
      connectionID: proofConnectionLabel
    }) : null, isShareDisabled() ? /*#__PURE__*/React.createElement(View, {
      style: styles.footerButton
    }, /*#__PURE__*/React.createElement(Button, {
      title: t('Global.Cancel'),
      accessibilityLabel: t('Global.Cancel'),
      testID: testIdWithKey('Cancel'),
      buttonType: ButtonType.Primary,
      onPress: handleCancelTouched
    })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
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
    }))));
  };
  const CredentialList = ({
    header,
    footer,
    items
  }) => {
    return /*#__PURE__*/React.createElement(FlatList, {
      data: items,
      scrollEnabled: false,
      ListHeaderComponent: header,
      ListFooterComponent: footer,
      renderItem: ({
        item
      }) => {
        return /*#__PURE__*/React.createElement(View, null, loading || attestationLoading ? null : /*#__PURE__*/React.createElement(View, {
          style: {
            marginTop: 10,
            marginHorizontal: 20
          }
        }, /*#__PURE__*/React.createElement(CredentialCard, {
          credential: item.credExchangeRecord,
          credDefId: item.credDefId,
          schemaId: item.schemaId,
          displayItems: [...(item.attributes ?? []), ...evaluatePredicates(getCredentialsFields(), item.credId)(item)],
          credName: item.credName,
          existsInWallet: item.credExchangeRecord !== undefined,
          satisfiedPredicates: hasSatisfiedPredicates(getCredentialsFields(), item.credId),
          hasAltCredentials: item.altCredentials && item.altCredentials.length > 1,
          handleAltCredChange: item.altCredentials && item.altCredentials.length > 1 ? () => {
            handleAltCredChange(item.credId, item.altCredentials ?? [item.credId]);
          } : undefined,
          proof: true
        })));
      }
    });
  };
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.pageContainer,
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/React.createElement(ScrollView, null, /*#__PURE__*/React.createElement(View, {
    style: styles.pageContent
  }, /*#__PURE__*/React.createElement(CredentialList, {
    header: proofPageHeader(),
    footer: hasAvailableCredentials ? proofPageFooter() : undefined,
    items: activeCreds.filter(cred => cred.credExchangeRecord !== undefined) ?? []
  }), !hasAvailableCredentials && /*#__PURE__*/React.createElement(CredentialList, {
    header: /*#__PURE__*/React.createElement(View, {
      style: styles.pageMargin
    }, !(loading || attestationLoading) && /*#__PURE__*/React.createElement(React.Fragment, null, hasMatchingCredDef && /*#__PURE__*/React.createElement(View, {
      style: {
        width: 'auto',
        borderWidth: 1,
        borderColor: ColorPallet.grayscale.lightGrey,
        marginTop: 20
      }
    }), /*#__PURE__*/React.createElement(Text, {
      style: {
        ...TextTheme.title,
        marginTop: 10
      }
    }, t('ProofRequest.MissingCredentials')))),
    footer: proofPageFooter(),
    items: activeCreds.filter(cred => cred.credExchangeRecord === undefined) ?? []
  })), /*#__PURE__*/React.createElement(ProofRequestAccept, {
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