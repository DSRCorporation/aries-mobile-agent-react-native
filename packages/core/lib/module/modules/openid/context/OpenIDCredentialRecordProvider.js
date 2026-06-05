import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrandingOverlay } from '@bifold/oca';
import { BrandingOverlayType } from '@bifold/oca/build/legacy';
import { ClaimFormat, MdocRecord, SdJwtVcRecord, W3cCredentialRecord } from '@credo-ts/core';
import { recordsAddedByType, recordsRemovedByType } from '@bifold/react-hooks/build/recordUtils';
import { useTranslation } from 'react-i18next';
import { TOKENS, useServices } from '../../../container-api';
import { buildFieldsFromW3cCredsCredential } from '../../../utils/oca';
import { getCredentialForDisplay } from '../display';
import { OpenIDCredentialType } from '../types';
import { useAppAgent } from '../../../utils/agent';
import { findOpenIDCredentialById, getOpenIDCredentialById, storeOpenIDCredential, deleteOpenIDCredential } from '../credentialRecord';
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
const OpenIDCredentialRecordContext = /*#__PURE__*/createContext(null);
const isW3CCredentialRecord = record => {
  var _record$getTags;
  return ((_record$getTags = record.getTags()) === null || _record$getTags === void 0 ? void 0 : _record$getTags.claimFormat) === ClaimFormat.JwtVc;
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
export const OpenIDCredentialRecordProvider = ({
  children
}) => {
  const [state, setState] = useState(defaultState);
  const {
    isLoading
  } = state;
  const {
    agent
  } = useAppAgent();
  const [logger, bundleResolver] = useServices([TOKENS.UTIL_LOGGER, TOKENS.UTIL_OCA_RESOLVER]);
  const {
    i18n
  } = useTranslation();
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
    const record = await getOpenIDCredentialById(agent, OpenIDCredentialType.W3cCredential, id);
    return record instanceof W3cCredentialRecord ? record : undefined;
  }
  async function getSdJwtCredentialById(id) {
    const agent = getAgent();
    const record = await getOpenIDCredentialById(agent, OpenIDCredentialType.SdJwtVc, id);
    return record instanceof SdJwtVcRecord ? record : undefined;
  }
  async function getMdocCredentialById(id) {
    const agent = getAgent();
    const record = await getOpenIDCredentialById(agent, OpenIDCredentialType.Mdoc, id);
    return record instanceof MdocRecord ? record : undefined;
  }
  async function getCredentialById(id, type) {
    const agent = getAgent();
    if (type !== undefined) {
      return getOpenIDCredentialById(agent, type, id);
    }
    return findOpenIDCredentialById(agent, id);
  }
  async function storeCredential(cred) {
    const agent = getAgent();
    await storeOpenIDCredential(agent, cred);
  }
  async function deleteCredential(cred) {
    const agent = getAgent();
    await deleteOpenIDCredential(agent, cred);
  }
  const resolveBundleForCredential = async credential => {
    var _credentialDisplay$di, _credentialDisplay$di2;
    const credentialDisplay = getCredentialForDisplay(credential);
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
      attributes: buildFieldsFromW3cCredsCredential(credentialDisplay),
      language: i18n.language
    };
    const bundle = await bundleResolver.resolveAllBundles(params);
    const _bundle = bundle;
    const brandingOverlay = new BrandingOverlay('none', {
      capture_base: 'none',
      type: BrandingOverlayType.Branding10,
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
  useEffect(() => {
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
  useEffect(() => {
    var _agent$events;
    if (isLoading) return;
    if (!(agent !== null && agent !== void 0 && (_agent$events = agent.events) !== null && _agent$events !== void 0 && _agent$events.observable)) return;
    const w3c_credentialAdded$ = recordsAddedByType(agent, W3cCredentialRecord).subscribe(record => {
      //This handler will return ANY creds added to the wallet even DidComm
      //Sounds like a bug in the hooks package
      //This check will safe guard the flow untill a fix goes to the hooks
      if (!isW3CCredentialRecord(record)) {
        return;
      }
      setState(prev => addW3cRecord(record, prev));
    });
    const w3c_credentialRemoved$ = recordsRemovedByType(agent, W3cCredentialRecord).subscribe(record => {
      setState(prev => removeW3cRecord(record, prev));
    });
    const sdjwt_credentialAdded$ = recordsAddedByType(agent, SdJwtVcRecord).subscribe(record => {
      if (!isSdJwtCredentialRecord(record)) {
        return;
      }
      setState(prev => addSdJwtRecord(record, prev));
    });
    const sdjwt_credentialRemoved$ = recordsRemovedByType(agent, SdJwtVcRecord).subscribe(record => {
      setState(prev => removeSdJwtRecord(record, prev));
    });
    const mdoc_credentialAdded$ = recordsAddedByType(agent, MdocRecord).subscribe(record => {
      setState(prev => addMdocRecord(record, prev));
    });
    const mdoc_credentialRemoved$ = recordsRemovedByType(agent, MdocRecord).subscribe(record => {
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
  return /*#__PURE__*/React.createElement(OpenIDCredentialRecordContext.Provider, {
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
export const useOpenIDCredentials = () => {
  const context = useContext(OpenIDCredentialRecordContext);
  if (context) {
    return context;
  }
  throw new Error('useOpenIDCredentials must be used within a OpenIDCredentialRecordProvider');
};
//# sourceMappingURL=OpenIDCredentialRecordProvider.js.map