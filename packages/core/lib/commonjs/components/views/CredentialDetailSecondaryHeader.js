"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _legacy = require("@bifold/oca/build/legacy");
var _reactNative = require("react-native");
var _credential = require("../../utils/credential");
var _testable = require("../../utils/testable");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const logoHeight = 80;
const CredentialDetailSecondaryHeader = ({
  overlay,
  brandingOverlayType = _legacy.BrandingOverlayType.Branding10
}) => {
  var _overlay$brandingOver, _overlay$brandingOver2, _overlay$brandingOver3, _overlay$brandingOver4;
  const styles = _reactNative.StyleSheet.create({
    secondaryHeaderContainer: {
      height: 1.5 * logoHeight,
      backgroundColor: ((_overlay$brandingOver = overlay.brandingOverlay) !== null && _overlay$brandingOver !== void 0 && _overlay$brandingOver.backgroundImage ? 'rgba(0, 0, 0, 0)' : (_overlay$brandingOver2 = overlay.brandingOverlay) === null || _overlay$brandingOver2 === void 0 ? void 0 : _overlay$brandingOver2.secondaryBackgroundColor) ?? 'rgba(0, 0, 0, 0.24)'
    }
  });
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (_overlay$brandingOver3 = overlay.brandingOverlay) !== null && _overlay$brandingOver3 !== void 0 && _overlay$brandingOver3.backgroundImage ? /*#__PURE__*/_react.default.createElement(_reactNative.ImageBackground, {
    source: (0, _credential.toImageSource)((_overlay$brandingOver4 = overlay.brandingOverlay) === null || _overlay$brandingOver4 === void 0 ? void 0 : _overlay$brandingOver4.backgroundImage),
    imageStyle: {
      resizeMode: 'cover'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    testID: (0, _testable.testIdWithKey)('CredentialDetailsSecondaryHeader'),
    style: styles.secondaryHeaderContainer
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    testID: (0, _testable.testIdWithKey)('CredentialDetailsSecondaryHeader'),
    style: styles.secondaryHeaderContainer
  }, brandingOverlayType === _legacy.BrandingOverlayType.Branding11 && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [{
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.24)'
    }]
  })));
};
var _default = exports.default = CredentialDetailSecondaryHeader;
//# sourceMappingURL=CredentialDetailSecondaryHeader.js.map