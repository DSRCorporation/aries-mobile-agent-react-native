import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../../contexts/theme';
import Button, { ButtonType } from '../../../../../components/buttons/Button';
import { testIdWithKey } from '../../../../../utils/testable';
const OpenIDProofPresentationFooter = ({
  buttonsVisible,
  credential,
  onPressAccept,
  onPressDecline,
  onPressDismiss,
  selectedCredentialsSubmission,
  submission
}) => {
  const {
    ColorPalette,
    Spacing
  } = useTheme();
  const {
    t
  } = useTranslation();
  const styles = StyleSheet.create({
    footerButton: {
      paddingVertical: 10
    },
    footerContainer: {
      paddingHorizontal: 25,
      paddingVertical: 16,
      paddingBottom: 26,
      backgroundColor: ColorPalette.brand.secondaryBackground
    }
  });
  if (!credential) {
    return null;
  }
  if (submission && !submission.areAllSatisfied) {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.footerContainer
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.footerButton
    }, /*#__PURE__*/React.createElement(Button, {
      title: t('Global.Dismiss'),
      accessibilityLabel: t('Global.Dismiss'),
      testID: testIdWithKey('DismissCredentialOffer'),
      buttonType: ButtonType.Primary,
      onPress: onPressDismiss,
      disabled: !buttonsVisible
    })));
  }
  return /*#__PURE__*/React.createElement(View, {
    style: styles.footerContainer
  }, selectedCredentialsSubmission && Object.keys(selectedCredentialsSubmission).length > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: {
      marginBottom: Spacing.sm
    }
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('Global.Send'),
    accessibilityLabel: t('Global.Send'),
    testID: testIdWithKey('AcceptCredentialOffer'),
    buttonType: ButtonType.Primary,
    onPress: onPressAccept,
    disabled: !buttonsVisible
  })), /*#__PURE__*/React.createElement(Button, {
    title: t('Global.Decline'),
    accessibilityLabel: t('Global.Decline'),
    testID: testIdWithKey('DeclineCredentialOffer'),
    buttonType: ButtonType.Secondary,
    onPress: onPressDecline,
    disabled: !buttonsVisible
  })) : /*#__PURE__*/React.createElement(Button, {
    title: t('Global.Dismiss'),
    accessibilityLabel: t('Global.Dismiss'),
    testID: testIdWithKey('DismissCredentialOffer'),
    buttonType: ButtonType.Primary,
    onPress: onPressDismiss,
    disabled: !buttonsVisible
  }));
};
export default OpenIDProofPresentationFooter;
//# sourceMappingURL=OpenIDProofRequestFooter.js.map