"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _theme = require("../../contexts/theme");
var _testable = require("../../utils/testable");
var _Button = _interopRequireWildcard(require("../buttons/Button"));
var _ThemedText = require("../texts/ThemedText");
var _SafeAreaModal = _interopRequireDefault(require("./SafeAreaModal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ProofCancelModal = ({
  visible,
  onDone
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette,
    Assets
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    safeAreaView: {
      backgroundColor: ColorPalette.brand.modalPrimaryBackground,
      flex: 1
    },
    container: {
      flexGrow: 1,
      padding: 20
    },
    controlsContainer: {
      marginHorizontal: 20,
      marginBottom: 10
    },
    content: {
      justifyContent: 'space-around'
    },
    heading: {
      marginTop: 60,
      marginBottom: 30,
      textAlign: 'center'
    },
    image: {
      alignSelf: 'center',
      marginBottom: 50
    }
  });
  return /*#__PURE__*/React.createElement(_SafeAreaModal.default, {
    visible: visible,
    animationType: "slide"
  }, /*#__PURE__*/React.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.safeAreaView
  }, /*#__PURE__*/React.createElement(_reactNative.ScrollView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.content
  }, /*#__PURE__*/React.createElement(_ThemedText.ThemedText, {
    variant: "modalTitle",
    style: styles.heading
  }, t('ProofRequest.NoInfoShared')), /*#__PURE__*/React.createElement(Assets.svg.noInfoShared, {
    style: styles.image,
    height: 200
  }), /*#__PURE__*/React.createElement(_ThemedText.ThemedText, {
    variant: "modalNormal",
    style: {
      textAlign: 'center'
    }
  }, t('ProofRequest.YourInfo')))), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.controlsContainer
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement(_Button.default, {
    title: t('Global.Done'),
    accessibilityLabel: t('Global.Done'),
    testID: (0, _testable.testIdWithKey)('Done'),
    onPress: onDone,
    buttonType: _Button.ButtonType.ModalPrimary
  })))));
};
var _default = exports.default = ProofCancelModal;
//# sourceMappingURL=ProofCancelModal.js.map