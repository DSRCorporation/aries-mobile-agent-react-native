import { toOpenIDCredentialLite } from '../credentialRecord';
import { refreshAccessToken } from './refreshToken';
import { credentialRegistry } from './registry';
import { reissueCredentialWithAccessToken } from './reIssuance';
export async function refreshAndQueueReplacement({
  agent,
  logger,
  record,
  toLite = toOpenIDCredentialLite
}) {
  const token = await refreshAccessToken({
    logger,
    cred: record,
    agent
  });
  if (!token) {
    return undefined;
  }
  const newRecord = await reissueCredentialWithAccessToken({
    agent,
    logger,
    record,
    tokenResponse: token
  });
  if (!newRecord) {
    return undefined;
  }
  credentialRegistry.getState().markExpiredWithReplacement(record.id, toLite(newRecord));
  return newRecord;
}
//# sourceMappingURL=operations.js.map