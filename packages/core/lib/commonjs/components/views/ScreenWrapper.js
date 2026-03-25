"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _KeyboardView = _interopRequireDefault(require("./KeyboardView"));
var _theme = require("../../contexts/theme");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Wraps content in a SafeAreaView and optionally a KeyboardView, and provides a container for controls.
 */
const ScreenWrapper = ({
  children,
  controls,
  keyboardActive = false,
  edges = ['bottom', 'left', 'right'],
  style,
  scrollable = true,
  scrollViewContainerStyle,
  controlsContainerStyle,
  padded = true
}) => {
  const {
    Spacing,
    ColorPalette
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ColorPalette.brand.primaryBackground
    }
  });

  // Build scroll content style
  const scrollStyle = [padded && {
    padding: Spacing.md
  }, scrollViewContainerStyle];

  // Build controls style with automatic gap between buttons
  const controlsStyle = [{
    gap: Spacing.md
  }, padded && {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md
  }, controlsContainerStyle];
  const renderScrollableContent = () => {
    if (!scrollable) {
      return children;
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      showsVerticalScrollIndicator: false,
      contentContainerStyle: scrollStyle
    }, children);
  };

  // KeyboardView uses KeyboardAwareScrollView from react-native-keyboard-controller
  // which handles both keyboard avoidance and scrolling
  if (keyboardActive) {
    return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
      style: [styles.container, style],
      edges: edges
    }, /*#__PURE__*/_react.default.createElement(_KeyboardView.default, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: scrollStyle
    }, children), controls && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [controlsStyle, {
        marginTop: 'auto'
      }]
    }, controls)));
  }
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: [styles.container, style],
    edges: edges
  }, renderScrollableContent(), controls && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: controlsStyle
  }, controls));
};
var _default = exports.default = ScreenWrapper;
//# sourceMappingURL=ScreenWrapper.js.map