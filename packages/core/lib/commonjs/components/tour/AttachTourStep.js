"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttachTourStep = AttachTourStep;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _tourContext = require("../../contexts/tour/tour-context");
var _testable = require("../../utils/testable");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * React functional component used to attach and step to another component by
 * only wrapping it. Use its props to customize the behavior.
 *
 * @param props the component props
 * @returns an AttachTourStep React element
 */
function AttachTourStep({
  children,
  fill = false,
  index,
  tourID
}) {
  var _children$props;
  const {
    currentStep,
    currentTour,
    changeSpot
  } = (0, _react.useContext)(_tourContext.TourContext);
  const {
    width: windowWidth,
    height: windowHeight
  } = (0, _reactNative.useWindowDimensions)();
  const childRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    if (currentTour === tourID && currentStep === index) {
      var _childRef$current;
      (_childRef$current = childRef.current) === null || _childRef$current === void 0 || _childRef$current.measureInWindow((x, y, width, height) => {
        changeSpot({
          height,
          width,
          x,
          y
        });
      });
    }
  }, [currentTour, tourID, currentStep, index, windowWidth, windowHeight, changeSpot]);
  const {
    style,
    ...rest
  } = children.props;
  const childStyle = style ?? {};
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    testID: (0, _testable.testIdWithKey)('AttachTourStep'),
    ref: childRef,
    style: {
      alignSelf: fill ? 'stretch' : 'center',
      ...childStyle
    },
    collapsable: false,
    focusable: false
  }, /*#__PURE__*/(0, _react.cloneElement)(children, rest, (_children$props = children.props) === null || _children$props === void 0 ? void 0 : _children$props.children));
}
//# sourceMappingURL=AttachTourStep.js.map