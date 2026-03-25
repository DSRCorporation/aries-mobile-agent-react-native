"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _Button = _interopRequireWildcard(require("../../../components/buttons/Button"));
var _OpenIDUnsatisfiedProofRequest = _interopRequireDefault(require("../components/OpenIDUnsatisfiedProofRequest"));
var _CommonRemoveModal = _interopRequireDefault(require("../../../components/modals/CommonRemoveModal"));
var _constants = require("../../../constants");
var _containerApi = require("../../../container-api");
var _theme = require("../../../contexts/theme");
var _ScreenLayout = _interopRequireDefault(require("../../../layout/ScreenLayout"));
var _ProofRequestAccept = _interopRequireDefault(require("../../../screens/ProofRequestAccept"));
var _error = require("../../../types/error");
var _navigators = require("../../../types/navigators");
var _remove = require("../../../types/remove");
var _oca = require("../../../utils/oca");
var _testable = require("../../../utils/testable");
var _OpenIDCredentialRecordProvider = require("../context/OpenIDCredentialRecordProvider");
var _display = require("../display");
var _displayProof = require("../displayProof");
var _resolverProof = require("../resolverProof");
var _utils = require("../utils/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const OpenIDProofPresentation = ({
  navigation,
  route: {
    params: {
      credential
    }
  }
}) => {
  const [declineModalVisible, setDeclineModalVisible] = (0, _react.useState)(false);
  const [buttonsVisible, setButtonsVisible] = (0, _react.useState)(true);
  const [acceptModalVisible, setAcceptModalVisible] = (0, _react.useState)(false);
  const [credentialsRequested, setCredentialsRequested] = (0, _react.useState)([]);
  const [satistfiedCredentialsSubmission, setSatistfiedCredentialsSubmission] = (0, _react.useState)();
  const [selectedCredentialsSubmission, setSelectedCredentialsSubmission] = (0, _react.useState)();
  const {
    getW3CCredentialById,
    getSdJwtCredentialById
  } = (0, _OpenIDCredentialRecordProvider.useOpenIDCredentials)();
  const {
    ColorPalette,
    ListItems,
    TextTheme
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const [CredentialCard] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMPONENT_CREDENTIAL_CARD]);
  const toggleDeclineModalVisible = () => setDeclineModalVisible(!declineModalVisible);
  const styles = _reactNative.StyleSheet.create({
    pageContent: {
      flexGrow: 1,
      justifyContent: 'space-between',
      padding: 10
    },
    credentialsList: {
      marginTop: 20,
      justifyContent: 'space-between'
    },
    headerTextContainer: {
      paddingVertical: 16
    },
    headerText: {
      ...ListItems.recordAttributeText,
      flexShrink: 1
    },
    footerButton: {
      paddingVertical: 10
    },
    cardContainer: {
      paddingHorizontal: 25,
      paddingVertical: 16,
      backgroundColor: ColorPalette.brand.secondaryBackground,
      marginBottom: 20
    },
    cardAttributes: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderColor: ColorPalette.grayscale.lightGrey,
      borderWidth: 1,
      borderRadius: 8,
      padding: 8
    },
    cardGroupContainer: {
      borderRadius: 8,
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    cardGroupHeader: {
      padding: 8,
      marginVertical: 8
    }
  });
  const submission = (0, _react.useMemo)(() => credential && credential.credentialsForRequest ? (0, _displayProof.formatDifPexCredentialsForRequest)(credential.credentialsForRequest) : undefined, [credential]);

  //This should run only once when the screen is mounted
  (0, _react.useEffect)(() => {
    if (!submission) return;
    const creds = submission.entries.reduce((acc, entry) => {
      acc[entry.inputDescriptorId] = entry.credentials.map(cred => ({
        id: cred.id,
        claimFormat: cred.claimFormat
      }));
      return acc;
    }, {});
    setSatistfiedCredentialsSubmission(creds);
  }, [submission]);

  //Fetch all credentials satisfying the proof
  (0, _react.useEffect)(() => {
    async function fetchCreds() {
      if (!satistfiedCredentialsSubmission || satistfiedCredentialsSubmission.entries) return;
      const creds = [];
      for (const [inputDescriptorID, credIDs] of Object.entries(satistfiedCredentialsSubmission)) {
        for (const {
          id,
          claimFormat
        } of credIDs) {
          let credential;
          if ((0, _utils.isW3CProofRequest)(claimFormat)) {
            credential = await getW3CCredentialById(id);
          } else if ((0, _utils.isSdJwtProofRequest)(claimFormat)) {
            credential = await getSdJwtCredentialById(id);
          }
          if (credential && inputDescriptorID) {
            creds.push(credential);
          }
        }
      }
      setCredentialsRequested(creds);
    }
    fetchCreds();
  }, [satistfiedCredentialsSubmission, getW3CCredentialById, getSdJwtCredentialById]);

  //Once satisfied credentials are set and all credentials fetched, we select the first one of each submission to display on screen
  (0, _react.useEffect)(() => {
    if (!satistfiedCredentialsSubmission || (credentialsRequested === null || credentialsRequested === void 0 ? void 0 : credentialsRequested.length) <= 0) return;
    const creds = Object.entries(satistfiedCredentialsSubmission).reduce((acc, [inputDescriptorId, credentials]) => {
      var _credentials$, _credentials$2;
      acc[inputDescriptorId] = {
        id: (_credentials$ = credentials[0]) === null || _credentials$ === void 0 ? void 0 : _credentials$.id,
        claimFormat: credentials === null || credentials === void 0 || (_credentials$2 = credentials[0]) === null || _credentials$2 === void 0 ? void 0 : _credentials$2.claimFormat
      };
      return acc;
    }, {});
    setSelectedCredentialsSubmission(creds);
  }, [satistfiedCredentialsSubmission, credentialsRequested]);
  const {
    verifierName
  } = (0, _react.useMemo)(() => {
    return {
      verifierName: credential === null || credential === void 0 ? void 0 : credential.verifierHostName
    };
  }, [credential]);
  const handleAcceptTouched = async () => {
    try {
      if (!agent || !credential.credentialsForRequest || !selectedCredentialsSubmission) {
        return;
      }
      await (0, _resolverProof.shareProof)({
        agent,
        authorizationRequest: credential.authorizationRequestPayload,
        credentialsForRequest: credential.credentialsForRequest,
        selectedCredentials: selectedCredentialsSubmission
      });
      setAcceptModalVisible(true);
    } catch (err) {
      setButtonsVisible(true);
      const error = new _error.BifoldError(t('Error.Title1027'), t('Error.Message1027'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1027);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
  };
  const handleDeclineTouched = async () => {
    var _navigation$getParent;
    toggleDeclineModalVisible();
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.TabStacks.HomeStack, {
      screen: _navigators.Screens.Home
    });
  };
  const handleDismiss = async () => {
    var _navigation$getParent2;
    (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(_navigators.TabStacks.HomeStack, {
      screen: _navigators.Screens.Home
    });
  };

  // Re-construct the selected credentials object based on user alt credential
  const onCredChange = ({
    inputDescriptorID,
    id,
    claimFormat
  }) => {
    setSelectedCredentialsSubmission(prev => ({
      ...prev,
      [inputDescriptorID]: {
        id,
        claimFormat
      }
    }));
  };
  const handleAltCredChange = (0, _react.useCallback)((inputDescriptorID, selectedCredID, inputDescriptor) => {
    const submittionEntries = submission === null || submission === void 0 ? void 0 : submission.entries.find(entry => entry.inputDescriptorId === inputDescriptor);
    const credsForEntry = submittionEntries === null || submittionEntries === void 0 ? void 0 : submittionEntries.credentials;
    if (!credsForEntry) return;
    navigation.navigate(_navigators.Screens.OpenIDProofCredentialSelect, {
      inputDescriptorID: inputDescriptorID,
      selectedCredID: selectedCredID,
      altCredIDs: credsForEntry.map(cred => {
        return {
          id: cred.id,
          claimFormat: cred.claimFormat
        };
      }),
      onCredChange: onCredChange
    });
  }, [submission, navigation]);
  const renderHeader = () => {
    if (!selectedCredentialsSubmission) return;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.headerTextContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.headerText,
      testID: (0, _testable.testIdWithKey)('HeaderText')
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: TextTheme.normal
    }, t('ProofRequest.ReceiveProofTitle')), '\n', /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: TextTheme.title
    }, verifierName ? verifierName : '')));
  };
  const renderCard = (sub, selectedCredential, hasMultipleCreds) => {
    const credential = credentialsRequested.find(c => c.id === selectedCredential.id);
    if (!credential) {
      return null;
    }
    const credentialDisplay = (0, _display.getCredentialForDisplay)(credential);
    const requestedAttributes = selectedCredential.requestedAttributes;
    const fields = (0, _oca.buildFieldsFromW3cCredsCredential)(credentialDisplay, requestedAttributes);
    return /*#__PURE__*/_react.default.createElement(CredentialCard, {
      credential: credential,
      displayItems: fields,
      hasAltCredentials: hasMultipleCreds,
      handleAltCredChange: () => {
        handleAltCredChange(sub.inputDescriptorId, selectedCredential.id, sub.inputDescriptorId);
      }
    });
  };
  const renderBody = () => {
    if (submission && !submission.areAllSatisfied) {
      return /*#__PURE__*/_react.default.createElement(_OpenIDUnsatisfiedProofRequest.default, {
        credentialName: submission === null || submission === void 0 ? void 0 : submission.name,
        requestPurpose: submission === null || submission === void 0 ? void 0 : submission.purpose,
        verifierName: verifierName
      });
    }
    if (!selectedCredentialsSubmission || !submission) return;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.credentialsList
    }, Object.entries(selectedCredentialsSubmission).map(([inputDescriptorId, credentialSimplified], i) => {
      var _submission$entries;
      //TODO: Support multiplae credentials

      const globalSubmissionName = submission.name;
      const globalSubmissionPurpose = submission.purpose;
      const correspondingSubmission = (_submission$entries = submission.entries) === null || _submission$entries === void 0 ? void 0 : _submission$entries.find(s => s.inputDescriptorId === inputDescriptorId);
      const submissionName = correspondingSubmission === null || correspondingSubmission === void 0 ? void 0 : correspondingSubmission.name;
      const submissionPurpose = correspondingSubmission === null || correspondingSubmission === void 0 ? void 0 : correspondingSubmission.purpose;
      const isSatisfied = correspondingSubmission === null || correspondingSubmission === void 0 ? void 0 : correspondingSubmission.isSatisfied;
      const credentialSubmittion = correspondingSubmission === null || correspondingSubmission === void 0 ? void 0 : correspondingSubmission.credentials.find(s => s.id === credentialSimplified.id);
      const requestedAttributes = credentialSubmittion === null || credentialSubmittion === void 0 ? void 0 : credentialSubmittion.requestedAttributes;
      const name = submissionName || globalSubmissionName || undefined;
      const purpose = submissionPurpose || globalSubmissionPurpose || undefined;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        key: i
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.cardContainer
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.cardGroupContainer
      }, name && purpose && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.cardGroupHeader
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: TextTheme.bold
      }, name), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: TextTheme.labelTitle
      }, purpose)), isSatisfied && requestedAttributes ? renderCard(correspondingSubmission, credentialSubmittion, correspondingSubmission.credentials.length > 1) : null)));
    }));
  };
  const footerButton = (title, buttonPress, buttonType, testID, accessibilityLabel) => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.footerButton
    }, /*#__PURE__*/_react.default.createElement(_Button.default, {
      title: title,
      accessibilityLabel: accessibilityLabel,
      testID: testID,
      buttonType: buttonType,
      onPress: buttonPress,
      disabled: !buttonsVisible
    }));
  };
  const footer = () => {
    if (submission && !submission.areAllSatisfied) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          paddingHorizontal: 25,
          paddingVertical: 16,
          paddingBottom: 26,
          backgroundColor: ColorPalette.brand.secondaryBackground
        }
      }, footerButton(t('Global.Dismiss'), handleDismiss, _Button.ButtonType.Primary, (0, _testable.testIdWithKey)('DismissCredentialOffer'), t('Global.Dismiss')));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        paddingHorizontal: 25,
        paddingVertical: 16,
        paddingBottom: 26,
        backgroundColor: ColorPalette.brand.secondaryBackground
      }
    }, selectedCredentialsSubmission && Object.keys(selectedCredentialsSubmission).length > 0 ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, footerButton(t('Global.Send'), handleAcceptTouched, _Button.ButtonType.Primary, (0, _testable.testIdWithKey)('AcceptCredentialOffer'), t('Global.Send')), footerButton(t('Global.Decline'), toggleDeclineModalVisible, _Button.ButtonType.Secondary, (0, _testable.testIdWithKey)('DeclineCredentialOffer'), t('Global.Decline'))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, footerButton(t('Global.Dismiss'), handleDismiss, _Button.ButtonType.Primary, (0, _testable.testIdWithKey)('DismissCredentialOffer'), t('Global.Dismiss'))));
  };
  return /*#__PURE__*/_react.default.createElement(_ScreenLayout.default, {
    screen: _navigators.Screens.OpenIDCredentialDetails
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.pageContent
  }, renderHeader(), renderBody())), footer(), /*#__PURE__*/_react.default.createElement(_ProofRequestAccept.default, {
    visible: acceptModalVisible,
    proofId: '',
    confirmationOnly: true
  }), /*#__PURE__*/_react.default.createElement(_CommonRemoveModal.default, {
    usage: _remove.ModalUsage.ProofRequestDecline,
    visible: declineModalVisible,
    onSubmit: handleDeclineTouched,
    onCancel: toggleDeclineModalVisible
  }));
};
var _default = exports.default = OpenIDProofPresentation;
//# sourceMappingURL=OpenIDProofPresentation.js.map