import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TOKENS, useServices } from '../container-api';
const defaultStyles = StyleSheet.create({
  container: {
    flex: 1
  }
});
const ScreenLayout = ({
  children,
  screen
}) => {
  //safeArea, customEdges, style, header
  const [screenLayoutOptions] = useServices([TOKENS.OBJECT_LAYOUT_CONFIG]);
  const screenProps = screenLayoutOptions[screen];
  const {
    safeArea,
    customEdges,
    style,
    Header
  } = screenProps || {
    safeArea: false,
    customEdges: ['top', 'left', 'right', 'bottom'],
    style: {},
    Header: undefined
  };
  const Container = ({
    children
  }) => {
    return safeArea ? /*#__PURE__*/React.createElement(SafeAreaView, {
      style: [defaultStyles.container, style],
      edges: customEdges || ['top', 'left', 'right', 'bottom']
    }, children) : /*#__PURE__*/React.createElement(View, {
      style: [defaultStyles.container, style]
    }, children);
  };
  return /*#__PURE__*/React.createElement(Container, null, Header && /*#__PURE__*/React.createElement(Header, null), children);
};
export default ScreenLayout;
//# sourceMappingURL=ScreenLayout.js.map