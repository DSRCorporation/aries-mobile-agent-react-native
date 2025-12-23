"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const RecordRemove = ({
  onRemove = () => null
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    TextTheme,
    ColorPallet
  } = (0, _theme.useTheme)();
  const callOnRemove = (0, _react.useCallback)(() => onRemove(), []);
  const styles = _reactNative.StyleSheet.create({
    headerText: {
      ...TextTheme.normal
    },
    footerText: {
      ...TextTheme.normal
    },
    linkContainer: {
      minHeight: TextTheme.normal.fontSize,
      paddingVertical: 2
    },
    link: {
      ...TextTheme.normal,
      color: ColorPallet.brand.link
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      backgroundColor: ColorPallet.brand.secondaryBackground,
      marginTop: 16,
      paddingHorizontal: 25,
      paddingVertical: 16
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessible: true,
    accessibilityLabel: t('CredentialDetails.RemoveFromWallet'),
    accessibilityRole: 'button',
    testID: (0, _testable.testIdWithKey)('RemoveFromWallet'),
    activeOpacity: 1,
    onPress: callOnRemove
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.footerText, styles.link, {
      color: ColorPallet.semantic.error,
      textDecorationLine: 'underline'
    }]
  }, t('CredentialDetails.RemoveFromWallet'))));
};
var _default = exports.default = RecordRemove;
//# sourceMappingURL=RecordRemove.js.map