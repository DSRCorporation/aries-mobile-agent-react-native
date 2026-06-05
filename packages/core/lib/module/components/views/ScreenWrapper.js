import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/theme';
import KeyboardView from './KeyboardView';
/**
 * Wraps content in a SafeAreaView and optionally a KeyboardView, and provides a container for controls.
 */
const ScreenWrapper = ({
  children,
  controls,
  keyboardActive = false,
  edges = ['bottom', 'left', 'right'],
  style,
  scrollable = true,
  scrollViewContainerStyle,
  controlsContainerStyle,
  padded = true,
  scrollViewRef
}) => {
  const {
    Spacing,
    ColorPalette
  } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ColorPalette.brand.primaryBackground
    }
  });

  // Build scroll content style
  const scrollStyle = [padded && {
    padding: Spacing.md
  }, scrollViewContainerStyle];

  // Build controls style with automatic gap between buttons
  const controlsStyle = [{
    gap: Spacing.md
  }, padded && {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md
  }, controlsContainerStyle];
  const renderScrollableContent = () => {
    if (!scrollable) {
      return children;
    }
    return /*#__PURE__*/React.createElement(ScrollView, {
      showsVerticalScrollIndicator: false,
      contentContainerStyle: scrollStyle,
      ref: scrollViewRef
    }, children);
  };

  // KeyboardView uses KeyboardAwareScrollView from react-native-keyboard-controller
  // which handles both keyboard avoidance and scrolling
  if (keyboardActive) {
    return /*#__PURE__*/React.createElement(SafeAreaView, {
      style: [styles.container, style],
      edges: edges
    }, /*#__PURE__*/React.createElement(KeyboardView, {
      scrollViewRef: scrollViewRef
    }, /*#__PURE__*/React.createElement(View, {
      style: scrollStyle
    }, children), controls && /*#__PURE__*/React.createElement(View, {
      style: [controlsStyle, {
        marginTop: 'auto'
      }]
    }, controls)));
  }
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: [styles.container, style],
    edges: edges
  }, renderScrollableContent(), controls && /*#__PURE__*/React.createElement(View, {
    style: controlsStyle
  }, controls));
};
export default ScreenWrapper;
//# sourceMappingURL=ScreenWrapper.js.map