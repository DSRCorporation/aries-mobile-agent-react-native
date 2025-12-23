/// <reference types="react" />
import { TouchableOpacity } from 'react-native';
export declare enum ButtonType {
    Critical = 0,
    Primary = 1,
    Secondary = 2,
    ModalCritical = 3,
    ModalPrimary = 4,
    ModalSecondary = 5,
    SecondaryCritical = 6
}
export interface ButtonProps extends React.PropsWithChildren {
    title: string;
    buttonType: ButtonType;
    accessibilityLabel?: string;
    testID?: string;
    onPress?: () => void;
    disabled?: boolean;
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
export type Button = React.FC<ButtonProps & React.RefAttributes<TouchableOpacity>>;
//# sourceMappingURL=Button-api.d.ts.map