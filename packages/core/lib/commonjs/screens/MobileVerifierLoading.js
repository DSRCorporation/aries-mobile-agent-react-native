"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _verifier = require("@bifold/verifier");
var _reactHooks = require("@bifold/react-hooks");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _PresentationLoading = _interopRequireDefault(require("../components/animated/PresentationLoading"));
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _SafeAreaModal = _interopRequireDefault(require("../components/modals/SafeAreaModal"));
var _ThemedText = require("../components/texts/ThemedText");
var _theme = require("../contexts/theme");
var _connections = require("../hooks/connections");
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const MobileVerifierLoading = ({
  navigation,
  route
}) => {
  var _useOutOfBandByConnec;
  const {
    proofId,
    connectionId
  } = route.params;
  const goalCode = (_useOutOfBandByConnec = (0, _connections.useOutOfBandByConnectionId)(connectionId)) === null || _useOutOfBandByConnec === void 0 ? void 0 : _useOutOfBandByConnec.outOfBandInvitation.goalCode;
  const proofRecord = (0, _reactHooks.useProofById)(proofId);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette,
    TextTheme
  } = (0, _theme.useTheme)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  if (!agent) {
    throw new Error('Unable to fetch agent from Credo');
  }
  const styles = _reactNative.StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: ColorPalette.brand.modalPrimaryBackground,
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
  const onDismissModalTouched = (0, _react.useCallback)(() => {
    if (proofRecord && ((0, _verifier.isPresentationReceived)(proofRecord) || (0, _verifier.isPresentationFailed)(proofRecord))) {
      if (goalCode !== null && goalCode !== void 0 && goalCode.endsWith('verify.once')) {
        agent.modules.connections.deleteById(connectionId);
      }
    }
    navigation.pop();
  }, [navigation, proofRecord, goalCode, agent, connectionId]);
  (0, _react.useEffect)(() => {
    if (proofRecord && ((0, _verifier.isPresentationReceived)(proofRecord) || (0, _verifier.isPresentationFailed)(proofRecord))) {
      navigation.replace(_navigators.Screens.ProofDetails, {
        recordId: proofRecord.id
      });
    }
  }, [proofRecord, goalCode, agent, connectionId, navigation]);
  return /*#__PURE__*/_react.default.createElement(_SafeAreaModal.default, {
    transparent: true,
    animationType: 'slide'
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      backgroundColor: ColorPalette.brand.modalPrimaryBackground
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.messageContainer
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "modalHeadingThree",
    style: styles.messageText,
    testID: (0, _testable.testIdWithKey)('VerifierLoading')
  }, t('Verifier.WaitingForResponse'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.image
  }, /*#__PURE__*/_react.default.createElement(_PresentationLoading.default, null))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.controlsContainer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Global.GoBack'),
    accessibilityLabel: t('Global.GoBack'),
    testID: (0, _testable.testIdWithKey)('BackToProofList'),
    onPress: onDismissModalTouched,
    buttonType: _Button.ButtonType.ModalSecondary
  }))));
};
var _default = exports.default = MobileVerifierLoading;
//# sourceMappingURL=MobileVerifierLoading.js.map