import React from 'react';
import { ScrollViewProps } from 'react-native';
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
declare const KeyboardView: React.FC<{
    children: React.ReactNode;
    scrollViewProps?: ScrollViewProps;
}>;
export default KeyboardView;
//# sourceMappingURL=KeyboardView.d.ts.map