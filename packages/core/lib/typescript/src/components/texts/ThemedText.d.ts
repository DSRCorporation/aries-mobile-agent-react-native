import { ITextTheme } from '../../theme';
import { type TextProps } from 'react-native';
import React from 'react';
export type ThemedTextProps = TextProps & {
    variant?: keyof ITextTheme;
};
/**
 *
 * @param {variant} variant - A key of the TextTheme object that is defined in the theme file
 * @param {maxFontSizeMultiplier} maxFontSizeMultiplier - It allows to override the maxFontSizeMultiplier. Default value is 2
 * @param {style} style - It allows to add extra styles to the component in addition to the one coming from the variant option
 * @param {rest} rest - It allows to pass the rest of the props to the Text component
 * @returns
 */
export declare function ThemedText({ variant, maxFontSizeMultiplier, style, ...rest }: ThemedTextProps): React.JSX.Element;
//# sourceMappingURL=ThemedText.d.ts.map