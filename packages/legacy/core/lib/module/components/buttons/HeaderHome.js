import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Screens, TabStacks } from '../../types/navigators';
import { testIdWithKey } from '../../utils/testable';
import HeaderButton, { ButtonLocation } from './HeaderButton';
const HeaderRightHome = () => {
  const {
    t
  } = useTranslation();
  const navigation = useNavigation();
  return /*#__PURE__*/React.createElement(HeaderButton, {
    buttonLocation: ButtonLocation.Right,
    accessibilityLabel: t('Global.Home'),
    testID: testIdWithKey('HomeButton'),
    onPress: () => {
      var _navigation$getParent;
      return (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 ? void 0 : _navigation$getParent.navigate(TabStacks.HomeStack, {
        screen: Screens.Home
      });
    },
    icon: "home"
  });
};
export default HeaderRightHome;
//# sourceMappingURL=HeaderHome.js.map