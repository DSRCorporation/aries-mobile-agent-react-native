import React from 'react';
import { ColorValue, LayoutRectangle } from 'react-native';
import { BackdropPressBehavior, OSConfig, TourStep } from '../../contexts/tour/tour-context';
import { Optional, TourID } from '../../types/tour';
interface TourOverlayProps {
    backdropOpacity: number;
    color: ColorValue;
    currentTour: TourID;
    currentStep: Optional<number>;
    nativeDriver: boolean | OSConfig<boolean>;
    onBackdropPress: Optional<BackdropPressBehavior>;
    changeSpot: (spot: LayoutRectangle) => void;
    spot: LayoutRectangle;
    tourStep: TourStep;
}
export declare const TourOverlay: (props: TourOverlayProps) => React.JSX.Element | null;
export {};
//# sourceMappingURL=TourOverlay.d.ts.map