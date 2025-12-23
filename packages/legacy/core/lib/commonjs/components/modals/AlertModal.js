"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _InfoBox = require("../../components/misc/InfoBox");
var _PopupModal = _interopRequireDefault(require("./PopupModal"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const AlertModal = ({
  title,
  message,
  submit
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    height
  } = (0, _reactNative.useWindowDimensions)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      minHeight: height,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_PopupModal.default, {
    notificationType: _InfoBox.InfoBoxType.Info,
    title: title,
    description: message,
    onCallToActionLabel: t('Global.Okay'),
    onCallToActionPressed: submit ? () => submit() : () => undefined
  }));
};
var _default = exports.default = AlertModal;
//# sourceMappingURL=AlertModal.js.map