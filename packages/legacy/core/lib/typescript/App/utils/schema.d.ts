import { CredentialExchangeRecord as CredentialRecord } from '@credo-ts/core';
export declare function parseSchemaFromId(schemaId?: string): {
    name: string;
    version: string;
};
export declare function credentialSchema(credential: CredentialRecord): string | undefined;
export declare function parsedSchema(credential: CredentialRecord): {
    name: string;
    version: string;
};
//# sourceMappingURL=schema.d.ts.map