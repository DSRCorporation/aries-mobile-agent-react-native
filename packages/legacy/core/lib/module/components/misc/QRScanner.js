import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Modal, Pressable, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { hitSlop } from '../../constants';
import { useTheme } from '../../contexts/theme';
import { Screens } from '../../types/navigators';
import { testIdWithKey } from '../../utils/testable';
import InfoBox, { InfoBoxType } from '../misc/InfoBox';
import DismissiblePopupModal from '../modals/DismissiblePopupModal';
import QRScannerTorch from './QRScannerTorch';
import ScanCamera from './ScanCamera';
import { TOKENS, useServices } from '../../container-api';
const QRScanner = ({
  handleCodeScan,
  error,
  enableCameraOnError
}) => {
  const navigation = useNavigation();
  const [{
    showScanHelp,
    showScanButton
  }] = useServices([TOKENS.CONFIG]);
  const [torchActive, setTorchActive] = useState(false);
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [showErrorDetailsModal, setShowErrorDetailsModal] = useState(false);
  const {
    t
  } = useTranslation();
  const {
    ColorPallet,
    TextTheme
  } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    viewFinder: {
      width: 250,
      height: 250,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: ColorPallet.grayscale.white
    },
    viewFinderContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    messageContainer: {
      marginHorizontal: 40,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      paddingTop: 30
    },
    icon: {
      color: ColorPallet.grayscale.white,
      padding: 4
    },
    textStyle: {
      ...TextTheme.title,
      color: 'white',
      marginHorizontal: 10,
      textAlign: 'center'
    }
  });
  const styleForState = ({
    pressed
  }) => [{
    opacity: pressed ? 0.2 : 1
  }];
  const toggleShowInfoBox = () => setShowInfoBox(!showInfoBox);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Modal, {
    visible: showInfoBox,
    animationType: "fade",
    transparent: true
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1,
      paddingHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)'
    }
  }, /*#__PURE__*/React.createElement(InfoBox, {
    notificationType: InfoBoxType.Info,
    title: t('Scan.BadQRCode'),
    description: t('Scan.BadQRCodeDescription'),
    onCallToActionPressed: toggleShowInfoBox
  }))), showErrorDetailsModal && /*#__PURE__*/React.createElement(DismissiblePopupModal, {
    title: t('Scan.ErrorDetails'),
    description: (error === null || error === void 0 ? void 0 : error.details) || t('Scan.NoDetails'),
    onCallToActionLabel: t('Global.Dismiss'),
    onCallToActionPressed: () => setShowErrorDetailsModal(false),
    onDismissPressed: () => setShowErrorDetailsModal(false)
  }), /*#__PURE__*/React.createElement(ScanCamera, {
    handleCodeScan: handleCodeScan,
    error: error,
    enableCameraOnError: enableCameraOnError
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.messageContainer
  }, error ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
    style: styles.icon,
    name: "cancel",
    size: 40
  }), /*#__PURE__*/React.createElement(Text, {
    testID: testIdWithKey('ErrorMessage'),
    style: styles.textStyle
  }, error.message), /*#__PURE__*/React.createElement(Pressable, {
    onPress: () => setShowErrorDetailsModal(true),
    accessibilityLabel: t('Scan.ShowDetails'),
    accessibilityRole: 'button',
    testID: testIdWithKey('ShowDetails'),
    hitSlop: hitSlop
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "information-outline",
    size: 40,
    style: styles.icon
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
    name: "qrcode-scan",
    size: 40,
    style: styles.icon
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.textStyle
  }, t('Scan.WillScanAutomatically')))), /*#__PURE__*/React.createElement(View, {
    style: styles.viewFinderContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.viewFinder
  })), showScanButton && /*#__PURE__*/React.createElement(View, {
    style: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Pressable, {
    accessibilityLabel: t('Scan.ScanNow'),
    accessibilityRole: 'button',
    testID: testIdWithKey('ScanNow'),
    onPress: toggleShowInfoBox,
    style: styleForState,
    hitSlop: hitSlop
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "circle-outline",
    size: 60,
    style: {
      color: 'white',
      marginBottom: -15
    }
  }))), /*#__PURE__*/React.createElement(View, {
    style: {
      marginHorizontal: 24,
      height: 24,
      marginBottom: 60,
      flexDirection: 'row'
    }
  }, showScanHelp && /*#__PURE__*/React.createElement(Pressable, {
    accessibilityLabel: t('Scan.ScanHelp'),
    accessibilityRole: 'button',
    testID: testIdWithKey('ScanHelp')
    // @ts-ignore
    ,
    onPress: () => navigation.navigate(Screens.ScanHelp),
    style: styleForState,
    hitSlop: hitSlop
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "help-circle",
    size: 24,
    style: {
      color: 'white'
    }
  })), /*#__PURE__*/React.createElement(View, {
    style: {
      width: 10,
      marginLeft: 'auto'
    }
  }), /*#__PURE__*/React.createElement(QRScannerTorch, {
    active: torchActive,
    onPress: () => setTorchActive(!torchActive)
  }))));
};
export default QRScanner;
//# sourceMappingURL=QRScanner.js.map