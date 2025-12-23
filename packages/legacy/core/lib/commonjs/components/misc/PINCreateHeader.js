"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactI18next = require("react-i18next");
var _theme = require("../../contexts/theme");
var _reactNative = require("react-native");
const PINCreateHeader = ({
  updatePin
}) => {
  const {
    TextTheme
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  return /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: [TextTheme.normal, {
      marginBottom: 16
    }]
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: {
      fontWeight: TextTheme.bold.fontWeight
    }
  }, updatePin ? t('PINCreate.RememberChangePIN') : t('PINCreate.RememberPIN')), ' ', t('PINCreate.PINDisclaimer')));
};
var _default = exports.default = PINCreateHeader;
//# sourceMappingURL=PINCreateHeader.js.map