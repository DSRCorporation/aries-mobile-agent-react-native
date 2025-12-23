import { ConnectionRecord } from '@credo-ts/core';
import { BifoldAgent } from './agent';
/**
 * Function to fetch contacts (connections) in order of latest chat message without using hooks
 * @param agent - Credo agent
 * @returns ConnectionRecord[] sorted by most recent message
 */
export declare const fetchContactsByLatestMessage: (agent: BifoldAgent) => Promise<ConnectionRecord[]>;
//# sourceMappingURL=contacts.d.ts.map