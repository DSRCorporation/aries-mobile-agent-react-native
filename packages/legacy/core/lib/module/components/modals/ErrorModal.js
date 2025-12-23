import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, StatusBar, DeviceEventEmitter, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EventTypes } from '../../constants';
import { useTheme } from '../../contexts/theme';
import InfoBox, { InfoBoxType } from '../misc/InfoBox';
const ErrorModal = ({
  reportProblemAction
}) => {
  const {
    height
  } = useWindowDimensions();
  const {
    t
  } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState();
  const onDismissModalTouched = () => {
    setModalVisible(false);
  };
  const {
    ColorPallet
  } = useTheme();
  const styles = StyleSheet.create({
    container: {
      minHeight: height,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPallet.brand.primaryBackground
    }
  });
  useEffect(() => {
    const errorAddedHandle = DeviceEventEmitter.addListener(EventTypes.ERROR_ADDED, err => {
      if (err.title && err.message) {
        setError(err);
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
  const formattedMessageForError = err => {
    if (!err) {
      return undefined;
    }
    return `${t('Error.ErrorCode')} ${err.code} - ${err.message}`;
  };
  return /*#__PURE__*/React.createElement(Modal, {
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
    secondaryCallToActionTitle: t('Error.ReportThisProblem'),
    secondaryCallToActionPressed: reportProblemAction && error ? () => reportProblemAction(error) : undefined
  })));
};
export default ErrorModal;
//# sourceMappingURL=ErrorModal.js.map