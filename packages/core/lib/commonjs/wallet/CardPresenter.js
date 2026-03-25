"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Card10Pure = _interopRequireDefault(require("../components/misc/Card10Pure"));
var _Card11Pure = _interopRequireDefault(require("../components/misc/Card11Pure"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const WalletCredentialCard = props => {
  return props.data.brandingType === 'Branding10' ? /*#__PURE__*/_react.default.createElement(_Card11Pure.default, props) : /*#__PURE__*/_react.default.createElement(_Card10Pure.default, props);
};
var _default = exports.default = WalletCredentialCard;
//# sourceMappingURL=CardPresenter.js.map