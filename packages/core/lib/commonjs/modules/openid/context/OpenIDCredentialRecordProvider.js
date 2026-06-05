"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOpenIDCredentials = exports.OpenIDCredentialRecordProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _oca = require("@bifold/oca");
var _legacy = require("@bifold/oca/build/legacy");
var _core = require("@credo-ts/core");
var _recordUtils = require("@bifold/react-hooks/build/recordUtils");
var _reactI18next = require("react-i18next");
var _containerApi = require("../../../container-api");
var _oca2 = require("../../../utils/oca");
var _display = require("../display");
var _types = require("../types");
var _agent = require("../../../utils/agent");
var _credentialRecord = require("../credentialRecord");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const addW3cRecord = (record, state) => {
  const newRecordsState = [...state.w3cCredentialRecords];
  newRecordsState.unshift(record);
  return {
    ...state,
    w3cCredentialRecords: newRecordsState
  };
};
const removeW3cRecord = (record, state) => {
  const newRecordsState = [...state.w3cCredentialRecords];
  const index = newRecordsState.findIndex(r => r.id === record.id);
  if (index > -1) {
    newRecordsState.splice(index, 1);
  }
  return {
    ...state,
    w3cCredentialRecords: newRecordsState
  };
};
const addSdJwtRecord = (record, state) => {
  const newRecordsState = [...state.sdJwtVcRecords];
  newRecordsState.unshift(record);
  return {
    ...state,
    sdJwtVcRecords: newRecordsState
  };
};
const removeSdJwtRecord = (record, state) => {
  const newRecordsState = [...state.sdJwtVcRecords];
  const index = newRecordsState.findIndex(r => r.id === record.id);
  if (index > -1) {
    newRecordsState.splice(index, 1);
  }
  return {
    ...state,
    sdJwtVcRecords: newRecordsState
  };
};
const addMdocRecord = (record, state) => {
  const newRecordsState = [...state.mdocVcRecords];
  newRecordsState.unshift(record);
  return {
    ...state,
    mdocVcRecords: newRecordsState
  };
};
const removeMdocRecord = (record, state) => {
  const newRecordsState = [...state.mdocVcRecords];
  const index = newRecordsState.findIndex(r => r.id === record.id);
  if (index > -1) {
    newRecordsState.splice(index, 1);
  }
  return {
    ...state,
    mdocVcRecords: newRecordsState
  };
};
const defaultState = {
  openIDCredentialRecords: [],
  w3cCredentialRecords: [],
  sdJwtVcRecords: [],
  mdocVcRecords: [],
  isLoading: true
};
const OpenIDCredentialRecordContext = /*#__PURE__*/(0, _react.createContext)(null);
const isW3CCredentialRecord = record => {
  var _record$getTags;
  return ((_record$getTags = record.getTags()) === null || _record$getTags === void 0 ? void 0 : _record$getTags.claimFormat) === _core.ClaimFormat.JwtVc;
};
const isSdJwtCredentialRecord = record => {
  return 'compactSdJwtVc' in record;
};
const filterW3CCredentialsOnly = credentials => {
  return credentials.filter(r => isW3CCredentialRecord(r));
};
const filterSdJwtCredentialsOnly = credentials => {
  return credentials.filter(r => isSdJwtCredentialRecord(r));
};

