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
var _SafeAreaModal = _interopRequireDefault(require("./SafeAreaModal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ImageModal = ({
  uri,
  onDismissPressed
}) => {
  const {
    height,
    width
  } = (0, _reactNative.useWindowDimensions)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    modalCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPalette.notification.popupOverlay,
      minHeight: height,
      minWidth: width,
      paddingHorizontal: 20,
      paddingVertical: 50
    },
    container: {
      flexShrink: 1,
      backgroundColor: ColorPalette.brand.primaryBackground
    },
    image: {
      width: width - 40,
      aspectRatio: 1,
      resizeMode: 'contain'
    },
    dismissIcon: {
      zIndex: 10,
      position: 'absolute',
      right: 20,
      top: 20
    }
  });
  const iconSize = 30;
  const dismissIconName = 'clear';
  const iconColor = ColorPalette.brand.primary;
  return /*#__PURE__*/_react.default.createElement(_SafeAreaModal.default, {
    transparent: true
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onDismissPressed,
    accessible: false
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.modalCenter
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    accessible: false
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.dismissIcon
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onDismissPressed,
    testID: (0, _testable.testIdWithKey)('Dismiss'),
    accessibilityLabel: t('Global.Dismiss'),
    accessibilityRole: 'button',
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: dismissIconName,
    size: iconSize,
    color: iconColor
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: styles.image,
    source: {
      uri
    }
  }))))));
};
var _default = exports.default = ImageModal;
//# sourceMappingURL=ImageModal.js.map