"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _InfoBox = _interopRequireDefault(require("../misc/InfoBox"));
var _SafeAreaModal = _interopRequireDefault(require("./SafeAreaModal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const PopupModal = ({
  title,
  bodyContent,
  description,
  message,
  onCallToActionPressed,
  notificationType,
  onCallToActionLabel
}) => {
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    modalCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPalette.notification.popupOverlay,
      padding: 20
    }
  });
  return /*#__PURE__*/_react.default.createElement(_SafeAreaModal.default, {
    transparent: true
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.modalCenter
  }, /*#__PURE__*/_react.default.createElement(_InfoBox.default, {
    notificationType: notificationType,
    title: title,
    description: description,
    message: message,
    bodyContent: bodyContent,
    onCallToActionLabel: onCallToActionLabel,
    onCallToActionPressed: onCallToActionPressed
  })));
};
var _default = exports.default = PopupModal;
//# sourceMappingURL=PopupModal.js.map