import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useTheme } from './theme';
const NavContainer = ({
  navigationRef,
  children
}) => {
  const {
    NavigationTheme
  } = useTheme();
  return /*#__PURE__*/React.createElement(NavigationContainer, {
    ref: navigationRef,
    theme: NavigationTheme
  }, children);
};
export default NavContainer;
//# sourceMappingURL=navigation.js.map