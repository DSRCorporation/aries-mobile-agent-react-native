"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteRefreshCredentialMetadata = deleteRefreshCredentialMetadata;
exports.extractOpenId4VcCredentialMetadata = extractOpenId4VcCredentialMetadata;
exports.getOpenId4VcCredentialMetadata = getOpenId4VcCredentialMetadata;
exports.getRefreshCredentialMetadata = getRefreshCredentialMetadata;
exports.markOpenIDCredentialStatus = markOpenIDCredentialStatus;
exports.openId4VcCredentialMetadataKey = void 0;
exports.persistCredentialRecord = persistCredentialRecord;
exports.refreshCredentialMetadataKey = void 0;
exports.setOpenId4VcCredentialMetadata = setOpenId4VcCredentialMetadata;
exports.setRefreshCredentialMetadata = setRefreshCredentialMetadata;
exports.temporaryMetaVanillaObject = void 0;
var _core = require("@credo-ts/core");
const openId4VcCredentialMetadataKey = exports.openId4VcCredentialMetadataKey = '_bifold/openId4VcCredentialMetadata';
const refreshCredentialMetadataKey = exports.refreshCredentialMetadataKey = '_bifold/refreshCredentialMetadata';
function extractOpenId4VcCredentialMetadata(credentialMetadata, serverMetadata) {
  return {
    credential: {
      display: credentialMetadata.display,
      order: credentialMetadata.order,
      credential_subject: credentialMetadata.credential_subject
    },
    issuer: {
      display: serverMetadata.display,
      id: serverMetadata.id
    }
  };
}

/**
 * Gets the OpenId4Vc credential metadata from the given W3C credential record.
 */
function getOpenId4VcCredentialMetadata(credentialRecord) {
  return credentialRecord.metadata.get(openId4VcCredentialMetadataKey);
}

/**
 * Sets the OpenId4Vc credential metadata on the given W3cCredentialRecord or SdJwtVcRecord.
 *
 * NOTE: this does not save the record.
 */
function setOpenId4VcCredentialMetadata(credentialRecord, metadata) {
  credentialRecord.metadata.set(openId4VcCredentialMetadataKey, metadata);
}

/**
 * Gets the refresh credential metadata from the given credential record.
 */
function getRefreshCredentialMetadata(credentialRecord) {
  return credentialRecord.metadata.get(refreshCredentialMetadataKey);
}

/**
 * Sets the refresh credential metadata on the given credential record
 *
 * NOTE: this does not save the record.
 */
function setRefreshCredentialMetadata(credentialRecord, metadata) {
  credentialRecord.metadata.set(refreshCredentialMetadataKey, metadata);
}
function deleteRefreshCredentialMetadata(credentialRecord) {
  credentialRecord.metadata.delete(refreshCredentialMetadataKey);
}
async function persistCredentialRecord(agentContext, record) {
  if (record instanceof _core.W3cCredentialRecord) {
    await agentContext.dependencyManager.resolve(_core.W3cCredentialRepository).update(agentContext, record);
  } else if (record instanceof _core.SdJwtVcRecord) {
    await agentContext.dependencyManager.resolve(_core.SdJwtVcRepository).update(agentContext, record);
  } else if (record instanceof _core.MdocRecord) {
    await agentContext.dependencyManager.resolve(_core.MdocRepository).update(agentContext, record);
  } else {
    throw new Error('Unsupported credential record type for persistence');
  }
}
async function markOpenIDCredentialStatus({
  credential,
  status,
  agentContext
}) {
  const refreshMetadata = getRefreshCredentialMetadata(credential);
  if (!refreshMetadata) {
    throw new Error('No refresh metadata found on the credential record.');
  }
  refreshMetadata.lastCheckResult = status;
  setRefreshCredentialMetadata(credential, refreshMetadata);

  // Persist the updated credential record
  await persistCredentialRecord(agentContext, credential);
}
const temporaryMetaVanillaObject = exports.temporaryMetaVanillaObject = {
  notificationMetadata: undefined,
  tokenResponse: undefined
};
//# sourceMappingURL=metadata.js.map