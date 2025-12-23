"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderActions = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeGiftedChat = require("react-native-gifted-chat");
var _MaterialCommunityIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialCommunityIcons"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
      color: theme.options
    }),
    optionTintColor: theme.optionsText
  })) : null;
};
exports.renderActions = renderActions;
//# sourceMappingURL=ChatActions.js.map