import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, StyleSheet, View } from 'react-native';
import Button, { ButtonType } from '../components/buttons/Button';
import PINInput from '../components/inputs/PINInput';
import { InfoBoxType } from '../components/misc/InfoBox';
import PopupModal from '../components/modals/PopupModal';
import { ThemedText } from '../components/texts/ThemedText';
import ScreenWrapper from '../components/views/ScreenWrapper';
import { minPINLength } from '../constants';
import { TOKENS, useServices } from '../container-api';
import { useAnimatedComponents } from '../contexts/animated-components';
import { useAuth } from '../contexts/auth';
import { useTheme } from '../contexts/theme';
import usePreventScreenCapture from '../hooks/screen-capture';
import { testIdWithKey } from '../utils/testable';
import { InlineErrorType } from '../components/inputs/InlineErrorText';
export let PINEntryUsage = /*#__PURE__*/function (PINEntryUsage) {
  PINEntryUsage[PINEntryUsage["PINCheck"] = 0] = "PINCheck";
  PINEntryUsage[PINEntryUsage["ChangeBiometrics"] = 1] = "ChangeBiometrics";
  PINEntryUsage[PINEntryUsage["ChangePIN"] = 2] = "ChangePIN";
  return PINEntryUsage;
}({});
const PINVerify = ({
  setAuthenticated,
  usage = PINEntryUsage.PINCheck,
  onCancelAuth
}) => {
  const {
    t
  } = useTranslation();
  const {
    verifyPIN
  } = useAuth();
  const [PIN, setPIN] = useState('');
  const [continueDisabled, setContinueDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const {
    ColorPalette,
    Spacing
  } = useTheme();
  const {
    ButtonLoading,
    LoadingSpinner
  } = useAnimatedComponents();
  const [inlineMessageField, setInlineMessageField] = useState();
  const [{
    preventScreenCapture
  }, inlineMessages] = useServices([TOKENS.CONFIG, TOKENS.INLINE_ERRORS]);
  usePreventScreenCapture(preventScreenCapture);
  useEffect(() => {
    setInlineMessageField(undefined);
  }, [PIN]);
  const clearAlertModal = useCallback(() => {
    setAlertModalVisible(false);
    usage !== PINEntryUsage.ChangePIN && setAuthenticated(false);
  }, [setAlertModalVisible, setAuthenticated, usage]);
  const onPINInputCompleted = useCallback(async userPinInput => {
    setLoading(true);
    setContinueDisabled(true);
    const isPINVerified = await verifyPIN(userPinInput ? userPinInput : PIN);
    if (isPINVerified) {
      setAuthenticated(usage === PINEntryUsage.ChangePIN ? userPinInput : true);
    } else {
      if (inlineMessages.enabled) {
        setInlineMessageField({
          message: t('PINEnter.IncorrectPIN'),
          inlineType: InlineErrorType.error,
          config: inlineMessages
        });
      } else setAlertModalVisible(true);
    }
    setLoading(false);
    setContinueDisabled(false);
  }, [verifyPIN, setLoading, setAuthenticated, setContinueDisabled, PIN, inlineMessages, t, usage]);
  const inputLabelText = {
    [PINEntryUsage.ChangeBiometrics]: t('PINEnter.ChangeBiometricsInputLabel'),
    [PINEntryUsage.PINCheck]: t('PINEnter.AppSettingChangedEnterPIN'),
    [PINEntryUsage.ChangePIN]: t('PINChange.EnterOldPIN')
  };
  const inputTestId = {
    [PINEntryUsage.ChangeBiometrics]: 'BiometricChangedEnterPIN',
    [PINEntryUsage.PINCheck]: 'AppSettingChangedEnterPIN',
    [PINEntryUsage.ChangePIN]: 'EnterOldPIN'
  };
  const primaryButtonText = {
    [PINEntryUsage.ChangeBiometrics]: t('Global.Continue'),
    [PINEntryUsage.PINCheck]: t('PINEnter.AppSettingSave'),
    [PINEntryUsage.ChangePIN]: t('Global.Continue')
  };
  const primaryButtonTestId = {
    [PINEntryUsage.ChangeBiometrics]: 'Continue',
    [PINEntryUsage.PINCheck]: 'AppSettingSave',
    [PINEntryUsage.ChangePIN]: 'Continue'
  };
  const helpText = {
    [PINEntryUsage.ChangeBiometrics]: t('PINEnter.ChangeBiometricsSubtext'),
    [PINEntryUsage.PINCheck]: t('PINEnter.AppSettingChanged'),
    [PINEntryUsage.ChangePIN]: ''
  };
  const isContinueDisabled = continueDisabled || PIN.length < minPINLength;
  const style = StyleSheet.create({
    screenContainer: {
      flex: 1,
      padding: Spacing.md,
      backgroundColor: ColorPalette.brand.primaryBackground,
      justifyContent: 'space-between'
    },
    buttonContainer: {
      width: '100%'
    },
    helpText: {
      alignSelf: 'auto',
      textAlign: 'left',
      marginBottom: 40
    },
    inputLabelText: {
      alignSelf: 'auto',
      textAlign: 'left',
      marginBottom: 20
    },
    modalText: {
      marginVertical: 5
    },
    changeBiometricsHeader: {
      marginTop: 0,
      marginBottom: Spacing.xl
    },
    loadingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    }
  });
  return /*#__PURE__*/React.createElement(ScreenWrapper, {
    padded: false,
    keyboardActive: true
  }, /*#__PURE__*/React.createElement(View, {
    style: style.screenContainer
  }, /*#__PURE__*/React.createElement(View, null, usage === PINEntryUsage.ChangeBiometrics && /*#__PURE__*/React.createElement(ThemedText, {
    variant: "headingThree",
    style: style.changeBiometricsHeader
  }, t('PINEnter.ChangeBiometricsHeader')), usage !== PINEntryUsage.ChangePIN && /*#__PURE__*/React.createElement(ThemedText, {
    style: style.helpText
  }, helpText[usage]), /*#__PURE__*/React.createElement(ThemedText, {
    variant: "bold",
    style: style.inputLabelText
  }, inputLabelText[usage], usage === PINEntryUsage.ChangeBiometrics && /*#__PURE__*/React.createElement(ThemedText, {
    variant: "caption"
  }, ` `, t('PINEnter.ChangeBiometricsInputLabelParenthesis'))), /*#__PURE__*/React.createElement(PINInput, {
    onPINChanged: async userPinInput => {
      setPIN(userPinInput);
      if (userPinInput.length === minPINLength) {
        Keyboard.dismiss();
        usage === PINEntryUsage.ChangePIN && (await onPINInputCompleted(userPinInput));
      }
    },
    testID: testIdWithKey(inputTestId[usage]),
    accessibilityLabel: inputLabelText[usage],
    autoFocus: true,
    inlineMessage: inlineMessageField,
    onSubmitEditing: async userPinInput => {
      await onPINInputCompleted(userPinInput);
    }
  })), usage === PINEntryUsage.ChangePIN && loading && /*#__PURE__*/React.createElement(View, {
    style: style.loadingContainer
  }, /*#__PURE__*/React.createElement(LoadingSpinner, {
    size: 50,
    color: ColorPalette.brand.primary
  })), usage !== PINEntryUsage.ChangePIN && /*#__PURE__*/React.createElement(View, {
    style: style.buttonContainer
  }, /*#__PURE__*/React.createElement(Button, {
    title: primaryButtonText[usage],
    buttonType: ButtonType.Primary,
    testID: testIdWithKey(primaryButtonTestId[usage]),
    disabled: isContinueDisabled,
    accessibilityLabel: primaryButtonText[usage],
    onPress: async () => {
      await onPINInputCompleted();
    }
  }, loading && /*#__PURE__*/React.createElement(ButtonLoading, null))), usage === PINEntryUsage.PINCheck && /*#__PURE__*/React.createElement(View, {
    style: [style.buttonContainer, {
      marginTop: 10
    }]
  }, /*#__PURE__*/React.createElement(Button, {
    title: t('PINEnter.AppSettingCancel'),
    buttonType: ButtonType.Secondary,
    testID: testIdWithKey('AppSettingCancel'),
    accessibilityLabel: t('PINEnter.AppSettingCancel'),
    onPress: () => onCancelAuth === null || onCancelAuth === void 0 ? void 0 : onCancelAuth(false)
  }))), alertModalVisible && /*#__PURE__*/React.createElement(PopupModal, {
    notificationType: InfoBoxType.Info,
    title: t('PINEnter.IncorrectPIN'),
    onCallToActionLabel: t('Global.Okay'),
    onCallToActionPressed: clearAlertModal
  }));
};
export default PINVerify;
//# sourceMappingURL=PINVerify.js.map