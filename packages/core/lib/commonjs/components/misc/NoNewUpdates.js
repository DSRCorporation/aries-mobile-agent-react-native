"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
var _InfoTextBox = _interopRequireDefault(require("../texts/InfoTextBox"));
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const NoNewUpdates = () => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    HomeTheme,
    ColorPalette
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    noNewUpdatesContainer: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      backgroundColor: ColorPalette.brand.secondaryBackground
    },
    noNewUpdatesText: {
      ...HomeTheme.noNewUpdatesText,
      alignSelf: 'center',
      flex: 1,
      flexWrap: 'wrap'
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.noNewUpdatesContainer
  }, /*#__PURE__*/_react.default.createElement(_InfoTextBox.default, null, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: styles.noNewUpdatesText,
    testID: (0, _testable.testIdWithKey)('NoNewUpdates')
  }, t('Home.NoNewUpdates'))));
};
var _default = exports.default = NoNewUpdates;
//# sourceMappingURL=NoNewUpdates.js.map