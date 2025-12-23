import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { testIdWithKey } from '../../utils/testable';
const EmptyList = ({
  message
}) => {
  const {
    t
  } = useTranslation();
  const {
    ListItems,
    Assets,
    ColorPallet
  } = useTheme();
  return /*#__PURE__*/React.createElement(View, {
    style: {
      paddingTop: 100,
      height: '100%',
      backgroundColor: ColorPallet.brand.primaryBackground
    }
  }, /*#__PURE__*/React.createElement(Assets.svg.emptyWallet, {
    fill: ListItems.emptyList.color,
    height: 100
  }), /*#__PURE__*/React.createElement(Text, {
    style: [ListItems.emptyList, {
      textAlign: 'center'
    }],
    testID: testIdWithKey('NoneYet')
  }, message || t('Global.NoneYet!')));
};
export default EmptyList;
//# sourceMappingURL=EmptyList.js.map