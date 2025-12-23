"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _Text = _interopRequireDefault(require("./Text"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Label = ({
  title,
  subtitle,
  label
}) => {
  const {
    TextTheme
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90%',
      marginTop: 10
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    title: {
      ...TextTheme.labelTitle,
      marginRight: 7
    },
    subtitle: {
      ...TextTheme.labelSubtitle
    },
    label: {
      marginLeft: 10,
      ...TextTheme.labelText
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.titleContainer
  }, /*#__PURE__*/_react.default.createElement(_Text.default, {
    style: styles.title
  }, title, ":"), /*#__PURE__*/_react.default.createElement(_Text.default, {
    style: styles.subtitle
  }, subtitle)), /*#__PURE__*/_react.default.createElement(_Text.default, {
    style: styles.label
  }, label));
};
var _default = exports.default = Label;
//# sourceMappingURL=Label.js.map