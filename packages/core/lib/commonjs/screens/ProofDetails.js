"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _didcomm = require("@credo-ts/didcomm");
var _verifier = require("@bifold/verifier");
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _SharedProofData = _interopRequireDefault(require("../components/misc/SharedProofData"));
var _store = require("../contexts/store");
var _containerApi = require("../container-api");
var _theme = require("../contexts/theme");
var _navigators = require("../types/navigators");
var _helpers = require("../utils/helpers");
var _testable = require("../utils/testable");
var _connections = require("../hooks/connections");
var _ThemedText = require("../components/texts/ThemedText");
var _screenCapture = _interopRequireDefault(require("../hooks/screen-capture"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const VerifiedProof = ({
  record,
  isHistory,
  senderReview,
  connectionLabel,
  onBackPressed,
  onGenerateNewPressed
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette,
    TextTheme,
    Assets
  } = (0, _theme.useTheme)();
  const [sharedProofDataItems, setSharedProofDataItems] = (0, _react.useState)([]);
  const styles = _reactNative.StyleSheet.create({
    container: {
      flexGrow: 1
    },
    iconContainer: {
      backgroundColor: ColorPalette.notification.info,
      width: 100,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15,
      borderRadius: 50,
      borderColor: ColorPalette.notification.infoBorder,
      borderWidth: 3,
      alignSelf: 'center',
      overflow: 'hidden'
    },
    header: {
      paddingHorizontal: 30,
      paddingTop: 20
    },
    headerTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    descriptionContainer: {
      marginHorizontal: 30,
      marginVertical: 30
    },
    label: {
      fontWeight: TextTheme.bold.fontWeight
    },
    content: {
      flexGrow: 1,
      marginHorizontal: 30,
      marginTop: 10
    },
    footerButton: {
      margin: 20
    }
  });
  const onSharedProofDataLoad = (0, _react.useCallback)(data => {
    setSharedProofDataItems(data);
  }, []);
  if (isHistory) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      style: {
        flexGrow: 1
      },
      testID: (0, _testable.testIdWithKey)('ProofDetailsHistoryView')
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.container
    }, sharedProofDataItems.length > 0 && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.descriptionContainer
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, senderReview ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, t('ProofRequest.ReviewSentInformation', {
      count: sharedProofDataItems.length
    }), ' ', /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: styles.label
    }, connectionLabel)) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: styles.label
    }, connectionLabel), ' ', t('ProofRequest.ShareFollowingInformation', {
      count: sharedProofDataItems.length
    })))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, /*#__PURE__*/_react.default.createElement(_SharedProofData.default, {
      recordId: record.id,
      onSharedProofDataLoad: onSharedProofDataLoad
    }))));
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    contentContainerStyle: {
      flexGrow: 1
    },
    testID: (0, _testable.testIdWithKey)('ProofDetailsView')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.header
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.iconContainer
  }, /*#__PURE__*/_react.default.createElement(Assets.svg.informationReceived, null)), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold"
  }, t('Verifier.InformationReceived') + ' '), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('Verifier.InformationReceivedDetails')))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.content
  }, /*#__PURE__*/_react.default.createElement(_SharedProofData.default, {
    recordId: record.id
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.footerButton
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginBottom: 15
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Verifier.GenerateNewQR'),
    accessibilityLabel: t('Verifier.GenerateNewQR'),
    testID: (0, _testable.testIdWithKey)('GenerateNewQR'),
    buttonType: _Button.ButtonType.Primary,
    onPress: onGenerateNewPressed
  })), /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Verifier.BackToList'),
    accessibilityLabel: t('Verifier.BackToList'),
    testID: (0, _testable.testIdWithKey)('BackToList'),
    buttonType: _Button.ButtonType.Secondary,
    onPress: onBackPressed
  }))));
};
const UnverifiedProof = ({
  record,
  onBackPressed,
  onGenerateNewPressed
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    TextTheme,
    Assets
  } = (0, _theme.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    header: {
      paddingHorizontal: 20,
      paddingVertical: 30
    },
    headerTitleContainer: {
      marginTop: 70,
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    headerTitle: {
      ...TextTheme.headingTwo,
      fontWeight: TextTheme.normal.fontWeight
    },
    footerButtons: {
      margin: 20,
      marginTop: 'auto'
    },
    buttonContainer: {
      marginBottom: 10,
      width: '100%'
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    contentContainerStyle: {
      flexGrow: 1
    },
    testID: (0, _testable.testIdWithKey)('UnverifiedProofView')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.header
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerTitleContainer
  }, record.state === _didcomm.DidCommProofState.Abandoned && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold",
    style: styles.headerTitle
  }, t('ProofRequest.ProofRequestDeclined')), record.isVerified === false && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    variant: "bold",
    style: styles.headerTitle
  }, t('Verifier.ProofVerificationFailed'))), /*#__PURE__*/_react.default.createElement(Assets.svg.verifierRequestDeclined, {
    style: {
      alignSelf: 'center',
      marginTop: 20
    },
    height: 200
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.footerButtons
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Verifier.GenerateNewQR'),
    accessibilityLabel: t('Verifier.GenerateNewQR'),
    testID: (0, _testable.testIdWithKey)('GenerateNewQR'),
    buttonType: _Button.ButtonType.Primary,
    onPress: onGenerateNewPressed
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Verifier.BackToList'),
    accessibilityLabel: t('Verifier.BackToList'),
    testID: (0, _testable.testIdWithKey)('BackToList'),
    buttonType: _Button.ButtonType.Secondary,
    onPress: onBackPressed
  }))));
};
const ProofDetails = ({
  route,
  navigation
}) => {
  var _useOutOfBandByConnec;
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('ProofRequesting route params were not set properly');
  }
  const {
    recordId,
    isHistory,
    senderReview
  } = route.params;
  const record = (0, _reactHooks.useProofById)(recordId);
  const connection = (0, _reactHooks.useConnectionById)((record === null || record === void 0 ? void 0 : record.connectionId) ?? '');
  const goalCode = (_useOutOfBandByConnec = (0, _connections.useOutOfBandByConnectionId)((connection === null || connection === void 0 ? void 0 : connection.id) ?? '')) === null || _useOutOfBandByConnec === void 0 ? void 0 : _useOutOfBandByConnec.outOfBandInvitation.goalCode;
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const [store] = (0, _store.useStore)();
  const [logger, {
    preventScreenCapture
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.CONFIG]);
  (0, _screenCapture.default)(preventScreenCapture);
  const connectionLabel = (0, _react.useMemo)(() => connection ? (0, _helpers.getConnectionName)(connection, store.preferences.alternateContactNames) : t('Verifier.ConnectionLessLabel'), [connection, store.preferences.alternateContactNames, t]);
  const cleanup = (0, _react.useCallback)(() => {
    if (!agent) {
      return;
    }
    const promises = Array();
    if (!store.preferences.useDataRetention) {
      promises.push(agent.modules.proofs.deleteById(recordId));
    }
    if (record && record.connectionId && (record.metadata.get(_verifier.ProofMetadata.customMetadata).delete_conn_after_seen || goalCode !== null && goalCode !== void 0 && goalCode.endsWith('verify.once'))) {
      promises.push(agent.modules.connections.deleteById(record.connectionId));
    }
    return Promise.allSettled(promises);
  }, [store.preferences.useDataRetention, agent, recordId, record, goalCode]);
  const onBackPressed = (0, _react.useCallback)(() => {
    var _cleanup;
    (_cleanup = cleanup()) === null || _cleanup === void 0 || _cleanup.catch(err => logger.error(`Error cleaning up proof, ${err}`));
    if (route.params.isHistory) {
      navigation.goBack();
      return null;
    }
    navigation.navigate(_navigators.Screens.ProofRequests, {});
    return null;
  }, [navigation, cleanup, route.params.isHistory, logger]);
  const onGenerateNewPressed = (0, _react.useCallback)(() => {
    var _cleanup2;
    if (!record) {
      return;
    }
    (_cleanup2 = cleanup()) === null || _cleanup2 === void 0 || _cleanup2.catch(err => logger.error(`Error cleaning up proof, ${err}`));
    const metadata = record.metadata.get(_verifier.ProofMetadata.customMetadata);
    if (metadata !== null && metadata !== void 0 && metadata.proof_request_template_id) {
      navigation.navigate(_navigators.Screens.ProofRequesting, {
        templateId: metadata.proof_request_template_id
      });
    } else {
      navigation.navigate(_navigators.Screens.ProofRequests, {});
    }
  }, [record, navigation, cleanup, logger]);
  (0, _react.useEffect)(() => {
    var _record$metadata;
    if (agent && record && !((_record$metadata = record.metadata) !== null && _record$metadata !== void 0 && (_record$metadata = _record$metadata.data) !== null && _record$metadata !== void 0 && (_record$metadata = _record$metadata.customMetadata) !== null && _record$metadata !== void 0 && _record$metadata.details_seen)) {
      (0, _verifier.markProofAsViewed)(agent, record);
    }
  }, [agent, record]);
  (0, _native.useFocusEffect)((0, _react.useCallback)(() => {
    const subscription = _reactNative.BackHandler.addEventListener('hardwareBackPress', onBackPressed);
    return () => subscription.remove();
  }, [onBackPressed]));
  (0, _react.useEffect)(() => {
    if (!connectionLabel || !isHistory) {
      return;
    }
    navigation.setOptions({
      title: connectionLabel
    });
  }, [isHistory, navigation, connectionLabel]);
  if (!record) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      flexGrow: 1
    },
    edges: ['left', 'right']
  }, (record.isVerified || senderReview) && /*#__PURE__*/_react.default.createElement(VerifiedProof, {
    record: record,
    isHistory: isHistory,
    senderReview: senderReview,
    connectionLabel: connectionLabel,
    onBackPressed: onBackPressed,
    onGenerateNewPressed: onGenerateNewPressed
  }), !(record.isVerified || senderReview) && /*#__PURE__*/_react.default.createElement(UnverifiedProof, {
    record: record,
    onBackPressed: onBackPressed,
    onGenerateNewPressed: onGenerateNewPressed
  }));
};
var _default = exports.default = ProofDetails;
//# sourceMappingURL=ProofDetails.js.map