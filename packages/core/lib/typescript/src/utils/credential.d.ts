import type { Agent } from '@credo-ts/core';
import { DidCommCredentialExchangeRecord } from '@credo-ts/didcomm';
import { ImageSourcePropType } from 'react-native';
import { BifoldLogger } from '../services/logger';
export declare const isValidAnonCredsCredential: (credential: DidCommCredentialExchangeRecord) => boolean | import("@credo-ts/didcomm").CredentialRecordBinding | undefined;
export declare const credentialTextColor: (ColorPalette: any, hex?: string) => any;
export declare const toImageSource: (source: unknown) => ImageSourcePropType;
export declare const getCredentialIdentifiers: (credential: DidCommCredentialExchangeRecord) => {
    credentialDefinitionId: any;
    schemaId: any;
};
/**
 * Ensures credential has all required metadata cached. If any metadata is missing,
 * it will be resolved and added to the credential.
 *
 * @param credential - The credential record to ensure metadata for
 * @param agent - The agent instance for resolving schema/credDef
 * @param offerData - Optional offer data containing schema_id and cred_def_id
 * @param logger - Optional logger instance for logging
 * @returns Promise<boolean> - Returns true if metadata was updated, false otherwise
 */
export declare function ensureCredentialMetadata(credential: DidCommCredentialExchangeRecord, agent: Agent, offerData?: {
    schema_id?: string;
    cred_def_id?: string;
}, logger?: BifoldLogger): Promise<boolean>;
/**
 * Validates whether a credential name is meaningful and should be used for display.
 * Returns false for undefined, empty, whitespace-only, or default placeholder names.
 *
 * @param name - The name to validate
 * @returns true if the name is valid and meaningful, false otherwise
 */
export declare function isValidCredentialName(name: string | undefined): boolean;
/**
 * Determines the effective credential name using a priority waterfall:
 * 1. OCA Bundle name (if present and meaningful)
 * 2. Credential definition tag (if present)
 * 3. Schema name (if present)
 * 4. Default fallback name
 *
 * @param credential - The credential record
 * @param ocaName - The name from OCA meta overlay
 * @returns The effective name to use for display
 */
export declare function getEffectiveCredentialName(credential: DidCommCredentialExchangeRecord, ocaName?: string): string;
//# sourceMappingURL=credential.d.ts.map