import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../../contexts/theme';
import { testIdWithKey } from '../../../../../utils/testable';
const OpenIDProofRequestHeader = ({
  selectedCredentialsSubmission,
  verifierName = '',
  reason = ''
}) => {
  const {
    ListItems,
    TextTheme,
    Spacing
  } = useTheme();
  const {
    t
  } = useTranslation();
  const styles = StyleSheet.create({
    headerTextContainer: {
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.sm
    },
    headerText: {
      ...ListItems.recordAttributeText,
      flexShrink: 1,
      paddingBottom: Spacing.sm
    }
  });
  if (!selectedCredentialsSubmission) return;
  return /*#__PURE__*/React.createElement(View, {
    style: styles.headerTextContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.headerText,
    testID: testIdWithKey('HeaderText')
  }, /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.normal
  }, t('ProofRequest.ReceiveProofTitle')), /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.title
  }, " $", verifierName)), /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.normal
  }, reason));
};
export default OpenIDProofRequestHeader;
//# sourceMappingURL=OpenIDProofRequestHeader.js.map