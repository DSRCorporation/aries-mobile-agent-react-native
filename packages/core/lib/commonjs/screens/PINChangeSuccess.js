"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactI18next = require("react-i18next");
var _InfoBox = _interopRequireWildcard(require("../components/misc/InfoBox"));
var _ButtonApi = require("../components/buttons/Button-api");
var _screenCapture = _interopRequireDefault(require("../hooks/screen-capture"));
var _theme = require("../contexts/theme");
var _containerApi = require("../container-api");
var _testable = require("../utils/testable");
var _navigators = require("../types/navigators");
var _ScreenWrapper = _interopRequireDefault(require("../components/views/ScreenWrapper"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/* eslint-disable react/prop-types */

const ChangePINSuccessScreen = ({
  navigation
}) => {
  const {
    ColorPalette,
    Spacing
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [{
    preventScreenCapture
  }, Button] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG, _containerApi.TOKENS.COMPONENT_BUTTON]);
  (0, _screenCapture.default)(preventScreenCapture);
  const style = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      padding: Spacing.md,
      backgroundColor: ColorPalette.brand.primaryBackground
    }
  });
  const onPressContinue = (0, _react.useCallback)(() => {
    navigation === null || navigation === void 0 || navigation.navigate(_navigators.Screens.Settings);
  }, [navigation]);
  return /*#__PURE__*/_react.default.createElement(_ScreenWrapper.default, {
    keyboardActive: true,
    padded: false
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginTop: 10,
      marginBottom: 30
    }
  }, /*#__PURE__*/_react.default.createElement(_InfoBox.default, {
    notificationType: _InfoBox.InfoBoxType.Success,
    title: t('PINChangeSuccess.InfoBox.Title'),
    message: t('PINChangeSuccess.InfoBox.Description'),
    renderShowDetails: true
  })), /*#__PURE__*/_react.default.createElement(Button, {
    title: t('PINChangeSuccess.PrimaryButton'),
    testID: (0, _testable.testIdWithKey)('GoToSettings'),
    accessibilityLabel: t('PINChangeSuccess.PrimaryButton'),
    buttonType: _ButtonApi.ButtonType.Primary,
    onPress: onPressContinue
  })));
};
var _default = exports.default = ChangePINSuccessScreen;
//# sourceMappingURL=PINChangeSuccess.js.map