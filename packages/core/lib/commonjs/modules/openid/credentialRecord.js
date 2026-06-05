"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteOpenIDCredential = deleteOpenIDCredential;
exports.findOpenIDCredentialById = findOpenIDCredentialById;
exports.getOpenIDCredentialById = getOpenIDCredentialById;
exports.isOpenIdProofRequestRecord = exports.isOpenIDCredentialRecord = exports.getOpenIDCredentialType = exports.getOpenIDCredentialClaimFormat = void 0;
exports.storeOpenIDCredential = storeOpenIDCredential;
exports.toOpenIDCredentialLite = void 0;
var _core = require("@credo-ts/core");
var _types = require("./types");
const isOpenIDCredentialRecord = value => value instanceof _core.W3cCredentialRecord || value instanceof _core.SdJwtVcRecord || value instanceof _core.MdocRecord || value instanceof _core.W3cV2CredentialRecord;
exports.isOpenIDCredentialRecord = isOpenIDCredentialRecord;
const isOpenIdProofRequestRecord = value => !!value && typeof value === 'object' && 'type' in value && value.type === 'OpenId4VPRequestRecord';
exports.isOpenIdProofRequestRecord = isOpenIdProofRequestRecord;
const getOpenIDCredentialType = record => {
  if (record instanceof _core.SdJwtVcRecord) {
    return _types.OpenIDCredentialType.SdJwtVc;
  }
  if (record instanceof _core.MdocRecord) {
    return _types.OpenIDCredentialType.Mdoc;
  }
  if (record instanceof _core.W3cV2CredentialRecord) {
    return 'W3cV2CredentialRecord';
  }
  return _types.OpenIDCredentialType.W3cCredential;
};
exports.getOpenIDCredentialType = getOpenIDCredentialType;
const getOpenIDCredentialClaimFormat = record => {
  var _record$getTags;
  if (record instanceof _core.SdJwtVcRecord) {
    return _core.ClaimFormat.SdJwtW3cVc;
  }
  if (record instanceof _core.MdocRecord) {
    return _core.ClaimFormat.MsoMdoc;
  }
  const claimFormat = (_record$getTags = record.getTags()) === null || _record$getTags === void 0 ? void 0 : _record$getTags.claimFormat;
  return typeof claimFormat === 'string' ? claimFormat : _core.ClaimFormat.JwtVc;
};
exports.getOpenIDCredentialClaimFormat = getOpenIDCredentialClaimFormat;
const toOpenIDCredentialLite = record => {
  var _record$createdAt;
  return {
    id: record.id,
    format: getOpenIDCredentialClaimFormat(record),
    createdAt: (_record$createdAt = record.createdAt) === null || _record$createdAt === void 0 ? void 0 : _record$createdAt.toISOString(),
    issuer: undefined
  };
};
exports.toOpenIDCredentialLite = toOpenIDCredentialLite;
async function storeOpenIDCredential(agent, record) {
  if (record instanceof _core.W3cCredentialRecord) {
    return agent.w3cCredentials.store({
      record
    });
  }
  if (record instanceof _core.W3cV2CredentialRecord) {
    return agent.w3cV2Credentials.store({
      record
    });
  }
  if (record instanceof _core.SdJwtVcRecord) {
    return agent.sdJwtVc.store({
      record
    });
  }
  if (record instanceof _core.MdocRecord) {
    return agent.mdoc.store({
      record
    });
  }
  throw new Error(`Unsupported OpenID credential record type: ${(record === null || record === void 0 ? void 0 : record.type) ?? 'unknown'}`);
}
async function deleteOpenIDCredential(agent, record) {
  if (record instanceof _core.W3cCredentialRecord) {
    return agent.w3cCredentials.deleteById(record.id);
  }
  if (record instanceof _core.W3cV2CredentialRecord) {
    return agent.w3cV2Credentials.deleteById(record.id);
  }
  if (record instanceof _core.SdJwtVcRecord) {
    return agent.sdJwtVc.deleteById(record.id);
  }
  if (record instanceof _core.MdocRecord) {
    return agent.mdoc.deleteById(record.id);
  }
  throw new Error(`Unsupported OpenID credential record type: ${(record === null || record === void 0 ? void 0 : record.type) ?? 'unknown'}`);
}
async function getOpenIDCredentialById(agent, type, id) {
  switch (type) {
    case _types.OpenIDCredentialType.W3cCredential:
      return agent.w3cCredentials.getById(id);
    case 'W3cV2CredentialRecord':
      return agent.w3cV2Credentials.getById(id);
    case _types.OpenIDCredentialType.SdJwtVc:
      return agent.sdJwtVc.getById(id);
    case _types.OpenIDCredentialType.Mdoc:
      return agent.mdoc.getById(id);
    default:
      return undefined;
  }
}
async function findOpenIDCredentialById(agent, id) {
  const lookups = await Promise.allSettled([agent.w3cCredentials.getById(id), agent.w3cV2Credentials.getById(id), agent.sdJwtVc.getById(id), agent.mdoc.getById(id)]);
  for (const lookup of lookups) {
    if (lookup.status === 'fulfilled' && lookup.value) {
      return lookup.value;
    }
  }
  return undefined;
}
//# sourceMappingURL=credentialRecord.js.map