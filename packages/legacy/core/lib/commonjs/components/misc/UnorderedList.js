"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UnorderedList = ({
  unorderedListItems
}) => {
  const {
    TextTheme,
    ColorPallet
  } = (0, _theme.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, unorderedListItems.map((item, i) => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      key: i,
      style: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [TextTheme.normal, {
        color: ColorPallet.brand.unorderedList,
        paddingLeft: 5
      }]
    }, `\u2022`), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [TextTheme.normal, {
        color: ColorPallet.brand.unorderedList,
        paddingLeft: 5,
        flex: 1
      }]
    }, item));
  }));
};
var _default = exports.default = UnorderedList;
//# sourceMappingURL=UnorderedList.js.map