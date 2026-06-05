import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../../contexts/theme';
import { buildFieldsFromW3cCredsCredential } from '../../../../../utils/oca';
import { getCredentialForDisplay } from '../../../display';
import CredentialCardGen from '../../../../../components/misc/CredentialCardGen';
import Record from '../../../../../components/record/Record';
import OpenIDUnsatisfiedProofRequest from '../../../components/OpenIDUnsatisfiedProofRequest';
import { ThemedText } from '../../../../../components/texts/ThemedText';
const OpenIDProofRequestBody = ({
  credentialsRequested,
  onPressAltCredChange,
  selectedCredentialsSubmission,
  submission,
  verifierName
}) => {
  const {
    ColorPalette,
    Spacing,
    ListItems
  } = useTheme();
  const {
    t
  } = useTranslation();
  const styles = StyleSheet.create({
    cardContainer: {
      paddingHorizontal: 12,
      paddingBottom: 24
    },
    detailContainer: {
      paddingHorizontal: 8,
      paddingVertical: 16,
      backgroundColor: ColorPalette.brand.secondaryBackground,
      marginBottom: 20
    },
    cardGroupHeader: {
      padding: 8,
      marginVertical: 8
    },
    credentialsList: {
      marginTop: 20,
      justifyContent: 'space-between'
    }
  });
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
  }, Object.entries(selectedCredentialsSubmission).map(([inputDescriptorId, credentialSimplified]) => {
    var _submission$entries;
    //TODO: Support multiple credentials
    const correspondingSubmission = (_submission$entries = submission.entries) === null || _submission$entries === void 0 ? void 0 : _submission$entries.find(s => s.inputDescriptorId === inputDescriptorId);
    const isSatisfied = correspondingSubmission === null || correspondingSubmission === void 0 ? void 0 : correspondingSubmission.isSatisfied;
    const credentialSubmission = correspondingSubmission === null || correspondingSubmission === void 0 ? void 0 : correspondingSubmission.credentials.find(s => s.id === credentialSimplified.id);
    const requestedAttributes = credentialSubmission === null || credentialSubmission === void 0 ? void 0 : credentialSubmission.requestedAttributes;
    const hasMultipleCreds = correspondingSubmission !== null && correspondingSubmission !== void 0 && correspondingSubmission.credentials ? correspondingSubmission.credentials.length > 1 : false;
    const credential = credentialsRequested.find(c => c.id === (credentialSubmission === null || credentialSubmission === void 0 ? void 0 : credentialSubmission.id));
    if (!credential || !correspondingSubmission) {
      return null;
    }
    const credentialDisplay = getCredentialForDisplay(credential);
    const fields = buildFieldsFromW3cCredsCredential(credentialDisplay, requestedAttributes);
    return /*#__PURE__*/React.createElement(View, {
      key: credentialSimplified.id
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.cardContainer
    }, isSatisfied && requestedAttributes && /*#__PURE__*/React.createElement(CredentialCardGen, {
      credential: credential,
      hasAltCredentials: hasMultipleCreds
    }), hasMultipleCreds && /*#__PURE__*/React.createElement(View, {
      style: {
        flex: 1,
        flexDirection: 'row-reverse',
        paddingTop: Spacing.sm
      }
    }, /*#__PURE__*/React.createElement(Pressable, {
      onPress: () => onPressAltCredChange(correspondingSubmission.inputDescriptorId, credential.id)
    }, /*#__PURE__*/React.createElement(ThemedText, {
      style: ListItems.recordLink
    }, t('ProofRequest.UseDifferentCard'))))), /*#__PURE__*/React.createElement(View, {
      style: styles.detailContainer
    }, /*#__PURE__*/React.createElement(Record, {
      fields: fields,
      hideFieldValues: true,
      header: () => /*#__PURE__*/React.createElement(React.Fragment, null),
      scrollEnabled: false,
      isProofRequest: true
    })));
  }));
};
export default OpenIDProofRequestBody;
//# sourceMappingURL=OpenIDProofRequestBody.js.map