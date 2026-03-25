import { Tours } from './contexts/tour/tour-context';
import { PINValidationRules } from './types/security';
import { AttemptLockoutConfig } from './types/attempt-lockout-config';
export declare const dateIntFormat = "YYYYMMDD";
export declare const hiddenFieldValue: string;
export declare const testIdPrefix = "com.ariesbifold:id/";
export declare enum LocalStorageKeys {
    Onboarding = "OnboardingState",
    RevokedCredentials = "RevokedCredentials",
    RevokedCredentialsMessageDismissed = "RevokedCredentialsMessageDismissed",
    Preferences = "PreferencesState",
    Migration = "MigrationState",
    Tours = "ToursState",
    HistorySettingsOption = "historySettingsOption",
    Language = "language"
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
    BIOMETRY_ERROR = "BiometryError",
    DID_COMPLETE_ONBOARDING = "DidCompleteOnboarding",
    OPENID_REFRESH_REQUEST = "OPENID_REFRESH_REQUEST",
    OPENID_CONNECTION_ERROR = "OPENID_CONNECTION_ERROR"
}
export declare const second = 1000;
export declare const minute = 60000;
export declare const hour = 3600000;
export declare const walletTimeout: number;
export declare const attemptLockoutConfig: AttemptLockoutConfig;
export declare const defaultAutoLockTime = 5;
export declare const tours: Tours;
export declare const walletId = "walletId";
export declare const minPINLength = 6;
export declare const maxPINLength = 6;
export declare const PINRules: PINValidationRules;
export declare const domain = "didcomm://invite";
export declare const tourMargin = 25;
export declare const hitSlop: {
    top: number;
    bottom: number;
    left: number;
    right: number;
};
export declare const templateBundleStorageDirectory = "templates";
export declare const templateCacheDataFileName = "index.json";
export declare const templateBundleIndexFileName = "proof-templates.json";
//# sourceMappingURL=constants.d.ts.map