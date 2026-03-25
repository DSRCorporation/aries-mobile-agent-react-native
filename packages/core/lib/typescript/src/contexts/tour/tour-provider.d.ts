import React from 'react';
import { ColorValue } from 'react-native';
import { ChildFn } from '../../types/tour';
import { BackdropPressBehavior, OSConfig, Tour, Tours } from './tour-context';
export interface TourProviderProps {
    children: React.ReactNode | ChildFn<Tour>;
    /**
     * Define if the animations in the tour should use the native driver or not.
     * A boolean can be used to apply the same value to both Android and iOS, or
     * an object with `android` and `ios` keys can be used to define a value for
     * each OS.
     *
     * @default false
     */
    nativeDriver?: boolean | OSConfig<boolean>;
    /**
     * Sets the default behavior of pressing the tour's backdrop. You can use
     * either one of the following values:
     * - A callback function with the {@link Tour} options object in the
     * first argument. This allows more franular control over the tour.
     * - The `continue` literal string, which is a shortcut to move to the next
     * step, and stop the tour on the last step.
     * - the `stop` literal string, which is a shortcut to stop the tour.
     *
     * **NOTE:** You can also override this behavior on each step configuration.
     */
    onBackdropPress?: BackdropPressBehavior;
    /**
     * The color of the overlay of the tour.
     *
     * @default black
     */
    overlayColor?: ColorValue;
    /**
     * The opacity applied to the overlay of the tour (between 0 to 1).
     *
     * @default 0.45
     */
    overlayOpacity?: number;
    /**
     * The list of steps for the home tour.
     */
    tours: Tours;
    ref?: React.Ref<Tour>;
}
export declare const TourProvider: (props: TourProviderProps) => React.JSX.Element;
//# sourceMappingURL=tour-provider.d.ts.map