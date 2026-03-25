"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _anoncreds = require("@credo-ts/anoncreds");
var _reactHooks = require("@bifold/react-hooks");
var _core = require("@credo-ts/core");
var _native = require("@react-navigation/native");
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _reactNative = require("react-native");
var _didcomm = require("@credo-ts/didcomm");
var _store = require("../contexts/reducers/store");
var _store2 = require("../contexts/store");
var _theme = require("../contexts/theme");
var _tourContext = require("../contexts/tour/tour-context");
var _navigators = require("../types/navigators");
var _containerApi = require("../container-api");
var _OpenIDCredentialRecordProvider = require("../modules/openid/context/OpenIDCredentialRecordProvider");
var _tour = require("../types/tour");
var _types = require("../modules/openid/types");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ListCredentials = () => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const [store, dispatch] = (0, _store2.useStore)();
  const [CredentialListOptions, credentialEmptyList, credentialListFooter, {
    enableTours: enableToursConfig,
    credentialHideList
  }, CredentialCard] = (0, _containerApi.useServices)([_containerApi.TOKENS.COMPONENT_CRED_LIST_OPTIONS, _containerApi.TOKENS.COMPONENT_CRED_EMPTY_LIST, _containerApi.TOKENS.COMPONENT_CRED_LIST_FOOTER, _containerApi.TOKENS.CONFIG, _containerApi.TOKENS.COMPONENT_CREDENTIAL_CARD]);
  const navigation = (0, _native.useNavigation)();
  const {
    ColorPalette
  } = (0, _theme.useTheme)();
  const {
    start,
    stop
  } = (0, _tourContext.useTour)();
  const screenIsFocused = (0, _native.useIsFocused)();
  const {
    openIdState: {
      w3cCredentialRecords,
      sdJwtVcRecords
    }
  } = (0, _OpenIDCredentialRecordProvider.useOpenIDCredentials)();
  let credentials = [...(0, _reactHooks.useCredentialByState)(_didcomm.DidCommCredentialState.CredentialReceived), ...(0, _reactHooks.useCredentialByState)(_didcomm.DidCommCredentialState.Done), ...w3cCredentialRecords, ...sdJwtVcRecords];
  const CredentialEmptyList = credentialEmptyList;
  const CredentialListFooter = credentialListFooter;

  // Filter out hidden credentials when not in dev mode
  if (!store.preferences.developerModeEnabled) {
    credentials = credentials.filter(r => {
      var _r$metadata$get;
      const credDefId = (_r$metadata$get = r.metadata.get(_anoncreds.AnonCredsCredentialMetadataKey)) === null || _r$metadata$get === void 0 ? void 0 : _r$metadata$get.credentialDefinitionId;
      return !(credentialHideList !== null && credentialHideList !== void 0 && credentialHideList.includes(credDefId));
    });
  }
  (0, _react.useEffect)(() => {
    const shouldShowTour = enableToursConfig && store.tours.enableTours && !store.tours.seenCredentialsTour;
    if (shouldShowTour && screenIsFocused) {
      start(_tour.BaseTourID.CredentialsTour);
      dispatch({
        type: _store.DispatchAction.UPDATE_SEEN_CREDENTIALS_TOUR,
        payload: [true]
      });
    }
  }, [enableToursConfig, store.tours.enableTours, store.tours.seenCredentialsTour, screenIsFocused, start, dispatch]);

  // stop the tour when the screen unmounts
  (0, _react.useEffect)(() => {
    return stop;
  }, [stop]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderCardItem = cred => {
    return /*#__PURE__*/_react.default.createElement(CredentialCard, {
      credential: cred,
      onPress: () => {
        if (cred instanceof _core.W3cCredentialRecord) {
          navigation.navigate(_navigators.Screens.OpenIDCredentialDetails, {
            credentialId: cred.id,
            type: _types.OpenIDCredentialType.W3cCredential
          });
        } else if (cred instanceof _core.SdJwtVcRecord) {
          navigation.navigate(_navigators.Screens.OpenIDCredentialDetails, {
            credentialId: cred.id,
            type: _types.OpenIDCredentialType.SdJwtVc
          });
        } else {
          navigation.navigate(_navigators.Screens.CredentialDetails, {
            credentialId: cred.id
          });
        }
      }
    });
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    style: {
      backgroundColor: ColorPalette.brand.primaryBackground
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
      }, renderCardItem(credential));
    },
    ListEmptyComponent: () => /*#__PURE__*/_react.default.createElement(CredentialEmptyList, {
      message: t('Credentials.EmptyList')
    }),
    ListFooterComponent: () => /*#__PURE__*/_react.default.createElement(CredentialListFooter, {
      credentialsCount: credentials.length
    })
  }), /*#__PURE__*/_react.default.createElement(CredentialListOptions, null));
};
var _default = exports.default = ListCredentials;
//# sourceMappingURL=ListCredentials.js.map