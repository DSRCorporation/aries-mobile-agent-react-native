import React from 'react';
import { TextStyle, TextProps } from 'react-native';
interface LinkProps {
    linkText: string;
    style?: TextStyle;
    textProps?: TextProps;
    onPress: () => void;
    testID?: string;
}
declare const Link: React.FC<LinkProps>;
export default Link;
//# sourceMappingURL=Link.d.ts.map