"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactI18next = require("react-i18next");
var _theme = require("../../../../../contexts/theme");
var _testable = require("../../../../../utils/testable");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const OpenIDProofRequestHeader = ({
  selectedCredentialsSubmission,
  verifierName = '',
  reason = ''
}) => {
  const {
    ListItems,
    TextTheme,
    Spacing
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const styles = _reactNative.StyleSheet.create({
    headerTextContainer: {
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.sm
    },
    headerText: {
      ...ListItems.recordAttributeText,
      flexShrink: 1,
      paddingBottom: Spacing.sm
    }
  });
  if (!selectedCredentialsSubmission) return;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerTextContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerText,
    testID: (0, _testable.testIdWithKey)('HeaderText')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.normal
  }, t('ProofRequest.ReceiveProofTitle')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.title
  }, " $", verifierName)), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.normal
  }, reason));
};
var _default = exports.default = OpenIDProofRequestHeader;
//# sourceMappingURL=OpenIDProofRequestHeader.js.map