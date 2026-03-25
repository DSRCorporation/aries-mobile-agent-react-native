import { Agent } from '@credo-ts/core';
import { WalletSecret } from '../types/security';
export type AgentSetupReturnType = {
    agent: Agent | null;
    initializeAgent: (walletSecret: WalletSecret) => Promise<void>;
    shutdownAndClearAgentIfExists: () => Promise<void>;
};
declare const useBifoldAgentSetup: () => AgentSetupReturnType;
export default useBifoldAgentSetup;
//# sourceMappingURL=useBifoldAgentSetup.d.ts.map