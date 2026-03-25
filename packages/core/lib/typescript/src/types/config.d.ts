import { Locales } from '../localization';
import { AttemptLockoutConfig } from './attempt-lockout-config';
import { ContactDetailsOptionsParams } from './contact-details';
import { PINSecurityParams } from './security';
import { SettingSection } from './settings';
import { Agent } from '@credo-ts/core';
import { StackNavigationOptions } from '@react-navigation/stack';
interface PushNotificationConfiguration {
    status: () => Promise<'denied' | 'granted' | 'unknown'>;
    setup: () => Promise<'denied' | 'granted' | 'unknown'>;
    toggle: (state: boolean, agent: Agent<any>) => Promise<void>;
}
interface AppUpdateConfig {
    appleAppStoreUrl: string;
    googlePlayStoreUrl: string;
}
export interface Config {
    PINSecurity: PINSecurityParams;
    proofTemplateBaseUrl?: string;
    settings: SettingSection[];
    supportedLanguages: Locales[];
    connectionTimerDelay?: number;
    autoRedirectConnectionToHome?: boolean;
    enableChat?: boolean;
    enableTours?: boolean;
    enableImplicitInvitations?: boolean;
    enableReuseConnections?: boolean;
    enableHiddenDevModeTrigger?: boolean;
    showPreface?: boolean;
    showPINExplainer?: boolean;
    disableOnboardingSkip?: boolean;
    enablePushNotifications?: PushNotificationConfiguration;
    whereToUseWalletUrl?: string;
    showScanHelp?: boolean;
    showScanButton?: boolean;
    showScanErrorButton?: boolean;
    globalScreenOptions?: StackNavigationOptions;
    showDetailsInfo?: boolean;
    contactHideList?: string[];
    contactDetailsOptions?: ContactDetailsOptionsParams;
    credentialHideList?: string[];
    disableContactsInSettings?: boolean;
    internetReachabilityUrls: string[];
    attemptLockoutConfig?: AttemptLockoutConfig;
    appUpdateConfig?: AppUpdateConfig;
    preventScreenCapture?: boolean;
    PINScreensConfig: PINScreensConfig;
    showGenericErrors?: boolean;
    enableFullScreenErrorModal?: boolean;
    customAutoLockTimes?: {
        default: AutoLockTimer;
        values: [AutoLockTimer, ...AutoLockTimer[]];
    };
}
export interface AutoLockTimer {
    time: number;
    title: string;
}
export interface PINScreensConfig {
    useNewPINDesign: boolean;
}
export interface HistoryEventsLoggerConfig {
    logAttestationAccepted: boolean;
    logAttestationRefused: boolean;
    logAttestationRemoved: boolean;
    logInformationSent: boolean;
    logInformationNotSent: boolean;
    logConnection: boolean;
    logConnectionRemoved: boolean;
    logAttestationRevoked: boolean;
    logPinChanged: boolean;
    logToggleBiometry: boolean;
}
export {};
//# sourceMappingURL=config.d.ts.map