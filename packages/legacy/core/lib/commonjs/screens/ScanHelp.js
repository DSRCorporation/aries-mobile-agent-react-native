"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _Link = _interopRequireDefault(require("../components/texts/Link"));
var _theme = require("../contexts/theme");
var _testable = require("../utils/testable");
var _containerApi = require("../container-api");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ScanHelp = () => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [{
    whereToUseWalletUrl
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  const {
    TextTheme
  } = (0, _theme.useTheme)();
  const style = _reactNative.StyleSheet.create({
    safeArea: {
      flex: 1
    },
    scrollView: {
      flexGrow: 1,
      padding: 26
    },
    text: {
      ...TextTheme.normal,
      marginTop: 15
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: style.safeArea,
    edges: ['top', 'left', 'right', 'bottom']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    contentContainerStyle: style.scrollView
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.headingThree
  }, t('Scan.WhatToScan')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [style.text, {
      marginTop: 20
    }]
  }, t('Scan.ScanOnySpecial')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: style.text
  }, t('Scan.ScanOnlySpecial2')), /*#__PURE__*/_react.default.createElement(_Link.default, {
    linkText: t('Scan.WhereToUseLink'),
    style: style.text,
    onPress: () => whereToUseWalletUrl && _reactNative.Linking.openURL(whereToUseWalletUrl),
    testID: (0, _testable.testIdWithKey)('WhereToUseLink')
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: style.text
  }, t('Scan.ScanOnlySpecial3'))));
};
var _default = exports.default = ScanHelp;
//# sourceMappingURL=ScanHelp.js.map