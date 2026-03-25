"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _ThemedText = require("../texts/ThemedText");
var _testable = require("../../utils/testable");
var _credential = require("../../utils/credential");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const LogoOrLetter = ({
  containerStyle,
  logo,
  logoHeight,
  elevated,
  letter,
  letterVariant,
  letterStyle,
  letterColor = '#000',
  imageBorderRadius = 8,
  imageStyle,
  showTestIds = true
}) => {
  const normalizedLetter = ((letter === null || letter === void 0 ? void 0 : letter.charAt(0)) ?? '').toUpperCase();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [containerStyle, {
      elevation: elevated ? 5 : 0
    }]
  }, logo ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: (0, _credential.toImageSource)(logo),
    style: [{
      resizeMode: 'cover',
      width: logoHeight,
      height: logoHeight,
      borderRadius: imageBorderRadius
    }, imageStyle],
    testID: showTestIds ? (0, _testable.testIdWithKey)('Logo') : undefined
  }) : /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: letterVariant,
    style: [{
      fontSize: 0.5 * logoHeight,
      alignSelf: 'center',
      color: letterColor
    }, letterStyle],
    testID: showTestIds ? (0, _testable.testIdWithKey)('NoLogoText') : undefined,
    accessible: false
  }, normalizedLetter));
};
var _default = exports.default = LogoOrLetter;
//# sourceMappingURL=LogoOrLetter.js.map