import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/theme';
const SafeAreaScrollView = ({
  children
}) => {
  const {
    ColorPallet
  } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ColorPallet.brand.primaryBackground
    },
    scrollView: {
      alignItems: 'center'
    }
  });
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(ScrollView, {
    contentContainerStyle: styles.scrollView
  }, children));
};
export default SafeAreaScrollView;
//# sourceMappingURL=SafeAreaScrollView.js.map