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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const TourProvider = props => {
  const {
    children,
    onBackdropPress,
    overlayColor = 'black',
    overlayOpacity = 0.45,
    tours,
    nativeDriver = false,
    ref
  } = props;
  const [currentTour, setCurrentTour] = (0, _react.useState)(_tour.BaseTourID.HomeTour);
  const [currentStep, setCurrentStep] = (0, _react.useState)();
  const [spot, setSpot] = (0, _react.useState)(_tourContext.ORIGIN_SPOT);
  const renderStep = (0, _react.useCallback)(index => {
    var _tours$currentTour;
    if (((_tours$currentTour = tours[currentTour]) === null || _tours$currentTour === void 0 ? void 0 : _tours$currentTour[index]) !== undefined) {
      setCurrentStep(index);
    }
  }, [currentTour, tours]);
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
    if (currentTour && currentStep !== undefined && tours[currentTour]) {
      currentStep === tours[currentTour].length - 1 ? stop() : renderStep(currentStep + 1);
    }
  }, [stop, renderStep, currentStep, currentTour, tours]);
  const previous = (0, _react.useCallback)(() => {
    if (currentStep !== undefined && currentStep > 0) {
      renderStep(currentStep - 1);
    }
  }, [renderStep, currentStep]);
  const tourStep = (0, _react.useMemo)(() => {
    var _tours$currentTour2;
    return (tours === null || tours === void 0 || (_tours$currentTour2 = tours[currentTour]) === null || _tours$currentTour2 === void 0 ? void 0 : _tours$currentTour2[currentStep ?? 0]) ?? {
      Render: () => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null)
    };
  }, [currentTour, currentStep, tours]);
  const tour = (0, _react.useMemo)(() => ({
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
exports.TourProvider = TourProvider;
//# sourceMappingURL=tour-provider.js.map