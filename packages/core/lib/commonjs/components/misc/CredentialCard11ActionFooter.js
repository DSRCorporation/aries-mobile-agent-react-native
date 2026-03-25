"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CredentialActionFooter = ({
  onPress,
  text,
  testID,
  textColor
}) => {
  const {
    ColorPalette,
    TextTheme
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    seperator: {
      width: '100%',
      height: 2,
      marginVertical: 10,
      backgroundColor: ColorPalette.grayscale.lightGrey
    },
    touchable: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    credActionText: {
      fontSize: 20,
      fontWeight: TextTheme.bold.fontWeight,
      color: textColor ?? ColorPalette.brand.credentialLink
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.seperator
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onPress,
    testID: (0, _testable.testIdWithKey)(testID),
    style: styles.touchable
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: styles.credActionText
  }, text), /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    style: [styles.credActionText, {
      fontSize: styles.credActionText.fontSize + 5
    }],
    name: "chevron-right"
  }))));
};
var _default = exports.default = CredentialActionFooter;
//# sourceMappingURL=CredentialCard11ActionFooter.js.map