import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../contexts/theme';
const RecordHeader = ({
  children
}) => {
  const {
    ColorPallet
  } = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: ColorPallet.brand.primaryBackground
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, children);
};
export default RecordHeader;
//# sourceMappingURL=RecordHeader.js.map