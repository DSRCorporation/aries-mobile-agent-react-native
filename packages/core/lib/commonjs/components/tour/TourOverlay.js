"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TourOverlay = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSvg = require("react-native-svg");
var _constants = require("../../constants");
var _tourContext = require("../../contexts/tour/tour-context");
var _testable = require("../../utils/testable");
var _SpotCutout = require("./SpotCutout");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const TourOverlay = props => {
  const {
    width: windowWidth,
    height: windowHeight
  } = (0, _reactNative.useWindowDimensions)();
  const {
    color,
    currentTour,
    currentStep,
    onBackdropPress,
    backdropOpacity,
    changeSpot,
    spot,
    tourStep
  } = props;
  const [viewBox, setViewBox] = (0, _react.useState)(`0 0 ${windowWidth} ${windowHeight}`);
  const {
    next,
    previous,
    start,
    stop
  } = (0, _react.useContext)(_tourContext.TourContext);
  const [tooltipStyle, setTooltipStyle] = (0, _react.useState)({});
  const tooltipRef = (0, _react.useRef)(null);
  const handleBackdropPress = (0, _react.useCallback)(() => {
    const handler = tourStep.onBackdropPress ?? onBackdropPress;
    if (handler !== undefined && currentStep !== undefined) {
      switch (handler) {
        case 'continue':
          return next();
        case 'stop':
          return stop();
        default:
          return handler({
            currentTour,
            currentStep,
            changeSpot,
            next,
            previous,
            start,
            stop
          });
      }
    }
  }, [tourStep, onBackdropPress, currentTour, currentStep, changeSpot, next, previous, start, stop]);
  (0, _react.useEffect)(() => {
    const gapBetweenSpotAndTooltip = 50;
    // if origin spot (ie. no spotlight)
    if (spot.x === 0 && spot.y === 0) {
      // a relative margin so that the tooltip doesn't start at the very top of the screen
      const oneSixthOfScreenHeight = windowHeight / 6;
      setTooltipStyle({
        left: _constants.tourMargin,
        right: _constants.tourMargin,
        top: oneSixthOfScreenHeight
      });
      // if spot is in the lower half of the screen
    } else if (spot.y >= windowHeight / 2) {
      const bottom = windowHeight - spot.y + gapBetweenSpotAndTooltip;
      setTooltipStyle({
        left: _constants.tourMargin,
        right: _constants.tourMargin,
        bottom
      });
      // if spot is in the upper half of the screen
    } else {
      const top = spot.y + gapBetweenSpotAndTooltip + spot.height;
      setTooltipStyle({
        left: _constants.tourMargin,
        right: _constants.tourMargin,
        top
      });
    }
  }, [windowWidth, windowHeight, spot.width, spot.height, spot.x, spot.y]);
  (0, _react.useEffect)(() => {
    // + 1 pixel to account for an svg size rounding issue that would cause
    // a tiny gap around the overlay
    setViewBox(`0 0 ${windowWidth + 1} ${windowHeight + 1}`);
  }, [windowWidth, windowHeight]);
  return currentStep !== undefined ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    accessibilityViewIsModal: true,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: windowHeight + 1,
      width: windowWidth + 1
    },
    testID: (0, _testable.testIdWithKey)('SpotlightOverlay')
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Svg, {
    testID: (0, _testable.testIdWithKey)('SpotOverlay'),
    height: windowHeight + 1,
    width: windowWidth + 1,
    viewBox: viewBox,
    onPress: handleBackdropPress,
    shouldRasterizeIOS: true,
    renderToHardwareTextureAndroid: true
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Defs, null, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Mask, {
    id: "mask",
    x: 0,
    y: 0,
    height: windowHeight + 1,
    width: windowWidth + 1
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Rect, {
    height: windowHeight + 1,
    width: windowWidth + 1,
    fill: "#fff"
  }), /*#__PURE__*/_react.default.createElement(_SpotCutout.SpotCutout, null))), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Rect, {
    height: windowHeight + 1,
    width: windowWidth + 1,
    fill: color,
    mask: "url(#mask)",
    opacity: backdropOpacity
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    ref: tooltipRef,
    testID: (0, _testable.testIdWithKey)('SpotTooltip'),
    style: {
      ...tooltipStyle,
      opacity: 1,
      position: 'absolute'
    }
  }, /*#__PURE__*/_react.default.createElement(tourStep.Render, {
    currentTour: currentTour,
    currentStep: currentStep,
    changeSpot: changeSpot,
    next: next,
    previous: previous,
    stop: stop
  }))) : null;
};
exports.TourOverlay = TourOverlay;
//# sourceMappingURL=TourOverlay.js.map