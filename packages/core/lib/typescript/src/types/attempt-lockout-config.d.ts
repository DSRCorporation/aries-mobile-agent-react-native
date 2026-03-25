export type AttemptLockoutConfig = {
    baseRules: Record<number, number | undefined>;
    thresholdRules: {
        threshold: number;
        increment: number;
        thresholdPenaltyDuration: number;
    };
};
//# sourceMappingURL=attempt-lockout-config.d.ts.map