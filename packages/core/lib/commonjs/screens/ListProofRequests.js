"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _verifier = require("@bifold/verifier");
var _oca = require("@bifold/oca");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _MaterialIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialIcons"));
var _EmptyList = _interopRequireDefault(require("../components/misc/EmptyList"));
var _containerApi = require("../container-api");
var _store = require("../contexts/store");
var _theme = require("../contexts/theme");
var _proofRequestTemplates = require("../hooks/proof-request-templates");
var _navigators = require("../types/navigators");
var _testable = require("../utils/testable");
var _ThemedText = require("../components/texts/ThemedText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ProofRequestsCard = ({
  navigation,
  template,
  connectionId
}) => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    i18n
  } = (0, _reactI18next.useTranslation)();
  const {
    ListItems
  } = (0, _theme.useTheme)();
  const [bundleResolver] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_OCA_RESOLVER]);
  const style = _reactNative.StyleSheet.create({
    card: {
      ...ListItems.requestTemplateBackground,
      flexDirection: 'row',
      borderRadius: 8,
      padding: 12,
      marginBottom: 10
    },
    textContainer: {
      flex: 1
    },
    templateTitle: {
      ...ListItems.requestTemplateTitle,
      marginBottom: 4
    },
    templateDetails: {
      ...ListItems.requestTemplateDetails,
      marginBottom: 4
    },
    templateZkpLabel: {
      ...ListItems.requestTemplateZkpLabel
    },
    iconContainer: {
      alignSelf: 'center'
    },
    icon: {
      ...ListItems.requestTemplateIcon
    }
  });
  const [meta, setMeta] = (0, _react.useState)(undefined);
  (0, _react.useEffect)(() => {
    bundleResolver.resolve({
      identifiers: {
        templateId: template.id
      },
      language: i18n.language
    }).then(bundle => {
      const metaOverlay = (bundle === null || bundle === void 0 ? void 0 : bundle.metaOverlay) || new _oca.MetaOverlay({
        capture_base: '',
        type: _oca.OverlayType.Meta10,
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
    });
  }, [bundleResolver, template, i18n.language]);
  return meta ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: style.card,
    onPress: () => navigation.navigate(_navigators.Screens.ProofRequestDetails, {
      templateId: template.id,
      connectionId
    }),
    accessibilityLabel: t('Screens.ProofRequestDetails'),
    accessibilityRole: "button",
    testID: (0, _testable.testIdWithKey)('ProofRequestsCard')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.textContainer
  }, /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: style.templateTitle,
    numberOfLines: 1
  }, meta.name), /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: style.templateDetails,
    numberOfLines: 2
  }, meta.description), (0, _verifier.hasPredicates)(template) && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: style.templateZkpLabel
  }, t('Verifier.ZeroKnowledgeProof')), (0, _verifier.isParameterizable)(template) && /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
    style: style.templateZkpLabel
  }, t('Verifier.Parameterizable'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.iconContainer
  }, /*#__PURE__*/_react.default.createElement(_MaterialIcons.default, {
    style: style.icon,
    name: 'chevron-right'
  }))) : null;
};
const ListProofRequests = ({
  navigation,
  route
}) => {
  var _route$params;
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const [store] = (0, _store.useStore)();
  const style = _reactNative.StyleSheet.create({
    container: {
      flexGrow: 1,
      margin: 24,
      elevation: 5
    }
  });
  const connectionId = route === null || route === void 0 || (_route$params = route.params) === null || _route$params === void 0 ? void 0 : _route$params.connectionId;

  // if useDevVerifierTemplates not set then exclude dev templates
  const proofRequestTemplates = (0, _proofRequestTemplates.useTemplates)().filter(tem => store.preferences.useDevVerifierTemplates || !tem.devOnly);
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: style.container,
    edges: ['left', 'right']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    style: {
      backgroundColor: ColorPalette.brand.primaryBackground
    },
    data: proofRequestTemplates,
    keyExtractor: records => records.id,
    renderItem: ({
      item
    }) => {
      return /*#__PURE__*/_react.default.createElement(ProofRequestsCard, {
        template: item,
        connectionId: connectionId,
        navigation: navigation
      });
    },
    ListEmptyComponent: () => /*#__PURE__*/_react.default.createElement(_EmptyList.default, {
      message: t('Verifier.EmptyList')
    })
  }));
};
var _default = exports.default = ListProofRequests;
//# sourceMappingURL=ListProofRequests.js.map