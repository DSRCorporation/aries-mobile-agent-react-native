import { getProofRequestTemplates } from '@bifold/verifier';
import { useState, useEffect } from 'react';
import { TOKENS, useServices } from '../container-api';
import { templateBundleStorageDirectory, templateCacheDataFileName, templateBundleIndexFileName } from '../constants';
import { FileCache } from './fileCache';
const calculatePreviousYear = yearOffset => {
  const pastDate = new Date();
  pastDate.setFullYear(pastDate.getFullYear() + yearOffset);
  return parseInt(pastDate.toISOString().split('T')[0].replace(/-/g, ''));
};
export const applyTemplateMarkers = templates => {
  if (!templates) {
    return templates;
  }
  const markerActions = {
    now: () => Math.floor(new Date().getTime() / 1000).toString(),
    currentDate: offset => calculatePreviousYear(parseInt(offset)).toString()
  };
  let templateString = JSON.stringify(templates);
  // regex to find all markers in the template so we can replace
  // them with computed values
  const markers = [...templateString.matchAll(/"@\{(\w+)(?:\((\S*)\))?\}"/gm)];
  markers.forEach(marker => {
    const markerValue = markerActions[marker[1]](marker[2]);
    templateString = templateString.replace(marker[0], markerValue);
  });
  return JSON.parse(templateString);
};
export const applyDevRestrictions = templates => {
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
export const useRemoteProofBundleResolver = (indexFileBaseUrl, log) => {
  const [proofRequestTemplates] = useServices([TOKENS.UTIL_PROOF_TEMPLATE]);
  const [resolver, setResolver] = useState(new DefaultProofBundleResolver(proofRequestTemplates));
  useEffect(() => {
    if (indexFileBaseUrl) {
      setResolver(new RemoteProofBundleResolver(indexFileBaseUrl, log));
    } else {
      setResolver(new DefaultProofBundleResolver(proofRequestTemplates));
    }
  }, [log, indexFileBaseUrl, proofRequestTemplates]);
  return resolver;
};
export class RemoteProofBundleResolver extends FileCache {
  cacheDataFileName = templateCacheDataFileName;
  constructor(indexFileBaseUrl, log) {
    super(indexFileBaseUrl, templateBundleStorageDirectory, templateCacheDataFileName, log);
  }
  async resolve(acceptDevRestrictions) {
    let templateData;
    if (!this.templateData) {
      await this.checkForUpdates();
    }
    if (!this.templateData) {
      return [];
    }
    templateData = this.templateData;
    if (acceptDevRestrictions) {
      templateData = applyDevRestrictions(this.templateData);
    }
    return Promise.resolve(templateData);
  }
  async resolveById(templateId, acceptDevRestrictions) {
    let templateData;
    if (!this.templateData) {
      var _await$this$resolve;
      return (_await$this$resolve = await this.resolve(acceptDevRestrictions)) === null || _await$this$resolve === void 0 ? void 0 : _await$this$resolve.find(template => template.id === templateId);
    }
    templateData = this.templateData;
    if (acceptDevRestrictions) {
      templateData = applyDevRestrictions(templateData);
    }
    return templateData.find(template => template.id === templateId);
  }
  async checkForUpdates() {
    var _this$log2;
    await this.createWorkingDirectoryIfNotExists();
    if (!this.fileEtag) {
      var _this$log;
      (_this$log = this.log) === null || _this$log === void 0 || _this$log.info('Loading cache data');
      const cacheData = await this.loadCacheData();
      if (cacheData) {
        this.fileEtag = cacheData.fileEtag;
      }
    }
    (_this$log2 = this.log) === null || _this$log2 === void 0 || _this$log2.info('Loading index now');
    await this.loadBundleIndex(templateBundleIndexFileName);
  }
  loadBundleIndex = async filePath => {
    var _this$log7;
    let remoteFetchSucceeded = false;
    try {
      const response = await this.axiosInstance.get(filePath);
      const {
        status
      } = response;
      const {
        etag
      } = response.headers;
      if (status !== 200) {
        var _this$log3;
        (_this$log3 = this.log) === null || _this$log3 === void 0 || _this$log3.error(`Failed to fetch remote resource at ${filePath}`);
        throw new Error('Failed to fetch remote resource');
      }
      if (etag && this.compareWeakEtags(this.fileEtag, etag)) {
        var _this$log4;
        (_this$log4 = this.log) === null || _this$log4 === void 0 || _this$log4.info(`Index file ${filePath} has not changed, etag ${etag}`);
        // etag is the same, no need to refresh
        this.templateData = response.data;
        return;
      }
      this.fileEtag = etag;
      this.templateData = response.data;
      remoteFetchSucceeded = true;
      await this.saveFileToLocalStorage(filePath, JSON.stringify(this.templateData));
    } catch {
      var _this$log5;
      (_this$log5 = this.log) === null || _this$log5 === void 0 || _this$log5.error(`Failed to fetch remote file index ${filePath}`);
    }
    if (remoteFetchSucceeded) {
      return;
    }
    const data = await this.loadFileFromLocalStorage(filePath);
    if (!data) {
      var _this$log6;
      (_this$log6 = this.log) === null || _this$log6 === void 0 || _this$log6.error(`Failed to load index file ${filePath} from cache`);
      return;
    }
    (_this$log7 = this.log) === null || _this$log7 === void 0 || _this$log7.info(`Using index file ${filePath} from cache`);
    this.templateData = JSON.parse(data);
  };
}
export class DefaultProofBundleResolver {
  constructor(proofRequestTemplates) {
    this.proofRequestTemplates = proofRequestTemplates ?? getProofRequestTemplates;
  }
  async resolve(acceptDevRestrictions) {
    return Promise.resolve(this.proofRequestTemplates(acceptDevRestrictions));
  }
  async resolveById(templateId, acceptDevRestrictions) {
    return Promise.resolve(this.proofRequestTemplates(acceptDevRestrictions).find(template => template.id === templateId));
  }
}
//# sourceMappingURL=proofBundle.js.map