"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.OpenIDCredScreenMode = void 0;
var _react = _interopRequireWildcard(require("react"));
var _navigators = require("../../../types/navigators");
var _display = require("../display");
var _CommonRemoveModal = _interopRequireDefault(require("../../../components/modals/CommonRemoveModal"));
var _remove = require("../../../types/remove");
var _reactNative = require("react-native");
var _reactI18next = require("react-i18next");
var _testable = require("../../../utils/testable");
var _theme = require("../../../contexts/theme");
var _error = require("../../../types/error");
var _constants = require("../../../constants");
var _reactHooks = require("@bifold/react-hooks");
var _RecordRemove = _interopRequireDefault(require("../../../components/record/RecordRemove"));
var _OpenIDCredentialRecordProvider = require("../context/OpenIDCredentialRecordProvider");
var _types = require("../types");
var _containerApi = require("../../../container-api");
var _Record = _interopRequireDefault(require("../../../components/record/Record"));
var _oca = require("../../../utils/oca");
var _CredentialDetailSecondaryHeader = _interopRequireDefault(require("../../../components/views/CredentialDetailSecondaryHeader"));
var _CredentialCardLogo = _interopRequireDefault(require("../../../components/views/CredentialCardLogo"));
var _CredentialDetailPrimaryHeader = _interopRequireDefault(require("../../../components/views/CredentialDetailPrimaryHeader"));
var _ScreenLayout = _interopRequireDefault(require("../../../layout/ScreenLayout"));
var _OpenIDCredentialCard = _interopRequireDefault(require("../components/OpenIDCredentialCard"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
let OpenIDCredScreenMode = exports.OpenIDCredScreenMode = /*#__PURE__*/function (OpenIDCredScreenMode) {
  OpenIDCredScreenMode[OpenIDCredScreenMode["offer"] = 0] = "offer";
  OpenIDCredScreenMode[OpenIDCredScreenMode["details"] = 1] = "details";
  return OpenIDCredScreenMode;
}({});
const paddingHorizontal = 24;
const paddingVertical = 16;
const OpenIDCredentialDetails = ({
  navigation,
  route
}) => {
  var _overlay$brandingOver;
  const {
    credentialId,
    type
  } = route.params;
  const [credential, setCredential] = (0, _react.useState)(undefined);
  const [credentialDisplay, setCredentialDisplay] = (0, _react.useState)();
  const {
    t,
    i18n
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette,
    TextTheme
  } = (0, _theme.useTheme)();
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const {
    removeCredential,
    getW3CCredentialById,
    getSdJwtCredentialById
  } = (0, _OpenIDCredentialRecordProvider.useOpenIDCredentials)();
  const [bundleResolver] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_OCA_RESOLVER]);
  const [isRemoveModalDisplayed, setIsRemoveModalDisplayed] = (0, _react.useState)(false);
  const [credentialRemoved, setCredentialRemoved] = (0, _react.useState)(false);
  const [overlay, setOverlay] = (0, _react.useState)({
    bundle: undefined,
    presentationFields: [],
    metaOverlay: undefined,
    brandingOverlay: undefined
  });
  const styles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: (_overlay$brandingOver = overlay.brandingOverlay) === null || _overlay$brandingOver === void 0 ? void 0 : _overlay$brandingOver.primaryBackgroundColor,
      display: 'flex'
    },
    cardContainer: {
      paddingHorizontal: 10,
      paddingVertical: 30
    }
  });
  (0, _react.useEffect)(() => {
    if (!agent) return;
    const fetchCredential = async () => {
      if (credentialRemoved) return;
      try {
        let record;
        if (type === _types.OpenIDCredentialType.SdJwtVc) {
          record = await getSdJwtCredentialById(credentialId);
        } else {
          record = await getW3CCredentialById(credentialId);
        }
        setCredential(record);
      } catch {
        // credential not found for id, display an error
        _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, new _error.BifoldError(t('Error.Title1033'), t('Error.Message1033'), t('CredentialDetails.CredentialNotFound'), 1035));
      }
    };
    fetchCredential();
  }, [credentialId, type, getSdJwtCredentialById, getW3CCredentialById, agent, t, credentialRemoved]);
  (0, _react.useEffect)(() => {
    if (!credential) return;
    try {
      const credDisplay = (0, _display.getCredentialForDisplay)(credential);
      setCredentialDisplay(credDisplay);
    } catch {
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, new _error.BifoldError(t('Error.Title1033'), t('Error.Message1033'), t('CredentialDetails.CredentialNotFound'), 1034));
    }
  }, [credential, t]);
  (0, _react.useEffect)(() => {
    if (!credentialDisplay || !bundleResolver || !i18n || !credentialDisplay.display) {
      return;
    }
    const resolveOverlay = async () => {
      const resolvedOverlay = await (0, _oca.buildOverlayFromW3cCredential)({
        credentialDisplay,
        language: i18n.language,
        resolver: bundleResolver
      });
      setOverlay(resolvedOverlay);
    };
    resolveOverlay();
  }, [credentialDisplay, bundleResolver, i18n]);
  const toggleDeclineModalVisible = () => {
    if (credentialRemoved) {
      return;
    }
    setIsRemoveModalDisplayed(!isRemoveModalDisplayed);
  };
  const handleDeclineTouched = async () => {
    setCredentialRemoved(true);
    setIsRemoveModalDisplayed(false);
    await new Promise(resolve => setTimeout(resolve, 500));
    handleRemove();
  };
  const handleRemove = async () => {
    if (!credential) return;
    try {
      await removeCredential(credential, type);
      navigation.pop();
    } catch (err) {
      const error = new _error.BifoldError(t('Error.Title1025'), t('Error.Message1025'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1025);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    }
  };

  //To be used only in specific cases where consistency with anoncreds needed
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const legacyHeader = () => {
    if (!credentialDisplay) return null;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_CredentialDetailSecondaryHeader.default, {
      overlay: overlay
    }), /*#__PURE__*/_react.default.createElement(_CredentialCardLogo.default, {
      overlay: overlay
    }), /*#__PURE__*/_react.default.createElement(_CredentialDetailPrimaryHeader.default, {
      overlay: overlay
    }));
  };
  const renderOpenIdCard = () => {
    if (!credentialDisplay) return null;
    return /*#__PURE__*/_react.default.createElement(_OpenIDCredentialCard.default, {
      credentialDisplay: credentialDisplay,
      credentialRecord: credential
    });
  };
  const header = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.cardContainer
    }, renderOpenIdCard());
  };
  const footer = () => {
    if (!credentialDisplay) return null;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        marginBottom: 50
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        backgroundColor: ColorPalette.brand.secondaryBackground,
        marginTop: paddingVertical,
        paddingHorizontal,
        paddingVertical
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      testID: (0, _testable.testIdWithKey)('IssuerName')
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [TextTheme.title]
    }, t('CredentialDetails.IssuedBy') + ' '), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [TextTheme.normal]
    }, credentialDisplay.display.issuer.name || t('ContactDetails.AContact')))), /*#__PURE__*/_react.default.createElement(_RecordRemove.default, {
      onRemove: toggleDeclineModalVisible
    }));
  };
  return /*#__PURE__*/_react.default.createElement(_ScreenLayout.default, {
    screen: _navigators.Screens.OpenIDCredentialDetails
  }, /*#__PURE__*/_react.default.createElement(_Record.default, {
    fields: overlay.presentationFields || [],
    hideFieldValues: true,
    header: header,
    footer: footer
  }), /*#__PURE__*/_react.default.createElement(_CommonRemoveModal.default, {
    usage: _remove.ModalUsage.CredentialRemove,
    visible: isRemoveModalDisplayed,
    onSubmit: handleDeclineTouched,
    onCancel: toggleDeclineModalVisible
  }));
};
var _default = exports.default = OpenIDCredentialDetails;
//# sourceMappingURL=OpenIDCredentialDetails.js.map