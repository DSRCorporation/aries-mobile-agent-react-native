"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useExpiredNotifications = void 0;
var _react = require("react");
var _registry = require("../refresh/registry");
var _types = require("../refresh/types");
var _containerApi = require("../../../container-api");
var _useDeclineReplacement = require("./useDeclineReplacement");
// modules/openid/hooks/useExpiredNotifications.ts

const useExpiredNotifications = () => {
  const [items, setItems] = (0, _react.useState)([]);
  const [logger] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER]);
  const {
    declineByOldId
  } = (0, _useDeclineReplacement.useDeclineReplacement)({
    logger
  });
  const build = (0, _react.useCallback)(s => s.expired.filter(oldId => s.checked.includes(oldId)).map(oldId => {
    const lite = s.byId[oldId];
    const n = {
      type: _types.OpenIDCustomNotificationType.CredentialExpired,
      title: 'Credential expired',
      pageTitle: 'Credential Expired',
      buttonTitle: 'Review',
      description: 'This credential is no longer valid. You can attempt to obtain an updated version.',
      createdAt: new Date(),
      onPressAction: () => {},
      onCloseAction: () => declineByOldId(oldId),
      component: () => null,
      metadata: {
        oldId,
        format: lite === null || lite === void 0 ? void 0 : lite.format
      }
    };
    return n;
  }), [declineByOldId]);
  (0, _react.useEffect)(() => {
    setItems(build(_registry.credentialRegistry.getState()));
    const unsub = _registry.credentialRegistry.subscribe(s => setItems(build(s)));
    return unsub;
  }, [build]);
  return items;
};
exports.useExpiredNotifications = useExpiredNotifications;
//# sourceMappingURL=useExpiredNotifications.js.map