import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TOKENS, useServices } from '../../container-api';
import { useTheme } from '../../contexts/theme';
import InfoBox, { InfoBoxType } from './InfoBox';
import { ThemedText } from '../texts/ThemedText';
const PINHeader = ({
  updatePin
}) => {
  const {
    TextTheme
  } = useTheme();
  const {
    t
  } = useTranslation();
  const [{
    PINScreensConfig
  }] = useServices([TOKENS.CONFIG]);
  return PINScreensConfig.useNewPINDesign ? /*#__PURE__*/React.createElement(View, {
    style: style.infoBox
  }, /*#__PURE__*/React.createElement(InfoBox, {
    title: t('PINCreate.InfoBox.title'),
    message: t('PINCreate.InfoBox.message'),
    notificationType: InfoBoxType.Info,
    renderShowDetails: true
  })) : /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(ThemedText, {
    style: style.text
  }, /*#__PURE__*/React.createElement(ThemedText, {
    style: {
      fontWeight: TextTheme.bold.fontWeight
    }
  }, updatePin ? t('PINChange.RememberChangePIN') : t('PINCreate.RememberPIN')), ' ', t('PINCreate.PINDisclaimer')));
};
const style = StyleSheet.create({
  infoBox: {
    marginBottom: 24
  },
  text: {
    marginBottom: 16
  }
});
export default PINHeader;
//# sourceMappingURL=PINHeader.js.map