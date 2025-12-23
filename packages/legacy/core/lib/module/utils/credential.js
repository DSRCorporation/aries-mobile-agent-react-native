import { AnonCredsCredentialMetadataKey } from '@credo-ts/anoncreds';
import { CredentialState } from '@credo-ts/core';
import { luminanceForHexColor } from './luminance';
export const isValidAnonCredsCredential = credential => {
  return credential && (credential.state === CredentialState.OfferReceived || Boolean(credential.metadata.get(AnonCredsCredentialMetadataKey)) && credential.credentials.find(c => c.credentialRecordType === 'anoncreds' || c.credentialRecordType === 'w3c'));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const credentialTextColor = (ColorPallet, hex) => {
  const midpoint = 255 / 2;
  if ((luminanceForHexColor(hex ?? '') ?? 0) >= midpoint) {
    return ColorPallet.grayscale.darkGrey;
  }
  return ColorPallet.grayscale.white;
};
export const toImageSource = source => {
  if (typeof source === 'string') {
    return {
      uri: source
    };
  }
  return source;
};
export const getCredentialIdentifiers = credential => {
  var _credential$metadata$, _credential$metadata$2;
  return {
    credentialDefinitionId: (_credential$metadata$ = credential.metadata.get(AnonCredsCredentialMetadataKey)) === null || _credential$metadata$ === void 0 ? void 0 : _credential$metadata$.credentialDefinitionId,
    schemaId: (_credential$metadata$2 = credential.metadata.get(AnonCredsCredentialMetadataKey)) === null || _credential$metadata$2 === void 0 ? void 0 : _credential$metadata$2.schemaId
  };
};
//# sourceMappingURL=credential.js.map