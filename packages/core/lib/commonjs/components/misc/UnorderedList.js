"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const UnorderedList = ({
  unorderedListItems
}) => {
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, unorderedListItems.map((item, i) => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      key: i,
      style: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5
      }
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: {
        color: ColorPalette.brand.unorderedList,
        paddingLeft: 5
      }
    }, `\u2022`), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: {
        color: ColorPalette.brand.unorderedList,
        paddingLeft: 5,
        flex: 1
      }
    }, item));
  }));
};
var _default = exports.default = UnorderedList;
//# sourceMappingURL=UnorderedList.js.map