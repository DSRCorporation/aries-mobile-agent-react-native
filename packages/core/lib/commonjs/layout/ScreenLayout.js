"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _containerApi = require("../container-api");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultStyles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});
const ScreenLayout = ({
  children,
  screen
}) => {
  //safeArea, customEdges, style, header
  const [screenLayoutOptions] = (0, _containerApi.useServices)([_containerApi.TOKENS.OBJECT_LAYOUT_CONFIG]);
  const screenProps = screenLayoutOptions[screen];
  const {
    safeArea,
    customEdges,
    style,
    Header
  } = screenProps || {
    safeArea: false,
    customEdges: ['top', 'left', 'right', 'bottom'],
    style: {},
    Header: undefined
  };
  const Container = ({
    children
  }) => {
    return safeArea ? /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
      style: [defaultStyles.container, style],
      edges: customEdges || ['top', 'left', 'right', 'bottom']
    }, children) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [defaultStyles.container, style]
    }, children);
  };
  return /*#__PURE__*/_react.default.createElement(Container, null, Header && /*#__PURE__*/_react.default.createElement(Header, null), children);
};
var _default = exports.default = ScreenLayout;
//# sourceMappingURL=ScreenLayout.js.map