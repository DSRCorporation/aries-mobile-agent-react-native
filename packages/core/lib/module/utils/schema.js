import { AnonCredsCredentialMetadataKey } from '@credo-ts/anoncreds';
export function parseSchemaFromId(schemaId) {
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
export function credentialSchema(credential) {
  var _credential$metadata;
  return (_credential$metadata = credential.metadata) === null || _credential$metadata === void 0 || (_credential$metadata = _credential$metadata.get(AnonCredsCredentialMetadataKey)) === null || _credential$metadata === void 0 ? void 0 : _credential$metadata.schemaId;
}
export function parsedSchema(credential) {
  return parseSchemaFromId(credentialSchema(credential));
}
//# sourceMappingURL=schema.js.map