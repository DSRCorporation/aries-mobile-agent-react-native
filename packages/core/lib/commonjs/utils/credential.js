"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.credentialTextColor = void 0;
exports.ensureCredentialMetadata = ensureCredentialMetadata;
exports.getCredentialIdentifiers = void 0;
exports.getEffectiveCredentialName = getEffectiveCredentialName;
exports.isValidAnonCredsCredential = void 0;
exports.isValidCredentialName = isValidCredentialName;
exports.toImageSource = void 0;
var _anoncreds = require("@credo-ts/anoncreds");
var _didcomm2 = require("@credo-ts/didcomm");
var _luminance = require("./luminance");
var _credDef = require("./cred-def");
// Credo agent shape differs across versions/contexts.
// Resolve the credentials api from the available path.
function getCredentialsApi(agent) {
  var _modules, _didcomm;
  return (agent === null || agent === void 0 || (_modules = agent.modules) === null || _modules === void 0 || (_modules = _modules.didcomm) === null || _modules === void 0 ? void 0 : _modules.credentials) || (agent === null || agent === void 0 || (_didcomm = agent.didcomm) === null || _didcomm === void 0 ? void 0 : _didcomm.credentials) || (agent === null || agent === void 0 ? void 0 : agent.credentials);
}
const isValidAnonCredsCredential = credential => {
  return credential && (credential.state === _didcomm2.DidCommCredentialState.OfferReceived || Boolean(credential.metadata.get(_anoncreds.AnonCredsCredentialMetadataKey)) && credential.credentials.find(c => c.credentialRecordType === 'anoncreds' || c.credentialRecordType === 'w3c'));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.isValidAnonCredsCredential = isValidAnonCredsCredential;
const credentialTextColor = (ColorPalette, hex) => {
  const midpoint = 255 / 2;
  if (((0, _luminance.luminanceForHexColor)(hex ?? '') ?? 0) >= midpoint) {
    return ColorPalette.grayscale.darkGrey;
  }
  return ColorPalette.grayscale.white;
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

/**
 * Attempts to resolve schema and credDef IDs from credential format data.
 */
exports.getCredentialIdentifiers = getCredentialIdentifiers;
async function resolveIdsFromFormatData(credential, agent, logger) {
  try {
    const credentialsApi = getCredentialsApi(agent);
    if (!(credentialsApi !== null && credentialsApi !== void 0 && credentialsApi.getFormatData)) {
      return {};
    }
    const {
      offer
    } = await credentialsApi.getFormatData(credential.id);
    const formatOfferData = (offer === null || offer === void 0 ? void 0 : offer.anoncreds) ?? (offer === null || offer === void 0 ? void 0 : offer.indy);

    // Type guard to check if formatOfferData has the expected structure
    if (formatOfferData && typeof formatOfferData === 'object' && 'schema_id' in formatOfferData && typeof formatOfferData.schema_id === 'string') {
      return {
        schemaId: formatOfferData.schema_id,
        credDefId: 'cred_def_id' in formatOfferData && typeof formatOfferData.cred_def_id === 'string' ? formatOfferData.cred_def_id : undefined
      };
    }
  } catch (error) {
    logger === null || logger === void 0 || logger.error('Failed to get format data', {
      error: error
    });
  }
  return {};
}

/**
 * Resolves schema name from the given schema ID.
 */
async function resolveSchemaName(schemaId, agent, logger) {
  try {
    const {
      schema: resolvedSchema
    } = await agent.modules.anoncreds.getSchema(schemaId);
    const schemaName = resolvedSchema === null || resolvedSchema === void 0 ? void 0 : resolvedSchema.name;
    logger === null || logger === void 0 || logger.debug('Resolved schema name', {
      schemaId,
      schemaName
    });
    return schemaName;
  } catch (error) {
    logger === null || logger === void 0 || logger.warn('Failed to resolve schema', {
      error: error,
      schemaId
    });
    return undefined;
  }
}

/**
 * Resolves credential definition tag from the given cred def ID.
 */
async function resolveCredDefTag(credDefId, agent, logger) {
  try {
    const {
      credentialDefinition: resolvedCredDef
    } = await agent.modules.anoncreds.getCredentialDefinition(credDefId);
    const credDefTag = resolvedCredDef === null || resolvedCredDef === void 0 ? void 0 : resolvedCredDef.tag;
    logger === null || logger === void 0 || logger.debug('Resolved credential definition tag', {
      credDefId,
      credDefTag
    });
    return credDefTag;
  } catch (error) {
    logger === null || logger === void 0 || logger.warn('Failed to resolve credential definition', {
      error: error,
      credDefId
    });
    return undefined;
  }
}

/**
 * Determines the IDs to use for resolution, preferring offer data over existing metadata.
 */
async function determineSchemaAndCredDefIds(credential, agent, offerData, existingMetadata, logger) {
  let schemaId = (offerData === null || offerData === void 0 ? void 0 : offerData.schema_id) || (existingMetadata === null || existingMetadata === void 0 ? void 0 : existingMetadata.schemaId);
  let credDefId = (offerData === null || offerData === void 0 ? void 0 : offerData.cred_def_id) || (existingMetadata === null || existingMetadata === void 0 ? void 0 : existingMetadata.credentialDefinitionId);
  const needsResolution = !schemaId || !credDefId;
  if (needsResolution) {
    const resolvedIds = await resolveIdsFromFormatData(credential, agent, logger);
    schemaId = schemaId || resolvedIds.schemaId;
    credDefId = credDefId || resolvedIds.credDefId;
  }
  return {
    schemaId,
    credDefId
  };
}

/**
 * Updates credential metadata with resolved schema name and cred def tag.
 */
async function updateCredentialMetadata(params) {
  const {
    credential,
    agent,
    existingMetadata,
    schemaId,
    credDefId,
    schemaName,
    credDefTag,
    logger
  } = params;
  const metadataToStore = {
    ...existingMetadata,
    schemaId,
    credentialDefinitionId: credDefId,
    schemaName,
    credDefTag
  };
  credential.metadata.add(_anoncreds.AnonCredsCredentialMetadataKey, metadataToStore);
  const credentialsApi = getCredentialsApi(agent);
  if (credentialsApi !== null && credentialsApi !== void 0 && credentialsApi.update) {
    await credentialsApi.update(credential);
  } else {
    logger === null || logger === void 0 || logger.warn('Unable to persist credential metadata; credentials update API unavailable', {
      credentialId: credential.id
    });
  }
  logger === null || logger === void 0 || logger.info('Credential metadata ensured', {
    credentialId: credential.id,
    schemaName,
    credDefTag,
    wasUpdated: true
  });
}

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
async function ensureCredentialMetadata(credential, agent, offerData, logger) {
  var _agent$modules;
  if (!(agent !== null && agent !== void 0 && (_agent$modules = agent.modules) !== null && _agent$modules !== void 0 && _agent$modules.anoncreds)) {
    return false;
  }
  const existingMetadata = credential.metadata.get(_anoncreds.AnonCredsCredentialMetadataKey);
  const {
    schemaId,
    credDefId
  } = await determineSchemaAndCredDefIds(credential, agent, offerData, existingMetadata, logger);

  // Check what's missing
  const needsSchemaName = !(existingMetadata !== null && existingMetadata !== void 0 && existingMetadata.schemaName) && schemaId;
  const needsCredDefTag = !(existingMetadata !== null && existingMetadata !== void 0 && existingMetadata.credDefTag) && credDefId;
  const hasAllMetadata = !needsSchemaName && !needsCredDefTag;
  if (hasAllMetadata) {
    return false;
  }

  // Resolve missing metadata
  const schemaName = needsSchemaName && schemaId ? await resolveSchemaName(schemaId, agent, logger) : existingMetadata === null || existingMetadata === void 0 ? void 0 : existingMetadata.schemaName;
  const credDefTag = needsCredDefTag && credDefId ? await resolveCredDefTag(credDefId, agent, logger) : existingMetadata === null || existingMetadata === void 0 ? void 0 : existingMetadata.credDefTag;
  await updateCredentialMetadata({
    credential,
    agent,
    existingMetadata,
    schemaId,
    credDefId,
    schemaName,
    credDefTag,
    logger
  });
  return true;
}

/**
 * Validates whether a credential name is meaningful and should be used for display.
 * Returns false for undefined, empty, whitespace-only, or default placeholder names.
 *
 * @param name - The name to validate
 * @returns true if the name is valid and meaningful, false otherwise
 */
function isValidCredentialName(name) {
  return !!(name && name !== _credDef.defaultCredDefTag && name !== _credDef.fallbackDefaultCredentialNameValue && name.trim() !== '');
}

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
function getEffectiveCredentialName(credential, ocaName) {
  // 1. Try OCA Bundle name
  if (isValidCredentialName(ocaName)) {
    return ocaName;
  }

  // 2. Try credential definition tag
  const credDefTag = (0, _credDef.getCredDefTag)(credential);
  if (isValidCredentialName(credDefTag)) {
    return credDefTag;
  }

  // 3. Try schema name
  const schemaName = (0, _credDef.getSchemaName)(credential);
  if (isValidCredentialName(schemaName)) {
    return schemaName;
  }

  // 4. Return default fallback
  return _credDef.fallbackDefaultCredentialNameValue;
}
//# sourceMappingURL=credential.js.map