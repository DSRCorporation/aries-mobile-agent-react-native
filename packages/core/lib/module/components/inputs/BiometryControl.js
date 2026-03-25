import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import ToggleButton from '../buttons/ToggleButton';
import DismissiblePopupModal from '../modals/DismissiblePopupModal';
import { ThemedText } from '../texts/ThemedText';
import { useAuth } from '../../contexts/auth';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
import { getSupportedBiometryType, BIOMETRY_TYPE } from 'react-native-keychain';
import { SafeAreaView } from 'react-native-safe-area-context';
const BIOMETRY_PERMISSION = PERMISSIONS.IOS.FACE_ID;
const BiometryControl = ({
  biometryEnabled,
  onBiometryToggle,
  children
}) => {
  const {
    t
  } = useTranslation();
  const {
    isBiometricsActive
  } = useAuth();
  const [biometryAvailable, setBiometryAvailable] = useState(false);
  const [settingsPopupConfig, setSettingsPopupConfig] = useState(null);
  const {
    ColorPalette,
    Assets,
    Spacing
  } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: Spacing.md,
      backgroundColor: ColorPalette.brand.primaryBackground
    },
    image: {
      minWidth: 200,
      minHeight: 200,
      marginBottom: 66
    },
    biometryAvailableRowGap: {
      rowGap: Spacing.md
    }
  });
  useEffect(() => {
    isBiometricsActive().then(result => {
      setBiometryAvailable(result);
    });
  }, [isBiometricsActive]);
  const onOpenSettingsTouched = async () => {
    await Linking.openSettings();
    onOpenSettingsDismissed();
  };
  const onOpenSettingsDismissed = () => {
    setSettingsPopupConfig(null);
  };
  const onRequestSystemBiometrics = useCallback(async newToggleValue => {
    const permissionResult = await request(BIOMETRY_PERMISSION);
    switch (permissionResult) {
      case RESULTS.GRANTED:
      case RESULTS.LIMITED:
        // Granted
        onBiometryToggle(newToggleValue);
        break;
      default:
        break;
    }
  }, [onBiometryToggle]);
  const onCheckSystemBiometrics = useCallback(async () => {
    if (Platform.OS === 'android') {
      // Android doesn't need to prompt biometric permission
      // for an app to use it.
      return biometryAvailable ? RESULTS.GRANTED : RESULTS.UNAVAILABLE;
    } else if (Platform.OS === 'ios') {
      return await check(BIOMETRY_PERMISSION);
    }
    return RESULTS.UNAVAILABLE;
  }, [biometryAvailable]);
  const toggleSwitch = useCallback(async () => {
    const newValue = !biometryEnabled;
    if (!newValue) {
      // Turning off doesn't require OS biometrics enabled
      onBiometryToggle(newValue);
      return;
    }

    // If the user is turning it on, they need
    // to first authenticate the OS biometrics before this action is accepted
    const permissionResult = await onCheckSystemBiometrics();
    const supported_type = await getSupportedBiometryType();
    switch (permissionResult) {
      case RESULTS.GRANTED:
      case RESULTS.LIMITED:
        // Already granted
        onBiometryToggle(newValue);
        break;
      case RESULTS.UNAVAILABLE:
        // Permission is unavailable/ not supported on this device
        if (Platform.OS === 'ios' && supported_type === BIOMETRY_TYPE.TOUCH_ID) {
          // if available, access to touch id can be granted without a request
          onBiometryToggle(newValue);
        } else {
          // Not in iOS or no touch id available for iOS, send user to settings
          // to enable biometrics
          setSettingsPopupConfig({
            title: t('Biometry.SetupBiometricsTitle'),
            description: t('Biometry.SetupBiometricsDesc')
          });
        }
        break;
      case RESULTS.BLOCKED:
        // Previously denied
        setSettingsPopupConfig({
          title: t('Biometry.AllowBiometricsTitle'),
          description: t('Biometry.AllowBiometricsDesc')
        });
        break;
      case RESULTS.DENIED:
        // Has not been requested
        await onRequestSystemBiometrics(newValue);
        break;
      default:
        break;
    }
  }, [onRequestSystemBiometrics, onCheckSystemBiometrics, biometryEnabled, t, onBiometryToggle]);
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      flex: 1
    },
    edges: ['left', 'right', 'bottom']
  }, settingsPopupConfig && /*#__PURE__*/React.createElement(DismissiblePopupModal, {
    title: settingsPopupConfig.title,
    description: settingsPopupConfig.description,
    onCallToActionLabel: t('Biometry.OpenSettings'),
    onCallToActionPressed: onOpenSettingsTouched,
    onDismissPressed: onOpenSettingsDismissed
  }), /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Assets.svg.biometrics, {
    style: styles.image
  })), biometryAvailable ? /*#__PURE__*/React.createElement(View, {
    style: styles.biometryAvailableRowGap
  }, /*#__PURE__*/React.createElement(ThemedText, null, t('Biometry.EnabledText1')), /*#__PURE__*/React.createElement(ThemedText, null, t('Biometry.EnabledText2'), /*#__PURE__*/React.createElement(ThemedText, {
    variant: "bold"
  }, " ", t('Biometry.Warning')))) : /*#__PURE__*/React.createElement(View, {
    style: styles.biometryAvailableRowGap
  }, /*#__PURE__*/React.createElement(ThemedText, null, t('Biometry.NotEnabledText1')), /*#__PURE__*/React.createElement(ThemedText, null, t('Biometry.NotEnabledText2'))), /*#__PURE__*/React.createElement(View, {
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
  }, /*#__PURE__*/React.createElement(ThemedText, {
    variant: "bold"
  }, t('Biometry.UseToUnlock'))), /*#__PURE__*/React.createElement(View, {
    style: {
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(ToggleButton, {
    testID: testIdWithKey('ToggleBiometrics'),
    isEnabled: biometryEnabled,
    isAvailable: true,
    toggleAction: toggleSwitch,
    disabled: false,
    enabledIcon: "check",
    disabledIcon: "close"
  })))), children);
};
export default BiometryControl;
//# sourceMappingURL=BiometryControl.js.map