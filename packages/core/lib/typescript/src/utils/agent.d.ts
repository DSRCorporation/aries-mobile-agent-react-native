import { AnonCredsDidCommCredentialFormatService, AnonCredsDidCommProofFormatService, AnonCredsModule, DataIntegrityDidCommCredentialFormatService, DidCommCredentialV1Protocol, DidCommProofV1Protocol, LegacyIndyDidCommCredentialFormatService, LegacyIndyDidCommProofFormatService } from '@credo-ts/anoncreds';
import { AskarModule } from '@credo-ts/askar';
import { Agent, DidsModule } from '@credo-ts/core';
import { DidCommAutoAcceptCredential, DidCommAutoAcceptProof, DidCommCredentialV2Protocol, DidCommProofV2Protocol, DidCommDifPresentationExchangeProofFormatService, DidCommModule, DidCommMediatorPickupStrategy } from '@credo-ts/didcomm';
import { IndyVdrModule, IndyVdrPoolConfig } from '@credo-ts/indy-vdr';
import { OpenId4VcModule } from '@credo-ts/openid4vc';
import { WalletSecret } from '../types/security';
interface GetAgentModulesOptions {
    walletSecret: WalletSecret;
    indyNetworks: IndyVdrPoolConfig[];
    mediatorInvitationUrl?: string;
    txnCache?: {
        capacity: number;
        expiryOffsetMs: number;
        path?: string;
    };
}
export type BifoldAgentModules = ReturnType<typeof getAgentModules>;
export type BifoldAgent = Agent<BifoldAgentModules>;
/**
 * Constructs the modules to be used in the agent setup
 * @param indyNetworks
 * @param mediatorInvitationUrl determine which mediator to use
 * @param txnCache optional local cache config for indyvdr
 * @returns modules to be used in agent setup
 */
export declare function getAgentModules({ walletSecret, indyNetworks, mediatorInvitationUrl, txnCache, }: GetAgentModulesOptions): {
    askar: AskarModule;
    anoncreds: AnonCredsModule;
    indyVdr: IndyVdrModule;
    didcomm: DidCommModule<{
        useDidSovPrefixWhereAllowed: true;
        connections: {
            autoAcceptConnections: true;
        };
        credentials: {
            autoAcceptCredentials: DidCommAutoAcceptCredential.ContentApproved;
            credentialProtocols: (DidCommCredentialV1Protocol | DidCommCredentialV2Protocol<(LegacyIndyDidCommCredentialFormatService | AnonCredsDidCommCredentialFormatService | DataIntegrityDidCommCredentialFormatService)[]>)[];
        };
        proofs: {
            autoAcceptProofs: DidCommAutoAcceptProof.ContentApproved;
            proofProtocols: (DidCommProofV1Protocol | DidCommProofV2Protocol<(LegacyIndyDidCommProofFormatService | AnonCredsDidCommProofFormatService | DidCommDifPresentationExchangeProofFormatService)[]>)[];
        };
        mediationRecipient: {
            mediatorInvitationUrl: string | undefined;
            mediatorPickupStrategy: DidCommMediatorPickupStrategy.Implicit;
        };
    }>;
    openid4vc: OpenId4VcModule<null, null>;
    dids: DidsModule;
};
interface MyAgentContextInterface {
    loading: boolean;
    agent: BifoldAgent;
}
export declare const useAppAgent: () => MyAgentContextInterface;
export declare const createLinkSecretIfRequired: (agent: BifoldAgent) => Promise<void>;
export {};
//# sourceMappingURL=agent.d.ts.map