"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBranding = useBranding;
var _containerApi = require("../container-api");
var _react = require("react");
function isOCABundleResolveDefaultParams(params) {
  return 'meta' in params && !('attributes' in params);
}
function isOCABundleResolveAllParams(params) {
  return 'attributes' in params && 'meta' in params;
}
function isOCABundleResolvePresentationFieldsParams(params) {
  return 'attributes' in params && !('meta' in params);
}
function useBranding(params) {
  const [bundleResolver] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_OCA_RESOLVER]);
  const [overlay, setOverlay] = (0, _react.useState)({});
  (0, _react.useEffect)(() => {
    if (isOCABundleResolveDefaultParams(params)) {
      bundleResolver.resolveDefaultBundle(params).then(bundle => {
        if (bundle) {
          setOverlay(o => ({
            ...o,
            ...bundle,
            brandingOverlay: bundle.brandingOverlay
          }));
        }
      });
    } else if (isOCABundleResolveAllParams(params)) {
      bundleResolver.resolveAllBundles(params).then(bundle => {
        setOverlay(o => ({
          ...o,
          ...bundle,
          brandingOverlay: bundle.brandingOverlay
        }));
      });
    } else if (isOCABundleResolvePresentationFieldsParams(params)) {
      bundleResolver.presentationFields(params).then(fields => {
        setOverlay(o => ({
          ...o,
          presentationFields: fields
        }));
      });
    } else {
      bundleResolver.resolve(params).then(bundle => {
        if (bundle) {
          setOverlay(o => ({
            ...o,
            ...bundle,
            brandingOverlay: bundle.brandingOverlay
          }));
        }
      });
    }
  }, [params, bundleResolver]);
  return {
    overlay
  };
}
//# sourceMappingURL=bundle-resolver.js.map