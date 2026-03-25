"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _RecordLoading = _interopRequireDefault(require("../../../components/animated/RecordLoading"));
var _ThemedText = require("../../../components/texts/ThemedText");
var _containerApi = require("../../../container-api");
var _theme = require("../../../contexts/theme");
var _ScreenLayout = _interopRequireDefault(require("../../../layout/ScreenLayout"));
var _navigators = require("../../../types/navigators");
var _testable = require("../../../utils/testable");
var _OpenIDCredentialRecordProvider = require("../context/OpenIDCredentialRecordProvider");
var _utils = require("../utils/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const OpenIDProofCredentialSelect = ({
  route,
  navigation
}) => {
  if (!(route !== null && route !== void 0 && route.params)) {
    throw new Error('Change credential route params were not set properly');
  }
  const selectedCredentialID = route.params.selectedCredID;
  const altCredentials = route.params.altCredIDs;
  const onCredChange = route.params.onCredChange;
  const {
    ColorPalette,
    SelectedCredTheme
  } = (0, _theme.useTheme)();
  const {
    getW3CCredentialById,
    getSdJwtCredentialById
  } = (0, _OpenIDCredentialRecordProvider.useOpenIDCredentials)();
  const [CredentialCard] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMPONENT_CREDENTIAL_CARD]);
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [loading, setLoading] = (0, _react.useState)(false);
  const [credentialsRequested, setCredentialsRequested] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    async function fetchCreds() {
      if (!altCredentials) return;
      setLoading(true);
      const creds = [];
      for (const {
        id,
        claimFormat
      } of Object.values(altCredentials)) {
        let credential;
        if ((0, _utils.isW3CProofRequest)(claimFormat)) {
          credential = await getW3CCredentialById(id);
        } else if ((0, _utils.isSdJwtProofRequest)(claimFormat)) {
          credential = await getSdJwtCredentialById(id);
        }
        if (credential) {
          creds.push({
            credential,
            claimFormat
          });
        }
      }
      setCredentialsRequested(creds);
      setLoading(false);
    }
    fetchCreds();
  }, [altCredentials, getW3CCredentialById, getSdJwtCredentialById]);
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
  const changeCred = selection => {
    onCredChange({
      inputDescriptorID: route.params.inputDescriptorID,
      id: selection.credential.id,
      claimFormat: selection.claimFormat
    });
    navigation.goBack();
  };
  const listHeader = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        ...styles.pageMargin,
        marginTop: 40,
        marginBottom: 20
      }
    }, loading ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.cardLoading
    }, /*#__PURE__*/_react.default.createElement(_RecordLoading.default, null)) : /*#__PURE__*/_react.default.createElement(_ThemedText.ThemedText, {
      variant: 'bold'
    }, t('ProofRequest.AvailableCards')));
  };
  return /*#__PURE__*/_react.default.createElement(_ScreenLayout.default, {
    screen: _navigators.Screens.OpenIDProofCredentialSelect
  }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: credentialsRequested,
    ListHeaderComponent: listHeader,
    renderItem: ({
      item
    }) => {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.pageMargin
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        accessibilityRole: "button",
        testID: (0, _testable.testIdWithKey)(`select:${item.credential.id}`),
        onPress: () => changeCred(item),
        style: [item.credential.id === selectedCredentialID ? SelectedCredTheme : undefined, {
          marginBottom: 10
        }]
      }, /*#__PURE__*/_react.default.createElement(CredentialCard, {
        credential: item.credential
      })));
    }
  }));
};
var _default = exports.default = OpenIDProofCredentialSelect;
//# sourceMappingURL=OpenIDProofChangeCredential.js.map