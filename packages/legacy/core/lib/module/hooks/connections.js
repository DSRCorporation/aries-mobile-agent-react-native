import { useAgent, useConnectionById, useConnections } from '@credo-ts/react-hooks';
import { useMemo, useState } from 'react';
export const useConnectionByOutOfBandId = outOfBandId => {
  const {
    records: connections
  } = useConnections();
  return useMemo(() => connections.find(connection => connection.outOfBandId === outOfBandId), [connections, outOfBandId]);
};
export const useOutOfBandById = oobId => {
  const {
    agent
  } = useAgent();
  const [oob, setOob] = useState(undefined);
  if (!oob) {
    agent === null || agent === void 0 || agent.oob.findById(oobId).then(res => {
      if (res) {
        setOob(res);
      }
    });
  }
  return oob;
};
export const useOutOfBandByConnectionId = connectionId => {
  const connection = useConnectionById(connectionId);
  return useOutOfBandById((connection === null || connection === void 0 ? void 0 : connection.outOfBandId) ?? '');
};
//# sourceMappingURL=connections.js.map