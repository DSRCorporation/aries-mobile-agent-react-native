"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TourProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _TourOverlay = require("../../components/tour/TourOverlay");
var _tour = require("../../types/tour");
var _helpers = require("../../utils/helpers");
var _tourContext = require("./tour-context");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  const [currentTour, setCurrentTour] = (0, _react.useState)(_tour.TourID.HomeTour);
  const [currentStep, setCurrentStep] = (0, _react.useState)();
  const [spot, setSpot] = (0, _react.useState)(_tourContext.ORIGIN_SPOT);
  const renderStep = (0, _react.useCallback)(index => {
    if (currentTour === _tour.TourID.HomeTour && homeTourSteps[index] !== undefined || currentTour === _tour.TourID.CredentialsTour && credentialsTourSteps[index] !== undefined || currentTour === _tour.TourID.CredentialOfferTour && credentialOfferTourSteps[index] !== undefined || currentTour === _tour.TourID.ProofRequestTour && proofRequestTourSteps[index] !== undefined) {
      setCurrentStep(index);
    }
  }, [currentTour, homeTourSteps, credentialsTourSteps, credentialOfferTourSteps, proofRequestTourSteps]);
  const changeSpot = (0, _react.useCallback)(newSpot => {
    setSpot(newSpot);
  }, []);
  const start = (0, _react.useCallback)(tourId => {
    setCurrentTour(tourId);
    renderStep(0);
  }, [renderStep]);
  const stop = (0, _react.useCallback)(() => {
    setCurrentStep(undefined);
    setSpot(_tourContext.ORIGIN_SPOT);
  }, []);
  const next = (0, _react.useCallback)(() => {
    let steps = homeTourSteps;
    if (currentTour === _tour.TourID.CredentialsTour) {
      steps = credentialsTourSteps;
    } else if (currentTour === _tour.TourID.CredentialOfferTour) {
      steps = credentialOfferTourSteps;
    } else if (currentTour === _tour.TourID.ProofRequestTour) {
      steps = proofRequestTourSteps;
    }
    if (currentStep !== undefined) {
      currentStep === steps.length - 1 ? stop() : renderStep(currentStep + 1);
    }
  }, [stop, renderStep, currentStep, currentTour, homeTourSteps, credentialsTourSteps, credentialOfferTourSteps, proofRequestTourSteps]);

  // works the same regardless of which tour is on
  const previous = (0, _react.useCallback)(() => {
    if (currentStep !== undefined && currentStep > 0) {
      renderStep(currentStep - 1);
    }
  }, [renderStep, currentStep]);
  const tourStep = (0, _react.useMemo)(() => {
    let stepToRender = undefined;
    let steps = homeTourSteps;
    if (currentTour === _tour.TourID.CredentialsTour) {
      steps = credentialsTourSteps;
    } else if (currentTour === _tour.TourID.CredentialOfferTour) {
      steps = credentialOfferTourSteps;
    } else if (currentTour === _tour.TourID.ProofRequestTour) {
      steps = proofRequestTourSteps;
    }
    stepToRender = currentStep !== undefined ? steps[currentStep] : undefined;
    return stepToRender ?? {
      Render: () => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null)
    };
  }, [homeTourSteps, credentialsTourSteps, credentialOfferTourSteps, proofRequestTourSteps, currentStep]);
  const tour = (0, _react.useMemo)(() => ({
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
  (0, _react.useImperativeHandle)(ref, () => ({
    currentTour,
    currentStep,
    changeSpot,
    next,
    previous,
    start,
    stop
  }));
  return /*#__PURE__*/_react.default.createElement(_tourContext.TourContext.Provider, {
    value: tour
  }, (0, _helpers.isChildFunction)(children) ? /*#__PURE__*/_react.default.createElement(_tourContext.TourContext.Consumer, null, children) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children), /*#__PURE__*/_react.default.createElement(_TourOverlay.TourOverlay, {
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
const TourProvider = exports.TourProvider = /*#__PURE__*/(0, _react.forwardRef)(TourProviderComponent);
//# sourceMappingURL=tour-provider.js.map