import { useAgent } from '@credo-ts/react-hooks';
import { useState } from 'react';
export const useOutOfBandByReceivedInvitationId = receivedInvitationId => {
  const {
    agent
  } = useAgent();
  const [oob, setOob] = useState(undefined);
  if (!oob) {
    agent === null || agent === void 0 || agent.oob.findByReceivedInvitationId(receivedInvitationId).then(res => {
      if (res) {
        setOob(res);
      }
    });
  }
  return oob;
};
//# sourceMappingURL=oob.js.map