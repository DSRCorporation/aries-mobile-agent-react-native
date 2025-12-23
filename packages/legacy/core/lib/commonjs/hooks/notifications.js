"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNotifications = void 0;
var _core = require("@credo-ts/core");
var _reactHooks = require("@credo-ts/react-hooks");
var _ariesBifoldVerifier = require("@hyperledger/aries-bifold-verifier");
var _react = require("react");
var _metadata = require("../types/metadata");
const useNotifications = () => {
  const {
    records: basicMessages
  } = (0, _reactHooks.useBasicMessages)();
  const [notifications, setNotifications] = (0, _react.useState)([]);
  const credsReceived = (0, _reactHooks.useCredentialByState)(_core.CredentialState.CredentialReceived);
  const credsDone = (0, _reactHooks.useCredentialByState)(_core.CredentialState.Done);
  const proofsDone = (0, _reactHooks.useProofByState)([_core.ProofState.Done, _core.ProofState.PresentationReceived]);
  const offers = (0, _reactHooks.useCredentialByState)(_core.CredentialState.OfferReceived);
  const proofsRequested = (0, _reactHooks.useProofByState)(_core.ProofState.RequestReceived);
  (0, _react.useEffect)(() => {
    // get all unseen messages
    const unseenMessages = basicMessages.filter(msg => {
      const meta = msg.metadata.get(_metadata.BasicMessageMetadata.customMetadata);
      return !(meta !== null && meta !== void 0 && meta.seen);
    });

    // add one unseen message per contact to notifications
    const contactsWithUnseenMessages = [];
    const messagesToShow = [];
    unseenMessages.forEach(msg => {
      if (!contactsWithUnseenMessages.includes(msg.connectionId)) {
        contactsWithUnseenMessages.push(msg.connectionId);
        messagesToShow.push(msg);
      }
    });
    const validProofsDone = proofsDone.filter(proof => {
      if (proof.isVerified === undefined) return false;
      const metadata = proof.metadata.get(_ariesBifoldVerifier.ProofMetadata.customMetadata);
      return !(metadata !== null && metadata !== void 0 && metadata.details_seen);
    });
    const revoked = credsDone.filter(cred => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const metadata = cred.metadata.get(_metadata.CredentialMetadata.customMetadata);
      if (cred !== null && cred !== void 0 && cred.revocationNotification && (metadata === null || metadata === void 0 ? void 0 : metadata.revoked_seen) == undefined) {
        return cred;
      }
    });
    const notif = [...messagesToShow, ...offers, ...proofsRequested, ...validProofsDone, ...revoked].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setNotifications(notif);
  }, [basicMessages, credsReceived, proofsDone, proofsRequested, offers, credsDone]);
  return notifications;
};
exports.useNotifications = useNotifications;
//# sourceMappingURL=notifications.js.map