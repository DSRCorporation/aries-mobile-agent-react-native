"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _BiometryControl = _interopRequireDefault(require("../components/inputs/BiometryControl"));
var _animatedComponents = require("../contexts/animated-components");
var _auth = require("../contexts/auth");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _testable = require("../utils/testable");
var _theme = require("../contexts/theme");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const Biometry = () => {
  const {
    Spacing
  } = (0, _theme.useTheme)();
  const [store, dispatch] = (0, _store2.useStore)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    commitWalletToKeychain
  } = (0, _auth.useAuth)();
  const [biometryEnabled, setBiometryEnabled] = (0, _react.useState)(store.preferences.useBiometry);
  const [continueEnabled, setContinueEnabled] = (0, _react.useState)(true);
  const {
    ButtonLoading
  } = (0, _animatedComponents.useAnimatedComponents)();
  const continueTouched = (0, _react.useCallback)(async () => {
    setContinueEnabled(false);
    await commitWalletToKeychain(biometryEnabled);
    dispatch({
      type: _store.DispatchAction.USE_BIOMETRY,
      payload: [biometryEnabled]
    });
  }, [biometryEnabled, commitWalletToKeychain, dispatch]);
  const handleBiometryToggle = (0, _react.useCallback)(newValue => {
    setBiometryEnabled(newValue);
  }, []);
  return /*#__PURE__*/_react.default.createElement(_BiometryControl.default, {
    biometryEnabled: biometryEnabled,
    onBiometryToggle: handleBiometryToggle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginTop: 'auto',
      margin: Spacing.md
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Global.Continue'),
    accessibilityLabel: 'Continue',
    testID: (0, _testable.testIdWithKey)('Continue'),
    onPress: continueTouched,
    buttonType: _Button.ButtonType.Primary,
    disabled: !continueEnabled
  }, !continueEnabled && /*#__PURE__*/_react.default.createElement(ButtonLoading, null))));
};
var _default = exports.default = Biometry;
//# sourceMappingURL=Biometry.js.map