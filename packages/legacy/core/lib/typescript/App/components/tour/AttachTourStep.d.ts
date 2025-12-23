import { ReactElement, ReactNode, RefObject } from 'react';
import { StyleProp } from 'react-native';
import { TourID } from '../../types/tour';
export interface ChildProps<T> {
    children?: ReactNode;
    ref: RefObject<unknown>;
    style: StyleProp<T>;
}
export interface AttachTourStepProps<T> {
    children: ReactElement<ChildProps<T>>;
    /**
     * When `AttachTourStep` wraps a Functional Component, it needs to add an
     * aditional `View` on top of it to be able to measure the layout upon
     * render. This prop allows to define the behavior of the width of such
     * `View`. When set to `false`, it adjusts to its contents, when set to
     * `true`, it stretches out and tries to fill it view.
     *
     * **Note:** This prop has no effect when wrapping native components or
     * componentes created with `React.forwardRef`, which pass the `ref` to
     * another native component.
     *
     * @default false
     */
    fill?: boolean;
    /**
     * The index of the `steps` array to which the step is attatched to.
     */
    index: number;
    /**
     * The id of the tour this step belongs to (ie. home tour or proof request tour or etc.)
     */
    tourID: TourID;
}
/**
 * React functional component used to attach and step to another component by
 * only wrapping it. Use its props to customize the behavior.
 *
 * @param props the component props
 * @returns an AttachTourStep React element
 */
export declare function AttachTourStep<T>({ children, fill, index, tourID }: AttachTourStepProps<T>): ReactElement;
//# sourceMappingURL=AttachTourStep.d.ts.map