import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import OpenIDProofPresentationFooter from './components/OpenIDProofRequestFooter';
import OpenIDProofRequestHeader from './components/OpenIDProofRequestHeader';
import OpenIDProofRequestBody from './components/OpenIDProofRequestBody';
const OpenIdProofRequestDisplay = ({
  buttonsVisible,
  credential,
  credentialsRequested,
  onPressAltCredChange,
  onPressAccept,
  onPressDecline,
  onPressDismiss,
  selectedCredentialsSubmission,
  submission,
  verifierName
}) => {
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'space-between'
    }
  });
  if (!credential) {
    return null;
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ScrollView, null, /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(OpenIDProofRequestHeader, {
    selectedCredentialsSubmission: selectedCredentialsSubmission,
    verifierName: verifierName,
    reason: (submission === null || submission === void 0 ? void 0 : submission.purpose) ?? ''
  }), /*#__PURE__*/React.createElement(OpenIDProofRequestBody, {
    credentialsRequested: credentialsRequested,
    onPressAltCredChange: onPressAltCredChange,
    selectedCredentialsSubmission: selectedCredentialsSubmission,
    submission: submission,
    verifierName: verifierName
  }))), /*#__PURE__*/React.createElement(OpenIDProofPresentationFooter, {
    buttonsVisible: buttonsVisible,
    credential: credential,
    onPressAccept: onPressAccept,
    onPressDecline: onPressDecline,
    onPressDismiss: onPressDismiss,
    selectedCredentialsSubmission: selectedCredentialsSubmission,
    submission: submission
  }));
};
export default OpenIdProofRequestDisplay;
//# sourceMappingURL=OpenIDProofRequestDisplay.js.map