import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/theme';
import { Screens, TabStacks } from '../../types/navigators';
import { testIdWithKey } from '../../utils/testable';
import Button, { ButtonType } from '../buttons/Button';
import DismissiblePopupModal from './DismissiblePopupModal';
import { ThemedText } from '../texts/ThemedText';
import SafeAreaModal from './SafeAreaModal';
const CameraDisclosureModal = ({
  requestCameraUse
}) => {
  const {
    t
  } = useTranslation();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const {
    ColorPalette
  } = useTheme();
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: ColorPalette.brand.modalPrimaryBackground,
      padding: 20
    },
    messageText: {
      marginTop: 30
    },
    controlsContainer: {
      backgroundColor: ColorPalette.brand.modalPrimaryBackground,
      marginTop: 'auto',
      margin: 20
    },
    buttonContainer: {
      paddingTop: 10
    }
  });
  const onContinueTouched = async () => {
    setRequestInProgress(true);
    const granted = await requestCameraUse();
    if (!granted) {
      setShowSettingsPopup(true);
    }
    setRequestInProgress(false);
  };
  const onOpenSettingsTouched = async () => {
    var _navigation$getParent;
    setModalVisible(false);
    await Linking.openSettings();
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(TabStacks.HomeStack, {
      screen: Screens.Home
    });
  };
  const onNotNowTouched = () => {
    var _navigation$getParent2;
    setModalVisible(false);
    (_navigation$getParent2 = navigation.getParent()) === null || _navigation$getParent2 === void 0 || _navigation$getParent2.navigate(TabStacks.HomeStack, {
      screen: Screens.Home
    });
  };
  const onOpenSettingsDismissed = () => {
    setShowSettingsPopup(false);
  };
  return /*#__PURE__*/React.createElement(SafeAreaModal, {
    visible: modalVisible,
    animationType: 'slide',
    supportedOrientations: ['portrait', 'landscape'],
    transparent: true
  }, showSettingsPopup && /*#__PURE__*/React.createElement(DismissiblePopupModal, {
    title: t('CameraDisclosure.AllowCameraUse'),
    description: t('CameraDisclosure.ToContinueUsing'),
    onCallToActionLabel: t('CameraDisclosure.OpenSettings'),
    onCallToActionPressed: onOpenSettingsTouched,
    onDismissPressed: onOpenSettingsDismissed
  }), /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      backgroundColor: ColorPalette.brand.modalPrimaryBackground,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "modalHeadingOne",
    testID: testIdWithKey('AllowCameraUse'),
    accessibilityRole: "header"
  }, t('CameraDisclosure.AllowCameraUse')), /*#__PURE__*/React.createElement(ThemedText, {
    variant: "modalNormal",
    style: styles.messageText
  }, t('CameraDisclosure.CameraDisclosure')), /*#__PURE__*/React.createElement(ThemedText, {
    variant: "modalNormal",
    style: [styles.messageText, {
      marginBottom: 20
    }]
  }, t('CameraDisclosure.ToContinueUsing'))), /*#__PURE__*/React.createElement(View, {
    style: styles.controlsContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('Global.Continue'),
    accessibilityLabel: t('Global.Continue'),
    testID: testIdWithKey('Continue'),
    onPress: onContinueTouched,
    buttonType: ButtonType.ModalPrimary,
    disabled: requestInProgress
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('Global.NotNow'),
    accessibilityLabel: t('Global.NotNow'),
    testID: testIdWithKey('NotNow'),
    onPress: onNotNowTouched,
    buttonType: ButtonType.ModalSecondary
  })))));
};
export default CameraDisclosureModal;
//# sourceMappingURL=CameraDisclosureModal.js.map