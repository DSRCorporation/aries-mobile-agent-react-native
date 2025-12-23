import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { InfoBoxType } from '../misc/InfoBox';
export interface TextBoxProps {
    children: React.ReactElement | string;
    type?: InfoBoxType;
    iconVerticalPosition?: 'high' | 'middle';
    iconHorizontalPosition?: 'left' | 'right';
    style?: ViewStyle;
    textStyle?: TextStyle;
}
declare const InfoTextBox: React.FC<TextBoxProps>;
export default InfoTextBox;
//# sourceMappingURL=InfoTextBox.d.ts.map