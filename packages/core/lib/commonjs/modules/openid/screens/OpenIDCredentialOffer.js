"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _Button = _interopRequireWildcard(require("../../../components/buttons/Button"));
var _CommonRemoveModal = _interopRequireDefault(require("../../../components/modals/CommonRemoveModal"));
var _Record = _interopRequireDefault(require("../../../components/record/Record"));
var _constants = require("../../../constants");
var _theme = require("../../../contexts/theme");
var _containerApi = require("../../../container-api");
var _ScreenLayout = _interopRequireDefault(require("../../../layout/ScreenLayout"));
var _CredentialOfferAccept = _interopRequireDefault(require("../../../screens/CredentialOfferAccept"));
var _error = require("../../../types/error");
var _navigators = require("../../../types/navigators");
var _remove = require("../../../types/remove");
var _testable = require("../../../utils/testable");
var _OpenIDCredentialCard = _interopRequireDefault(require("../components/OpenIDCredentialCard"));
var _OpenIDCredentialRecordProvider = require("../context/OpenIDCredentialRecordProvider");
var _display = require("../display");
var _notification = require("../notification");
var _metadata = require("../metadata");
var _useAcceptReplacement = require("../hooks/useAcceptReplacement");
var _useDeclineReplacement = require("../hooks/useDeclineReplacement");
var _reactNativeUuid = _interopRequireDefault(require("react-native-uuid"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const OpenIDCredentialOffer = ({
  navigation,
  route
}) => {
  // FIXME: change params to accept credential id to avoid 'non-serializable' warnings
  const {
    credential
  } = route.params;
  const [logger] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER]);
  const credentialDisplay = (0, _display.getCredentialForDisplay)(credential);
  const {
    display
  } = credentialDisplay;

  // console.log('$$ ====> Credential Display', JSON.stringify(credentialDisplay))
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
  const {
    resolveBundleForCredential
  } = (0, _OpenIDCredentialRecordProvider.useOpenIDCredentials)();
  const {
    sendOpenId4VciNotification
  } = (0, _notification.useOpenId4VciNotifications)();
  const [isRemoveModalDisplayed, setIsRemoveModalDisplayed] = (0, _react.useState)(false);
  const [buttonsVisible, setButtonsVisible] = (0, _react.useState)(true);
  const [acceptModalVisible, setAcceptModalVisible] = (0, _react.useState)(false);
  const {
    acceptNewCredential
  } = (0, _useAcceptReplacement.useAcceptReplacement)();
  const {
    declineByNewId
  } = (0, _useDeclineReplacement.useDeclineReplacement)({
    logger: logger
  });
  const [overlay, setOverlay] = (0, _react.useState)({
    bundle: undefined,
    presentationFields: [],
    metaOverlay: undefined,
    brandingOverlay: undefined
  });
  (0, _react.useEffect)(() => {
    if (!credential) {
      return;
    }
    const resolveOverlay = async () => {
      const brandingOverlay = await resolveBundleForCredential(credential);
      setOverlay(brandingOverlay);
    };
    resolveOverlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credential]);
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
  const toggleDeclineModalVisible = () => setIsRemoveModalDisplayed(!isRemoveModalDisplayed);
  const handleDeclineTouched = async () => {
    var _navigation$getParent;
    await handleSendNotification(_notification.NotificationEventType.CREDENTIAL_DELETED);
    await declineByNewId(credential.id);
    toggleDeclineModalVisible();
    (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.TabStacks.HomeStack, {
      screen: _navigators.Screens.Home
    });
  };
  const handleSendNotification = async notificationEventType => {
    try {
      var _temporaryMetaVanilla, _temporaryMetaVanilla2;
      if ((_temporaryMetaVanilla = _metadata.temporaryMetaVanillaObject.notificationMetadata) !== null && _temporaryMetaVanilla !== void 0 && _temporaryMetaVanilla.credentialIssuer.notification_endpoint && (_temporaryMetaVanilla2 = _metadata.temporaryMetaVanillaObject.tokenResponse) !== null && _temporaryMetaVanilla2 !== void 0 && _temporaryMetaVanilla2.accessToken) {
        var _temporaryMetaVanilla3, _temporaryMetaVanilla4, _temporaryMetaVanilla5, _temporaryMetaVanilla6;
        await sendOpenId4VciNotification({
          accessToken: (_temporaryMetaVanilla3 = _metadata.temporaryMetaVanillaObject.tokenResponse) === null || _temporaryMetaVanilla3 === void 0 ? void 0 : _temporaryMetaVanilla3.accessToken,
          notificationEvent: notificationEventType,
          notificationId: _reactNativeUuid.default.v4().toString(),
          notificationMetadata: {
            originalDraftVersion: 'V1',
            credentialIssuer: (_temporaryMetaVanilla4 = _metadata.temporaryMetaVanillaObject.notificationMetadata) === null || _temporaryMetaVanilla4 === void 0 ? void 0 : _temporaryMetaVanilla4.credentialIssuer,
            authorizationServers: (_temporaryMetaVanilla5 = _metadata.temporaryMetaVanillaObject.notificationMetadata) === null || _temporaryMetaVanilla5 === void 0 ? void 0 : _temporaryMetaVanilla5.authorizationServers,
            knownCredentialConfigurations: (_temporaryMetaVanilla6 = _metadata.temporaryMetaVanillaObject.notificationMetadata) === null || _temporaryMetaVanilla6 === void 0 ? void 0 : _temporaryMetaVanilla6.knownCredentialConfigurations
          }
        });
      }
    } catch {
      logger.error('[Credential Offer] error sending notification');
    }
  };
  const handleAcceptTouched = async () => {
    if (!agent) {
      return;
    }
    try {
      await acceptNewCredential(credential);
      await handleSendNotification(_notification.NotificationEventType.CREDENTIAL_ACCEPTED);
      setAcceptModalVisible(true);
    } catch (err) {
      setButtonsVisible(true);
      const error = new _error.BifoldError(t('Error.Title1024'), t('Error.Message1024'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1024);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
  };
  const footerButton = (title, buttonPress, buttonType, testID, accessibilityLabel) => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.footerButton
    }, /*#__PURE__*/_react.default.createElement(_Button.default, {
      title: title,
      accessibilityLabel: accessibilityLabel,
      testID: testID,
      buttonType: buttonType,
      onPress: buttonPress,
      disabled: !buttonsVisible
    }));
  };
  const renderOpenIdCard = () => {
    if (!credentialDisplay || !credential) return null;
    return /*#__PURE__*/_react.default.createElement(_OpenIDCredentialCard.default, {
      credentialDisplay: credentialDisplay,
      credentialRecord: credential
    });
  };
  const header = () => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.headerTextContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.headerText,
      testID: (0, _testable.testIdWithKey)('HeaderText')
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, display.issuer.name || t('ContactDetails.AContact')), ' ', t('CredentialOffer.IsOfferingYouACredential'))), credential && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        marginHorizontal: 15,
        marginBottom: 16
      }
    }, renderOpenIdCard()));
  };
  const footer = () => {
    const paddingHorizontal = 24;
    const paddingVertical = 16;
    const paddingBottom = 26;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        marginBottom: 50
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        paddingBottom: paddingBottom,
        backgroundColor: ColorPalette.brand.secondaryBackground
      }
    }, footerButton(t('Global.Accept'), handleAcceptTouched, _Button.ButtonType.Primary, (0, _testable.testIdWithKey)('AcceptCredentialOffer'), t('Global.Accept')), footerButton(t('Global.Decline'), toggleDeclineModalVisible, _Button.ButtonType.Secondary, (0, _testable.testIdWithKey)('DeclineCredentialOffer'), t('Global.Decline'))));
  };
  return /*#__PURE__*/_react.default.createElement(_ScreenLayout.default, {
    screen: _navigators.Screens.OpenIDCredentialDetails
  }, /*#__PURE__*/_react.default.createElement(_Record.default, {
    fields: overlay.presentationFields || [],
    hideFieldValues: true,
    header: header,
    footer: footer
  }), /*#__PURE__*/_react.default.createElement(_CredentialOfferAccept.default, {
    visible: acceptModalVisible,
    credentialId: '',
    confirmationOnly: true
  }), /*#__PURE__*/_react.default.createElement(_CommonRemoveModal.default, {
    usage: _remove.ModalUsage.CredentialOfferDecline,
    visible: isRemoveModalDisplayed,
    onSubmit: handleDeclineTouched,
    onCancel: toggleDeclineModalVisible,
    extraDetails: display.issuer.name
  }));
};
var _default = exports.default = OpenIDCredentialOffer;
//# sourceMappingURL=OpenIDCredentialOffer.js.map