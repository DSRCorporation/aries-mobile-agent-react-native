import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, Keyboard, StyleSheet, Text, View, findNodeHandle, DeviceEventEmitter } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// eslint-disable-next-line import/no-named-as-default
import { ButtonType } from '../components/buttons/Button-api';
import PINInput from '../components/inputs/PINInput';
import AlertModal from '../components/modals/AlertModal';
import KeyboardView from '../components/views/KeyboardView';
import { EventTypes, minPINLength } from '../constants';
import { TOKENS, useServices } from '../container-api';
import { useAnimatedComponents } from '../contexts/animated-components';
import { useAuth } from '../contexts/auth';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { BifoldError } from '../types/error';
import { Screens } from '../types/navigators';
import { PINCreationValidations } from '../utils/PINCreationValidation';
import { testIdWithKey } from '../utils/testable';
const PINCreate = ({
  setAuthenticated,
  route
}) => {
  var _route$params;
  const updatePin = (_route$params = route.params) === null || _route$params === void 0 ? void 0 : _route$params.updatePin;
  const {
    setPIN: setWalletPIN,
    checkPIN,
    rekeyWallet
  } = useAuth();
  const [PIN, setPIN] = useState('');
  const [PINTwo, setPINTwo] = useState('');
  const [PINOld, setPINOld] = useState('');
  const [continueEnabled, setContinueEnabled] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [modalState, setModalState] = useState({
    visible: false,
    title: '',
    message: ''
  });
  const iconSize = 24;
  const navigation = useNavigation();
  const [store, dispatch] = useStore();
  const {
    t
  } = useTranslation();
  const {
    ColorPallet,
    TextTheme
  } = useTheme();
  const {
    ButtonLoading
  } = useAnimatedComponents();
  const PINTwoInputRef = useRef(null);
  const createPINButtonRef = useRef(null);
  const actionButtonLabel = updatePin ? t('PINCreate.ChangePIN') : t('PINCreate.CreatePIN');
  const actionButtonTestId = updatePin ? testIdWithKey('ChangePIN') : testIdWithKey('CreatePIN');
  const [PINCreateHeader, {
    PINSecurity
  }, Button] = useServices([TOKENS.COMPONENT_PIN_CREATE_HEADER, TOKENS.CONFIG, TOKENS.COMP_BUTTON]);
  const [PINOneValidations, setPINOneValidations] = useState(PINCreationValidations(PIN, PINSecurity.rules));
  const style = StyleSheet.create({
    screenContainer: {
      height: '100%',
      backgroundColor: ColorPallet.brand.primaryBackground,
      padding: 20,
      justifyContent: 'space-between'
    },
    // below used as helpful labels for views, no properties needed atp
    contentContainer: {},
    controlsContainer: {}
  });
  const passcodeCreate = async PIN => {
    try {
      setContinueEnabled(false);
      await setWalletPIN(PIN);
      // This will trigger initAgent
      setAuthenticated(true);
      dispatch({
        type: DispatchAction.DID_CREATE_PIN
      });
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{
          name: Screens.UseBiometry
        }]
      }));
    } catch (err) {
      const error = new BifoldError(t('Error.Title1040'), t('Error.Message1040'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1040);
      DeviceEventEmitter.emit(EventTypes.ERROR_ADDED, error);
    }
  };
  const validatePINEntry = (PINOne, PINTwo) => {
    for (const validation of PINOneValidations) {
      if (validation.isInvalid) {
        setModalState({
          visible: true,
          title: t('PINCreate.InvalidPIN'),
          message: t(`PINCreate.Message.${validation.errorName}`)
        });
        return false;
      }
    }
    if (PINOne !== PINTwo) {
      setModalState({
        visible: true,
        title: t('PINCreate.InvalidPIN'),
        message: t('PINCreate.PINsDoNotMatch')
      });
      return false;
    }
    return true;
  };
  const checkOldPIN = async PIN => {
    const valid = await checkPIN(PIN);
    if (!valid) {
      setModalState({
        visible: true,
        title: t('PINCreate.InvalidPIN'),
        message: t(`PINCreate.Message.OldPINIncorrect`)
      });
    }
    return valid;
  };
  const confirmEntry = async (PINOne, PINTwo) => {
    if (!validatePINEntry(PINOne, PINTwo)) {
      return;
    }
    await passcodeCreate(PINOne);
  };
  useEffect(() => {
    if (updatePin) {
      setContinueEnabled(PIN !== '' && PINTwo !== '' && PINOld !== '');
    }
  }, [PINOld, PIN, PINTwo]);
  return /*#__PURE__*/React.createElement(KeyboardView, null, /*#__PURE__*/React.createElement(View, {
    style: style.screenContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: style.contentContainer
  }, /*#__PURE__*/React.createElement(PINCreateHeader, {
    updatePin: updatePin
  }), updatePin && /*#__PURE__*/React.createElement(PINInput, {
    label: t('PINCreate.EnterOldPINTitle'),
    testID: testIdWithKey('EnterOldPIN'),
    onPINChanged: p => {
      setPINOld(p);
    }
  }), /*#__PURE__*/React.createElement(PINInput, {
    label: t('PINCreate.EnterPINTitle', {
      new: updatePin ? t('PINCreate.NewPIN') + ' ' : ''
    }),
    onPINChanged: p => {
      setPIN(p);
      setPINOneValidations(PINCreationValidations(p, PINSecurity.rules));
      if (p.length === minPINLength) {
        if (PINTwoInputRef && PINTwoInputRef.current) {
          PINTwoInputRef.current.focus();
          // NOTE:(jl) `findNodeHandle` will be deprecated in React 18.
          // https://reactnative.dev/docs/new-architecture-library-intro#preparing-your-javascript-codebase-for-the-new-react-native-renderer-fabric
          const reactTag = findNodeHandle(PINTwoInputRef.current);
          if (reactTag) {
            AccessibilityInfo.setAccessibilityFocus(reactTag);
          }
        }
      }
    },
    testID: testIdWithKey('EnterPIN'),
    accessibilityLabel: t('PINCreate.EnterPIN'),
    autoFocus: false
  }), PINSecurity.displayHelper && /*#__PURE__*/React.createElement(View, {
    style: {
      marginBottom: 16
    }
  }, PINOneValidations.map((validation, index) => {
    return /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row'
      },
      key: index
    }, validation.isInvalid ? /*#__PURE__*/React.createElement(Icon, {
      name: "clear",
      size: iconSize,
      color: ColorPallet.notification.errorIcon
    }) : /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: iconSize,
      color: ColorPallet.notification.successIcon
    }), /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.normal, {
        paddingLeft: 4
      }]
    }, t(`PINCreate.Helper.${validation.errorName}`)));
  })), /*#__PURE__*/React.createElement(PINInput, {
    label: t('PINCreate.ReenterPIN', {
      new: updatePin ? t('PINCreate.NewPIN') + ' ' : ''
    }),
    onPINChanged: p => {
      setPINTwo(p);
      if (p.length === minPINLength) {
        Keyboard.dismiss();
        if (createPINButtonRef && createPINButtonRef.current) {
          // NOTE:(jl) `findNodeHandle` will be deprecated in React 18.
          // https://reactnative.dev/docs/new-architecture-library-intro#preparing-your-javascript-codebase-for-the-new-react-native-renderer-fabric
          const reactTag = findNodeHandle(createPINButtonRef.current);
          if (reactTag) {
            AccessibilityInfo.setAccessibilityFocus(reactTag);
          }
        }
      }
    },
    testID: testIdWithKey('ReenterPIN'),
    accessibilityLabel: t('PINCreate.ReenterPIN', {
      new: updatePin ? t('PINCreate.NewPIN') + ' ' : ''
    }),
    autoFocus: false,
    ref: PINTwoInputRef
  }), modalState.visible && /*#__PURE__*/React.createElement(AlertModal, {
    title: modalState.title,
    message: modalState.message,
    submit: () => {
      if (modalState.onModalDismiss) {
        modalState.onModalDismiss();
      }
      setModalState({
        ...modalState,
        visible: false,
        onModalDismiss: undefined
      });
    }
  })), /*#__PURE__*/React.createElement(View, {
    style: style.controlsContainer
  }, /*#__PURE__*/React.createElement(Button, {
    title: actionButtonLabel,
    testID: actionButtonTestId,
    accessibilityLabel: actionButtonLabel,
    buttonType: ButtonType.Primary,
    disabled: !continueEnabled || PIN.length < minPINLength || PINTwo.length < minPINLength,
    onPress: async () => {
      setLoading(true);
      if (updatePin) {
        const valid = validatePINEntry(PIN, PINTwo);
        if (valid) {
          setContinueEnabled(false);
          const oldPinValid = await checkOldPIN(PINOld);
          if (oldPinValid) {
            const success = await rekeyWallet(PINOld, PIN, store.preferences.useBiometry);
            if (success) {
              setModalState({
                visible: true,
                title: t('PINCreate.PinChangeSuccessTitle'),
                message: t('PINCreate.PinChangeSuccessMessage'),
                onModalDismiss: () => {
                  navigation.navigate(Screens.Settings);
                }
              });
            }
          }
          setContinueEnabled(true);
        }
      } else {
        await confirmEntry(PIN, PINTwo);
      }
      setLoading(false);
    },
    ref: createPINButtonRef
  }, !continueEnabled && isLoading ? /*#__PURE__*/React.createElement(ButtonLoading, null) : null))));
};
export default PINCreate;
//# sourceMappingURL=PINCreate.js.map