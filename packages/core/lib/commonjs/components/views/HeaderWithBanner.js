"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _stack = require("@react-navigation/stack");
var _containerApi = require("../../container-api");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const HeaderWithBanner = props => {
  const [NotificationBanner] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMPONENT_NOTIFICATION_BANNER]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_stack.Header, props), /*#__PURE__*/_react.default.createElement(NotificationBanner, null));
};
var _default = exports.default = HeaderWithBanner;
//# sourceMappingURL=HeaderWithBanner.js.map