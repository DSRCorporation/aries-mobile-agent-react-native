"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderActions = void 0;
var _i18next = require("i18next");
var _react = _interopRequireDefault(require("react"));
var _reactNativeGiftedChat = require("react-native-gifted-chat");
var _MaterialCommunityIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialCommunityIcons"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const renderActions = (props, theme, actions) => {
  return actions ? /*#__PURE__*/_react.default.createElement(_reactNativeGiftedChat.Actions, _extends({}, props, {
    containerStyle: {
      width: 40,
      height: 40,
      marginBottom: 6,
      marginLeft: 20
    },
    icon: () => /*#__PURE__*/_react.default.createElement(_MaterialCommunityIcons.default, {
      name: 'plus-box-outline',
      size: 40,
      color: theme.options,
      accessible: true,
      accessibilityLabel: (0, _i18next.t)('Chat.Actions'),
      accessibilityRole: "button"
    }),
    optionTintColor: theme.optionsText
  })) : null;
};
exports.renderActions = renderActions;
//# sourceMappingURL=ChatActions.js.map