"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const PushNotificationsContent = () => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    TextTheme,
    Assets
  } = (0, _theme.useTheme)();
  const list = [t('PushNotifications.BulletOne'), t('PushNotifications.BulletTwo'), t('PushNotifications.BulletThree'), t('PushNotifications.BulletFour')];
  const style = _reactNative.StyleSheet.create({
    image: {
      height: 200,
      marginBottom: 20
    },
    heading: {
      marginBottom: 20
    },
    listItem: {
      ...TextTheme.normal,
      flex: 1,
      paddingLeft: 5
    }
  });
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.image
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.pushNotificationImg, null)), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "headingThree",
    style: style.heading
  }, t('PushNotifications.EnableNotifications')), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('PushNotifications.BeNotified')), list.map((item, index) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      marginTop: 20
    },
    key: index
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, '\u2022'), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: style.listItem
  }, item))));
};
var _default = exports.default = PushNotificationsContent;
//# sourceMappingURL=PushNotificationsContent.js.map