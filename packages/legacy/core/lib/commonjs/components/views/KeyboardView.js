"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const KeyboardView = ({
  children
}) => {
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      flex: 1
    },
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
    style: {
      flex: 1
    }
    // below property is the distance to account for between the top of the screen and the top of the view. It is at most 100 with max zoom + font settings
    ,
    keyboardVerticalOffset: 100,
    behavior: _reactNative.Platform.OS === 'ios' ? 'padding' : 'height'
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    contentContainerStyle: {
      flexGrow: 1
    },
    keyboardShouldPersistTaps: 'handled'
  }, children)));
};
var _default = exports.default = KeyboardView;
//# sourceMappingURL=KeyboardView.js.map