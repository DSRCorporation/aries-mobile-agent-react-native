"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acquirePreAuthorizedAccessToken = acquirePreAuthorizedAccessToken;
exports.resolveOpenId4VciOffer = exports.receiveCredentialFromOpenId4VciOffer = exports.customCredentialBindingResolver = void 0;
var _openid4vc = require("@credo-ts/openid4vc");
var _core = require("@credo-ts/core");
var _metadata = require("./metadata");
const resolveOpenId4VciOffer = async ({
  agent,
  data,
  uri,
  authorization
}) => {
  let offerUri = uri;
  if (!offerUri && data) {
    // FIXME: Credo only support credential offer string, but we already parsed it before. So we construct an offer here
    // but in the future we need to support the parsed offer in Credo directly
    offerUri = `openid-credential-offer://credential_offer=${encodeURIComponent(JSON.stringify(data))}`;
  } else if (!offerUri) {
    throw new Error('either data or uri must be provided');
  }
  agent.config.logger.info(`Receiving openid uri ${offerUri}`, {
    offerUri,
    data: data,
    uri: offerUri
  });
  const resolvedCredentialOffer = await agent.openid4vc.holder.resolveCredentialOffer(offerUri);
  if (authorization) {
    throw new Error('Authorization flow is not supported yet as of Credo 0.5.13');
  }
  return resolvedCredentialOffer;
};
exports.resolveOpenId4VciOffer = resolveOpenId4VciOffer;
async function acquirePreAuthorizedAccessToken({
  agent,
  resolvedCredentialOffer,
  txCode
}) {
  return await agent.modules.openid4vc.holder.requestToken({
    resolvedCredentialOffer,
    txCode
  });
}
const customCredentialBindingResolver = async ({
  agent,
  supportedDidMethods,
  supportsAllDidMethods,
  supportsJwk,
  credentialFormat,
  proofTypes
}) => {
  var _proofTypes$jwt;
  // First, we try to pick a did method
  // Prefer did:jwk, otherwise use did:key, otherwise use undefined
  let didMethod = supportsAllDidMethods || supportedDidMethods !== null && supportedDidMethods !== void 0 && supportedDidMethods.includes('did:jwk') ? 'jwk' : supportedDidMethods !== null && supportedDidMethods !== void 0 && supportedDidMethods.includes('did:key') ? 'key' : undefined;

  // If supportedDidMethods is undefined, and supportsJwk is false, we will default to did:key
  // this is important as part of MATTR launchpad support which MUST use did:key but doesn't
  // define which did methods they support
  if (!supportedDidMethods && !supportsJwk) {
    didMethod = 'key';
  }
  const key = await agent.kms.createKeyForSignatureAlgorithm({
    algorithm: (proofTypes === null || proofTypes === void 0 || (_proofTypes$jwt = proofTypes.jwt) === null || _proofTypes$jwt === void 0 ? void 0 : _proofTypes$jwt.supportedSignatureAlgorithms[0]) ?? 'EdDSA'
  });
  const publicJwk = _core.Kms.PublicJwk.fromPublicJwk(key.publicJwk);
  if (didMethod) {
    const didResult = await agent.dids.create({
      method: didMethod,
      options: {
        keyId: key.keyId
      }
    });
    if (didResult.didState.state !== 'finished') {
      throw new Error('DID creation failed.');
    }
    let verificationMethodId;
    if (didMethod === 'jwk') {
      const didJwk = _core.DidJwk.fromDid(didResult.didState.did);
      verificationMethodId = didJwk.verificationMethodId;
    } else {
      const didKey = _core.DidKey.fromDid(didResult.didState.did);
      verificationMethodId = `${didKey.did}#${didKey.publicJwk.fingerprint}`;
    }
    return {
      didUrls: [verificationMethodId],
      method: 'did'
    };
  }

  // Otherwise we also support plain jwk for sd-jwt only
  if (supportsJwk && (credentialFormat === _openid4vc.OpenId4VciCredentialFormatProfile.SdJwtVc || credentialFormat === _openid4vc.OpenId4VciCredentialFormatProfile.MsoMdoc)) {
    return {
      method: 'jwk',
      keys: [publicJwk] // Need to replace getJwkFromKey here
    };
  }
  throw new Error(`No supported binding method could be found. Supported methods are did:key and did:jwk, or plain jwk for sd-jwt/mdoc. Issuer supports ${supportsJwk ? 'jwk, ' : ''}${(supportedDidMethods === null || supportedDidMethods === void 0 ? void 0 : supportedDidMethods.join(', ')) ?? 'Unknown'}`);
};
exports.customCredentialBindingResolver = customCredentialBindingResolver;
const receiveCredentialFromOpenId4VciOffer = async ({
  agent,
  resolvedCredentialOffer,
  tokenResponse,
  credentialConfigurationIdsToRequest,
  clientId,
  pidSchemes
}) => {
  const offeredCredentialsToRequest = credentialConfigurationIdsToRequest ? Object.entries(resolvedCredentialOffer.offeredCredentialConfigurations).filter(([k]) => credentialConfigurationIdsToRequest.includes(k)) : [Object.values(resolvedCredentialOffer.offeredCredentialConfigurations)[0]];
  if (offeredCredentialsToRequest.length === 0) {
    throw new Error(`Parameter 'credentialConfigurationIdsToRequest' with values ${credentialConfigurationIdsToRequest} is not a credential_configuration_id in the credential offer.`);
  }
  const credentials = await agent.openid4vc.holder.requestCredentials({
    resolvedCredentialOffer,
    ...tokenResponse,
    clientId,
    credentialConfigurationIds: credentialConfigurationIdsToRequest,
    verifyCredentialStatus: false,
    allowedProofOfPossessionSignatureAlgorithms: [
    // NOTE: MATTR launchpad for JFF MUST use EdDSA. So it is important that the default (first allowed one)
    // is EdDSA. The list is ordered by preference, so if no suites are defined by the issuer, the first one
    // will be used
    "EdDSA", "ES256"],
    credentialBindingResolver: async ({
      supportedDidMethods,
      proofTypes,
      supportsAllDidMethods,
      supportsJwk,
      credentialFormat,
      credentialConfigurationId
    }) => {
      return customCredentialBindingResolver({
        agent,
        supportedDidMethods,
        proofTypes,
        supportsAllDidMethods,
        supportsJwk,
        credentialFormat,
        credentialConfigurationId,
        resolvedCredentialOffer,
        pidSchemes
      });
    }
  });

  // We only support one credential for now
  const [firstCredential] = credentials.credentials;
  if (!firstCredential) throw new Error('Error retrieving credential using pre authorized flow: firstCredential undefined!.');
  if (typeof firstCredential === 'string') {
    throw new Error('Error retrieving credential using pre authorized flow: firstCredential is string.');
  }
  const record = firstCredential.record;

  // This block likely not necessary anymore? The record seems to be defined on this object already.

  // if ('compact' in firstCredential.) {
  //   // TODO: add claimFormat to SdJwtVc
  //   record = new SdJwtVcRecord({
  //     credentialInstances: firstCredential.credential.compact,
  //   })
  // } else if (firstCredential.credential instanceof Mdoc) {
  //   record = new MdocRecord({
  //     mdoc: firstCredential.credential,
  //   })
  // } else {
  //   record = new W3cCredentialRecord({
  //     credential: firstCredential.credential as W3cJwtVerifiableCredential | W3cJsonLdVerifiableCredential,
  //     // We don't support expanded types right now, but would become problem when we support JSON-LD
  //     tags: {},
  //   })
  // }

  // TODO: Confirm how this should be handled, notificationMetadata for openid4vc may have been removed

  // const notificationMetadata = { ...firstCredential.notificationMetadata }
  // if (notificationMetadata) {
  //   temporaryMetaVanillaObject.notificationMetadata = notificationMetadata
  // }

  const openId4VcMetadata = (0, _metadata.extractOpenId4VcCredentialMetadata)(Object.values(resolvedCredentialOffer.offeredCredentialConfigurations)[0], {
    id: resolvedCredentialOffer.metadata.credentialIssuer.credential_issuer,
    // This might not be correct
    display: resolvedCredentialOffer.metadata.credentialIssuer.display
  });
  (0, _metadata.setOpenId4VcCredentialMetadata)(record, openId4VcMetadata);
  return record;
};
exports.receiveCredentialFromOpenId4VciOffer = receiveCredentialFromOpenId4VciOffer;
//# sourceMappingURL=offerResolve.js.map