"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _credential = require("../../utils/credential");
var _helpers = require("../../utils/helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ConnectionImage = ({
  connectionId,
  imageUri,
  marginTop
}) => {
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    connectionImageContainer: {
      backgroundColor: ColorPalette.brand.secondaryBackground,
      width: 90,
      height: 90,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 45,
      marginTop: marginTop ?? 15,
      borderColor: ColorPalette.grayscale.lightGrey,
      borderWidth: 3,
      alignSelf: 'center'
    },
    connectionImage: {
      width: 55,
      height: 55
    }
  });
  const anonCredsImageUri = (0, _helpers.useConnectionImageUrl)(connectionId ?? '');
  const connectionImage = imageUri ? imageUri : anonCredsImageUri;
  return connectionImage ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.connectionImageContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: styles.connectionImage,
    source: (0, _credential.toImageSource)(connectionImage)
  })) : null;
};
var _default = exports.default = ConnectionImage;
//# sourceMappingURL=ConnectionImage.js.map