import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { ThemedText } from '../texts/ThemedText';
const UnorderedList = ({
  unorderedListItems
}) => {
  const {
    ColorPalette
  } = useTheme();
  return /*#__PURE__*/React.createElement(React.Fragment, null, unorderedListItems.map((item, i) => {
    return /*#__PURE__*/React.createElement(View, {
      key: i,
      style: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5
      }
    }, /*#__PURE__*/React.createElement(ThemedText, {
      style: {
        color: ColorPalette.brand.unorderedList,
        paddingLeft: 5
      }
    }, `\u2022`), /*#__PURE__*/React.createElement(ThemedText, {
      style: {
        color: ColorPalette.brand.unorderedList,
        paddingLeft: 5,
        flex: 1
      }
    }, item));
  }));
};
export default UnorderedList;
//# sourceMappingURL=UnorderedList.js.map