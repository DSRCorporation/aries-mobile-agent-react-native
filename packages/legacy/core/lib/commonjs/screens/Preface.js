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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: TextTheme.headingTwo
  }, t('Preface.PrimaryHeading')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [TextTheme.normal, {
      marginTop: 20,
      marginBottom: 20
    }]
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