"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _animatedComponents = require("../../contexts/animated-components");
var _theme = require("../../contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const LoadingView = () => {
  const {
    height
  } = (0, _reactNative.useWindowDimensions)();
  const {
    LoadingTheme
  } = (0, _theme.useTheme)();
  const {
    LoadingIndicator
  } = (0, _animatedComponents.useAnimatedComponents)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      minHeight: height,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: LoadingTheme.backgroundColor
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(LoadingIndicator, null));
};
var _default = exports.default = LoadingView;
//# sourceMappingURL=LoadingView.js.map