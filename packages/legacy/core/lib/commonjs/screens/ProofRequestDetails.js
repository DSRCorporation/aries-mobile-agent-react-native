"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactHooks = require("@credo-ts/react-hooks");
var _ariesBifoldVerifier = require("@hyperledger/aries-bifold-verifier");
var _ariesOca = require("@hyperledger/aries-oca");
var _TypeEnums = require("@hyperledger/aries-oca/build/types/TypeEnums");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _Button = _interopRequireWildcard(require("../components/buttons/Button"));
var _VerifierCredentialCard = _interopRequireDefault(require("../components/misc/VerifierCredentialCard"));
var _AlertModal = _interopRequireDefault(require("../components/modals/AlertModal"));
var _containerApi = require("../container-api");
var _store = require("../contexts/store");
var _theme = require("../contexts/theme");
var _proofRequestTemplates = require("../hooks/proof-request-templates");
var _navigators = require("../types/navigators");
var _oca = require("../utils/oca");
var _testable = require("../utils/testable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ProofRequestAttributesCard = ({
  data,
  onChangeValue
}) => {
  const {
    ColorPallet
  } = (0, _theme.useTheme)();
  const {
    i18n
  } = (0, _reactI18next.useTranslation)();
  const [bundleResolver] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_OCA_RESOLVER]);
  const [attributes, setAttributes] = (0, _react.useState)(undefined);
  const [credDefId, setCredDefId] = (0, _react.useState)(undefined);
  (0, _react.useEffect)(() => {
    const attributes = (0, _oca.buildFieldsFromAnonCredsProofRequestTemplate)(data);
    bundleResolver.presentationFields({
      identifiers: {
        schemaId: data.schema
      },
      attributes,
      language: i18n.language
    }).then(fields => {
      setAttributes(fields);
    });
  }, [data.schema]);
  (0, _react.useEffect)(() => {
    var _ref;
    const credDefId = (_ref = data.requestedAttributes ?? data.requestedPredicates) === null || _ref === void 0 ? void 0 : _ref.flatMap(reqItem => {
      var _reqItem$restrictions;
      return (_reqItem$restrictions = reqItem.restrictions) === null || _reqItem$restrictions === void 0 ? void 0 : _reqItem$restrictions.map(restrictionItem => restrictionItem.cred_def_id);
    }).find(item => item !== undefined);
    setCredDefId(credDefId);
  }, [data.requestedAttributes, data.requestedPredicates]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginBottom: 15
    }
  }, /*#__PURE__*/_react.default.createElement(_VerifierCredentialCard.default, {
    onChangeValue: onChangeValue,
    displayItems: attributes,
    style: {
      backgroundColor: ColorPallet.brand.secondaryBackground
    },
    credDefId: credDefId,
    schemaId: data.schema,
    preview: true,
    elevated: true
  }));
};
const ProofRequestCardsComponent = ({
  attributes = [],
  onChangeValue
}) => {
  return attributes.map(item => /*#__PURE__*/_react.default.createElement(ProofRequestAttributesCard, {
    key: item.schema,
    data: item,
    onChangeValue: onChangeValue
  }));
};

