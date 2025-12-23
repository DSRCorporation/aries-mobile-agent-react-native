import { AnonCredsCredentialMetadataKey, parseIndyCredentialDefinitionId, parseIndySchemaId } from '@credo-ts/anoncreds';
import { credentialSchema } from './schema';
import { isDidIndyCredentialDefinitionId, isDidIndySchemaId } from "@credo-ts/anoncreds/build/utils/indyIdentifiers";
export function parseCredDefFromId(credDefId, schemaId) {
  let name = 'Credential';
  if (credDefId) {
    if (isDidIndyCredentialDefinitionId(credDefId)) {
      const parseIndyCredDefId = parseIndyCredentialDefinitionId(credDefId);
      name = parseIndyCredDefId.tag;
    }
  }
  if (name.toLocaleLowerCase() === 'default' || name.toLowerCase() === 'credential') {
    if (schemaId) {
      if (isDidIndySchemaId(schemaId)) {
        const parseIndySchema = parseIndySchemaId(schemaId);
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
  return (_credential$metadata$ = credential.metadata.get(AnonCredsCredentialMetadataKey)) === null || _credential$metadata$ === void 0 ? void 0 : _credential$metadata$.credentialDefinitionId;
}
export function parsedCredDefNameFromCredential(credential) {
  return parseCredDefFromId(credentialDefinition(credential), credentialSchema(credential));
}
export function parsedCredDefName(credentialDefinitionId, schemaId) {
  return parseCredDefFromId(credentialDefinitionId, schemaId);
}
//# sourceMappingURL=cred-def.js.map