// eslint-disable-next-line react/prop-types
const OpenIDCredentialRecordProvider = ({
  children
}) => {
  const [state, setState] = (0, _react.useState)(defaultState);
  const {
    isLoading
  } = state;
  const {
    agent
  } = (0, _agent.useAppAgent)();
  const [logger, bundleResolver] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER, _containerApi.TOKENS.UTIL_OCA_RESOLVER]);
  const {
    i18n
  } = (0, _reactI18next.useTranslation)();
  function getAgent() {
    if (!agent) {
      const error = 'Agent undefined!';
      logger.error(`[OpenIDCredentialRecordProvider] ${error}`);
      throw new Error(error);
    }
    return agent;
  }
  async function getW3CCredentialById(id) {
    const agent = getAgent();
    const record = await (0, _credentialRecord.getOpenIDCredentialById)(agent, _types.OpenIDCredentialType.W3cCredential, id);
    return record instanceof _core.W3cCredentialRecord ? record : undefined;
  }
  async function getSdJwtCredentialById(id) {
    const agent = getAgent();
    const record = await (0, _credentialRecord.getOpenIDCredentialById)(agent, _types.OpenIDCredentialType.SdJwtVc, id);
    return record instanceof _core.SdJwtVcRecord ? record : undefined;
  }
  async function getMdocCredentialById(id) {
    const agent = getAgent();
    const record = await (0, _credentialRecord.getOpenIDCredentialById)(agent, _types.OpenIDCredentialType.Mdoc, id);
    return record instanceof _core.MdocRecord ? record : undefined;
  }
  async function getCredentialById(id, type) {
    const agent = getAgent();
    if (type !== undefined) {
      return (0, _credentialRecord.getOpenIDCredentialById)(agent, type, id);
    }
    return (0, _credentialRecord.findOpenIDCredentialById)(agent, id);
  }
  async function storeCredential(cred) {
    const agent = getAgent();
    await (0, _credentialRecord.storeOpenIDCredential)(agent, cred);
  }
  async function deleteCredential(cred) {
    const agent = getAgent();
    await (0, _credentialRecord.deleteOpenIDCredential)(agent, cred);
  }
  const resolveBundleForCredential = async credential => {
    var _credentialDisplay$di, _credentialDisplay$di2;
    const credentialDisplay = (0, _display.getCredentialForDisplay)(credential);
    const params = {
      identifiers: {
        schemaId: '',
        credentialDefinitionId: credentialDisplay.id
      },
      meta: {
        alias: credentialDisplay.display.issuer.name,
        credConnectionId: undefined,
        credName: credentialDisplay.display.name
      },
      attributes: (0, _oca2.buildFieldsFromW3cCredsCredential)(credentialDisplay),
      language: i18n.language
    };
    const bundle = await bundleResolver.resolveAllBundles(params);
    const _bundle = bundle;
    const brandingOverlay = new _oca.BrandingOverlay('none', {
      capture_base: 'none',
      type: _legacy.BrandingOverlayType.Branding10,
      primary_background_color: credentialDisplay.display.backgroundColor,
      background_image: (_credentialDisplay$di = credentialDisplay.display.backgroundImage) === null || _credentialDisplay$di === void 0 ? void 0 : _credentialDisplay$di.uri,
      logo: (_credentialDisplay$di2 = credentialDisplay.display.logo) === null || _credentialDisplay$di2 === void 0 ? void 0 : _credentialDisplay$di2.uri
    });
    const ocaBundle = {
      ..._bundle,
      presentationFields: bundle.presentationFields,
      brandingOverlay: brandingOverlay
    };
    return ocaBundle;
  };
  (0, _react.useEffect)(() => {
    var _agent$w3cCredentials, _agent$sdJwtVc, _agent$mdoc;
    if (!agent) return;
    (_agent$w3cCredentials = agent.w3cCredentials) === null || _agent$w3cCredentials === void 0 || _agent$w3cCredentials.getAll().then(w3cCredentialRecords => {
      setState(prev => ({
        ...prev,
        w3cCredentialRecords: filterW3CCredentialsOnly(w3cCredentialRecords),
        isLoading: false
      }));
    });
    (_agent$sdJwtVc = agent.sdJwtVc) === null || _agent$sdJwtVc === void 0 || _agent$sdJwtVc.getAll().then(creds => {
      setState(prev => ({
        ...prev,
        sdJwtVcRecords: filterSdJwtCredentialsOnly(creds),
        isLoading: false
      }));
    });
    (_agent$mdoc = agent.mdoc) === null || _agent$mdoc === void 0 || _agent$mdoc.getAll().then(mdocVcRecords => {
      setState(prev => ({
        ...prev,
        mdocVcRecords,
        isLoading: false
      }));
    });
  }, [agent]);
  (0, _react.useEffect)(() => {
    var _agent$events;
    if (isLoading) return;
    if (!(agent !== null && agent !== void 0 && (_agent$events = agent.events) !== null && _agent$events !== void 0 && _agent$events.observable)) return;
    const w3c_credentialAdded$ = (0, _recordUtils.recordsAddedByType)(agent, _core.W3cCredentialRecord).subscribe(record => {
      //This handler will return ANY creds added to the wallet even DidComm
      //Sounds like a bug in the hooks package
      //This check will safe guard the flow untill a fix goes to the hooks
      if (!isW3CCredentialRecord(record)) {
        return;
      }
      setState(prev => addW3cRecord(record, prev));
    });
    const w3c_credentialRemoved$ = (0, _recordUtils.recordsRemovedByType)(agent, _core.W3cCredentialRecord).subscribe(record => {
      setState(prev => removeW3cRecord(record, prev));
    });
    const sdjwt_credentialAdded$ = (0, _recordUtils.recordsAddedByType)(agent, _core.SdJwtVcRecord).subscribe(record => {
      if (!isSdJwtCredentialRecord(record)) {
        return;
      }
      setState(prev => addSdJwtRecord(record, prev));
    });
    const sdjwt_credentialRemoved$ = (0, _recordUtils.recordsRemovedByType)(agent, _core.SdJwtVcRecord).subscribe(record => {
      setState(prev => removeSdJwtRecord(record, prev));
    });
    const mdoc_credentialAdded$ = (0, _recordUtils.recordsAddedByType)(agent, _core.MdocRecord).subscribe(record => {
      setState(prev => addMdocRecord(record, prev));
    });
    const mdoc_credentialRemoved$ = (0, _recordUtils.recordsRemovedByType)(agent, _core.MdocRecord).subscribe(record => {
      setState(prev => removeMdocRecord(record, prev));
    });
    return () => {
      w3c_credentialAdded$.unsubscribe();
      w3c_credentialRemoved$.unsubscribe();
      sdjwt_credentialAdded$.unsubscribe();
      sdjwt_credentialRemoved$.unsubscribe();
      mdoc_credentialAdded$.unsubscribe();
      mdoc_credentialRemoved$.unsubscribe();
    };
  }, [isLoading, agent]);
  return /*#__PURE__*/_react.default.createElement(OpenIDCredentialRecordContext.Provider, {
    value: {
      openIdState: state,
      getW3CCredentialById,
      getSdJwtCredentialById,
      getMdocCredentialById,
      getCredentialById,
      storeCredential,
      removeCredential: deleteCredential,
      resolveBundleForCredential
    }
  }, children);
};
exports.OpenIDCredentialRecordProvider = OpenIDCredentialRecordProvider;
const useOpenIDCredentials = () => {
  const context = (0, _react.useContext)(OpenIDCredentialRecordContext);
  if (context) {
    return context;
  }
  throw new Error('useOpenIDCredentials must be used within a OpenIDCredentialRecordProvider');
};
exports.useOpenIDCredentials = useOpenIDCredentials;
//# sourceMappingURL=OpenIDCredentialRecordProvider.js.map