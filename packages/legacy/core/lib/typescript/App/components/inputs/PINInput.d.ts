import React from 'react';
import { TextInput } from 'react-native';
interface PINInputProps {
    label?: string;
    onPINChanged?: (PIN: string) => void;
    testID?: string;
    accessibilityLabel?: string;
    autoFocus?: boolean;
}
declare const PINInput: React.ForwardRefExoticComponent<PINInputProps & React.RefAttributes<TextInput>>;
export default PINInput;
//# sourceMappingURL=PINInput.d.ts.map