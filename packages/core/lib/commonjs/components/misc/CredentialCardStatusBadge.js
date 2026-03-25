"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _testable = require("../../utils/testable");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CredentialCardStatusBadge = ({
  status,
  logoHeight,
  containerStyle,
  errorBg = '#FDECEA',
  warnBg = '#FFF8E1'
}) => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    testID: (0, _testable.testIdWithKey)('CredentialCardStatus'),
    style: [containerStyle, {
      position: 'absolute',
      right: 0,
      top: 0
    }]
  }, status ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [containerStyle, {
      backgroundColor: status === 'error' ? errorBg : warnBg
    }]
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    size: 0.7 * logoHeight,
    name: status
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: containerStyle
  }));
};
var _default = exports.default = CredentialCardStatusBadge;
//# sourceMappingURL=CredentialCardStatusBadge.js.map