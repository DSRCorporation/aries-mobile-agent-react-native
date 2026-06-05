"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acquirePreAuthorizedAccessToken = acquirePreAuthorizedAccessToken;
exports.resolveOpenId4VciOffer = exports.receiveCredentialFromOpenId4VciOffer = exports.getDpopSignatureAlgorithm = exports.customCredentialBindingResolver = exports.createHolderBindingKey = void 0;
var _openid4vc = require("@credo-ts/openid4vc");
var _core = require("@credo-ts/core");
var _metadata = require("./metadata");
const holderBindingKeyIds = new WeakMap();

/**
 * Creates a holder-binding key for OpenID4VCI proof signing.
 *
 * When hardware-backed holder binding is enabled the key is created in the secure environment.
 * Otherwise the agent's default KMS backend is used.
 */
const createHolderBindingKey = async ({
  agent,
  signatureAlgorithm,
  enableHardwareBackedHolderBinding = false
}) => {
  const key = await agent.kms.createKeyForSignatureAlgorithm(enableHardwareBackedHolderBinding ? {
    algorithm: signatureAlgorithm,
    backend: 'secureEnvironment'
  } : {
    algorithm: signatureAlgorithm
  });
  const publicJwk = _core.Kms.PublicJwk.fromPublicJwk(key.publicJwk);
  holderBindingKeyIds.set(publicJwk, key.keyId);
  return publicJwk;
};

/**
 * Selects the DPoP signing algorithm advertised by the authorization server.
 *
 * A missing `dpop_signing_alg_values_supported` value means DPoP is not used. Hardware-backed
 * keys require ES256 because the secure environment backend only supports P-256 signing.
 */
exports.createHolderBindingKey = createHolderBindingKey;
const getDpopSignatureAlgorithm = ({
  dpopSigningAlgValuesSupported,
  enableHardwareBackedHolderBinding = false
}) => {
  if (!(dpopSigningAlgValuesSupported !== null && dpopSigningAlgValuesSupported !== void 0 && dpopSigningAlgValuesSupported.length)) {
    return undefined;
  }
  if (enableHardwareBackedHolderBinding) {
    if (!dpopSigningAlgValuesSupported.includes('ES256')) {
      throw new Error('Unable to request credential with hardware-backed DPoP. Authorization server does not support ES256.');
    }
    return 'ES256';
  }
  return dpopSigningAlgValuesSupported.includes('ES256') ? 'ES256' : dpopSigningAlgValuesSupported[0];
};

/**
 * Returns the credential configuration ids to request from the offer.
 *
 * If no explicit ids are provided, the first offered credential configuration is selected.
 */
exports.getDpopSignatureAlgorithm = getDpopSignatureAlgorithm;
const getCredentialConfigurationIdsToRequest = ({
  resolvedCredentialOffer,
  credentialConfigurationIdsToRequest
}) => {
  const credentialConfigurationIds = credentialConfigurationIdsToRequest ?? [Object.keys(resolvedCredentialOffer.offeredCredentialConfigurations)[0]];
  if (credentialConfigurationIds.length === 0 || !credentialConfigurationIds[0]) {
    throw new Error('No credential configuration ID found in the credential offer.');
  }
  for (const credentialConfigurationId of credentialConfigurationIds) {
    if (!resolvedCredentialOffer.offeredCredentialConfigurations[credentialConfigurationId]) {
      throw new Error(`Parameter 'credentialConfigurationIdsToRequest' with values ${credentialConfigurationIdsToRequest} is not a credential_configuration_id in the credential offer.`);
    }
  }
  return credentialConfigurationIds;
};

/**
 * Resolves an OpenID4VCI credential offer URI into issuer metadata and offered credential
 * configurations. Parsed offer payloads are converted back into an offer URI because Credo
 * currently expects a credential offer string.
 */
const resolveOpenId4VciOffer = async ({
  agent,
  data,
  uri,
  authorization
}) => {
  let offerUri = uri;
  if (!offerUri && data) {
    // Credo currently resolves credential offers from a URI string. If the caller
    // provides an already parsed offer payload, wrap it back into an offer URI.
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
    throw new Error('Authorization code flow is not implemented in this OpenID credential offer flow.');
  }
  return resolvedCredentialOffer;
};

/**
 * Requests an access token for a pre-authorized OpenID4VCI offer.
 *
 * If DPoP options are provided, Credo signs the token request with that key and returns the
 * DPoP nonce/key metadata in the token response.
 */
exports.resolveOpenId4VciOffer = resolveOpenId4VciOffer;
async function acquirePreAuthorizedAccessToken({
  agent,
  resolvedCredentialOffer,
  txCode,
  dpop
}) {
  return await agent.openid4vc.holder.requestToken({
    resolvedCredentialOffer,
    txCode,
    dpop
  });
}

/**
 * Resolves the holder binding used for the credential request proof of possession.
 *
 * If a holder binding key is supplied, it is reused. This lets DPoP and credential binding share
 * the same key when required by product policy. If no key is supplied, a new key is created based
 * on the issuer-supported proof algorithm and the hardware-backed holder binding setting.
 */
