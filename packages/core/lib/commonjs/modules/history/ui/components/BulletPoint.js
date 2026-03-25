"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _ThemedText = require("../../../../components/texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const styles = _reactNative.StyleSheet.create({
  pointsView: {
    flexDirection: 'row'
  },
  pointsBullet: {
    paddingLeft: 8
  },
  pointsText: {
    flex: 1,
    paddingLeft: 8
  }
});
const BulletPoint = ({
  pointsText,
  pointsTextAxsLabel,
  pointsTextAxsKey
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.pointsView,
    accessible: true
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: styles.pointsBullet
  }, '\u2022'), pointsTextAxsLabel ? /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: styles.pointsText,
    accessibilityLabel: pointsTextAxsLabel
  }, /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
    i18nKey: pointsTextAxsKey,
    components: {
      b: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
        variant: "bold"
      })
    },
    t: t
  })) : /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: styles.pointsText
  }, pointsText));
};
var _default = exports.default = BulletPoint;
//# sourceMappingURL=BulletPoint.js.map