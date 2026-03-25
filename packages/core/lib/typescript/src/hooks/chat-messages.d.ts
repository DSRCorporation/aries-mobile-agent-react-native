import { DidCommConnectionRecord } from '@credo-ts/didcomm';
import { ExtendedChatMessage } from '../components/chat/ChatMessage';
/**
 * Custom hook for retrieving chat messages for a given connection. This hook includes some of
 * the JSX for rendering the chat messages, including the logic for handling links in messages.
 *
 * @param {ConnectionRecord} connection - The connection to retrieve chat messages for.
 * @returns {ExtendedChatMessage[]} The chat messages for the given connection.
 */
export declare const useChatMessagesByConnection: (connection: DidCommConnectionRecord) => ExtendedChatMessage[];
//# sourceMappingURL=chat-messages.d.ts.map