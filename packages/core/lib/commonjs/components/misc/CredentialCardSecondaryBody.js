"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _testable = require("../../utils/testable");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CredentialCardSecondaryBody = ({
  hideSlice,
  secondaryBg,
  backgroundSliceUri,
  borderRadius,
  containerStyle
}) => {
  if (hideSlice) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      testID: (0, _testable.testIdWithKey)('CredentialCardSecondaryBody'),
      style: [containerStyle, {
        backgroundColor: 'transparent',
        overflow: 'hidden'
      }]
    });
  }
  const bg = secondaryBg ?? (containerStyle === null || containerStyle === void 0 ? void 0 : containerStyle.backgroundColor) ?? 'transparent';
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    testID: (0, _testable.testIdWithKey)('CredentialCardSecondaryBody'),
    style: [containerStyle, {
      backgroundColor: bg,
      overflow: 'hidden'
    }]
  }, backgroundSliceUri ? /*#__PURE__*/_react.default.createElement(_reactNative.ImageBackground, {
    source: {
      uri: backgroundSliceUri
    },
    style: {
      flexGrow: 1
    },
    imageStyle: {
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius
    }
  }) : null);
};
var _default = exports.default = CredentialCardSecondaryBody;
//# sourceMappingURL=CredentialCardSecondaryBody.js.map