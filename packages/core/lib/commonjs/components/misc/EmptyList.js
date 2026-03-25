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
var _ThemedText = require("../texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const EmptyList = ({
  message
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ListItems,
    Assets,
    ColorPalette
  } = (0, _theme.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      paddingTop: 100,
      height: '100%',
      backgroundColor: ColorPalette.brand.primaryBackground
    }
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.emptyWallet, {
    fill: ListItems.emptyList.color,
    height: 100
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: [ListItems.emptyList, {
      textAlign: 'center'
    }],
    testID: (0, _testable.testIdWithKey)('NoneYet')
  }, message || t('Global.NoneYet!')));
};
var _default = exports.default = EmptyList;
//# sourceMappingURL=EmptyList.js.map