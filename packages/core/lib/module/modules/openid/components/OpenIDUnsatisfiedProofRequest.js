import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import InfoBox, { InfoBoxType } from '../../../components/misc/InfoBox';
import { ThemedText } from '../../../components/texts/ThemedText';
const OpenIDUnsatisfiedProofRequest = ({
  verifierName,
  credentialName,
  requestPurpose
}) => {
  const {
    t
  } = useTranslation();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingTop: 30,
      paddingHorizontal: 16
    },
    textContainer: {
      flex: 1,
      paddingHorizontal: 8
    },
    verifierDetailsText: {
      marginTop: 30
    },
    verifierNameText: {
      marginTop: 8,
      marginBottom: 30
    },
    credentialDetailsText: {
      marginTop: 8
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(InfoBox, {
    title: t('UnsatisfiedProofRequest.InfoBox.Title'),
    message: t('UnsatisfiedProofRequest.InfoBox.Subtitle', {
      verifierName
    }),
    notificationType: InfoBoxType.Error,
    renderShowDetails: true
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.textContainer
  }, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "normal",
    style: styles.verifierDetailsText
  }, t("UnsatisfiedProofRequest.VerifierDetail")), /*#__PURE__*/React.createElement(ThemedText, {
    variant: "bold",
    style: styles.verifierNameText
  }, verifierName), /*#__PURE__*/React.createElement(ThemedText, {
    variant: "bold"
  }, credentialName), /*#__PURE__*/React.createElement(ThemedText, {
    variant: "normal",
    style: styles.credentialDetailsText
  }, t("UnsatisfiedProofRequest.RequestPurpose", {
    requestPurpose
  }))));
};
export default OpenIDUnsatisfiedProofRequest;
//# sourceMappingURL=OpenIDUnsatisfiedProofRequest.js.map