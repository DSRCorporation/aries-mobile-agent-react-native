import React from 'react';
import { IMessage, Message } from 'react-native-gifted-chat';
export declare enum CallbackType {
    CredentialOffer = "CredentialOffer",
    ProofRequest = "ProofRequest",
    PresentationSent = "PresentationSent"
}
export interface ChatMessageProps {
    messageProps: React.ComponentProps<typeof Message>;
}
export interface ExtendedChatMessage extends IMessage {
    renderEvent: () => JSX.Element;
    createdAt: Date;
    messageOpensCallbackType?: CallbackType;
    onDetails?: () => void;
}
export declare const ChatMessage: React.FC<ChatMessageProps>;
//# sourceMappingURL=ChatMessage.d.ts.map