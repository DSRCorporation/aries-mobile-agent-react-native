import { Agent } from '@credo-ts/core';
import React from 'react';
import { WalletSecret } from '../types/security';
export type OnboardingStackProps = {
    initializeAgent: (walletSecret: WalletSecret) => Promise<void>;
    agent: Agent | null;
};
declare const OnboardingStack: React.FC<OnboardingStackProps>;
export default OnboardingStack;
//# sourceMappingURL=OnboardingStack.d.ts.map