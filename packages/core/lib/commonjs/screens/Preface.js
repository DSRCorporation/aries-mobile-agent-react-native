"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _CheckBoxRow = _interopRequireDefault(require("../components/inputs/CheckBoxRow"));
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
var _ThemedText = require("../components/texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const Preface = () => {
  const [, dispatch] = (0, _store2.useStore)();
  const [checked, setChecked] = (0, _react.useState)(false);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const navigation = (0, _native.useNavigation)();
  const {
    Assets,
    OnboardingTheme,
    TextTheme
  } = (0, _theme.useTheme)();
  const onSubmitPressed = () => {
    dispatch({
      type: _store.DispatchAction.DID_SEE_PREFACE
    });
    navigation.navigate(_navigators.Screens.Onboarding);
  };
  const style = _reactNative.StyleSheet.create({
    screenContainer: {
      ...OnboardingTheme.container,
      height: '100%',
      padding: 20,
      justifyContent: 'space-between'
    },
    // No properties needed, just helpful labels
    contentContainer: {},
    controlsContainer: {}
  });
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      flex: 1
    },
    edges: ['left', 'right', 'bottom']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    contentContainerStyle: {
      flexGrow: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.screenContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.contentContainer
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.preface, {
    style: {
      alignSelf: 'center',
      marginBottom: 20
    },
    height: 200
  }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "headingTwo"
  }, t('Preface.PrimaryHeading')), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: {
      marginTop: 20,
      marginBottom: 20
    }
  }, t('Preface.Paragraph1'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.controlsContainer
  }, /*#__PURE__*/_react.default.createElement(_CheckBoxRow.default, {
    title: t('Preface.Confirmed'),
    accessibilityLabel: t('Terms.IAgree'),
    testID: (0, _testable.testIdWithKey)('IAgree'),
    checked: checked,
    onPress: () => setChecked(!checked),
    reverse: true,
    titleStyle: {
      fontWeight: TextTheme.bold.fontWeight
    }
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      paddingTop: 10
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Global.Continue'),
    accessibilityLabel: t('Global.Continue'),
    testID: (0, _testable.testIdWithKey)('Continue'),
    disabled: !checked,
    onPress: onSubmitPressed,
    buttonType: _Button.ButtonType.Primary
  }))))));
};
var _default = exports.default = Preface;
//# sourceMappingURL=Preface.js.map