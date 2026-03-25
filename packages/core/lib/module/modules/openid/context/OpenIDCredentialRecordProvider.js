import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrandingOverlay } from '@bifold/oca';
import { BrandingOverlayType } from '@bifold/oca/build/legacy';
import { ClaimFormat, MdocRecord, MdocRepository, SdJwtVcRecord, SdJwtVcRepository, W3cCredentialRecord, W3cCredentialRepository } from '@credo-ts/core';
import { recordsAddedByType, recordsRemovedByType } from '@bifold/react-hooks/build/recordUtils';
import { useTranslation } from 'react-i18next';
import { TOKENS, useServices } from '../../../container-api';
import { buildFieldsFromW3cCredsCredential } from '../../../utils/oca';
import { getCredentialForDisplay } from '../display';
import { OpenIDCredentialType } from '../types';
import { useAppAgent } from '../../../utils/agent';
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
    agent
  } = useAppAgent();
  const [logger, bundleResolver] = useServices([TOKENS.UTIL_LOGGER, TOKENS.UTIL_OCA_RESOLVER]);
  const {
    i18n
  } = useTranslation();
  function checkAgent() {
    if (!agent) {
      const error = 'Agent undefined!';
      logger.error(`[OpenIDCredentialRecordProvider] ${error}`);
      throw new Error(error);
    }
  }
  async function getW3CCredentialById(id) {
    checkAgent();
    return await (agent === null || agent === void 0 ? void 0 : agent.w3cCredentials.getById(id));
  }
  async function getSdJwtCredentialById(id) {
    checkAgent();
    return await (agent === null || agent === void 0 ? void 0 : agent.sdJwtVc.getById(id));
  }
  async function getMdocCredentialById(id) {
    checkAgent();
    return await (agent === null || agent === void 0 ? void 0 : agent.mdoc.getById(id));
  }
  async function storeCredential(cred) {
    checkAgent();
    if (cred instanceof W3cCredentialRecord) {
      const repo = agent === null || agent === void 0 ? void 0 : agent.context.dependencyManager.resolve(W3cCredentialRepository);
      await repo.save(agent.context, cred);
    } else if (cred instanceof SdJwtVcRecord) {
      const repo = agent === null || agent === void 0 ? void 0 : agent.context.dependencyManager.resolve(SdJwtVcRepository);
      await repo.save(agent.context, cred);
    } else if (cred instanceof MdocRecord) {
      const repo = agent === null || agent === void 0 ? void 0 : agent.context.dependencyManager.resolve(MdocRepository);
      await repo.save(agent.context, cred);
    }
  }
  async function deleteCredential(cred, type) {
    checkAgent();
    if (type === OpenIDCredentialType.W3cCredential) {
      await (agent === null || agent === void 0 ? void 0 : agent.w3cCredentials.deleteById(cred.id));
    } else if (type === OpenIDCredentialType.SdJwtVc) {
      await (agent === null || agent === void 0 ? void 0 : agent.sdJwtVc.deleteById(cred.id));
    } else if (type === OpenIDCredentialType.Mdoc) {
      await (agent === null || agent === void 0 ? void 0 : agent.mdoc.deleteById(cred.id));
    }
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
    var _agent$w3cCredentials, _agent$sdJwtVc;
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
  }, [agent]);
  useEffect(() => {
    var _agent$events;
    if (state.isLoading) return;
    if (!(agent !== null && agent !== void 0 && (_agent$events = agent.events) !== null && _agent$events !== void 0 && _agent$events.observable)) return;
    const w3c_credentialAdded$ = recordsAddedByType(agent, W3cCredentialRecord).subscribe(record => {
      //This handler will return ANY creds added to the wallet even DidComm
      //Sounds like a bug in the hooks package
      //This check will safe guard the flow untill a fix goes to the hooks
      const w3cRecord = record; // TODO: Why do we need to cast here now?
      if (isW3CCredentialRecord(w3cRecord)) {
        setState(addW3cRecord(w3cRecord, state));
      }
    });
    const w3c_credentialRemoved$ = recordsRemovedByType(agent, W3cCredentialRecord).subscribe(record => {
      setState(removeW3cRecord(record, state));
    });
    const sdjwt_credentialAdded$ = recordsAddedByType(agent, SdJwtVcRecord).subscribe(record => {
      //This handler will return ANY creds added to the wallet even DidComm
      //Sounds like a bug in the hooks package
      //This check will safe guard the flow untill a fix goes to the hooks
      setState(addSdJwtRecord(record, state));
      // if (isW3CCredentialRecord(record)) {
      //   setState(addW3cRecord(record, state))
      // }
    });
    const sdjwt_credentialRemoved$ = recordsRemovedByType(agent, SdJwtVcRecord).subscribe(record => {
      setState(removeSdJwtRecord(record, state));
    });
    return () => {
      w3c_credentialAdded$.unsubscribe();
      w3c_credentialRemoved$.unsubscribe();
      sdjwt_credentialAdded$.unsubscribe();
      sdjwt_credentialRemoved$.unsubscribe();
    };
  }, [state, agent]);
  return /*#__PURE__*/React.createElement(OpenIDCredentialRecordContext.Provider, {
    value: {
      openIdState: state,
      storeCredential: storeCredential,
      removeCredential: deleteCredential,
      getW3CCredentialById: getW3CCredentialById,
      getSdJwtCredentialById: getSdJwtCredentialById,
      getMdocCredentialById: getMdocCredentialById,
      resolveBundleForCredential: resolveBundleForCredential
    }
  }, children);
};
export const useOpenIDCredentials = () => useContext(OpenIDCredentialRecordContext);
//# sourceMappingURL=OpenIDCredentialRecordProvider.js.map