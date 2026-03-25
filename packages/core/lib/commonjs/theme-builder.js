"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeBuilder = void 0;
var _theme = require("./theme");
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * DeepPartial is a utility type that recursively makes all properties of a type optional.
 */

/**
 * ThemeBuilder is a utility class to extend an existing theme with additional properties.
 *
 * @class ThemeBuilder
 */
class ThemeBuilder {
  /**
   * Creates an instance of ThemeBuilder.
   *
   * @param {ITheme} baseTheme - The initial theme object to extend.
   */
  constructor(baseTheme) {
    this._theme = baseTheme;
    this._themeOverrides = {};
  }

  /**
   * Extension of the lodash.merge function that merges two objects deeply,
   * while preserving explicit undefined values in the source object.
   *
   * @param {T} target - The target object to merge into.
   * @param {DeepPartial<T>} source - The source object to merge from.
   * @returns {*} {T} Returns the merged object.
   */
  _merge(target, source) {
    // note: without the empty object, lodash.merge will mutate the original theme overrides,
    // and not properly update the nested properties
    return _lodash.default.mergeWith({}, target, source, (objValue, srcValue, key, obj) => {
      // If source explicitly sets the value to undefined, keep it as undefined
      if (objValue !== srcValue && typeof srcValue === 'undefined') {
        obj[key] = undefined;
      }
    });
  }

  /**
   * Sets the color pallet for the theme.
   *
   * Note: This method is mostly a convenience method to set the color pallet for the theme.
   * The same can be achieved by directly modifying the theme object using the `withOverrides` method.
   *
   * @param {IColorPalette} colorPalette - The color pallet to set for the theme.
   * @returns {*} {ThemeBuilder} Returns the instance of ThemeBuilder for method chaining.
   */
  setColorPalette(colorPalette) {
    this.withOverrides({
      ColorPalette: colorPalette
    });
    return this;
  }

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
  withOverrides(themeOverrides) {
    const resolvedOverrides = typeof themeOverrides === 'function' ? themeOverrides(this._theme) : themeOverrides;
    this._themeOverrides = this._merge(this._themeOverrides, resolvedOverrides);

    // Rebuild the theme with the new overrides so following chained calls will use the updated theme.
    this._theme = this.build();

    // Return the instance for method chaining
    return this;
  }

  /**
   * Builds and returns the final theme object.
   *
   * @returns {*} {ITheme} Returns the final theme object.
   */
  build() {
    // Step 1. Merge the theme overrides onto the original theme, producing the new base theme.
    const baseTheme = this._merge(this._theme, this._themeOverrides);
    if (_lodash.default.isEqual(baseTheme, this._theme)) {
      // If the base theme is equal to the current theme, return the current theme
      // This avoids unnecessary recomputation of dependent themes
      return this._theme;
    }

    // Step 2. Generate computed properties that depend on the base theme
    const dependentThemes = {
      TextTheme: (0, _theme.createTextTheme)(baseTheme),
      InputInlineMessage: (0, _theme.createInputInlineMessageTheme)(baseTheme),
      Inputs: (0, _theme.createInputsTheme)(baseTheme),
      Buttons: (0, _theme.createButtonsTheme)(baseTheme),
      ListItems: (0, _theme.createListItemsTheme)(baseTheme),
      TabTheme: (0, _theme.createTabTheme)(baseTheme),
      NavigationTheme: (0, _theme.createNavigationTheme)(baseTheme),
      HomeTheme: (0, _theme.createHomeTheme)(baseTheme),
      SettingsTheme: (0, _theme.createSettingsTheme)(baseTheme),
      ChatTheme: (0, _theme.createChatTheme)(baseTheme),
      OnboardingTheme: (0, _theme.createOnboardingTheme)(baseTheme),
      DialogTheme: (0, _theme.createDialogTheme)(baseTheme),
      LoadingTheme: (0, _theme.createLoadingTheme)(baseTheme),
      PINInputTheme: (0, _theme.createPINInputTheme)(baseTheme)
    };

    /**
     * Step 3. Merge all together - base + generated + overrides
     *
     * Why do we apply the overrides after the dependent themes?
     * Because the `dependentThemes` contain additional properties that may have
     * been modified by the overrides previously.
     */
    const newBaseTheme = this._merge(baseTheme, dependentThemes);
    this._theme = this._merge(newBaseTheme, this._themeOverrides);
    return this._theme;
  }
}
exports.ThemeBuilder = ThemeBuilder;
//# sourceMappingURL=theme-builder.js.map