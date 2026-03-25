// modules/openid/hooks/useDeclineReplacement.ts
import { useCallback } from 'react';
import { credentialRegistry } from '../refresh/registry';
function findOldIdByNewId(newId) {
  const s = credentialRegistry.getState();
  // replacements: { [oldId]: { id: newId, ... } }
  for (const [oldId, lite] of Object.entries(s.replacements)) {
    if ((lite === null || lite === void 0 ? void 0 : lite.id) === newId) return oldId;
  }
  return undefined;
}

/**
 * Decline a replacement offer: clears the registry entry so the notification disappears.
 * No repo operations (no save/delete) are performed.
 */
export function useDeclineReplacement(opts = {}) {
  const {
    logger
  } = opts;

  /**
   * Decline by OLD credential id (kept for callers that know oldId)
   */
  const declineByOldId = useCallback(async oldId => {
    credentialRegistry.setState(prev => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {
        [oldId]: _dropRepl,
        ...restRepl
      } = prev.replacements;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {
        [oldId]: _dropRef,
        ...restRefreshing
      } = prev.refreshing;
      return {
        ...prev,
        expired: prev.expired,
        checked: prev.checked.filter(id => id !== oldId),
        replacements: restRepl,
        refreshing: restRefreshing
      };
    });
    logger === null || logger === void 0 || logger.info(`🧹 [Decline] Cleared replacement notification for oldId=${oldId}`);
  }, [logger]);

  /**
   * Decline by NEW credential id (use this from the Offer screen where you only know newId)
   */
  const declineByNewId = useCallback(async newId => {
    const oldId = findOldIdByNewId(newId);
    if (!oldId) {
      logger === null || logger === void 0 || logger.warn(`🧹 [Decline] No matching oldId found for newId=${newId}`);
      return;
    }
    await declineByOldId(oldId);
  }, [declineByOldId, logger]);

  /**
   * Helper: decline directly from a CustomNotification object
   */
  const declineFromNotification = useCallback(async notif => {
    var _notif$metadata, _notif$metadata2;
    const oldId = notif === null || notif === void 0 || (_notif$metadata = notif.metadata) === null || _notif$metadata === void 0 ? void 0 : _notif$metadata.oldId;
    if (oldId) {
      await declineByOldId(oldId);
      return;
    }
    const newId = notif === null || notif === void 0 || (_notif$metadata2 = notif.metadata) === null || _notif$metadata2 === void 0 ? void 0 : _notif$metadata2.replacementId;
    if (newId) {
      await declineByNewId(newId);
      return;
    }
    logger === null || logger === void 0 || logger.warn(`🧹 [Decline] Missing oldId/newId in notification.metadata`);
  }, [declineByOldId, declineByNewId, logger]);
  return {
    declineByOldId,
    declineByNewId,
    declineFromNotification
  };
}
//# sourceMappingURL=useDeclineReplacement.js.map