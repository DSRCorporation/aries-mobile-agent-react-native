"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonImpl = void 0;
Object.defineProperty(exports, "ButtonType", {
  enumerable: true,
  get: function () {
    return _ButtonApi.ButtonType;
  }
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _ButtonApi = require("./Button-api");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ButtonImpl = ({
  title,
  buttonType,
  accessibilityLabel,
  accessibilityHint,
  testID,
  onPress,
  disabled = false,
  maxfontSizeMultiplier,
  children,
  ref
}) => {
  const {
    Buttons,
    heavyOpacity
  } = (0, _theme.useTheme)();
  const buttonStyles = {
    [_ButtonApi.ButtonType.Critical]: {
      color: Buttons.critical,
      colorDisabled: Buttons.criticalDisabled,
      text: Buttons.criticalText,
      textDisabled: Buttons.criticalTextDisabled
    },
    [_ButtonApi.ButtonType.Primary]: {
      color: Buttons.primary,
      colorDisabled: Buttons.primaryDisabled,
      text: Buttons.primaryText,
      textDisabled: Buttons.primaryTextDisabled
    },
    [_ButtonApi.ButtonType.Secondary]: {
      color: Buttons.secondary,
      colorDisabled: Buttons.secondaryDisabled,
      text: Buttons.secondaryText,
      textDisabled: Buttons.secondaryTextDisabled
    },
    [_ButtonApi.ButtonType.Tertiary]: {
      color: Buttons.tertiary,
      colorDisabled: Buttons.tertiaryDisabled,
      text: Buttons.tertiaryText,
      textDisabled: Buttons.tertiaryTextDisabled
    },
    [_ButtonApi.ButtonType.ModalCritical]: {
      color: Buttons.modalCritical,
      colorDisabled: Buttons.modalCriticalDisabled,
      text: Buttons.modalCriticalText,
      textDisabled: Buttons.modalCriticalTextDisabled
    },
    [_ButtonApi.ButtonType.ModalPrimary]: {
      color: Buttons.modalPrimary,
      colorDisabled: Buttons.modalPrimaryDisabled,
      text: Buttons.modalPrimaryText,
      textDisabled: Buttons.modalPrimaryTextDisabled
    },
    [_ButtonApi.ButtonType.ModalSecondary]: {
      color: Buttons.modalSecondary,
      colorDisabled: Buttons.modalSecondaryDisabled,
      text: Buttons.modalSecondaryText,
      textDisabled: Buttons.modalSecondaryTextDisabled
    },
    [_ButtonApi.ButtonType.SecondaryCritical]: {
      color: Buttons.secondaryCritical,
      colorDisabled: Buttons.secondaryCritical,
      text: Buttons.secondaryCriticalText,
      textDisabled: Buttons.secondaryCriticalText
    },
    [_ButtonApi.ButtonType.ModalTertiary]: {
      color: Buttons.modalTertiary,
      colorDisabled: Buttons.modalTertiaryDisabled,
      text: Buttons.modalTertiaryText,
      textDisabled: Buttons.modalTertiaryTextDisabled
    }
  };
  const [isActive, setIsActive] = (0, _react.useState)(false);
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onPress,
    accessible: true,
    accessibilityLabel: accessibilityLabel,
    accessibilityHint: accessibilityHint,
    accessibilityRole: 'button',
    onPressIn: () => setIsActive(!disabled && true),
    onPressOut: () => setIsActive(false),
    testID: testID,
    style: [buttonStyles[buttonType].color, disabled && buttonStyles[buttonType].colorDisabled, isActive && (buttonType === _ButtonApi.ButtonType.Secondary || buttonType === _ButtonApi.ButtonType.Tertiary) && {
      backgroundColor: Buttons.primary.backgroundColor
    }],
    disabled: disabled,
    activeOpacity: heavyOpacity,
    ref: ref
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, children, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    maxFontSizeMultiplier: maxfontSizeMultiplier,
    style: [buttonStyles[buttonType].text, disabled && buttonStyles[buttonType].textDisabled, isActive && {
      textDecorationLine: 'underline'
    }, isActive && buttonType === _ButtonApi.ButtonType.Secondary && {
      color: Buttons.primaryText.color
    }]
  }, title)));
};
exports.ButtonImpl = ButtonImpl;
var _default = exports.default = ButtonImpl;
//# sourceMappingURL=Button.js.map