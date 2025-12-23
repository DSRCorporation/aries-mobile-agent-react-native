"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@credo-ts/react-hooks");
var _ariesBifoldVerifier = require("@hyperledger/aries-bifold-verifier");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _PresentationLoading = _interopRequireDefault(require("../components/animated/PresentationLoading"));
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _theme = require("../contexts/theme");
var _connections = require("../hooks/connections");
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  if (!agent) {
    throw new Error('Unable to fetch agent from Credo');
  }
  const {
    t
  } = (0, _reactI18next.useTranslation)();
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
  const onDismissModalTouched = () => {
    navigation.pop();
  };
  (0, _react.useEffect)(() => {
    if (proofRecord && ((0, _ariesBifoldVerifier.isPresentationReceived)(proofRecord) || (0, _ariesBifoldVerifier.isPresentationFailed)(proofRecord))) {
      if (goalCode !== null && goalCode !== void 0 && goalCode.endsWith('verify.once')) {
        agent.connections.deleteById(connectionId);
      }
      navigation.replace(_navigators.Screens.ProofDetails, {
        recordId: proofRecord.id
      });
    }
  }, [proofRecord]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    transparent: true,
    animationType: 'slide'
  }, /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
    style: {
      backgroundColor: ColorPallet.brand.modalPrimaryBackground
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.messageContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [TextTheme.modalHeadingThree, styles.messageText],
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