// memo'd to prevent rerendering when onChangeValue is called from child and updates parent
const ProofRequestCards = /*#__PURE__*/(0, _react.memo)(ProofRequestCardsComponent);
const ProofRequestDetails = ({
  route,
  navigation
}) => {
  const {
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const [store] = (0, _store.useStore)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    i18n
  } = (0, _reactI18next.useTranslation)();
  const [bundleResolver] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_OCA_RESOLVER]);
  const {
    agent
  } = (0, _reactHooks.useAgent)();
  if (!agent) {
    throw new Error('Unable to fetch agent from Credo');
  }
  const style = _reactNative.StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: ColorPallet.brand.primaryBackground,
      padding: 16
    },
    header: {
      marginTop: 12,
      marginBottom: 36
    },
    title: {
      ...TextTheme.headingThree
    },
    description: {
      marginTop: 10,
      color: TextTheme.title.color,
      fontSize: 20
    },
    footerButton: {
      marginTop: 'auto',
      marginBottom: 10
    }
  });
  const {
    templateId,
    connectionId
  } = route === null || route === void 0 ? void 0 : route.params;
  const [meta, setMeta] = (0, _react.useState)(undefined);
  const [attributes, setAttributes] = (0, _react.useState)(undefined);
  const [customPredicateValues, setCustomPredicateValues] = (0, _react.useState)({});
  const [invalidPredicate, setInvalidPredicate] = (0, _react.useState)(undefined);
  const template = (0, _proofRequestTemplates.useTemplate)(templateId);
  (0, _react.useEffect)(() => {
    if (!template) {
      return;
    }
    const attributes = template.payload.type === _ariesBifoldVerifier.ProofRequestType.AnonCreds ? template.payload.data : [];
    bundleResolver.resolve({
      identifiers: {
        templateId
      },
      language: i18n.language
    }).then(bundle => {
      const metaOverlay = (bundle === null || bundle === void 0 ? void 0 : bundle.metaOverlay) || new _ariesOca.MetaOverlay({
        capture_base: '',
        type: _TypeEnums.OverlayType.Meta10,
        name: template.name,
        description: template.description,
        language: i18n.language,
        credential_help_text: '',
        credential_support_url: '',
        issuer: '',
        issuer_description: '',
        issuer_url: ''
      });
      setMeta(metaOverlay);
      setAttributes(attributes);
    });
  }, [templateId, template]);
  const onlyNumberRegex = /^\d+$/;
  const onChangeValue = (0, _react.useCallback)((schema, label, name, value) => {
    if (!onlyNumberRegex.test(value)) {
      setInvalidPredicate({
        visible: true,
        predicate: label
      });
      return;
    }
    setInvalidPredicate(undefined);
    setCustomPredicateValues(prev => ({
      ...prev,
      [schema]: {
        ...(prev[schema] || {}),
        [name]: parseInt(value)
      }
    }));
  }, [setCustomPredicateValues, setInvalidPredicate]);
  const activateProofRequest = (0, _react.useCallback)(async () => {
    if (!template) {
      return;
    }
    if (invalidPredicate) {
      setInvalidPredicate({
        visible: true,
        predicate: invalidPredicate.predicate
      });
      return;
    }
    if (connectionId) {
      var _navigation$getParent;
      // Send to specific contact and redirect to the chat with him
      (0, _ariesBifoldVerifier.sendProofRequest)(agent, template, connectionId, customPredicateValues).then(result => {
        if (result !== null && result !== void 0 && result.proofRecord) {
          (0, _ariesBifoldVerifier.linkProofWithTemplate)(agent, result.proofRecord, templateId);
        }
      });
      (_navigation$getParent = navigation.getParent()) === null || _navigation$getParent === void 0 || _navigation$getParent.navigate(_navigators.Screens.Chat, {
        connectionId
      });
    } else {
      // Else redirect to the screen with connectionless request
      navigation.navigate(_navigators.Screens.ProofRequesting, {
        templateId,
        predicateValues: customPredicateValues
      });
    }
  }, [agent, template, templateId, connectionId, customPredicateValues, invalidPredicate]);
  const showTemplateUsageHistory = (0, _react.useCallback)(async () => {
    navigation.navigate(_navigators.Screens.ProofRequestUsageHistory, {
      templateId
    });
  }, [navigation, templateId]);
  const Header = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.header
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.title
    }, meta === null || meta === void 0 ? void 0 : meta.name), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: style.description
    }, meta === null || meta === void 0 ? void 0 : meta.description));
  };
  const Footer = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.footerButton
    }, /*#__PURE__*/_react.default.createElement(_Button.default, {
      title: connectionId ? t('Verifier.SendThisProofRequest') : t('Verifier.UseProofRequest'),
      accessibilityLabel: connectionId ? t('Verifier.SendThisProofRequest') : t('Verifier.UseProofRequest'),
      testID: connectionId ? (0, _testable.testIdWithKey)('SendThisProofRequest') : (0, _testable.testIdWithKey)('UseProofRequest'),
      buttonType: _Button.ButtonType.Primary,
      onPress: () => activateProofRequest()
    })), store.preferences.useDataRetention && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.footerButton
    }, /*#__PURE__*/_react.default.createElement(_Button.default, {
      title: t('Verifier.ShowTemplateUsageHistory'),
      accessibilityLabel: t('Verifier.ShowTemplateUsageHistory'),
      testID: (0, _testable.testIdWithKey)('ShowTemplateUsageHistory'),
      buttonType: _Button.ButtonType.Secondary,
      onPress: () => showTemplateUsageHistory()
    })));
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: style.container,
    edges: ['left', 'right']
  }, (invalidPredicate === null || invalidPredicate === void 0 ? void 0 : invalidPredicate.visible) && /*#__PURE__*/_react.default.createElement(_AlertModal.default, {
    title: t('Verifier.InvalidPredicateValueTitle', {
      predicate: invalidPredicate.predicate
    }),
    message: t('Verifier.InvalidPredicateValueDetails'),
    submit: () => setInvalidPredicate({
      visible: false,
      predicate: invalidPredicate.predicate
    })
  }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    contentContainerStyle: {
      flexGrow: 1
    }
  }, /*#__PURE__*/_react.default.createElement(Header, null), /*#__PURE__*/_react.default.createElement(ProofRequestCards, {
    attributes: attributes,
    onChangeValue: onChangeValue
  }), /*#__PURE__*/_react.default.createElement(Footer, null)));
};
var _default = exports.default = ProofRequestDetails;
//# sourceMappingURL=ProofRequestDetails.js.map