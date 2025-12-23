"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttachTourStep = AttachTourStep;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _tourContext = require("../../contexts/tour/tour-context");
var _testable = require("../../utils/testable");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  }, [windowWidth, windowHeight, changeSpot, currentTour, currentStep, index]);
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