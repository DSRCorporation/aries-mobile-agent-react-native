"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.credentialSchema = credentialSchema;
exports.parseSchemaFromId = parseSchemaFromId;
exports.parsedSchema = parsedSchema;
var _anoncreds = require("@credo-ts/anoncreds");
function parseSchemaFromId(schemaId) {
  let name = 'Credential';
  let version = '';
  if (schemaId) {
    const schemaIdRegex = /(.*?):([0-9]):([a-zA-Z .\-_0-9]+):([a-z0-9._-]+)$/;
    const schemaIdParts = schemaId.match(schemaIdRegex);
    if ((schemaIdParts === null || schemaIdParts === void 0 ? void 0 : schemaIdParts.length) === 5) {
      name = `${schemaIdParts === null || schemaIdParts === void 0 ? void 0 : schemaIdParts[3].replace(/_|-/g, ' ')}`.split(' ').map(schemaIdPart => schemaIdPart.charAt(0).toUpperCase() + schemaIdPart.substring(1)).join(' ');
      version = schemaIdParts === null || schemaIdParts === void 0 ? void 0 : schemaIdParts[4];
    }
  }
  return {
    name,
    version
  };
}
function credentialSchema(credential) {
  var _credential$metadata;
  return (_credential$metadata = credential.metadata) === null || _credential$metadata === void 0 || (_credential$metadata = _credential$metadata.get(_anoncreds.AnonCredsCredentialMetadataKey)) === null || _credential$metadata === void 0 ? void 0 : _credential$metadata.schemaId;
}
function parsedSchema(credential) {
  return parseSchemaFromId(credentialSchema(credential));
}
//# sourceMappingURL=schema.js.map