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
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _ConnectionImage = _interopRequireDefault(require("../components/misc/ConnectionImage"));
var _CommonRemoveModal = _interopRequireDefault(require("../components/modals/CommonRemoveModal"));
var _Record = _interopRequireDefault(require("../components/record/Record"));
var _constants = require("../constants");
var _containerApi = require("../container-api");
var _animatedComponents = require("../contexts/animated-components");
var _network = require("../contexts/network");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _tourContext = require("../contexts/tour/tour-context");
var _connections = require("../hooks/connections");
var _types = require("../modules/history/types");
var _error = require("../types/error");
var _navigators = require("../types/navigators");
var _remove = require("../types/remove");
var _agent = require("../utils/agent");
var _credential = require("../utils/credential");
var _helpers = require("../utils/helpers");
var _oca = require("../utils/oca");
var _testable = require("../utils/testable");
var _CredentialOfferAccept = _interopRequireDefault(require("./CredentialOfferAccept"));
var _tour = require("../types/tour");
var _ThemedText = require("../components/texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const CredentialOffer = ({
  navigation,
  credentialId
}) => {
  var _useOutOfBandByConnec;
  const {
    agent
  } = (0, _agent.useAppAgent)();
  const {
    t,
    i18n
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const {
    RecordLoading
  } = (0, _animatedComponents.useAnimatedComponents)();
  const {
    assertNetworkConnected
  } = (0, _network.useNetwork)();
  const [CredentialCard, bundleResolver, {
    enableTours: enableToursConfig
  }, logger, historyManagerCurried, historyEnabled, historyEventsLogger] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMPONENT_CREDENTIAL_CARD, _containerApi.TOKENS.UTIL_OCA_RESOLVER, _containerApi.TOKENS.CONFIG, _containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.FN_LOAD_HISTORY, _containerApi.TOKENS.HISTORY_ENABLED, _containerApi.TOKENS.HISTORY_EVENTS_LOGGER]);
  const [loading, setLoading] = (0, _react.useState)(true);
  const [buttonsVisible, setButtonsVisible] = (0, _react.useState)(true);
  const [acceptModalVisible, setAcceptModalVisible] = (0, _react.useState)(false);
  const [declineModalVisible, setDeclineModalVisible] = (0, _react.useState)(false);
  const [overlay, setOverlay] = (0, _react.useState)({
    presentationFields: []
  });
  const credential = (0, _reactHooks.useCredentialById)(credentialId);
  const credentialConnectionLabel = (0, _helpers.useCredentialConnectionLabel)(credential);
  const [store, dispatch] = (0, _store2.useStore)();
  const {
    start
  } = (0, _tourContext.useTour)();
  const screenIsFocused = (0, _native.useIsFocused)();
  const goalCode = (_useOutOfBandByConnec = (0, _connections.useOutOfBandByConnectionId)((credential === null || credential === void 0 ? void 0 : credential.connectionId) ?? '')) === null || _useOutOfBandByConnec === void 0 || (_useOutOfBandByConnec = _useOutOfBandByConnec.outOfBandInvitation) === null || _useOutOfBandByConnec === void 0 ? void 0 : _useOutOfBandByConnec.goalCode;
  const [ConnectionAlert] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMPONENT_CONNECTION_ALERT]);
  const styles = _reactNative.StyleSheet.create({
    headerTextContainer: {
      paddingHorizontal: 25,
      paddingVertical: 16
    },
    headerText: {
      flexShrink: 1
    },
    footerButton: {
      paddingTop: 10
    }
  });
  (0, _react.useEffect)(() => {
    const shouldShowTour = enableToursConfig && store.tours.enableTours && !store.tours.seenCredentialOfferTour;
    if (shouldShowTour && screenIsFocused) {
      start(_tour.BaseTourID.CredentialOfferTour);
      dispatch({
        type: _store.DispatchAction.UPDATE_SEEN_CREDENTIAL_OFFER_TOUR,
        payload: [true]
      });
    }
  }, [enableToursConfig, store.tours.enableTours, store.tours.seenCredentialOfferTour, screenIsFocused, start, dispatch]);
  (0, _react.useEffect)(() => {
    if (!agent || !credential) {
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, new _error.BifoldError(t('Error.Title1035'), t('Error.Message1035'), t('CredentialOffer.CredentialNotFound'), 1035));
    }
  }, [agent, credential, t]);
  (0, _react.useEffect)(() => {
    if (!(credential && (0, _credential.isValidAnonCredsCredential)(credential) && agent)) {
      return;
    }
    const updateCredentialPreview = async () => {
      const {
        ...formatData
      } = await agent.modules.didcomm.credentials.getFormatData(credential.id);
      const {
        offer,
        offerAttributes
      } = formatData;
      const offerData = (offer === null || offer === void 0 ? void 0 : offer.anoncreds) ?? (offer === null || offer === void 0 ? void 0 : offer.indy);
      if (offerData) {
        await (0, _credential.ensureCredentialMetadata)(credential, agent, {
          schema_id: offerData.schema_id,
          cred_def_id: offerData.cred_def_id
        }, logger);
      }
      if (offerAttributes) {
        credential.credentialAttributes = [...offerAttributes.map(item => new _didcomm.DidCommCredentialPreviewAttribute(item))];
      }
    };
    const resolvePresentationFields = async () => {
      const identifiers = (0, _credential.getCredentialIdentifiers)(credential);
      const attributes = (0, _oca.buildFieldsFromAnonCredsCredential)(credential);
      const bundle = await bundleResolver.resolveAllBundles({
        identifiers,
        attributes,
        language: i18n.language
      });
      const fields = (bundle === null || bundle === void 0 ? void 0 : bundle.presentationFields) ?? [];
      const metaOverlay = (bundle === null || bundle === void 0 ? void 0 : bundle.metaOverlay) ?? {};
      return {
        fields,
        metaOverlay
      };
    };

    /**
     * FIXME: Formatted data needs to be added to the record in Credo extensions
     * For now the order here matters. The credential preview must be updated to
     * add attributes (since these are not available in the offer).
     * Once the credential is updated the presentation fields can be correctly resolved
     */
    setLoading(true);
    updateCredentialPreview().then(() => resolvePresentationFields()).then(({
      fields,
      metaOverlay
    }) => {
      setOverlay({
        metaOverlay: metaOverlay,
        presentationFields: fields.filter(field => field.value)
      });
      setLoading(false);
    });
  }, [credential, agent, bundleResolver, i18n.language, logger]);
  const toggleDeclineModalVisible = (0, _react.useCallback)(() => setDeclineModalVisible(prev => !prev), []);
  const logHistoryRecord = (0, _react.useCallback)(async type => {
    try {
      var _overlay$metaOverlay;
      if (!(agent && historyEnabled)) {
        logger.trace(`[${CredentialOffer.name}]:[logHistoryRecord] Skipping history log, either history function disabled or agent undefined!`);
        return;
      }
      const historyManager = historyManagerCurried(agent);
      if (!credential) {
        logger.error(`[${CredentialOffer.name}]:[logHistoryRecord] Cannot save history, credential undefined!`);
        return;
      }
      const name = (0, _credential.getEffectiveCredentialName)(credential, (_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.name);

      /** Save history record for card accepted */
      const recordData = {
        type: type,
        message: name,
        createdAt: credential === null || credential === void 0 ? void 0 : credential.createdAt,
        correspondenceId: credentialId,
        correspondenceName: credentialConnectionLabel
      };
      historyManager.saveHistory(recordData);
    } catch (err) {
      logger.error(`[${CredentialOffer.name}]:[logHistoryRecord] Error saving history: ${err}`);
    }
  }, [agent, historyEnabled, logger, historyManagerCurried, credential, credentialId, credentialConnectionLabel, overlay]);
  const handleAcceptTouched = (0, _react.useCallback)(async () => {
    try {
      if (!(agent && credential && assertNetworkConnected())) {
        return;
      }
      setAcceptModalVisible(true);
      await agent.modules.didcomm.credentials.acceptOffer({
        credentialExchangeRecordId: credential.id
      });
      if (historyEventsLogger.logAttestationAccepted) {
        const type = _types.HistoryCardType.CardAccepted;
        await logHistoryRecord(type);
      }
    } catch (err) {
      setButtonsVisible(true);
      const error = new _error.BifoldError(t('Error.Title1024'), t('Error.Message1024'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1024);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
  }, [agent, credential, assertNetworkConnected, logHistoryRecord, t, historyEventsLogger.logAttestationAccepted]);
  const handleDeclineTouched = (0, _react.useCallback)(async () => {
    try {
      var _navigation$getParent;
      if (agent && credential) {
        const connectionId = credential.connectionId ?? '';
        const connection = await agent.modules.didcomm.connections.findById(connectionId);
        await agent.modules.didcomm.credentials.declineOffer({
          credentialExchangeRecordId: credential.id
        });
        if (connection) {
          await agent.modules.didcomm.credentials.sendProblemReport({
            credentialExchangeRecordId: credential.id,
            description: t('CredentialOffer.Declined')
          });
        }
      }
      toggleDeclineModalVisible();
      if (historyEventsLogger.logAttestationRefused) {
        const type = _types.HistoryCardType.CardDeclined;
        await logHistoryRecord(type);
      }
      (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.TabStacks.HomeStack, {
        screen: _navigators.Screens.Home
      });
    } catch (err) {
      const error = new _error.BifoldError(t('Error.Title1025'), t('Error.Message1025'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1025);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
  }, [agent, credential, t, toggleDeclineModalVisible, navigation, logHistoryRecord, historyEventsLogger.logAttestationRefused]);
  const header = () => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ConnectionImage.default, {
      connectionId: credential === null || credential === void 0 ? void 0 : credential.connectionId
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.headerTextContainer
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: styles.headerText,
      testID: (0, _testable.testIdWithKey)('HeaderText')
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, credentialConnectionLabel || t('ContactDetails.AContact')), ' ', t('CredentialOffer.IsOfferingYouACredential'))), !loading && credential && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        marginHorizontal: 15,
        marginBottom: 16
      }
    }, /*#__PURE__*/_react.default.createElement(CredentialCard, {
      credential: credential
    })));
  };
  const footer = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        paddingHorizontal: 25,
        paddingVertical: 16,
        paddingBottom: 26,
        backgroundColor: ColorPalette.brand.secondaryBackground
      }
    }, loading ? /*#__PURE__*/_react.default.createElement(RecordLoading, null) : null, Boolean(credentialConnectionLabel) && goalCode === 'aries.vc.issue' && /*#__PURE__*/_react.default.createElement(ConnectionAlert, {
      connectionLabel: credentialConnectionLabel
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.footerButton
    }, /*#__PURE__*/_react.default.createElement(_Button.default, {
      title: t('Global.Accept'),
      accessibilityLabel: t('Global.Accept'),
      testID: (0, _testable.testIdWithKey)('AcceptCredentialOffer'),
      buttonType: _Button.ButtonType.Primary,
      onPress: handleAcceptTouched,
      disabled: !buttonsVisible
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.footerButton
    }, /*#__PURE__*/_react.default.createElement(_Button.default, {
      title: t('Global.Decline'),
      accessibilityLabel: t('Global.Decline'),
      testID: (0, _testable.testIdWithKey)('DeclineCredentialOffer'),
      buttonType: _Button.ButtonType.Secondary,
      onPress: toggleDeclineModalVisible,
      disabled: !buttonsVisible
    })));
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      flexGrow: 1
    },
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/_react.default.createElement(_Record.default, {
    fields: overlay.presentationFields || [],
    header: header,
    footer: footer
  }), /*#__PURE__*/_react.default.createElement(_CredentialOfferAccept.default, {
    visible: acceptModalVisible,
    credentialId: credentialId
  }), /*#__PURE__*/_react.default.createElement(_CommonRemoveModal.default, {
    usage: _remove.ModalUsage.CredentialOfferDecline,
    visible: declineModalVisible,
    onSubmit: handleDeclineTouched,
    onCancel: toggleDeclineModalVisible
  }));
};
var _default = exports.default = CredentialOffer;
//# sourceMappingURL=CredentialOffer.js.map