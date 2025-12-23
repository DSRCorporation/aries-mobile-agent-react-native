import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View, Modal, Switch, ScrollView, Pressable, DeviceEventEmitter } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button, { ButtonType } from '../components/buttons/Button';
import { EventTypes } from '../constants';
import { useAnimatedComponents } from '../contexts/animated-components';
import { useAuth } from '../contexts/auth';
import { DispatchAction } from '../contexts/reducers/store';
import { useStore } from '../contexts/store';
import { useTheme } from '../contexts/theme';
import { Screens } from '../types/navigators';
import { testIdWithKey } from '../utils/testable';
import { PINEntryUsage } from './PINEnter';
import { TOKENS, useServices } from '../container-api';
var UseBiometryUsage = /*#__PURE__*/function (UseBiometryUsage) {
  UseBiometryUsage[UseBiometryUsage["InitialSetup"] = 0] = "InitialSetup";
  UseBiometryUsage[UseBiometryUsage["ToggleOnOff"] = 1] = "ToggleOnOff";
  return UseBiometryUsage;
}(UseBiometryUsage || {});
const UseBiometry = () => {
  const [store, dispatch] = useStore();
  const {
    t
  } = useTranslation();
  const [{
    enablePushNotifications
  }, PINEnter] = useServices([TOKENS.CONFIG, TOKENS.SCREEN_PIN_ENTER]);
  const {
    isBiometricsActive,
    commitPIN,
    disableBiometrics
  } = useAuth();
  const [biometryAvailable, setBiometryAvailable] = useState(false);
  const [biometryEnabled, setBiometryEnabled] = useState(store.preferences.useBiometry);
  const [continueEnabled, setContinueEnabled] = useState(true);
  const [canSeeCheckPIN, setCanSeeCheckPIN] = useState(false);
  const {
    ColorPallet,
    TextTheme,
    Assets
  } = useTheme();
  const {
    ButtonLoading
  } = useAnimatedComponents();
  const navigation = useNavigation();
  const screenUsage = store.onboarding.didCompleteOnboarding ? UseBiometryUsage.ToggleOnOff : UseBiometryUsage.InitialSetup;
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      padding: 20,
      backgroundColor: ColorPallet.brand.primaryBackground
    },
    image: {
      minWidth: 200,
      minHeight: 200,
      marginBottom: 66
    }
  });
  useEffect(() => {
    isBiometricsActive().then(result => {
      setBiometryAvailable(result);
    });
  }, []);
  useEffect(() => {
    if (screenUsage === UseBiometryUsage.InitialSetup) {
      return;
    }
    if (biometryEnabled) {
      commitPIN(biometryEnabled).then(() => {
        dispatch({
          type: DispatchAction.USE_BIOMETRY,
          payload: [biometryEnabled]
        });
      });
    } else {
      disableBiometrics().then(() => {
        dispatch({
          type: DispatchAction.USE_BIOMETRY,
          payload: [biometryEnabled]
        });
      });
    }
  }, [biometryEnabled]);
  const continueTouched = async () => {
    setContinueEnabled(false);
    await commitPIN(biometryEnabled);
    dispatch({
      type: DispatchAction.USE_BIOMETRY,
      payload: [biometryEnabled]
    });
    if (enablePushNotifications) {
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{
          name: Screens.UsePushNotifications
        }]
      }));
    } else {
      dispatch({
        type: DispatchAction.DID_COMPLETE_ONBOARDING,
        payload: [true]
      });
    }
  };
  const toggleSwitch = () => {
    // If the user is toggling biometrics on/off they need
    // to first authenticate before this action is accepted
    if (screenUsage === UseBiometryUsage.ToggleOnOff) {
      setCanSeeCheckPIN(true);
      DeviceEventEmitter.emit(EventTypes.BIOMETRY_UPDATE, true);
      return;
    }
    setBiometryEnabled(previousState => !previousState);
  };
  const onAuthenticationComplete = status => {
    // If successfully authenticated the toggle may proceed.
    if (status) {
      setBiometryEnabled(previousState => !previousState);
    }
    DeviceEventEmitter.emit(EventTypes.BIOMETRY_UPDATE, false);
    setCanSeeCheckPIN(false);
  };
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    edges: ['left', 'right', 'bottom']
  }, /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Assets.svg.biometrics, {
    style: styles.image
  })), biometryAvailable ? /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.normal
  }, t('Biometry.EnabledText1')), /*#__PURE__*/React.createElement(Text, null), /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.normal
  }, t('Biometry.EnabledText2'), /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.bold
  }, " ", t('Biometry.Warning')))) : /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.normal
  }, t('Biometry.NotEnabledText1')), /*#__PURE__*/React.createElement(Text, null), /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.normal
  }, t('Biometry.NotEnabledText2'))), /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      marginVertical: 20
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexShrink: 1,
      marginRight: 10,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: TextTheme.bold
  }, t('Biometry.UseToUnlock'))), /*#__PURE__*/React.createElement(View, {
    style: {
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Pressable, {
    testID: testIdWithKey('ToggleBiometrics'),
    accessible: true,
    accessibilityLabel: t('Biometry.Toggle'),
    accessibilityRole: 'switch'
  }, /*#__PURE__*/React.createElement(Switch, {
    trackColor: {
      false: ColorPallet.grayscale.lightGrey,
      true: ColorPallet.brand.primaryDisabled
    },
    thumbColor: biometryEnabled ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey,
    ios_backgroundColor: ColorPallet.grayscale.lightGrey,
    onValueChange: toggleSwitch,
    value: biometryEnabled,
    disabled: !biometryAvailable
  }))))), /*#__PURE__*/React.createElement(View, {
    style: {
      marginTop: 'auto',
      margin: 20
    }
  }, store.onboarding.didCompleteOnboarding || /*#__PURE__*/React.createElement(Button, {
    title: 'Continue',
    accessibilityLabel: 'Continue',
    testID: testIdWithKey('Continue'),
    onPress: continueTouched,
    buttonType: ButtonType.Primary,
    disabled: !continueEnabled
  }, !continueEnabled && /*#__PURE__*/React.createElement(ButtonLoading, null))), /*#__PURE__*/React.createElement(Modal, {
    style: {
      backgroundColor: ColorPallet.brand.primaryBackground
    },
    visible: canSeeCheckPIN,
    transparent: false,
    animationType: 'slide'
  }, /*#__PURE__*/React.createElement(PINEnter, {
    usage: PINEntryUsage.PINCheck,
    setAuthenticated: onAuthenticationComplete
  })));
};
export default UseBiometry;
//# sourceMappingURL=UseBiometry.js.map