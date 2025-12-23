import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../contexts/theme';
const UnorderedList = ({
  unorderedListItems
}) => {
  const {
    TextTheme,
    ColorPallet
  } = useTheme();
  return /*#__PURE__*/React.createElement(React.Fragment, null, unorderedListItems.map((item, i) => {
    return /*#__PURE__*/React.createElement(View, {
      key: i,
      style: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5
      }
    }, /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.normal, {
        color: ColorPallet.brand.unorderedList,
        paddingLeft: 5
      }]
    }, `\u2022`), /*#__PURE__*/React.createElement(Text, {
      style: [TextTheme.normal, {
        color: ColorPallet.brand.unorderedList,
        paddingLeft: 5,
        flex: 1
      }]
    }, item));
  }));
};
export default UnorderedList;
//# sourceMappingURL=UnorderedList.js.map