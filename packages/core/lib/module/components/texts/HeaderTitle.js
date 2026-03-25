import React from 'react';
import { ThemedText } from './ThemedText';
// this component is used to create a custom header title that doesn't become oversized
// https://reactnavigation.org/docs/native-stack-navigator#headertitle
const HeaderTitle = ({
  children
}) => {
  return /*#__PURE__*/React.createElement(ThemedText, {
    adjustsFontSizeToFit: true,
    variant: "headerTitle",
    accessibilityRole: "header",
    numberOfLines: 1,
    ellipsizeMode: "tail",
    style: {
      textAlign: 'center'
    }
  }, children);
};
export default HeaderTitle;
//# sourceMappingURL=HeaderTitle.js.map