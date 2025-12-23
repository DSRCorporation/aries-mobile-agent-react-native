import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ScrollView, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
import Button, { ButtonType } from '../buttons/Button';
const ProofCancelModal = ({
  visible,
  onDone
}) => {
  const {
    t
  } = useTranslation();
  const {
    ColorPallet,
    TextTheme,
    Assets
  } = useTheme();
  const styles = StyleSheet.create({
    safeAreaView: {
      backgroundColor: ColorPallet.brand.modalPrimaryBackground,
      flex: 1
    },
    container: {
      flexGrow: 1,
      padding: 20
    },
    controlsContainer: {
      marginHorizontal: 20,
      marginBottom: 10
    },
    content: {
      justifyContent: 'space-around'
    },
    heading: {
      ...TextTheme.modalTitle,
      marginTop: 60,
      marginBottom: 30,
      textAlign: 'center'
    },
    image: {
      alignSelf: 'center',
      marginBottom: 50
    },
    subtext: {
      ...TextTheme.modalNormal,
      textAlign: 'center'
    }
  });
  return /*#__PURE__*/React.createElement(Modal, {
    visible: visible,
    animationType: "slide"
  }, /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.safeAreaView
  }, /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.content
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.heading
  }, t('ProofRequest.NoInfoShared')), /*#__PURE__*/React.createElement(Assets.svg.noInfoShared, {
    style: styles.image,
    height: 200
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.subtext
  }, t('ProofRequest.YourInfo')))), /*#__PURE__*/React.createElement(View, {
    style: styles.controlsContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('Global.Done'),
    accessibilityLabel: t('Global.Done'),
    testID: testIdWithKey('Done'),
    onPress: onDone,
    buttonType: ButtonType.ModalPrimary
  })))));
};
export default ProofCancelModal;
//# sourceMappingURL=ProofCancelModal.js.map