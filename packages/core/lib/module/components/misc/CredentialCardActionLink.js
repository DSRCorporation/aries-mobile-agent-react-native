import React from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import { ThemedText } from '../texts/ThemedText';
const CredentialCardActionLink = ({
  hasAltCredentials,
  onChangeAlt,
  helpActionUrl,
  textStyle
}) => {
  if (hasAltCredentials && onChangeAlt) {
    return /*#__PURE__*/React.createElement(TouchableOpacity, {
      onPress: onChangeAlt,
      accessibilityLabel: "Change credential"
    }, /*#__PURE__*/React.createElement(ThemedText, {
      variant: "bold",
      style: textStyle
    }, "Change credential"));
  }
  if (helpActionUrl) {
    return /*#__PURE__*/React.createElement(TouchableOpacity, {
      onPress: () => Linking.openURL(helpActionUrl),
      accessibilityLabel: "Get this credential"
    }, /*#__PURE__*/React.createElement(ThemedText, {
      variant: "bold",
      style: textStyle
    }, "Get this credential"));
  }
  return null;
};
export default CredentialCardActionLink;
//# sourceMappingURL=CredentialCardActionLink.js.map