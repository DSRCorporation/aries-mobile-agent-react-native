function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { useTheme } from '../../contexts/theme';
import { Text } from 'react-native';
import React from 'react';
/**
 *
 * @param {variant} variant - A key of the TextTheme object that is defined in the theme file
 * @param {maxFontSizeMultiplier} maxFontSizeMultiplier - It allows to override the maxFontSizeMultiplier. Default value is 2
 * @param {style} style - It allows to add extra styles to the component in addition to the one coming from the variant option
 * @param {rest} rest - It allows to pass the rest of the props to the Text component
 * @returns
 */
export function ThemedText({
  variant = 'normal',
  maxFontSizeMultiplier,
  style,
  ...rest
}) {
  const {
    TextTheme,
    maxFontSizeMultiplier: maxFontSize
  } = useTheme();
  return /*#__PURE__*/React.createElement(Text, _extends({
    maxFontSizeMultiplier: maxFontSizeMultiplier ?? maxFontSize,
    style: [TextTheme[variant], style]
  }, rest));
}
//# sourceMappingURL=ThemedText.js.map