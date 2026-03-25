import { IColorPalette, ITheme } from './theme';
/**
 * DeepPartial is a utility type that recursively makes all properties of a type optional.
 */
export type DeepPartial<T> = T extends object ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : T;
/**
 * ThemeBuilder is a utility class to extend an existing theme with additional properties.
 *
 * @class ThemeBuilder
 */
export declare class ThemeBuilder {
    private _theme;
    private _themeOverrides;
    /**
     * Creates an instance of ThemeBuilder.
     *
     * @param {ITheme} baseTheme - The initial theme object to extend.
     */
    constructor(baseTheme: ITheme);
    /**
     * Extension of the lodash.merge function that merges two objects deeply,
     * while preserving explicit undefined values in the source object.
     *
     * @param {T} target - The target object to merge into.
     * @param {DeepPartial<T>} source - The source object to merge from.
     * @returns {*} {T} Returns the merged object.
     */
    private _merge;
    /**
     * Sets the color pallet for the theme.
     *
     * Note: This method is mostly a convenience method to set the color pallet for the theme.
     * The same can be achieved by directly modifying the theme object using the `withOverrides` method.
     *
     * @param {IColorPalette} colorPalette - The color pallet to set for the theme.
     * @returns {*} {ThemeBuilder} Returns the instance of ThemeBuilder for method chaining.
     */
    setColorPalette(colorPalette: IColorPalette): this;
    /**
     * Overrides properties in the current theme with the provided themeOverrides.
     *
     * Note: This will overwrite existing properties in the current theme with those from the provided themeOverrides.
     *
     * @example
     * new ThemeBuilder({ Buttons: { color: 'purple', size: 'large' }})
     * .withOverrides({ Buttons: { color: 'red' }})
     * .withOverrides({ Buttons: { spacing: 10 }}) // => { Buttons: { color: 'red', size: 'large', spacing: 10 }}
     *
     * @example
     * new ThemeBuilder({ Buttons: { critical: { padding: 10, margin: 0 }}})
     * .withOverrides((theme) => ({
     *  Buttons: { critical: { padding: 0, margin: -1 } },
     * })) // => { Buttons: { critical: { padding: 0, margin: -1 } }}
     *
     * @param {DeepPartial<ITheme> | ((theme: ITheme) => DeepPartial<ITheme>) } themeOverrides A partial theme object to merge with the current theme or a callback function that receives the current theme and returns a partial theme object.
     * @returns {*} {ThemeBuilder} Returns the instance of ThemeBuilder for method chaining.
     */
    withOverrides(themeOverrides: DeepPartial<ITheme> | ((theme: ITheme) => DeepPartial<ITheme>)): this;
    /**
     * Builds and returns the final theme object.
     *
     * @returns {*} {ITheme} Returns the final theme object.
     */
    build(): ITheme;
}
//# sourceMappingURL=theme-builder.d.ts.map