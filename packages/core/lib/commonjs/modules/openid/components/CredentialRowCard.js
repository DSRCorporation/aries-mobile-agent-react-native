"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenIDCredentialRowCard = OpenIDCredentialRowCard;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../../contexts/theme");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function OpenIDCredentialRowCard({
  name,
  issuer,
  bgColor,
  bgImage,
  txtColor,
  onPress
}) {
  const {
    TextTheme
  } = (0, _theme.useTheme)();
  const {
    width
  } = (0, _reactNative.useWindowDimensions)();
  const badgeWidth = 0.25 * width;
  const badgeHeight = 0.6 * badgeWidth;
  const style = _reactNative.StyleSheet.create({
    container: {},
    rowContainer: {
      flexDirection: 'row',
      borderRadius: 8,
      backgroundColor: '#202020',
      padding: 5,
      minHeight: 0.2 * width
    },
    issuerBadge: {
      borderRadius: 8,
      width: badgeHeight,
      height: badgeHeight,
      backgroundColor: 'red',
      marginRight: 10,
      overflow: 'hidden'
    },
    infoContainer: {
      flex: 1,
      justifyContent: 'space-between'
    },
    imageStyle: {
      width: badgeWidth,
      height: badgeHeight,
      borderRadius: 8
    }
  });
  //
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onPress,
    style: style.rowContainer,
    accessibilityLabel: name,
    accessibilityRole: "button"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [style.issuerBadge, bgColor ? {
      backgroundColor: bgColor
    } : {}]
  }, bgImage ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: style.imageStyle,
    source: {
      uri: bgImage
    },
    resizeMode: "cover"
  }) : null), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [style.infoContainer, issuer ? {
      justifyContent: 'center'
    } : {}]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [TextTheme.title, txtColor ? {
      color: txtColor
    } : {}]
  }, name), issuer && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [TextTheme.labelSubtitle, txtColor ? {
      color: txtColor
    } : {}]
  }, issuer))));
}
//# sourceMappingURL=CredentialRowCard.js.map