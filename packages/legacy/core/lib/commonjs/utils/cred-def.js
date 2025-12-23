"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCredDefFromId = parseCredDefFromId;
exports.parsedCredDefName = parsedCredDefName;
exports.parsedCredDefNameFromCredential = parsedCredDefNameFromCredential;
var _anoncreds = require("@credo-ts/anoncreds");
var _schema = require("./schema");
var _indyIdentifiers = require("@credo-ts/anoncreds/build/utils/indyIdentifiers");
function parseCredDefFromId(credDefId, schemaId) {
  let name = 'Credential';
  if (credDefId) {
    if ((0, _indyIdentifiers.isDidIndyCredentialDefinitionId)(credDefId)) {
      const parseIndyCredDefId = (0, _anoncreds.parseIndyCredentialDefinitionId)(credDefId);
      name = parseIndyCredDefId.tag;
    }
  }
  if (name.toLocaleLowerCase() === 'default' || name.toLowerCase() === 'credential') {
    if (schemaId) {
      if ((0, _indyIdentifiers.isDidIndySchemaId)(schemaId)) {
        const parseIndySchema = (0, _anoncreds.parseIndySchemaId)(schemaId);
        name = parseIndySchema.schemaName;
      }
    } else {
      name = 'Credential';
    }
  }
  return name;
}
function credentialDefinition(credential) {
  var _credential$metadata$;
  return (_credential$metadata$ = credential.metadata.get(_anoncreds.AnonCredsCredentialMetadataKey)) === null || _credential$metadata$ === void 0 ? void 0 : _credential$metadata$.credentialDefinitionId;
}
function parsedCredDefNameFromCredential(credential) {
  return parseCredDefFromId(credentialDefinition(credential), (0, _schema.credentialSchema)(credential));
}
function parsedCredDefName(credentialDefinitionId, schemaId) {
  return parseCredDefFromId(credentialDefinitionId, schemaId);
}
//# sourceMappingURL=cred-def.js.map