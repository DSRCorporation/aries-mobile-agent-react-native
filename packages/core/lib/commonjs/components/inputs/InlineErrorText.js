"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InlineErrorType = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let InlineErrorType = exports.InlineErrorType = /*#__PURE__*/function (InlineErrorType) {
  InlineErrorType[InlineErrorType["error"] = 0] = "error";
  InlineErrorType[InlineErrorType["warning"] = 1] = "warning";
  return InlineErrorType;
}({});
const InlineErrorText = ({
  message,
  inlineType,
  config
}) => {
  const {
    InputInlineMessage
  } = (0, _theme.useTheme)();
  const style = _reactNative.StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignContent: 'center',
      marginVertical: 5,
      paddingRight: 20
    },
    icon: {
      marginRight: 4
    }
  });
  const color = inlineType === InlineErrorType.warning ? InputInlineMessage.inlineWarningText.color : InputInlineMessage.inlineErrorText.color;
  const props = {
    height: 24,
    width: 24,
    color: color,
    style: style.icon
  };
  const getInlineErrorIcon = () => {
    if (!config.hasErrorIcon) return null;
    if (inlineType === InlineErrorType.warning) {
      return /*#__PURE__*/_react.default.createElement(InputInlineMessage.InlineWarningIcon, props);
    } else {
      return /*#__PURE__*/_react.default.createElement(InputInlineMessage.InlineErrorIcon, props);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [style.container, config.style]
  }, getInlineErrorIcon(), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: [InputInlineMessage.inlineErrorText],
    testID: (0, _testable.testIdWithKey)('InlineErrorText')
  }, message));
};
var _default = exports.default = InlineErrorText;
//# sourceMappingURL=InlineErrorText.js.map