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
var _didcomm = require("@credo-ts/didcomm");
var _indyVdr = require("@credo-ts/indy-vdr");
var _webvh = require("@credo-ts/webvh");
var _reactHooks = require("@bifold/react-hooks");
var _openid4vc = require("@credo-ts/openid4vc");
var _anoncredsReactNative = require("@hyperledger/anoncreds-react-native");
var _askarReactNative = require("@openwallet-foundation/askar-react-native");
var _indyVdrReactNative = require("@hyperledger/indy-vdr-react-native");
// import { PushNotificationsApnsModule, PushNotificationsFcmModule } from '@credo-ts/push-notifications'

/**
 * Constructs the modules to be used in the agent setup
 * @param indyNetworks
 * @param mediatorInvitationUrl determine which mediator to use
 * @param txnCache optional local cache config for indyvdr
 * @returns modules to be used in agent setup
 */
function getAgentModules({
  walletSecret,
  indyNetworks,
  mediatorInvitationUrl,
  txnCache
}) {
  const indyCredentialFormat = new _anoncreds.LegacyIndyDidCommCredentialFormatService();
  const indyProofFormat = new _anoncreds.LegacyIndyDidCommProofFormatService();
  if (txnCache) {
    // TODO: Not a function?
    // indyVdr.setLedgerTxnCache({
    //   capacity: txnCache.capacity,
    //   expiry_offset_ms: txnCache.expiryOffsetMs,
    //   path: txnCache.path,
    // })
  }
  return {
    askar: new _askar.AskarModule({
      askar: _askarReactNative.askar,
      store: {
        id: walletSecret.id,
        key: walletSecret.key
      }
    }),
    anoncreds: new _anoncreds.AnonCredsModule({
      anoncreds: _anoncredsReactNative.anoncreds,
      registries: [new _indyVdr.IndyVdrAnonCredsRegistry(), new _webvh.WebVhAnonCredsRegistry()]
    }),
    indyVdr: new _indyVdr.IndyVdrModule({
      indyVdr: _indyVdrReactNative.indyVdr,
      networks: indyNetworks
    }),
    didcomm: new _didcomm.DidCommModule({
      useDidSovPrefixWhereAllowed: true,
      connections: {
        autoAcceptConnections: true
      },
      credentials: {
        autoAcceptCredentials: _didcomm.DidCommAutoAcceptCredential.ContentApproved,
        credentialProtocols: [new _anoncreds.DidCommCredentialV1Protocol({
          indyCredentialFormat
        }), new _didcomm.DidCommCredentialV2Protocol({
          credentialFormats: [indyCredentialFormat, new _anoncreds.AnonCredsDidCommCredentialFormatService(), new _anoncreds.DataIntegrityDidCommCredentialFormatService()]
        })]
      },
      proofs: {
        autoAcceptProofs: _didcomm.DidCommAutoAcceptProof.ContentApproved,
        proofProtocols: [new _anoncreds.DidCommProofV1Protocol({
          indyProofFormat
        }), new _didcomm.DidCommProofV2Protocol({
          proofFormats: [indyProofFormat, new _anoncreds.AnonCredsDidCommProofFormatService(), new _didcomm.DidCommDifPresentationExchangeProofFormatService()]
        })]
      },
      mediationRecipient: {
        mediatorInvitationUrl: mediatorInvitationUrl,
        mediatorPickupStrategy: _didcomm.DidCommMediatorPickupStrategy.Implicit
      }
    }),
    openid4vc: new _openid4vc.OpenId4VcModule(),
    dids: new _core.DidsModule({
      resolvers: [new _webvh.WebVhDidResolver(), new _core.WebDidResolver(), new _core.JwkDidResolver(), new _core.KeyDidResolver(), new _core.PeerDidResolver()]
    })
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