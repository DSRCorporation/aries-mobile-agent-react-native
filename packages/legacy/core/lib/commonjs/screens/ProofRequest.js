"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@credo-ts/core");
var _reactHooks = require("@credo-ts/react-hooks");
var _native = require("@react-navigation/native");
var _moment = _interopRequireDefault(require("moment"));
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _ConnectionAlert = _interopRequireDefault(require("../components/misc/ConnectionAlert"));
var _ConnectionImage = _interopRequireDefault(require("../components/misc/ConnectionImage"));
var _InfoBox = require("../components/misc/InfoBox");
var _CommonRemoveModal = _interopRequireDefault(require("../components/modals/CommonRemoveModal"));
var _ProofCancelModal = _interopRequireDefault(require("../components/modals/ProofCancelModal"));
var _InfoTextBox = _interopRequireDefault(require("../components/texts/InfoTextBox"));
var _constants = require("../constants");
var _containerApi = require("../container-api");
var _animatedComponents = require("../contexts/animated-components");
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
var _tour = require("../types/tour");
var _agent = require("../utils/agent");
var _helpers = require("../utils/helpers");
var _testable = require("../utils/testable");
var _ProofRequestAccept = _interopRequireDefault(require("./ProofRequestAccept"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
  } = (0, _agent.useAppAgent)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    assertConnectedNetwork
  } = (0, _network.useNetwork)();
  const proof = (0, _reactHooks.useProofById)(proofId);
  const connection = (0, _reactHooks.useConnectionById)((proof === null || proof === void 0 ? void 0 : proof.connectionId) ?? '');
  const [pendingModalVisible, setPendingModalVisible] = (0, _react.useState)(false);
  const [revocationOffense, setRevocationOffense] = (0, _react.useState)(false);
  const [retrievedCredentials, setRetrievedCredentials] = (0, _react.useState)();
  const [descriptorMetadata, setDescriptorMetadata] = (0, _react.useState)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [declineModalVisible, setDeclineModalVisible] = (0, _react.useState)(false);
  const [cancelModalVisible, setCancelModalVisible] = (0, _react.useState)(false);
  const {
    ColorPallet,
    ListItems,
    TextTheme
  } = (0, _theme.useTheme)();
  const {
    RecordLoading
  } = (0, _animatedComponents.useAnimatedComponents)();
  const goalCode = (_useOutOfBandByConnec = (0, _connections.useOutOfBandByConnectionId)((proof === null || proof === void 0 ? void 0 : proof.connectionId) ?? '')) === null || _useOutOfBandByConnec === void 0 ? void 0 : _useOutOfBandByConnec.outOfBandInvitation.goalCode;
  const outOfBandInvitation = (_useOutOfBandByReceiv = (0, _oob.useOutOfBandByReceivedInvitationId)((proof === null || proof === void 0 ? void 0 : proof.parentThreadId) ?? '')) === null || _useOutOfBandByReceiv === void 0 ? void 0 : _useOutOfBandByReceiv.outOfBandInvitation;
  const [containsPI, setContainsPI] = (0, _react.useState)(false);
  const [activeCreds, setActiveCreds] = (0, _react.useState)([]);
  const [selectedCredentials, setSelectedCredentials] = (0, _react.useState)([]);
  const [attestationLoading, setAttestationLoading] = (0, _react.useState)(false);
  const [store, dispatch] = (0, _store2.useStore)();
  const credProofPromise = (0, _proofs.useAllCredentialsForProof)(proofId);
  const proofConnectionLabel = (0, _react.useMemo)(() => (0, _helpers.getConnectionName)(connection, store.preferences.alternateContactNames), [connection, store.preferences.alternateContactNames]);
  const {
    start
  } = (0, _tourContext.useTour)();
  const screenIsFocused = (0, _native.useIsFocused)();
  const [CredentialCard, bundleResolver, attestationMonitor, {
    enableTours: enableToursConfig
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMP_CREDENTIAL_CARD, _containerApi.TOKENS.UTIL_OCA_RESOLVER, _containerApi.TOKENS.UTIL_ATTESTATION_MONITOR, _containerApi.TOKENS.CONFIG]);
  const hasMatchingCredDef = (0, _react.useMemo)(() => activeCreds.some(cred => cred.credExchangeRecord !== undefined), [activeCreds]);
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
      start(_tour.TourID.ProofRequestTour);
      dispatch({
        type: _store.DispatchAction.UPDATE_SEEN_PROOF_REQUEST_TOUR,
        payload: [true]
      });
    }
  }, [screenIsFocused]);
  (0, _react.useEffect)(() => {
    if (!agent) {
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, new _error.BifoldError(t('Error.Title1034'), t('Error.Message1034'), t('ProofRequest.ProofRequestNotFound'), 1034));
    }
  }, []);
  (0, _react.useEffect)(() => {
    if (!proof) {
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, new _error.BifoldError(t('Error.Title1034'), t('Error.Message1034'), t('ProofRequest.ProofRequestNotFound'), 1034));
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
      const error = new _error.BifoldError(t('Error.Title1026'), t('Error.Message1026'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1026);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    });
  }, [selectedCredentials, credProofPromise]);
  const toggleDeclineModalVisible = () => setDeclineModalVisible(!declineModalVisible);
  const toggleCancelModalVisible = () => setCancelModalVisible(!cancelModalVisible);
  const getCredentialsFields = () => ({
    ...(retrievedCredentials === null || retrievedCredentials === void 0 ? void 0 : retrievedCredentials.attributes),
    ...(retrievedCredentials === null || retrievedCredentials === void 0 ? void 0 : retrievedCredentials.predicates)
  });
  (0, _react.useEffect)(() => {
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
  const hasAvailableCredentials = (0, _react.useMemo)(() => {
    const fields = getCredentialsFields();
    return !!retrievedCredentials && Object.values(fields).every(c => c.length > 0);
  }, [retrievedCredentials]);
  const hasSatisfiedPredicates = (fields, credId) => activeCreds.flatMap(item => (0, _helpers.evaluatePredicates)(fields, credId)(item)).every(p => p.satisfied);
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
      const error = new _error.BifoldError(t('Error.Title1027'), t('Error.Message1027'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1027);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
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
      const error = new _error.BifoldError(t('Error.Title1028'), t('Error.Message1028'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1028);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
    toggleDeclineModalVisible();
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.TabStacks.HomeStack, {
      screen: _navigators.Screens.Home
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
      const error = new _error.BifoldError(t('Error.Title1028'), t('Error.Message1028'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1028);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
  };
  const onCancelDone = () => {
    var _navigation$getParent2;
    (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(_navigators.TabStacks.HomeStack, {
      screen: _navigators.Screens.Home
    });
  };
  const isShareDisabled = () => {
    return !hasAvailableCredentials || !hasSatisfiedPredicates(getCredentialsFields()) || revocationOffense || (proof === null || proof === void 0 ? void 0 : proof.state) !== _core.ProofState.RequestReceived;
  };
  const proofPageHeader = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.pageMargin
    }, attestationLoading && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        paddingTop: 20
      }
    }, /*#__PURE__*/_react.default.createElement(_InfoTextBox.default, null, t('ProofRequest.JustAMoment'))), loading || attestationLoading ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.cardLoading
    }, /*#__PURE__*/_react.default.createElement(RecordLoading, null)) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ConnectionImage.default, {
      connectionId: proof === null || proof === void 0 ? void 0 : proof.connectionId
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.headerTextContainer
    }, hasAvailableCredentials && !hasSatisfiedPredicates(getCredentialsFields()) ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center'
      }
    }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
      style: {
        marginLeft: -2,
        marginRight: 10
      },
      name: "highlight-off",
      color: ListItems.proofIcon.color,
      size: ListItems.proofIcon.fontSize
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.headerText,
      testID: (0, _testable.testIdWithKey)('HeaderText')
    }, t('ProofRequest.YouDoNotHaveDataPredicate'), ' ', /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: TextTheme.title
    }, proofConnectionLabel || (outOfBandInvitation === null || outOfBandInvitation === void 0 ? void 0 : outOfBandInvitation.label) || t('ContactDetails.AContact')))) : /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.headerText,
      testID: (0, _testable.testIdWithKey)('HeaderText')
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: TextTheme.title
    }, proofConnectionLabel || (outOfBandInvitation === null || outOfBandInvitation === void 0 ? void 0 : outOfBandInvitation.label) || t('ContactDetails.AContact')), ' ', /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, t('ProofRequest.IsRequestingYouToShare')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: TextTheme.title
    }, ` ${activeCreds === null || activeCreds === void 0 ? void 0 : activeCreds.length} `), /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, (activeCreds === null || activeCreds === void 0 ? void 0 : activeCreds.length) > 1 ? t('ProofRequest.Credentials') : t('ProofRequest.Credential'))), containsPI ? /*#__PURE__*/_react.default.createElement(_InfoTextBox.default, {
      type: _InfoBox.InfoBoxType.Warn,
      style: {
        marginTop: 16
      },
      textStyle: {
        fontSize: TextTheme.title.fontSize
      }
    }, t('ProofRequest.SensitiveInformation')) : null, isShareDisabled() ? /*#__PURE__*/_react.default.createElement(_InfoTextBox.default, {
      type: _InfoBox.InfoBoxType.Error,
      style: {
        marginTop: 16
      },
      textStyle: {
        fontWeight: 'normal'
      }
    }, t('ProofRequest.YouCantRespond')) : null), !hasAvailableCredentials && hasMatchingCredDef && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
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
    (_navigation$getParent3 = navigation.getParent()) === null || _navigation$getParent3 === void 0 || _navigation$getParent3.navigate(_navigators.Stacks.ProofRequestsStack, {
      screen: _navigators.Screens.ProofChangeCredential,
      params: {
        selectedCred,
        altCredentials,
        proofId,
        onCredChange
      }
    });
  };
  const proofPageFooter = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.pageFooter, styles.pageMargin]
    }, !(loading || attestationLoading) && proofConnectionLabel && goalCode === 'aries.vc.verify' ? /*#__PURE__*/_react.default.createElement(_ConnectionAlert.default, {
      connectionID: proofConnectionLabel
    }) : null, isShareDisabled() ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.footerButton
    }, /*#__PURE__*/_react.default.createElement(_Button.default, {
      title: t('Global.Cancel'),
      accessibilityLabel: t('Global.Cancel'),
      testID: (0, _testable.testIdWithKey)('Cancel'),
      buttonType: _Button.ButtonType.Primary,
      onPress: handleCancelTouched
    })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
    }))));
  };
  const CredentialList = ({
    header,
    footer,
    items
  }) => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      data: items,
      scrollEnabled: false,
      ListHeaderComponent: header,
      ListFooterComponent: footer,
      renderItem: ({
        item
      }) => {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, loading || attestationLoading ? null : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            marginTop: 10,
            marginHorizontal: 20
          }
        }, /*#__PURE__*/_react.default.createElement(CredentialCard, {
          credential: item.credExchangeRecord,
          credDefId: item.credDefId,
          schemaId: item.schemaId,
          displayItems: [...(item.attributes ?? []), ...(0, _helpers.evaluatePredicates)(getCredentialsFields(), item.credId)(item)],
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
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.pageContainer,
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.pageContent
  }, /*#__PURE__*/_react.default.createElement(CredentialList, {
    header: proofPageHeader(),
    footer: hasAvailableCredentials ? proofPageFooter() : undefined,
    items: activeCreds.filter(cred => cred.credExchangeRecord !== undefined) ?? []
  }), !hasAvailableCredentials && /*#__PURE__*/_react.default.createElement(CredentialList, {
    header: /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.pageMargin
    }, !(loading || attestationLoading) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, hasMatchingCredDef && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        width: 'auto',
        borderWidth: 1,
        borderColor: ColorPallet.grayscale.lightGrey,
        marginTop: 20
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: {
        ...TextTheme.title,
        marginTop: 10
      }
    }, t('ProofRequest.MissingCredentials')))),
    footer: proofPageFooter(),
    items: activeCreds.filter(cred => cred.credExchangeRecord === undefined) ?? []
  })), /*#__PURE__*/_react.default.createElement(_ProofRequestAccept.default, {
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