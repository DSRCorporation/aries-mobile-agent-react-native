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
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _informationReceived = _interopRequireDefault(require("../assets/img/information-received.svg"));
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _SharedProofData = _interopRequireDefault(require("../components/misc/SharedProofData"));
var _store = require("../contexts/store");
var _theme = require("../contexts/theme");
var _navigators = require("../types/navigators");
var _helpers = require("../utils/helpers");
var _testable = require("../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const VerifiedProof = ({
  record,
  navigation,
  isHistory,
  senderReview
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const [store] = (0, _store.useStore)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      flexGrow: 1
    },
    iconContainer: {
      backgroundColor: ColorPallet.notification.info,
      width: 100,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15,
      borderRadius: 50,
      borderColor: ColorPallet.notification.infoBorder,
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
    headerTitle: {
      ...TextTheme.bold
    },
    headerDetails: {
      ...TextTheme.normal
    },
    descriptionContainer: {
      marginHorizontal: 30,
      marginVertical: 30
    },
    descriptionText: {
      ...TextTheme.normal
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
  const connection = (0, _reactHooks.useConnectionById)(record.connectionId || '');
  const connectionLabel = (0, _react.useMemo)(() => connection ? (0, _helpers.getConnectionName)(connection, store.preferences.alternateContactNames) : t('Verifier.ConnectionLessLabel'), [connection, store.preferences.alternateContactNames]);
  const [sharedProofDataItems, setSharedProofDataItems] = (0, _react.useState)([]);
  const onSharedProofDataLoad = data => {
    setSharedProofDataItems(data);
  };
  const onGenerateNew = (0, _react.useCallback)(() => {
    const metadata = record.metadata.get(_ariesBifoldVerifier.ProofMetadata.customMetadata);
    if (metadata !== null && metadata !== void 0 && metadata.proof_request_template_id) {
      navigation.navigate(_navigators.Screens.ProofRequesting, {
        templateId: metadata.proof_request_template_id
      });
    } else {
      navigation.navigate(_navigators.Screens.ProofRequests, {});
    }
  }, [navigation]);
  const onBack = (0, _react.useCallback)(() => {
    navigation.navigate(_navigators.Screens.ProofRequests, {});
  }, [navigation]);
  (0, _react.useEffect)(() => {
    if (!connection || !isHistory) return;
    navigation.setOptions({
      title: connectionLabel
    });
  }, [connection]);
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
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.descriptionText
    }, senderReview ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, t('ProofRequest.ReviewSentInformation', {
      count: sharedProofDataItems.length
    }), ' ', /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.label
    }, connectionLabel)) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
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
  }, /*#__PURE__*/_react.default.createElement(_informationReceived.default, null)), /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerTitle
  }, t('Verifier.InformationReceived') + ' '), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerDetails
  }, t('Verifier.InformationReceivedDetails')))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
    onPress: onGenerateNew
  })), /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Verifier.BackToList'),
    accessibilityLabel: t('Verifier.BackToList'),
    testID: (0, _testable.testIdWithKey)('BackToList'),
    buttonType: _Button.ButtonType.Secondary,
    onPress: onBack
  }))));
};
const UnverifiedProof = ({
  record,
  navigation
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
  const onGenerateNew = (0, _react.useCallback)(() => {
    const metadata = record.metadata.get(_ariesBifoldVerifier.ProofMetadata.customMetadata);
    if (metadata !== null && metadata !== void 0 && metadata.proof_request_template_id) {
      navigation.navigate(_navigators.Screens.ProofRequesting, {
        templateId: metadata.proof_request_template_id
      });
    } else {
      navigation.navigate(_navigators.Screens.ProofRequests, {});
    }
  }, [navigation]);
  const onBackToList = (0, _react.useCallback)(() => {
    navigation.navigate(_navigators.Screens.ProofRequests, {});
  }, [navigation]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    contentContainerStyle: {
      flexGrow: 1
    },
    testID: (0, _testable.testIdWithKey)('UnverifiedProofView')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.header
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerTitleContainer
  }, record.state === _core.ProofState.Abandoned && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerTitle
  }, t('ProofRequest.ProofRequestDeclined')), record.isVerified === false && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
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
    onPress: onGenerateNew
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    title: t('Verifier.BackToList'),
    accessibilityLabel: t('Verifier.BackToList'),
    testID: (0, _testable.testIdWithKey)('BackToList'),
    buttonType: _Button.ButtonType.Secondary,
    onPress: onBackToList
  }))));
};
const ProofDetails = ({
  route,
  navigation
}) => {
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('ProofRequesting route prams were not set properly');
  }
  const {
    recordId,
    isHistory,
    senderReview
  } = route === null || route === void 0 ? void 0 : route.params;
  const record = (0, _reactHooks.useProofById)(recordId);
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const [store] = (0, _store.useStore)();
  (0, _react.useEffect)(() => {
    return () => {
      if (!store.preferences.useDataRetention) {
        agent === null || agent === void 0 || agent.proofs.deleteById(recordId);
      }
      if ((record === null || record === void 0 ? void 0 : record.metadata.get(_ariesBifoldVerifier.ProofMetadata.customMetadata)).delete_conn_after_seen) {
        agent === null || agent === void 0 || agent.connections.deleteById((record === null || record === void 0 ? void 0 : record.connectionId) ?? '');
      }
    };
  }, []);
  (0, _react.useEffect)(() => {
    var _record$metadata;
    if (agent && record && !((_record$metadata = record.metadata) !== null && _record$metadata !== void 0 && (_record$metadata = _record$metadata.data) !== null && _record$metadata !== void 0 && (_record$metadata = _record$metadata.customMetadata) !== null && _record$metadata !== void 0 && _record$metadata.details_seen)) {
      (0, _ariesBifoldVerifier.markProofAsViewed)(agent, record);
    }
  }, [record]);
  (0, _native.useFocusEffect)((0, _react.useCallback)(() => {
    const onBackPress = () => {
      if (route.params.isHistory) {
        navigation.goBack();
      } else {
        navigation.navigate(_navigators.Screens.ProofRequests, {});
      }
      return true;
    };
    _reactNative.BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => _reactNative.BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []));
  if (!record) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      flexGrow: 1
    },
    edges: ['left', 'right']
  }, (record.isVerified || senderReview) && /*#__PURE__*/_react.default.createElement(VerifiedProof, {
    record: record,
    isHistory: isHistory,
    navigation: navigation,
    senderReview: senderReview
  }), !(record.isVerified || senderReview) && /*#__PURE__*/_react.default.createElement(UnverifiedProof, {
    record: record,
    navigation: navigation
  }));
};
var _default = exports.default = ProofDetails;
//# sourceMappingURL=ProofDetails.js.map