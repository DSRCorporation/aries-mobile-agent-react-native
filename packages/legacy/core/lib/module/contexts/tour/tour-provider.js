import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import { TourOverlay } from '../../components/tour/TourOverlay';
import { TourID } from '../../types/tour';
import { isChildFunction } from '../../utils/helpers';
import { TourContext, ORIGIN_SPOT } from './tour-context';
const TourProviderComponent = (props, ref) => {
  const {
    children,
    onBackdropPress,
    overlayColor = 'black',
    overlayOpacity = 0.45,
    homeTourSteps,
    credentialsTourSteps,
    credentialOfferTourSteps,
    proofRequestTourSteps,
    nativeDriver = false
  } = props;
  const [currentTour, setCurrentTour] = useState(TourID.HomeTour);
  const [currentStep, setCurrentStep] = useState();
  const [spot, setSpot] = useState(ORIGIN_SPOT);
  const renderStep = useCallback(index => {
    if (currentTour === TourID.HomeTour && homeTourSteps[index] !== undefined || currentTour === TourID.CredentialsTour && credentialsTourSteps[index] !== undefined || currentTour === TourID.CredentialOfferTour && credentialOfferTourSteps[index] !== undefined || currentTour === TourID.ProofRequestTour && proofRequestTourSteps[index] !== undefined) {
      setCurrentStep(index);
    }
  }, [currentTour, homeTourSteps, credentialsTourSteps, credentialOfferTourSteps, proofRequestTourSteps]);
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
    let steps = homeTourSteps;
    if (currentTour === TourID.CredentialsTour) {
      steps = credentialsTourSteps;
    } else if (currentTour === TourID.CredentialOfferTour) {
      steps = credentialOfferTourSteps;
    } else if (currentTour === TourID.ProofRequestTour) {
      steps = proofRequestTourSteps;
    }
    if (currentStep !== undefined) {
      currentStep === steps.length - 1 ? stop() : renderStep(currentStep + 1);
    }
  }, [stop, renderStep, currentStep, currentTour, homeTourSteps, credentialsTourSteps, credentialOfferTourSteps, proofRequestTourSteps]);

  // works the same regardless of which tour is on
  const previous = useCallback(() => {
    if (currentStep !== undefined && currentStep > 0) {
      renderStep(currentStep - 1);
    }
  }, [renderStep, currentStep]);
  const tourStep = useMemo(() => {
    let stepToRender = undefined;
    let steps = homeTourSteps;
    if (currentTour === TourID.CredentialsTour) {
      steps = credentialsTourSteps;
    } else if (currentTour === TourID.CredentialOfferTour) {
      steps = credentialOfferTourSteps;
    } else if (currentTour === TourID.ProofRequestTour) {
      steps = proofRequestTourSteps;
    }
    stepToRender = currentStep !== undefined ? steps[currentStep] : undefined;
    return stepToRender ?? {
      Render: () => /*#__PURE__*/React.createElement(React.Fragment, null)
    };
  }, [homeTourSteps, credentialsTourSteps, credentialOfferTourSteps, proofRequestTourSteps, currentStep]);
  const tour = useMemo(() => ({
    changeSpot,
    currentTour,
    currentStep,
    next,
    previous,
    spot,
    start,
    stop,
    homeTourSteps,
    credentialsTourSteps,
    credentialOfferTourSteps,
    proofRequestTourSteps
  }), [changeSpot, currentTour, currentStep, next, previous, spot, start, stop, homeTourSteps, credentialsTourSteps, credentialOfferTourSteps, proofRequestTourSteps]);
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
export const TourProvider = /*#__PURE__*/forwardRef(TourProviderComponent);
//# sourceMappingURL=tour-provider.js.map