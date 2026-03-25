import React, { useCallback, useImperativeHandle, useMemo, useState } from 'react';
import { TourOverlay } from '../../components/tour/TourOverlay';
import { BaseTourID } from '../../types/tour';
import { isChildFunction } from '../../utils/helpers';
import { TourContext, ORIGIN_SPOT } from './tour-context';
export const TourProvider = props => {
  const {
    children,
    onBackdropPress,
    overlayColor = 'black',
    overlayOpacity = 0.45,
    tours,
    nativeDriver = false,
    ref
  } = props;
  const [currentTour, setCurrentTour] = useState(BaseTourID.HomeTour);
  const [currentStep, setCurrentStep] = useState();
  const [spot, setSpot] = useState(ORIGIN_SPOT);
  const renderStep = useCallback(index => {
    var _tours$currentTour;
    if (((_tours$currentTour = tours[currentTour]) === null || _tours$currentTour === void 0 ? void 0 : _tours$currentTour[index]) !== undefined) {
      setCurrentStep(index);
    }
  }, [currentTour, tours]);
  const changeSpot = useCallback(newSpot => {
    setSpot(newSpot);
  }, []);
  const start = useCallback(tourId => {
    setCurrentTour(tourId);
    renderStep(0);
  }, [renderStep]);
  const stop = useCallback(() => {
    setCurrentStep(undefined);
    setSpot(ORIGIN_SPOT);
  }, []);
  const next = useCallback(() => {
    if (currentTour && currentStep !== undefined && tours[currentTour]) {
      currentStep === tours[currentTour].length - 1 ? stop() : renderStep(currentStep + 1);
    }
  }, [stop, renderStep, currentStep, currentTour, tours]);
  const previous = useCallback(() => {
    if (currentStep !== undefined && currentStep > 0) {
      renderStep(currentStep - 1);
    }
  }, [renderStep, currentStep]);
  const tourStep = useMemo(() => {
    var _tours$currentTour2;
    return (tours === null || tours === void 0 || (_tours$currentTour2 = tours[currentTour]) === null || _tours$currentTour2 === void 0 ? void 0 : _tours$currentTour2[currentStep ?? 0]) ?? {
      Render: () => /*#__PURE__*/React.createElement(React.Fragment, null)
    };
  }, [currentTour, currentStep, tours]);
  const tour = useMemo(() => ({
    changeSpot,
    currentTour,
    currentStep,
    next,
    previous,
    spot,
    start,
    stop,
    tours
  }), [changeSpot, currentTour, currentStep, next, previous, spot, start, stop, tours]);
  useImperativeHandle(ref, () => ({
    currentTour,
    currentStep,
    changeSpot,
    next,
    previous,
    start,
    stop
  }));
  return /*#__PURE__*/React.createElement(TourContext.Provider, {
    value: tour
  }, isChildFunction(children) ? /*#__PURE__*/React.createElement(TourContext.Consumer, null, children) : /*#__PURE__*/React.createElement(React.Fragment, null, children), /*#__PURE__*/React.createElement(TourOverlay, {
    color: overlayColor,
    currentStep: currentStep,
    currentTour: currentTour,
    changeSpot: changeSpot,
    backdropOpacity: overlayOpacity,
    onBackdropPress: onBackdropPress,
    spot: spot,
    tourStep: tourStep,
    nativeDriver: nativeDriver
  }));
};
//# sourceMappingURL=tour-provider.js.map