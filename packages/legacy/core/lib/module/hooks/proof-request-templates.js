import { useEffect, useState } from 'react';
import { TOKENS, useServices } from '../container-api';
import { useStore } from '../contexts/store';
import { applyTemplateMarkers, useRemoteProofBundleResolver } from '../utils/proofBundle';
export const useTemplates = () => {
  const [store] = useStore();
  const [proofRequestTemplates, setProofRequestTemplates] = useState([]);
  const [{
    proofTemplateBaseUrl
  }, logger] = useServices([TOKENS.CONFIG, TOKENS.UTIL_LOGGER]);
  const resolver = useRemoteProofBundleResolver(proofTemplateBaseUrl, logger);
  useEffect(() => {
    resolver.resolve(store.preferences.acceptDevCredentials).then(templates => {
      if (templates) {
        setProofRequestTemplates(applyTemplateMarkers(templates));
      }
    });
  }, []);
  return proofRequestTemplates;
};
export const useTemplate = templateId => {
  const [store] = useStore();
  const [proofRequestTemplate, setProofRequestTemplate] = useState(undefined);
  const [{
    proofTemplateBaseUrl
  }] = useServices([TOKENS.CONFIG]);
  const resolver = useRemoteProofBundleResolver(proofTemplateBaseUrl);
  useEffect(() => {
    resolver.resolveById(templateId, store.preferences.acceptDevCredentials).then(template => {
      if (template) {
        setProofRequestTemplate(applyTemplateMarkers(template));
      }
    });
  }, []);
  return proofRequestTemplate;
};
//# sourceMappingURL=proof-request-templates.js.map