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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ProofCancelModal = ({
  visible,
  onDone
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPallet,
    TextTheme,
    Assets
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    safeAreaView: {
      backgroundColor: ColorPallet.brand.modalPrimaryBackground,
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
      ...TextTheme.modalTitle,
      marginTop: 60,
      marginBottom: 30,
      textAlign: 'center'
    },
    image: {
      alignSelf: 'center',
      marginBottom: 50
    },
    subtext: {
      ...TextTheme.modalNormal,
      textAlign: 'center'
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.Modal, {
    visible: visible,
    animationType: "slide"
  }, /*#__PURE__*/React.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.safeAreaView
  }, /*#__PURE__*/React.createElement(_reactNative.ScrollView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.content
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: styles.heading
  }, t('ProofRequest.NoInfoShared')), /*#__PURE__*/React.createElement(Assets.svg.noInfoShared, {
    style: styles.image,
    height: 200
  }), /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: styles.subtext
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