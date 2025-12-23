"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function createStyles({
  ColorPallet
}) {
  return _reactNative.StyleSheet.create({
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
  } = (0, _reactI18next.useTranslation)();
  const theme = (0, _theme.useTheme)();
  const styles = createStyles(theme);
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessible: true,
    accessibilityLabel: t('Scan.Torch'),
    accessibilityRole: 'button',
    testID: (0, _testable.testIdWithKey)('ScanTorch'),
    style: [styles.container, {
      backgroundColor: active ? theme.ColorPallet.grayscale.white : undefined
    }],
    onPress: onPress,
    hitSlop: _constants.hitSlop
  }, children);
};
const TorchIcon = ({
  active
}) => {
  const theme = (0, _theme.useTheme)();
  const styles = createStyles(theme);
  return /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
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
  return /*#__PURE__*/_react.default.createElement(TorchButton, {
    active: active,
    onPress: onPress
  }, /*#__PURE__*/_react.default.createElement(TorchIcon, {
    active: active
  }));
};
var _default = exports.default = QRScannerTorch;
//# sourceMappingURL=QRScannerTorch.js.map