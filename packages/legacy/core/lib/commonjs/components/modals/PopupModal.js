"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _InfoBox = _interopRequireDefault(require("../misc/InfoBox"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
    ColorPallet
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    modalCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPallet.notification.popupOverlay,
      padding: 20
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
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