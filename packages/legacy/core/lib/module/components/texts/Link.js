function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { testIdForAccessabilityLabel, testIdWithKey } from '../../utils/testable';
const Link = ({
  linkText,
  onPress,
  style = {},
  testID,
  ...textProps
}) => {
  const {
    TextTheme,
    ColorPallet
  } = useTheme();
  const styles = StyleSheet.create({
    link: {
      ...TextTheme.normal,
      color: ColorPallet.brand.link,
      textDecorationLine: 'underline',
      alignSelf: 'flex-start'
    }
  });
  return /*#__PURE__*/React.createElement(Text, _extends({
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