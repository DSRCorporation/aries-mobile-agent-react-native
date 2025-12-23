import React from 'react';
import { TextStyle } from 'react-native';
interface Props {
    title: string;
    titleStyle?: TextStyle;
    accessibilityLabel?: string;
    testID?: string;
    checked: boolean;
    onPress: () => void;
    reverse?: boolean;
}
declare const CheckBoxRow: React.FC<Props>;
export default CheckBoxRow;
//# sourceMappingURL=CheckBoxRow.d.ts.map