"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TourContext = exports.ORIGIN_SPOT = void 0;
exports.useTour = useTour;
var _react = require("react");
var _tour = require("../../types/tour");
const ORIGIN_SPOT = exports.ORIGIN_SPOT = {
  height: 0,
  width: 0,
  x: 0,
  y: 0
};
const TourContext = exports.TourContext = /*#__PURE__*/(0, _react.createContext)({
  currentTour: _tour.TourID.HomeTour,
  currentStep: undefined,
  changeSpot: () => undefined,
  next: () => undefined,
  previous: () => undefined,
  spot: ORIGIN_SPOT,
  start: () => undefined,
  homeTourSteps: [],
  credentialsTourSteps: [],
  credentialOfferTourSteps: [],
  proofRequestTourSteps: [],
  stop: () => undefined
});

/**
 * React hook to access the {@link Tour} context.
 *
 * @returns the Tour context
 */
function useTour() {
  const {
    currentTour,
    currentStep,
    changeSpot,
    next,
    previous,
    start,
    stop
  } = (0, _react.useContext)(TourContext);
  return {
    currentTour,
    currentStep,
    changeSpot,
    next,
    previous,
    start,
    stop
  };
}
//# sourceMappingURL=tour-context.js.map