"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@credo-ts/core");
var _reactHooks = require("@credo-ts/react-hooks");
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _animatedComponents = require("../contexts/animated-components");
var _theme = require("../contexts/theme");
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ProofRequestAccept = ({
  visible,
  proofId
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [proofDeliveryStatus, setProofDeliveryStatus] = (0, _react.useState)(_core.ProofState.RequestReceived);
  const proof = (0, _reactHooks.useProofById)(proofId);
  const navigation = (0, _native.useNavigation)();
  const {
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const {
    SendingProof,
    SentProof
  } = (0, _animatedComponents.useAnimatedComponents)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: ColorPallet.brand.modalPrimaryBackground,
      padding: 20
    },
    image: {
      marginTop: 20
    },
    messageContainer: {
      alignItems: 'center'
    },
    messageText: {
      fontWeight: TextTheme.normal.fontWeight,
      textAlign: 'center',
      marginTop: 30
    },
    controlsContainer: {
      marginTop: 'auto',
      margin: 20
    },
    delayMessageText: {
      textAlign: 'center',
      marginTop: 20
    }
  });
  if (!proof) {
    throw new Error('Unable to fetch proof from Credo');
  }
  const onBackToHomeTouched = () => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.TabStacks.HomeStack, {
      screen: _navigators.Screens.Home
    });
  };
  (0, _react.useEffect)(() => {
    if (proof.state === proofDeliveryStatus) {
      return;
    }
    if (proof.state === _core.ProofState.Done || proof.state === _core.ProofState.PresentationSent) {
      setProofDeliveryStatus(proof.state);
    }
  }, [proof]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    visible: visible,
    transparent: true,
    animationType: 'none'
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      backgroundColor: ColorPallet.brand.modalPrimaryBackground
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.messageContainer
  }, proofDeliveryStatus === _core.ProofState.RequestReceived && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [TextTheme.modalHeadingThree, styles.messageText],
    testID: (0, _testable.testIdWithKey)('SendingProofRequest')
  }, t('ProofRequest.SendingTheInformationSecurely')), (proofDeliveryStatus === _core.ProofState.PresentationSent || proofDeliveryStatus === _core.ProofState.Done) && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [TextTheme.modalHeadingThree, styles.messageText],
    testID: (0, _testable.testIdWithKey)('SentProofRequest')
  }, t('ProofRequest.InformationSentSuccessfully'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.image, {
      minHeight: 250,
      alignItems: 'center',
      justifyContent: 'flex-end'
    }]
  }, proofDeliveryStatus === _core.ProofState.RequestReceived && /*#__PURE__*/_react.default.createElement(SendingProof, null), (proofDeliveryStatus === _core.ProofState.PresentationSent || proofDeliveryStatus === _core.ProofState.Done) && /*#__PURE__*/_react.default.createElement(SentProof, null))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.controlsContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Loading.BackToHome'),
    accessibilityLabel: t('Loading.BackToHome'),
    testID: (0, _testable.testIdWithKey)('BackToHome'),
    onPress: onBackToHomeTouched,
    buttonType: _Button.ButtonType.ModalSecondary
  })))));
};
var _default = exports.default = ProofRequestAccept;
//# sourceMappingURL=ProofRequestAccept.js.map