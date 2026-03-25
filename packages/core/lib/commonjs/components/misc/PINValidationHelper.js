"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _theme = require("../../contexts/theme");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const iconSize = 24;
const PINValidationHelper = ({
  validations
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginBottom: 16
    }
  }, validations.map((validation, index) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row'
    },
    key: index
  }, validation.isInvalid ? /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    accessibilityLabel: t('PINCreate.Helper.ClearIcon'),
    name: "clear",
    size: iconSize,
    color: ColorPalette.notification.errorIcon
  }) : /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    accessibilityLabel: t('PINCreate.Helper.CheckIcon'),
    name: "check",
    size: iconSize,
    color: ColorPalette.notification.successIcon
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: {
      paddingLeft: 4
    }
  }, t(`PINCreate.Helper.${validation.errorName}`, validation === null || validation === void 0 ? void 0 : validation.errorTextAddition)))));
};
var _default = exports.default = PINValidationHelper;
//# sourceMappingURL=PINValidationHelper.js.map