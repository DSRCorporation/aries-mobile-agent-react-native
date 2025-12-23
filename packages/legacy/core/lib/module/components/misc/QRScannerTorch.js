import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { hitSlop } from '../../constants';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
function createStyles({
  ColorPallet
}) {
  return StyleSheet.create({
    container: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: ColorPallet.grayscale.white,
      borderRadius: 24,
      marginBottom: 50
    },
    icon: {
      alignItems: 'center'
    }
  });
}
const TorchButton = ({
  active,
  onPress,
  children
}) => {
  const {
    t
  } = useTranslation();
  const theme = useTheme();
  const styles = createStyles(theme);
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    accessible: true,
    accessibilityLabel: t('Scan.Torch'),
    accessibilityRole: 'button',
    testID: testIdWithKey('ScanTorch'),
    style: [styles.container, {
      backgroundColor: active ? theme.ColorPallet.grayscale.white : undefined
    }],
    onPress: onPress,
    hitSlop: hitSlop
  }, children);
};
const TorchIcon = ({
  active
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  return /*#__PURE__*/React.createElement(Icon, {
    name: active ? 'flash-on' : 'flash-off',
    color: active ? theme.ColorPallet.grayscale.black : theme.ColorPallet.grayscale.white,
    size: 24,
    style: styles.icon
  });
};
const QRScannerTorch = ({
  active,
  onPress
}) => {
  return /*#__PURE__*/React.createElement(TorchButton, {
    active: active,
    onPress: onPress
  }, /*#__PURE__*/React.createElement(TorchIcon, {
    active: active
  }));
};
export default QRScannerTorch;
//# sourceMappingURL=QRScannerTorch.js.map