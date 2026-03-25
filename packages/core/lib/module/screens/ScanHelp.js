import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Link from '../components/texts/Link';
import { testIdWithKey } from '../utils/testable';
import { TOKENS, useServices } from '../container-api';
import { ThemedText } from '../components/texts/ThemedText';
const ScanHelp = () => {
  const {
    t
  } = useTranslation();
  const [{
    whereToUseWalletUrl
  }] = useServices([TOKENS.CONFIG]);
  const style = StyleSheet.create({
    safeArea: {
      flex: 1
    },
    scrollView: {
      flexGrow: 1,
      padding: 26
    },
    text: {
      marginTop: 15
    }
  });
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: style.safeArea,
    edges: ['top', 'left', 'right', 'bottom']
  }, /*#__PURE__*/React.createElement(ScrollView, {
    contentContainerStyle: style.scrollView
  }, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "headingThree"
  }, t('Scan.WhatToScan')), /*#__PURE__*/React.createElement(ThemedText, {
    style: [style.text, {
      marginTop: 20
    }]
  }, t('Scan.ScanOnySpecial')), /*#__PURE__*/React.createElement(ThemedText, {
    style: style.text
  }, t('Scan.ScanOnlySpecial2')), whereToUseWalletUrl && /*#__PURE__*/React.createElement(Link, {
    linkText: t('Scan.WhereToUseLink'),
    style: style.text,
    onPress: () => Linking.openURL(whereToUseWalletUrl),
    testID: testIdWithKey('WhereToUseLink')
  }), /*#__PURE__*/React.createElement(ThemedText, {
    style: style.text
  }, t('Scan.ScanOnlySpecial3'))));
};
export default ScanHelp;
//# sourceMappingURL=ScanHelp.js.map