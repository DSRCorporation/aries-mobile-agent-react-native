"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _RecordLoading = _interopRequireDefault(require("../components/animated/RecordLoading"));
var _constants = require("../constants");
var _theme = require("../contexts/theme");
var _proofs = require("../hooks/proofs");
var _error = require("../types/error");
var _helpers = require("../utils/helpers");
var _testable = require("../utils/testable");
var _containerApi = require("../container-api");
var _ThemedText = require("../components/texts/ThemedText");
var _credentials = require("../types/credentials");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ProofChangeCredential = ({
  route,
  navigation
}) => {
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('Change credential route params were not set properly');
  }
  const proofId = route.params.proofId;
  const selectedCred = route.params.selectedCred;
  const altCredentials = route.params.altCredentials;
  const onCredChange = route.params.onCredChange;
  const {
    ColorPalette,
    SelectedCredTheme
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [loading, setLoading] = (0, _react.useState)(false);
  const [proofItems, setProofItems] = (0, _react.useState)([]);
  const [retrievedCredentials, setRetrievedCredentials] = (0, _react.useState)();
  const credProofPromise = (0, _proofs.useAllCredentialsForProof)(proofId);
  const [CredentialCard] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMPONENT_CREDENTIAL_CARD]);
  const styles = _reactNative.StyleSheet.create({
    pageContainer: {
      flex: 1
    },
    pageMargin: {
      marginHorizontal: 20
    },
    cardLoading: {
      backgroundColor: ColorPalette.brand.secondaryBackground,
      flex: 1,
      flexGrow: 1,
      marginVertical: 35,
      borderRadius: 15,
      paddingHorizontal: 10
    }
  });
  const getCredentialsFields = (0, _react.useCallback)(() => ({
    ...(retrievedCredentials === null || retrievedCredentials === void 0 ? void 0 : retrievedCredentials.attributes),
    ...(retrievedCredentials === null || retrievedCredentials === void 0 ? void 0 : retrievedCredentials.predicates)
  }), [retrievedCredentials]);
  (0, _react.useEffect)(() => {
    setLoading(true);
    credProofPromise === null || credProofPromise === void 0 || credProofPromise.then(value => {
      if (value) {
        const {
          groupedProof,
          retrievedCredentials
        } = value;
        setLoading(false);
        const activeCreds = groupedProof.filter(proof => altCredentials.includes(proof.credId));
        const credList = activeCreds.map(cred => cred.credId);
        const formatCredentials = retrievedItems => {
          return Object.keys(retrievedItems).map(key => {
            return {
              [key]: retrievedItems[key].filter(attr => credList.includes(attr.credentialId))
            };
          }).reduce((prev, curr) => {
            return {
              ...prev,
              ...curr
            };
          }, {});
        };
        const selectRetrievedCredentials = retrievedCredentials ? {
          ...retrievedCredentials,
          attributes: formatCredentials(retrievedCredentials.attributes),
          predicates: formatCredentials(retrievedCredentials.predicates)
        } : undefined;
        setRetrievedCredentials(selectRetrievedCredentials);
        setProofItems(activeCreds);
      }
    }).catch(err => {
      const error = new _error.BifoldError(t('Error.Title1026'), t('Error.Message1026'), (err === null || err === void 0 ? void 0 : err.message) ?? err, 1026);
      _reactNative.DeviceEventEmitter.emit(_constants.EventTypes.ERROR_ADDED, error);
    });
  }, [credProofPromise, altCredentials, t]);
  const listHeader = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        ...styles.pageMargin,
        marginVertical: 20
      }
    }, loading ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.cardLoading
    }, /*#__PURE__*/_react.default.createElement(_RecordLoading.default, null)) : /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, null, t('ProofRequest.MultipleCredentials')));
  };
  const changeCred = credId => {
    onCredChange(credId);
    navigation.goBack();
  };
  const hasSatisfiedPredicates = (fields, credId) => proofItems.flatMap(item => (0, _helpers.evaluatePredicates)(fields, credId)(item)).every(p => p.satisfied);
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: styles.pageContainer,
    edges: ['bottom', 'left', 'right']
  }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: proofItems,
    ListHeaderComponent: listHeader,
    renderItem: ({
      item
    }) => {
      var _item$credExchangeRec;
      const errors = [];
      ((_item$credExchangeRec = item.credExchangeRecord) === null || _item$credExchangeRec === void 0 || (_item$credExchangeRec = _item$credExchangeRec.revocationNotification) === null || _item$credExchangeRec === void 0 ? void 0 : _item$credExchangeRec.revocationDate) && errors.push(_credentials.CredentialErrors.Revoked);
      !hasSatisfiedPredicates(getCredentialsFields(), item.credId) && errors.push(_credentials.CredentialErrors.PredicateError);
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.pageMargin
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        accessibilityRole: "button",
        testID: (0, _testable.testIdWithKey)(`select:${item.credId}`),
        onPress: () => changeCred(item.credId ?? ''),
        style: [item.credId === selectedCred ? SelectedCredTheme : undefined, {
          marginBottom: 10
        }],
        activeOpacity: 1
      }, /*#__PURE__*/_react.default.createElement(CredentialCard, {
        credential: item.credExchangeRecord,
        credDefId: item.credDefId,
        schemaId: item.schemaId,
        displayItems: [...(item.attributes ?? []), ...(0, _helpers.evaluatePredicates)(getCredentialsFields(), item.credId)(item)],
        credName: item.credName,
        proof: true,
        credentialErrors: errors
      })));
    }
  }));
};
var _default = exports.default = ProofChangeCredential;
//# sourceMappingURL=ProofChangeCredential.js.map