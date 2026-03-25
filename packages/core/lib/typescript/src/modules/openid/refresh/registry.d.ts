import { ClaimFormat } from '@credo-ts/core';
export interface OpenIDCredentialLite {
    id: string;
    format: ClaimFormat;
    createdAt?: string;
    issuer?: string;
}
export interface ReplacementMap {
    [oldId: string]: OpenIDCredentialLite;
}
export interface RefreshingMap {
    [id: string]: true;
}
/** Permanent (until unblocked) blocks so the orchestrator won’t retry this cred again this session */
export type BlockReason = 'succeeded' | 'failed';
export interface BlockEntry {
    reason: BlockReason;
    at: string;
    error?: string;
}
export interface RegistryState {
    byId: Record<string, OpenIDCredentialLite>;
    expired: string[];
    checked: string[];
    replacements: ReplacementMap;
    refreshing: RefreshingMap;
    blocked: Record<string, BlockEntry>;
    lastSweepAt?: string;
}
export interface RegistryActions {
    upsert: (cred: OpenIDCredentialLite) => void;
    markRefreshing: (id: string) => void;
    clearRefreshing: (id: string) => void;
    /** Old cred `oldId` has a replacement available (offer or reissued record) */
    markExpiredWithReplacement: (oldId: string, replacement: OpenIDCredentialLite) => void;
    markInvalid: (id: string) => void;
    /** Accept the queued replacement for oldId → promotes replacement to byId and clears expired state */
    acceptReplacement: (oldId: string) => void;
    /** Clear “expired” tag for a cred (e.g., verifier says valid again) */
    clearExpired: (id: string) => void;
    /** Mark this cred permanently blocked due to success (no more attempts needed) */
    blockAsSucceeded: (id: string) => void;
    /** Mark this cred permanently blocked due to failure (don’t hammer issuer again) */
    blockAsFailed: (id: string, error?: string) => void;
    /** Remove any block for this cred (e.g., debug/manual override) */
    unblock: (id: string) => void;
    /** Central gate used by the orchestrator to decide whether to skip */
    shouldSkip: (id: string) => boolean;
    setLastSweep: (iso: string) => void;
    reset: () => void;
}
export type RegistryStore = RegistryState & RegistryActions;
export declare const credentialRegistry: import("zustand/vanilla").StoreApi<RegistryStore>;
export declare const readRegistry: () => RegistryStore;
export declare const mutateRegistry: (updater: (s: RegistryStore) => void) => void;
export declare const selectOldIdByReplacementId: (replacementId: string) => string | undefined;
//# sourceMappingURL=registry.d.ts.map