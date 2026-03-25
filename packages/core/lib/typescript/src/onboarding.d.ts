import { Agent } from '@credo-ts/core';
import { OnboardingTask } from './types/navigators';
import { Config } from './types/config';
import { State } from './types/state';
export declare const isPrefaceComplete: (didSeePreface: boolean, showPreface: boolean) => OnboardingTask;
export declare const isUpdateCheckComplete: () => OnboardingTask;
export declare const isOnboardingTutorialComplete: (didCompleteTutorial: boolean) => OnboardingTask;
export declare const isTermsComplete: (didAgreeToTerms: number, termsVersion: number) => OnboardingTask;
export declare const isPINCreationComplete: (didCreatePIN: boolean) => OnboardingTask;
export declare const isBiometryComplete: (didConsiderBiometry: boolean) => OnboardingTask;
export declare const isPushNotificationComplete: (didConsiderPushNotifications: boolean, enablePushNotifications: any) => OnboardingTask;
export declare const isNameWalletComplete: (didNameWallet: boolean, enableWalletNaming: boolean) => OnboardingTask;
export declare const isAuthenticationComplete: (didCreatePIN: boolean, didAuthenticate: boolean) => OnboardingTask;
export declare const isAttemptLockoutComplete: (servedPenalty: boolean | undefined) => OnboardingTask;
export declare const isAgentInitializationComplete: (agent: Agent | null) => OnboardingTask;
export declare const generateOnboardingWorkflowSteps: (state: State, config: Config, termsVersion: number, agent: Agent | null) => Array<OnboardingTask>;
//# sourceMappingURL=onboarding.d.ts.map