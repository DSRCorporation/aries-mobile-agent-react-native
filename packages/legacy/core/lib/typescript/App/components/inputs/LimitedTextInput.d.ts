import React from 'react';
import { TextInputProps } from 'react-native';
interface Props extends TextInputProps {
    label: string;
    limit: number;
    handleChangeText: (text: string) => void;
}
declare const LimitedTextInput: React.FC<Props>;
export default LimitedTextInput;
//# sourceMappingURL=LimitedTextInput.d.ts.map