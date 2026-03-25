import { useBasicMessages, useCredentialByState, useProofByState } from '@bifold/react-hooks';
import { DidCommCredentialState, DidCommProofState } from '@credo-ts/didcomm';
import { ProofMetadata } from '@bifold/verifier';
import { useEffect, useMemo, useState } from 'react';
import { BasicMessageMetadata, CredentialMetadata } from '../types/metadata';
import { useOpenID } from '../modules/openid/hooks/openid';
import { useExpiredNotifications } from '../modules/openid/hooks/useExpiredNotifications';
export const useNotifications = ({
  openIDUri,
  openIDPresentationUri
}) => {
  const doneStates = useMemo(() => [DidCommProofState.Done, DidCommProofState.PresentationReceived], []);
  const [notifications, setNotifications] = useState([]);
  const {
    records: basicMessages
  } = useBasicMessages();
  const offers = useCredentialByState(DidCommCredentialState.OfferReceived);
  const proofsRequested = useProofByState(DidCommProofState.RequestReceived);
  const credsReceived = useCredentialByState(DidCommCredentialState.CredentialReceived);
  const credsDone = useCredentialByState(DidCommCredentialState.Done);
  const proofsDone = useProofByState(doneStates);
  const openIDCredRecieved = useOpenID({
    openIDUri: openIDUri,
    openIDPresentationUri: openIDPresentationUri
  });
  const openIDExpiredNotifs = useExpiredNotifications();
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
      if (proof.isVerified === undefined) {
        return false;
      }
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
    const openIDCreds = [];
    if (openIDCredRecieved) {
      openIDCreds.push(openIDCredRecieved);
    }
    const notif = [...messagesToShow, ...offers, ...proofsRequested, ...validProofsDone, ...revoked, ...openIDCreds, ...openIDExpiredNotifs].sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime());
    setNotifications(notif);
  }, [basicMessages, credsReceived, proofsDone, proofsRequested, offers, credsDone, openIDCredRecieved, openIDExpiredNotifs]);
  return notifications;
};
//# sourceMappingURL=notifications.js.map