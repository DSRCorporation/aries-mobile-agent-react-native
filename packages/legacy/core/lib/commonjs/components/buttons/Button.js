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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ButtonImplComponent = ({
  title,
  buttonType,
  accessibilityLabel,
  testID,
  onPress,
  disabled = false,
  children
}, ref) => {
  const {
    Buttons,
    heavyOpacity
  } = (0, _theme.useTheme)();
  const buttonStyles = {
    [_ButtonApi.ButtonType.Critical]: {
      color: Buttons.critical,
      text: Buttons.primaryText
    },
    [_ButtonApi.ButtonType.Primary]: {
      color: Buttons.primary,
      text: Buttons.primaryText
    },
    [_ButtonApi.ButtonType.Secondary]: {
      color: Buttons.secondary,
      text: Buttons.secondaryText
    },
    [_ButtonApi.ButtonType.ModalCritical]: {
      color: Buttons.modalCritical,
      text: Buttons.primaryText
    },
    [_ButtonApi.ButtonType.ModalPrimary]: {
      color: Buttons.modalPrimary,
      text: Buttons.modalPrimaryText
    },
    [_ButtonApi.ButtonType.ModalSecondary]: {
      color: Buttons.modalSecondary,
      text: Buttons.modalSecondaryText
    },
    [_ButtonApi.ButtonType.SecondaryCritical]: {
      color: Buttons.secondaryCritical,
      text: Buttons.secondaryCriticalText
    }
  };
  const [isActive, setIsActive] = (0, _react.useState)(false);
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onPress,
    accessible: true,
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: 'button',
    onPressIn: () => setIsActive(!disabled && true),
    onPressOut: () => setIsActive(false),
    testID: testID,
    style: [buttonStyles[buttonType].color, disabled && (buttonType === _ButtonApi.ButtonType.Primary ? Buttons.primaryDisabled : Buttons.secondaryDisabled), isActive && buttonType === _ButtonApi.ButtonType.Secondary && {
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
  }, children, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [buttonStyles[buttonType].text, disabled && (buttonType === _ButtonApi.ButtonType.Primary ? Buttons.primaryTextDisabled : Buttons.secondaryTextDisabled), isActive && {
      textDecorationLine: 'underline'
    }, isActive && buttonType === _ButtonApi.ButtonType.Secondary && {
      color: Buttons.primaryText.color
    }]
  }, title)));
};
const ButtonImpl = exports.ButtonImpl = /*#__PURE__*/(0, _react.forwardRef)(ButtonImplComponent);
var _default = exports.default = ButtonImpl;
//# sourceMappingURL=Button.js.map