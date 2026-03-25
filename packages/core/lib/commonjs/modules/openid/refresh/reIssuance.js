"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reissueCredentialWithAccessToken = reissueCredentialWithAccessToken;
var _offerResolve = require("../offerResolve");
var _metadata = require("../metadata");
var _types = require("./types");
async function reissueCredentialWithAccessToken({
  agent,
  logger,
  record,
  tokenResponse,
  clientId,
  pidSchemes
}) {
  if (!record) {
    throw new Error('No credential record provided for re-issuance.');
  }
  const refreshMetaData = (0, _metadata.getRefreshCredentialMetadata)(record);
  if (!refreshMetaData) {
    throw new Error('No refresh metadata found on the record for re-issuance.');
  }
  const {
    credentialConfigurationId,
    resolvedCredentialOffer
  } = refreshMetaData;
  if (!resolvedCredentialOffer) {
    throw new Error('No resolved credential offer found in the refresh metadata for re-issuance.');
  }
  if (!tokenResponse.access_token) {
    throw new Error('No access token found in the token response for re-issuance.');
  }
  logger.info('*** Starting to get new credential via re-issuance flow ***');
  // Request a **new** credential using the *existing* configuration id

  const creds = await agent.modules.openid4vc.holder.requestCredentials({
    resolvedCredentialOffer,
    accessToken: tokenResponse.access_token,
    tokenType: tokenResponse.token_type || 'Bearer',
    cNonce: tokenResponse.c_nonce,
    clientId,
    credentialsToRequest: [credentialConfigurationId],
    verifyCredentialStatus: false,
    // you’ll check after storing
    allowedProofOfPossessionSignatureAlgorithms: ['EdDSA', 'ES256'],
    credentialBindingResolver: async opts => (0, _offerResolve.customCredentialBindingResolver)({
      agent,
      supportedDidMethods: opts.supportedDidMethods,
      // keyType: opts.keyType,
      supportsAllDidMethods: opts.supportsAllDidMethods,
      supportsJwk: opts.supportsJwk,
      credentialFormat: opts.credentialFormat,
      // supportedCredentialId: opts.supportedCredentialId,
      resolvedCredentialOffer: resolvedCredentialOffer,
      pidSchemes
    })
  });
  logger.info('*** New credential received via re-issuance flow ***.');

  // Normalize to your local record types
  const [firstCredential] = creds.credentials;
  if (!firstCredential || typeof firstCredential === 'string') {
    throw new Error('Issuer returned empty or malformed credential on re-issuance.');
  }
  const newRecord = firstCredential.record;
  // if ('compact' in firstCredential) {
  //   newRecord = new SdJwtVcRecord({ c })
  // } else if ((firstCredential as any)?.credential instanceof Mdoc) {
  //   newRecord = new MdocRecord({ mdoc: firstCredential.credential })
  // } else {
  //   newRecord = new W3cCredentialRecord({
  //     credential: firstCredential.credential as W3cJwtVerifiableCredential | W3cJsonLdVerifiableCredential,
  //     tags: {},
  //   })
  // }

  const openId4VcMetadata = (0, _metadata.extractOpenId4VcCredentialMetadata)(resolvedCredentialOffer.offeredCredentialConfigurations, {
    id: resolvedCredentialOffer.metadata.credentialIssuer.credential_issuer,
    display: resolvedCredentialOffer.metadata.credentialIssuer.display
  });
  (0, _metadata.setOpenId4VcCredentialMetadata)(newRecord, openId4VcMetadata);
  (0, _metadata.setRefreshCredentialMetadata)(newRecord, {
    ...refreshMetaData,
    refreshToken: tokenResponse.refresh_token || refreshMetaData.refreshToken,
    lastCheckedAt: Date.now(),
    lastCheckResult: _types.RefreshStatus.Valid
  });
  return newRecord;
}
//# sourceMappingURL=reIssuance.js.map