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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ScanTab = ({
  onPress,
  active,
  iconName,
  title
}) => {
  const {
    TabTheme,
    TextTheme
  } = (0, _theme.useTheme)();
  const {
    fontScale
  } = (0, _reactNative.useWindowDimensions)();
  const showLabels = fontScale * TabTheme.tabBarTextStyle.fontSize < 18;
  const styles = _reactNative.StyleSheet.create({
    container: {
      ...TabTheme.tabBarContainerStyle
    },
    text: {
      ...TabTheme.tabBarTextStyle,
      color: active ? TabTheme.tabBarActiveTintColor : TabTheme.tabBarInactiveTintColor,
      fontWeight: active ? TextTheme.bold.fontWeight : TextTheme.normal.fontWeight
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.container,
    onPress: onPress,
    accessibilityLabel: title,
    testID: (0, _testable.testIdWithKey)(title)
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: iconName,
    size: 30,
    color: styles.text.color
  }), showLabels ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.text
  }, title) : null);
};
var _default = exports.default = ScanTab;
//# sourceMappingURL=ScanTab.js.map