import { CredentialState, ProofState } from '@credo-ts/core';
import { useBasicMessages, useCredentialByState, useProofByState } from '@credo-ts/react-hooks';
import { ProofMetadata } from '@hyperledger/aries-bifold-verifier';
import { useEffect, useState } from 'react';
import { BasicMessageMetadata, CredentialMetadata } from '../types/metadata';
export const useNotifications = () => {
  const {
    records: basicMessages
  } = useBasicMessages();
  const [notifications, setNotifications] = useState([]);
  const credsReceived = useCredentialByState(CredentialState.CredentialReceived);
  const credsDone = useCredentialByState(CredentialState.Done);
  const proofsDone = useProofByState([ProofState.Done, ProofState.PresentationReceived]);
  const offers = useCredentialByState(CredentialState.OfferReceived);
  const proofsRequested = useProofByState(ProofState.RequestReceived);
  useEffect(() => {
    // get all unseen messages
    const unseenMessages = basicMessages.filter(msg => {
      const meta = msg.metadata.get(BasicMessageMetadata.customMetadata);
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
      const metadata = proof.metadata.get(ProofMetadata.customMetadata);
      return !(metadata !== null && metadata !== void 0 && metadata.details_seen);
    });
    const revoked = credsDone.filter(cred => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const metadata = cred.metadata.get(CredentialMetadata.customMetadata);
      if (cred !== null && cred !== void 0 && cred.revocationNotification && (metadata === null || metadata === void 0 ? void 0 : metadata.revoked_seen) == undefined) {
        return cred;
      }
    });
    const notif = [...messagesToShow, ...offers, ...proofsRequested, ...validProofsDone, ...revoked].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setNotifications(notif);
  }, [basicMessages, credsReceived, proofsDone, proofsRequested, offers, credsDone]);
  return notifications;
};
//# sourceMappingURL=notifications.js.map