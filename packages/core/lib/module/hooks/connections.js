import { useConnectionById, useConnections } from '@bifold/react-hooks';
import { useEffect, useMemo, useState } from 'react';
import { useAppAgent } from '../utils/agent';
export const useOutOfBandById = oobId => {
  const {
    agent
  } = useAppAgent();
  const [oob, setOob] = useState(undefined);
  useEffect(() => {
    if (!oobId || !agent) {
      setOob(undefined);
      return;
    }
    agent.modules.didcomm.oob.findById(oobId).then(res => {
      setOob(res ?? undefined);
    }).catch(() => {
      setOob(undefined);
    });
  }, [oobId, agent]);
  return oob;
};
export const useConnectionByOutOfBandId = outOfBandId => {
  var _useOutOfBandById;
  const reuseConnectionId = (_useOutOfBandById = useOutOfBandById(outOfBandId)) === null || _useOutOfBandById === void 0 ? void 0 : _useOutOfBandById.reuseConnectionId;
  const {
    records: connections
  } = useConnections();
  return useMemo(() => connections.find(connection => connection.outOfBandId === outOfBandId ||
  // Check for a reusable connection
  reuseConnectionId && connection.id === reuseConnectionId), [connections, outOfBandId, reuseConnectionId]);
};
export const useOutOfBandByConnectionId = connectionId => {
  const connection = useConnectionById(connectionId);
  return useOutOfBandById((connection === null || connection === void 0 ? void 0 : connection.outOfBandId) ?? '');
};
//# sourceMappingURL=connections.js.map