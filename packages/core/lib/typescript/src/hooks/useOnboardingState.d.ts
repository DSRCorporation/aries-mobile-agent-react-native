import { Agent } from '@credo-ts/core';
import React from 'react';
import { State } from '../types/state';
import { OnboardingTask } from '../types/navigators';
import { Config } from '../types/config';
/**
 * Hook to manage onboarding workflow state
 * Tracks the onboarding tasks, their completion status.
 */
export declare const useOnboardingState: (store: State, config: Config, termsVersion: number, agent: Agent | null, generateOnboardingWorkflowSteps: (store: State, config: Config, termsVersion: number, agent: Agent | null) => OnboardingTask[]) => {
    onboardingState: OnboardingTask[];
    setOnboardingState: React.Dispatch<React.SetStateAction<OnboardingTask[]>>;
    activeScreen: string | undefined;
    currentRoute: any;
    isComplete: boolean;
};
//# sourceMappingURL=useOnboardingState.d.ts.map