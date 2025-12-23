import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { RootStackParams, ContactStackParams, Screens } from '../types/navigators';
type ChatProps = StackScreenProps<ContactStackParams, Screens.Chat> | StackScreenProps<RootStackParams, Screens.Chat>;
declare const Chat: React.FC<ChatProps>;
export default Chat;
//# sourceMappingURL=Chat.d.ts.map