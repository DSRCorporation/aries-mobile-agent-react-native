"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactI18next = require("react-i18next");
var _theme = require("../../../../../contexts/theme");
var _Button = _interopRequireWildcard(require("../../../../../components/buttons/Button"));
var _testable = require("../../../../../utils/testable");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const OpenIDProofPresentationFooter = ({
  buttonsVisible,
  credential,
  onPressAccept,
  onPressDecline,
  onPressDismiss,
  selectedCredentialsSubmission,
  submission
}) => {
  const {
    ColorPalette,
    Spacing
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const styles = _reactNative.StyleSheet.create({
    footerButton: {
      paddingVertical: 10
    },
    footerContainer: {
      paddingHorizontal: 25,
      paddingVertical: 16,
      paddingBottom: 26,
      backgroundColor: ColorPalette.brand.secondaryBackground
    }
  });
  if (!credential) {
    return null;
  }
  if (submission && !submission.areAllSatisfied) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.footerContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.footerButton
    }, /*#__PURE__*/_react.default.createElement(_Button.default, {
      title: t('Global.Dismiss'),
      accessibilityLabel: t('Global.Dismiss'),
      testID: (0, _testable.testIdWithKey)('DismissCredentialOffer'),
      buttonType: _Button.ButtonType.Primary,
      onPress: onPressDismiss,
      disabled: !buttonsVisible
    })));
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.footerContainer
  }, selectedCredentialsSubmission && Object.keys(selectedCredentialsSubmission).length > 0 ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginBottom: Spacing.sm
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Global.Send'),
    accessibilityLabel: t('Global.Send'),
    testID: (0, _testable.testIdWithKey)('AcceptCredentialOffer'),
    buttonType: _Button.ButtonType.Primary,
    onPress: onPressAccept,
    disabled: !buttonsVisible
  })), /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Global.Decline'),
    accessibilityLabel: t('Global.Decline'),
    testID: (0, _testable.testIdWithKey)('DeclineCredentialOffer'),
    buttonType: _Button.ButtonType.Secondary,
    onPress: onPressDecline,
    disabled: !buttonsVisible
  })) : /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Global.Dismiss'),
    accessibilityLabel: t('Global.Dismiss'),
    testID: (0, _testable.testIdWithKey)('DismissCredentialOffer'),
    buttonType: _Button.ButtonType.Primary,
    onPress: onPressDismiss,
    disabled: !buttonsVisible
  }));
};
var _default = exports.default = OpenIDProofPresentationFooter;
//# sourceMappingURL=OpenIDProofRequestFooter.js.map