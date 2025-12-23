"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@credo-ts/react-hooks");
var _legacy = require("@hyperledger/aries-oca/build/legacy");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _reactNativeToastMessage = _interopRequireDefault(require("react-native-toast-message"));
var _CardWatermark = _interopRequireDefault(require("../components/misc/CardWatermark"));
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
var _remove = require("../types/remove");
var _credential = require("../utils/credential");
var _helpers = require("../utils/helpers");
var _oca = require("../utils/oca");
var _testable = require("../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const paddingHorizontal = 24;
const paddingVertical = 16;
const logoHeight = 80;
const CredentialDetails = ({
  navigation,
  route
}) => {
  var _metadata$get, _overlay$brandingOver, _overlay$brandingOver2, _overlay$brandingOver3, _overlay$brandingOver4;
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('CredentialDetails route prams were not set properly');
  }
  const {
    credential
  } = route === null || route === void 0 ? void 0 : route.params;
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  const {
    t,
    i18n
  } = (0, _reactI18next.useTranslation)();
  const {
    TextTheme,
    ColorPallet
  } = (0, _theme.useTheme)();
  const [CredentialCard, bundleResolver] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMP_CREDENTIAL_CARD, _containerApi.TOKENS.UTIL_OCA_RESOLVER]);
  const [isRevoked, setIsRevoked] = (0, _react.useState)(false);
  const [revocationDate, setRevocationDate] = (0, _react.useState)('');
  const [preciseRevocationDate, setPreciseRevocationDate] = (0, _react.useState)('');
  const [isRemoveModalDisplayed, setIsRemoveModalDisplayed] = (0, _react.useState)(false);
  const [isRevokedMessageHidden, setIsRevokedMessageHidden] = (0, _react.useState)(((_metadata$get = credential.metadata.get(_metadata.CredentialMetadata.customMetadata)) === null || _metadata$get === void 0 ? void 0 : _metadata$get.revoked_detail_dismissed) ?? false);
  const [overlay, setOverlay] = (0, _react.useState)({
    bundle: undefined,
    presentationFields: [],
    metaOverlay: undefined,
    brandingOverlay: undefined
  });
  const credentialConnectionLabel = (0, _helpers.useCredentialConnectionLabel)(credential);
  const {
    width,
    height
  } = (0, _reactNative.useWindowDimensions)();
  const styles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: (_overlay$brandingOver = overlay.brandingOverlay) === null || _overlay$brandingOver === void 0 ? void 0 : _overlay$brandingOver.primaryBackgroundColor,
      display: 'flex'
    },
    secondaryHeaderContainer: {
      height: 1.5 * logoHeight,
      backgroundColor: ((_overlay$brandingOver2 = overlay.brandingOverlay) !== null && _overlay$brandingOver2 !== void 0 && _overlay$brandingOver2.backgroundImage ? 'rgba(0, 0, 0, 0)' : (_overlay$brandingOver3 = overlay.brandingOverlay) === null || _overlay$brandingOver3 === void 0 ? void 0 : _overlay$brandingOver3.secondaryBackgroundColor) ?? 'rgba(0, 0, 0, 0.24)'
    },
    primaryHeaderContainer: {
      paddingHorizontal,
      paddingVertical
    },
    statusContainer: {},
    logoContainer: {
      top: -0.5 * logoHeight,
      left: paddingHorizontal,
      marginBottom: -1 * logoHeight,
      width: logoHeight,
      height: logoHeight,
      backgroundColor: '#ffffff',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 1
      },
      shadowOpacity: 0.3
    },
    textContainer: {
      color: (0, _credential.credentialTextColor)(ColorPallet, (_overlay$brandingOver4 = overlay.brandingOverlay) === null || _overlay$brandingOver4 === void 0 ? void 0 : _overlay$brandingOver4.primaryBackgroundColor)
    }
  });
  (0, _react.useEffect)(() => {
    if (!agent || !credential) {
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, new _error.BifoldError(t('Error.Title1033'), t('Error.Message1033'), t('CredentialDetails.CredentialNotFound'), 1033));
    }
  }, []);
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
      var _bundle$presentationF;
      setOverlay({
        ...overlay,
        ...bundle,
        presentationFields: (_bundle$presentationF = bundle.presentationFields) === null || _bundle$presentationF === void 0 ? void 0 : _bundle$presentationF.filter(field => field.value)
      });
    });
  }, [credential]);
  (0, _react.useEffect)(() => {
    if (credential !== null && credential !== void 0 && credential.revocationNotification) {
      const meta = credential.metadata.get(_metadata.CredentialMetadata.customMetadata);
      credential.metadata.set(_metadata.CredentialMetadata.customMetadata, {
        ...meta,
        revoked_seen: true
      });
      agent === null || agent === void 0 || agent.credentials.update(credential);
    }
  }, [isRevoked]);
  const handleOnRemove = () => {
    setIsRemoveModalDisplayed(true);
  };
  const handleSubmitRemove = async () => {
    try {
      if (!(agent && credential)) {
        return;
      }
      await agent.credentials.deleteById(credential.id);
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
  };
  const handleCancelRemove = () => {
    setIsRemoveModalDisplayed(false);
  };
  const handleDismissRevokedMessage = () => {
    setIsRevokedMessageHidden(true);
    const meta = credential.metadata.get(_metadata.CredentialMetadata.customMetadata);
    credential.metadata.set(_metadata.CredentialMetadata.customMetadata, {
      ...meta,
      revoked_detail_dismissed: true
    });
    agent === null || agent === void 0 || agent.credentials.update(credential);
  };
  const callOnRemove = (0, _react.useCallback)(() => handleOnRemove(), []);
  const callSubmitRemove = (0, _react.useCallback)(() => handleSubmitRemove(), []);
  const callCancelRemove = (0, _react.useCallback)(() => handleCancelRemove(), []);
  const callDismissRevokedMessage = (0, _react.useCallback)(() => handleDismissRevokedMessage(), []);
  const CredentialCardLogo = () => {
    var _overlay$brandingOver5, _overlay$brandingOver6, _ref, _overlay$metaOverlay, _overlay$metaOverlay2;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.logoContainer
    }, (_overlay$brandingOver5 = overlay.brandingOverlay) !== null && _overlay$brandingOver5 !== void 0 && _overlay$brandingOver5.logo ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: (0, _credential.toImageSource)((_overlay$brandingOver6 = overlay.brandingOverlay) === null || _overlay$brandingOver6 === void 0 ? void 0 : _overlay$brandingOver6.logo),
      style: {
        resizeMode: 'cover',
        width: logoHeight,
        height: logoHeight,
        borderRadius: 8
      }
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [TextTheme.title, {
        fontSize: 0.5 * logoHeight,
        color: '#000'
      }]
    }, (_ref = ((_overlay$metaOverlay = overlay.metaOverlay) === null || _overlay$metaOverlay === void 0 ? void 0 : _overlay$metaOverlay.name) ?? ((_overlay$metaOverlay2 = overlay.metaOverlay) === null || _overlay$metaOverlay2 === void 0 ? void 0 : _overlay$metaOverlay2.issuer) ?? 'C') === null || _ref === void 0 ? void 0 : _ref.charAt(0).toUpperCase()));
  };
  const CredentialDetailPrimaryHeader = () => {
    var _overlay$metaOverlay3, _overlay$metaOverlay4, _overlay$metaOverlay5, _overlay$metaOverlay6;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      testID: (0, _testable.testIdWithKey)('CredentialDetailsPrimaryHeader'),
      style: [styles.primaryHeaderContainer, {
        zIndex: -1
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, ((_overlay$metaOverlay3 = overlay.metaOverlay) === null || _overlay$metaOverlay3 === void 0 ? void 0 : _overlay$metaOverlay3.watermark) && /*#__PURE__*/_react.default.createElement(_CardWatermark.default, {
      width: width,
      height: height,
      watermark: (_overlay$metaOverlay4 = overlay.metaOverlay) === null || _overlay$metaOverlay4 === void 0 ? void 0 : _overlay$metaOverlay4.watermark
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      testID: (0, _testable.testIdWithKey)('CredentialIssuer'),
      style: [TextTheme.label, styles.textContainer, {
        paddingLeft: logoHeight + paddingVertical,
        paddingBottom: paddingVertical,
        lineHeight: 19,
        opacity: 0.8
      }],
      numberOfLines: 1
    }, (_overlay$metaOverlay5 = overlay.metaOverlay) === null || _overlay$metaOverlay5 === void 0 ? void 0 : _overlay$metaOverlay5.issuer), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      testID: (0, _testable.testIdWithKey)('CredentialName'),
      style: [TextTheme.normal, styles.textContainer, {
        lineHeight: 24
      }]
    }, (_overlay$metaOverlay6 = overlay.metaOverlay) === null || _overlay$metaOverlay6 === void 0 ? void 0 : _overlay$metaOverlay6.name)));
  };
  const CredentialDetailSecondaryHeader = () => {
    var _overlay$brandingOver7, _overlay$brandingOver8;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (_overlay$brandingOver7 = overlay.brandingOverlay) !== null && _overlay$brandingOver7 !== void 0 && _overlay$brandingOver7.backgroundImage ? /*#__PURE__*/_react.default.createElement(_reactNative.ImageBackground, {
      source: (0, _credential.toImageSource)((_overlay$brandingOver8 = overlay.brandingOverlay) === null || _overlay$brandingOver8 === void 0 ? void 0 : _overlay$brandingOver8.backgroundImage),
      imageStyle: {
        resizeMode: 'cover'
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      testID: (0, _testable.testIdWithKey)('CredentialDetailsSecondaryHeader'),
      style: styles.secondaryHeaderContainer
    })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      testID: (0, _testable.testIdWithKey)('CredentialDetailsSecondaryHeader'),
      style: styles.secondaryHeaderContainer
    }));
  };
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
    }, /*#__PURE__*/_react.default.createElement(CredentialDetailSecondaryHeader, null), /*#__PURE__*/_react.default.createElement(CredentialCardLogo, null), /*#__PURE__*/_react.default.createElement(CredentialDetailPrimaryHeader, null), isRevoked && !isRevokedMessageHidden ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        padding: paddingVertical,
        paddingTop: 0
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
    }, credentialConnectionLabel ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        backgroundColor: ColorPallet.brand.secondaryBackground,
        marginTop: paddingVertical,
        paddingHorizontal,
        paddingVertical
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      testID: (0, _testable.testIdWithKey)('IssuerName')
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [TextTheme.title, isRevoked && {
        color: ColorPallet.grayscale.mediumGrey
      }]
    }, t('CredentialDetails.IssuedBy') + ' '), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [TextTheme.normal, isRevoked && {
        color: ColorPallet.grayscale.mediumGrey
      }]
    }, credentialConnectionLabel))) : null, isRevoked ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        backgroundColor: ColorPallet.notification.error,
        marginTop: paddingVertical,
        paddingHorizontal,
        paddingVertical
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      testID: (0, _testable.testIdWithKey)('RevokedDate')
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [TextTheme.title, {
        color: ColorPallet.notification.errorText
      }]
    }, t('CredentialDetails.Revoked') + ': '), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [TextTheme.normal, {
        color: ColorPallet.notification.errorText
      }]
    }, preciseRevocationDate)), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [TextTheme.normal, {
        color: ColorPallet.notification.errorText,
        marginTop: paddingVertical
      }],
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