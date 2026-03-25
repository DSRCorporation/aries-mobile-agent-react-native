import React from 'react';
import { TextInputProps } from 'react-native';
interface LimitedTextInputProps extends TextInputProps {
    showLimitCounter?: boolean;
    label: string;
    limit: number;
    handleChangeText: (text: string) => void;
}
declare const LimitedTextInput: React.FC<LimitedTextInputProps>;
export default LimitedTextInput;
//# sourceMappingURL=LimitedTextInput.d.ts.map