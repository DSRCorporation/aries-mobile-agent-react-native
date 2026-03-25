"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CredentialCardActionLink = ({
  hasAltCredentials,
  onChangeAlt,
  helpActionUrl,
  textStyle
}) => {
  if (hasAltCredentials && onChangeAlt) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: onChangeAlt,
      accessibilityLabel: "Change credential"
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "bold",
      style: textStyle
    }, "Change credential"));
  }
  if (helpActionUrl) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: () => _reactNative.Linking.openURL(helpActionUrl),
      accessibilityLabel: "Get this credential"
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "bold",
      style: textStyle
    }, "Get this credential"));
  }
  return null;
};
var _default = exports.default = CredentialCardActionLink;
//# sourceMappingURL=CredentialCardActionLink.js.map