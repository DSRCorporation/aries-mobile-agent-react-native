"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.receiveCredentialFromOpenId4VciOffer = void 0;
var _core = require("@credo-ts/core");
var _openid4vc = require("@credo-ts/openid4vc");
var _metadata = require("./metadata");
const receiveCredentialFromOpenId4VciOffer = async ({
  agent,
  data,
  uri
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
    data,
    uri
  });
  const resolvedCredentialOffer = await agent.modules.openId4VcHolder.resolveCredentialOffer(offerUri);

  // FIXME: return credential_supported entry for credential so it's easy to store metadata
  const credentials = await agent.modules.openId4VcHolder.acceptCredentialOfferUsingPreAuthorizedCode(resolvedCredentialOffer, {
    credentialBindingResolver: async ({
      supportedDidMethods,
      keyType,
      supportsAllDidMethods,
      supportsJwk,
      credentialFormat
    }) => {
      // First, we try to pick a did method
      // Prefer did:jwk, otherwise use did:key, otherwise use undefined
      let didMethod = supportsAllDidMethods || supportedDidMethods !== null && supportedDidMethods !== void 0 && supportedDidMethods.includes('did:jwk') ? 'jwk' : supportedDidMethods !== null && supportedDidMethods !== void 0 && supportedDidMethods.includes('did:key') ? 'key' : undefined;

      // If supportedDidMethods is undefined, and supportsJwk is false, we will default to did:key
      // this is important as part of MATTR launchpad support which MUST use did:key but doesn't
      // define which did methods they support
      if (!supportedDidMethods && !supportsJwk) {
        didMethod = 'key';
      }
      if (didMethod) {
        const didResult = await agent.dids.create({
          method: didMethod,
          options: {
            keyType
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
          verificationMethodId = `${didKey.did}#${didKey.key.fingerprint}`;
        }
        return {
          didUrl: verificationMethodId,
          method: 'did'
        };
      }

      // Otherwise we also support plain jwk for sd-jwt only
      if (supportsJwk && credentialFormat === _openid4vc.OpenId4VciCredentialFormatProfile.SdJwtVc) {
        const key = await agent.wallet.createKey({
          keyType
        });
        return {
          method: 'jwk',
          jwk: (0, _core.getJwkFromKey)(key)
        };
      }
      throw new Error(`No supported binding method could be found. Supported methods are did:key and did:jwk, or plain jwk for sd-jwt. Issuer supports ${supportsJwk ? 'jwk, ' : ''}${(supportedDidMethods === null || supportedDidMethods === void 0 ? void 0 : supportedDidMethods.join(', ')) ?? 'Unknown'}`);
    },
    verifyCredentialStatus: false,
    allowedProofOfPossessionSignatureAlgorithms: [
    // NOTE: MATTR launchpad for JFF MUST use EdDSA. So it is important that the default (first allowed one)
    // is EdDSA. The list is ordered by preference, so if no suites are defined by the issuer, the first one
    // will be used
    _core.JwaSignatureAlgorithm.EdDSA, _core.JwaSignatureAlgorithm.ES256]
  });
  const [firstCredential] = credentials;
  if (!firstCredential) throw new Error('Error retrieving credential using pre authorized flow.');
  let record;

  // TODO: add claimFormat to SdJwtVc

  if ('compact' in firstCredential) {
    record = new _core.SdJwtVcRecord({
      compactSdJwtVc: firstCredential.compact
    });
  } else {
    record = new _core.W3cCredentialRecord({
      credential: firstCredential,
      // We don't support expanded types right now, but would become problem when we support JSON-LD
      tags: {}
    });
  }
  const openId4VcMetadata = (0, _metadata.extractOpenId4VcCredentialMetadata)(resolvedCredentialOffer.offeredCredentials[0], resolvedCredentialOffer.metadata);
  (0, _metadata.setOpenId4VcCredentialMetadata)(record, openId4VcMetadata);
  console.log("$$openID Cred:", JSON.stringify(record));
  return record;
};
exports.receiveCredentialFromOpenId4VciOffer = receiveCredentialFromOpenId4VciOffer;
//# sourceMappingURL=resolver.js.map