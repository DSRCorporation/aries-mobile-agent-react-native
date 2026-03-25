"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fallbackDefaultCredentialNameValue = exports.defaultCredDefTag = void 0;
exports.getCredDefTag = getCredDefTag;
exports.getCredentialName = getCredentialName;
exports.getSchemaName = getSchemaName;
exports.parsedCredDefName = parsedCredDefName;
exports.parsedCredDefNameFromCredential = parsedCredDefNameFromCredential;
var _anoncreds = require("@credo-ts/anoncreds");
var _schema = require("./schema");
var _credential = require("./credential");
// Fallback default credential name when no other name is available
const fallbackDefaultCredentialNameValue = exports.fallbackDefaultCredentialNameValue = 'Credential';

// Default credential definition tag value
const defaultCredDefTag = exports.defaultCredDefTag = 'default';

// Normalize incoming identifiers by trimming whitespace and converting empty strings to undefined
function normalizeId(id) {
  if (typeof id !== 'string') return undefined;
  const trimmed = id.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
async function getCredentialName(credDefId, schemaId) {
  const normalizedCredDefId = normalizeId(credDefId);
  const normalizedSchemaId = normalizeId(schemaId);
  return parseIndyCredDefId(normalizedCredDefId, normalizedSchemaId);
}
function parseIndyCredDefId(credDefId, schemaId) {
  let name = fallbackDefaultCredentialNameValue;
  if (credDefId) {
    try {
      if ((0, _anoncreds.isDidIndyCredentialDefinitionId)(credDefId)) {
        const parseIndyCredDefId = (0, _anoncreds.parseIndyCredentialDefinitionId)(credDefId);
        name = parseIndyCredDefId.tag;
      }
    } catch {
      // If parsing fails, keep the default name
    }
  }
  if (name.toLowerCase() === defaultCredDefTag || name.toLowerCase() === fallbackDefaultCredentialNameValue.toLowerCase()) {
    if (schemaId) {
      try {
        if ((0, _anoncreds.isDidIndySchemaId)(schemaId)) {
          const parseIndySchema = (0, _anoncreds.parseIndySchemaId)(schemaId);
          name = parseIndySchema.schemaName;
        }
      } catch {
        // If parsing fails, keep the default name
        name = fallbackDefaultCredentialNameValue;
      }
    } else {
      name = fallbackDefaultCredentialNameValue;
    }
  }
  return name;
}
function credentialDefinition(credential) {
  var _credential$metadata$;
  return (_credential$metadata$ = credential.metadata.get(_anoncreds.AnonCredsCredentialMetadataKey)) === null || _credential$metadata$ === void 0 ? void 0 : _credential$metadata$.credentialDefinitionId;
}
function getSchemaName(credential) {
  const metadata = credential.metadata.get(_anoncreds.AnonCredsCredentialMetadataKey);
  const schemaName = metadata === null || metadata === void 0 ? void 0 : metadata.schemaName;
  return schemaName;
}
function getCredDefTag(credential) {
  const metadata = credential.metadata.get(_anoncreds.AnonCredsCredentialMetadataKey);
  const credDefTag = metadata === null || metadata === void 0 ? void 0 : metadata.credDefTag;
  return credDefTag;
}
async function parsedCredDefNameFromCredential(credential, agent, logger) {
  // Ensure metadata is cached if agent is provided
  if (agent) {
    try {
      await (0, _credential.ensureCredentialMetadata)(credential, agent, undefined, logger);
    } catch (error) {
      // If metadata restoration fails, we'll fall back to parsing IDs or default name
      logger === null || logger === void 0 || logger.warn('Failed to restore credential metadata in parsedCredDefNameFromCredential', {
        error: error
      });
    }
  }

  // Check if we have cached metadata
  const cachedSchemaName = getSchemaName(credential);
  if (cachedSchemaName) {
    // Use the priority waterfall logic (OCA name > credDefTag > schemaName > fallback)
    return (0, _credential.getEffectiveCredentialName)(credential);
  }

  // Fallback: parse the IDs if metadata is not cached and no agent to resolve
  const fallbackName = await getCredentialName(credentialDefinition(credential), (0, _schema.credentialSchema)(credential));
  return fallbackName;
}
async function parsedCredDefName(credentialDefinitionId, schemaId) {
  return getCredentialName(credentialDefinitionId, schemaId);
}
//# sourceMappingURL=cred-def.js.map