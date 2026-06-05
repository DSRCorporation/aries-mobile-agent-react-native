import { useAgent } from '@bifold/react-hooks';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter, View, StyleSheet, Text } from 'react-native';
import CommonRemoveModal from '../../../components/modals/CommonRemoveModal';
import { EventTypes } from '../../../constants';
import ScreenLayout from '../../../layout/ScreenLayout';
import ProofRequestAccept from '../../../screens/ProofRequestAccept';
import { BifoldError } from '../../../types/error';
import { Screens, TabStacks } from '../../../types/navigators';
import { ModalUsage } from '../../../types/remove';
import { useOpenIDCredentials } from '../context/OpenIDCredentialRecordProvider';
import OpenIdProofRequestDisplay from '../features/OpenIDProofPresentation/OpenIDProofRequestDisplay';
import { useTheme } from '../../../contexts/theme';
import { formatOpenIdProofRequest } from '../displayProof';
import { shareProof } from '../resolverProof';
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
  } = useTheme();
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const [credentialsRequested, setCredentialsRequested] = useState([]);
  const [satistfiedCredentialsSubmission, setSatistfiedCredentialsSubmission] = useState();
  const [selectedCredentialsSubmission, setSelectedCredentialsSubmission] = useState();
  const {
    getCredentialById
  } = useOpenIDCredentials();
  const {
    t
  } = useTranslation();
  const {
    agent
  } = useAgent();
  const toggleDeclineModalVisible = () => setDeclineModalVisible(!declineModalVisible);
  const submission = useMemo(() => credential ? formatOpenIdProofRequest(credential) : undefined, [credential]);

  //This should run only once when the screen is mounted
  useEffect(() => {
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
  useEffect(() => {
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
  useEffect(() => {
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
  } = useMemo(() => {
    return {
      verifierName: credential === null || credential === void 0 ? void 0 : credential.verifierHostName
    };
  }, [credential]);
  const handleAcceptTouched = async () => {
    try {
      if (!agent || !selectedCredentialsSubmission) {
        return;
      }
      await shareProof({
        agent,
        requestRecord: credential,
        selectedProofCredentials: selectedCredentialsSubmission
      });
      setAcceptModalVisible(true);
    } catch (err) {
      setButtonsVisible(true);
      const error = new BifoldError(t('Error.Title1027'), t('Error.Message1027'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1027);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
  };
  const handleDeclineTouched = async () => {
    toggleDeclineModalVisible();
  };
  const handleDismiss = async () => {
    var _navigation$getParent;
    toggleDeclineModalVisible();
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(TabStacks.HomeStack, {
      screen: Screens.Home
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
  const handleAltCredChange = useCallback((inputDescriptorID, selectedCredID) => {
    const submissionEntries = submission === null || submission === void 0 ? void 0 : submission.entries.find(entry => {
      return entry.inputDescriptorId === inputDescriptorID;
    });
    const credsForEntry = submissionEntries === null || submissionEntries === void 0 ? void 0 : submissionEntries.credentials;
    if (!credsForEntry) return;
    navigation.navigate(Screens.OpenIDProofCredentialSelect, {
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
  const styles = StyleSheet.create({
    headerContainer: {
      paddingVertical: 20,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  return /*#__PURE__*/React.createElement(ScreenLayout, {
    screen: Screens.OpenIDProofPresentation
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.headerContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.headerTitle
  }, t('ProofRequest.OID4VCTitle'))), /*#__PURE__*/React.createElement(OpenIdProofRequestDisplay, {
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
  }), /*#__PURE__*/React.createElement(ProofRequestAccept, {
    visible: acceptModalVisible,
    proofId: '',
    confirmationOnly: true
  }), /*#__PURE__*/React.createElement(CommonRemoveModal, {
    usage: ModalUsage.ProofRequestDecline,
    visible: declineModalVisible,
    onSubmit: handleDismiss,
    onCancel: toggleDeclineModalVisible
  }));
};
export default OpenIDProofPresentation;
//# sourceMappingURL=OpenIDProofPresentation.js.map