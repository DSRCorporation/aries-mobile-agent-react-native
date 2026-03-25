import React from 'react';
export declare enum ButtonLocation {
    Left = 0,
    Right = 1
}
interface IconButtonProps {
    buttonLocation: ButtonLocation;
    accessibilityLabel: string;
    testID: string;
    onPress: () => void;
    icon: string;
    text?: string;
    iconTintColor?: string;
}
declare const IconButton: React.FC<IconButtonProps>;
export default IconButton;
//# sourceMappingURL=IconButton.d.ts.map