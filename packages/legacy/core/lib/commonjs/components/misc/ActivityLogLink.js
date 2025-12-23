"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ActivityLogLink = () => {
  const {
    ColorPallet
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const styles = _reactNative.StyleSheet.create({
    textContainer: {
      flexDirection: 'row'
    },
    text: {
      color: ColorPallet.notification.infoText
    },
    link: {
      color: ColorPallet.notification.infoText,
      textDecorationLine: 'underline'
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.textContainer,
    testID: (0, _testable.testIdWithKey)('ActivityLogLink')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.text
  }, t('ActivityLog.Your')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, " "), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.link
  }, t('ActivityLog.Activity')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, " "), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.text
  }, t('ActivityLog.Updated')));
};
var _default = exports.default = ActivityLogLink;
//# sourceMappingURL=ActivityLogLink.js.map