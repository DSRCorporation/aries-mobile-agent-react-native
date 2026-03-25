"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SafeAreaModal = ({
  children,
  ...modalProps
}) => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, modalProps, /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaProvider, null, children));
};
var _default = exports.default = SafeAreaModal;
//# sourceMappingURL=SafeAreaModal.js.map