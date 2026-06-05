function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { useHeaderHeight } from '@react-navigation/elements';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
const useSafeHeaderHeight = () => {
  try {
    return useHeaderHeight();
  } catch {
    return 100;
  }
};

/**
 * A wrapper component that provides keyboard-aware scrolling and safe area handling
 *
 * This component creates a full-screen container with safe area insets and optional
 * keyboard avoidance behavior. It's designed to be used as a top-level wrapper for
 * screen content that may contain input fields or other interactive elements.
 *
 * @param children - The content to render inside the keyboard view
 * @param scrollViewProps - Additional props to pass to the internal KeyboardAwareScrollView component
 */
const KeyboardView = ({
  children,
  scrollViewProps,
  scrollViewRef
}) => {
  const safeHeaderHeight = useSafeHeaderHeight();
  return /*#__PURE__*/React.createElement(KeyboardAvoidingView, {
    style: {
      flex: 1
    },
    keyboardVerticalOffset: safeHeaderHeight,
    behavior: Platform.OS === 'ios' ? 'padding' : undefined
  }, /*#__PURE__*/React.createElement(KeyboardAwareScrollView, _extends({
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: [{
      flexGrow: 1
    }, scrollViewProps === null || scrollViewProps === void 0 ? void 0 : scrollViewProps.contentContainerStyle],
    showsVerticalScrollIndicator: false,
    ref: scrollViewRef
  }, scrollViewProps), children));
};
export default KeyboardView;
//# sourceMappingURL=KeyboardView.js.map