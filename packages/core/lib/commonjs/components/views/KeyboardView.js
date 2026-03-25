"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeKeyboardController = require("react-native-keyboard-controller");
var _elements = require("@react-navigation/elements");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const useSafeHeaderHeight = () => {
  try {
    return (0, _elements.useHeaderHeight)();
  } catch {
    return 100;
  }
};

/**
 * A wrapper component that provides keyboard-aware scrolling and safe area handling
 *
 * This component creates a full-screen container with safe area insets and optional
 * keyboard avoidance behavior. It's designed to be used as a top-level wrapper for
 * screen content that may contain input fields or other interactive elements.
 *
 * @param children - The content to render inside the keyboard view
 * @param scrollViewProps - Additional props to pass to the internal KeyboardAwareScrollView component
 */
const KeyboardView = ({
  children,
  scrollViewProps
}) => {
  const safeHeaderHeight = useSafeHeaderHeight();
  return /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
    style: {
      flex: 1
    },
    keyboardVerticalOffset: safeHeaderHeight,
    behavior: _reactNative.Platform.OS === 'ios' ? 'padding' : undefined
  }, /*#__PURE__*/_react.default.createElement(_reactNativeKeyboardController.KeyboardAwareScrollView, _extends({
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: [{
      flexGrow: 1
    }, scrollViewProps === null || scrollViewProps === void 0 ? void 0 : scrollViewProps.contentContainerStyle],
    showsVerticalScrollIndicator: false
  }, scrollViewProps), children));
};
var _default = exports.default = KeyboardView;
//# sourceMappingURL=KeyboardView.js.map