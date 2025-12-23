"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTemplates = exports.useTemplate = void 0;
var _react = require("react");
var _containerApi = require("../container-api");
var _store = require("../contexts/store");
var _proofBundle = require("../utils/proofBundle");
const useTemplates = () => {
  const [store] = (0, _store.useStore)();
  const [proofRequestTemplates, setProofRequestTemplates] = (0, _react.useState)([]);
  const [{
    proofTemplateBaseUrl
  }, logger] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG, _containerApi.TOKENS.UTIL_LOGGER]);
  const resolver = (0, _proofBundle.useRemoteProofBundleResolver)(proofTemplateBaseUrl, logger);
  (0, _react.useEffect)(() => {
    resolver.resolve(store.preferences.acceptDevCredentials).then(templates => {
      if (templates) {
        setProofRequestTemplates((0, _proofBundle.applyTemplateMarkers)(templates));
      }
    });
  }, []);
  return proofRequestTemplates;
};
exports.useTemplates = useTemplates;
const useTemplate = templateId => {
  const [store] = (0, _store.useStore)();
  const [proofRequestTemplate, setProofRequestTemplate] = (0, _react.useState)(undefined);
  const [{
    proofTemplateBaseUrl
  }] = (0, _containerApi.useServices)([_containerApi.TOKENS.CONFIG]);
  const resolver = (0, _proofBundle.useRemoteProofBundleResolver)(proofTemplateBaseUrl);
  (0, _react.useEffect)(() => {
    resolver.resolveById(templateId, store.preferences.acceptDevCredentials).then(template => {
      if (template) {
        setProofRequestTemplate((0, _proofBundle.applyTemplateMarkers)(template));
      }
    });
  }, []);
  return proofRequestTemplate;
};
exports.useTemplate = useTemplate;
//# sourceMappingURL=proof-request-templates.js.map