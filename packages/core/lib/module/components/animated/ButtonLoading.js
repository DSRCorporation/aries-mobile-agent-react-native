import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useTheme } from '../../contexts/theme';
const ButtonLoading = () => {
  const {
    ColorPalette
  } = useTheme();
  return /*#__PURE__*/React.createElement(LoadingSpinner, {
    size: 25,
    color: ColorPalette.brand.icon
  });
};
export default ButtonLoading;
//# sourceMappingURL=ButtonLoading.js.map