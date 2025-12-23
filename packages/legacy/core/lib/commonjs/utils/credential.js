"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toImageSource = exports.isValidAnonCredsCredential = exports.getCredentialIdentifiers = exports.credentialTextColor = void 0;
var _anoncreds = require("@credo-ts/anoncreds");
var _core = require("@credo-ts/core");
var _luminance = require("./luminance");
const isValidAnonCredsCredential = credential => {
  return credential && (credential.state === _core.CredentialState.OfferReceived || Boolean(credential.metadata.get(_anoncreds.AnonCredsCredentialMetadataKey)) && credential.credentials.find(c => c.credentialRecordType === 'anoncreds' || c.credentialRecordType === 'w3c'));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.isValidAnonCredsCredential = isValidAnonCredsCredential;
const credentialTextColor = (ColorPallet, hex) => {
  const midpoint = 255 / 2;
  if (((0, _luminance.luminanceForHexColor)(hex ?? '') ?? 0) >= midpoint) {
    return ColorPallet.grayscale.darkGrey;
  }
  return ColorPallet.grayscale.white;
};
exports.credentialTextColor = credentialTextColor;
const toImageSource = source => {
  if (typeof source === 'string') {
    return {
      uri: source
    };
  }
  return source;
};
exports.toImageSource = toImageSource;
const getCredentialIdentifiers = credential => {
  var _credential$metadata$, _credential$metadata$2;
  return {
    credentialDefinitionId: (_credential$metadata$ = credential.metadata.get(_anoncreds.AnonCredsCredentialMetadataKey)) === null || _credential$metadata$ === void 0 ? void 0 : _credential$metadata$.credentialDefinitionId,
    schemaId: (_credential$metadata$2 = credential.metadata.get(_anoncreds.AnonCredsCredentialMetadataKey)) === null || _credential$metadata$2 === void 0 ? void 0 : _credential$metadata$2.schemaId
  };
};
exports.getCredentialIdentifiers = getCredentialIdentifiers;
//# sourceMappingURL=credential.js.map