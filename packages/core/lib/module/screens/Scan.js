import { useAgent } from '@bifold/react-hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import QRScanner from '../components/misc/QRScanner';
import CameraDisclosureModal from '../components/modals/CameraDisclosureModal';
import { ToastType } from '../components/toast/BaseToast';
import LoadingView from '../components/views/LoadingView';
import { TOKENS, useServices } from '../container-api';
import { useStore } from '../contexts/store';
import { BifoldError, QrCodeScanError } from '../types/error';
import { connectFromScanOrDeepLink } from '../utils/helpers';
const Scan = ({
  navigation,
  route
}) => {
  const {
    agent
  } = useAgent();
  const {
    t
  } = useTranslation();
  const [store] = useStore();
  const [loading, setLoading] = useState(true);
  const [showDisclosureModal, setShowDisclosureModal] = useState(true);
  const [qrCodeScanError, setQrCodeScanError] = useState(null);
  const [{
    enableImplicitInvitations,
    enableReuseConnections
  }, logger] = useServices([TOKENS.CONFIG, TOKENS.UTIL_LOGGER]);
  let defaultToConnect = false;
  if (route !== null && route !== void 0 && route.params && route.params['defaultToConnect']) {
    defaultToConnect = route.params['defaultToConnect'];
  }
  const handleInvitation = useCallback(async value => {
    try {
      await connectFromScanOrDeepLink(value, agent, logger, navigation === null || navigation === void 0 ? void 0 : navigation.getParent(), false,
      // isDeepLink
      enableImplicitInvitations, enableReuseConnections);
    } catch (err) {
      const error = new BifoldError(t('Error.Title1031'), t('Error.Message1031'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1031);
      // throwing for QrCodeScanError
      throw error;
    }
  }, [agent, logger, navigation, enableImplicitInvitations, enableReuseConnections, t]);
  const handleCodeScan = useCallback(async value => {
    setQrCodeScanError(null);
    try {
      const uri = value;
      await handleInvitation(uri);
    } catch (e) {
      const error = new QrCodeScanError(t('Scan.InvalidQrCode'), value, e === null || e === void 0 ? void 0 : e.message);
      setQrCodeScanError(error);
    }
  }, [handleInvitation, t]);
  const permissionFlow = useCallback(async (method, permission, rationale) => {
    try {
      const permissionResult = await method(permission, rationale);
      if (permissionResult === RESULTS.GRANTED) {
        setShowDisclosureModal(false);
        return true;
      }
    } catch (error) {
      Toast.show({
        type: ToastType.Error,
        text1: t('Global.Failure'),
        text2: (error === null || error === void 0 ? void 0 : error.message) || t('Error.Unknown'),
        visibilityTime: 2000,
        position: 'bottom'
      });
    }
    return false;
  }, [t]);
  const requestCameraUse = async rationale => {
    if (Platform.OS === 'android') {
      return await permissionFlow(request, PERMISSIONS.ANDROID.CAMERA, rationale);
    } else if (Platform.OS === 'ios') {
      return await permissionFlow(request, PERMISSIONS.IOS.CAMERA, rationale);
    }
    return false;
  };
  useEffect(() => {
    const asyncEffect = async () => {
      if (Platform.OS === 'android') {
        await permissionFlow(check, PERMISSIONS.ANDROID.CAMERA);
      } else if (Platform.OS === 'ios') {
        await permissionFlow(check, PERMISSIONS.IOS.CAMERA);
      }
      setLoading(false);
    };
    asyncEffect();
  }, [permissionFlow]);
  if (loading) {
    return /*#__PURE__*/React.createElement(LoadingView, null);
  }
  if (showDisclosureModal) {
    return /*#__PURE__*/React.createElement(CameraDisclosureModal, {
      requestCameraUse: requestCameraUse
    });
  }
  return /*#__PURE__*/React.createElement(QRScanner, {
    showTabs: store.preferences.useConnectionInviterCapability,
    defaultToConnect: defaultToConnect,
    handleCodeScan: handleCodeScan,
    error: qrCodeScanError,
    enableCameraOnError: true,
    navigation: navigation,
    route: route
  });
};
export default Scan;
//# sourceMappingURL=Scan.js.map