import { ReactElement, ReactNode } from 'react';
import { RenderProps } from '../../contexts/tour/tour-context';
export interface TourBoxProps extends RenderProps {
    children?: ReactNode;
    /**
     * Optionally hide the left button
     */
    hideLeft?: boolean;
    /**
     * Optionally hide the right button
     */
    hideRight?: boolean;
    /**
     * Text for the left button
     */
    leftText?: string;
    /**
     * Text for the right button
     */
    rightText?: string;
    /**
     * Callback for when the left button is pressed.
     */
    onLeft?: () => void;
    /**
     * Callback for when the right button is pressed.
     */
    onRight?: () => void;
    title?: string;
    /**
     * The 1-indexed step it is on
     */
    stepOn?: number;
    /**
     * The 1-indexed number of steps in the current tour
     */
    stepsOutOf?: number;
}
/**
 * A built-in TourBox component which can be used as a tooltip container for
 * each step. While it's somewhat customizable, it's not required and can be
 * replaced by your own component.
 *
 * @param props the component props
 * @returns A TourBox React element
 */
export declare function TourBox(props: TourBoxProps): ReactElement;
//# sourceMappingURL=TourBox.d.ts.map