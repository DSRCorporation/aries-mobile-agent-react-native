const openId4VcCredentialMetadataKey = '_bifold/openId4VcCredentialMetadata';
export function extractOpenId4VcCredentialMetadata(credentialMetadata, serverMetadata) {
  var _serverMetadata$crede;
  return {
    credential: {
      display: credentialMetadata.display,
      order: credentialMetadata.order
    },
    issuer: {
      display: (_serverMetadata$crede = serverMetadata.credentialIssuerMetadata) === null || _serverMetadata$crede === void 0 ? void 0 : _serverMetadata$crede.display,
      id: serverMetadata.issuer
    }
  };
}

/**
 * Gets the OpenId4Vc credential metadata from the given W3C credential record.
 */
export function getOpenId4VcCredentialMetadata(credentialRecord) {
  return credentialRecord.metadata.get(openId4VcCredentialMetadataKey);
}

/**
 * Sets the OpenId4Vc credential metadata on the given W3cCredentialRecord or SdJwtVcRecord.
 *
 * NOTE: this does not save the record.
 */
export function setOpenId4VcCredentialMetadata(credentialRecord, metadata) {
  credentialRecord.metadata.set(openId4VcCredentialMetadataKey, metadata);
}
//# sourceMappingURL=metadata.js.map