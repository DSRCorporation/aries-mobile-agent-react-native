"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _didcomm = require("@credo-ts/didcomm");
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _SafeAreaModal = _interopRequireDefault(require("../components/modals/SafeAreaModal"));
var _animatedComponents = require("../contexts/animated-components");
var _theme = require("../contexts/theme");
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
var _ThemedText = require("../components/texts/ThemedText");
var _ScreenWrapper = _interopRequireDefault(require("../components/views/ScreenWrapper"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ProofRequestAccept = ({
  visible,
  proofId,
  confirmationOnly
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [proofDeliveryStatus, setProofDeliveryStatus] = (0, _react.useState)(_didcomm.DidCommProofState.RequestReceived);
  const proof = (0, _reactHooks.useProofById)(proofId);
  const navigation = (0, _native.useNavigation)();
  const {
    TextTheme
  } = (0, _theme.useTheme)();
  const {
    SendingProof,
    SentProof
  } = (0, _animatedComponents.useAnimatedComponents)();
  const styles = _reactNative.StyleSheet.create({
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
    delayMessageText: {
      textAlign: 'center',
      marginTop: 20
    }
  });
  if (!proof && !confirmationOnly) {
    throw new Error('Unable to fetch proof from Credo');
  }
  const onBackToHomeTouched = () => {
    var _navigation$getParent;
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.TabStacks.HomeStack, {
      screen: _navigators.Screens.Home
    });
  };
  (0, _react.useEffect)(() => {
    if (confirmationOnly) {
      setProofDeliveryStatus(_didcomm.DidCommProofState.PresentationSent);
      return;
    }
    if (!proof) return;
    if (proof.state === proofDeliveryStatus) {
      return;
    }
    if (proof.state === _didcomm.DidCommProofState.Done || proof.state === _didcomm.DidCommProofState.PresentationSent) {
      setProofDeliveryStatus(proof.state);
    }
  }, [proof, proofDeliveryStatus, confirmationOnly]);
  const controls = /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Loading.BackToHome'),
    accessibilityLabel: t('Loading.BackToHome'),
    testID: (0, _testable.testIdWithKey)('BackToHome'),
    onPress: onBackToHomeTouched,
    buttonType: _Button.ButtonType.ModalSecondary
  });
  return /*#__PURE__*/_react.default.createElement(_SafeAreaModal.default, {
    visible: visible,
    transparent: true,
    animationType: 'none'
  }, /*#__PURE__*/_react.default.createElement(_ScreenWrapper.default, {
    edges: ['bottom', 'top', 'left', 'right'],
    controls: controls
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.messageContainer
  }, proofDeliveryStatus === _didcomm.DidCommProofState.RequestReceived && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "modalHeadingThree",
    style: styles.messageText,
    testID: (0, _testable.testIdWithKey)('SendingProofRequest')
  }, t('ProofRequest.SendingTheInformationSecurely')), (proofDeliveryStatus === _didcomm.DidCommProofState.PresentationSent || proofDeliveryStatus === _didcomm.DidCommProofState.Done) && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "modalHeadingThree",
    style: styles.messageText,
    testID: (0, _testable.testIdWithKey)('SentProofRequest')
  }, t('ProofRequest.InformationSentSuccessfully'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.image, {
      minHeight: 250,
      alignItems: 'center',
      justifyContent: 'flex-end'
    }]
  }, proofDeliveryStatus === _didcomm.DidCommProofState.RequestReceived && /*#__PURE__*/_react.default.createElement(SendingProof, null), (proofDeliveryStatus === _didcomm.DidCommProofState.PresentationSent || proofDeliveryStatus === _didcomm.DidCommProofState.Done) && /*#__PURE__*/_react.default.createElement(SentProof, null))));
};
var _default = exports.default = ProofRequestAccept;
//# sourceMappingURL=ProofRequestAccept.js.map