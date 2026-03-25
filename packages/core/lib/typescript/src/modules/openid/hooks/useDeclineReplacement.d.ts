import type { BifoldLogger } from '../../../services/logger';
import type { CustomNotification } from '../../../types/notification';
type Options = {
    logger?: BifoldLogger;
};
/**
 * Decline a replacement offer: clears the registry entry so the notification disappears.
 * No repo operations (no save/delete) are performed.
 */
export declare function useDeclineReplacement(opts?: Options): {
    declineByOldId: (oldId: string) => Promise<void>;
    declineByNewId: (newId: string) => Promise<void>;
    declineFromNotification: (notif: CustomNotification) => Promise<void>;
};
export {};
//# sourceMappingURL=useDeclineReplacement.d.ts.map