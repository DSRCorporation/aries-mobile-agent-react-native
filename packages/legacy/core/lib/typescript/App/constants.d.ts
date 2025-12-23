import { PINValidationRules } from './types/security';
export declare const dateIntFormat = "YYYYMMDD";
export declare const hiddenFieldValue: string;
export declare const testIdPrefix = "com.ariesbifold:id/";
export declare enum LocalStorageKeys {
    Onboarding = "OnboardingState",
    RevokedCredentials = "RevokedCredentials",
    RevokedCredentialsMessageDismissed = "RevokedCredentialsMessageDismissed",
    Preferences = "PreferencesState",
    Migration = "MigrationState",
    Tours = "ToursState"
}
export declare enum KeychainServices {
    Salt = "secret.wallet.salt",
    Key = "secret.wallet.key",
    LoginAttempt = "wallet.loginAttempt"
}
export declare enum EventTypes {
    ERROR_ADDED = "ErrorAdded",
    ERROR_REMOVED = "ErrorRemoved",
    BIOMETRY_UPDATE = "BiometryUpdate",
    BIOMETRY_ERROR = "BiometryError"
}
export declare const second = 1000;
export declare const minute = 60000;
export declare const hour = 3600000;
export declare const walletTimeout: number;
export declare const attemptLockoutBaseRules: Record<number, number | undefined>;
export declare const attemptLockoutThresholdRules: {
    attemptThreshold: number;
    attemptIncrement: number;
    attemptPenalty: number;
};
export declare const walletId = "walletId";
export declare const minPINLength = 6;
export declare const PINRules: PINValidationRules;
export declare const domain = "didcomm://invite";
export declare const tourMargin = 25;
export declare const hitSlop: {
    top: number;
    bottom: number;
    left: number;
    right: number;
};
//# sourceMappingURL=constants.d.ts.map