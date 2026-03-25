"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNotifications = void 0;
var _reactHooks = require("@bifold/react-hooks");
var _didcomm = require("@credo-ts/didcomm");
var _verifier = require("@bifold/verifier");
var _react = require("react");
var _metadata = require("../types/metadata");
var _openid = require("../modules/openid/hooks/openid");
var _useExpiredNotifications = require("../modules/openid/hooks/useExpiredNotifications");
const useNotifications = ({
  openIDUri,
  openIDPresentationUri
}) => {
  const doneStates = (0, _react.useMemo)(() => [_didcomm.DidCommProofState.Done, _didcomm.DidCommProofState.PresentationReceived], []);
  const [notifications, setNotifications] = (0, _react.useState)([]);
  const {
    records: basicMessages
  } = (0, _reactHooks.useBasicMessages)();
  const offers = (0, _reactHooks.useCredentialByState)(_didcomm.DidCommCredentialState.OfferReceived);
  const proofsRequested = (0, _reactHooks.useProofByState)(_didcomm.DidCommProofState.RequestReceived);
  const credsReceived = (0, _reactHooks.useCredentialByState)(_didcomm.DidCommCredentialState.CredentialReceived);
  const credsDone = (0, _reactHooks.useCredentialByState)(_didcomm.DidCommCredentialState.Done);
  const proofsDone = (0, _reactHooks.useProofByState)(doneStates);
  const openIDCredRecieved = (0, _openid.useOpenID)({
    openIDUri: openIDUri,
    openIDPresentationUri: openIDPresentationUri
  });
  const openIDExpiredNotifs = (0, _useExpiredNotifications.useExpiredNotifications)();
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
      if (proof.isVerified === undefined) {
        return false;
      }
      const metadata = proof.metadata.get(_verifier.ProofMetadata.customMetadata);
      return !(metadata !== null && metadata !== void 0 && metadata.details_seen);
    });
    const revoked = credsDone.filter(cred => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const metadata = cred.metadata.get(_metadata.CredentialMetadata.customMetadata);
      if (cred !== null && cred !== void 0 && cred.revocationNotification && (metadata === null || metadata === void 0 ? void 0 : metadata.revoked_seen) == undefined) {
        return cred;
      }
    });
    const openIDCreds = [];
    if (openIDCredRecieved) {
      openIDCreds.push(openIDCredRecieved);
    }
    const notif = [...messagesToShow, ...offers, ...proofsRequested, ...validProofsDone, ...revoked, ...openIDCreds, ...openIDExpiredNotifs].sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime());
    setNotifications(notif);
  }, [basicMessages, credsReceived, proofsDone, proofsRequested, offers, credsDone, openIDCredRecieved, openIDExpiredNotifs]);
  return notifications;
};
exports.useNotifications = useNotifications;
//# sourceMappingURL=notifications.js.map