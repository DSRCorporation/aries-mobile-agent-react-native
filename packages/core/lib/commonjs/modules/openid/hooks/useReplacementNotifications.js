"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useReplacementNotifications = void 0;
var _react = require("react");
var _registry = require("../refresh/registry");
var _types = require("../refresh/types");
var _useDeclineReplacement = require("./useDeclineReplacement");
var _containerApi = require("../../../container-api");
// modules/openid/ui/useReplacementNotifications.ts

/**
 * A hook that returns a list of CustomNotifications for credentials that have replacements available
 */

const useReplacementNotifications = () => {
  const [items, setItems] = (0, _react.useState)([]);
  const [logger] = (0, _containerApi.useServices)([_containerApi.TOKENS.UTIL_LOGGER]);
  const {
    declineByOldId
  } = (0, _useDeclineReplacement.useDeclineReplacement)({
    logger
  });

  // Keep first-seen timestamps stable per (oldId -> replId)
  const firstSeenRef = (0, _react.useRef)({});
  const build = (0, _react.useCallback)(s => {
    const out = [];
    for (const oldId of s.expired) {
      const repl = s.replacements[oldId];
      if (!repl) continue;
      const key = `${oldId}::${repl.id}`;
      if (!firstSeenRef.current[key]) firstSeenRef.current[key] = new Date().toISOString();
      out.push({
        type: _types.OpenIDCustomNotificationType.CredentialReplacementAvailable,
        title: 'Credential update available',
        pageTitle: 'Credential Update',
        buttonTitle: 'Review update',
        description: 'A newer version of this credential is ready to accept.',
        createdAt: new Date(firstSeenRef.current[key]),
        onPressAction: () => {},
        // your list item handles navigation
        onCloseAction: () => declineByOldId(oldId),
        component: () => null,
        // keeps renderer happy
        metadata: {
          oldId,
          replacementId: repl.id
        }
      });
    }

    // Newest first for consistent UI
    out.sort((a, b) => {
      var _b$createdAt, _a$createdAt;
      return (((_b$createdAt = b.createdAt) === null || _b$createdAt === void 0 ? void 0 : _b$createdAt.getTime()) ?? 0) - (((_a$createdAt = a.createdAt) === null || _a$createdAt === void 0 ? void 0 : _a$createdAt.getTime()) ?? 0);
    });
    return out;
  }, [declineByOldId]);
  (0, _react.useEffect)(() => {
    // Initial build
    const s = _registry.credentialRegistry.getState();
    setItems(build({
      expired: s.expired,
      replacements: s.replacements
    }));

    // Subscribe to full state updates (since vanilla store lacks selector arg)
    const unsub = _registry.credentialRegistry.subscribe(state => {
      setItems(build({
        expired: state.expired,
        replacements: state.replacements
      }));
    });
    return unsub;
  }, [build]);
  return (0, _react.useMemo)(() => items, [items]);
};
exports.useReplacementNotifications = useReplacementNotifications;
//# sourceMappingURL=useReplacementNotifications.js.map