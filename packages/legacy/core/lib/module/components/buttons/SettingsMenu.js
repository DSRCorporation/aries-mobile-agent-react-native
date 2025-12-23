import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Screens, Stacks } from '../../types/navigators';
import { testIdWithKey } from '../../utils/testable';
import HeaderButton, { ButtonLocation } from './HeaderButton';
const SettingsMenu = () => {
  const navigation = useNavigation();
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(HeaderButton, {
    buttonLocation: ButtonLocation.Left,
    accessibilityLabel: t('Screens.Settings'),
    testID: testIdWithKey('Settings'),
    onPress: () => navigation.navigate(Stacks.SettingStack, {
      screen: Screens.Settings
    }),
    icon: "menu"
  });
};
export default SettingsMenu;
//# sourceMappingURL=SettingsMenu.js.map