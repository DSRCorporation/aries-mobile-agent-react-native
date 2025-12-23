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
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _tourContext = require("../contexts/tour/tour-context");
var _navigators = require("../types/navigators");
var _tour = require("../types/tour");
var _containerApi = require("../container-api");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ListCredentials = () => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [store, dispatch] = (0, _store2.useStore)();
  const [CredentialCard, CredentialListOptions, credentialEmptyList, {
    enableTours: enableToursConfig,
    credentialHideList
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMP_CREDENTIAL_CARD, _containerApi.TOKENS.COMPONENT_CRED_LIST_OPTIONS, _containerApi.TOKENS.COMPONENT_CRED_EMPTY_LIST, _containerApi.TOKENS.CONFIG]);
  let credentials = [...(0, _reactHooks.useCredentialByState)(_core.CredentialState.CredentialReceived), ...(0, _reactHooks.useCredentialByState)(_core.CredentialState.Done)];
  const CredentialEmptyList = credentialEmptyList;

  // Filter out hidden credentials when not in dev mode
  if (!store.preferences.developerModeEnabled) {
    credentials = credentials.filter(r => {
      var _r$metadata$get;
      const credDefId = (_r$metadata$get = r.metadata.get(_anoncreds.AnonCredsCredentialMetadataKey)) === null || _r$metadata$get === void 0 ? void 0 : _r$metadata$get.credentialDefinitionId;
      return !(credentialHideList !== null && credentialHideList !== void 0 && credentialHideList.includes(credDefId));
    });
  }
  const navigation = (0, _native.useNavigation)();
  const {
    ColorPallet
  } = (0, _theme.useTheme)();
  const {
    start,
    stop
  } = (0, _tourContext.useTour)();
  const screenIsFocused = (0, _native.useIsFocused)();
  (0, _react.useEffect)(() => {
    const shouldShowTour = enableToursConfig && store.tours.enableTours && !store.tours.seenCredentialsTour;
    if (shouldShowTour && screenIsFocused) {
      start(_tour.TourID.CredentialsTour);
      dispatch({
        type: _store.DispatchAction.UPDATE_SEEN_CREDENTIALS_TOUR,
        payload: [true]
      });
    }
    return stop;
  }, [screenIsFocused]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    style: {
      backgroundColor: ColorPallet.brand.primaryBackground
    },
    data: credentials.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()),
    keyExtractor: credential => credential.id,
    renderItem: ({
      item: credential,
      index
    }) => {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginHorizontal: 15,
          marginTop: 15,
          marginBottom: index === credentials.length - 1 ? 45 : 0
        }
      }, /*#__PURE__*/_react.default.createElement(CredentialCard, {
        credential: credential,
        onPress: () => navigation.navigate(_navigators.Screens.CredentialDetails, {
          credential
        })
      }));
    },
    ListEmptyComponent: () => /*#__PURE__*/_react.default.createElement(CredentialEmptyList, {
      message: t('Credentials.EmptyList')
    })
  }), /*#__PURE__*/_react.default.createElement(CredentialListOptions, null));
};
var _default = exports.default = ListCredentials;
//# sourceMappingURL=ListCredentials.js.map