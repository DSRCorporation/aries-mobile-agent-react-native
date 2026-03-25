"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ButtonLocation = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _MaterialCommunityIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialCommunityIcons"));
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _constants = require("../../constants");
var _theme = require("../../contexts/theme");
var _ThemedText = require("../texts/ThemedText");
var _containerApi = require("../../container-api");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const defaultIconSize = 26;
let ButtonLocation = exports.ButtonLocation = /*#__PURE__*/function (ButtonLocation) {
  ButtonLocation[ButtonLocation["Left"] = 0] = "Left";
  ButtonLocation[ButtonLocation["Right"] = 1] = "Right";
  return ButtonLocation;
}({});
const IconButton = ({
  buttonLocation,
  icon,
  text,
  accessibilityLabel,
  testID,
  onPress,
  iconTintColor
}) => {
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const [logger] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER]);
  const style = _reactNative.StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: buttonLocation === ButtonLocation.Left ? 0 : 15,
      marginLeft: buttonLocation === ButtonLocation.Right ? 0 : 15,
      minWidth: defaultIconSize,
      minHeight: defaultIconSize
    },
    title: {
      color: ColorPalette.brand.headerText,
      marginRight: 4
    }
  });
  const myIcon = (0, _react.useCallback)(() => {
    const iconColor = iconTintColor ?? ColorPalette.brand.headerIcon;

    // First, check if the icon exists in MaterialCommunityIcons
    if (_MaterialCommunityIcons.default.hasIcon(icon)) {
      return /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
        name: icon,
        size: defaultIconSize,
        color: iconColor
      });
    }

    // Next, check if the icon exists in MaterialIcons
    if (_MaterialIcons.default.hasIcon(icon)) {
      return /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
        name: icon,
        size: defaultIconSize,
        color: iconColor
      });
    }

    // Otherwise, render default icon (?) and log a warning
    logger.warn(`IconButton: Icon "${icon}" not found in MaterialIcons or MaterialCommunityIcons. Defaulting to (?).`);
    return /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
      name: 'question-mark',
      size: defaultIconSize,
      color: iconColor
    });
  }, [ColorPalette.brand.headerIcon, icon, iconTintColor, logger]);
  const myText = () => text ? /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    maxFontSizeMultiplier: 1,
    variant: "label",
    style: style.title
  }, text) : null;
  const layoutForButtonLocation = buttonLocation => {
    switch (buttonLocation) {
      case ButtonLocation.Left:
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, myIcon(), myText());
      case ButtonLocation.Right:
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, myText(), myIcon());
    }
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: 'button',
    testID: testID,
    onPress: onPress,
    hitSlop: _constants.hitSlop
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container
  }, layoutForButtonLocation(buttonLocation)));
};
var _default = exports.default = IconButton;
//# sourceMappingURL=IconButton.js.map