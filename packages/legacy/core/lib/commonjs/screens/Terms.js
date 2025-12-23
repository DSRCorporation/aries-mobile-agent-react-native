"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TermsVersion = void 0;
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _ButtonApi = require("../components/buttons/Button-api");
var _CheckBoxRow = _interopRequireDefault(require("../components/inputs/CheckBoxRow"));
var _HighlightTextBox = _interopRequireDefault(require("../components/texts/HighlightTextBox"));
var _InfoTextBox = _interopRequireDefault(require("../components/texts/InfoTextBox"));
var _containerApi = require("../container-api");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const TermsVersion = exports.TermsVersion = true;
const Terms = () => {
  const [store, dispatch] = (0, _store2.useStore)();
  const [checked, setChecked] = (0, _react.useState)(false);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const navigation = (0, _native.useNavigation)();
  const {
    OnboardingTheme,
    TextTheme
  } = (0, _theme.useTheme)();
  const [Button] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMP_BUTTON]);
  const agreedToPreviousTerms = store.onboarding.didAgreeToTerms;
  const onSubmitPressed = (0, _react.useCallback)(() => {
    dispatch({
      type: _store.DispatchAction.DID_AGREE_TO_TERMS,
      payload: [{
        DidAgreeToTerms: TermsVersion
      }]
    });
    if (!agreedToPreviousTerms) {
      navigation.navigate(_navigators.Screens.CreatePIN);
    } else if (store.onboarding.postAuthScreens.length) {
      const screens = store.onboarding.postAuthScreens;
      screens.shift();
      dispatch({
        type: _store.DispatchAction.SET_POST_AUTH_SCREENS,
        payload: [screens]
      });
      if (screens.length) {
        navigation.navigate(screens[0]);
      } else {
        dispatch({
          type: _store.DispatchAction.DID_COMPLETE_ONBOARDING,
          payload: [true]
        });
      }
    }
  }, []);
  const style = _reactNative.StyleSheet.create({
    container: {
      ...OnboardingTheme.container,
      padding: 20
    },
    bodyText: {
      ...OnboardingTheme.bodyText,
      flexShrink: 1
    },
    controlsContainer: {
      marginTop: 'auto',
      marginBottom: 20
    }
  });
  const onBackPressed = () => {
    //TODO:(jl) goBack() does not unwind the navigation stack but rather goes
    //back to the splash screen. Needs fixing before the following code will
    //work as expected.

    // if (nav.canGoBack()) {
    //   nav.goBack()
    // }

    navigation.navigate(_navigators.Screens.Onboarding);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    edges: ['left', 'right', 'bottom']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: style.container
  }, /*#__PURE__*/_react.default.createElement(_InfoTextBox.default, null, "Please agree to the terms and conditions below before using this application."), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [style.bodyText, {
      marginTop: 20,
      marginBottom: 20
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [style.bodyText, {
      fontWeight: TextTheme.bold.fontWeight
    }]
  }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit."), ' ', "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."), /*#__PURE__*/_react.default.createElement(_HighlightTextBox.default, null, "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui"), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [style.bodyText, {
      marginTop: 20
    }]
  }, "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.controlsContainer
  }, !agreedToPreviousTerms && /*#__PURE__*/_react.default.createElement(_CheckBoxRow.default, {
    title: t('Terms.Attestation'),
    accessibilityLabel: t('Terms.IAgree'),
    testID: (0, _testable.testIdWithKey)('IAgree'),
    checked: checked,
    onPress: () => setChecked(!checked)
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      paddingTop: 10
    }
  }, /*#__PURE__*/_react.default.createElement(Button, {
    title: agreedToPreviousTerms ? t('Global.Accept') : t('Global.Continue'),
    accessibilityLabel: agreedToPreviousTerms ? t('Global.Accept') : t('Global.Continue'),
    testID: agreedToPreviousTerms ? (0, _testable.testIdWithKey)('Accept') : (0, _testable.testIdWithKey)('Continue'),
    disabled: !checked && !agreedToPreviousTerms,
    onPress: onSubmitPressed,
    buttonType: _ButtonApi.ButtonType.Primary
  })), !agreedToPreviousTerms && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      paddingTop: 10,
      marginBottom: 20
    }
  }, /*#__PURE__*/_react.default.createElement(Button, {
    title: t('Global.Back'),
    accessibilityLabel: t('Global.Back'),
    testID: (0, _testable.testIdWithKey)('Back'),
    onPress: onBackPressed,
    buttonType: _ButtonApi.ButtonType.Secondary
  })))));
};
var _default = exports.default = Terms;
//# sourceMappingURL=Terms.js.map