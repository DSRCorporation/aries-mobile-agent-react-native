import { CredentialExchangeRecord } from '@credo-ts/core';
import { ImageSourcePropType } from 'react-native';
export declare const isValidAnonCredsCredential: (credential: CredentialExchangeRecord) => boolean | import("@credo-ts/core").CredentialRecordBinding | undefined;
export declare const credentialTextColor: (ColorPallet: any, hex?: string) => any;
export declare const toImageSource: (source: unknown) => ImageSourcePropType;
export declare const getCredentialIdentifiers: (credential: CredentialExchangeRecord) => {
    credentialDefinitionId: any;
    schemaId: any;
};
//# sourceMappingURL=credential.d.ts.map