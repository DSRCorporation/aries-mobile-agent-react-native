"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _CredentialCardActionLink = _interopRequireDefault(require("./CredentialCardActionLink"));
var _AttributeRow = require("./AttributeRow");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CredentialCardAttributeList = ({
  list,
  textColor,
  showPiiWarning,
  isNotInWallet,
  hasAltCredentials,
  onChangeAlt,
  helpActionUrl,
  styles
}) => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: list,
    scrollEnabled: false,
    initialNumToRender: list.length,
    keyExtractor: i => i.key,
    renderItem: ({
      item
    }) => /*#__PURE__*/_react.default.createElement(_AttributeRow.CredentialAttributeRow, {
      item: item,
      textColor: textColor,
      showPiiWarning: showPiiWarning,
      isNotInWallet: isNotInWallet,
      styles: styles
    }),
    ListFooterComponent: /*#__PURE__*/_react.default.createElement(_CredentialCardActionLink.default, {
      hasAltCredentials: hasAltCredentials,
      onChangeAlt: onChangeAlt,
      helpActionUrl: helpActionUrl,
      textStyle: styles.textContainer
    })
  });
};
var _default = exports.default = CredentialCardAttributeList;
//# sourceMappingURL=CredentialCardAttributeList.js.map