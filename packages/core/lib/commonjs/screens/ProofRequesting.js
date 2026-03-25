"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _verifier = require("@bifold/verifier");
var _reactHooks = require("@bifold/react-hooks");
var _didcomm = require("@credo-ts/didcomm");
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeDeviceInfo = require("react-native-device-info");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _containerApi = require("../container-api");
var _LoadingIndicator = _interopRequireDefault(require("../components/animated/LoadingIndicator"));
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _IconButton = _interopRequireWildcard(require("../components/buttons/IconButton"));
var _QRRenderer = _interopRequireDefault(require("../components/misc/QRRenderer"));
var _ThemedText = require("../components/texts/ThemedText");
var _constants = require("../constants");
var _store = require("../contexts/store");
var _theme = require("../contexts/theme");
var _connections = require("../hooks/connections");
var _proofRequestTemplates = require("../hooks/proof-request-templates");
var _error = require("../types/error");
var _navigators = require("../types/navigators");
var _helpers = require("../utils/helpers");
var _testable = require("../utils/testable");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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
    throw new Error('ProofRequesting route params were not set properly');
  }
  const {
    templateId,
    predicateValues
  } = route.params;
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
    ColorPalette,
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
  const [logger] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER]);
  const styles = _reactNative.StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: ColorPalette.grayscale.white
    },
    headerContainer: {
      alignItems: 'center',
      paddingVertical: 16,
      marginHorizontal: 20,
      textAlign: 'center'
    },
    primaryHeaderText: {
      textAlign: 'center',
      marginTop: 20
    },
    secondaryHeaderText: {
      textAlign: 'center',
      marginTop: 8,
      color: ColorPalette.grayscale.black
    },
    interopText: {
      alignSelf: 'center',
      marginBottom: -20,
      paddingHorizontal: 10,
      backgroundColor: ColorPalette.grayscale.white,
      zIndex: 100,
      textAlign: 'center',
      fontWeight: TextTheme.bold.fontWeight,
      fontSize: 22,
      color: ColorPalette.brand.primary
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
  }, [agent, t, navigation]);
  (0, _native.useFocusEffect)((0, _react.useCallback)(() => {
    const onBackPress = () => {
      navigation.navigate(_navigators.Screens.ProofRequests, {});
      return true;
    };
    const subscription = _reactNative.BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [navigation]));
  (0, _react.useEffect)(() => {
    if (message && store.preferences.enableShareableLink) {
      const scanShareUrl = () => /*#__PURE__*/_react.default.createElement(_IconButton.default, {
        buttonLocation: _IconButton.ButtonLocation.Right,
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
  }, [message, store.preferences.enableShareableLink, t, navigation]);
  (0, _react.useEffect)(() => {
    if (isFocused) {
      createProofRequest();
    }
  }, [isFocused, createProofRequest]);
  (0, _react.useEffect)(() => {
    if (!template) {
      return;
    }
    const sendAsyncProof = async () => {
      if (record && record.state === _didcomm.DidCommDidExchangeState.Completed) {
        //send haptic feedback to verifier that connection is completed
        _reactNative.Vibration.vibrate();

        // send proof logic
        const result = await (0, _verifier.sendProofRequest)(agent, template, record.id, predicateValues);
        if (result !== null && result !== void 0 && result.proofRecord) {
          // verifier side doesn't have access to the goal code so we need to add metadata here
          const metadata = result.proofRecord.metadata.get(_verifier.ProofMetadata.customMetadata);
          result.proofRecord.metadata.set(_verifier.ProofMetadata.customMetadata, {
            ...metadata,
            delete_conn_after_seen: true
          });
          (0, _verifier.linkProofWithTemplate)(agent, result.proofRecord, templateId);
        }
        setProofRecordId(result === null || result === void 0 ? void 0 : result.proofRecord.id);
      }
    };
    sendAsyncProof().catch(err => {
      logger.error(`Error sending proof request ${err}`);
    });
  }, [template, record, agent, predicateValues, templateId, logger]);
  (0, _react.useEffect)(() => {
    if (proofRecord && proofRecord.state === _didcomm.DidCommProofState.RequestSent) {
      navigation.navigate(_navigators.Screens.MobileVerifierLoading, {
        proofId: proofRecord.id,
        connectionId: (record === null || record === void 0 ? void 0 : record.id) ?? ''
      });
      setProofRecordId(undefined);
      setConnectionRecordId(undefined);
      setMessage(undefined);
      setGenerating(true);
    }
  }, [proofRecord, navigation, record === null || record === void 0 ? void 0 : record.id]);
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
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: styles.secondaryHeaderText
  }, t('Verifier.ScanQR')), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "headingThree",
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