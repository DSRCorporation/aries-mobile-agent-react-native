import { Locales } from '../localization';
import { PINSecurityParams } from './security';
import { SettingSection } from './settings';
import { Agent } from '@credo-ts/core';
import { StackNavigationOptions } from '@react-navigation/stack';
interface PushNotificationConfiguration {
    status: () => Promise<'denied' | 'granted' | 'unknown'>;
    setup: () => Promise<'denied' | 'granted' | 'unknown'>;
    toggle: (state: boolean, agent: Agent<any>) => Promise<void>;
}
export interface Config {
    PINSecurity: PINSecurityParams;
    proofTemplateBaseUrl?: string;
    settings: SettingSection[];
    supportedLanguages: Locales[];
    connectionTimerDelay?: number;
    autoRedirectConnectionToHome?: boolean;
    enableTours?: boolean;
    enableImplicitInvitations?: boolean;
    enableReuseConnections?: boolean;
    showPreface?: boolean;
    disableOnboardingSkip?: boolean;
    enablePushNotifications?: PushNotificationConfiguration;
    whereToUseWalletUrl?: string;
    showScanHelp?: boolean;
    showScanButton?: boolean;
    globalScreenOptions?: StackNavigationOptions;
    showDetailsInfo?: boolean;
    contactHideList?: string[];
    credentialHideList?: string[];
}
export {};
//# sourceMappingURL=config.d.ts.map