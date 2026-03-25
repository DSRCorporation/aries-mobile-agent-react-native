"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _theme = require("../../contexts/theme");
var _reactI18next = require("react-i18next");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ToggleButton = ({
  isEnabled,
  isAvailable,
  toggleAction,
  testID,
  enabledIcon = 'check',
  disabledIcon = 'close',
  disabled = false
}) => {
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const [toggleAnim] = (0, _react.useState)(new _reactNative.Animated.Value(isEnabled ? 1 : 0));
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  (0, _react.useEffect)(() => {
    _reactNative.Animated.timing(toggleAnim, {
      toValue: isEnabled ? 1 : 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  }, [isEnabled, toggleAnim]);
  const backgroundColor = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [ColorPalette.grayscale.lightGrey, ColorPalette.brand.primary]
  });
  const translateX = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 24]
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    accessible: true,
    testID: testID,
    accessibilityLabel: isEnabled ? t('Biometry.On') : t('Biometry.Off'),
    accessibilityRole: "switch",
    accessibilityState: {
      checked: isEnabled
    },
    onPress: isAvailable && !disabled ? toggleAction : undefined // Prevent onPress if not available or disabled
    ,
    disabled: !isAvailable || disabled
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: {
      width: 55,
      height: 30,
      borderRadius: 25,
      backgroundColor,
      padding: 3,
      justifyContent: 'center',
      opacity: disabled ? 0.5 : 1 // Visual feedback for disabled state
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: {
      transform: [{
        translateX
      }],
      width: 25,
      height: 25,
      borderRadius: 20,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    name: isEnabled ? enabledIcon : disabledIcon,
    size: 15,
    color: isEnabled ? ColorPalette.brand.primary : ColorPalette.grayscale.mediumGrey
  }))));
};
var _default = exports.default = ToggleButton;
//# sourceMappingURL=ToggleButton.js.map