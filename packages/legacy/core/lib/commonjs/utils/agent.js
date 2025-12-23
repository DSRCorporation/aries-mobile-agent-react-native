"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLinkSecretIfRequired = void 0;
exports.getAgentModules = getAgentModules;
exports.useAppAgent = void 0;
var _anoncreds = require("@credo-ts/anoncreds");
var _askar = require("@credo-ts/askar");
var _core = require("@credo-ts/core");
var _indyVdr = require("@credo-ts/indy-vdr");
var _openid4vc = require("@credo-ts/openid4vc");
var _pushNotifications = require("@credo-ts/push-notifications");
var _reactHooks = require("@credo-ts/react-hooks");
var _anoncredsReactNative = require("@hyperledger/anoncreds-react-native");
var _ariesAskarReactNative = require("@hyperledger/aries-askar-react-native");
var _indyVdrReactNative = require("@hyperledger/indy-vdr-react-native");
/**
 * Constructs the modules to be used in the agent setup
 * @param indyNetworks
 * @param mediatorInvitationUrl determine which mediator to use
 * @param txnCache optional local cache config for indyvdr
 * @returns modules to be used in agent setup
 */
function getAgentModules({
  indyNetworks,
  mediatorInvitationUrl,
  txnCache
}) {
  const indyCredentialFormat = new _anoncreds.LegacyIndyCredentialFormatService();
  const indyProofFormat = new _anoncreds.LegacyIndyProofFormatService();
  if (txnCache) {
    _indyVdrReactNative.indyVdr.setLedgerTxnCache({
      capacity: txnCache.capacity,
      expiry_offset_ms: txnCache.expiryOffsetMs,
      path: txnCache.path
    });
  }
  return {
    askar: new _askar.AskarModule({
      ariesAskar: _ariesAskarReactNative.ariesAskar
    }),
    anoncreds: new _anoncreds.AnonCredsModule({
      anoncreds: _anoncredsReactNative.anoncreds,
      registries: [new _indyVdr.IndyVdrAnonCredsRegistry()]
    }),
    indyVdr: new _indyVdr.IndyVdrModule({
      indyVdr: _indyVdrReactNative.indyVdr,
      networks: indyNetworks
    }),
    connections: new _core.ConnectionsModule({
      autoAcceptConnections: true
    }),
    credentials: new _core.CredentialsModule({
      autoAcceptCredentials: _core.AutoAcceptCredential.ContentApproved,
      credentialProtocols: [new _anoncreds.V1CredentialProtocol({
        indyCredentialFormat
      }), new _core.V2CredentialProtocol({
        credentialFormats: [indyCredentialFormat, new _anoncreds.AnonCredsCredentialFormatService(), new _anoncreds.DataIntegrityCredentialFormatService()]
      })]
    }),
    proofs: new _core.ProofsModule({
      autoAcceptProofs: _core.AutoAcceptProof.ContentApproved,
      proofProtocols: [new _anoncreds.V1ProofProtocol({
        indyProofFormat
      }), new _core.V2ProofProtocol({
        proofFormats: [indyProofFormat, new _anoncreds.AnonCredsProofFormatService(), new _core.DifPresentationExchangeProofFormatService()]
      })]
    }),
    mediationRecipient: new _core.MediationRecipientModule({
      mediatorInvitationUrl: mediatorInvitationUrl,
      mediatorPickupStrategy: _core.MediatorPickupStrategy.Implicit
    }),
    pushNotificationsFcm: new _pushNotifications.PushNotificationsFcmModule(),
    pushNotificationsApns: new _pushNotifications.PushNotificationsApnsModule(),
    openId4VcHolder: new _openid4vc.OpenId4VcHolderModule()
  };
}
const useAppAgent = exports.useAppAgent = _reactHooks.useAgent;
const createLinkSecretIfRequired = async agent => {
  // If we don't have any link secrets yet, we will create a
  // default link secret that will be used for all anoncreds
  // credential requests.
  const linkSecretIds = await agent.modules.anoncreds.getLinkSecretIds();
  if (linkSecretIds.length === 0) {
    await agent.modules.anoncreds.createLinkSecret({
      setAsDefault: true
    });
  }
};
exports.createLinkSecretIfRequired = createLinkSecretIfRequired;
//# sourceMappingURL=agent.js.map