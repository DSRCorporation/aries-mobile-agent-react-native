"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _OpenIDProofRequestFooter = _interopRequireDefault(require("./components/OpenIDProofRequestFooter"));
var _OpenIDProofRequestHeader = _interopRequireDefault(require("./components/OpenIDProofRequestHeader"));
var _OpenIDProofRequestBody = _interopRequireDefault(require("./components/OpenIDProofRequestBody"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const OpenIdProofRequestDisplay = ({
  buttonsVisible,
  credential,
  credentialsRequested,
  onPressAltCredChange,
  onPressAccept,
  onPressDecline,
  onPressDismiss,
  selectedCredentialsSubmission,
  submission,
  verifierName
}) => {
  const styles = _reactNative.StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'space-between'
    }
  });
  if (!credential) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_OpenIDProofRequestHeader.default, {
    selectedCredentialsSubmission: selectedCredentialsSubmission,
    verifierName: verifierName,
    reason: (submission === null || submission === void 0 ? void 0 : submission.purpose) ?? ''
  }), /*#__PURE__*/_react.default.createElement(_OpenIDProofRequestBody.default, {
    credentialsRequested: credentialsRequested,
    onPressAltCredChange: onPressAltCredChange,
    selectedCredentialsSubmission: selectedCredentialsSubmission,
    submission: submission,
    verifierName: verifierName
  }))), /*#__PURE__*/_react.default.createElement(_OpenIDProofRequestFooter.default, {
    buttonsVisible: buttonsVisible,
    credential: credential,
    onPressAccept: onPressAccept,
    onPressDecline: onPressDecline,
    onPressDismiss: onPressDismiss,
    selectedCredentialsSubmission: selectedCredentialsSubmission,
    submission: submission
  }));
};
var _default = exports.default = OpenIdProofRequestDisplay;
//# sourceMappingURL=OpenIDProofRequestDisplay.js.map