const customCredentialBindingResolver = async ({
  agent,
  supportedDidMethods,
  supportsAllDidMethods,
  supportsJwk,
  credentialFormat,
  proofTypes,
  enableHardwareBackedHolderBinding = false,
  holderBindingKey
}) => {
  var _proofTypes$jwt, _proofTypes$jwt2;
  let didMethod = supportsAllDidMethods || supportedDidMethods !== null && supportedDidMethods !== void 0 && supportedDidMethods.includes('did:jwk') ? 'jwk' : supportedDidMethods !== null && supportedDidMethods !== void 0 && supportedDidMethods.includes('did:key') ? 'key' : undefined;
  if (!supportedDidMethods && !supportsJwk) {
    didMethod = 'key';
  }
  const signatureAlgorithm = enableHardwareBackedHolderBinding ? 'ES256' : (proofTypes === null || proofTypes === void 0 || (_proofTypes$jwt = proofTypes.jwt) === null || _proofTypes$jwt === void 0 ? void 0 : _proofTypes$jwt.supportedSignatureAlgorithms[0]) ?? 'EdDSA';
  if (enableHardwareBackedHolderBinding && !(proofTypes !== null && proofTypes !== void 0 && (_proofTypes$jwt2 = proofTypes.jwt) !== null && _proofTypes$jwt2 !== void 0 && _proofTypes$jwt2.supportedSignatureAlgorithms.includes('ES256'))) {
    throw new Error('Unable to request credential with hardware-backed holder binding. Issuer does not support ES256.');
  }
  const publicJwk = holderBindingKey ?? (await createHolderBindingKey({
    agent,
    signatureAlgorithm,
    enableHardwareBackedHolderBinding
  }));
  if (didMethod) {
    const keyId = holderBindingKeyIds.get(publicJwk) ?? publicJwk.keyId;
    const didResult = await agent.dids.create({
      method: didMethod,
      options: {
        keyId
      }
    });
    if (didResult.didState.state !== 'finished') {
      throw new Error('DID creation failed.');
    }
    let didUrl;
    if (didMethod === 'jwk') {
      didUrl = _core.DidJwk.fromDid(didResult.didState.did).verificationMethodId;
    } else {
      const didKey = _core.DidKey.fromDid(didResult.didState.did);
      didUrl = `${didKey.did}#${didKey.publicJwk.fingerprint}`;
    }
    return {
      method: 'did',
      didUrls: [didUrl]
    };
  }

  // Fallback: plain jwk for sd-jwt/mdoc only
  if (supportsJwk && (credentialFormat === _openid4vc.OpenId4VciCredentialFormatProfile.SdJwtVc || credentialFormat === _openid4vc.OpenId4VciCredentialFormatProfile.MsoMdoc)) {
    return {
      method: 'jwk',
      keys: [publicJwk] // Need to replace getJwkFromKey here
    };
  }
  throw new Error(`No supported binding method could be found. Supported methods are did:key and did:jwk, or plain jwk for sd-jwt/mdoc. Issuer supports ${supportsJwk ? 'jwk, ' : ''}${(supportedDidMethods === null || supportedDidMethods === void 0 ? void 0 : supportedDidMethods.join(', ')) ?? 'Unknown'}`);
};

/**
 * Requests and stores credentials from a resolved OpenID4VCI offer using an existing token response.
 *
 * The credential binding resolver can receive a pre-created holder binding key. When supplied, that
 * key is reused for the credential proof; otherwise the resolver creates the key itself.
 */
exports.customCredentialBindingResolver = customCredentialBindingResolver;
const receiveCredentialFromOpenId4VciOffer = async ({
  agent,
  resolvedCredentialOffer,
  tokenResponse,
  credentialConfigurationIdsToRequest,
  clientId,
  enableHardwareBackedHolderBinding = false,
  holderBindingKey
}) => {
  const credentialConfigurationIds = getCredentialConfigurationIdsToRequest({
    resolvedCredentialOffer,
    credentialConfigurationIdsToRequest
  });
  const credentials = await agent.openid4vc.holder.requestCredentials({
    resolvedCredentialOffer,
    ...tokenResponse,
    clientId,
    credentialConfigurationIds,
    verifyCredentialStatus: false,
    allowedProofOfPossessionSignatureAlgorithms: enableHardwareBackedHolderBinding ? ['ES256'] : ['EdDSA', 'ES256'],
    credentialBindingResolver: async ({
      supportedDidMethods,
      proofTypes,
      supportsAllDidMethods,
      supportsJwk,
      credentialFormat
    }) => {
      return customCredentialBindingResolver({
        agent,
        supportedDidMethods,
        proofTypes,
        supportsAllDidMethods,
        supportsJwk,
        credentialFormat,
        enableHardwareBackedHolderBinding,
        holderBindingKey
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
  const requestedCredentialConfiguration = resolvedCredentialOffer.offeredCredentialConfigurations[credentialConfigurationIds[0]];
  const openId4VcMetadata = (0, _metadata.extractOpenId4VcCredentialMetadata)(requestedCredentialConfiguration, {
    id: resolvedCredentialOffer.metadata.credentialIssuer.credential_issuer,
    display: resolvedCredentialOffer.metadata.credentialIssuer.display
  });
  (0, _metadata.setOpenId4VcCredentialMetadata)(record, openId4VcMetadata);
  return record;
};
exports.receiveCredentialFromOpenId4VciOffer = receiveCredentialFromOpenId4VciOffer;
//# sourceMappingURL=offerResolve.js.map