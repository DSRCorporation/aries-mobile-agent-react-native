import React, { ComponentProps } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import { Edges } from 'react-native-safe-area-context';
interface ScreenWrapperProps {
    children: React.ReactNode;
    controls?: React.ReactNode;
    /**
     * Whether to use KeyboardView to handle keyboard interactions
     * @default false
     */
    keyboardActive?: boolean;
    /**
     * Safe area edges to respect
     * @default ['bottom', 'left', 'right']
     */
    edges?: Edges;
    /**
     * Additional style for the container
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Whether to wrap children in a ScrollView
     * @default true
     */
    scrollable?: boolean;
    /**
     * Style for the ScrollView content container
     */
    scrollViewContainerStyle?: ComponentProps<typeof ScrollView>['contentContainerStyle'];
    /**
     * Style for the controls container at the bottom
     */
    controlsContainerStyle?: StyleProp<ViewStyle>;
    /**
     * Apply standard padding (Spacing.md) to content and controls
     * @default true
     */
    padded?: boolean;
}
/**
 * Wraps content in a SafeAreaView and optionally a KeyboardView, and provides a container for controls.
 */
declare const ScreenWrapper: React.FC<ScreenWrapperProps>;
export default ScreenWrapper;
//# sourceMappingURL=ScreenWrapper.d.ts.map