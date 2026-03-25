import { useAgent } from '@bifold/react-hooks';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter } from 'react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Button, { ButtonType } from '../../../components/buttons/Button';
import OpenIDUnsatisfiedProofRequest from '../components/OpenIDUnsatisfiedProofRequest';
import CommonRemoveModal from '../../../components/modals/CommonRemoveModal';
import { EventTypes } from '../../../constants';
import { TOKENS, useServices } from '../../../container-api';
import { useTheme } from '../../../contexts/theme';
import ScreenLayout from '../../../layout/ScreenLayout';
import ProofRequestAccept from '../../../screens/ProofRequestAccept';
import { BifoldError } from '../../../types/error';
import { Screens, TabStacks } from '../../../types/navigators';
import { ModalUsage } from '../../../types/remove';
import { buildFieldsFromW3cCredsCredential } from '../../../utils/oca';
import { testIdWithKey } from '../../../utils/testable';
import { useOpenIDCredentials } from '../context/OpenIDCredentialRecordProvider';
import { getCredentialForDisplay } from '../display';
import { formatDifPexCredentialsForRequest } from '../displayProof';
import { shareProof } from '../resolverProof';
import { isSdJwtProofRequest, isW3CProofRequest } from '../utils/utils';
const OpenIDProofPresentation = ({
  navigation,
  route: {
    params: {
      credential
    }
  }
}) => {
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const [credentialsRequested, setCredentialsRequested] = useState([]);
  const [satistfiedCredentialsSubmission, setSatistfiedCredentialsSubmission] = useState();
  const [selectedCredentialsSubmission, setSelectedCredentialsSubmission] = useState();
  const {
    getW3CCredentialById,
    getSdJwtCredentialById
  } = useOpenIDCredentials();
  const {
    ColorPalette,
    ListItems,
    TextTheme
  } = useTheme();
  const {
    t
  } = useTranslation();
  const {
    agent
  } = useAgent();
  const [CredentialCard] = useServices([TOKENS.COMPONENT_CREDENTIAL_CARD]);
  const toggleDeclineModalVisible = () => setDeclineModalVisible(!declineModalVisible);
  const styles = StyleSheet.create({
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
  const submission = useMemo(() => credential && credential.credentialsForRequest ? formatDifPexCredentialsForRequest(credential.credentialsForRequest) : undefined, [credential]);

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
          id,
          claimFormat
        } of credIDs) {
          let credential;
          if (isW3CProofRequest(claimFormat)) {
            credential = await getW3CCredentialById(id);
          } else if (isSdJwtProofRequest(claimFormat)) {
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
      if (!agent || !credential.credentialsForRequest || !selectedCredentialsSubmission) {
        return;
      }
      await shareProof({
        agent,
        authorizationRequest: credential.authorizationRequestPayload,
        credentialsForRequest: credential.credentialsForRequest,
        selectedCredentials: selectedCredentialsSubmission
      });
      setAcceptModalVisible(true);
    } catch (err) {
      setButtonsVisible(true);
      const error = new BifoldError(t('Error.Title1027'), t('Error.Message1027'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1027);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
  };
  const handleDeclineTouched = async () => {
    var _navigation$getParent;
    toggleDeclineModalVisible();
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(TabStacks.HomeStack, {
      screen: Screens.Home
    });
  };
  const handleDismiss = async () => {
    var _navigation$getParent2;
    (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(TabStacks.HomeStack, {
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
  const handleAltCredChange = useCallback((inputDescriptorID, selectedCredID, inputDescriptor) => {
    const submittionEntries = submission === null || submission === void 0 ? void 0 : submission.entries.find(entry => entry.inputDescriptorId === inputDescriptor);
    const credsForEntry = submittionEntries === null || submittionEntries === void 0 ? void 0 : submittionEntries.credentials;
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
  const renderHeader = () => {
    if (!selectedCredentialsSubmission) return;
    return /*#__PURE__*/React.createElement(View, {
      style: styles.headerTextContainer
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.headerText,
      testID: testIdWithKey('HeaderText')
    }, /*#__PURE__*/React.createElement(Text, {
      style: TextTheme.normal
    }, t('ProofRequest.ReceiveProofTitle')), '\n', /*#__PURE__*/React.createElement(Text, {
      style: TextTheme.title
    }, verifierName ? verifierName : '')));
  };
  const renderCard = (sub, selectedCredential, hasMultipleCreds) => {
    const credential = credentialsRequested.find(c => c.id === selectedCredential.id);
    if (!credential) {
      return null;
    }
    const credentialDisplay = getCredentialForDisplay(credential);
    const requestedAttributes = selectedCredential.requestedAttributes;
    const fields = buildFieldsFromW3cCredsCredential(credentialDisplay, requestedAttributes);
    return /*#__PURE__*/React.createElement(CredentialCard, {
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
      return /*#__PURE__*/React.createElement(OpenIDUnsatisfiedProofRequest, {
        credentialName: submission === null || submission === void 0 ? void 0 : submission.name,
        requestPurpose: submission === null || submission === void 0 ? void 0 : submission.purpose,
        verifierName: verifierName
      });
    }
    if (!selectedCredentialsSubmission || !submission) return;
    return /*#__PURE__*/React.createElement(View, {
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
      return /*#__PURE__*/React.createElement(View, {
        key: i
      }, /*#__PURE__*/React.createElement(View, {
        style: styles.cardContainer
      }, /*#__PURE__*/React.createElement(View, {
        style: styles.cardGroupContainer
      }, name && purpose && /*#__PURE__*/React.createElement(View, {
        style: styles.cardGroupHeader
      }, /*#__PURE__*/React.createElement(Text, {
        style: TextTheme.bold
      }, name), /*#__PURE__*/React.createElement(Text, {
        style: TextTheme.labelTitle
      }, purpose)), isSatisfied && requestedAttributes ? renderCard(correspondingSubmission, credentialSubmittion, correspondingSubmission.credentials.length > 1) : null)));
    }));
  };
  const footerButton = (title, buttonPress, buttonType, testID, accessibilityLabel) => {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.footerButton
    }, /*#__PURE__*/React.createElement(Button, {
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
      return /*#__PURE__*/React.createElement(View, {
        style: {
          paddingHorizontal: 25,
          paddingVertical: 16,
          paddingBottom: 26,
          backgroundColor: ColorPalette.brand.secondaryBackground
        }
      }, footerButton(t('Global.Dismiss'), handleDismiss, ButtonType.Primary, testIdWithKey('DismissCredentialOffer'), t('Global.Dismiss')));
    }
    return /*#__PURE__*/React.createElement(View, {
      style: {
        paddingHorizontal: 25,
        paddingVertical: 16,
        paddingBottom: 26,
        backgroundColor: ColorPalette.brand.secondaryBackground
      }
    }, selectedCredentialsSubmission && Object.keys(selectedCredentialsSubmission).length > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, footerButton(t('Global.Send'), handleAcceptTouched, ButtonType.Primary, testIdWithKey('AcceptCredentialOffer'), t('Global.Send')), footerButton(t('Global.Decline'), toggleDeclineModalVisible, ButtonType.Secondary, testIdWithKey('DeclineCredentialOffer'), t('Global.Decline'))) : /*#__PURE__*/React.createElement(React.Fragment, null, footerButton(t('Global.Dismiss'), handleDismiss, ButtonType.Primary, testIdWithKey('DismissCredentialOffer'), t('Global.Dismiss'))));
  };
  return /*#__PURE__*/React.createElement(ScreenLayout, {
    screen: Screens.OpenIDCredentialDetails
  }, /*#__PURE__*/React.createElement(ScrollView, null, /*#__PURE__*/React.createElement(View, {
    style: styles.pageContent
  }, renderHeader(), renderBody())), footer(), /*#__PURE__*/React.createElement(ProofRequestAccept, {
    visible: acceptModalVisible,
    proofId: '',
    confirmationOnly: true
  }), /*#__PURE__*/React.createElement(CommonRemoveModal, {
    usage: ModalUsage.ProofRequestDecline,
    visible: declineModalVisible,
    onSubmit: handleDeclineTouched,
    onCancel: toggleDeclineModalVisible
  }));
};
export default OpenIDProofPresentation;
//# sourceMappingURL=OpenIDProofPresentation.js.map