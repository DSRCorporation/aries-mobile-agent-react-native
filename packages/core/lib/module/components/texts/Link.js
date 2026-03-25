function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { testIdForAccessabilityLabel, testIdWithKey } from '../../utils/testable';
import { ThemedText } from './ThemedText';
const Link = ({
  linkText,
  onPress,
  style = {},
  testID,
  ...textProps
}) => {
  const {
    ColorPalette
  } = useTheme();
  const styles = StyleSheet.create({
    link: {
      color: ColorPalette.brand.link,
      textDecorationLine: 'underline',
      alignSelf: 'flex-start'
    }
  });
  return /*#__PURE__*/React.createElement(ThemedText, _extends({
    style: [styles.link, style],
    accessibilityLabel: linkText,
    accessible: true,
    accessibilityRole: 'link',
    testID: testID ? testID : testIdWithKey(testIdForAccessabilityLabel(linkText)),
    onPress: onPress
  }, textProps), linkText);
};
export default Link;
//# sourceMappingURL=Link.js.map