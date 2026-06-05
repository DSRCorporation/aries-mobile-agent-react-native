import React from 'react';
import { IMessage, MessageProps } from 'react-native-gifted-chat';
export declare enum CallbackType {
    CredentialOffer = "CredentialOffer",
    ProofRequest = "ProofRequest",
    PresentationSent = "PresentationSent"
}
export interface ExtendedChatMessage extends IMessage {
    renderEvent: () => React.ReactElement;
    createdAt: Date;
    messageOpensCallbackType?: CallbackType;
    onDetails?: () => void;
}
export interface ChatMessageProps {
    messageProps: MessageProps<ExtendedChatMessage>;
}
export declare const ChatMessage: React.FC<ChatMessageProps>;
//# sourceMappingURL=ChatMessage.d.ts.map