import React from 'react';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
type Props = {
    containerStyle: ViewStyle | ViewStyle[];
    logo?: string;
    logoHeight: number;
    elevated?: boolean;
    letter: string;
    letterVariant: 'bold' | 'title';
    letterStyle?: TextStyle | TextStyle[];
    letterColor?: string;
    imageBorderRadius?: number;
    imageStyle?: ImageStyle | ImageStyle[];
    showTestIds?: boolean;
};
declare const LogoOrLetter: React.FC<Props>;
export default LogoOrLetter;
//# sourceMappingURL=LogoOrLetter.d.ts.map