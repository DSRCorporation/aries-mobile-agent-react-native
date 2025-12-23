"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRemoteProofBundleResolver = exports.applyTemplateMarkers = exports.applyDevRestrictions = exports.RemoteProofBundleResolver = exports.DefaultProofBundleResolver = void 0;
var _ariesBifoldVerifier = require("@hyperledger/aries-bifold-verifier");
var _axios = _interopRequireDefault(require("axios"));
var _containerApi = require("../container-api");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const calculatePreviousYear = yearOffset => {
  const pastDate = new Date();
  pastDate.setFullYear(pastDate.getFullYear() + yearOffset);
  return parseInt(pastDate.toISOString().split('T')[0].replace(/-/g, ''));
};
const applyTemplateMarkers = templates => {
  if (!templates) return templates;
  const markerActions = {
    now: () => Math.floor(new Date().getTime() / 1000).toString(),
    currentDate: offset => calculatePreviousYear(parseInt(offset)).toString()
  };
  let templateString = JSON.stringify(templates);
  // regex to find all markers in the template so we can replace them with computed values
  const markers = [...templateString.matchAll(/"@\{(\w+)(?:\((\S*)\))?\}"/gm)];
  markers.forEach(marker => {
    const markerValue = markerActions[marker[1]](marker[2]);
    templateString = templateString.replace(marker[0], markerValue);
  });
  return JSON.parse(templateString);
};
exports.applyTemplateMarkers = applyTemplateMarkers;
const applyDevRestrictions = templates => {
  return templates.map(temp => {
    return {
      ...temp,
      payload: {
        ...temp.payload,
        data: temp.payload.data.map(data => {
          var _data$requestedAttrib, _data$requestedPredic;
          return {
            ...data,
            requestedAttributes: (_data$requestedAttrib = data.requestedAttributes) === null || _data$requestedAttrib === void 0 ? void 0 : _data$requestedAttrib.map(attr => {
              return {
                ...attr,
                restrictions: [...(attr.restrictions ?? []), ...(attr.devRestrictions ?? [])],
                devRestrictions: []
              };
            }),
            requestedPredicates: (_data$requestedPredic = data.requestedPredicates) === null || _data$requestedPredic === void 0 ? void 0 : _data$requestedPredic.map(pred => {
              return {
                ...pred,
                restrictions: [...(pred.restrictions ?? []), ...(pred.devRestrictions ?? [])],
                devRestrictions: []
              };
            })
          };
        })
      }
    };
  });
};
exports.applyDevRestrictions = applyDevRestrictions;
const useRemoteProofBundleResolver = (indexFileBaseUrl, log) => {
  const [proofRequestTemplates] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_PROOF_TEMPLATE]);
  if (indexFileBaseUrl) {
    return new RemoteProofBundleResolver(indexFileBaseUrl, log);
  } else {
    return new DefaultProofBundleResolver(proofRequestTemplates);
  }
};
exports.useRemoteProofBundleResolver = useRemoteProofBundleResolver;
class RemoteProofBundleResolver {
  constructor(indexFileBaseUrl, log) {
    this.remoteServer = _axios.default.create({
      baseURL: indexFileBaseUrl
    });
    this.log = log;
  }
  async resolve(acceptDevRestrictions) {
    if (this.templateData) {
      let templateData = this.templateData;
      if (acceptDevRestrictions) {
        templateData = applyDevRestrictions(templateData);
      }
      return Promise.resolve(templateData);
    }
    return this.remoteServer.get('proof-templates.json').then(response => {
      var _this$log;
      (_this$log = this.log) === null || _this$log === void 0 || _this$log.info('Fetched proof templates');
      try {
        let templateData = response.data;
        this.templateData = templateData;
        if (acceptDevRestrictions) {
          templateData = applyDevRestrictions(templateData);
        }
        return templateData;
      } catch (error) {
        var _this$log2;
        (_this$log2 = this.log) === null || _this$log2 === void 0 || _this$log2.error('Failed to parse proof templates', error);
        return undefined;
      }
    }).catch(error => {
      var _this$log3;
      (_this$log3 = this.log) === null || _this$log3 === void 0 || _this$log3.error('Failed to fetch proof templates', error);
      return undefined;
    });
  }
  async resolveById(templateId, acceptDevRestrictions) {
    if (!this.templateData) {
      var _await$this$resolve;
      return (_await$this$resolve = await this.resolve(acceptDevRestrictions)) === null || _await$this$resolve === void 0 ? void 0 : _await$this$resolve.find(template => template.id === templateId);
    }
    let templateData = this.templateData;
    if (acceptDevRestrictions) {
      templateData = applyDevRestrictions(templateData);
    }
    const template = templateData.find(template => template.id === templateId);
    return template;
  }
}
exports.RemoteProofBundleResolver = RemoteProofBundleResolver;
class DefaultProofBundleResolver {
  constructor(proofRequestTemplates) {
    this.proofRequestTemplates = proofRequestTemplates ?? _ariesBifoldVerifier.getProofRequestTemplates;
  }
  async resolve(acceptDevRestrictions) {
    return Promise.resolve(this.proofRequestTemplates(acceptDevRestrictions));
  }
  async resolveById(templateId, acceptDevRestrictions) {
    return Promise.resolve(this.proofRequestTemplates(acceptDevRestrictions).find(template => template.id === templateId));
  }
}
exports.DefaultProofBundleResolver = DefaultProofBundleResolver;
//# sourceMappingURL=proofBundle.js.map