import React, { useEffect, useState } from 'react';
import { BackHandler, View, StyleSheet, DeviceEventEmitter } from 'react-native';
import { Screens } from '../../../types/navigators';
import { useServices, TOKENS } from '../../../container-api';
import LoadingSpinner from '../../../components/animated/LoadingSpinner';
import { EventTypes } from '../../../constants';
import FullScreenErrorModal from '../../../components/modals/FullScreenErrorModal';
import { TabStacks } from '../../../types/navigators';
import { useTheme } from '../../../contexts/theme';
import { useOpenID } from '../hooks/openid';
import { isOpenIDCredentialRecord, isOpenIdProofRequestRecord } from '../credentialRecord';
const OpenIDConnection = ({
  navigation,
  route
}) => {
  const {
    openIDUri,
    openIDPresentationUri
  } = route.params;
  const [logger, historyEnabled] = useServices([TOKENS.UTIL_LOGGER, TOKENS.HISTORY_ENABLED]);
  const {
    ColorPalette
  } = useTheme();
  const notificationRecord = useOpenID({
    openIDUri,
    openIDPresentationUri
  });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorDetails, setErrorDetails] = useState({});
  const styles = StyleSheet.create({
    pageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  useEffect(() => {
    try {
      if (!historyEnabled) {
        logger.trace(`[${Screens.OpenIDConnection}]:[logHistoryRecord] Skipping history log, either history function disabled or agent undefined!`);
        return;
      }
    } catch (err) {
      logger.error(`[${Screens.OpenIDConnection}]:[logHistoryRecord] Error saving history: ${err}`);
    }
  }, [historyEnabled, logger]);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    if (!notificationRecord) {
      return;
    }
    if (isOpenIDCredentialRecord(notificationRecord)) {
      logger === null || logger === void 0 || logger.info(`Connection: Handling OpenID4VCi Credential, navigate to CredentialOffer`);
      navigation.replace(Screens.OpenIDCredentialOffer, {
        credential: notificationRecord
      });
      return;
    }
    if (isOpenIdProofRequestRecord(notificationRecord)) {
      navigation.replace(Screens.OpenIDProofPresentation, {
        credential: notificationRecord
      });
    }
  }, [logger, navigation, notificationRecord]);
  useEffect(() => {
    const handler = DeviceEventEmitter.addListener(EventTypes.OPENID_CONNECTION_ERROR, err => {
      setShowErrorModal(true);
      setErrorDetails({
        ...err
      });
    });
    return () => {
      handler.remove();
    };
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: styles.pageContainer
  }, /*#__PURE__*/React.createElement(LoadingSpinner, {
    color: ColorPalette.brand.loadingIcon,
    name: "loading",
    size: 50
  })), /*#__PURE__*/React.createElement(FullScreenErrorModal, {
    errorTitle: (errorDetails === null || errorDetails === void 0 ? void 0 : errorDetails.title) ?? '',
    errorDescription: (errorDetails === null || errorDetails === void 0 ? void 0 : errorDetails.description) ?? '',
    visible: showErrorModal,
    onPressCTA: () => {
      var _navigation$getParent;
      (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(TabStacks.HomeStack, {
        screen: Screens.Home
      });
    }
  }));
};
export default OpenIDConnection;
//# sourceMappingURL=OpenIDConnection.js.map