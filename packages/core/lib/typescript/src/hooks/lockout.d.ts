export declare const useAttemptLockout: () => (penalty: number) => Promise<void>;
export declare const useGetLockoutPenalty: () => (attempts: number) => number | undefined;
export declare const useUnMarkServedPenalty: () => () => void;
export declare const useLockout: () => {
    getLockoutPenalty: (attempts: number) => number | undefined;
    attemptLockout: (penalty: number) => Promise<void>;
    unMarkServedPenalty: () => void;
};
//# sourceMappingURL=lockout.d.ts.map