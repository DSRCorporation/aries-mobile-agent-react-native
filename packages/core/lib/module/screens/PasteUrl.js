import { useAgent } from '@bifold/react-hooks';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button, { ButtonType } from '../components/buttons/Button';
import InfoBox, { InfoBoxType } from '../components/misc/InfoBox';
import SafeAreaModal from '../components/modals/SafeAreaModal';
import { TOKENS, useServices } from '../container-api';
import { useTheme } from '../contexts/theme';
import { connectFromScanOrDeepLink } from '../utils/helpers';
import { testIdWithKey } from '../utils/testable';
import { ThemedText } from '../components/texts/ThemedText';
const PasteUrl = ({
  navigation
}) => {
  const {
    ColorPalette,
    TextTheme
  } = useTheme();
  const [pastedContent, setPastedContent] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const {
    t
  } = useTranslation();
  const {
    agent
  } = useAgent();
  const [logger, {
    enableImplicitInvitations,
    enableReuseConnections
  }] = useServices([TOKENS.UTIL_LOGGER, TOKENS.CONFIG]);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ColorPalette.brand.primaryBackground
    },
    content: {
      margin: 20
    },
    description: {
      marginBottom: 20
    },
    textBox: {
      ...TextTheme.normal,
      textAlignVertical: 'top',
      borderColor: ColorPalette.grayscale.darkGrey,
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: ColorPalette.grayscale.lightGrey
    },
    buttonContainer: {
      margin: 20
    }
  });
  const processPastedContent = async () => {
    try {
      await connectFromScanOrDeepLink(pastedContent, agent, logger, navigation === null || navigation === void 0 ? void 0 : navigation.getParent(), false,
      // isDeepLink
      enableImplicitInvitations, enableReuseConnections);
    } catch {
      setErrorMessage({
        title: t('PasteUrl.ErrorInvalidUrl'),
        message: t('PasteUrl.ErrorInvalidUrlDescription')
      });
    }
  };
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(ScrollView, null, /*#__PURE__*/React.createElement(SafeAreaModal, {
    visible: !!errorMessage,
    testID: testIdWithKey('ErrorModal'),
    animationType: "fade",
    transparent: true
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1,
      paddingHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)'
    }
  }, /*#__PURE__*/React.createElement(InfoBox, {
    notificationType: InfoBoxType.Error,
    title: (errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.title) ?? '',
    description: (errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.message) ?? '',
    onCallToActionPressed: () => setErrorMessage(undefined),
    onCallToActionLabel: t('Global.TryAgain')
  }))), /*#__PURE__*/React.createElement(View, {
    style: styles.content
  }, /*#__PURE__*/React.createElement(ThemedText, {
    style: styles.description
  }, t('PasteUrl.PasteUrlDescription')), /*#__PURE__*/React.createElement(TextInput, {
    testID: testIdWithKey('PastedUrl'),
    style: styles.textBox,
    numberOfLines: 15,
    multiline: true,
    value: pastedContent,
    onChangeText: text => setPastedContent(text)
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    testID: testIdWithKey('ScanPastedUrlDisabled'),
    disabled: pastedContent.length > 0,
    onPress: () => {
      setErrorMessage({
        title: t('PasteUrl.ErrorTextboxEmpty'),
        message: t('PasteUrl.ErrorTextboxEmptyDescription')
      });
    }
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('Global.Continue'),
    accessibilityLabel: t('Global.Continue'),
    testID: testIdWithKey('ScanPastedUrl'),
    buttonType: ButtonType.Primary,
    onPress: processPastedContent,
    disabled: pastedContent.length === 0
  })), /*#__PURE__*/React.createElement(View, {
    style: {
      marginTop: 15
    }
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('PasteUrl.Clear'),
    accessibilityLabel: t('PasteUrl.Clear'),
    testID: testIdWithKey('ClearPastedUrl'),
    buttonType: ButtonType.Secondary,
    onPress: () => {
      setPastedContent('');
    }
  })))));
};
export default PasteUrl;
//# sourceMappingURL=PasteUrl.js.map