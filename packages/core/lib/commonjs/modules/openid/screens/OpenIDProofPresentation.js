"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _CommonRemoveModal = _interopRequireDefault(require("../../../components/modals/CommonRemoveModal"));
var _constants = require("../../../constants");
var _ScreenLayout = _interopRequireDefault(require("../../../layout/ScreenLayout"));
var _ProofRequestAccept = _interopRequireDefault(require("../../../screens/ProofRequestAccept"));
var _error = require("../../../types/error");
var _navigators = require("../../../types/navigators");
var _remove = require("../../../types/remove");
var _OpenIDCredentialRecordProvider = require("../context/OpenIDCredentialRecordProvider");
var _OpenIDProofRequestDisplay = _interopRequireDefault(require("../features/OpenIDProofPresentation/OpenIDProofRequestDisplay"));
var _theme = require("../../../contexts/theme");
var _displayProof = require("../displayProof");
var _resolverProof = require("../resolverProof");
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
  const {
    TextTheme
  } = (0, _theme.useTheme)();
  const [declineModalVisible, setDeclineModalVisible] = (0, _react.useState)(false);
  const [buttonsVisible, setButtonsVisible] = (0, _react.useState)(true);
  const [acceptModalVisible, setAcceptModalVisible] = (0, _react.useState)(false);
  const [credentialsRequested, setCredentialsRequested] = (0, _react.useState)([]);
  const [satistfiedCredentialsSubmission, setSatistfiedCredentialsSubmission] = (0, _react.useState)();
  const [selectedCredentialsSubmission, setSelectedCredentialsSubmission] = (0, _react.useState)();
  const {
    getCredentialById
  } = (0, _OpenIDCredentialRecordProvider.useOpenIDCredentials)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const toggleDeclineModalVisible = () => setDeclineModalVisible(!declineModalVisible);
  const submission = (0, _react.useMemo)(() => credential ? (0, _displayProof.formatOpenIdProofRequest)(credential) : undefined, [credential]);

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
          id
        } of credIDs) {
          const credential = await getCredentialById(id);
          if (credential && inputDescriptorID) {
            creds.push(credential);
          }
        }
      }
      setCredentialsRequested(creds);
    }
    fetchCreds();
  }, [satistfiedCredentialsSubmission, getCredentialById]);

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
      if (!agent || !selectedCredentialsSubmission) {
        return;
      }
      await (0, _resolverProof.shareProof)({
        agent,
        requestRecord: credential,
        selectedProofCredentials: selectedCredentialsSubmission
      });
      setAcceptModalVisible(true);
    } catch (err) {
      setButtonsVisible(true);
      const error = new _error.BifoldError(t('Error.Title1027'), t('Error.Message1027'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1027);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
  };
  const handleDeclineTouched = async () => {
    toggleDeclineModalVisible();
  };
  const handleDismiss = async () => {
    var _navigation$getParent;
    toggleDeclineModalVisible();
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.TabStacks.HomeStack, {
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
  const handleAltCredChange = (0, _react.useCallback)((inputDescriptorID, selectedCredID) => {
    const submissionEntries = submission === null || submission === void 0 ? void 0 : submission.entries.find(entry => {
      return entry.inputDescriptorId === inputDescriptorID;
    });
    const credsForEntry = submissionEntries === null || submissionEntries === void 0 ? void 0 : submissionEntries.credentials;
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
  const styles = _reactNative.StyleSheet.create({
    headerContainer: {
      paddingVertical: 20,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  return /*#__PURE__*/_react.default.createElement(_ScreenLayout.default, {
    screen: _navigators.Screens.OpenIDProofPresentation
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.headerTitle
  }, t('ProofRequest.OID4VCTitle'))), /*#__PURE__*/_react.default.createElement(_OpenIDProofRequestDisplay.default, {
    buttonsVisible: buttonsVisible,
    credential: credential,
    credentialsRequested: credentialsRequested,
    onPressAltCredChange: handleAltCredChange,
    onPressAccept: handleAcceptTouched,
    onPressDecline: handleDeclineTouched,
    onPressDismiss: handleDismiss,
    selectedCredentialsSubmission: selectedCredentialsSubmission,
    submission: submission,
    verifierName: verifierName
  }), /*#__PURE__*/_react.default.createElement(_ProofRequestAccept.default, {
    visible: acceptModalVisible,
    proofId: '',
    confirmationOnly: true
  }), /*#__PURE__*/_react.default.createElement(_CommonRemoveModal.default, {
    usage: _remove.ModalUsage.ProofRequestDecline,
    visible: declineModalVisible,
    onSubmit: handleDismiss,
    onCancel: toggleDeclineModalVisible
  }));
};
var _default = exports.default = OpenIDProofPresentation;
//# sourceMappingURL=OpenIDProofPresentation.js.map