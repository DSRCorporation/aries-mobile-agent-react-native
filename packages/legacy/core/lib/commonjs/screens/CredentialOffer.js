"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _anoncreds = require("@credo-ts/anoncreds");
var _core = require("@credo-ts/core");
var _reactHooks = require("@credo-ts/react-hooks");
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _ConnectionAlert = _interopRequireDefault(require("../components/misc/ConnectionAlert"));
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
var _tour = require("../types/tour");
var _agent = require("../utils/agent");
var _credDef = require("../utils/cred-def");
var _credential = require("../utils/credential");
var _helpers = require("../utils/helpers");
var _oca = require("../utils/oca");
var _testable = require("../utils/testable");
var _CredentialOfferAccept = _interopRequireDefault(require("./CredentialOfferAccept"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CredentialOffer = ({
  navigation,
  route
}) => {
  var _useOutOfBandByConnec;
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('CredentialOffer route prams were not set properly');
  }
  const {
    credentialId
  } = route.params;
  const {
    agent
  } = (0, _agent.useAppAgent)();
  const {
    t,
    i18n
  } = (0, _reactI18next.useTranslation)();
  const {
    TextTheme,
    ColorPallet
  } = (0, _theme.useTheme)();
  const {
    RecordLoading
  } = (0, _animatedComponents.useAnimatedComponents)();
  const {
    assertConnectedNetwork
  } = (0, _network.useNetwork)();
  const [CredentialCard, bundleResolver, {
    enableTours: enableToursConfig
  }, logger, historyManagerCurried] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMP_CREDENTIAL_CARD, _containerApi.TOKENS.UTIL_OCA_RESOLVER, _containerApi.TOKENS.CONFIG, _containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.FN_LOAD_HISTORY]);
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
  const goalCode = (_useOutOfBandByConnec = (0, _connections.useOutOfBandByConnectionId)((credential === null || credential === void 0 ? void 0 : credential.connectionId) ?? '')) === null || _useOutOfBandByConnec === void 0 ? void 0 : _useOutOfBandByConnec.outOfBandInvitation.goalCode;
  const styles = _reactNative.StyleSheet.create({
    headerTextContainer: {
      paddingHorizontal: 25,
      paddingVertical: 16
    },
    headerText: {
      ...TextTheme.normal,
      flexShrink: 1
    },
    footerButton: {
      paddingTop: 10
    }
  });
  (0, _react.useEffect)(() => {
    const shouldShowTour = enableToursConfig && store.tours.enableTours && !store.tours.seenCredentialOfferTour;
    if (shouldShowTour && screenIsFocused) {
      start(_tour.TourID.CredentialOfferTour);
      dispatch({
        type: _store.DispatchAction.UPDATE_SEEN_CREDENTIAL_OFFER_TOUR,
        payload: [true]
      });
    }
  }, [screenIsFocused]);
  (0, _react.useEffect)(() => {
    if (!agent) {
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, new _error.BifoldError(t('Error.Title1035'), t('Error.Message1035'), t('CredentialOffer.CredentialNotFound'), 1035));
    }
  }, []);
  (0, _react.useEffect)(() => {
    if (!credential) {
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, new _error.BifoldError(t('Error.Title1035'), t('Error.Message1035'), t('CredentialOffer.CredentialNotFound'), 1035));
    }
  }, []);
  (0, _react.useEffect)(() => {
    if (!(credential && (0, _credential.isValidAnonCredsCredential)(credential))) {
      return;
    }
    const updateCredentialPreview = async () => {
      const {
        ...formatData
      } = await (agent === null || agent === void 0 ? void 0 : agent.credentials.getFormatData(credential.id));
      const {
        offer,
        offerAttributes
      } = formatData;
      const offerData = (offer === null || offer === void 0 ? void 0 : offer.anoncreds) ?? (offer === null || offer === void 0 ? void 0 : offer.indy);
      if (offerData) {
        credential.metadata.add(_anoncreds.AnonCredsCredentialMetadataKey, {
          schemaId: offerData.schema_id,
          credentialDefinitionId: offerData.cred_def_id
        });
      }
      if (offerAttributes) {
        credential.credentialAttributes = [...offerAttributes.map(item => new _core.CredentialPreviewAttribute(item))];
      }
    };
    const resolvePresentationFields = async () => {
      const identifiers = (0, _credential.getCredentialIdentifiers)(credential);
      const attributes = (0, _oca.buildFieldsFromAnonCredsCredential)(credential);
      const fields = await bundleResolver.presentationFields({
        identifiers,
        attributes,
        language: i18n.language
      });
      return {
        fields
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
      fields
    }) => {
      setOverlay({
        ...overlay,
        presentationFields: fields.filter(field => field.value)
      });
      setLoading(false);
    });
  }, [credential]);
  const toggleDeclineModalVisible = () => setDeclineModalVisible(!declineModalVisible);
  const logHistoryRecord = async () => {
    try {
      if (!(agent && store.preferences.useHistoryCapability)) {
        logger.trace(`[${CredentialOffer.name}]:[logHistoryRecord] Skipping history log, either history function disabled or agent undefined!`);
        return;
      }
      const historyManager = historyManagerCurried(agent);
      const type = _types.HistoryCardType.CardAccepted;
      if (!credential) {
        logger.error(`[${CredentialOffer.name}]:[logHistoryRecord] Cannot save history, credential undefined!`);
        return;
      }
      const ids = (0, _credential.getCredentialIdentifiers)(credential);
      const name = (0, _credDef.parseCredDefFromId)(ids.credentialDefinitionId, ids.schemaId);

      /** Save history record for card accepted */
      const recordData = {
        type: type,
        message: type,
        createdAt: credential === null || credential === void 0 ? void 0 : credential.createdAt,
        correspondenceId: credentialId,
        correspondenceName: name
      };
      await historyManager.saveHistory(recordData);
    } catch (err) {
      logger.error(`[${CredentialOffer.name}]:[logHistoryRecord] Error saving history: ${err}`);
    }
  };
  const handleAcceptTouched = async () => {
    try {
      if (!(agent && credential && assertConnectedNetwork())) {
        return;
      }
      setAcceptModalVisible(true);
      await agent.credentials.acceptOffer({
        credentialRecordId: credential.id
      });
      await logHistoryRecord();
    } catch (err) {
      setButtonsVisible(true);
      const error = new _error.BifoldError(t('Error.Title1024'), t('Error.Message1024'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1024);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
  };
  const handleDeclineTouched = async () => {
    try {
      var _navigation$getParent;
      if (agent && credential) {
        await agent.credentials.declineOffer(credential.id);
        await agent.credentials.sendProblemReport({
          credentialRecordId: credential.id,
          description: t('CredentialOffer.Declined')
        });
      }
      toggleDeclineModalVisible();
      (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.TabStacks.HomeStack, {
        screen: _navigators.Screens.Home
      });
    } catch (err) {
      const error = new _error.BifoldError(t('Error.Title1025'), t('Error.Message1025'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1025);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
  };
  const header = () => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ConnectionImage.default, {
      connectionId: credential === null || credential === void 0 ? void 0 : credential.connectionId
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.headerTextContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.headerText,
      testID: (0, _testable.testIdWithKey)('HeaderText')
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, credentialConnectionLabel || t('ContactDetails.AContact')), ' ', t('CredentialOffer.IsOfferingYouACredential'))), !loading && credential && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
        backgroundColor: ColorPallet.brand.secondaryBackground
      }
    }, loading ? /*#__PURE__*/_react.default.createElement(RecordLoading, null) : null, credentialConnectionLabel && goalCode === 'aries.vc.issue' ? /*#__PURE__*/_react.default.createElement(_ConnectionAlert.default, {
      connectionID: credentialConnectionLabel
    }) : null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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