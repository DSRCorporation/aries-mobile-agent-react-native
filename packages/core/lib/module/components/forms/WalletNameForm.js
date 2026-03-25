import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { DispatchAction } from '../../contexts/reducers/store';
import { useStore } from '../../contexts/store';
import { useTheme } from '../../contexts/theme';
import { generateRandomWalletName } from '../../utils/helpers';
import { testIdWithKey } from '../../utils/testable';
import ButtonLoading from '../animated/ButtonLoading';
import Button, { ButtonType } from '../buttons/Button';
import LimitedTextInput from '../inputs/LimitedTextInput';
import { InfoBoxType } from '../misc/InfoBox';
import PopupModal from '../modals/PopupModal';
import { ThemedText } from '../texts/ThemedText';
import ScreenWrapper from '../views/ScreenWrapper';
const NameWalletForm = ({
  isRenaming,
  onSubmitSuccess,
  onCancel
}) => {
  const {
    t
  } = useTranslation();
  const {
    ColorPalette,
    Assets,
    Spacing
  } = useTheme();
  const [store, dispatch] = useStore();
  const [loading, setLoading] = useState(false);
  const [walletName, setWalletName] = useState(store.preferences.walletName ?? generateRandomWalletName());
  const [errorState, setErrorState] = useState({
    visible: false,
    title: '',
    description: ''
  });
  const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: ColorPalette.brand.primaryBackground,
      padding: Spacing.md,
      justifyContent: 'space-between'
    },
    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    },
    controlsContainer: {},
    buttonContainer: {
      width: '100%'
    }
  });
  const handleChangeText = text => {
    setWalletName(text);
  };
  const handleContinuePressed = () => {
    if (walletName.length < 1) {
      setErrorState({
        title: t('NameWallet.EmptyNameTitle'),
        description: t('NameWallet.EmptyNameDescription'),
        visible: true
      });
    } else if (walletName.length > 50) {
      setErrorState({
        title: t('NameWallet.CharCountTitle'),
        description: t('NameWallet.CharCountDescription'),
        visible: true
      });
    } else {
      setLoading(true);
      dispatch({
        type: DispatchAction.UPDATE_WALLET_NAME,
        payload: [walletName]
      });
      dispatch({
        type: DispatchAction.DID_NAME_WALLET
      });
      onSubmitSuccess === null || onSubmitSuccess === void 0 || onSubmitSuccess(walletName);
    }
  };
  const handleDismissError = () => {
    setErrorState(prev => ({
      ...prev,
      visible: false
    }));
  };
  return /*#__PURE__*/React.createElement(ScreenWrapper, {
    keyboardActive: true
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.screenContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.contentContainer
  }, /*#__PURE__*/React.createElement(Assets.svg.contactBook, {
    height: 100,
    style: {
      marginVertical: Spacing.md
    }
  }), /*#__PURE__*/React.createElement(ThemedText, {
    style: {
      width: '100%',
      marginBottom: Spacing.md
    }
  }, t('NameWallet.ThisIsTheName')), /*#__PURE__*/React.createElement(View, {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(LimitedTextInput, {
    defaultValue: walletName,
    label: t('NameWallet.NameYourWallet'),
    limit: 50,
    handleChangeText: handleChangeText,
    accessibilityLabel: t('NameWallet.NameYourWallet'),
    testID: testIdWithKey('NameInput')
  }))), /*#__PURE__*/React.createElement(View, {
    style: styles.controlsContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/React.createElement(Button, {
    title: isRenaming ? t('Global.Save') : t('Global.Continue'),
    buttonType: ButtonType.Primary,
    testID: isRenaming ? testIdWithKey('Save') : testIdWithKey('Continue'),
    accessibilityLabel: isRenaming ? t('Global.Save') : t('Global.Continue'),
    onPress: handleContinuePressed,
    disabled: loading
  }, loading && /*#__PURE__*/React.createElement(ButtonLoading, null)), isRenaming && /*#__PURE__*/React.createElement(View, {
    style: {
      marginTop: Spacing.sm
    }
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('Global.Cancel'),
    buttonType: ButtonType.Secondary,
    testID: testIdWithKey('Cancel'),
    accessibilityLabel: t('Global.Cancel'),
    onPress: onCancel
  }))))), errorState.visible && /*#__PURE__*/React.createElement(PopupModal, {
    notificationType: InfoBoxType.Info,
    onCallToActionLabel: t('Global.Okay'),
    onCallToActionPressed: handleDismissError,
    title: errorState.title,
    description: errorState.description
  }));
};
export default NameWalletForm;
//# sourceMappingURL=WalletNameForm.js.map