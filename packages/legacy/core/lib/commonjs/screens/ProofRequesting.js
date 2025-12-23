"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@credo-ts/core");
var _reactHooks = require("@credo-ts/react-hooks");
var _ariesBifoldVerifier = require("@hyperledger/aries-bifold-verifier");
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeDeviceInfo = require("react-native-device-info");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _LoadingIndicator = _interopRequireDefault(require("../components/animated/LoadingIndicator"));
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _HeaderButton = _interopRequireWildcard(require("../components/buttons/HeaderButton"));
var _QRRenderer = _interopRequireDefault(require("../components/misc/QRRenderer"));
var _constants = require("../constants");
var _store = require("../contexts/store");
var _theme = require("../contexts/theme");
var _connections = require("../hooks/connections");
var _proofRequestTemplates = require("../hooks/proof-request-templates");
var _error = require("../types/error");
var _navigators = require("../types/navigators");
var _helpers = require("../utils/helpers");
var _testable = require("../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useQrSizeForDevice = () => {
  const {
    width
  } = (0, _reactNative.useWindowDimensions)();
  const qrContainerSize = (0, _reactNativeDeviceInfo.isTablet)() ? width - width * 0.3 : width - 20;
  const qrSize = qrContainerSize - 20;
  return {
    qrSize,
    qrContainerSize
  };
};
const ProofRequesting = ({
  route,
  navigation
}) => {
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('ProofRequesting route prams were not set properly');
  }
  const {
    templateId,
    predicateValues
  } = route === null || route === void 0 ? void 0 : route.params;
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  if (!agent) {
    throw new Error('Unable to fetch agent from Credo');
  }
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const isFocused = (0, _native.useIsFocused)();
  const [store] = (0, _store.useStore)();
  const [generating, setGenerating] = (0, _react.useState)(true);
  const [message, setMessage] = (0, _react.useState)(undefined);
  const [connectionRecordId, setConnectionRecordId] = (0, _react.useState)(undefined);
  const [proofRecordId, setProofRecordId] = (0, _react.useState)(undefined);
  const record = (0, _connections.useConnectionByOutOfBandId)(connectionRecordId ?? '');
  const proofRecord = (0, _reactHooks.useProofById)(proofRecordId ?? '');
  const template = (0, _proofRequestTemplates.useTemplate)(templateId);
  const {
    qrSize,
    qrContainerSize
  } = useQrSizeForDevice();
  const styles = _reactNative.StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: ColorPallet.grayscale.white
    },
    headerContainer: {
      alignItems: 'center',
      paddingVertical: 16,
      marginHorizontal: 20,
      textAlign: 'center'
    },
    primaryHeaderText: {
      ...TextTheme.headingThree,
      textAlign: 'center',
      marginTop: 20
    },
    secondaryHeaderText: {
      ...TextTheme.normal,
      textAlign: 'center',
      marginTop: 8,
      color: ColorPallet.grayscale.black
    },
    interopText: {
      alignSelf: 'center',
      marginBottom: -20,
      paddingHorizontal: 10,
      backgroundColor: ColorPallet.grayscale.white,
      zIndex: 100,
      textAlign: 'center',
      fontWeight: TextTheme.bold.fontWeight,
      fontSize: 22,
      color: ColorPallet.brand.primary
    },
    qrContainer: {
      height: qrContainerSize,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
      marginTop: 15
    },
    buttonContainer: {
      marginTop: 'auto',
      marginHorizontal: 20,
      marginBottom: 10
    }
  });
  const createProofRequest = (0, _react.useCallback)(async () => {
    try {
      setMessage(undefined);
      setGenerating(true);
      const result = await (0, _helpers.createTempConnectionInvitation)(agent, 'verify');
      if (result) {
        setConnectionRecordId(result.record.id);
        setMessage(result.invitationUrl);
      }
    } catch (e) {
      const error = new _error.BifoldError(t('Error.Title1038'), t('Error.Message1038'), (e === null || e === void 0 ? void 0 : e.message) ?? e, 1038);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
      navigation.goBack();
    } finally {
      setGenerating(false);
    }
  }, []);
  (0, _native.useFocusEffect)((0, _react.useCallback)(() => {
    const onBackPress = () => {
      navigation.navigate(_navigators.Screens.ProofRequests, {});
      return true;
    };
    _reactNative.BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => _reactNative.BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []));
  (0, _react.useEffect)(() => {
    if (message && store.preferences.enableShareableLink) {
      const scanShareUrl = () => /*#__PURE__*/_react.default.createElement(_HeaderButton.default, {
        buttonLocation: _HeaderButton.ButtonLocation.Right,
        accessibilityLabel: t('Global.Share'),
        testID: (0, _testable.testIdWithKey)('ShareButton'),
        onPress: () => {
          _reactNative.Share.share({
            message
          });
        },
        icon: "share-variant"
      });
      navigation.setOptions({
        headerRight: scanShareUrl
      });
    }
  }, [message, store.preferences.enableShareableLink]);
  (0, _react.useEffect)(() => {
    if (isFocused) {
      createProofRequest();
    }
  }, [isFocused]);
  (0, _react.useEffect)(() => {
    if (!template) {
      return;
    }
    const sendAsyncProof = async () => {
      if (record && record.state === _core.DidExchangeState.Completed) {
        //send haptic feedback to verifier that connection is completed
        _reactNative.Vibration.vibrate();
        // send proof logic
        const result = await (0, _ariesBifoldVerifier.sendProofRequest)(agent, template, record.id, predicateValues);
        if (result !== null && result !== void 0 && result.proofRecord) {
          // verifier side doesn't have access to the goal code so we need to add metadata here
          const metadata = result.proofRecord.metadata.get(_ariesBifoldVerifier.ProofMetadata.customMetadata);
          result.proofRecord.metadata.set(_ariesBifoldVerifier.ProofMetadata.customMetadata, {
            ...metadata,
            delete_conn_after_seen: true
          });
          (0, _ariesBifoldVerifier.linkProofWithTemplate)(agent, result.proofRecord, templateId);
        }
        setProofRecordId(result === null || result === void 0 ? void 0 : result.proofRecord.id);
      }
    };
    sendAsyncProof();
  }, [record, template]);
  (0, _react.useEffect)(() => {
    if (proofRecord && proofRecord.state === _core.ProofState.RequestSent) {
      navigation.navigate(_navigators.Screens.MobileVerifierLoading, {
        proofId: proofRecord.id,
        connectionId: (record === null || record === void 0 ? void 0 : record.id) ?? ''
      });
    }
  }, [proofRecord]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.container,
    edges: ['left', 'right', 'bottom']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.qrContainer
  }, generating && /*#__PURE__*/_react.default.createElement(_LoadingIndicator.default, null), message && /*#__PURE__*/_react.default.createElement(_QRRenderer.default, {
    value: message,
    size: qrSize
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.secondaryHeaderText
  }, t('Verifier.ScanQR')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.primaryHeaderText
  }, template === null || template === void 0 ? void 0 : template.name))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Verifier.RefreshQR'),
    accessibilityLabel: t('Verifier.RefreshQR'),
    testID: (0, _testable.testIdWithKey)('GenerateNewQR'),
    buttonType: _Button.ButtonType.Primary,
    onPress: () => createProofRequest(),
    disabled: generating
  })));
};
var _default = exports.default = ProofRequesting;
//# sourceMappingURL=ProofRequesting.js.map