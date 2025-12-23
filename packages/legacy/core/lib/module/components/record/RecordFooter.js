import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../contexts/theme';
const RecordFooter = ({
  children
}) => {
  const {
    ColorPallet
  } = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: ColorPallet.brand.primaryBackground,
      height: '100%'
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, children);
};
export default RecordFooter;
//# sourceMappingURL=RecordFooter.js.map