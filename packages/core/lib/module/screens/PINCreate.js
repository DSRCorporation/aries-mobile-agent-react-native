import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, DeviceEventEmitter, Keyboard, findNodeHandle } from 'react-native';

// eslint-disable-next-line import/no-named-as-default
import { ButtonType } from '../components/buttons/Button-api';
import PINInput from '../components/inputs/PINInput';
import PINValidationHelper from '../components/misc/PINValidationHelper';
import AlertModal from '../components/modals/AlertModal';
import ScreenWrapper from '../components/views/ScreenWrapper';
import { EventTypes, minPINLength } from '../constants';
import usePreventScreenCapture from '../hooks/screen-capture';
import { usePINValidation } from '../hooks/usePINValidation';
import { useAuth } from '../contexts/auth';
import { TOKENS, useServices } from '../container-api';
import { useAnimatedComponents } from '../contexts/animated-components';
import { useTheme } from '../contexts/theme';
import { BifoldError } from '../types/error';
import { testIdWithKey } from '../utils/testable';
import PINScreenTitleText from '../components/misc/PINScreenTitleText';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import ConfirmPINModal, { ConfirmPINModalUsage } from '../components/modals/ConfirmPINModal';
const PINCreate = ({
  explainedStatus,
  setAuthenticated
}) => {
  const [, dispatch] = useStore();
  const {
    setPIN: setWalletPIN
  } = useAuth();
  const PINTwoInputRef = useRef(null);
  const [PIN, setPIN] = useState('');
  const [PINTwo, setPINTwo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    t
  } = useTranslation();
  const {
    ColorPalette
  } = useTheme();
  const {
    ButtonLoading,
    LoadingSpinner
  } = useAnimatedComponents();
  const createPINButtonRef = useRef(null);
  const [PINExplainer, PINHeader, {
    showPINExplainer,
    preventScreenCapture,
    PINScreensConfig
  }, Button, inlineMessages] = useServices([TOKENS.SCREEN_PIN_EXPLAINER, TOKENS.COMPONENT_PIN_HEADER, TOKENS.CONFIG, TOKENS.COMPONENT_BUTTON, TOKENS.INLINE_ERRORS]);
  const [PINConfirmModalVisible, setPINConfirmModalVisible] = useState(false);
  const [explained, setExplained] = useState(explainedStatus || showPINExplainer === false);
  const {
    PINValidations,
    validatePINEntry,
    inlineMessageField1,
    inlineMessageField2,
    modalState,
    PINSecurity,
    setInlineMessageField1,
    setInlineMessageField2
  } = usePINValidation(PIN);
  usePreventScreenCapture(preventScreenCapture);
  const handleConfirmPINFlow = useCallback(async pin => {
    if (validatePINEntry(pin, pin)) {
      setPINConfirmModalVisible(true);
    }
  }, [validatePINEntry]);
  const passcodeCreate = useCallback(async PIN => {
    try {
      await setWalletPIN(PIN);
      setAuthenticated(true);
      // this dispatch finishes this step of onboarding and will cause a navigation
      dispatch({
        type: DispatchAction.DID_CREATE_PIN
      });
    } catch (err) {
      const error = new BifoldError(t('Error.Title1040'), t('Error.Message1040'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1040);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
  }, [setWalletPIN, setAuthenticated, dispatch, t]);
  const onConfirmPIN = useCallback(async pinTwo => {
    setIsLoading(true);
    if (validatePINEntry(PIN, pinTwo)) {
      await passcodeCreate(PIN);
    }
    setIsLoading(false);
  }, [passcodeCreate, validatePINEntry, PIN, setIsLoading]);
  const onCreatePIN = useCallback(async () => {
    setIsLoading(true);
    if (validatePINEntry(PIN, PINTwo)) {
      await passcodeCreate(PIN);
    }
    setIsLoading(false);
  }, [passcodeCreate, validatePINEntry, PIN, PINTwo]);
  const modalBackButtonPressed = () => {
    setPINConfirmModalVisible(false);
  };
  const isContinueDisabled = useMemo(() => {
    if (inlineMessages.enabled) {
      return false;
    }
    return isLoading || PIN.length < minPINLength;
  }, [isLoading, PIN, inlineMessages]);
  const continueCreatePIN = useCallback(() => {
    setExplained(true);
  }, []);
  const controls = !PINScreensConfig.useNewPINDesign && /*#__PURE__*/React.createElement(Button, {
    title: t('PINCreate.CreatePIN'),
    testID: testIdWithKey('CreatePIN'),
    accessibilityLabel: t('PINCreate.CreatePIN'),
    buttonType: ButtonType.Primary,
    disabled: isContinueDisabled,
    onPress: onCreatePIN,
    ref: createPINButtonRef
  }, isLoading ? /*#__PURE__*/React.createElement(ButtonLoading, null) : null);
  return explained ? /*#__PURE__*/React.createElement(ScreenWrapper, {
    keyboardActive: true,
    controls: controls
  }, /*#__PURE__*/React.createElement(PINScreenTitleText, {
    header: t('PINCreate.Header'),
    subheader: t('PINCreate.Subheader')
  }), /*#__PURE__*/React.createElement(PINHeader, null), /*#__PURE__*/React.createElement(PINInput, {
    label: t('PINCreate.EnterPINTitle'),
    onPINChanged: async userPinInput => {
      setInlineMessageField1(undefined);
      setPIN(() => userPinInput);
      if (userPinInput.length === minPINLength && PINScreensConfig.useNewPINDesign) {
        Keyboard.dismiss();
        await handleConfirmPINFlow(userPinInput);
      } else if (!PINScreensConfig.useNewPINDesign && userPinInput.length === minPINLength && PINTwoInputRef !== null && PINTwoInputRef !== void 0 && PINTwoInputRef.current) {
        PINTwoInputRef.current.focus();
        const reactTag = findNodeHandle(PINTwoInputRef.current);
        if (reactTag) {
          AccessibilityInfo.setAccessibilityFocus(reactTag);
        }
      }
    },
    testID: testIdWithKey('EnterPIN'),
    accessibilityLabel: t('PINCreate.EnterPIN'),
    autoFocus: false,
    inlineMessage: inlineMessageField1
  }), !PINScreensConfig.useNewPINDesign && /*#__PURE__*/React.createElement(PINInput, {
    label: t('PINCreate.ReenterPIN'),
    onPINChanged: userPinInput => {
      setInlineMessageField2(undefined);
      setPINTwo(userPinInput);
      if (userPinInput.length === minPINLength) {
        Keyboard.dismiss();
        const reactTag = (createPINButtonRef === null || createPINButtonRef === void 0 ? void 0 : createPINButtonRef.current) && findNodeHandle(createPINButtonRef.current);
        if (reactTag) {
          AccessibilityInfo.setAccessibilityFocus(reactTag);
        }
      }
    },
    testID: testIdWithKey('ReenterPIN'),
    accessibilityLabel: t('PINCreate.ReenterPIN'),
    autoFocus: false,
    ref: PINTwoInputRef,
    inlineMessage: inlineMessageField2
  }), PINSecurity.displayHelper && /*#__PURE__*/React.createElement(PINValidationHelper, {
    validations: PINValidations
  }), PINScreensConfig.useNewPINDesign && isLoading && /*#__PURE__*/React.createElement(LoadingSpinner, {
    size: 50,
    color: ColorPalette.brand.primary
  }), modalState.visible && /*#__PURE__*/React.createElement(AlertModal, {
    title: modalState.title,
    message: modalState.message,
    submit: modalState.onModalDismiss
  }), /*#__PURE__*/React.createElement(ConfirmPINModal, {
    modalUsage: ConfirmPINModalUsage.PIN_CREATE,
    onBackPressed: modalBackButtonPressed,
    onConfirmPIN: onConfirmPIN,
    PINOne: PIN,
    setPINTwo: setPINTwo,
    title: t('Screens.CreatePIN'),
    visible: PINConfirmModalVisible,
    isLoading: isLoading
  })) : /*#__PURE__*/React.createElement(PINExplainer, {
    continueCreatePIN: continueCreatePIN
  });
};
export default PINCreate;
//# sourceMappingURL=PINCreate.js.map