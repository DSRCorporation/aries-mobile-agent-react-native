import { useEffect, useState } from 'react';
import { useAppAgent } from '../utils/agent';
export const useOutOfBandByReceivedInvitationId = receivedInvitationId => {
  const {
    agent
  } = useAppAgent();
  const [oob, setOob] = useState(undefined);
  useEffect(() => {
    var _agent$modules;
    let isMounted = true;
    if (oob) return;
    const oobApi = agent === null || agent === void 0 || (_agent$modules = agent.modules) === null || _agent$modules === void 0 || (_agent$modules = _agent$modules.didcomm) === null || _agent$modules === void 0 ? void 0 : _agent$modules.oob;
    if (!(oobApi !== null && oobApi !== void 0 && oobApi.findByReceivedInvitationId) || !receivedInvitationId) return;
    oobApi.findByReceivedInvitationId(receivedInvitationId).then(res => {
      if (isMounted && res) {
        setOob(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [agent, receivedInvitationId, oob]);
  return oob;
};
//# sourceMappingURL=oob.js.map