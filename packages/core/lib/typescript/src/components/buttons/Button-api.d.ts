import React from 'react';
import { View } from 'react-native';
export declare enum ButtonType {
    Critical = 0,
    Primary = 1,
    Secondary = 2,
    Tertiary = 3,
    ModalCritical = 4,
    ModalPrimary = 5,
    ModalSecondary = 6,
    SecondaryCritical = 7,
    ModalTertiary = 8
}
export interface ButtonProps extends React.PropsWithChildren {
    title: string;
    buttonType: ButtonType;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    maxfontSizeMultiplier?: number;
    testID?: string;
    onPress?: (...args: any[]) => void;
    disabled?: boolean;
    ref?: React.Ref<View>;
}
export declare enum ButtonState {
    Default = "default",
    Disabled = "disabled",
    Active = "active"
}
export declare enum ButtonStyleNames {
    Critical_Default = "Critical_default",
    Critical_Disabled = "Critical_disabled",
    Critical_Active = "Critical_active"
}
export type Button = React.FC<ButtonProps>;
//# sourceMappingURL=Button-api.d.ts.map