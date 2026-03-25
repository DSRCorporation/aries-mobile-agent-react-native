import { DidCommCredentialExchangeRecord as CredentialRecord } from '@credo-ts/didcomm';
import type { Agent } from '@credo-ts/core';
import { BifoldLogger } from '../services/logger';
export declare const fallbackDefaultCredentialNameValue = "Credential";
export declare const defaultCredDefTag = "default";
export declare function getCredentialName(credDefId?: string, schemaId?: string): Promise<string>;
export declare function getSchemaName(credential: CredentialRecord): string | undefined;
export declare function getCredDefTag(credential: CredentialRecord): string | undefined;
export declare function parsedCredDefNameFromCredential(credential: CredentialRecord, agent?: Agent, logger?: BifoldLogger): Promise<string>;
export declare function parsedCredDefName(credentialDefinitionId: string, schemaId: string): Promise<string>;
//# sourceMappingURL=cred-def.d.ts.map