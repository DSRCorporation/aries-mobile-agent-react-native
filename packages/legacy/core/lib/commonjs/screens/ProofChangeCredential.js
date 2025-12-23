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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
    ColorPallet,
    TextTheme
  } = (0, _theme.useTheme)();
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [loading, setLoading] = (0, _react.useState)(false);
  const [proofItems, setProofItems] = (0, _react.useState)([]);
  const [retrievedCredentials, setRetrievedCredentials] = (0, _react.useState)();
  const credProofPromise = (0, _proofs.useAllCredentialsForProof)(proofId);
  const [CredentialCard] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMP_CREDENTIAL_CARD]);
  const styles = _reactNative.StyleSheet.create({
    pageContainer: {
      flex: 1
    },
    pageMargin: {
      marginHorizontal: 20
    },
    cardLoading: {
      backgroundColor: ColorPallet.brand.secondaryBackground,
      flex: 1,
      flexGrow: 1,
      marginVertical: 35,
      borderRadius: 15,
      paddingHorizontal: 10
    },
    selectedCred: {
      borderWidth: 5,
      borderRadius: 15,
      borderColor: ColorPallet.semantic.focus
    }
  });
  const getCredentialsFields = () => ({
    ...(retrievedCredentials === null || retrievedCredentials === void 0 ? void 0 : retrievedCredentials.attributes),
    ...(retrievedCredentials === null || retrievedCredentials === void 0 ? void 0 : retrievedCredentials.predicates)
  });
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
  }, []);
  const listHeader = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        ...styles.pageMargin,
        marginVertical: 20
      }
    }, loading ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.cardLoading
    }, /*#__PURE__*/_react.default.createElement(_RecordLoading.default, null)) : /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: TextTheme.normal
    }, t('ProofRequest.MultipleCredentials')));
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
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.pageMargin
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        testID: (0, _testable.testIdWithKey)(`select:${item.credId}`),
        onPress: () => changeCred(item.credId ?? ''),
        style: [item.credId === selectedCred ? styles.selectedCred : undefined, {
          marginBottom: 10
        }],
        activeOpacity: 1
      }, /*#__PURE__*/_react.default.createElement(CredentialCard, {
        credential: item.credExchangeRecord,
        credDefId: item.credDefId,
        schemaId: item.schemaId,
        displayItems: [...(item.attributes ?? []), ...(0, _helpers.evaluatePredicates)(getCredentialsFields(), item.credId)(item)],
        credName: item.credName,
        existsInWallet: true,
        satisfiedPredicates: hasSatisfiedPredicates(getCredentialsFields(), item.credId),
        proof: true
      })));
    }
  }));
};
var _default = exports.default = ProofChangeCredential;
//# sourceMappingURL=ProofChangeCredential.js.map