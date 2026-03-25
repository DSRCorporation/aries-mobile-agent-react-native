import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, StatusBar, DeviceEventEmitter, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { EventTypes } from '../../constants';
import { TOKENS, useServices } from '../../container-api';
import { useTheme } from '../../contexts/theme';
import InfoBox, { InfoBoxType } from '../misc/InfoBox';
import SafeAreaModal from './SafeAreaModal';
import FullScreenErrorModal from './FullScreenErrorModal';
import { Screens, TabStacks } from '../../types/navigators';
const ErrorModal = ({
  enableReport
}) => {
  const {
    height
  } = useWindowDimensions();
  const {
    t
  } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState();
  const [reported, setReported] = useState(false);
  const [logger, {
    enableFullScreenErrorModal
  }] = useServices([TOKENS.UTIL_LOGGER, TOKENS.CONFIG]);
  const {
    ColorPalette
  } = useTheme();
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      minHeight: height,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPalette.brand.primaryBackground
    }
  });
  const onDismissModalTouched = useCallback(() => {
    setModalVisible(false);
  }, []);
  const onPressSimplifiedErrorModalCTA = useCallback(() => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(TabStacks.HomeStack, {
      screen: Screens.Home
    });
    setModalVisible(false);
  }, [navigation]);
  const report = useCallback(() => {
    if (error) {
      logger.report(error);
    }
    setReported(true);
  }, [logger, error]);
  useEffect(() => {
    const errorAddedHandle = DeviceEventEmitter.addListener(EventTypes.ERROR_ADDED, err => {
      if (err.title && err.message) {
        setError(err);
        setReported(false);
        setModalVisible(true);
      }
    });
    const errorRemovedHandle = DeviceEventEmitter.addListener(EventTypes.ERROR_REMOVED, () => {
      setError(undefined);
      setModalVisible(false);
    });
    return () => {
      errorAddedHandle.remove();
      errorRemovedHandle.remove();
    };
  }, []);
  const formattedMessageForError = useCallback(err => {
    if (!err) {
      return undefined;
    }
    return `${t('Error.ErrorCode')} ${err.code} - ${err.message}`;
  }, [t]);
  const secondaryCallToActionIcon = useMemo(() => reported ? /*#__PURE__*/React.createElement(Icon, {
    style: {
      marginRight: 8
    },
    name: 'check-circle',
    size: 18,
    color: ColorPalette.semantic.success
  }) : undefined, [reported, ColorPalette.semantic.success]);
  return enableFullScreenErrorModal ? /*#__PURE__*/React.createElement(FullScreenErrorModal, {
    errorTitle: error ? error.title : t('Error.Unknown'),
    errorDescription: error ? error.description : t('Error.Problem'),
    onPressCTA: onPressSimplifiedErrorModalCTA,
    visible: modalVisible
  }) : /*#__PURE__*/React.createElement(SafeAreaModal, {
    visible: modalVisible,
    transparent: true
  }, /*#__PURE__*/React.createElement(StatusBar, {
    hidden: true
  }), /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(InfoBox, {
    notificationType: InfoBoxType.Error,
    title: error ? error.title : t('Error.Unknown'),
    description: error ? error.description : t('Error.Problem'),
    message: formattedMessageForError(error ?? null),
    onCallToActionPressed: onDismissModalTouched,
    secondaryCallToActionTitle: reported ? t('Error.Reported') : t('Error.ReportThisProblem'),
    secondaryCallToActionDisabled: reported,
    secondaryCallToActionIcon: secondaryCallToActionIcon,
    secondaryCallToActionPressed: enableReport && error ? report : undefined,
    showVersionFooter: true
  })));
};
export default ErrorModal;
//# sourceMappingURL=ErrorModal.js.map