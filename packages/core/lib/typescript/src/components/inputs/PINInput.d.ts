import React from 'react';
import { TextInput } from 'react-native';
import { InlineMessageProps } from './InlineErrorText';
interface PINInputProps {
    label?: string;
    onPINChanged?: (PIN: string) => void;
    testID?: string;
    accessibilityLabel?: string;
    autoFocus?: boolean;
    inlineMessage?: InlineMessageProps;
    onSubmitEditing?: (...args: any[]) => void;
    ref?: React.Ref<TextInput>;
}
declare const PINInput: ({ label, onPINChanged, testID, accessibilityLabel, autoFocus, inlineMessage, onSubmitEditing, ref, }: PINInputProps) => React.JSX.Element;
export default PINInput;
//# sourceMappingURL=PINInput.d.ts.map