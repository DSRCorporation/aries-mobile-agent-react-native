import { AnonCredsCredentialFormatService, AnonCredsModule, AnonCredsProofFormatService, DataIntegrityCredentialFormatService, LegacyIndyCredentialFormatService, LegacyIndyProofFormatService, V1CredentialProtocol, V1ProofProtocol } from '@credo-ts/anoncreds';
import { AskarModule } from '@credo-ts/askar';
import { Agent, ConnectionsModule, CredentialsModule, DifPresentationExchangeProofFormatService, MediationRecipientModule, ProofsModule, V2CredentialProtocol, V2ProofProtocol } from '@credo-ts/core';
import { IndyVdrModule, IndyVdrPoolConfig } from '@credo-ts/indy-vdr';
import { OpenId4VcHolderModule } from '@credo-ts/openid4vc';
import { PushNotificationsApnsModule, PushNotificationsFcmModule } from '@credo-ts/push-notifications';
interface GetAgentModulesOptions {
    indyNetworks: IndyVdrPoolConfig[];
    mediatorInvitationUrl?: string;
    txnCache?: {
        capacity: number;
        expiryOffsetMs: number;
        path?: string;
    };
}
export type BifoldAgent = Agent<ReturnType<typeof getAgentModules>>;
/**
 * Constructs the modules to be used in the agent setup
 * @param indyNetworks
 * @param mediatorInvitationUrl determine which mediator to use
 * @param txnCache optional local cache config for indyvdr
 * @returns modules to be used in agent setup
 */
export declare function getAgentModules({ indyNetworks, mediatorInvitationUrl, txnCache }: GetAgentModulesOptions): {
    askar: AskarModule;
    anoncreds: AnonCredsModule;
    indyVdr: IndyVdrModule;
    connections: ConnectionsModule;
    credentials: CredentialsModule<(V1CredentialProtocol | V2CredentialProtocol<(LegacyIndyCredentialFormatService | AnonCredsCredentialFormatService | DataIntegrityCredentialFormatService)[]>)[]>;
    proofs: ProofsModule<(V1ProofProtocol | V2ProofProtocol<(LegacyIndyProofFormatService | AnonCredsProofFormatService | DifPresentationExchangeProofFormatService)[]>)[]>;
    mediationRecipient: MediationRecipientModule;
    pushNotificationsFcm: PushNotificationsFcmModule;
    pushNotificationsApns: PushNotificationsApnsModule;
    openId4VcHolder: OpenId4VcHolderModule;
};
interface MyAgentContextInterface {
    loading: boolean;
    agent?: BifoldAgent;
    setAgent: (agent?: BifoldAgent) => void;
}
export declare const useAppAgent: () => MyAgentContextInterface;
export declare const createLinkSecretIfRequired: (agent: Agent) => Promise<void>;
export {};
//# sourceMappingURL=agent.d.ts.map