"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _BulletPoint = _interopRequireDefault(require("../components/inputs/BulletPoint"));
var _theme = require("../contexts/theme");
var _testable = require("../utils/testable");
var _ThemedText = require("../components/texts/ThemedText");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const PINExplainer = ({
  continueCreatePIN
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette,
    TextTheme,
    Assets
  } = (0, _theme.useTheme)();
  const style = _reactNative.StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: ColorPalette.brand.primaryBackground
    },
    scrollViewContentContainer: {
      padding: 20,
      flexGrow: 1
    },
    imageContainer: {
      alignItems: 'center',
      marginBottom: 30
    },
    footer: {
      paddingHorizontal: 20,
      paddingVertical: 10
    }
  });
  const imageDisplayOptions = {
    fill: ColorPalette.notification.infoText,
    height: 150,
    width: 150
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: style.safeAreaView,
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    contentContainerStyle: style.scrollViewContentContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "headingTwo"
  }, t('PINCreate.Explainer.PrimaryHeading')), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: {
      marginTop: 30,
      marginBottom: 30
    }
  }, /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
    i18nKey: "PINCreate.Explainer.PINReminder",
    components: {
      b: /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
        variant: "bold"
      })
    },
    t: t
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.imageContainer
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.secureCheck, imageDisplayOptions)), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "headingFour"
  }, t('PINCreate.Explainer.WhyNeedPin.Header')), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: {
      marginTop: 20,
      marginBottom: 20
    }
  }, t('PINCreate.Explainer.WhyNeedPin.Paragraph')), /*#__PURE__*/_react.default.createElement(_BulletPoint.default, {
    text: t('PINCreate.Explainer.WhyNeedPin.ParagraphList1'),
    textStyle: TextTheme.normal
  }), /*#__PURE__*/_react.default.createElement(_BulletPoint.default, {
    text: t('PINCreate.Explainer.WhyNeedPin.ParagraphList2'),
    textStyle: TextTheme.normal
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.footer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Global.Continue'),
    accessibilityLabel: t('Global.Continue'),
    testID: (0, _testable.testIdWithKey)('ContinueCreatePIN'),
    onPress: continueCreatePIN,
    buttonType: _Button.ButtonType.Primary
  })));
};
var _default = exports.default = PINExplainer;
//# sourceMappingURL=PINExplainer.js.map