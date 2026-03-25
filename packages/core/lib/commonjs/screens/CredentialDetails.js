"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _legacy = require("@bifold/oca/build/legacy");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _reactNativeToastMessage = _interopRequireDefault(require("react-native-toast-message"));
var _store = require("../contexts/store");
var _InfoBox = _interopRequireWildcard(require("../components/misc/InfoBox"));
var _CommonRemoveModal = _interopRequireDefault(require("../components/modals/CommonRemoveModal"));
var _Record = _interopRequireDefault(require("../components/record/Record"));
var _RecordRemove = _interopRequireDefault(require("../components/record/RecordRemove"));
var _BaseToast = require("../components/toast/BaseToast");
var _constants = require("../constants");
var _containerApi = require("../container-api");
var _theme = require("../contexts/theme");
var _error = require("../types/error");
var _metadata = require("../types/metadata");
var _navigators = require("../types/navigators");
var _remove = require("../types/remove");
var _credential = require("../utils/credential");
var _helpers = require("../utils/helpers");
var _oca = require("../utils/oca");
var _testable = require("../utils/testable");
var _types = require("../modules/history/types");
var _CredentialCardLogo = _interopRequireDefault(require("../components/views/CredentialCardLogo"));
var _CredentialDetailPrimaryHeader = _interopRequireDefault(require("../components/views/CredentialDetailPrimaryHeader"));
var _CredentialDetailSecondaryHeader = _interopRequireDefault(require("../components/views/CredentialDetailSecondaryHeader"));
var _ThemedText = require("../components/texts/ThemedText");
var _CardWatermark = _interopRequireDefault(require("../components/misc/CardWatermark"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const paddingHorizontal = 24;
const paddingVertical = 16;
const CredentialDetails = ({
  navigation,
  route
}) => {
  var _modules, _credential$metadata$, _overlay$brandingOver, _overlay$brandingOver2, _overlay$brandingOver3;
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('CredentialDetails route params were not set properly');
  }
  const {
    credentialId
  } = route.params;
  const {
    width,
    height
  } = (0, _reactNative.useWindowDimensions)();
  const [credential, setCredential] = (0, _react.useState)(undefined);
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const didcommCredentials = (agent === null || agent === void 0 || (_modules = agent.modules) === null || _modules === void 0 || (_modules = _modules.didcomm) === null || _modules === void 0 ? void 0 : _modules.credentials) ?? (agent === null || agent === void 0 ? void 0 : agent.credentials);
  const {
    t,
    i18n
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette,
    Assets
  } = (0, _theme.useTheme)();
  const [bundleResolver, logger, historyManagerCurried, historyEnabled, historyEventsLogger, CredentialCard] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_OCA_RESOLVER, _containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.FN_LOAD_HISTORY, _containerApi.TOKENS.HISTORY_ENABLED, _containerApi.TOKENS.HISTORY_EVENTS_LOGGER, _containerApi.TOKENS.COMPONENT_CREDENTIAL_CARD]);
  const [isRevoked, setIsRevoked] = (0, _react.useState)(false);
  const [revocationDate, setRevocationDate] = (0, _react.useState)('');
  const [preciseRevocationDate, setPreciseRevocationDate] = (0, _react.useState)('');
  const [isRemoveModalDisplayed, setIsRemoveModalDisplayed] = (0, _react.useState)(false);
  const [isRevokedMessageHidden, setIsRevokedMessageHidden] = (0, _react.useState)((credential === null || credential === void 0 || (_credential$metadata$ = credential.metadata.get(_metadata.CredentialMetadata.customMetadata)) === null || _credential$metadata$ === void 0 ? void 0 : _credential$metadata$.revoked_detail_dismissed) ?? false);
  const [store] = (0, _store.useStore)();
  (0, _react.useEffect)(() => {
    var _credential$metadata$2;
    setIsRevokedMessageHidden((credential === null || credential === void 0 || (_credential$metadata$2 = credential.metadata.get(_metadata.CredentialMetadata.customMetadata)) === null || _credential$metadata$2 === void 0 ? void 0 : _credential$metadata$2.revoked_detail_dismissed) ?? false);
  }, [credential === null || credential === void 0 ? void 0 : credential.metadata]);
  (0, _react.useEffect)(() => {
    // fetch credential for ID
    const fetchCredential = async () => {
      try {
        var _didcommCredentials$g;
        const credentialExchangeRecord = await (didcommCredentials === null || didcommCredentials === void 0 || (_didcommCredentials$g = didcommCredentials.getById) === null || _didcommCredentials$g === void 0 ? void 0 : _didcommCredentials$g.call(didcommCredentials, credentialId));
        if (!credentialExchangeRecord) {
          throw new Error('Credential record not found');
        }
        setCredential(credentialExchangeRecord);
      } catch {
        // credential not found for id, display an error
        _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, new _error.BifoldError(t('Error.Title1033'), t('Error.Message1033'), t('CredentialDetails.CredentialNotFound'), 1033));
      }
    };
    fetchCredential();
  }, [credentialId, didcommCredentials, t]);
  const [overlay, setOverlay] = (0, _react.useState)({
    bundle: undefined,
    presentationFields: [],
    metaOverlay: undefined,
    brandingOverlay: undefined
  });
  const credentialConnectionLabel = (0, _helpers.useCredentialConnectionLabel)(credential);
  const isBranding10 = bundleResolver.getBrandingOverlayType() === _legacy.BrandingOverlayType.Branding10;
  const isBranding11 = bundleResolver.getBrandingOverlayType() === _legacy.BrandingOverlayType.Branding11;
  const containerBackgroundColor = (_overlay$brandingOver = overlay.brandingOverlay) !== null && _overlay$brandingOver !== void 0 && _overlay$brandingOver.secondaryBackgroundColor && overlay.brandingOverlay.secondaryBackgroundColor !== '' ? overlay.brandingOverlay.secondaryBackgroundColor : (_overlay$brandingOver2 = overlay.brandingOverlay) === null || _overlay$brandingOver2 === void 0 ? void 0 : _overlay$brandingOver2.primaryBackgroundColor;
  const styles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: isBranding10 ? (_overlay$brandingOver3 = overlay.brandingOverlay) === null || _overlay$brandingOver3 === void 0 ? void 0 : _overlay$brandingOver3.primaryBackgroundColor : containerBackgroundColor,
      display: 'flex'
    }
  });
  const icon = {
    color: (0, _credential.credentialTextColor)(ColorPalette, containerBackgroundColor),
    width: 48,
    height: 48
  };
  const navigateToContactDetails = () => {
    if (credential !== null && credential !== void 0 && credential.connectionId) {
      navigation.navigate(_navigators.Stacks.ContactStack, {
        screen: _navigators.Screens.ContactDetails,
        params: {
          connectionId: credential.connectionId
        }
      });
    }
  };
  const callViewJSONDetails = (0, _react.useCallback)(() => {
    navigation.navigate(_navigators.Stacks.ContactStack, {
      screen: _navigators.Screens.JSONDetails,
      params: {
        jsonBlob: credential
      }
    });
  }, [navigation, credential]);
  (0, _react.useEffect)(() => {
    if (!agent) {
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, new _error.BifoldError(t('Error.Title1033'), t('Error.Message1033'), t('CredentialDetails.CredentialNotFound'), 1033));
    }
  }, [agent, t]);
  (0, _react.useEffect)(() => {
    var _credential$revocatio;
    if (!(credential && (0, _credential.isValidAnonCredsCredential)(credential))) {
      return;
    }
    credential.revocationNotification == undefined ? setIsRevoked(false) : setIsRevoked(true);
    if (credential !== null && credential !== void 0 && (_credential$revocatio = credential.revocationNotification) !== null && _credential$revocatio !== void 0 && _credential$revocatio.revocationDate) {
      const date = new Date(credential.revocationNotification.revocationDate);
      setRevocationDate((0, _helpers.formatTime)(date, {
        shortMonth: true
      }));
      setPreciseRevocationDate((0, _helpers.formatTime)(date, {
        includeHour: true
      }));
    }
    const params = {
      identifiers: (0, _credential.getCredentialIdentifiers)(credential),
      meta: {
        alias: credentialConnectionLabel,
        credConnectionId: credential.connectionId
      },
      attributes: (0, _oca.buildFieldsFromAnonCredsCredential)(credential),
      language: i18n.language
    };
    bundleResolver.resolveAllBundles(params).then(bundle => {
      setOverlay(o => {
        var _bundle$presentationF, _bundle$metaOverlay;
        return {
          ...o,
          ...bundle,
          presentationFields: (_bundle$presentationF = bundle.presentationFields) === null || _bundle$presentationF === void 0 ? void 0 : _bundle$presentationF.filter(field => field.value),
          // Apply effective name
          metaOverlay: {
            ...bundle.metaOverlay,
            name: (0, _credential.getEffectiveCredentialName)(credential, (_bundle$metaOverlay = bundle.metaOverlay) === null || _bundle$metaOverlay === void 0 ? void 0 : _bundle$metaOverlay.name)
          }
        };
      });
    });
  }, [credential, credentialConnectionLabel, bundleResolver, i18n.language]);

  // Ensure credential has all required metadata
  (0, _react.useEffect)(() => {
    if (!credential || !(0, _credential.isValidAnonCredsCredential)(credential) || !agent) {
      return;
    }
    const restoreMetadata = async () => {
      try {
        await (0, _credential.ensureCredentialMetadata)(credential, agent, undefined, logger);
      } catch (error) {
        // If metadata restoration fails, we'll fall back to default credential name
        logger === null || logger === void 0 || logger.warn('Failed to restore credential metadata', {
          error: error
        });
      }
    };
    restoreMetadata();
  }, [credential, agent, logger]);
  (0, _react.useEffect)(() => {
    if (credential !== null && credential !== void 0 && credential.revocationNotification) {
      var _didcommCredentials$u;
      const meta = credential.metadata.get(_metadata.CredentialMetadata.customMetadata);
      credential.metadata.set(_metadata.CredentialMetadata.customMetadata, {
        ...meta,
        revoked_seen: true
      });
      didcommCredentials === null || didcommCredentials === void 0 || (_didcommCredentials$u = didcommCredentials.update) === null || _didcommCredentials$u === void 0 || _didcommCredentials$u.call(didcommCredentials, credential);
    }
  }, [credential, didcommCredentials]);
  const callOnRemove = (0, _react.useCallback)(() => {
    setIsRemoveModalDisplayed(true);
  }, []);
  const logHistoryRecord = (0, _react.useCallback)(async () => {
    try {
      var _overlay$metaOverlay;
      if (!(agent && historyEnabled)) {
        logger.trace(`[${CredentialDetails.name}]:[logHistoryRecord] Skipping history log, either history function disabled or agent undefined!`);
        return;
      }
      if (!credential) {
        logger.error(`[${CredentialDetails.name}]:[logHistoryRecord] Cannot save history, credential undefined!`);
        return;
      }
      const historyManager = historyManagerCurried(agent);
      const name = (0, _credential.getEffectiveCredentialName)(credential, (_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.name);

      /** Save history record for credential removed */
      const recordData = {
        type: _types.HistoryCardType.CardRemoved,
        message: name,
        createdAt: new Date(),
        correspondenceId: credentialId,
        correspondenceName: credentialConnectionLabel
      };
      await historyManager.saveHistory(recordData);
    } catch (err) {
      logger.error(`[${CredentialDetails.name}]:[logHistoryRecord] Error saving history: ${err}`);
    }
  }, [agent, historyEnabled, logger, historyManagerCurried, credential, credentialConnectionLabel, credentialId, overlay]);
  const callSubmitRemove = (0, _react.useCallback)(async () => {
    try {
      if (!(agent && credential)) {
        return;
      }
      if (historyEventsLogger.logAttestationRemoved) {
        await logHistoryRecord();
      }
      await agent.modules.credentials.deleteById(credential.id);
      navigation.pop();

      // FIXME: This delay is a hack so that the toast doesn't appear until the modal is dismissed
      await new Promise(resolve => setTimeout(resolve, 1000));
      _reactNativeToastMessage.default.show({
        type: _BaseToast.ToastType.Success,
        text1: t('CredentialDetails.CredentialRemoved')
      });
    } catch (err) {
      const error = new _error.BifoldError(t('Error.Title1032'), t('Error.Message1032'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1032);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
  }, [agent, credential, navigation, t, historyEventsLogger.logAttestationRemoved, logHistoryRecord]);
  const callCancelRemove = (0, _react.useCallback)(() => {
    setIsRemoveModalDisplayed(false);
  }, []);
  const callDismissRevokedMessage = (0, _react.useCallback)(() => {
    setIsRevokedMessageHidden(true);
    if (credential) {
      var _didcommCredentials$u2;
      const meta = credential.metadata.get(_metadata.CredentialMetadata.customMetadata);
      credential.metadata.set(_metadata.CredentialMetadata.customMetadata, {
        ...meta,
        revoked_detail_dismissed: true
      });
      didcommCredentials === null || didcommCredentials === void 0 || (_didcommCredentials$u2 = didcommCredentials.update) === null || _didcommCredentials$u2 === void 0 || _didcommCredentials$u2.call(didcommCredentials, credential);
    }
  }, [credential, didcommCredentials]);
  const CredentialRevocationMessage = ({
    credential
  }) => {
    var _credential$revocatio2;
    return /*#__PURE__*/_react.default.createElement(_InfoBox.default, {
      notificationType: _InfoBox.InfoBoxType.Error,
      title: t('CredentialDetails.CredentialRevokedMessageTitle') + ' ' + revocationDate,
      description: credential !== null && credential !== void 0 && (_credential$revocatio2 = credential.revocationNotification) !== null && _credential$revocatio2 !== void 0 && _credential$revocatio2.comment ? credential.revocationNotification.comment : t('CredentialDetails.CredentialRevokedMessageBody'),
      onCallToActionLabel: t('Global.Dismiss'),
      onCallToActionPressed: callDismissRevokedMessage
    });
  };
  const getCredentialTop = () => {
    var _overlay$metaOverlay2, _overlay$metaOverlay3, _overlay$metaOverlay4, _overlay$metaOverlay5, _overlay$metaOverlay6;
    if (isBranding10) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_CredentialDetailSecondaryHeader.default, {
        overlay: overlay
      }), /*#__PURE__*/_react.default.createElement(_CredentialCardLogo.default, {
        overlay: overlay
      }), /*#__PURE__*/_react.default.createElement(_CredentialDetailPrimaryHeader.default, {
        overlay: overlay,
        credential: credential
      }));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CredentialDetailSecondaryHeader.default, {
      overlay: overlay,
      brandingOverlayType: bundleResolver.getBrandingOverlayType()
    }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      accessibilityLabel: `${(_overlay$metaOverlay2 = overlay.metaOverlay) !== null && _overlay$metaOverlay2 !== void 0 && _overlay$metaOverlay2.watermark ? overlay.metaOverlay.watermark + '. ' : ''}${t('Credentials.IssuedBy')} ${(_overlay$metaOverlay3 = overlay.metaOverlay) === null || _overlay$metaOverlay3 === void 0 ? void 0 : _overlay$metaOverlay3.issuer}`,
      accessibilityRole: "button",
      accessibilityHint: t('CredentialDetails.NavigateToIssuerDetailsHint'),
      onPress: navigateToContactDetails,
      style: {
        padding: 16,
        overflow: 'hidden'
      }
    }, ((_overlay$metaOverlay4 = overlay.metaOverlay) === null || _overlay$metaOverlay4 === void 0 ? void 0 : _overlay$metaOverlay4.watermark) && /*#__PURE__*/_react.default.createElement(_CardWatermark.default, {
      width: width,
      height: height,
      watermark: (_overlay$metaOverlay5 = overlay.metaOverlay) === null || _overlay$metaOverlay5 === void 0 ? void 0 : _overlay$metaOverlay5.watermark
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 2
      }
    }, /*#__PURE__*/_react.default.createElement(_CredentialCardLogo.default, {
      overlay: overlay,
      brandingOverlayType: bundleResolver.getBrandingOverlayType()
    }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: {
        color: (0, _credential.credentialTextColor)(ColorPalette, containerBackgroundColor),
        flexWrap: 'wrap',
        maxWidth: '90%'
      }
    }, (_overlay$metaOverlay6 = overlay.metaOverlay) === null || _overlay$metaOverlay6 === void 0 ? void 0 : _overlay$metaOverlay6.issuer)), /*#__PURE__*/_react.default.createElement(Assets.svg.iconChevronRight, icon))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        backgroundColor: ColorPalette.brand.secondaryBackground
      }
    }, /*#__PURE__*/_react.default.createElement(_CredentialDetailPrimaryHeader.default, {
      overlay: overlay,
      brandingOverlayType: bundleResolver.getBrandingOverlayType(),
      credential: credential
    })));
  };
  const header = () => {
    return bundleResolver.getBrandingOverlayType() === _legacy.BrandingOverlayType.Branding01 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, null, isRevoked && !isRevokedMessageHidden ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        padding: paddingVertical,
        paddingBottom: 0
      }
    }, credential && /*#__PURE__*/_react.default.createElement(CredentialRevocationMessage, {
      credential: credential
    })) : null, credential && /*#__PURE__*/_react.default.createElement(CredentialCard, {
      credential: credential,
      style: {
        margin: 16
      }
    })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.container
    }, getCredentialTop(), isRevoked && !isRevokedMessageHidden ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        padding: paddingVertical,
        backgroundColor: ColorPalette.brand.secondaryBackground,
        ...(isBranding11 && {
          paddingTop: 0
        })
      }
    }, credential && /*#__PURE__*/_react.default.createElement(CredentialRevocationMessage, {
      credential: credential
    })) : null);
  };
  const footer = () => {
    var _credential$revocatio3;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        marginBottom: 50
      }
    }, credentialConnectionLabel && isBranding10 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        backgroundColor: ColorPalette.brand.secondaryBackground,
        marginTop: paddingVertical,
        paddingHorizontal,
        paddingVertical
      }
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      testID: (0, _testable.testIdWithKey)('IssuerName')
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "title",
      style: isRevoked && {
        color: ColorPalette.grayscale.mediumGrey
      }
    }, t('CredentialDetails.IssuedBy') + ' '), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: isRevoked && {
        color: ColorPalette.grayscale.mediumGrey
      }
    }, credentialConnectionLabel)), store !== null && store !== void 0 && store.preferences.developerModeEnabled && credential !== null && credential !== void 0 && credential.createdAt ? /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      testID: (0, _testable.testIdWithKey)('IssuedDate')
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "title",
      style: isRevoked && {
        color: ColorPalette.grayscale.mediumGrey
      }
    }, t('CredentialDetails.Issued') + ': '), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: isRevoked && {
        color: ColorPalette.grayscale.mediumGrey
      }
    }, (0, _helpers.formatTime)(credential.createdAt, {
      format: 'YYYY-MM-DD HH:mm:ss [UTC]'
    }))) : null) : null, (store === null || store === void 0 ? void 0 : store.preferences.developerModeEnabled) && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        backgroundColor: ColorPalette.brand.secondaryBackground,
        marginTop: paddingVertical,
        paddingHorizontal,
        paddingVertical
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: callViewJSONDetails,
      accessibilityLabel: t('Global.ViewJSON'),
      accessibilityRole: 'button',
      testID: (0, _testable.testIdWithKey)('JSONDetails'),
      style: {
        flexDirection: 'row',
        gap: 8
      }
    }, /*#__PURE__*/_react.default.createElement(Assets.svg.iconCode, {
      width: 20,
      height: 20,
      color: ColorPalette.brand.secondary
    }), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('Global.ViewJSON')))), isRevoked ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        backgroundColor: ColorPalette.notification.error,
        marginTop: paddingVertical,
        paddingHorizontal,
        paddingVertical
      }
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      testID: (0, _testable.testIdWithKey)('RevokedDate')
    }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: "title",
      style: {
        color: ColorPalette.notification.errorText
      }
    }, t('CredentialDetails.Revoked') + ': '), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: {
        color: ColorPalette.notification.errorText
      }
    }, preciseRevocationDate)), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      style: {
        color: ColorPalette.notification.errorText,
        marginTop: paddingVertical
      },
      testID: (0, _testable.testIdWithKey)('RevocationMessage')
    }, credential !== null && credential !== void 0 && (_credential$revocatio3 = credential.revocationNotification) !== null && _credential$revocatio3 !== void 0 && _credential$revocatio3.comment ? credential.revocationNotification.comment : t('CredentialDetails.CredentialRevokedMessageBody'))) : null, /*#__PURE__*/_react.default.createElement(_RecordRemove.default, {
      onRemove: callOnRemove
    }));
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: {
      flexGrow: 1
    },
    edges: ['left', 'right']
  }, /*#__PURE__*/_react.default.createElement(_Record.default, {
    fields: overlay.presentationFields || [],
    hideFieldValues: true,
    header: header,
    footer: footer
  }), /*#__PURE__*/_react.default.createElement(_CommonRemoveModal.default, {
    usage: _remove.ModalUsage.CredentialRemove,
    visible: isRemoveModalDisplayed,
    onSubmit: callSubmitRemove,
    onCancel: callCancelRemove
  }));
};
var _default = exports.default = CredentialDetails;
//# sourceMappingURL=CredentialDetails.js.map