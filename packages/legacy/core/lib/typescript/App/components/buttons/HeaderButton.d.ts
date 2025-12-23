import React from 'react';
export declare enum ButtonLocation {
    Left = 0,
    Right = 1
}
interface HeaderButtonProps {
    buttonLocation: ButtonLocation;
    accessibilityLabel: string;
    testID: string;
    onPress: () => void;
    icon: string;
    text?: string;
    iconTintColor?: string;
}
declare const HeaderButton: React.FC<HeaderButtonProps>;
export default HeaderButton;
//# sourceMappingURL=HeaderButton.d.ts.map